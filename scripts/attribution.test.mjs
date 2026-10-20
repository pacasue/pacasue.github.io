import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { JSDOM } from 'jsdom'
import test from 'node:test'
import {
  AD_ID_PARAMS,
  MAIN_DOMAINS,
  STORAGE_KEY,
  TTL_MS,
  TRACKED_PARAMS,
  WL_UTM_SOURCE,
  createAttribution,
  createResilientStorage,
  installAttribution,
  pathSourceFromPath,
} from '../src/attribution.js'

const LANDING = 'https://hairprovoices.com/pages/my-review.html?utm_source=facebook&utm_medium=cpc&utm_campaign=fall_launch&utm_id=111&campaign_id=222&ad_id=333&tw_source=ig&tw_adid=444&cvg_source=ig&cvg_adid=444&cvg_cid=555&fbclid=abc'
const EXPECTED_QUERY = 'path_source=my-review&tw_source=ig&tw_adid=444&cvg_source=ig&cvg_adid=444&cvg_cid=555&fbclid=abc&utm_source=hpv&channel=facebook&utm_medium=cpc&utm_campaign=fall_launch&utm_id=111&campaign_id=222&ad_id=333'

function memoryStorage() {
  return createResilientStorage({ localStorage: null, cookie: null, memory: { raw: null } })
}

function attribution(now = () => 1_000) {
  return createAttribution({ storage: memoryStorage(), now })
}

function throwingStorage() {
  return {
    getItem() { throw new Error('blocked') },
    setItem() { throw new Error('blocked') },
    removeItem() { throw new Error('blocked') },
  }
}

test('path_source comes from the landing slug, with index for the homepage', () => {
  assert.equal(pathSourceFromPath('/'), 'index')
  assert.equal(pathSourceFromPath('/index.html'), 'index')
  assert.equal(pathSourceFromPath('/pages/face-mists-worth-the-hype.html'), 'face-mists-worth-the-hype')
  assert.equal(pathSourceFromPath('/face-mists-worth-the-hype'), 'face-mists-worth-the-hype')
  assert.equal(pathSourceFromPath('/article/my-review/'), 'my-review')
  assert.equal(WL_UTM_SOURCE, 'hpv')
  assert.deepEqual(MAIN_DOMAINS, ['getreyou.com', 'pacagen.com', 'drinkwildtype.com'])
})

test('full capture is forwarded with utm_source remapped to channel', () => {
  const tracker = attribution()
  tracker.capture(LANDING, '/pages/my-review.html')
  tracker.capture('https://hairprovoices.com/about', '/about')

  const record = tracker.load()
  assert.equal(record.params.path_source, 'my-review')
  assert.equal(record.params.utm_source, 'facebook')
  assert.equal(record.params.ad_id, '333')
  assert.equal(record.capturedAt, 1_000)

  const outbound = tracker.buildOutboundUrl('https://www.getreyou.com/products/example')
  assert.equal(outbound, `https://www.getreyou.com/products/example?${EXPECTED_QUERY}`)
})

test('partial updates merge and empty values do not erase stored params', () => {
  const tracker = attribution()
  tracker.capture('https://hairprovoices.com/article/first?utm_source=facebook&fbclid=abc', '/article/first')
  tracker.capture('https://hairprovoices.com/about?utm_medium=cpc&utm_content=hero', '/about')
  tracker.capture('https://hairprovoices.com/about?utm_source=&ad_id=&fbclid=', '/about')

  const params = tracker.load().params
  assert.equal(params.path_source, 'first')
  assert.equal(params.utm_source, 'facebook')
  assert.equal(params.fbclid, 'abc')
  assert.equal(params.utm_medium, 'cpc')
  assert.equal(params.utm_content, 'hero')
  assert.equal(params.ad_id, undefined)

  const outbound = new URL(tracker.buildOutboundUrl('https://getreyou.com/products/example'))
  assert.equal(outbound.searchParams.get('channel'), 'facebook')
  assert.equal(outbound.searchParams.get('utm_medium'), 'cpc')
  assert.equal(outbound.searchParams.get('utm_content'), 'hero')
  assert.equal(outbound.searchParams.get('fbclid'), 'abc')
})

test('a supplied path_source is kept across later pages', () => {
  const tracker = attribution()
  tracker.capture(
    'https://hairprovoices.com/article/other?path_source=original-landing&utm_source=facebook',
    '/article/other',
  )
  tracker.capture('https://hairprovoices.com/about?path_source=about', '/about')
  assert.equal(tracker.load().params.path_source, 'original-landing')
  const outbound = new URL(tracker.buildOutboundUrl('https://www.pacagen.com/shop'))
  assert.equal(outbound.searchParams.get('path_source'), 'original-landing')
  assert.equal(outbound.searchParams.get('utm_source'), 'hpv')
  assert.equal(outbound.searchParams.get('channel'), 'facebook')
})

test('outbound urls keep the destination query and fragment without duplicate keys', () => {
  const tracker = attribution()
  tracker.capture(LANDING, '/pages/my-review.html')
  const outbound = tracker.buildOutboundUrl(
    'https://getreyou.com/pages/science?utm_source=keepme&utm_source=alsokeep&ref=1&ad_id=old#clinical-trial',
  )
  const url = new URL(outbound)
  assert.equal(url.hash, '#clinical-trial')
  assert.equal(url.searchParams.get('ref'), '1')
  assert.deepEqual(url.searchParams.getAll('utm_source'), ['hpv'])
  assert.deepEqual(url.searchParams.getAll('ad_id'), ['333'])
  assert.deepEqual(url.searchParams.getAll('channel'), ['facebook'])
  assert.equal(url.searchParams.get('utm_medium'), 'cpc')
})

test('unresolved ad macros are neither stored nor forwarded', () => {
  const tracker = attribution()
  tracker.capture(
    'https://hairprovoices.com/article/review?ad_id=%7B%7Bad.id%7D%7D&utm_campaign=%7B%7Bcampaign.id%7D%7D&tw_source=%7B%7Bsite_source_name%7D%7D&utm_id=%257B%257Bad.id%257D%257D&fbclid={{fbclid}}&utm_source=facebook&utm_medium=cpc',
    '/article/review',
  )
  const params = tracker.load().params
  for (const key of ['ad_id', 'utm_campaign', 'tw_source', 'utm_id', 'fbclid']) {
    assert.equal(params[key], undefined, key)
  }
  assert.equal(params.utm_source, 'facebook')
  assert.equal(params.utm_medium, 'cpc')

  tracker.capture(
    'https://hairprovoices.com/about?ad_id=%7B%7Bad.id%7D%7D&utm_content=note',
    '/about',
  )
  assert.equal(tracker.load().params.utm_source, 'facebook')
  assert.equal(tracker.load().params.utm_content, 'note')
  assert.equal(tracker.load().params.path_source, 'review')

  const outbound = new URL(tracker.buildOutboundUrl('https://drinkwildtype.com/products/example'))
  assert.equal(outbound.searchParams.get('ad_id'), null)
  assert.equal(outbound.searchParams.get('channel'), 'facebook')
  assert.equal(outbound.searchParams.get('utm_content'), 'note')
})

test('expired records are discarded and the next landing starts clean', () => {
  let now = 0
  const tracker = createAttribution({ storage: memoryStorage(), now: () => now })
  tracker.capture('https://hairprovoices.com/article/first?utm_source=facebook&ad_id=1', '/article/first')
  now = TTL_MS - 1
  assert.equal(tracker.load().params.ad_id, '1')
  now = TTL_MS
  assert.equal(tracker.load(), null)
  tracker.capture('https://hairprovoices.com/about', '/about')
  const record = tracker.load()
  assert.equal(record.params.path_source, 'about')
  assert.equal(record.params.utm_source, undefined)
  assert.equal(record.capturedAt, TTL_MS)
})

test('a conflicting ad identifier replaces the whole record', () => {
  let now = 10
  const tracker = createAttribution({ storage: memoryStorage(), now: () => now })
  tracker.capture(LANDING, '/pages/my-review.html')
  now = 40
  tracker.capture('https://hairprovoices.com/article/other?fbclid=xyz&utm_source=tiktok', '/article/other')
  const record = tracker.load()
  assert.equal(record.capturedAt, 40)
  assert.equal(record.params.fbclid, 'xyz')
  assert.equal(record.params.utm_source, 'tiktok')
  assert.equal(record.params.path_source, 'other')
  assert.equal(record.params.ad_id, undefined)
  assert.equal(record.params.tw_adid, undefined)
  assert.equal(record.params.utm_campaign, undefined)

  const outbound = new URL(tracker.buildOutboundUrl('https://www.getreyou.com/products/example'))
  assert.equal(outbound.searchParams.get('fbclid'), 'xyz')
  assert.equal(outbound.searchParams.get('channel'), 'tiktok')
  assert.equal(outbound.searchParams.get('ad_id'), null)
  assert.equal(outbound.searchParams.get('utm_campaign'), null)
})

test('the same ad identifiers merge instead of replacing', () => {
  const tracker = attribution()
  tracker.capture('https://hairprovoices.com/article/first?ad_id=333&utm_source=facebook', '/article/first')
  tracker.capture('https://hairprovoices.com/article/second?ad_id=333&utm_term=serum&utm_content=card', '/article/second')
  const params = tracker.load().params
  assert.equal(params.path_source, 'first')
  assert.equal(params.ad_id, '333')
  assert.equal(params.utm_term, 'serum')
  assert.equal(params.utm_content, 'card')
  assert.equal(params.utm_source, 'facebook')
})

test('every listed ad id can force a new visit', () => {
  for (const key of AD_ID_PARAMS) {
    const tracker = attribution()
    tracker.capture(`https://hairprovoices.com/article/first?${key}=one&utm_source=facebook`, '/article/first')
    tracker.capture(`https://hairprovoices.com/article/second?${key}=two`, '/article/second')
    const params = tracker.load().params
    assert.equal(params[key], 'two', key)
    assert.equal(params.utm_source, undefined, key)
    assert.equal(params.path_source, 'second', key)
  }
  assert.ok(TRACKED_PARAMS.includes('utm_term'))
  assert.equal(STORAGE_KEY, 'hpv_attribution')
})

test('missing utm_source still sets the site code and omits channel', () => {
  const tracker = attribution()
  tracker.capture('https://hairprovoices.com/?ad_id=333333', '/')
  const outbound = new URL(tracker.buildOutboundUrl('https://getreyou.com/products/example'))
  assert.equal(outbound.searchParams.get('utm_source'), 'hpv')
  assert.equal(outbound.searchParams.has('channel'), false)
  assert.equal(outbound.searchParams.get('path_source'), 'index')
  assert.equal(outbound.searchParams.get('ad_id'), '333333')
})

test('unrelated destinations are returned unchanged', () => {
  const tracker = attribution()
  tracker.capture(LANDING, '/pages/my-review.html')
  const samples = [
    'https://www.instagram.com/hairprovoices/',
    'https://www.facebook.com/people/Hairpro-Voices/61564779778738/',
    'https://www.biorxiv.org/content/10.64898/2026.06.09.728282v1',
    'https://getreyou.com.evil.com/products/example',
    'https://notgetreyou.com/products/example',
    'mailto:editorial@hairprovoices.com',
    'tel:+15551212',
    'javascript:void(0)',
    '#clinical-trial',
    '/article/other',
  ]
  for (const sample of samples) {
    assert.equal(tracker.buildOutboundUrl(sample, 'https://hairprovoices.com/about'), sample)
  }
})

test('blocked localStorage falls back to a first-party cookie', () => {
  const dom = new JSDOM('<!doctype html><html><body></body></html>', {
    url: 'https://hairprovoices.com/article/my-review',
  })
  const storage = createResilientStorage({
    localStorage: throwingStorage(),
    document: dom.window.document,
  })
  assert.equal(storage.getMode(), 'cookie')
  const first = createAttribution({ storage, now: () => 5_000 })
  first.capture(
    'https://hairprovoices.com/article/my-review?utm_source=facebook&ad_id=333333',
    '/article/my-review',
  )
  assert.match(dom.window.document.cookie, new RegExp(`${STORAGE_KEY}=`))
  const second = createAttribution({ storage, now: () => 5_000 })
  assert.equal(second.load().params.utm_source, 'facebook')
  assert.equal(second.load().params.ad_id, '333333')
  assert.equal(second.load().params.path_source, 'my-review')
})

test('blocked storage falls back to memory for the rest of the page', () => {
  const memory = { raw: null }
  const storage = createResilientStorage({
    localStorage: throwingStorage(),
    cookie: { get() { return null }, set() { return false }, remove() {} },
    memory,
  })
  assert.equal(storage.getMode(), 'memory')
  const first = createAttribution({ storage, now: () => 5_000 })
  first.capture('https://hairprovoices.com/article/my-review?utm_source=facebook&ad_id=333333', '/article/my-review')
  const second = createAttribution({ storage, now: () => 5_000 })
  assert.equal(second.load().params.ad_id, '333333')
  assert.equal(second.load().params.utm_source, 'facebook')
  assert.ok(memory.raw)
})

test('link tagging preserves path_source, ignores unrelated anchors, and follows a new visit', () => {
  const html = `<!doctype html><body>
    <a id="cta" target="_blank" href="https://getreyou.com/products/example?color=red#details">Shop</a>
    <a id="sub" href="https://shop.getreyou.com/kit">Sub</a>
    <a id="social" href="https://www.instagram.com/hairprovoices/">IG</a>
    <a id="internal" href="/about">About</a>
    <a id="mail" href="mailto:editorial@hairprovoices.com">Mail</a>
    <a id="tel" href="tel:+15551212">Tel</a>
    <a id="js" href="javascript:void(0)">JS</a>
    <a id="hash" href="#section">Hash</a>
    <a id="lookalike" href="https://getreyou.com.evil.com/products/example">Evil</a>
  </body>`
  const dom = new JSDOM(html, {
    url: 'https://hairprovoices.com/article/novogro-vs-minoxidil?utm_source=facebook&ad_id=333333&utm_medium=cpc',
  })
  const api = installAttribution(dom.window)
  api.startTagging()

  const cta = dom.window.document.getElementById('cta')
  const ctaUrl = new URL(cta.href)
  assert.equal(ctaUrl.searchParams.get('path_source'), 'novogro-vs-minoxidil')
  assert.equal(ctaUrl.searchParams.get('utm_source'), 'hpv')
  assert.equal(ctaUrl.searchParams.get('channel'), 'facebook')
  assert.equal(ctaUrl.searchParams.get('ad_id'), '333333')
  assert.equal(ctaUrl.searchParams.get('utm_medium'), 'cpc')
  assert.equal(ctaUrl.searchParams.get('color'), 'red')
  assert.equal(ctaUrl.hash, '#details')
  assert.equal(cta.getAttribute('target'), '_blank')
  assert.equal(new URL(dom.window.document.getElementById('sub').href).hostname, 'shop.getreyou.com')
  assert.match(dom.window.document.getElementById('sub').href, /utm_source=hpv/)

  for (const id of ['social', 'internal', 'mail', 'tel', 'js', 'hash', 'lookalike']) {
    const link = dom.window.document.getElementById(id)
    assert.equal(link.getAttribute('data-hpv-original'), null, id)
  }
  assert.equal(dom.window.document.getElementById('social').getAttribute('href'), 'https://www.instagram.com/hairprovoices/')
  assert.equal(dom.window.document.getElementById('internal').getAttribute('href'), '/about')
  assert.equal(dom.window.document.getElementById('mail').getAttribute('href'), 'mailto:editorial@hairprovoices.com')
  assert.equal(dom.window.document.getElementById('hash').getAttribute('href'), '#section')

  dom.window.history.pushState({}, '', '/about')
  assert.equal(api.load().params.path_source, 'novogro-vs-minoxidil')
  assert.equal(api.load().params.utm_source, 'facebook')
  assert.equal(api.load().params.ad_id, '333333')

  const dynamic = dom.window.document.createElement('a')
  dynamic.href = 'https://www.pacagen.com/products/example'
  dynamic.target = '_blank'
  dom.window.document.body.appendChild(dynamic)
  dynamic.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true, cancelable: true, metaKey: true }))
  const dynamicUrl = new URL(dynamic.href)
  assert.equal(dynamicUrl.searchParams.get('utm_source'), 'hpv')
  assert.equal(dynamicUrl.searchParams.get('channel'), 'facebook')
  assert.equal(dynamicUrl.searchParams.get('path_source'), 'novogro-vs-minoxidil')
  assert.equal(dynamicUrl.searchParams.get('ad_id'), '333333')

  const social = dom.window.document.getElementById('social')
  const socialBefore = social.getAttribute('href')
  social.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true, cancelable: true, ctrlKey: true }))
  assert.equal(social.getAttribute('href'), socialBefore)

  dom.window.history.pushState({}, '', '/article/other?fbclid=new-click&ad_id=999999')
  api.tagLinks()
  const replaced = new URL(cta.href)
  assert.equal(replaced.searchParams.get('path_source'), 'other')
  assert.equal(replaced.searchParams.get('fbclid'), 'new-click')
  assert.equal(replaced.searchParams.get('ad_id'), '999999')
  assert.equal(replaced.searchParams.get('channel'), null)
  assert.equal(replaced.searchParams.get('utm_medium'), null)
  assert.equal(replaced.searchParams.get('color'), 'red')
  assert.equal(replaced.hash, '#details')
})

test('dynamic anchors are tagged when they are inserted', async () => {
  const dom = new JSDOM('<!doctype html><body></body>', {
    url: 'https://hairprovoices.com/article/first?utm_source=facebook&utm_term=wave',
  })
  const api = installAttribution(dom.window)
  api.startTagging()
  const link = dom.window.document.createElement('a')
  link.href = 'https://drinkwildtype.com/shop'
  dom.window.document.body.appendChild(link)
  await new Promise((resolve) => setTimeout(resolve, 20))
  const url = new URL(link.href)
  assert.equal(url.searchParams.get('utm_source'), 'hpv')
  assert.equal(url.searchParams.get('channel'), 'facebook')
  assert.equal(url.searchParams.get('utm_term'), 'wave')
  assert.equal(url.searchParams.get('path_source'), 'first')
  api.disconnect()
})

test('partner click tracking forwards attribution without logging the ad ids', () => {
  const dom = new JSDOM(
    `<!doctype html><body>
      <a id="cta" target="_blank" href="https://getreyou.com/products/dual-path-hair-revival-serum">Shop</a>
      <a id="mod" href="https://www.pacagen.com/shop?ref=nav#top">Pacagen</a>
      <a id="ig" href="https://www.instagram.com/hairprovoices/">IG</a>
      <a id="mail" href="mailto:editorial@hairprovoices.com">Mail</a>
    </body>`,
    {
      url: 'https://hairprovoices.com/article/my-review?utm_source=facebook&ad_id=333333&utm_medium=cpc',
      runScripts: 'dangerously',
    },
  )
  const tracked = []
  const opened = []
  dom.window.cvg = (payload) => { tracked.push(payload) }
  dom.window.cvg.process = () => {}
  dom.window.open = () => {
    const popup = { opener: null, location: { href: '' } }
    opened.push(popup)
    return popup
  }
  dom.window.setTimeout = (fn) => {
    fn()
    return 0
  }
  dom.window.document.cookie = '__cvg_uid=user-1'
  dom.window.document.cookie = '__cvg_sid=sess-1'
  Object.defineProperty(dom.window, 'innerHeight', { configurable: true, value: 0 })
  installAttribution(dom.window).startTagging()
  const script = dom.window.document.createElement('script')
  script.textContent = readFileSync(new URL('../public/cvg-events.js', import.meta.url), 'utf8')
  dom.window.document.body.appendChild(script)

  const cta = dom.window.document.getElementById('cta')
  const click = new dom.window.MouseEvent('click', { bubbles: true, cancelable: true })
  cta.dispatchEvent(click)
  assert.equal(click.defaultPrevented, true)
  assert.equal(opened.length, 1)
  const destination = new URL(opened[0].location.href)
  assert.equal(destination.pathname, '/products/dual-path-hair-revival-serum')
  assert.equal(destination.searchParams.get('path_source'), 'my-review')
  assert.equal(destination.searchParams.get('utm_source'), 'hpv')
  assert.equal(destination.searchParams.get('channel'), 'facebook')
  assert.equal(destination.searchParams.get('ad_id'), '333333')
  assert.equal(destination.searchParams.get('utm_medium'), 'cpc')
  assert.equal(destination.searchParams.get('__cvg_uid'), 'user-1')
  assert.equal(destination.searchParams.get('__cvg_sid'), 'sess-1')
  assert.equal(destination.searchParams.getAll('utm_source').length, 1)
  const reyou = tracked.find((event) => event.eventName === 'HPV Reyou Click')
  assert.ok(reyou)
  assert.equal(reyou.properties.outbound_url, 'https://getreyou.com/products/dual-path-hair-revival-serum')
  assert.equal(reyou.properties.outbound_url.includes('ad_id'), false)

  const mod = dom.window.document.getElementById('mod')
  mod.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true, cancelable: true, metaKey: true, button: 0 }))
  const modified = new URL(mod.href)
  assert.equal(modified.searchParams.get('utm_source'), 'hpv')
  assert.equal(modified.searchParams.get('channel'), 'facebook')
  assert.equal(modified.searchParams.get('path_source'), 'my-review')
  assert.equal(modified.searchParams.get('ad_id'), '333333')
  assert.equal(modified.searchParams.get('ref'), 'nav')
  assert.equal(modified.hash, '#top')
  assert.equal(modified.searchParams.get('__cvg_uid'), 'user-1')
  assert.equal(opened.length, 1)

  const ig = dom.window.document.getElementById('ig')
  const igHref = ig.getAttribute('href')
  ig.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true, cancelable: true, ctrlKey: true }))
  assert.equal(ig.getAttribute('href'), igHref)
  assert.equal(tracked.at(-1).eventName, 'Social Instagram Click')
  assert.equal(tracked.at(-1).properties.outbound_url, igHref)

  const mail = dom.window.document.getElementById('mail')
  mail.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true, cancelable: true }))
  assert.equal(tracked.at(-1).eventName, 'Email Contact Click')
  assert.equal(mail.getAttribute('href'), 'mailto:editorial@hairprovoices.com')
})

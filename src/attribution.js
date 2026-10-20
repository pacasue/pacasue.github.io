// Persists landing-page attribution and appends it to partner CTAs.
// public/cvg-events.js reads window.hpvAttribution when a partner link is clicked.
// Main domains match PARTNER_DOMAINS in that file.

export const STORAGE_KEY = 'hpv_attribution'
export const TTL_MS = 30 * 24 * 60 * 60 * 1000
export const WL_UTM_SOURCE = 'hpv'

export const MAIN_DOMAINS = ['getreyou.com', 'pacagen.com', 'drinkwildtype.com']

export const TRACKED_PARAMS = [
  'tw_source',
  'tw_adid',
  'cvg_source',
  'cvg_adid',
  'cvg_cid',
  'fbclid',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'utm_id',
  'campaign_id',
  'ad_id',
  'path_source',
]

export const AD_ID_PARAMS = [
  'fbclid',
  'tw_adid',
  'cvg_adid',
  'cvg_cid',
  'utm_id',
  'campaign_id',
  'ad_id',
]

const FORWARD_BEFORE_SOURCE = [
  'path_source',
  'tw_source',
  'tw_adid',
  'cvg_source',
  'cvg_adid',
  'cvg_cid',
  'fbclid',
]

const FORWARD_AFTER_CHANNEL = [
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'utm_id',
  'campaign_id',
  'ad_id',
]

const PROBE_KEY = '__hpv_storage_probe'

export function isUnresolvedMacro(value) {
  const raw = String(value ?? '').trim()
  if (!raw) return false
  if (/%7b%7b/i.test(raw)) return true
  let decoded = raw
  for (let i = 0; i < 2; i += 1) {
    try {
      const next = decodeURIComponent(decoded)
      if (next === decoded) break
      decoded = next
    } catch {
      break
    }
  }
  return /\{\{[\s\S]*?\}\}/.test(decoded)
}

export function isValidParamValue(value) {
  if (value == null) return false
  const trimmed = String(value).trim()
  if (!trimmed) return false
  return !isUnresolvedMacro(trimmed)
}

export function pathSourceFromPath(pathname) {
  const raw = String(pathname ?? '/')
  const pathOnly = raw.split('?')[0].split('#')[0]
  const trimmed = pathOnly.replace(/\/+$/, '')
  const segments = trimmed.split('/').filter(Boolean)
  if (segments.length === 0) return 'index'
  let last = segments[segments.length - 1]
  try {
    last = decodeURIComponent(last)
  } catch {
    // Keep the raw segment when it is not valid encoding.
  }
  last = last.replace(/\.[a-z0-9]{1,8}$/i, '')
  if (!last || last.toLowerCase() === 'index') return 'index'
  return last
}

export function isMainDomain(hostname, domains = MAIN_DOMAINS) {
  const host = String(hostname || '').toLowerCase().replace(/\.$/, '')
  return domains.some((domain) => host === domain || host.endsWith(`.${domain}`))
}

function createDocumentCookie(doc) {
  return {
    get(name) {
      const prefix = `${name}=`
      const parts = String(doc.cookie || '').split(';')
      for (const part of parts) {
        const trimmed = part.trim()
        if (!trimmed.startsWith(prefix)) continue
        const raw = trimmed.slice(prefix.length)
        try {
          const decoded = decodeURIComponent(raw)
          if (encodeURIComponent(decoded) === raw) return decoded
        } catch {
          // The jar already stored a decoded value.
        }
        return raw
      }
      return null
    },
    set(name, value, maxAge) {
      const age = Number.isFinite(maxAge) ? Math.max(0, Math.floor(maxAge)) : Math.floor(TTL_MS / 1000)
      const expires = new Date(Date.now() + age * 1000).toUTCString()
      doc.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; max-age=${age}; path=/; SameSite=Lax`
      return this.get(name) === value
    },
    remove(name) {
      doc.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; path=/; SameSite=Lax`
    },
  }
}

function storageWorks(write, read, remove) {
  try {
    write(PROBE_KEY, '1')
    const ok = read(PROBE_KEY) === '1'
    remove(PROBE_KEY)
    return ok
  } catch {
    return false
  }
}

export function createResilientStorage(overrides = {}) {
  const memory = overrides.memory || { raw: null }
  const ls = Object.prototype.hasOwnProperty.call(overrides, 'localStorage')
    ? overrides.localStorage
    : (typeof localStorage !== 'undefined' ? localStorage : null)
  const cookie = Object.prototype.hasOwnProperty.call(overrides, 'cookie')
    ? overrides.cookie
    : overrides.document
      ? createDocumentCookie(overrides.document)
      : (typeof document !== 'undefined' ? createDocumentCookie(document) : null)

  const localOk = Boolean(ls) && storageWorks(
    (key, value) => ls.setItem(key, value),
    (key) => ls.getItem(key),
    (key) => ls.removeItem(key),
  )
  const cookieOk = !localOk && Boolean(cookie) && storageWorks(
    (key, value) => cookie.set(key, value, 60),
    (key) => cookie.get(key),
    (key) => cookie.remove(key),
  )

  let mode = localOk ? 'local' : cookieOk ? 'cookie' : 'memory'

  function get() {
    if (mode === 'local') {
      try {
        return ls.getItem(STORAGE_KEY)
      } catch {
        mode = 'memory'
      }
    } else if (mode === 'cookie') {
      try {
        return cookie.get(STORAGE_KEY)
      } catch {
        mode = 'memory'
      }
    }
    return memory.raw
  }

  function set(value, maxAge) {
    if (mode === 'local') {
      try {
        ls.setItem(STORAGE_KEY, value)
        return
      } catch {
        mode = cookie && cookieWorks(cookie) ? 'cookie' : 'memory'
      }
    }
    if (mode === 'cookie') {
      try {
        if (cookie.set(STORAGE_KEY, value, maxAge ?? Math.floor(TTL_MS / 1000))) return
      } catch {
        // Fall through to memory when the cookie jar rejects the write.
      }
      mode = 'memory'
    }
    memory.raw = value
  }

  function remove() {
    memory.raw = null
    if (ls) {
      try { ls.removeItem(STORAGE_KEY) } catch { /* storage already unavailable */ }
    }
    if (cookie) {
      try { cookie.remove(STORAGE_KEY) } catch { /* storage already unavailable */ }
    }
  }

  return {
    get,
    set,
    remove,
    getMode: () => mode,
  }
}

function cookieWorks(cookie) {
  return storageWorks(
    (key, value) => cookie.set(key, value, 60),
    (key) => cookie.get(key),
    (key) => cookie.remove(key),
  )
}

function sanitizeParams(params) {
  const clean = {}
  if (!params) return clean
  for (const key of TRACKED_PARAMS) {
    if (isValidParamValue(params[key])) clean[key] = String(params[key]).trim()
  }
  return clean
}

function parseTrackingParams(url) {
  let searchParams
  try {
    searchParams = new URL(url, 'https://wl.local').searchParams
  } catch {
    return {}
  }
  const incoming = {}
  for (const key of TRACKED_PARAMS) {
    const value = searchParams.get(key)
    if (isValidParamValue(value)) incoming[key] = value.trim()
  }
  return incoming
}

function hasAdConflict(stored, incoming) {
  for (const key of AD_ID_PARAMS) {
    if (!incoming[key] || !stored[key]) continue
    if (incoming[key] !== stored[key]) return true
  }
  return false
}

function pathnameOf(url) {
  try {
    return new URL(url, 'https://wl.local').pathname
  } catch {
    return '/'
  }
}

function hrefMatches(left, right) {
  try {
    const a = new URL(left)
    const b = new URL(right)
    if (a.origin !== b.origin || a.pathname !== b.pathname || a.hash !== b.hash) return false
    const keys = new Set([...a.searchParams.keys(), ...b.searchParams.keys()])
    for (const key of keys) {
      const av = a.searchParams.getAll(key)
      const bv = b.searchParams.getAll(key)
      if (av.length !== bv.length) return false
      for (let i = 0; i < av.length; i += 1) {
        if (av[i] !== bv[i]) return false
      }
    }
    return true
  } catch {
    return left === right
  }
}

export function createAttribution(options = {}) {
  const storage = options.storage || createResilientStorage()
  const now = options.now || (() => Date.now())
  const wlSource = options.wlSource || WL_UTM_SOURCE
  const domains = options.domains || MAIN_DOMAINS
  const getLocation = options.getLocation || (() => (
    typeof location !== 'undefined' ? location : { href: 'https://wl.local/', pathname: '/' }
  ))

  function readRecord() {
    const raw = storage.get()
    if (!raw) return null
    let record
    try {
      record = JSON.parse(raw)
    } catch {
      storage.remove()
      return null
    }
    if (!record || typeof record.capturedAt !== 'number' || !record.params || typeof record.params !== 'object') {
      storage.remove()
      return null
    }
    if (now() - record.capturedAt >= TTL_MS) {
      storage.remove()
      return null
    }
    return { params: sanitizeParams(record.params), capturedAt: record.capturedAt }
  }

  function writeRecord(record) {
    const clean = { params: sanitizeParams(record.params), capturedAt: record.capturedAt }
    const remainingMs = clean.capturedAt + TTL_MS - now()
    storage.set(JSON.stringify(clean), Math.max(0, Math.floor(remainingMs / 1000)))
    return clean
  }

  function capture(url, pathname) {
    const incoming = parseTrackingParams(url)
    const existing = readRecord()
    const pagePath = pathname == null ? pathnameOf(url) : pathname

    if (!existing || hasAdConflict(existing.params, incoming)) {
      const params = { ...incoming }
      if (!isValidParamValue(params.path_source)) {
        const generated = pathSourceFromPath(pagePath)
        if (isValidParamValue(generated)) params.path_source = generated
      }
      return writeRecord({ params, capturedAt: now() })
    }

    const params = { ...existing.params }
    for (const key of TRACKED_PARAMS) {
      if (key === 'path_source') continue
      if (incoming[key]) params[key] = incoming[key]
    }
    if (!isValidParamValue(params.path_source)) {
      const generated = isValidParamValue(incoming.path_source)
        ? incoming.path_source
        : pathSourceFromPath(pagePath)
      if (isValidParamValue(generated)) params.path_source = generated
    }
    return writeRecord({ params, capturedAt: existing.capturedAt })
  }

  function load() {
    return readRecord()
  }

  function isMainHref(href, base) {
    try {
      const url = new URL(href, base || getLocation().href || 'https://wl.local/')
      if (url.protocol !== 'http:' && url.protocol !== 'https:') return false
      return isMainDomain(url.hostname, domains)
    } catch {
      return false
    }
  }

  function buildOutboundUrl(destination, base) {
    const baseHref = base || getLocation().href || 'https://wl.local/'
    let url
    try {
      url = new URL(destination, baseHref)
    } catch {
      return destination
    }
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return destination
    if (!isMainDomain(url.hostname, domains)) return destination

    const params = load()?.params || {}
    for (const key of FORWARD_BEFORE_SOURCE) {
      if (isValidParamValue(params[key])) url.searchParams.set(key, params[key])
    }
    url.searchParams.set('utm_source', wlSource)
    if (isValidParamValue(params.utm_source)) url.searchParams.set('channel', params.utm_source)
    for (const key of FORWARD_AFTER_CHANNEL) {
      if (isValidParamValue(params[key])) url.searchParams.set(key, params[key])
    }
    return url.href
  }

  function isDecoratedHref(href) {
    try {
      return new URL(href, getLocation().href).searchParams.get('utm_source') === wlSource
    } catch {
      return false
    }
  }

  function sourceHref(anchor) {
    const attr = anchor.getAttribute('href') || ''
    const stored = anchor.getAttribute('data-hpv-original')
    if (!stored) {
      if (!isMainHref(attr)) return null
      anchor.setAttribute('data-hpv-original', attr)
      return attr
    }
    if (!isDecoratedHref(attr) && attr !== stored && isMainHref(attr)) {
      anchor.setAttribute('data-hpv-original', attr)
      return attr
    }
    return stored
  }

  function tagAnchor(anchor) {
    if (!anchor || String(anchor.tagName || '').toUpperCase() !== 'A') return
    const source = sourceHref(anchor)
    if (!source) return
    const next = buildOutboundUrl(source)
    if (!next || hrefMatches(anchor.href, next)) return
    anchor.href = next
  }

  function tagLinks(root) {
    const scope = root || (typeof document !== 'undefined' ? document : null)
    if (!scope || !scope.querySelectorAll) return
    scope.querySelectorAll('a[href]').forEach((anchor) => tagAnchor(anchor))
  }

  return {
    capture,
    load,
    buildOutboundUrl,
    tagLinks,
    tagAnchor,
    pathSourceFromPath,
  }
}

export function installAttribution(target) {
  const win = target || (typeof window !== 'undefined' ? window : undefined)
  if (!win || !win.document) return null
  if (win.__hpvAttributionInstalled && win.hpvAttribution) return win.hpvAttribution

  const api = createAttribution({
    storage: createResilientStorage({
      localStorage: win.localStorage,
      document: win.document,
    }),
    now: () => Date.now(),
    getLocation: () => win.location,
  })

  let tagging = false
  let observer = null

  function onNavigate() {
    api.capture(win.location.href, win.location.pathname)
    if (tagging) api.tagLinks(win.document)
  }

  function startTagging() {
    if (tagging) return
    tagging = true
    api.tagLinks(win.document)
    observer = new win.MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes') {
          api.tagAnchor(mutation.target)
          continue
        }
        mutation.addedNodes.forEach((node) => {
          if (!node || node.nodeType !== 1) return
          if (node.matches && node.matches('a[href]')) api.tagAnchor(node)
          if (node.querySelectorAll) node.querySelectorAll('a[href]').forEach((anchor) => api.tagAnchor(anchor))
        })
      }
    })
    observer.observe(win.document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['href'],
    })
  }

  function onClick(event) {
    const targetNode = event.target
    if (!targetNode || !targetNode.closest) return
    const anchor = targetNode.closest('a[href]')
    if (!anchor) return
    api.tagAnchor(anchor)
  }

  if (!win.__hpvHistoryWrapped && win.history) {
    const wrap = (method) => {
      const original = win.history[method]
      if (typeof original !== 'function') return
      win.history[method] = function wrappedHistory() {
        const result = original.apply(this, arguments)
        onNavigate()
        return result
      }
    }
    wrap('pushState')
    wrap('replaceState')
    win.__hpvHistoryWrapped = true
    win.addEventListener('popstate', onNavigate)
  }

  const publicApi = {
    capture: (url, pathname) => api.capture(url ?? win.location.href, pathname ?? win.location.pathname),
    load: () => api.load(),
    buildOutboundUrl: (destination, base) => api.buildOutboundUrl(destination, base || win.location.href),
    tagLinks: (root) => api.tagLinks(root || win.document),
    pathSourceFromPath,
    startTagging,
    disconnect() {
      if (observer) observer.disconnect()
      observer = null
      tagging = false
    },
    WL_UTM_SOURCE,
    MAIN_DOMAINS,
    TRACKED_PARAMS,
    STORAGE_KEY,
  }

  win.hpvAttribution = publicApi
  win.__hpvAttributionInstalled = true
  win.addEventListener('click', onClick, true)
  api.capture(win.location.href, win.location.pathname)
  return publicApi
}

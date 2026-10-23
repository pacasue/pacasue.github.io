import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { JSDOM } from 'jsdom'
import { articles, authors, authorPath } from '../docs/server/entry-server.js'

const root = fileURLToPath(new URL('../', import.meta.url))
const site = 'https://hairprovoices.com'
const sitemap = readFileSync(`${root}docs/sitemap.xml`, 'utf8')
const cluster = articles.filter(a => /novogro/i.test(`${a.title} ${a.excerpt} ${a.body}`))
const clusterTitles = new Set()
const readPage = path => new JSDOM(readFileSync(`${root}docs${path}index.html`, 'utf8')).window.document

for (const article of articles) {
  const path = `/article/${article.slug}/`
  const doc = readPage(path)
  assert.equal(doc.querySelectorAll('h1').length, 1, path)
  assert.equal(doc.querySelectorAll('title').length, 1, path)
  assert.equal(doc.querySelectorAll('link[rel="canonical"]').length, 1, path)
  assert.equal(doc.querySelector('link[rel="canonical"]').href, site + path)
  assert.equal(doc.querySelector('meta[property="og:url"]').content, site + path)
  assert.ok(doc.querySelector('meta[name="description"]').content.length > 20, path)
  assert.ok(!doc.querySelector('meta[name="robots"]')?.content.includes('noindex'), path)
  const schema = JSON.parse(doc.querySelector('script[type="application/ld+json"]').textContent)
  const articleSchema = schema.find(x => x['@type'] === 'Article')
  assert.equal(articleSchema.headline, doc.querySelector('h1').textContent.trim(), path)
  assert.equal(schema.find(x => x['@type'] === 'BreadcrumbList').itemListElement.length, 3, path)
  const authorUrl = articleSchema.author.url
  assert.ok(existsSync(`${root}docs${decodeURIComponent(new URL(authorUrl).pathname)}index.html`), authorUrl)
  assert.ok(sitemap.includes(site + path), path)

  if (cluster.includes(article)) {
    assert.ok(!clusterTitles.has(doc.title), `Duplicate title: ${doc.title}`)
    clusterTitles.add(doc.title)
    const section = [...doc.querySelectorAll('section')].find(s => s.textContent.includes('You May Also Like'))
    const related = [...section.querySelectorAll('a[href^="/article/"]')]
    assert.equal(related.length, 3, path)
    for (const link of related) {
      assert.ok(cluster.some(a => a.slug !== article.slug && `/article/${a.slug}/` === link.getAttribute('href')), link.href)
    }
    const cover = doc.querySelector('meta[property="og:image"]').content
    if (cover.startsWith(site)) {
      assert.ok(existsSync(`${root}docs${decodeURIComponent(new URL(cover).pathname)}`), cover)
    }
  }
}

for (const author of Object.values(authors)) {
  const path = authorPath(author.name)
  const doc = readPage(path)
  assert.equal(doc.querySelector('h1')?.textContent, author.name, path)
  assert.equal(doc.querySelector('link[rel="canonical"]').href, site + path)
  assert.ok(sitemap.includes(site + path), path)
}

console.log(`SEO checks passed: ${articles.length} articles, ${Object.keys(authors).length} authors, ${cluster.length} NOVOGRO articles, and sitemap.`)

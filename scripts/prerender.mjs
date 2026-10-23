import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const outDir = resolve(root, 'docs')
const BASE = 'https://hairprovoices.com'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function toW3CDate(dateStr) {
  const d = new Date(dateStr)
  return isNaN(d) ? new Date().toISOString().slice(0, 10) : d.toISOString().slice(0, 10)
}

function buildHeadTags(seo) {
  const tags = [`  <link rel="canonical" href="${escapeHtml(seo.canonical)}" />`]
  for (const [key, value] of Object.entries(seo.meta)) {
    const attr = key.startsWith('twitter:') ? 'name' : 'property'
    tags.push(`  <meta data-page-seo ${attr}="${key}" content="${escapeHtml(value)}" />`)
  }
  if (seo.structuredData.length) {
    const json = JSON.stringify(seo.structuredData).replace(/</g, '\\u003c')
    tags.push(`  <script data-page-seo type="application/ld+json">${json}</script>`)
  }
  return tags.join('\n')
}

// ---------------------------------------------------------------------------
// Load SSR bundle
// ---------------------------------------------------------------------------

const { render, articles, authors, buildPageSeo, authorPath } = await import(
  pathToFileURL(resolve(outDir, 'server/entry-server.js')).href
)

const articleRoutes = articles.filter((a) => a.slug).map((a) => `/article/${a.slug}/`)

const authorRoutes = [...new Set(Object.values(authors).map(author => authorPath(author.name)))]
const routes = ['/', '/articles/', '/gallery/', '/contributors/', '/about/', ...articleRoutes, ...authorRoutes]

const template = readFileSync(resolve(outDir, 'index.html'), 'utf-8')

// ---------------------------------------------------------------------------
// Prerender pages
// ---------------------------------------------------------------------------

for (const route of routes) {
  let html
  try {
    html = render(route)
  } catch (e) {
    console.warn(`Skipping ${route}: ${e.message}`)
    continue
  }

  const seo = buildPageSeo(route, articles, authors)
  const { title, description } = seo
  const headTags = buildHeadTags(seo)

  const pageHtml = template
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${escapeHtml(description)}" />`)
    .replace('</head>', `${headTags}\n</head>`)
    .replace('<!--ssr-outlet-->', html)

  const outPath =
    route === '/' ? resolve(outDir, 'index.html') : resolve(outDir, route.slice(1), 'index.html')
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, pageHtml)
  console.log(`Prerendered: ${route}`)
}

// ---------------------------------------------------------------------------
// Static files
// ---------------------------------------------------------------------------

// CNAME — must survive vite's outDir wipe
const cnameSrc = resolve(root, 'CNAME')
if (existsSync(cnameSrc)) {
  copyFileSync(cnameSrc, resolve(outDir, 'CNAME'))
  console.log('Copied CNAME → docs/CNAME')
}

// 404 fallback keeps SPA routing for non-prerendered paths
writeFileSync(resolve(outDir, '404.html'), readFileSync(resolve(outDir, 'index.html'), 'utf-8'))
console.log('Copied index.html → 404.html')

const legacyAliases = [
  {
    from: '/article/NOVOGRO™-vs-minoxidil/',
    to: '/article/novogro-vs-minoxidil/',
  },
]

for (const alias of legacyAliases) {
  const targetUrl = `${BASE}${alias.to}`
  const aliasHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Redirecting — HairProVoices</title>
    <link rel="canonical" href="${targetUrl}" />
    <meta http-equiv="refresh" content="0; url=${targetUrl}" />
    <meta name="robots" content="noindex, follow" />
    <script>window.location.replace(${JSON.stringify(targetUrl)})</script>
  </head>
  <body>
    <p>Redirecting to <a href="${targetUrl}">${targetUrl}</a>.</p>
  </body>
</html>
`
  const aliasPath = resolve(outDir, alias.from.slice(1), 'index.html')
  mkdirSync(dirname(aliasPath), { recursive: true })
  writeFileSync(aliasPath, aliasHtml)
  console.log(`Generated legacy alias: ${alias.from} → ${alias.to}`)
}

// robots.txt
writeFileSync(
  resolve(outDir, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${BASE}/sitemap.xml\n`
)
console.log('Generated robots.txt')

// sitemap.xml
const staticPages = [
  { path: '/',             priority: '1.0', changefreq: 'daily'   },
  { path: '/articles/',     priority: '0.9', changefreq: 'daily'   },
  { path: '/gallery/',      priority: '0.7', changefreq: 'weekly'  },
  { path: '/contributors/', priority: '0.6', changefreq: 'monthly' },
  { path: '/about/',        priority: '0.5', changefreq: 'monthly' },
]
const articleEntries = articles
  .filter((a) => a.slug)
  .map((a) => {
    const img = a.image || ''
    // Only include images hosted on our own domain — external images
    // (pexels/envato/unsplash) get credited to those domains, not us.
    const isLocal = img.startsWith('/') || img.startsWith(BASE)
    const imageLoc = isLocal ? (img.startsWith('http') ? img : `${BASE}${img}`) : null
    return { path: `/article/${a.slug}/`, lastmod: toW3CDate(a.date), priority: '0.8', changefreq: 'monthly', image: imageLoc }
  })

const sitemapXml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n` +
  `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
  [...staticPages, ...articleEntries, ...authorRoutes.map(path => ({ path, priority: '0.5', changefreq: 'monthly' }))]
    .map((e) =>
      [
        `  <url>`,
        `    <loc>${BASE}${e.path}</loc>`,
        e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
        `    <changefreq>${e.changefreq}</changefreq>`,
        `    <priority>${e.priority}</priority>`,
        e.image ? `    <image:image>\n      <image:loc>${escapeHtml(e.image)}</image:loc>\n    </image:image>` : null,
        `  </url>`,
      ]
        .filter(Boolean)
        .join('\n')
    )
    .join('\n') +
  `\n</urlset>\n`

const imageCount = articleEntries.filter((e) => e.image).length
writeFileSync(resolve(outDir, 'sitemap.xml'), sitemapXml)
console.log(`Generated sitemap.xml (${staticPages.length + articleEntries.length + authorRoutes.length} URLs, ${imageCount} images)`)

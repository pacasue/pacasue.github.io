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

function buildHeadTags(route, article) {
  const canonicalUrl = `${BASE}${route}`
  const tags = [`  <link rel="canonical" href="${canonicalUrl}" />`]

  tags.push(`  <meta property="og:type" content="${article ? 'article' : 'website'}" />`)
  tags.push(`  <meta property="og:site_name" content="HairProVoices" />`)
  tags.push(`  <meta property="og:url" content="${canonicalUrl}" />`)
  tags.push(`  <meta name="twitter:card" content="summary_large_image" />`)
  tags.push(`  <meta name="twitter:site" content="@hairprovoices" />`)

  if (article) {
    const ogTitle = escapeHtml(article.metaTitle || article.title)
    const ogDesc  = escapeHtml(article.metaDescription || article.excerpt)
    const ogImage = escapeHtml(
      article.image.startsWith('http') ? article.image : `${BASE}${article.image}`
    )
    const pubDate = toW3CDate(article.date)

    tags.push(`  <meta property="og:title" content="${ogTitle}" />`)
    tags.push(`  <meta property="og:description" content="${ogDesc}" />`)
    tags.push(`  <meta property="og:image" content="${ogImage}" />`)
    tags.push(`  <meta property="article:published_time" content="${pubDate}" />`)
    tags.push(`  <meta property="article:author" content="${escapeHtml(article.author)}" />`)
    tags.push(`  <meta name="twitter:title" content="${ogTitle}" />`)
    tags.push(`  <meta name="twitter:description" content="${ogDesc}" />`)
    tags.push(`  <meta name="twitter:image" content="${ogImage}" />`)

    const imageUrl = article.image.startsWith('http') ? article.image : `${BASE}${article.image}`
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.metaTitle || article.title,
      description: article.metaDescription || article.excerpt,
      image: {
        '@type': 'ImageObject',
        url: imageUrl,
        caption: article.metaTitle || article.title,
        representativeOfPage: true,
      },
      datePublished: pubDate,
      author: { '@type': 'Person', name: article.author },
      publisher: {
        '@type': 'Organization',
        name: 'HairProVoices',
        url: BASE,
        logo: {
          '@type': 'ImageObject',
          url: `${BASE}/image/site-logo.svg`,
        },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    }
    tags.push(`  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`)
  } else {
    tags.push(`  <meta name="twitter:title" content="HairProVoices" />`)
    tags.push(`  <meta name="twitter:description" content="The pulse of the professional hair industry." />`)
    if (route === '/') {
      const jsonLd = { '@context': 'https://schema.org', '@type': 'WebSite', name: 'HairProVoices', url: BASE }
      tags.push(`  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`)
    }
  }

  return tags.join('\n')
}

// ---------------------------------------------------------------------------
// Load SSR bundle
// ---------------------------------------------------------------------------

const { render, articles } = await import(
  pathToFileURL(resolve(outDir, 'server/entry-server.js')).href
)

const articleRoutes = articles.filter((a) => a.slug).map((a) => `/article/${a.slug}`)

const routes = ['/', '/articles', '/gallery', '/contributors', '/about', ...articleRoutes]

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

  let title = 'HairProVoices — The Pulse of the Pro Hair Industry'
  let description = 'HairProVoices — The pulse of the professional hair industry. Trends, techniques, education, and inspiration for stylists.'
  let article = null

  const articleSlug = route.match(/^\/article\/(.+)$/)?.[1]
  if (articleSlug) {
    article = articles.find((a) => a.slug === articleSlug)
    if (article) {
      title = article.metaTitle || article.title
      description = article.metaDescription || article.excerpt
    }
  } else if (route === '/articles') {
    title = 'All Articles — HairProVoices'
    description = 'Browse all articles on trends, techniques, and education for hair professionals.'
  } else if (route === '/gallery') {
    title = 'Gallery — HairProVoices'
    description = 'Explore our gallery of professional hair looks and inspirations.'
  } else if (route === '/contributors') {
    title = 'Contributors — HairProVoices'
    description = 'Meet the stylists, educators, and experts behind HairProVoices.'
  } else if (route === '/about') {
    title = 'About — HairProVoices'
    description = 'Learn about HairProVoices and our mission for the professional hair industry.'
  }

  const headTags = buildHeadTags(route, article)

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

// robots.txt
writeFileSync(
  resolve(outDir, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${BASE}/sitemap.xml\n`
)
console.log('Generated robots.txt')

// sitemap.xml
const staticPages = [
  { path: '/',             priority: '1.0', changefreq: 'daily'   },
  { path: '/articles',     priority: '0.9', changefreq: 'daily'   },
  { path: '/gallery',      priority: '0.7', changefreq: 'weekly'  },
  { path: '/contributors', priority: '0.6', changefreq: 'monthly' },
  { path: '/about',        priority: '0.5', changefreq: 'monthly' },
]
const articleEntries = articles
  .filter((a) => a.slug)
  .map((a) => {
    const img = a.image || ''
    // Only include images hosted on our own domain — external images
    // (pexels/envato/unsplash) get credited to those domains, not us.
    const isLocal = img.startsWith('/') || img.startsWith(BASE)
    const imageLoc = isLocal ? (img.startsWith('http') ? img : `${BASE}${img}`) : null
    return { path: `/article/${a.slug}`, lastmod: toW3CDate(a.date), priority: '0.8', changefreq: 'monthly', image: imageLoc }
  })

const sitemapXml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n` +
  `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
  [...staticPages, ...articleEntries]
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
console.log(`Generated sitemap.xml (${staticPages.length + articleEntries.length} URLs, ${imageCount} images)`)

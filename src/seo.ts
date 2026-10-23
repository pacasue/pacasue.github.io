import type { Article, Author } from './data/articles'

export const SITE_URL = 'https://hairprovoices.com'

export function authorPath(name: string) {
  return `/author/${name.toLowerCase().replace(/\s+/g, '-')}/`
}

export function canonicalPath(path: string) {
  const clean = path.split(/[?#]/)[0]
  return clean === '/' || clean.endsWith('/') ? clean : `${clean}/`
}

export interface PageSeo {
  title: string
  description: string
  canonical: string
  meta: Record<string, string>
  structuredData: Record<string, unknown>[]
}

export function buildPageSeo(path: string, articles: Article[], authors: Record<string, Author>): PageSeo {
  const route = canonicalPath(path)
  const canonical = `${SITE_URL}${route}`
  const articleSlug = route.match(/^\/article\/([^/]+)\/$/)?.[1]
  const article = articles.find(a => a.slug === articleSlug)
  const author = Object.values(authors).find(a => authorPath(a.name) === route)
  const titles: Record<string, [string, string]> = {
    '/': ['HairProVoices — The Pulse of the Pro Hair Industry', 'HairProVoices — The pulse of the professional hair industry. Trends, techniques, education, and inspiration for stylists.'],
    '/articles/': ['All Articles — HairProVoices', 'Browse all articles on trends, techniques, and education for hair professionals.'],
    '/gallery/': ['Gallery — HairProVoices', 'Explore our gallery of professional hair looks and inspirations.'],
    '/contributors/': ['Contributors — HairProVoices', 'Meet the stylists, educators, and experts behind HairProVoices.'],
    '/about/': ['About — HairProVoices', 'Learn about HairProVoices and our mission for the professional hair industry.'],
  }
  const [title, description] = article
    ? [article.metaTitle || article.title, article.metaDescription || article.excerpt]
    : author
      ? [`${author.name} — HairProVoices Contributor`, `${author.name}, ${author.title}. Read their articles on hair care, styling, and hair science at HairProVoices.`]
      : titles[route] || titles['/']
  const meta: Record<string, string> = {
    'og:type': article ? 'article' : author ? 'profile' : 'website',
    'og:site_name': 'HairProVoices',
    'og:url': canonical,
    'og:title': title,
    'og:description': description,
    'twitter:card': 'summary_large_image',
    'twitter:site': '@hairprovoices',
    'twitter:title': title,
    'twitter:description': description,
  }
  const structuredData: Record<string, unknown>[] = []
  if (article) {
    const articleAuthor = authors[article.author]
    const authorName = articleAuthor?.name || article.author
    const image = new URL(article.image, SITE_URL).href
    const datePublished = new Date(article.date).toISOString().slice(0, 10)
    Object.assign(meta, {
      'og:image': image,
      'og:image:alt': article.title,
      'twitter:image': image,
      'twitter:image:alt': article.title,
      'article:published_time': datePublished,
      'article:author': `${SITE_URL}${authorPath(authorName)}`,
    })
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${canonical}#article`,
      headline: article.title,
      description,
      image: { '@type': 'ImageObject', url: image, caption: article.title, representativeOfPage: true },
      datePublished,
      author: { '@type': 'Person', name: authorName, url: `${SITE_URL}${authorPath(authorName)}` },
      publisher: {
        '@type': 'Organization', name: 'HairProVoices', url: SITE_URL,
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/image/site-logo.svg` },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    }, {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: article.section, item: `${SITE_URL}/articles/?section=${encodeURIComponent(article.section)}` },
        { '@type': 'ListItem', position: 3, name: article.title, item: canonical },
      ],
    })
  } else if (author) {
    structuredData.push({
      '@context': 'https://schema.org', '@type': 'ProfilePage', '@id': canonical,
      mainEntity: { '@type': 'Person', name: author.name, url: canonical, description: author.bio, image: new URL(author.image, SITE_URL).href },
    })
  } else if (route === '/') {
    structuredData.push({ '@context': 'https://schema.org', '@type': 'WebSite', name: 'HairProVoices', url: SITE_URL })
  }
  return { title, description, canonical, meta, structuredData }
}

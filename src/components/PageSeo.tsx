import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { articles, authors } from '../data/articles'
import { buildPageSeo } from '../seo'

export default function PageSeo() {
  const { pathname } = useLocation()
  useEffect(() => {
    const seo = buildPageSeo(pathname, articles, authors)
    document.title = seo.title
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (description) description.content = seo.description
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.append(canonical)
    }
    canonical.href = seo.canonical
    document.head.querySelectorAll('[data-page-seo]').forEach(node => node.remove())
    for (const [key, content] of Object.entries(seo.meta)) {
      const tag = document.createElement('meta')
      tag.setAttribute(key.startsWith('twitter:') ? 'name' : 'property', key)
      tag.content = content
      tag.dataset.pageSeo = ''
      document.head.append(tag)
    }
    if (seo.structuredData.length) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.dataset.pageSeo = ''
      script.textContent = JSON.stringify(seo.structuredData)
      document.head.append(script)
    }
  }, [pathname])
  return null
}

import type { Article } from '../../data/articles'

const copperTocItems = [
  { id: 'why-copper-works', label: 'Why Copper Works' },
  { id: 'the-formula-breakdown', label: 'The Formula Breakdown' },
  { id: 'application-technique', label: 'Application Technique' },
  { id: 'selling-the-maintenance-story', label: 'Selling Maintenance' },
]

export function slugifyHeading(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function getArticleTocItems(article: Article) {
  if (!article.body) return article.slug === 'copper-renaissance-2026' ? copperTocItems : []
  if (article.slug === 'best-thinning-hair-treatments-reviewed-by-pros') {
    const tocHeadings = [...article.body.matchAll(/^##\s+(?!#)(.+)$/gm)]
      .map((m) => m[1])
      .filter((heading) =>
        heading === 'The Scorecard'
        || /^\d+\.\s+/.test(heading)
        || heading.startsWith('Bonus: Ketoconazole Shampoo')
        || heading === 'Where We Would Start'
        || heading === 'How We Evaluated the Treatments'
      )
    return tocHeadings.map((heading) => ({
      id: slugifyHeading(heading),
      label: heading.startsWith('Bonus: Ketoconazole Shampoo')
        ? 'Ketoconazole Shampoo'
        : heading.replace(/^\d+\.\s+[^:]+:\s*/, ''),
    }))
  }
  const sectionHeadings = [...article.body.matchAll(/^##\s+(?!#)(.+)$/gm)]
  const headings = sectionHeadings.length > 0
    ? sectionHeadings
    : [...article.body.matchAll(/^###\s+(?!#)(.+)$/gm)]
  return headings.map((match) => ({
    id: slugifyHeading(match[1]),
    label: match[1],
  }))
}

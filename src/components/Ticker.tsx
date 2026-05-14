import { articles } from '../data/articles'

const tagLabel: Record<string, string> = {
  'Color': 'COLOR',
  'Cut & Style': 'STYLE',
  'Texture': 'TEXTURE',
  'Tips': 'TIPS',
  'Products': 'PRODUCTS',
  'Technique': 'TECHNIQUE',
  'Hair Thinning': 'HAIR CARE',
  'At-Home Tips': 'AT HOME',
  'Business': 'BUSINESS',
}

const tickerArticles = articles.filter((a) => a.slug !== 'copper-renaissance-2026')

const doubled = [...tickerArticles, ...tickerArticles]

export default function Ticker() {
  return (
    <div className="bg-gold-500 text-black overflow-hidden h-8 flex items-center">
      <div
        className="flex gap-12 whitespace-nowrap ticker-scroll"
        style={{ width: 'max-content' }}
      >
        {doubled.map((article, i) => (
          <a
            key={i}
            href={`/article/${article.slug}`}
            className="text-[10px] font-semibold tracking-widest uppercase hover:underline"
          >
            ✦ {tagLabel[article.tag] ?? article.tag.toUpperCase()}: {article.title}
          </a>
        ))}
      </div>
    </div>
  )
}

import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Article } from '../../data/articles'
import { authors } from '../../data/articles'

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&q=80&auto=format&fit=crop&facepad=3'

function authorSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-')
}

export default function ArticleAuthor({ article }: { article: Article }) {
  const author = authors[article.author]
  const name = author?.name ?? article.author
  const title = author?.title ?? 'Contributor'
  const bio = author?.bio ?? `${name} is a contributor to HairProVoices, covering ${article.category.toLowerCase()} and professional hair industry topics.`
  const image = author?.image ?? FALLBACK_IMAGE
  const slug = authorSlug(name)

  return (
    <div className="mt-14 pt-8 border-t border-white/10">
      <p className="text-[10px] tracking-[0.3em] uppercase text-charcoal-600 mb-6">About the Author</p>

      <div className="flex flex-col sm:flex-row gap-6 bg-white/[0.03] border border-white/8 p-6">
        <div className="flex-shrink-0">
          <Link to={`/author/${slug}`}>
            <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-gold-500/20 hover:ring-gold-500/60 transition-all">
              <img src={image} alt={name} className="w-full h-full object-cover object-top" />
            </div>
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <div>
            <Link to={`/author/${slug}`} className="text-lg font-bold text-white hover:text-gold-500 transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
              {name}
            </Link>
            <p className="text-[10px] tracking-widest uppercase text-gold-500 mt-0.5 font-medium">
              {title} · HairProVoices
            </p>
          </div>
          <p className="text-sm text-charcoal-400 leading-relaxed">{bio}</p>
          <div className="flex items-center gap-4 mt-2">
            <a href="#" onClick={(e) => e.preventDefault()} className="text-[10px] tracking-widest uppercase text-charcoal-500 hover:text-gold-500 transition-colors">Instagram</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="text-[10px] tracking-widest uppercase text-charcoal-500 hover:text-gold-500 transition-colors">LinkedIn</a>
            <Link to={`/author/${slug}`} className="text-[10px] tracking-widest uppercase text-charcoal-500 hover:text-gold-500 transition-colors flex items-center gap-1">
              All Articles <ArrowRight size={9} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

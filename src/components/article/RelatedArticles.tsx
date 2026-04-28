import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { articles } from '../../data/articles'

export default function RelatedArticles({ currentSlug }: { currentSlug: string }) {
  const related = articles
    .filter((a) => a.slug !== currentSlug)
    .slice(0, 3)
  return (
    <section className="bg-black py-16 lg:py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-8 h-0.5 bg-gold-500" />
            <h2
              className="text-lg font-bold tracking-widest uppercase text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              You May Also Like
            </h2>
          </div>
          <Link
            to="/"
            className="hidden md:flex items-center gap-2 text-[11px] tracking-widest uppercase text-charcoal-400 hover:text-gold-500 transition-colors"
          >
            All Articles <ArrowRight size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {related.map((article) => (
            <Link
              key={article.title}
              to={`/article/${article.slug}`}
              className="group flex flex-col cursor-pointer card-hover"
            >
              <div className="overflow-hidden aspect-[3/2]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="pt-4 flex flex-col gap-2">
                <span className="text-[9px] tracking-[0.25em] uppercase text-gold-500 font-semibold">{article.tag}</span>
                <h3
                  className="text-lg font-bold text-charcoal-100 group-hover:text-white transition-colors leading-snug"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {article.title}
                </h3>
                <p className="text-sm text-charcoal-500 leading-relaxed line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center gap-2 text-[10px] text-charcoal-500">
                    <span className="font-medium text-charcoal-400">{article.author}</span>
                    <span>·</span>
                    <span>{article.readTime} read</span>
                  </div>
                  <ArrowRight
                    size={14}
                    className="text-charcoal-600 group-hover:text-gold-500 group-hover:translate-x-1 transition-all"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

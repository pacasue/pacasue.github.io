import { Link } from 'react-router-dom'
import { Clock, Calendar, Bookmark, Share2, ChevronRight } from 'lucide-react'
import type { Article } from '../../data/articles'

export default function ArticleHero({ article }: { article: Article }) {
  return (
    <section className="bg-black">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-4">
        <nav className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-charcoal-500">
          <Link to="/" className="hover:text-gold-500 transition-colors">Home</Link>
          <ChevronRight size={10} />
          <a href="#" className="hover:text-gold-500 transition-colors">{article.category}</a>
          <ChevronRight size={10} />
          <span className="text-charcoal-400 truncate max-w-[200px]">{article.title}</span>
        </nav>
      </div>

      {/* Hero image — full width with overlay */}
      <div className="relative aspect-[21/9] overflow-hidden">
        <img
          src={article.image.replace(/w=\d+/, 'w=1600').replace(/q=\d+/, 'q=90')}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* Category label */}
        <div className="absolute top-6 left-4 md:left-10">
          <span className="bg-gold-500 text-black text-[9px] font-bold tracking-[0.25em] uppercase px-3 py-1">
            {article.tag}
          </span>
        </div>
      </div>

      {/* Title block */}
      <div className="max-w-4xl mx-auto px-4 -mt-px pt-10 pb-10">
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-5"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {article.title}
        </h1>

        <p className="text-charcoal-300 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
          {article.excerpt}
        </p>

        {/* Byline + meta row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pt-6 border-t border-white/10">
          {/* Author */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-charcoal-800 flex items-center justify-center text-charcoal-400 text-sm font-bold">
              {article.author.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <p className="text-sm font-semibold text-charcoal-200">
                By{' '}
                <Link
                  to={`/author/${article.author.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-white hover:text-gold-500 transition-colors"
                >
                  {article.author}
                </Link>
              </p>
            </div>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-5 text-[11px] text-charcoal-500 tracking-wider">
            <span className="flex items-center gap-1.5">
              <Calendar size={11} /> {article.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={11} /> {article.readTime} read
            </span>
            {/* Actions */}
            <div className="flex items-center gap-2 ml-2">
              <button
                className="flex items-center gap-1.5 border border-white/10 hover:border-gold-500 hover:text-gold-500 text-charcoal-400 transition-colors px-3 py-1.5 text-[10px] tracking-widest uppercase"
                aria-label="Bookmark"
              >
                <Bookmark size={11} /> Save
              </button>
              <button
                className="flex items-center gap-1.5 border border-white/10 hover:border-white/30 text-charcoal-400 hover:text-white transition-colors px-3 py-1.5 text-[10px] tracking-widest uppercase"
                aria-label="Share"
              >
                <Share2 size={11} /> Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

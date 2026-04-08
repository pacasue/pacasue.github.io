import { Link } from 'react-router-dom'
import { Clock, Calendar, Bookmark, Share2, ChevronRight } from 'lucide-react'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1600&q=80&auto=format&fit=crop'

export default function ArticleHero() {
  return (
    <section className="bg-black">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-4">
        <nav className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-charcoal-500">
          <Link to="/" className="hover:text-gold-500 transition-colors">Home</Link>
          <ChevronRight size={10} />
          <a href="#" className="hover:text-gold-500 transition-colors">Color</a>
          <ChevronRight size={10} />
          <span className="text-charcoal-400">The Copper Renaissance</span>
        </nav>
      </div>

      {/* Hero image — full width with overlay */}
      <div className="relative aspect-[21/9] overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Copper hair color editorial"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* Category label */}
        <div className="absolute top-6 left-4 md:left-10">
          <span className="bg-gold-500 text-black text-[9px] font-bold tracking-[0.25em] uppercase px-3 py-1">
            Cover Story · Color Trends
          </span>
        </div>
      </div>

      {/* Title block */}
      <div className="max-w-4xl mx-auto px-4 -mt-px pt-10 pb-10">
        {/* Headline */}
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-5"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          The Copper Renaissance:<br />
          <em className="text-gold-400">Why This Shade Rules 2026</em>
        </h1>

        {/* Deck / subtitle */}
        <p className="text-charcoal-300 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
          From warm cognacs to deep auburn, copper-family tones are reclaiming editorial dominance.
          We spoke with 10 top colorists about how they're mixing, applying, and retailing this season's must-have hue.
        </p>

        {/* Byline + meta row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pt-6 border-t border-white/10">
          {/* Author */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=100&q=80&auto=format&fit=crop&facepad=3&faces=1"
                alt="Leila Fernandez"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-charcoal-200">
                By{' '}
                <a href="#" className="text-white hover:text-gold-500 transition-colors">
                  Leila Fernandez
                </a>
              </p>
              <p className="text-[10px] text-charcoal-500 uppercase tracking-wider">Senior Color Editor</p>
            </div>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-5 text-[11px] text-charcoal-500 tracking-wider">
            <span className="flex items-center gap-1.5">
              <Calendar size={11} /> April 8, 2026
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={11} /> 8 min read
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

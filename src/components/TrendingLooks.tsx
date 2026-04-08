import { useState } from 'react'
import { Heart, Share2, ArrowRight } from 'lucide-react'

type Category = 'All' | 'Color' | 'Cut' | 'Texture' | 'Vivid'

const looks = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1554519515-242161756769?w=600&q=80&auto=format&fit=crop',
    title: 'Caramel Balayage',
    stylist: '@hairbylucia',
    category: 'Color' as Category,
    likes: 2847,
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=600&q=80&auto=format&fit=crop',
    title: 'Glass Hair',
    stylist: '@smoothbytomasz',
    category: 'Cut' as Category,
    likes: 3201,
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&q=80&auto=format&fit=crop',
    title: 'Vivid Coral Melt',
    stylist: '@vividsbyimani',
    category: 'Vivid' as Category,
    likes: 4512,
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&q=80&auto=format&fit=crop',
    title: 'Natural Curl Set',
    stylist: '@curlsbynadia',
    category: 'Texture' as Category,
    likes: 1988,
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1590159983013-d4165bef452f?w=600&q=80&auto=format&fit=crop',
    title: 'Shadow Root Blonde',
    stylist: '@rootsbysophia',
    category: 'Color' as Category,
    likes: 3765,
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=80&auto=format&fit=crop',
    title: 'Bob with Texture',
    stylist: '@precision.alex',
    category: 'Cut' as Category,
    likes: 2100,
  },
]

const categories: Category[] = ['All', 'Color', 'Cut', 'Texture', 'Vivid']

export default function TrendingLooks() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set())

  const filtered = activeCategory === 'All'
    ? looks
    : looks.filter((l) => l.category === activeCategory)

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.preventDefault()
    setLikedIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <section className="bg-black py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-0.5 bg-gold-500" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-gold-500 font-medium">Lookbook</span>
            </div>
            <h2
              className="text-2xl md:text-3xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Trending Looks This Week
            </h2>
          </div>

          {/* Category filter */}
          <div className="flex gap-1 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] tracking-widest uppercase px-4 py-1.5 font-medium border transition-colors ${
                  activeCategory === cat
                    ? 'bg-gold-500 border-gold-500 text-black'
                    : 'border-white/10 text-charcoal-400 hover:border-white/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {filtered.map((look) => (
            <a
              key={look.id}
              href="#"
              className="relative group overflow-hidden aspect-[3/4] cursor-pointer block"
            >
              <img
                src={look.src}
                alt={look.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                {/* Top actions */}
                <div className="flex justify-end gap-2">
                  <button
                    onClick={(e) => toggleLike(look.id, e)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm border transition-all ${
                      likedIds.has(look.id)
                        ? 'bg-red-500/20 border-red-400 text-red-400'
                        : 'bg-black/30 border-white/20 text-white hover:border-white/60'
                    }`}
                  >
                    <Heart size={12} fill={likedIds.has(look.id) ? 'currentColor' : 'none'} />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-black/30 border border-white/20 flex items-center justify-center text-white hover:border-white/60 transition-colors backdrop-blur-sm">
                    <Share2 size={12} />
                  </button>
                </div>
                {/* Bottom info */}
                <div>
                  <p className="text-white text-sm font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {look.title}
                  </p>
                  <p className="text-charcoal-300 text-xs mt-0.5">{look.stylist}</p>
                  <div className="flex items-center gap-1 mt-2 text-[10px] text-charcoal-400">
                    <Heart size={9} />
                    <span>{(look.likes + (likedIds.has(look.id) ? 1 : 0)).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Category pill — always visible */}
              <div className="absolute top-2 left-2">
                <span className="text-[8px] tracking-widest uppercase bg-black/60 backdrop-blur-sm text-charcoal-300 px-2 py-0.5">
                  {look.category}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-8">
          <a
            href="#"
            className="flex items-center gap-2 border border-white/10 text-charcoal-300 hover:border-gold-500 hover:text-gold-500 text-[11px] tracking-widest uppercase px-8 py-3 transition-colors"
          >
            View Full Gallery <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { Heart } from 'lucide-react'
import Navbar from '../components/Navbar'
import Ticker from '../components/Ticker'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import FloatingNav from '../components/FloatingNav'
import { looks, type LookCategory } from '../data/looks'

type Category = LookCategory


const categories: Category[] = ['All', 'Color', 'Cut', 'Styling', 'Transformations']

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set())

  const filtered = activeCategory === 'All' ? looks : looks.filter((l) => l.category === activeCategory)

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.preventDefault()
    setLikedIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="min-h-screen bg-charcoal-950 text-charcoal-100">
      <Navbar />
      <Ticker />
      <FloatingNav />
      <main>
        {/* Header */}
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px bg-gold-500 w-8" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-gold-500 font-medium">Lookbook</span>
            </div>
            <h1
              className="text-3xl md:text-4xl font-bold text-white mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Gallery
            </h1>
            <p className="text-sm text-charcoal-400">Trending looks from our community of stylists</p>
          </div>
        </div>

        {/* Filter */}
        <div className="border-b border-white/10 sticky top-0 z-40 bg-charcoal-950">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-1 py-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-4 py-1.5 text-[10px] tracking-widest uppercase font-medium transition-colors border ${
                    activeCategory === cat
                      ? 'bg-gold-500 text-black border-gold-500'
                      : 'text-charcoal-400 border-white/10 hover:text-white hover:border-white/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 space-y-3 md:space-y-4">
            {filtered.map((look) => (
              <div
                key={look.id}
                className="relative group overflow-hidden cursor-pointer break-inside-avoid"
              >
                <img
                  src={look.src}
                  alt={look.title}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
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
                  </div>
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
                <div className="absolute top-2 left-2">
                  <span className="text-[8px] tracking-widest uppercase bg-black/60 backdrop-blur-sm text-charcoal-300 px-2 py-0.5">
                    {look.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

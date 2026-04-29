import { useState } from 'react'
import { Heart, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

type Category = 'All' | 'Color' | 'Cut' | 'Styling' | 'Transformations'

const looks = [
  // Color
  { id: 1, src: 'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/b7/38/c9/68/ae/v1_E10/E103ZHL3.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=de8b86bb978fbeade4eff880b7d635cd4fa72055f5dc6f934b2ec5517686e205', title: 'Caramel Balayage', stylist: '@hairbylucia', category: 'Color' as Category, likes: 2847 },
  { id: 5, src: 'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/7a/0b/23/e4/bb/v1_E10/E101NKNV.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=1f8f01aa90eb0070c3692ae15baab9ce5872e46abbe9ddaeeb43751827444218', title: 'Shadow Root Blonde', stylist: '@rootsbysophia', category: 'Color' as Category, likes: 3765 },
  { id: 8, src: 'https://images.unsplash.com/photo-1554519515-242161756769?w=800&q=80&auto=format&fit=crop', title: 'Balayage Dimension', stylist: '@hairbylucia', category: 'Color' as Category, likes: 1876 },
  { id: 9, src: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=800&q=80&auto=format&fit=crop', title: 'Vivid Fantasy', stylist: '@vividsbyimani', category: 'Color' as Category, likes: 5102 },
  { id: 13, src: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80&auto=format&fit=crop', title: 'Copper Melt', stylist: '@hairbylucia', category: 'Color' as Category, likes: 3890 },
  { id: 14, src: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&q=80&auto=format&fit=crop', title: 'Lived-In Blonde', stylist: '@rootsbysophia', category: 'Color' as Category, likes: 2670 },
  // Cut
  { id: 2, src: 'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/61/a3/7c/c5/c2/v1_E11/E117PKJM.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=8b0830802c80b8cba5e98bc95454a6334a4b6d7b50586efd2c08b594ea4f8962', title: 'Glass Hair', stylist: '@smoothbytomasz', category: 'Cut' as Category, likes: 3201 },
  { id: 6, src: 'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/45/b9/da/7d/7e/v1_E10/E109XHQP.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=498ed0538a64127ad4d8878808a9f8c0889b9d00f06ddb0ab90f931bbc9921ca', title: 'Bob with Texture', stylist: '@precision.alex', category: 'Cut' as Category, likes: 2100 },
  { id: 10, src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80&auto=format&fit=crop', title: 'Precision Bob', stylist: '@precision.alex', category: 'Cut' as Category, likes: 2654 },
  { id: 15, src: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80&auto=format&fit=crop', title: 'Sharp Lob', stylist: '@precision.alex', category: 'Cut' as Category, likes: 1920 },
  { id: 23, src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80&auto=format&fit=crop', title: "Men's Texture Cut", stylist: '@precision.alex', category: 'Cut' as Category, likes: 1780 },
  { id: 16, src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80&auto=format&fit=crop', title: 'Brunette Gloss', stylist: '@rootsbysophia', category: 'Cut' as Category, likes: 3120 },
  // Styling
  { id: 4, src: 'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/fc/2f/88/5c/19/v1_E10/E104MFU7.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=c39ec640de77e4653962b20de0a2e1cf4ff988c16e8fc002a521094c8e2c367b', title: 'Natural Curl Set', stylist: '@curlsbynadia', category: 'Styling' as Category, likes: 1988 },
  { id: 7, src: 'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/31/31/67/c7/d1/v1_E10/E105INWD.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=3fefda14e215cf3e88aeee5422dcca73540d7cdd9e3451160c35c7afb2c44218', title: 'Curl Consultation Look', stylist: '@curlsbynadia', category: 'Styling' as Category, likes: 2340 },
  { id: 12, src: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=80&auto=format&fit=crop', title: 'Textured Layers', stylist: '@smoothbytomasz', category: 'Styling' as Category, likes: 1450 },
  { id: 18, src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80&auto=format&fit=crop', title: 'Defined Curls', stylist: '@curlsbynadia', category: 'Styling' as Category, likes: 2890 },
  { id: 21, src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80&auto=format&fit=crop', title: 'Soft Waves', stylist: '@rootsbysophia', category: 'Styling' as Category, likes: 1650 },
  { id: 22, src: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&q=80&auto=format&fit=crop', title: 'Coily Crown', stylist: '@curlsbynadia', category: 'Styling' as Category, likes: 3340 },
  // Transformations
  { id: 25, src: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80&auto=format&fit=crop', title: 'Dark to Blonde', stylist: '@hairbylucia', category: 'Transformations' as Category, likes: 6120 },
  { id: 26, src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80&auto=format&fit=crop', title: 'Pastel Fade', stylist: '@vividsbyimani', category: 'Transformations' as Category, likes: 4780 },
  { id: 27, src: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80&auto=format&fit=crop', title: 'Honey Highlights', stylist: '@hairbylucia', category: 'Transformations' as Category, likes: 2210 },
  { id: 28, src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&auto=format&fit=crop', title: 'Vivid Blue Roots', stylist: '@vividsbyimani', category: 'Transformations' as Category, likes: 5230 },
  { id: 29, src: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80&auto=format&fit=crop', title: 'Copper Transformation', stylist: '@hairbylucia', category: 'Transformations' as Category, likes: 5670 },
  { id: 30, src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80&auto=format&fit=crop', title: 'Brunette Refresh', stylist: '@rootsbysophia', category: 'Transformations' as Category, likes: 4340 },
]

const categories: Category[] = ['All', 'Color', 'Cut', 'Styling', 'Transformations']

export default function TrendingLooks() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set())

  const filtered = activeCategory === 'All'
    ? [
        looks.find((l) => l.category === 'Color')!,
        looks.find((l) => l.category === 'Cut')!,
        looks.find((l) => l.category === 'Styling')!,
        looks.find((l) => l.category === 'Transformations')!,
        looks.filter((l) => l.category === 'Color')[1],
        looks.filter((l) => l.category === 'Cut')[1],
      ]
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
          <Link
            to="/gallery"
            className="flex items-center gap-2 border border-white/10 text-charcoal-300 hover:border-gold-500 hover:text-gold-500 text-[11px] tracking-widest uppercase px-8 py-3 transition-colors"
          >
            View Full Gallery <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </section>
  )
}

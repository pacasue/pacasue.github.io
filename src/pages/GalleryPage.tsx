import { useState } from 'react'
import { Heart } from 'lucide-react'
import Navbar from '../components/Navbar'
import Ticker from '../components/Ticker'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'

type Category = 'All' | 'Color' | 'Cut' | 'Styling' | 'Transformations'

const looks = [
  {
    id: 1,
    src: 'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/b7/38/c9/68/ae/v1_E10/E103ZHL3.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=de8b86bb978fbeade4eff880b7d635cd4fa72055f5dc6f934b2ec5517686e205',
    title: 'Caramel Balayage',
    stylist: '@hairbylucia',
    category: 'Color' as Category,
    likes: 2847,
  },
  {
    id: 2,
    src: 'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/61/a3/7c/c5/c2/v1_E11/E117PKJM.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=8b0830802c80b8cba5e98bc95454a6334a4b6d7b50586efd2c08b594ea4f8962',
    title: 'Glass Hair',
    stylist: '@smoothbytomasz',
    category: 'Cut' as Category,
    likes: 3201,
  },
  {
    id: 3,
    src: 'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/b8/70/83/45/30/v1_E11/E117QTBN.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=90c9ce1bcb36c3b28bb9bb990dcb182919e6e9e41570ae3f369c5632515f8337',
    title: 'Vivid Coral Melt',
    stylist: '@vividsbyimani',
    category: 'Color' as Category,
    likes: 4512,
  },
  {
    id: 4,
    src: 'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/fc/2f/88/5c/19/v1_E10/E104MFU7.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=c39ec640de77e4653962b20de0a2e1cf4ff988c16e8fc002a521094c8e2c367b',
    title: 'Natural Curl Set',
    stylist: '@curlsbynadia',
    category: 'Styling' as Category,
    likes: 1988,
  },
  {
    id: 5,
    src: 'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/7a/0b/23/e4/bb/v1_E10/E101NKNV.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=1f8f01aa90eb0070c3692ae15baab9ce5872e46abbe9ddaeeb43751827444218',
    title: 'Shadow Root Blonde',
    stylist: '@rootsbysophia',
    category: 'Color' as Category,
    likes: 3765,
  },
  {
    id: 6,
    src: 'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/45/b9/da/7d/7e/v1_E10/E109XHQP.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=498ed0538a64127ad4d8878808a9f8c0889b9d00f06ddb0ab90f931bbc9921ca',
    title: 'Bob with Texture',
    stylist: '@precision.alex',
    category: 'Cut' as Category,
    likes: 2100,
  },
  {
    id: 7,
    src: 'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/31/31/67/c7/d1/v1_E10/E105INWD.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=3fefda14e215cf3e88aeee5422dcca73540d7cdd9e3451160c35c7afb2c44218',
    title: 'Curl Consultation Look',
    stylist: '@curlsbynadia',
    category: 'Styling' as Category,
    likes: 2340,
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1554519515-242161756769?w=800&q=80&auto=format&fit=crop',
    title: 'Balayage Dimension',
    stylist: '@hairbylucia',
    category: 'Color' as Category,
    likes: 1876,
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=800&q=80&auto=format&fit=crop',
    title: 'Vivid Fantasy',
    stylist: '@vividsbyimani',
    category: 'Color' as Category,
    likes: 5102,
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80&auto=format&fit=crop',
    title: 'Precision Bob',
    stylist: '@precision.alex',
    category: 'Cut' as Category,
    likes: 2654,
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80&auto=format&fit=crop',
    title: 'Brunette Gloss',
    stylist: '@rootsbysophia',
    category: 'Color' as Category,
    likes: 3120,
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=80&auto=format&fit=crop',
    title: 'Textured Layers',
    stylist: '@smoothbytomasz',
    category: 'Styling' as Category,
    likes: 1450,
  },
  {
    id: 13,
    src: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80&auto=format&fit=crop',
    title: 'Copper Melt',
    stylist: '@hairbylucia',
    category: 'Color' as Category,
    likes: 3890,
  },
  {
    id: 14,
    src: 'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/ee/14/d0/dd/60/v1_E10/E10HFA3N.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=24ddf2603827bc7d0604788483a77aeebeeb723fb3c7eaf1da02222ed1dc391b',
    title: 'Lived-In Blonde',
    stylist: '@rootsbysophia',
    category: 'Color' as Category,
    likes: 2670,
  },
  {
    id: 15,
    src: 'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/32/7e/5c/06/de/v1_E10/E108YPGU.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=a9f56975143b11e15b68a6c1e1d12d220a5ab0b1e8cf44baf1f100ac93a5d463',
    title: 'Rainbow Color',
    stylist: '@precision.alex',
    category: 'Cut' as Category,
    likes: 1920,
  },
  {
    id: 16,
    src: 'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/30/36/9b/82/68/v1_E10/E107O6Z5.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=d4f8b35152d574ea289cababfddf000f7607d1813dff75dc1d86dbf2f46f2121',
    title: 'Flowing Red Hair',
    stylist: '@smoothbytomasz',
    category: 'Cut' as Category,
    likes: 1340,
  },
  {
    id: 17,
    src: 'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/e9/25/d7/d4/b7/v1_E10/E10216T6.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=ef3eea7c96f26ca7e22aa4c4c8974ac209fccf1241fa29d986e7bfec468f186e',
    title: 'Brunette Gloss',
    stylist: '@rootsbysophia',
    category: 'Color' as Category,
    likes: 3120,
  },
  {
    id: 18,
    src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80&auto=format&fit=crop',
    title: 'Defined Curls',
    stylist: '@curlsbynadia',
    category: 'Styling' as Category,
    likes: 2890,
  },
  {
    id: 19,
    src: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80&auto=format&fit=crop',
    title: 'Honey Highlights',
    stylist: '@hairbylucia',
    category: 'Color' as Category,
    likes: 2210,
  },
  {
    id: 20,
    src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80&auto=format&fit=crop',
    title: 'Pastel Fade',
    stylist: '@vividsbyimani',
    category: 'Color' as Category,
    likes: 4780,
  },
  {
    id: 21,
    src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80&auto=format&fit=crop',
    title: 'Soft Waves',
    stylist: '@rootsbysophia',
    category: 'Styling' as Category,
    likes: 1650,
  },
  {
    id: 22,
    src: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&q=80&auto=format&fit=crop',
    title: 'Coily Crown',
    stylist: '@curlsbynadia',
    category: 'Styling' as Category,
    likes: 3340,
  },
  {
    id: 23,
    src: 'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/4a/41/35/2f/77/v1_E10/E105PZEO.jpeg?w=1600&cf_fit=scale-down&q=85&format=auto&s=899d46aca29ba638c1525102f804e8fde8e410498b7569141d53865553328ef6',
    title: 'Men\'s Texture Cut',
    stylist: '@precision.alex',
    category: 'Cut' as Category,
    likes: 1780,
  },
  {
    id: 24,
    src: 'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/38/3f/e6/3c/53/v1_E10/E10HOMA5.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=f5ea4f3f4d677728147fe05e0a05e02a3fdf6a90fdd9813c62fa0e47ef3c5cc2',
    title: 'Vivid Blue Roots',
    stylist: '@vividsbyimani',
    category: 'Color' as Category,
    likes: 5230,
  },
  {
    id: 25,
    src: '/image/Dark-to-Blonde.jpeg',
    title: 'Dark to Blonde',
    stylist: '@hairbylucia',
    category: 'Transformations' as Category,
    likes: 6120,
  },
  {
    id: 26,
    src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80&auto=format&fit=crop',
    title: 'Brunette Refresh',
    stylist: '@rootsbysophia',
    category: 'Transformations' as Category,
    likes: 4340,
  },
  {
    id: 27,
    src: '/image/straight-to-curly.avif',
    title: 'Straight to Curly',
    stylist: '@curlsbynadia',
    category: 'Transformations' as Category,
    likes: 7890,
  },
  {
    id: 28,
    src: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80&auto=format&fit=crop',
    title: 'Copper Transformation',
    stylist: '@hairbylucia',
    category: 'Transformations' as Category,
    likes: 5670,
  },
]

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

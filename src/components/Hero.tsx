import { ArrowRight, Play } from 'lucide-react'
import { Link } from 'react-router-dom'

// Hero uses high-quality Unsplash images (no auth required)
const HERO_IMAGE = 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1600&q=80&auto=format&fit=crop'
const SIDE_IMAGE = 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=80&auto=format&fit=crop'

export default function Hero() {
  return (
    <section className="bg-black">
      {/* Issue date banner */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="h-px bg-gold-500 w-8" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-gold-500 font-medium">
            April 2026 · Curated by Stylists
          </span>
          <div className="h-px bg-gold-500 flex-1" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 mt-6">

          {/* Main feature — large */}
          <Link to="/article/copper-renaissance-2026" className="lg:col-span-8 relative group cursor-pointer img-zoom block">
            <div className="relative overflow-hidden aspect-[16/10] lg:aspect-[4/3]">
              <img
                src={HERO_IMAGE}
                alt="Editorial hair feature"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* Category tag */}
              <div className="absolute top-4 left-4">
                <span className="bg-gold-500 text-black text-[9px] font-bold tracking-[0.25em] uppercase px-3 py-1">
                  Cover Story
                </span>
              </div>

              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] tracking-widest uppercase text-charcoal-400">Color Inspiration</span>
                  <span className="text-charcoal-600">·</span>
                  <span className="text-[10px] text-charcoal-400">April 8, 2026</span>
                </div>
                <h1
                  className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  The Copper Renaissance:<br />
                  <em>Why This Shade Rules 2026</em>
                </h1>
                <p className="text-charcoal-300 text-sm md:text-base max-w-xl leading-relaxed mb-6 hidden md:block">
                  We asked 10 top colorists what makes this shade so wearable — and how to ask for it at your next appointment.
                </p>
                <div className="flex items-center gap-4">
                  <Link
                    to="/article/copper-renaissance-2026"
                    className="flex items-center gap-2 bg-gold-500 text-black text-[11px] font-bold tracking-widest uppercase px-5 py-2.5 hover:bg-gold-400 transition-colors"
                  >
                    Read Story <ArrowRight size={12} />
                  </Link>
                  <button className="flex items-center gap-2 text-charcoal-300 hover:text-white text-[11px] tracking-widest uppercase transition-colors">
                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-gold-500 transition-colors">
                      <Play size={10} className="ml-0.5" />
                    </div>
                    Watch Film
                  </button>
                </div>
              </div>
            </div>
          </Link>
          <div className="lg:col-span-4 flex flex-col gap-0 border-l border-white/5">

            {/* Secondary feature */}
            <div className="group cursor-pointer img-zoom">
              <div className="relative overflow-hidden aspect-[16/9] lg:aspect-auto lg:h-[260px]">
                <img
                  src={SIDE_IMAGE}
                  alt="Secondary feature"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="text-[9px] tracking-widest uppercase text-gold-500 font-medium">Technique</span>
                  <h2
                    className="text-white text-xl font-bold leading-snug mt-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    What Is Balayage? Your Stylist Explains
                  </h2>
                </div>
              </div>
            </div>

            {/* Article list */}
            <div className="flex flex-col divide-y divide-white/5 mt-4 lg:mt-0 lg:border-t border-white/5">
              {[
                {
                  tag: 'Booking',
                  title: 'How to Book the Right Stylist for Your Hair Type',
                  author: 'Maria Chen',
                  readTime: '5 min',
                },
                {
                  tag: 'Tips',
                  title: '10 Questions to Ask Before Your Next Color Appointment',
                  author: 'James Olivier',
                  readTime: '7 min',
                },
                {
                  tag: 'Products',
                  title: 'Bond Builders: What They Are and Why Your Hair Needs One',
                  author: 'Dr. Sarah Kline',
                  readTime: '6 min',
                },
              ].map((article) => (
                <a
                  key={article.title}
                  href="#"
                  className="flex flex-col gap-1.5 p-4 lg:px-4 hover:bg-white/[0.03] transition-colors group"
                >
                  <span className="text-[9px] tracking-widest uppercase text-gold-500 font-medium">{article.tag}</span>
                  <h3
                    className="text-sm font-semibold text-charcoal-200 group-hover:text-white transition-colors leading-snug"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] text-charcoal-500">
                    <span>{article.author}</span>
                    <span>·</span>
                    <span>{article.readTime} read</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

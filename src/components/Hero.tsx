import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const HERO_IMAGE = '/image/mino-cover.avif'
const SIDE_IMAGE = '/image/change-hair-1.webp'

export default function Hero() {
  return (
    <section className="bg-black">
      {/* Issue date banner */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="h-px bg-gold-500 w-8" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-gold-500 font-medium">
            June 2026 · Curated by Stylists
          </span>
          <div className="h-px bg-gold-500 flex-1" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 mt-6">

          {/* Main feature — large */}
          <Link to="/article/NOVOGRO™-vs-minoxidil" className="lg:col-span-8 relative group cursor-pointer img-zoom block">
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

                <h1
                  className="text-white text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Is NOVOGRO™ the Industry's Best Kept Secret?<br />
                </h1>
                <p className="text-charcoal-300 text-sm md:text-base max-w-xl leading-relaxed mb-6 hidden md:block">
                  For years, minoxidil has been the established benchmark in hair-loss topicals. One name landed in our stylist circle this week: NOVOGRO™ (NV), a fresh class of ingredients designed to tackle multiple drivers of hair thinning at once.
                </p>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 bg-gold-500 text-black text-[10px] font-bold tracking-widest uppercase px-3 py-2 group-hover:bg-gold-400 transition-colors">
                    Read Review <ArrowRight size={10} />
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] tracking-widest uppercase text-charcoal-400">Hair Care</span>
                    <span className="text-charcoal-600">·</span>
                    <span className="text-[10px] text-charcoal-400">Jun 13, 2026</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <div className="lg:col-span-4 flex flex-col gap-0 border-l border-white/5">

            {/* Secondary feature */}
            <Link to="/article/what-your-hair-says-about-you-sex-and-the-city" className="group cursor-pointer img-zoom block">
              <div className="relative overflow-hidden aspect-[16/9] lg:aspect-auto lg:h-[260px]">
                <img
                  src={SIDE_IMAGE}
                  alt="Secondary feature"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="text-[9px] tracking-widest uppercase text-gold-500 font-medium">Cut & Style</span>
                  <h2
                    className="text-white text-xl font-bold leading-snug mt-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Your Hair Is Already Talking. <em>Are You Listening?</em>
                  </h2>
                </div>
              </div>
            </Link>

            {/* Article list */}
            <div className="flex flex-col divide-y divide-white/5 mt-4 lg:mt-0 lg:border-t border-white/5">
              {[
                {
                  tag: 'Cut & Style',
                  title: '10 Best Hair Looks at the 2026 Met Gala',
                  author: 'Vera Moss',
                  readTime: '8 min',
                  slug: '2026-met-gala-best-hair-looks',
                },
                {
                  tag: 'Cut & Style',
                  title: "Mother's Day Special Edition: 6 Effortless Hairstyles Stylists Are Loving",
                  author: 'Nora Bell',
                  readTime: '5 min',
                  slug: 'mothers-day-effortless-hairstyles',
                },
                {
                  tag: 'Hair Care',
                  title: 'Your Fine, Frizzy Hair Might Actually Be Wavy',
                  author: 'Priya Nair',
                  readTime: '10 min',
                  slug: 'fine-frizzy-wavy-hair',
                },
              ].map((article) => (
                <Link
                  key={article.title}
                  to={`/article/${article.slug}`}
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
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

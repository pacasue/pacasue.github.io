import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const articles = [
  {
    id: 1,
    tag: 'Cut & Style',
    title: 'How to Make a Slick-Back Bun Look Polished, Not Greasy',
    excerpt: 'The slick-back bun looks effortless and expensive — but the difference between sleek and greasy is all technique. Here is exactly how stylists do it.',
    author: 'Nora Bell',
    date: 'May 14, 2026',
    readTime: '7 min',
    image: '/image/pose.png',
    featured: true,
    slug: 'slick-back-bun',
  },
  {
    id: 2,
    tag: 'Cut & Style',
    title: 'Why a Good Haircut Is More Than Just "Taking Length Off"',
    excerpt: 'Top stylists reveal the invisible layering technique that adds movement without losing length.',
    author: 'Tom Harley',
    date: 'Apr 4, 2026',
    readTime: '6 min',
    image: '/image/haircut-layers.avif',
    featured: false,
    slug: 'haircut-layers',
  },
  {
    id: 3,
    tag: 'Vivid Color',
    title: 'Ready for Vivid Color? Here\'s What Your Stylist Wants You to Know',
    excerpt: 'Before you go bold, your colorist has a few things to tell you about the journey — and it\'s worth the read.',
    author: 'Alex Nguyen',
    date: 'Apr 3, 2026',
    readTime: '5 min',
    image: '/image/vivid-color-guide.avif',
    featured: false,
    slug: 'vivid-color-guide',
  },
  {
    id: 4,
    tag: 'Texture',
    title: 'The Curl Consultation: What to Say to Get Your Best Curls Ever',
    excerpt: 'A guide to communicating with your stylist about curl type, hydration, and the products that actually work.',
    author: 'Imani Okafor',
    date: 'Apr 2, 2026',
    readTime: '8 min',
    image: 'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/31/31/67/c7/d1/v1_E10/E105INWD.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=3fefda14e215cf3e88aeee5422dcca73540d7cdd9e3451160c35c7afb2c44218',
    featured: false,
    slug: 'curl-consultation',
  },
  {
    id: 5,
    tag: 'Finding a Stylist',
    title: 'How to Find a Stylist Who Gets Your Hair (And Keeps It)',
    excerpt: 'The difference between a good haircut and a great one often comes down to finding the right match. Here\'s how.',
    author: 'Dana Reeves',
    date: 'Apr 1, 2026',
    readTime: '10 min',
    image: '/image/find-right-stylist.avif',
    featured: false,
    slug: 'find-right-stylist',
  },
]

function ArticleCard({
  article,
  size = 'normal',
}: {
  article: typeof articles[0]
  size?: 'large' | 'normal'
}) {
  return (
    <Link
      to={`/article/${article.slug}`}
      className="group flex flex-col cursor-pointer card-hover"
    >
      <div className={`img-zoom overflow-hidden ${size === 'large' ? 'aspect-[4/3]' : 'aspect-[3/2]'} relative`}>
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="pt-4 flex flex-col gap-2">
        <span className="text-[9px] tracking-[0.25em] uppercase text-gold-500 font-semibold">{article.tag}</span>
        <h3
          className={`font-bold leading-snug text-charcoal-100 group-hover:text-white transition-colors ${
            size === 'large' ? 'text-2xl md:text-3xl' : 'text-lg'
          }`}
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {article.title}
        </h3>
        {size === 'large' && (
          <p className="text-sm text-charcoal-400 leading-relaxed line-clamp-2">{article.excerpt}</p>
        )}
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
  )
}

export default function FeaturedGrid() {
  const [featured, ...rest] = articles

  return (
    <section className="bg-charcoal-950 py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-8 h-0.5 bg-gold-500" />
            <h2
              className="text-lg md:text-xl font-bold tracking-widest uppercase text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Latest Stories
            </h2>
          </div>
          <a
            href="/articles"
            className="hidden md:flex items-center gap-2 text-[11px] tracking-widest uppercase text-charcoal-400 hover:text-gold-500 transition-colors"
          >
            All Articles <ArrowRight size={12} />
          </a>
        </div>

        {/* Grid: 1 large + 4 cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Featured large card */}
          <div className="lg:col-span-5">
            <ArticleCard article={featured} size="large" />
          </div>

          {/* Divider */}
          <div className="hidden lg:block lg:col-span-1 border-l border-white/5" />

          {/* 4 smaller cards in a 2x2 grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {rest.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

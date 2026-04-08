import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const articles = [
  {
    id: 1,
    tag: 'Color',
    title: 'Brunette Glazing: The Formula That Broke Instagram',
    excerpt: 'A step-by-step breakdown of the toning technique that colorists are calling the most requested look of the year.',
    author: 'Leila Fernandez',
    date: 'Apr 5, 2026',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 2,
    tag: 'Cut & Style',
    title: 'The Interior Cut Layering Revolution',
    excerpt: 'Top session stylists reveal their favorite techniques for invisible, movement-boosting layers.',
    author: 'Tom Harley',
    date: 'Apr 4, 2026',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 3,
    tag: 'Vivid Color',
    title: 'Pastel-to-Vivid: One Formula, Endless Results',
    excerpt: 'How to seamlessly transition clients through vivid color journeys without compromise.',
    author: 'Alex Nguyen',
    date: 'Apr 3, 2026',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=600&q=80&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 4,
    tag: 'Texture',
    title: 'Natural Curl Definition in the Modern Salon',
    excerpt: 'An in-depth guide to consultations, product layering, and diffusing techniques for every curl type.',
    author: 'Imani Okafor',
    date: 'Apr 2, 2026',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1607748851687-ba9a10438621?w=600&q=80&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 5,
    tag: 'Business',
    title: 'The $100K Solo Stylist Blueprint',
    excerpt: 'From booth rental to suite ownership — the exact milestones that separate growing stylists from stalling ones.',
    author: 'Dana Reeves',
    date: 'Apr 1, 2026',
    readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&q=80&auto=format&fit=crop',
    featured: false,
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
      to="/article/copper-renaissance-2026"
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
            href="#"
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

import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const articles = [
  {
    id: 35,
    tag: 'Hair Thinning',
    title: `Finasteride vs. NOVOGRO™: Why Women Shouldn't Borrow Men's Hair-Loss Drugs`,
    excerpt: `Finasteride is still a serious medical option, but its side-effect profile and off-label use in women deserve a more careful conversation. A stylist's case for why female thinning needs its own solution like NOVOGRO™, not another "just try this."`,
    author: 'Lauren Chavez',
    date: 'Jun 18, 2026',
    readTime: '9 min',
    image: '/image/finasteride-novogro-cover.jpg',
    featured: true,
    slug: 'finasteride-vs-novogro-women-hair-loss',
  },
  {
    id: 30,
    tag: 'Cut & Style',
    title: 'Find the Bangs That Actually Suit You',
    excerpt: 'Bangs can change your whole look faster than a new color. The 2026 guide to fringe trends, face shapes, and exactly what to ask your stylist.',
    author: 'Yuna Seo',
    date: 'May 31, 2026',
    readTime: '10 min',
    image: '/image/bang-cover.webp',
    featured: false,
    slug: 'bangs-guide-2026',
  },
  {
    id: 31,
    tag: 'Hair Thinning',
    title: 'What Stylists Should Know About Female Hair Loss',
    excerpt: 'Clients describe hair loss by what they notice first. As hair professionals, we need to read the pattern. A practical guide to the layers behind female hair loss and how to have better conversations about it.',
    author: 'Lauren Chavez',
    date: 'Jun 1, 2026',
    readTime: '8 min',
    image: '/image/thinning.png',
    featured: false,
    slug: 'female-hair-loss-stylist-guide',
  },
  {
    id: 32,
    tag: 'Cut & Style',
    title: 'Game, Set, Hair',
    excerpt: 'Clay-court season has a very specific beauty mood. From bubble ponytails to ribbon braids and boxer braids, these are the tennis-inspired sport hairstyles to wear now and into U.S. Open season.',
    author: 'Nora Bell',
    date: 'Jun 4, 2026',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1548920168-70d61248a912?fm=jpg&q=80&w=1600&auto=format&fit=crop',
    featured: false,
    slug: 'french-open-tennis-hairstyles',
  },
  {
    id: 33,
    tag: 'Style & Culture',
    title: 'Your Hair Is Already Talking. Are You Listening?',
    excerpt: "From Nicole Kidman's iconic curls to the four women of Sex and the City — why a haircut says more about who you are than almost anything else.",
    author: 'Nora Bell',
    date: 'Jun 7, 2026',
    readTime: '10 min',
    image: '/image/change-hair-1.webp',
    featured: false,
    slug: 'what-your-hair-says-about-you-sex-and-the-city',
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

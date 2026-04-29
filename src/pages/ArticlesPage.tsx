import { useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Ticker from '../components/Ticker'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import FloatingNav from '../components/FloatingNav'
import { articles } from '../data/articles'

const visibleArticles = articles.filter((a) => a.slug !== 'what-is-balayage-old')

const sections = ['All', 'Trends', 'Inspiration', 'Hair Care'] as const

const categoryMap: Record<string, string[]> = {
  All: ['All', 'Color', 'Technique', 'Cut & Style', 'Texture', 'Tips', 'Business', 'Products', 'Hair Thinning', 'At-Home Tips'],
  Trends: ['All', 'Color', 'Technique', 'Cut & Style', 'Texture'],
  Inspiration: ['All', 'Tips', 'Business'],
  'Hair Care': ['All', 'Products', 'Hair Thinning', 'At-Home Tips'],
}

export default function ArticlesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeSection = searchParams.get('section') ?? 'All'
  const activeCategory = searchParams.get('category') ?? 'All'

  const setSection = (sec: string) => {
    if (sec === 'All') setSearchParams({})
    else setSearchParams({ section: sec })
  }

  const setCategory = (cat: string) => {
    const params: Record<string, string> = {}
    if (activeSection !== 'All') params.section = activeSection
    if (cat !== 'All') params.category = cat
    setSearchParams(params)
  }

  const categories = categoryMap[activeSection] ?? categoryMap.All

  const filtered = visibleArticles.filter((a) => {
    const sectionMatch = activeSection === 'All' || a.section === activeSection
    const categoryMatch = activeCategory === 'All' || a.category === activeCategory
    return sectionMatch && categoryMatch
  })

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
              <span className="text-[10px] tracking-[0.3em] uppercase text-gold-500 font-medium">HairProVoices</span>
            </div>
            <h1
              className="text-3xl md:text-4xl font-bold text-white mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              All Articles
            </h1>
            <p className="text-sm text-charcoal-400">{filtered.length} pieces from our contributors</p>
          </div>
        </div>

        {/* Filters */}
        <div className="border-b border-white/10 sticky top-0 z-40 bg-charcoal-950">
          {/* Section filter */}
          <div className="max-w-7xl mx-auto px-4 border-b border-white/5">
            <div className="flex items-center gap-1 py-3">
              {sections.map((sec) => (
                <button
                  key={sec}
                  onClick={() => setSection(sec)}
                  className={`flex-shrink-0 px-5 py-1.5 text-[11px] tracking-widest uppercase font-semibold transition-colors ${
                    activeSection === sec
                      ? 'text-white border-b-2 border-gold-500'
                      : 'text-charcoal-500 hover:text-charcoal-200'
                  }`}
                >
                  {sec}
                </button>
              ))}
            </div>
          </div>
          {/* Category filter */}
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {filtered.map((article) => (
              <Link
                key={article.slug}
                to={`/article/${article.slug}`}
                className="group bg-charcoal-950 p-6 flex flex-col gap-4 hover:bg-white/[0.03] transition-colors"
              >
                <div className="overflow-hidden aspect-[16/9]">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] tracking-widest uppercase text-gold-500 font-medium">{article.tag}</span>
                    <span className="text-charcoal-700">·</span>
                    <span className="text-[10px] text-charcoal-500">{article.date}</span>
                  </div>
                  <h2
                    className="text-base font-bold text-charcoal-100 group-hover:text-white transition-colors leading-snug"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {article.title}
                  </h2>
                  <p className="text-sm text-charcoal-500 leading-relaxed line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center gap-2 text-[10px] text-charcoal-600 mt-1">
                    <span>{article.author}</span>
                    <span>·</span>
                    <span>{article.readTime} read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

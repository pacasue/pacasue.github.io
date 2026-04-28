import { useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Ticker from '../components/Ticker'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import { articles } from '../data/articles'

const visibleArticles = articles.filter((a) => a.slug !== 'what-is-balayage-old')
const categories = ['All', 'Color', 'Technique', 'Cut & Style', 'Texture', 'Tips', 'Business', 'Products', 'Hair Thinning']

export default function ArticlesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') ?? 'All'

  const setCategory = (cat: string) => {
    if (cat === 'All') setSearchParams({})
    else setSearchParams({ category: cat })
  }

  const filtered = activeCategory === 'All'
    ? visibleArticles
    : visibleArticles.filter((a) => a.category === activeCategory)

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
              <span className="text-[10px] tracking-[0.3em] uppercase text-gold-500 font-medium">HairProVoices</span>
            </div>
            <h1
              className="text-3xl md:text-4xl font-bold text-white mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              All Articles
            </h1>
            <p className="text-sm text-charcoal-400">{visibleArticles.length} pieces from our contributors</p>
          </div>
        </div>

        {/* Category filter */}
        <div className="border-b border-white/10 sticky top-0 z-40 bg-charcoal-950">
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

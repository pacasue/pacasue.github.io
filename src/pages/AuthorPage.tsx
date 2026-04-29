import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Ticker from '../components/Ticker'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import { authors, articles } from '../data/articles'

export default function AuthorPage() {
  const { slug } = useParams<{ slug: string }>()
  const author = slug
    ? Object.values(authors).find(
        (a) => a.name.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()
      )
    : undefined
  const authorArticles = articles.filter(
    (a) => a.author.toLowerCase().replace(/\s+/g, '-') === (slug ?? '').toLowerCase()
  )

  if (!author) {
    return (
      <div className="min-h-screen bg-charcoal-950 text-charcoal-100 flex flex-col items-center justify-center gap-4">
        <p className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Author not found</p>
        <Link to="/" className="text-gold-500 hover:underline text-sm tracking-widest uppercase">← Back to Home</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-charcoal-950 text-charcoal-100">
      <Navbar />
      <Ticker />
      <main>
        {/* Author hero */}
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-14 lg:py-20">
            <Link to="/contributors" className="inline-flex items-center gap-2 text-[10px] tracking-widest uppercase text-charcoal-500 hover:text-gold-500 transition-colors mb-8">
              ← All Contributors
            </Link>
            <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-gold-500/30 flex-shrink-0">
                <img src={author.image} alt={author.name} className="w-full h-full object-cover object-top" />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-gold-500 font-semibold mb-2">Contributor</p>
                <h1
                  className="text-3xl md:text-4xl font-bold text-white mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {author.name}
                </h1>
                <p className="text-[11px] tracking-widest uppercase text-charcoal-400 mb-4">{author.title} · HairProVoices</p>
                <p className="text-sm text-charcoal-400 leading-relaxed max-w-2xl">{author.bio}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Articles */}
        <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
          <p className="text-[10px] tracking-[0.3em] uppercase text-gold-500 font-semibold mb-8">
            Articles by {author.name} — {authorArticles.length} {authorArticles.length === 1 ? 'piece' : 'pieces'}
          </p>

          {authorArticles.length === 0 ? (
            <p className="text-charcoal-500 text-sm">No articles found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
              {authorArticles.map((article) => (
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
                    <span className="text-[10px] text-charcoal-600 mt-1">{article.readTime} read</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import FloatingNav from '../components/FloatingNav'
import { authors, articles } from '../data/articles'

function authorSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-')
}

export default function ContributorsPage() {
  const contributorList = Object.values(authors)

  return (
    <div className="min-h-screen bg-charcoal-950 text-charcoal-100">
      <Navbar />
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
              Our Contributors
            </h1>
            <p className="text-sm text-charcoal-400">{contributorList.length} writers, stylists, and industry experts</p>
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {contributorList.map((author) => {
              const slug = authorSlug(author.name)
              const articleCount = articles.filter(
                (a) => a.author === author.name && a.slug !== 'what-is-balayage-old'
              ).length
              const recentArticles = articles
                .filter((a) => a.author === author.name && a.slug !== 'what-is-balayage-old')
                .slice(0, 2)

              return (
                <div key={author.name} className="bg-charcoal-950 p-6 flex flex-col gap-5 hover:bg-white/[0.03] transition-colors">
                  {/* Author header */}
                  <div className="flex items-center gap-4">
                    <Link to={`/author/${slug}`}>
                      <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-gold-500/20 hover:ring-gold-500/50 transition-all flex-shrink-0">
                        <img src={author.image} alt={author.name} className="w-full h-full object-cover object-top" />
                      </div>
                    </Link>
                    <div>
                      <Link
                        to={`/author/${slug}`}
                        className="text-base font-bold text-white hover:text-gold-500 transition-colors"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {author.name}
                      </Link>
                      <p className="text-[10px] tracking-widest uppercase text-gold-500 mt-0.5">{author.title}</p>
                      <p className="text-[10px] text-charcoal-600 mt-0.5">{articleCount} {articleCount === 1 ? 'article' : 'articles'}</p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-charcoal-400 leading-relaxed line-clamp-3">{author.bio}</p>

                  {/* Recent articles */}
                  {recentArticles.length > 0 && (
                    <div className="flex flex-col gap-2 pt-3 border-t border-white/5">
                      {recentArticles.map((article) => (
                        <Link
                          key={article.slug}
                          to={`/article/${article.slug}`}
                          className="group flex items-start gap-2"
                        >
                          <span className="text-[9px] tracking-widest uppercase text-gold-500 font-medium mt-0.5 flex-shrink-0">{article.tag}</span>
                          <span className="text-xs text-charcoal-400 group-hover:text-white transition-colors leading-snug line-clamp-1">{article.title}</span>
                        </Link>
                      ))}
                      <Link
                        to={`/author/${slug}`}
                        className="text-[10px] tracking-widest uppercase text-charcoal-600 hover:text-gold-500 transition-colors mt-1"
                      >
                        All articles →
                      </Link>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

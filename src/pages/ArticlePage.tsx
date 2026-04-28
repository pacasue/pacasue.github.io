import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Ticker from '../components/Ticker'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import ArticleHero from '../components/article/ArticleHero'
import ArticleBody from '../components/article/ArticleBody'
import ArticleSidebar from '../components/article/ArticleSidebar'
import ArticleAuthor from '../components/article/ArticleAuthor'
import RelatedArticles from '../components/article/RelatedArticles'
import { getArticleBySlug } from '../data/articles'

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? getArticleBySlug(slug) : undefined

  if (!article) {
    return (
      <div className="min-h-screen bg-charcoal-950 text-charcoal-100 flex flex-col items-center justify-center gap-4">
        <p className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Article not found</p>
        <Link to="/" className="text-gold-500 hover:underline text-sm tracking-widest uppercase">← Back to Home</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-charcoal-950 text-charcoal-100">
      <Navbar />
      <Ticker />
      <main>
        <ArticleHero article={article} />

        {/* Body + Sidebar */}
        <div className="bg-charcoal-950">
          <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              {/* Main content */}
              <div className="lg:col-span-8">
                <ArticleBody article={article} />
                <ArticleAuthor />
              </div>
              {/* Sidebar */}
              <aside className="lg:col-span-4">
                <ArticleSidebar article={article} />
              </aside>
            </div>
          </div>
        </div>

        <RelatedArticles currentSlug={article.slug} />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

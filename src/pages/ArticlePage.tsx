import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Ticker from '../components/Ticker'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import ArticleHero from '../components/article/ArticleHero'
import ArticleBody from '../components/article/ArticleBody'
import ArticleSidebar from '../components/article/ArticleSidebar'
import ArticleAuthor from '../components/article/ArticleAuthor'
import RelatedArticles from '../components/article/RelatedArticles'

export default function ArticlePage() {
  // In a real app this would fetch based on params
  useParams()

  return (
    <div className="min-h-screen bg-charcoal-950 text-charcoal-100">
      <Navbar />
      <Ticker />
      <main>
        <ArticleHero />

        {/* Body + Sidebar */}
        <div className="bg-charcoal-950">
          <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              {/* Main content */}
              <div className="lg:col-span-8">
                <ArticleBody />
                <ArticleAuthor />
              </div>
              {/* Sidebar */}
              <aside className="lg:col-span-4">
                <ArticleSidebar />
              </aside>
            </div>
          </div>
        </div>

        <RelatedArticles />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

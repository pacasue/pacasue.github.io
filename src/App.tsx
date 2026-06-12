import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import HomePage from './pages/HomePage'
import ArticlePage from './pages/ArticlePage'
import ArticlesPage from './pages/ArticlesPage'
import AuthorPage from './pages/AuthorPage'
import GalleryPage from './pages/GalleryPage'
import ContributorsPage from './pages/ContributorsPage'
import AboutPage from './pages/AboutPage'
import PageTracker from './components/PageTracker'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  if (!window.cvg) {
    window.cvg = function () {
        if ((window.cvg as any).process) {
        ;(window.cvg as any).process.apply(window.cvg, arguments)
        } else {
        ;(window.cvg as any).queue.push(arguments)
        }
    } as any
    ;(window.cvg as any).queue = []
    }
    const convergeScript = document.createElement('script')
    convergeScript.src = 'https://static.runconverge.com/pixels/3LoMDN.js'
    convergeScript.async = true
    document.head.appendChild(convergeScript)
  return (
    <BrowserRouter>
      <ScrollToTop />
      <PageTracker />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/article/:slug" element={<ArticlePage />} />
        <Route path="/author/:slug" element={<AuthorPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contributors" element={<ContributorsPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  )
}

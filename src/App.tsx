// @ts-nocheck
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
import PreferredSourceButton from './components/PreferredSourceButton'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/articles" element={<ArticlesPage />} />
      <Route path="/article/:slug" element={<ArticlePage />} />
      <Route path="/author/:slug" element={<AuthorPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/contributors" element={<ContributorsPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  )
}

export default function App() {
  // Bootstrap the Converge pixel once, after mount — never during render.
  // Doing this in the render body runs the side effect on every (re)render and
  // during hydration, which double-loads the pixel (Duplicate Pixel ID) and can
  // disrupt hydration.
  useEffect(() => {
    if (window.cvg) return
    window.cvg = function () {
      if ((window.cvg as any).process) {
        ;(window.cvg as any).process.apply(window.cvg, arguments)
      } else {
        ;(window.cvg as any).queue.push(arguments)
      }
    } as any
    ;(window.cvg as any).queue = []
    const convergeScript = document.createElement('script')
    convergeScript.src = 'https://static.runconverge.com/pixels/3LoMDN.js'
    convergeScript.async = true
    document.head.appendChild(convergeScript)
  }, [])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <PageTracker />
      <PreferredSourceButton />
      <AppRoutes />
    </BrowserRouter>
  )
}

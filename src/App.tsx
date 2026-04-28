import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import HomePage from './pages/HomePage'
import ArticlePage from './pages/ArticlePage'
import AuthorPage from './pages/AuthorPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/article/:slug" element={<ArticlePage />} />
        <Route path="/author/:slug" element={<AuthorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

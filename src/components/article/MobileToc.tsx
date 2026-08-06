import { useState, useEffect, useRef } from 'react'
import type { Article } from '../../data/articles'
import { getArticleTocItems } from './articleHeadings'

export default function MobileToc({ article }: { article: Article }) {
  const [activeSection, setActiveSection] = useState('')
  const activeRef = useRef<HTMLAnchorElement | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const barRef = useRef<HTMLDivElement | null>(null)
  const tocItems = getArticleTocItems(article)

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    tocItems.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-20% 0px -70% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [tocItems])

  // Scroll active pill into view within the TOC bar
  useEffect(() => {
    if (activeRef.current && scrollContainerRef.current) {
      activeRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }, [activeSection])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (!target) return
    const barHeight = barRef.current?.offsetHeight ?? 0
    // Also account for the Navbar (~64px on mobile)
    const navbarHeight = 64
    const top = target.getBoundingClientRect().top + window.scrollY - barHeight - navbarHeight - 1
    window.scrollTo({ top, behavior: 'smooth' })
  }

  if (tocItems.length === 0) return null

  return (
    <div ref={barRef} className="lg:hidden sticky top-0 z-40 bg-black/95 backdrop-blur border-b border-white/10">
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-2 overflow-x-auto px-4 py-3 scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {tocItems.map((item) => {
          const isActive = activeSection === item.id
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              ref={isActive ? activeRef : null}
              onClick={(e) => handleClick(e, item.id)}
              className={`flex-shrink-0 text-[10px] tracking-wide px-3 py-1 border transition-colors whitespace-nowrap ${
                isActive
                  ? 'border-gold-500 text-gold-500 bg-gold-500/10'
                  : 'border-white/10 text-charcoal-400 hover:text-white hover:border-white/30'
              }`}
            >
              {item.label}
            </a>
          )
        })}
      </div>
    </div>
  )
}

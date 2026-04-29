import { useState, useEffect } from 'react'
import { Link2, ExternalLink, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Article } from '../../data/articles'
import { articles } from '../../data/articles'

const copperTocItems = [
  { id: 'intro', label: 'Introduction' },
  { id: 'why-copper', label: 'Why Copper Works' },
  { id: 'formula', label: 'The Formula' },
  { id: 'application', label: 'Application Technique' },
  { id: 'maintenance', label: 'Selling Maintenance' },
]

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const h2Slugs = new Set(['find-right-stylist', 'brunette-glazing', 'vivid-color-guide', 'haircut-layers', 'layers-thin-hair', 'what-is-balayage', 'stylist-notices-thinning', 'gua-sha-scalp', 'low-maintenance-color', 'at-home-hair-care', 'busiest-stylists-system', 'smoothing-products-stylists-use', 'what-stylist-sees-when-you-sit-down', 'gdragon-hairstyles-stylists-reference'])

function getTocItems(article: Article) {
  if (!article.body) return copperTocItems
  const pattern = h2Slugs.has(article.slug) ? /^##\s+(?!#)(.+)$/gm : /^###\s+(.+)$/gm
  const headings = [...article.body.matchAll(pattern)]
  if (headings.length === 0) return copperTocItems
  return headings.map((m) => ({ id: slugify(m[1]), label: m[1] }))
}

const shareLinks = [
  { label: 'Copy Link', icon: Link2, action: 'copy' },
  { label: 'X / Twitter', icon: ExternalLink, action: 'twitter' },
  { label: 'Facebook', icon: ExternalLink, action: 'facebook' },
  { label: 'LinkedIn', icon: ExternalLink, action: 'linkedin' },
]

export default function ArticleSidebar({ article }: { article: Article }) {
  const [copied, setCopied] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const tocItems = getTocItems(article)

  const relatedArticles = articles
    .filter((a) => a.slug !== article.slug && a.slug !== 'what-is-balayage-old')
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)

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

  const handleShare = (action: string) => {
    if (action === 'copy') {
      navigator.clipboard.writeText(window.location.href).catch(() => {})
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="lg:sticky lg:top-6 flex flex-col gap-8">

      {/* Table of Contents */}
      <div className="border border-white/10 p-5">
        <p className="text-[10px] tracking-[0.3em] uppercase text-gold-500 font-semibold mb-4">
          In This Article
        </p>
        <nav className="flex flex-col gap-1">
          {tocItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`flex items-center gap-3 text-xs tracking-wide py-1.5 transition-colors group ${
                activeSection === item.id
                  ? 'text-gold-500'
                  : 'text-charcoal-500 hover:text-charcoal-200'
              }`}
            >
              <span
                className={`w-4 h-0.5 flex-shrink-0 transition-colors ${
                  activeSection === item.id ? 'bg-gold-500' : 'bg-charcoal-700 group-hover:bg-charcoal-500'
                }`}
              />
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Share */}
      <div className="border border-white/10 p-5">
        <p className="text-[10px] tracking-[0.3em] uppercase text-gold-500 font-semibold mb-4">
          Share This Story
        </p>
        <div className="grid grid-cols-2 gap-2">
          {shareLinks.map(({ label, icon: Icon, action }) => (
            <button
              key={label}
              onClick={() => handleShare(action)}
              className="flex items-center gap-2 text-[10px] tracking-wider uppercase text-charcoal-400 hover:text-white border border-white/10 hover:border-white/30 px-3 py-2 transition-colors"
            >
              <Icon size={11} />
              {action === 'copy' && copied ? 'Copied!' : label}
            </button>
          ))}
        </div>
      </div>

      {/* Newsletter mini CTA */}
      <div
        className="p-5 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a1a0a 0%, #0d0d0d 100%)', border: '1px solid rgba(201, 168, 76, 0.2)' }}
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/5 rounded-full blur-2xl pointer-events-none" />
        <p className="text-[10px] tracking-[0.3em] uppercase text-gold-500 font-semibold mb-2">Newsletter</p>
        <p className="text-sm font-semibold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
          Get weekly color<br />trends in your inbox
        </p>
        <p className="text-xs text-charcoal-500 mb-4">Join 85,000+ stylists.</p>
        <div className="flex">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 bg-white/5 border border-white/10 text-white placeholder-charcoal-600 px-3 py-2 text-xs outline-none focus:border-gold-500/50 transition-colors min-w-0"
          />
          <button className="bg-gold-500 hover:bg-gold-400 text-black px-3 py-2 text-[10px] font-bold tracking-wider transition-colors flex-shrink-0">
            Go
          </button>
        </div>
      </div>

      {/* Related sidebar articles */}
      <div>
        <p className="text-[10px] tracking-[0.3em] uppercase text-gold-500 font-semibold mb-4">
          Read Next
        </p>
        <div className="flex flex-col divide-y divide-white/5">
          {relatedArticles.map((a) => (
            <Link
              key={a.slug}
              to={`/article/${a.slug}`}
              className="flex gap-3 py-4 group cursor-pointer"
            >
              <div className="w-16 h-16 flex-shrink-0 overflow-hidden">
                <img
                  src={a.image}
                  alt={a.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-1 min-w-0">
                <span className="text-[9px] tracking-widest uppercase text-gold-500 font-medium">{a.tag}</span>
                <p
                  className="text-xs font-semibold text-charcoal-300 group-hover:text-white transition-colors leading-snug line-clamp-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {a.title}
                </p>
                <span className="text-[10px] text-charcoal-600">{a.readTime} read</span>
              </div>
            </Link>
          ))}
        </div>
        <a
          href="/articles"
          className="flex items-center gap-2 mt-2 text-[10px] tracking-widest uppercase text-charcoal-500 hover:text-gold-500 transition-colors"
        >
          More Articles <ArrowRight size={10} />
        </a>
      </div>
    </div>
  )
}

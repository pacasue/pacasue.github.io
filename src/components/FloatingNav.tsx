import { useState, useEffect } from 'react'
import { Menu, X, ArrowUp, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'

const navCategories = [
  { label: 'Trends', items: ['Color', 'Technique', 'Cut & Style', 'Texture'] },
  { label: 'Inspiration', items: ['Tips', 'Business'] },
  { label: 'Hair Care', items: ['Products', 'Hair Thinning', 'At-Home Tips'] },
  { label: 'Community', items: ['Contributors', 'About Us'] },
]

const communityLinks: Record<string, string> = {
  'Contributors': '/contributors',
  'About Us': '/about',
}

export default function FloatingNav() {
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 80)
      if (window.scrollY <= 80) setOpen(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => { setOpen(false); setActiveCategory(null) }

  if (!visible) return null

  return (
    <>
      {open && <div className="fixed inset-0 z-40" onClick={close} />}

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {open && (
          <div className="bg-black border border-white/10 shadow-2xl py-2 w-56">
            <button
              onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); close() }}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-[11px] tracking-widest uppercase text-charcoal-400 hover:text-gold-500 hover:bg-white/5 transition-colors"
            >
              <ArrowUp size={11} /> Back to Top
            </button>

            <div className="h-px bg-white/5 my-1" />

            {navCategories.map((cat) => (
              <div key={cat.label}>
                <button
                  onClick={() => setActiveCategory(activeCategory === cat.label ? null : cat.label)}
                  className="flex items-center justify-between w-full px-4 py-2.5 text-[11px] tracking-widest uppercase text-charcoal-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {cat.label}
                  <ChevronDown
                    size={10}
                    className={`opacity-60 transition-transform ${activeCategory === cat.label ? 'rotate-180' : ''}`}
                  />
                </button>
                {activeCategory === cat.label && (
                  <div className="bg-white/[0.03] border-t border-b border-white/5 py-1">
                    {cat.items.map((item) => (
                      <Link
                        key={item}
                        to={communityLinks[item] ?? `/articles?category=${encodeURIComponent(item)}`}
                        onClick={close}
                        className="block pl-7 pr-4 py-2 text-[11px] tracking-wider uppercase text-charcoal-500 hover:text-gold-500 transition-colors"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="h-px bg-white/5 my-1" />

            {[
              { label: 'Gallery', to: '/gallery' },
              { label: 'All Articles', to: '/articles' },
            ].map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                onClick={close}
                className="block px-4 py-2.5 text-[11px] tracking-widest uppercase text-charcoal-400 hover:text-gold-500 hover:bg-white/5 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        )}

        <button
          onClick={() => setOpen((o) => !o)}
          className="w-10 h-10 bg-gold-500 hover:bg-gold-400 text-black flex items-center justify-center shadow-lg transition-colors"
          aria-label="Toggle navigation"
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>
    </>
  )
}

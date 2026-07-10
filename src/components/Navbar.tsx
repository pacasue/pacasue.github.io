import { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'

const navCategories = [
  {
    label: 'Trends',
    items: ['Color', 'Technique', 'Cut & Style', 'Texture'],
  },
  {
    label: 'Inspiration',
    items: ['Tips', 'Business'],
  },
  {
    label: 'Hair Care',
    items: ['Products', 'Hair Thinning', 'At-Home Tips'],
  },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  return (
    <header className="relative z-50 bg-black border-b border-white/10">
      {/* Top bar */}
      {/* <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-8 text-[10px] tracking-widest uppercase text-charcoal-400">
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold-500 transition-colors">Find a Stylist</a>
            <a href="#" className="hover:text-gold-500 transition-colors">Inspiration</a>
            <a href="#" className="hover:text-gold-500 transition-colors">Book Now</a>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold-500 transition-colors">Sign In</a>
            <a href="#" className="hover:text-gold-500 transition-colors hidden sm:block">Get the Newsletter</a>
          </div>
        </div>
      </div> */}

      {/* Main navbar */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20 relative">
          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-charcoal-300 hover:text-white p-1 z-10"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo — centered on mobile, left-aligned on desktop */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex flex-col items-center md:items-start">
            <img
              src="/image/site-logo.svg"
              alt="HairProVoices"
              className="h-8 md:h-12 object-contain"
            />
            <span className="text-[8px] tracking-[0.35em] uppercase text-charcoal-400 hidden md:block mt-0.5">
              Your Guide to Great Hair
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navCategories.map((cat) => (
              <div
                key={cat.label}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(cat.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 px-3 py-2 text-[11px] tracking-widest uppercase font-medium text-charcoal-300 hover:text-white transition-colors">
                  {cat.label}
                  <ChevronDown size={10} className="opacity-60" />
                </button>

                {activeDropdown === cat.label && (
                  <div className="absolute top-full left-0 bg-black border border-white/10 py-2 min-w-[180px] shadow-2xl">
                    {cat.items.map((item) => (
                      <Link
                        key={item}
                        to={`/articles/?category=${encodeURIComponent(item)}`}
                        className="block px-4 py-2 text-[11px] tracking-wider uppercase text-charcoal-400 hover:text-gold-500 hover:bg-white/5 transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              to="/gallery/"
              className="px-3 py-2 text-[11px] tracking-widest uppercase font-medium text-charcoal-300 hover:text-white transition-colors"
            >
              Gallery
            </Link>
            <Link
              to="/articles/"
              className="px-3 py-2 text-[11px] tracking-widest uppercase font-medium text-charcoal-300 hover:text-white transition-colors"
            >
              All Articles
            </Link>
            <div
              className="relative group"
              onMouseEnter={() => setActiveDropdown('Community')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 px-3 py-2 text-[11px] tracking-widest uppercase font-medium text-charcoal-300 hover:text-white transition-colors">
                Community
                <ChevronDown size={10} className="opacity-60" />
              </button>
              {activeDropdown === 'Community' && (
                <div className="absolute top-full left-0 bg-black border border-white/10 py-2 min-w-[180px] shadow-2xl">
                  <Link
                    to="/contributors/"
                    className="block px-4 py-2 text-[11px] tracking-wider uppercase text-charcoal-400 hover:text-gold-500 hover:bg-white/5 transition-colors"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Contributors
                  </Link>
                  <Link
                    to="/about/"
                    className="block px-4 py-2 text-[11px] tracking-wider uppercase text-charcoal-400 hover:text-gold-500 hover:bg-white/5 transition-colors"
                    onClick={() => setActiveDropdown(null)}
                  >
                    About Us
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-black border-t border-white/10 pb-4">
          {navCategories.map((cat) => (
            <div key={cat.label} className="border-b border-white/5">
              <button
                onClick={() =>
                  setActiveDropdown(activeDropdown === cat.label ? null : cat.label)
                }
                className="flex justify-between items-center w-full px-4 py-3 text-[11px] tracking-widest uppercase font-medium text-charcoal-300"
              >
                {cat.label}
                <ChevronDown
                  size={12}
                  className={`transition-transform ${activeDropdown === cat.label ? 'rotate-180' : ''}`}
                />
              </button>
              {activeDropdown === cat.label && (
                <div className="px-4 pb-3 flex flex-col gap-2">
                  {cat.items.map((item) => (
                    <Link
                      key={item}
                      to={`/articles/?category=${encodeURIComponent(item)}`}
                      className="text-[11px] tracking-wider uppercase text-charcoal-400 hover:text-gold-500"
                      onClick={() => { setMenuOpen(false); setActiveDropdown(null) }}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="border-b border-white/5">
            <Link
              to="/gallery/"
              className="block px-4 py-3 text-[11px] tracking-widest uppercase font-medium text-charcoal-300 hover:text-gold-500"
              onClick={() => setMenuOpen(false)}
            >
              Gallery
            </Link>
          </div>
          <div className="border-b border-white/5">
            <Link
              to="/articles/"
              className="block px-4 py-3 text-[11px] tracking-widest uppercase font-medium text-charcoal-300 hover:text-gold-500"
              onClick={() => setMenuOpen(false)}
            >
              All Articles
            </Link>
          </div>
          <div className="border-b border-white/5">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'Community' ? null : 'Community')}
              className="flex justify-between items-center w-full px-4 py-3 text-[11px] tracking-widest uppercase font-medium text-charcoal-300"
            >
              Community
              <ChevronDown
                size={12}
                className={`transition-transform ${activeDropdown === 'Community' ? 'rotate-180' : ''}`}
              />
            </button>
            {activeDropdown === 'Community' && (
              <div className="px-4 pb-3 flex flex-col gap-2">
                <Link
                  to="/contributors/"
                  className="text-[11px] tracking-wider uppercase text-charcoal-400 hover:text-gold-500"
                  onClick={() => { setMenuOpen(false); setActiveDropdown(null) }}
                >
                  Contributors
                </Link>
                <Link
                  to="/about/"
                  className="text-[11px] tracking-wider uppercase text-charcoal-400 hover:text-gold-500"
                  onClick={() => { setMenuOpen(false); setActiveDropdown(null) }}
                >
                  About Us
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

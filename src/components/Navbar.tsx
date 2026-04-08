import { useState } from 'react'
import { Search, Menu, X, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'

const navCategories = [
  {
    label: 'Trends',
    items: ['Color Trends', 'Cut & Style', 'Texture', 'Hair Extensions'],
  },
  {
    label: 'Techniques',
    items: ['Balayage', 'Vivid Color', 'Precision Cuts', 'Keratin & Treatments'],
  },
  {
    label: 'Education',
    items: ['Online Classes', 'Workshops', 'Certifications', 'Business Skills'],
  },
  {
    label: 'Gallery',
    items: ['Editorial Looks', 'Client Transformations', 'Competition Work', 'Before & After'],
  },
  {
    label: 'Business',
    items: ['Salon Management', 'Marketing', 'Client Relations', 'Product Reviews'],
  },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="relative z-50 bg-black border-b border-white/10">
      {/* Top bar */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-8 text-[10px] tracking-widest uppercase text-charcoal-400">
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold-500 transition-colors">Subscribe</a>
            <a href="#" className="hover:text-gold-500 transition-colors">Advertise</a>
            <a href="#" className="hover:text-gold-500 transition-colors">Events</a>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold-500 transition-colors">Sign In</a>
            <a href="#" className="hover:text-gold-500 transition-colors hidden sm:block">Newsletter</a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-charcoal-300 hover:text-white p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex flex-col items-center md:items-start">
            <span
              className="text-white font-bold tracking-[0.2em] uppercase text-lg md:text-2xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              HairPro<span className="text-gold-500">Voices</span>
            </span>
            <span className="text-[8px] tracking-[0.35em] uppercase text-charcoal-400 hidden md:block mt-0.5">
              The Pulse of the Pro Hair Industry
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
                      <a
                        key={item}
                        href="#"
                        className="block px-4 py-2 text-[11px] tracking-wider uppercase text-charcoal-400 hover:text-gold-500 hover:bg-white/5 transition-colors"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Search */}
          <div className="flex items-center gap-3">
            {searchOpen ? (
              <div className="flex items-center bg-white/5 border border-white/10 rounded-none">
                <input
                  autoFocus
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent text-sm text-white placeholder-charcoal-500 px-3 py-1.5 outline-none w-48"
                />
                <button onClick={() => setSearchOpen(false)} className="pr-2 text-charcoal-500 hover:text-white">
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="text-charcoal-300 hover:text-white transition-colors p-1"
                aria-label="Open search"
              >
                <Search size={18} />
              </button>
            )}
          </div>
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
                    <a
                      key={item}
                      href="#"
                      className="text-[11px] tracking-wider uppercase text-charcoal-400 hover:text-gold-500"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  )
}


import { Link } from 'react-router-dom'

const footerLinks = {
  Editorial: [
    { label: 'All Articles', to: '/articles' },
    { label: 'Trends', to: '/articles?section=Trends' },
    { label: 'Inspiration', to: '/articles?section=Inspiration' },
    { label: 'Hair Care', to: '/articles?section=Hair+Care' },
    { label: 'Gallery', to: '/gallery' },
  ],
  Explore: [
    { label: 'Color', to: '/articles?category=Color' },
    { label: 'Cut & Style', to: '/articles?category=Cut+%26+Style' },
    { label: 'Hair Thinning', to: '/articles?category=Hair+Thinning' },
    { label: 'At-Home Tips', to: '/articles?category=At-Home+Tips' },
    { label: 'Products', to: '/articles?category=Products' },
  ],
  Community: [
    { label: 'About Us', to: '/about' },
    { label: 'Contributors', to: '/contributors' },
  ],
}

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/hairpro.voices/', initial: 'IG' },
  { label: 'Facebook', href: 'https://www.facebook.com/people/Hairpro-Voices/61564779778738/', initial: 'FB' },
]

const sponsors = [
  'Wella Professionals',
  'Redken',
  'Schwarzkopf',
  "L'Oréal Professionnel",
  'Kenra Professional',
]

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5">

      {/* Sponsor bar */}
      <div className="border-b border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-[9px] tracking-[0.3em] uppercase text-charcoal-600 text-center mb-4">Proud Partners</p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {sponsors.map((s) => (
              <span key={s} className="text-[11px] tracking-widest uppercase text-charcoal-600 hover:text-charcoal-400 transition-colors cursor-pointer font-medium">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-10">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-2 flex flex-col gap-4">
            <Link to="/" className="flex flex-col gap-1">
              <img src="/image/site-logo.svg" alt="HairProVoices" className="h-8 object-contain object-left" />
              <span className="text-[9px] tracking-[0.3em] uppercase text-charcoal-600">
                Great Hair Starts with Great Advice
              </span>
            </Link>
            <p className="text-xs text-charcoal-500 leading-relaxed max-w-[240px]">
              Stylist-created guides, trends, and inspiration to help you get the most out of every salon visit.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3 mt-2">
              {socials.map(({ label, href, initial }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  title={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-charcoal-400 hover:border-gold-500 hover:text-gold-500 transition-colors text-[9px] font-bold tracking-wider"
                >
                  {initial}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="flex flex-col gap-3">
              <h4 className="text-[10px] font-semibold tracking-[0.25em] uppercase text-white mb-1">
                {category}
              </h4>
              {links.map(({ label, to }) => (
                <Link
                  key={label}
                  to={to}
                  className="text-xs text-charcoal-500 hover:text-charcoal-200 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] text-charcoal-600 tracking-wider">
          <span>© 2026 HairProVoices Media, LLC. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <Link to="/about" className="hover:text-charcoal-400 transition-colors">About</Link>
            <a href="mailto:editorial@hairprovoices.com" className="hover:text-charcoal-400 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

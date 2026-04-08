
const footerLinks = {
  Editorial: ['Trends', 'Techniques', 'Gallery', 'Business', 'Education', 'Products'],
  Learn: ['Online Courses', 'Workshops', 'Live Events', 'Certifications', 'Mentorships'],
  Community: ['Submit Your Work', 'Stylist Directory', 'Forum', 'Awards', 'Competitions'],
  Company: ['About Us', 'Advertise', 'Careers', 'Press', 'Contact', 'Privacy Policy'],
}

const socials = [
  { label: 'Instagram', href: '#', initial: 'IG' },
  { label: 'YouTube', href: '#', initial: 'YT' },
  { label: 'TikTok', href: '#', initial: 'TK' },
  { label: 'Pinterest', href: '#', initial: 'PN' },
]

const sponsors = [
  'Wella Professionals',
  'Redken',
  'Schwarzkopf',
  'L\'Oréal Professionnel',
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
            <a href="#" className="flex flex-col gap-1">
              <span
                className="text-white font-bold tracking-[0.2em] uppercase text-xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                HairPro<span className="text-gold-500">Voices</span>
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-charcoal-600">
                The Pulse of the Pro Hair Industry
              </span>
            </a>
            <p className="text-xs text-charcoal-500 leading-relaxed max-w-[240px]">
              The definitive resource for professional stylists worldwide — education, trends, and community in one place.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3 mt-2">
              {socials.map(({ label, href, initial }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  title={label}
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
              {links.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-xs text-charcoal-500 hover:text-charcoal-200 transition-colors"
                >
                  {link}
                </a>
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
            <a href="#" className="hover:text-charcoal-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-charcoal-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-charcoal-400 transition-colors">Cookies</a>
            <a href="#" className="hover:text-charcoal-400 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

import { ArrowRight } from 'lucide-react'

const AUTHOR_IMAGE = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&q=80&auto=format&fit=crop&facepad=3&faces=1'

export default function ArticleAuthor() {
  return (
    <div className="mt-14 pt-8 border-t border-white/10">
      <p className="text-[10px] tracking-[0.3em] uppercase text-charcoal-600 mb-6">About the Author</p>

      <div className="flex flex-col sm:flex-row gap-6 bg-white/[0.03] border border-white/8 p-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-gold-500/20">
            <img
              src={AUTHOR_IMAGE}
              alt="Leila Fernandez"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-2">
          <div>
            <a
              href="#"
              className="text-lg font-bold text-white hover:text-gold-500 transition-colors"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Leila Fernandez
            </a>
            <p className="text-[10px] tracking-widest uppercase text-gold-500 mt-0.5 font-medium">
              Senior Color Editor · HairProVoices
            </p>
          </div>
          <p className="text-sm text-charcoal-400 leading-relaxed">
            Leila has been covering professional hair color for over a decade. A former colorist herself,
            she splits her time between salon visits, brand labs, and competitions to bring color professionals
            the most actionable, accurate coverage in the industry. She is based in Miami, FL.
          </p>
          <div className="flex items-center gap-4 mt-2">
            {['Instagram', 'LinkedIn', 'All Articles'].map((label) => (
              <a
                key={label}
                href="#"
                className="text-[10px] tracking-widest uppercase text-charcoal-500 hover:text-gold-500 transition-colors flex items-center gap-1"
              >
                {label} {label === 'All Articles' && <ArrowRight size={9} />}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

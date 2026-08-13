import { Quote, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { authors } from '../data/articles'

const tips = [
  {
    id: 1,
    category: 'Color',
    tip: 'Ask your colorist to show you a strand test before committing to a big color change. It takes 10 minutes and saves months of regret.',
    stylist: 'Leila Fernandez',
    role: 'Senior Color Editor',
    location: 'Miami, FL',
    image: authors['Leila Fernandez'].image,
    slug: 'leila-fernandez',
  },
  {
    id: 2,
    category: 'Cut',
    tip: 'Bring a photo to your appointment, but be open to your stylist\'s take on how it works with your texture and face shape.',
    stylist: 'Tom Harley',
    role: 'Technique Editor',
    location: 'London, UK',
    image: authors['Tom Harley'].image,
    slug: 'tom-harley',
  },
  {
    id: 3,
    category: 'Business',
    tip: 'If you love your stylist, rebook before you leave the chair. The best appointment slots go to regulars.',
    stylist: 'Dana Reeves',
    role: 'Salon Business Coach',
    location: 'Nashville, TN',
    image: authors['Dana Reeves'].image,
    slug: 'dana-reeves',
  },
  {
    id: 4,
    category: 'Texture',
    tip: 'Tell your stylist your full hair routine at home, the products you use matter as much as what happens in the salon.',
    stylist: 'Imani Okafor',
    role: 'Texture & Curl Editor',
    location: 'Atlanta, GA',
    image: authors['Imani Okafor'].image,
    slug: 'imani-okafor',
  },
]

const CAT_COLOR: Record<string, string> = {
  Color: 'bg-amber-500/10 text-amber-400',
  Cut: 'bg-blue-500/10 text-blue-400',
  Business: 'bg-emerald-500/10 text-emerald-400',
  Texture: 'bg-purple-500/10 text-purple-400',
}

export default function ProTips() {
  return (
    <section className="bg-black py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-0.5 bg-gold-500" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-gold-500 font-medium">Pro Tips</span>
            </div>
            <h2
              className="text-2xl md:text-3xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Wisdom From the Chair
            </h2>
          </div>
          <Link
            to="/contributors/"
            className="hidden md:flex items-center gap-2 text-[11px] tracking-widest uppercase text-charcoal-400 hover:text-gold-500 transition-colors"
          >
            Meet the Experts <ArrowRight size={12} />
          </Link>
        </div>

        {/* Tips grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
          {tips.map((tip) => (
            <Link
              key={tip.id}
              to={`/author/${tip.slug}`}
              className="group bg-black hover:bg-white/[0.03] transition-colors p-6 md:p-8 flex flex-col gap-5 cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
                <Quote size={28} className="text-gold-500/30 group-hover:text-gold-500/60 transition-colors flex-shrink-0 mt-1" />
                <span className={`text-[9px] tracking-widest uppercase font-semibold px-2.5 py-1 rounded-full ${CAT_COLOR[tip.category]}`}>
                  {tip.category}
                </span>
              </div>

              <p
                className="text-lg md:text-xl text-charcoal-200 group-hover:text-white transition-colors leading-relaxed"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {tip.tip}
              </p>

              <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={tip.image}
                    alt={tip.stylist}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gold-500/0 group-hover:bg-gold-500/10 transition-colors" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-charcoal-200 group-hover:text-white transition-colors">
                    {tip.stylist}
                  </p>
                  <p className="text-[10px] text-charcoal-500">
                    {tip.role} · {tip.location}
                  </p>
                </div>
                <ArrowRight
                  size={14}
                  className="ml-auto text-charcoal-700 group-hover:text-gold-500 group-hover:translate-x-1 transition-all"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

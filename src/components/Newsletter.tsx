import { useState } from 'react'
import { Send, Check } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1000)
  }

  return (
    <section className="relative overflow-hidden bg-charcoal-950 py-20 lg:py-28">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-3xl" />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, #C9A84C40, transparent)' }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, #C9A84C40, transparent)' }}
        />
      </div>

      <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-12 bg-gold-500" />
          <span className="text-[10px] tracking-[0.35em] uppercase text-gold-500 font-medium">Newsletter</span>
          <div className="h-px w-12 bg-gold-500" />
        </div>

        <h2
          className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Get the Best Hair<br />
          <em>Advice, Weekly</em>
        </h2>

        <p className="text-charcoal-400 text-sm md:text-base leading-relaxed mb-10 max-w-md mx-auto">
          Join 85,000+ readers getting stylist-curated trend reports, care tips, and inspiration — straight to your inbox.
        </p>

        {submitted ? (
          <div className="flex flex-col items-center gap-3 text-white">
            <div className="w-14 h-14 rounded-full bg-gold-500 flex items-center justify-center">
              <Check size={24} className="text-black" />
            </div>
            <p className="text-lg font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
              You're in!
            </p>
            <p className="text-charcoal-400 text-sm">Check your inbox for a confirmation email.</p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 bg-white/5 border border-white/10 border-r-0 text-white placeholder-charcoal-600 px-5 py-3.5 text-sm outline-none focus:border-gold-500/50 transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-black text-[11px] font-bold tracking-widest uppercase px-6 py-3.5 transition-colors disabled:opacity-70 min-w-[140px]"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    Subscribe <Send size={11} />
                  </>
                )}
              </button>
            </form>

            <div className="flex items-center justify-center gap-6 mt-6 text-[10px] text-charcoal-600 uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><Check size={10} className="text-gold-500/50" /> No spam, ever</span>
              <span className="flex items-center gap-1.5"><Check size={10} className="text-gold-500/50" /> Weekly digest</span>
              <span className="flex items-center gap-1.5"><Check size={10} className="text-gold-500/50" /> Unsubscribe anytime</span>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

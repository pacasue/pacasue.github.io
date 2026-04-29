import Navbar from '../components/Navbar'
import Ticker from '../components/Ticker'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import FloatingNav from '../components/FloatingNav'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-charcoal-950 text-charcoal-100">
      <Navbar />
      <Ticker />
      <FloatingNav />
      <main>
        {/* Hero */}
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px bg-gold-500 w-8" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-gold-500 font-medium">About</span>
            </div>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Written by stylists.<br />
              <em>Built for everyone.</em>
            </h1>
          </div>
        </div>

        {/* Mission */}
        <div className="max-w-7xl mx-auto px-4 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-7">
              <p className="text-lg md:text-xl text-charcoal-300 leading-relaxed mb-6">
                HairProVoices started with a simple frustration: the best hair knowledge lived inside salons, not on the internet. Colorists, curl specialists, and business coaches were sharing hard-won expertise with clients one chair at a time, but none of it was being written down.
              </p>
              <p className="text-base text-charcoal-400 leading-relaxed mb-6">
                We built this publication to change that. Every article on HairProVoices is written or reviewed by a working professional: someone who has spent years behind the chair, in the color lab, or running a salon. We cover technique, trends, hair health, and the business of beauty with the same depth you would expect from a trade publication, but written for anyone who cares about their hair.
              </p>
              <p className="text-base text-charcoal-400 leading-relaxed">
                We are independent. We do not accept payment for editorial coverage. When we recommend a product or technique, it is because our contributors believe in it — not because a brand paid us to say so.
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-8">
              {[
                { stat: '85,000+', label: 'Stylists in our community' },
                { stat: '200+', label: 'Articles in planning' },
                { stat: '15+', label: 'Contributing professionals' },
              ].map(({ stat, label }) => (
                <div key={label} className="border-l-2 border-gold-500 pl-6">
                  <p
                    className="text-4xl font-bold text-white mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {stat}
                  </p>
                  <p className="text-sm text-charcoal-500 tracking-wide">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="border-t border-white/5 bg-black">
          <div className="max-w-7xl mx-auto px-4 py-14 lg:py-20">
            <p className="text-[10px] tracking-[0.3em] uppercase text-gold-500 font-semibold mb-10">What we stand for</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
              {[
                {
                  title: 'Expertise first',
                  body: 'Every piece of advice on this site comes from someone who has done the work.',
                },
                {
                  title: 'Editorial independence',
                  body: 'We are not a brand channel. Our contributors write freely, and our editors do not accept payment to shape coverage.',
                },
                {
                  title: 'Accessible knowledge',
                  body: 'Professional hair knowledge should not be locked behind a paywall or a salon appointment. We write for stylists and clients alike. Clearly, without jargon.',
                },
              ].map(({ title, body }) => (
                <div key={title} className="bg-black p-8">
                  <h3
                    className="text-lg font-bold text-white mb-3"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {title}
                  </h3>
                  <p className="text-sm text-charcoal-500 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact */}
        {/* <div className="border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 py-14 lg:py-20">
            <p className="text-[10px] tracking-[0.3em] uppercase text-gold-500 font-semibold mb-4">Get in touch</p>
            <h2
              className="text-2xl md:text-3xl font-bold text-white mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Work with us
            </h2>
            <p className="text-sm text-charcoal-400 leading-relaxed max-w-xl mb-8">
              We are always looking for working professionals who want to contribute. If you are a stylist, colorist, trichologist, or salon business owner with something worth saying, we want to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-black text-[11px] font-bold tracking-widest uppercase px-5 py-3 transition-colors"
              >
                Pitch a Story
              </a>
              <a
                className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-charcoal-300 hover:text-white text-[11px] font-bold tracking-widest uppercase px-5 py-3 transition-colors"
              >
                Partner with Us
              </a>
            </div>
          </div>
        </div> */}

        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

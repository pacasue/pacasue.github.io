import Navbar from '../components/Navbar'
import Ticker from '../components/Ticker'
import Hero from '../components/Hero'
import FeaturedGrid from '../components/FeaturedGrid'
import TrendingLooks from '../components/TrendingLooks'
import EducationSection from '../components/EducationSection'
import ProTips from '../components/ProTips'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-charcoal-950 text-charcoal-100">
      <Navbar />
      <Ticker />
      <main>
        <Hero />
        <FeaturedGrid />
        <TrendingLooks />
        <EducationSection />
        <ProTips />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

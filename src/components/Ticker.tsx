const tickerItems = [
  '✦ TRENDING: Lived-in Brunettes Are Taking Over',
  '✦ NEW: Fall 2026 Color Forecast Released',
  '✦ GUIDE: How to Ask for Balayage at Your Salon',
  '✦ SPOTLIGHT: Top 50 Stylists to Follow in 2026',
  '✦ PRODUCT: Best Bond Builders for 2026 Tested',
  '✦ INSPIRATION: Spring 2026 Hair Trends, Ranked',
  '✦ GUIDE: What Is Glass Hair and Can You Get It?',
  '✦ TIPS: The Best At-Home Products Your Stylist Recommends',
]

export default function Ticker() {
  const doubled = [...tickerItems, ...tickerItems]

  return (
    <div className="bg-gold-500 text-black overflow-hidden h-8 flex items-center">
      <div
        className="flex gap-12 whitespace-nowrap ticker-scroll"
        style={{ width: 'max-content' }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-[10px] font-semibold tracking-widest uppercase cursor-pointer hover:underline"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

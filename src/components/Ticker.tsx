const tickerItems = [
  '✦ TRENDING: Lived-in Brunettes Are Taking Over',
  '✦ NEW: Fall 2026 Color Forecast Released',
  '✦ EDUCATION: Free Balayage Masterclass — Register Now',
  '✦ SPOTLIGHT: Top 50 Stylists of the Year Announced',
  '✦ PRODUCT: Best Bond Builders for 2026 Tested',
  '✦ EVENT: InterCoiffure World Congress — Paris, June 2026',
  '✦ TECHNIQUE: The Science Behind Glass Hair',
  '✦ BUSINESS: How To Triple Your Retail Sales This Quarter',
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

const conditions = ['No treatment', 'NOVOGRO™', 'Nutrafol topical comparator']
const days = [4, 6, 10]
// Display the nine original microscopy panels. All labels are live text;
// image positioning excludes the source graphic's labels and blank margin.
const columns = [{ x: 46, width: 313 }, { x: 370, width: 308 }, { x: 689, width: 314 }]
const rows = [{ y: 41, height: 175 }, { y: 228, height: 175 }, { y: 414, height: 180 }]

export default function FollicleModelFigure({ source }: { source: string }) {
  return (
    <figure className="my-8 border border-white/10 p-4 md:p-6" data-figure="follicle-model">
      <figcaption className="mb-5 text-lg text-white font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>Inside the 3D follicle model</figcaption>
      <div className="space-y-5">
        {conditions.map((condition, rowIndex) => (
          <div key={condition}>
            <p className={`mb-2 text-xs font-semibold ${rowIndex === 1 ? 'text-gold-500' : 'text-charcoal-300'}`}>{condition}</p>
            <div className="grid grid-cols-3 gap-2">
              {days.map((day, columnIndex) => {
                const panel = { ...columns[columnIndex], ...rows[rowIndex] }
                return (
                  <div key={day}>
                    <div className="relative overflow-hidden bg-white" style={{ aspectRatio: `${panel.width} / ${panel.height}` }}>
                      <img src={source} alt={`${condition}, day ${day}: original follicloid microscopy`} loading="lazy" className="absolute block h-auto max-w-none" style={{ width: `${1024 / panel.width * 100}%`, left: `${-panel.x / panel.width * 100}%`, top: `${-panel.y / panel.height * 100}%` }} />
                    </div>
                    <p className="mt-1.5 text-center text-[10px] text-charcoal-400">Day {day}</p>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm leading-relaxed italic text-charcoal-300">That is the visual readout: the NOVOGRO™-treated follicle model grew farther in the lab.</p>
    </figure>
  )
}

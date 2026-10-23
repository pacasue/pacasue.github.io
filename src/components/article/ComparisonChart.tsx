import type { ReactNode } from 'react'

export interface ComparisonChartData {
  title: string
  measure: string
  unit: '%' | '×'
  maximum: number
  ticks: number[]
  bars: { label: string; value: number }[]
  callout?: string
  footnote?: string
}

export default function ComparisonChart({ title, measure, unit, maximum, ticks, bars, callout, footnote }: Omit<ComparisonChartData, 'callout' | 'footnote'> & { callout?: ReactNode; footnote?: ReactNode }) {
  return (
    <figure className="my-10 border border-gold-500/25 bg-black p-5 md:p-7" data-chart="comparison">
      <figcaption>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-500 mb-3">Preclinical comparison</p>
        <h3 className="text-xl md:text-2xl font-semibold leading-snug text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-400">{measure}</p>
      </figcaption>
      {callout && <p className="mt-6 border-l-2 border-gold-500 pl-4 text-base leading-relaxed text-white [&_strong]:text-gold-500" data-chart-callout>{callout}</p>}
      <div className="mt-7 space-y-6">
        {bars.map(({ label, value }, index) => (
          <div key={label} data-series={label} data-value={value}>
            <div className="flex items-baseline justify-between gap-4 mb-2">
              <span className="text-sm font-medium text-charcoal-100">{label}</span>
              <span className="text-xl font-semibold tabular-nums text-white">{value}{unit}</span>
            </div>
            <div className="relative h-9 bg-white/[0.05]" aria-hidden="true">
              {ticks.slice(1).map(tick => (
                <span key={tick} className="absolute inset-y-0 border-l border-white/10" style={{ left: `${tick / maximum * 100}%` }} />
              ))}
              <div className={`absolute inset-y-0 left-0 ${index === 0 ? 'bg-gold-500' : 'bg-[#8d825e]'}`} style={{ width: `${value / maximum * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="relative h-5 mt-2 text-[10px] text-charcoal-400 tabular-nums" aria-hidden="true">
        {ticks.map((tick, index) => (
          <span key={tick} className="absolute" style={{ left: `${tick / maximum * 100}%`, transform: `translateX(${index === 0 ? '0' : index === ticks.length - 1 ? '-100%' : '-50%'})` }}>{tick}{unit}</span>
        ))}
      </div>
      {footnote && <p className="mt-5 border-t border-white/10 pt-4 text-xs leading-relaxed text-charcoal-400">{footnote}</p>}
    </figure>
  )
}

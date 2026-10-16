import type { ReactNode } from 'react'

export interface GroupedBarChartData {
  title: string
  series: string[]
  maximum: number
  groups: { label: string; description: string; values: number[] }[]
  footnote?: string
}

const colors = ['#C9A84C', '#75632D']

export default function GroupedBarChart({ title, series, maximum, groups, footnote }: Omit<GroupedBarChartData, 'footnote'> & { footnote?: ReactNode }) {
  return (
    <figure className="my-10 border border-gold-500/20 bg-black p-5 md:p-7" data-chart="grouped-bar">
      <figcaption className="text-xl md:text-2xl text-white font-semibold leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
        {title}
      </figcaption>
      <p className="mt-2 text-[12px] text-charcoal-400">Laboratory signals relative to untreated control (%)</p>
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
        {series.map((name, i) => (
          <span key={name} className="flex items-center gap-2 text-[13px] text-charcoal-200">
            <span aria-hidden="true" className="inline-block h-3 w-3 border border-gold-500/40" style={{ backgroundColor: colors[i] }} />
            {name}
          </span>
        ))}
      </div>
      <div className="mt-9 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-9">
        {groups.map((group) => (
          <div key={group.label} className="min-w-0">
            <div className="relative h-52 ml-7 border-b border-white/60" role="img" aria-label={`${group.label}: ${series.map((name, i) => `${name} ${group.values[i]}%`).join('; ')}. Scale 0 to ${maximum}%.`}>
              {[0, 20, 40, 60].filter((tick) => tick <= maximum).map((tick) => (
                <div key={tick} aria-hidden="true" className="absolute inset-x-0 border-t border-white/10" style={{ bottom: `${tick / maximum * 100}%` }}>
                  <span className="absolute right-full pr-2 -translate-y-1/2 text-[10px] text-charcoal-400">{tick}</span>
                </div>
              ))}
              <div className="absolute inset-0 flex items-end justify-center gap-4 px-3" aria-hidden="true">
                {group.values.map((value, i) => (
                  <div key={series[i]} className="relative w-1/3 max-w-20" data-series={series[i]} data-value={value} style={{ height: `${value / maximum * 100}%`, backgroundColor: colors[i] }}>
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 pb-2 text-base font-semibold text-white whitespace-nowrap">{value.toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
            <h4 className="mt-4 text-sm font-semibold leading-snug text-white">{group.label}</h4>
            <p className="mt-2 text-[13px] leading-relaxed text-charcoal-400">{group.description}</p>
          </div>
        ))}
      </div>
      {footnote && <p className="mt-6 border-t border-white/10 pt-4 text-[12px] leading-relaxed text-charcoal-400">{footnote}</p>}
    </figure>
  )
}

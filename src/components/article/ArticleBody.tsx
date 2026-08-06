import { useState, useEffect, useRef } from 'react'
import type { Article } from '../../data/articles'
import { Quote, Sparkles, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react'

const INLINE_IMAGE_1 = '/image/copper-1.png'
const INLINE_IMAGE_2 = '/image/copper-re.png'

function SectionHeading({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="text-2xl md:text-3xl font-bold text-white mt-12 mb-5 leading-snug"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      {children}
    </h2>
  )
}

function Subheading({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h3
      id={id}
      className="text-lg font-semibold text-charcoal-100 mt-8 mb-3 flex items-center gap-3"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      <span className="inline-block w-4 h-0.5 bg-gold-500 flex-shrink-0" />
      {children}
    </h3>
  )
}

function MinorHeading({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h4 id={id} className="text-base font-semibold text-charcoal-100 mt-6 mb-3">
      {children}
    </h4>
  )
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-charcoal-300 text-base md:text-[17px] leading-[1.85] mb-5">
      {children}
    </p>
  )
}

function PullQuote({ quote, attribution }: { quote: string; attribution: string }) {
  return (
    <div className="my-10 border-l-4 border-gold-500 pl-6 md:pl-8 py-2">
      <Quote size={24} className="text-gold-500/40 mb-3" />
      <p
        className="text-xl md:text-2xl text-white font-medium leading-snug italic"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {quote}
      </p>
      <p className="text-[11px] tracking-widest uppercase text-gold-500 mt-4 font-medium">
        — {attribution}
      </p>
    </div>
  )
}

function TipBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="my-8 bg-white/[0.04] border border-gold-500/20 p-6">
      <p className="text-[9px] tracking-[0.3em] uppercase text-gold-500 font-semibold mb-2">Pro Tip</p>
      <p className="text-sm font-semibold text-charcoal-100 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
        {title}
      </p>
      <div className="text-sm text-charcoal-400 leading-relaxed">{children}</div>
    </div>
  )
}

function StepList({ steps }: { steps: { step: number; title: string; body: string }[] }) {
  return (
    <div className="my-8 flex flex-col gap-4">
      {steps.map(({ step, title, body }) => (
        <div key={step} className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 bg-gold-500 flex items-center justify-center text-black text-xs font-bold">
            {step}
          </div>
          <div>
            <p className="text-sm font-semibold text-charcoal-100 mb-1">{title}</p>
            <p className="text-sm text-charcoal-400 leading-relaxed">{body}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function InlineImage({ src, caption, full }: { src: string; caption: string; full?: boolean }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <figure className="my-10 -mx-4 md:mx-0">
      <div className="relative overflow-hidden">
        {!loaded && (
          <div className="absolute inset-0 bg-charcoal-800 animate-pulse" style={{ minHeight: '200px' }} />
        )}
        <img
          src={src}
          alt={caption}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className="w-full object-cover transition-opacity duration-500"
          style={{ opacity: loaded ? 1 : 0, ...(full ? {} : { maxHeight: '360px' }) }}
        />
      </div>
      <figcaption className="text-[11px] text-charcoal-500 tracking-wider mt-3 px-4 md:px-0">
        {caption}
      </figcaption>
    </figure>
  )
}

function CtaCallout({ children }: { children: React.ReactNode }) {
  return (
    <aside className="my-12 overflow-hidden border border-gold-500/30 bg-[linear-gradient(135deg,rgba(201,168,76,0.16),rgba(255,255,255,0.04)_46%,rgba(10,10,10,0.92))] p-6 md:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center bg-gold-500 text-black">
          <Sparkles size={19} />
        </div>
        <div>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-500">
            Next Step
          </p>
          <p className="text-lg leading-[1.75] text-charcoal-100 md:text-xl">
            {children}
          </p>
        </div>
      </div>
    </aside>
  )
}

function QuoteCarousel({ quotes }: { quotes: { text: string; attribution?: string }[] }) {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState<'left' | 'right'>('right')
  const [animating, setAnimating] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const navigate = (next: number, direction: 'left' | 'right') => {
    if (animating) return
    setDir(direction)
    setAnimating(true)
    timeoutRef.current = setTimeout(() => {
      setIndex(next)
      setAnimating(false)
    }, 280)
  }

  const prev = () => navigate((index - 1 + quotes.length) % quotes.length, 'left')
  const next = () => navigate((index + 1) % quotes.length, 'right')

  // Auto-advance every 6 s
  useEffect(() => {
    const id = setInterval(() => navigate((index + 1) % quotes.length, 'right'), 6000)
    return () => clearInterval(id)
  })

  const { text, attribution } = quotes[index]

  return (
    <div className="my-10 border border-gold-500/20 bg-white/[0.02] relative overflow-hidden select-none">
      <div className="px-8 py-8 md:px-12 md:py-10">
        <Quote size={28} className="text-gold-500/30 mb-4" />
        <div
          style={{
            opacity: animating ? 0 : 1,
            transform: animating
              ? `translateX(${dir === 'right' ? '-18px' : '18px'})`
              : 'translateX(0)',
            transition: 'opacity 0.28s ease, transform 0.28s ease',
          }}
        >
          <p
            className="text-xl md:text-2xl text-white font-medium leading-snug italic mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {text}
          </p>
          {attribution && (
            <p className="text-[11px] tracking-widest uppercase text-gold-500 font-medium">
              — {attribution}
            </p>
          )}
        </div>
        {/* Dots */}
        <div className="flex items-center gap-1.5 mt-6">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => navigate(i, i > index ? 'right' : 'left')}
              className={`transition-all rounded-full ${
                i === index ? 'w-4 h-1.5 bg-gold-500' : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to quote ${i + 1}`}
            />
          ))}
        </div>
      </div>
      {/* Nav buttons */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-charcoal-500 hover:text-white transition-colors"
        aria-label="Previous quote"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-charcoal-500 hover:text-white transition-colors"
        aria-label="Next quote"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}

function ImageRow({ images }: { images: { src: string; caption: string }[] }) {
  return (
    <div className="my-10 -mx-4 md:mx-0">
      <div className="flex gap-3 overflow-x-auto pb-3 px-4 md:px-0 snap-x snap-mandatory">
        {images.map(({ src, caption }, i) => (
          <figure key={i} className="flex-shrink-0 w-56 md:w-64 snap-start">
            <div className="relative overflow-hidden bg-charcoal-900 border border-white/5" style={{ aspectRatio: '3/4' }}>
              {src ? (
                <img src={src} alt={caption} loading="lazy" className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <ImageIcon size={24} className="text-charcoal-700" />
                  <p className="text-[9px] tracking-[0.2em] uppercase text-charcoal-600 font-medium">Photo</p>
                </div>
              )}
            </div>
            {caption && (
              <figcaption className="text-[10px] text-charcoal-500 tracking-wider mt-2 leading-snug">
                {caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  )
}

function ImagePlaceholder({ caption }: { caption: string }) {
  return (
    <figure className="my-10 -mx-4 md:mx-0">
      <div className="relative overflow-hidden bg-charcoal-900 border border-white/5 flex flex-col items-center justify-center gap-3" style={{ aspectRatio: '16/9', minHeight: '320px' }}>
        <ImageIcon size={32} className="text-charcoal-700" />
        <p className="text-[10px] tracking-[0.25em] uppercase text-charcoal-600 font-medium">Image placeholder</p>
      </div>
      <figcaption className="text-[11px] text-charcoal-500 tracking-wider mt-3 px-4 md:px-0">
        {caption}
      </figcaption>
    </figure>
  )
}

function BarChart({ title, bars, footnote }: { title: string; bars: { label: string; value: number }[]; footnote?: string }) {
  const max = Math.max(...bars.map((b) => b.value), 1)
  return (
    <div className="my-10 border border-white/10 bg-white/[0.02] p-6 md:p-8">
      <p className="text-[11px] tracking-[0.25em] text-gold-500 font-medium mb-6">{title.replace(/[a-z]/g, (c) => c.toUpperCase())}</p>
      <div className="flex flex-col gap-5">
        {bars.map(({ label, value }, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="w-24 flex-shrink-0 text-[12px] text-charcoal-400 text-right leading-tight">{label}</span>
            <div className="flex-1 flex items-center gap-3">
              <div className="flex-1 bg-white/5 h-8 relative overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gold-500 transition-all duration-700"
                  style={{ width: `${(value / max) * 100}%`, opacity: i === 0 ? 1 : 0.45 }}
                />
              </div>
              <span className="text-sm font-semibold text-charcoal-200 w-10 flex-shrink-0">{value}%</span>
            </div>
          </div>
        ))}
      </div>
      {footnote && (
        <p className="text-[13px] text-charcoal-400 mt-5 leading-relaxed">{renderInline(footnote)}</p>
      )}
    </div>
  )
}

function LineChart({
  title,
  xLabel,
  yLabel,
  series,
  points,
  footnote,
}: {
  title: string
  xLabel?: string
  yLabel?: string
  series: string[]
  points: { x: string; values: number[] }[]
  footnote?: string
}) {
  const COLORS = ['#D9B655', '#7E97B8', '#C98F8F', '#8FB8A0']
  const [hover, setHover] = useState<number | null>(null)
  const [hidden, setHidden] = useState<Set<number>>(new Set())

  const toggle = (i: number) =>
    setHidden((prev) => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })

  // Geometry
  const W = 720, H = 420
  const padL = 56, padR = 22, padT = 28, padB = 64
  const plotW = W - padL - padR
  const plotH = H - padT - padB
  const baseY = padT + plotH
  const yMax = 100
  const yTicks = [0, 20, 40, 60, 80, 100]
  const n = points.length
  const xAt = (i: number) => padL + (n === 1 ? plotW / 2 : (plotW * i) / (n - 1))
  const yAt = (v: number) => baseY - (Math.max(0, Math.min(v, yMax)) / yMax) * plotH

  return (
    <div className="my-10 border border-white/10 bg-white/[0.02] p-6 md:p-8">
      <p className="text-[11px] tracking-[0.25em] text-gold-500 font-medium mb-1">
        {title.replace(/[a-z]/g, (c) => c.toUpperCase())}
      </p>
      {/* Legend (interactive: click to toggle a series) */}
      <div className="flex flex-wrap gap-3 mt-3 mb-2">
        {series.map((name, si) => {
          const off = hidden.has(si)
          return (
            <button
              key={si}
              onClick={() => toggle(si)}
              className={`flex items-center gap-2 text-[11px] tracking-wide px-2.5 py-1 border transition-colors ${
                off ? 'border-white/10 text-charcoal-600' : 'border-white/20 text-charcoal-200 hover:border-white/40'
              }`}
            >
              <span
                className="inline-block w-3 h-3 rounded-sm"
                style={{ background: off ? 'transparent' : COLORS[si % COLORS.length], border: `1.5px solid ${COLORS[si % COLORS.length]}` }}
              />
              {name}
            </button>
          )
        })}
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        style={{ height: 'auto', display: 'block', touchAction: 'pan-y' }}
        onMouseLeave={() => setHover(null)}
      >
        {/* y gridlines + ticks */}
        {yTicks.map((t) => {
          const y = yAt(t)
          return (
            <g key={t}>
              <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
              <text x={padL - 10} y={y + 4} textAnchor="end" fontSize={12} fill="#7C7468" fontFamily="Inter,Arial,sans-serif">{t}</text>
            </g>
          )
        })}
        {/* axis labels */}
        {yLabel && (
          <text transform={`translate(16,${padT + plotH / 2}) rotate(-90)`} textAnchor="middle" fontSize={12.5} fill="#9a9488" fontFamily="Inter,Arial,sans-serif">{yLabel}</text>
        )}
        {xLabel && (
          <text x={padL + plotW / 2} y={H - 12} textAnchor="middle" fontSize={12.5} fill="#9a9488" fontFamily="Inter,Arial,sans-serif">{xLabel}</text>
        )}
        {/* x tick labels */}
        {points.map((p, i) => (
          <text key={i} x={xAt(i)} y={baseY + 22} textAnchor="middle" fontSize={12} fill="#9a9488" fontFamily="Inter,Arial,sans-serif">{p.x}</text>
        ))}
        {/* baseline */}
        <line x1={padL} y1={baseY} x2={W - padR} y2={baseY} stroke="rgba(255,255,255,0.25)" strokeWidth={1.5} />
        {/* hover guide */}
        {hover !== null && (
          <line x1={xAt(hover)} y1={padT} x2={xAt(hover)} y2={baseY} stroke="rgba(217,182,85,0.5)" strokeWidth={1} strokeDasharray="4 4" />
        )}
        {/* series lines + points */}
        {series.map((_, si) => {
          if (hidden.has(si)) return null
          const color = COLORS[si % COLORS.length]
          const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${xAt(i)} ${yAt(p.values[si])}`).join(' ')
          return (
            <g key={si}>
              <path d={d} fill="none" stroke={color} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
              {points.map((p, i) => (
                <circle key={i} cx={xAt(i)} cy={yAt(p.values[si])} r={hover === i ? 5.5 : 3.5} fill={color} stroke="#0d0d0d" strokeWidth={1} />
              ))}
            </g>
          )
        })}
        {/* hover capture bands */}
        {points.map((_, i) => {
          const bandW = plotW / Math.max(1, n - 1)
          return (
            <rect
              key={i}
              x={xAt(i) - bandW / 2}
              y={padT}
              width={bandW}
              height={plotH}
              fill="transparent"
              onMouseEnter={() => setHover(i)}
              onTouchStart={() => setHover(i)}
            />
          )
        })}
        {/* tooltip */}
        {hover !== null && (() => {
          const p = points[hover]
          const visible = series.map((name, si) => ({ name, si })).filter(({ si }) => !hidden.has(si))
          const boxW = 150, lineH = 18, boxH = 26 + visible.length * lineH
          const left = xAt(hover) > padL + plotW / 2
          const bx = left ? xAt(hover) - boxW - 12 : xAt(hover) + 12
          const by = padT + 6
          return (
            <g pointerEvents="none">
              <rect x={bx} y={by} width={boxW} height={boxH} rx={5} fill="#15140f" stroke="rgba(217,182,85,0.4)" strokeWidth={1} />
              <text x={bx + 12} y={by + 18} fontSize={12} fill="#cfc6b6" fontFamily="Inter,Arial,sans-serif">{xLabel ? `${p.x} µM` : p.x}</text>
              {visible.map(({ name, si }, k) => (
                <g key={si}>
                  <rect x={bx + 12} y={by + 26 + k * lineH + 1} width={9} height={9} rx={1.5} fill={COLORS[si % COLORS.length]} />
                  <text x={bx + 27} y={by + 26 + k * lineH + 9} fontSize={12} fill="#e6e1d6" fontFamily="Inter,Arial,sans-serif">{name}: {p.values[si]}%</text>
                </g>
              ))}
            </g>
          )
        })()}
      </svg>
      {footnote && (
        <p className="text-[13px] text-charcoal-400 mt-5 leading-relaxed">{renderInline(footnote)}</p>
      )}
    </div>
  )
}

function SplitTable({ left, right }: { left: { heading: string; items: string[] }; right: { heading: string; items: string[] } }) {
  return (
    <div className="my-8 grid grid-cols-1 sm:grid-cols-2 gap-0 border border-white/10 overflow-hidden">
      {[left, right].map((col, ci) => (
        <div key={ci} className={`p-5 ${ci === 0 ? 'border-b sm:border-b-0 sm:border-r border-white/10' : ''}`}>
          <p className={`text-[10px] tracking-[0.25em] uppercase font-semibold mb-4 ${ci === 0 ? 'text-gold-500' : 'text-charcoal-500'}`}>
            {col.heading}
          </p>
          <ul className="flex flex-col gap-3">
            {col.items.map((item, ii) => (
              <li key={ii} className="flex gap-2.5 text-sm text-charcoal-300 leading-relaxed">
                <span className={`flex-shrink-0 mt-1.5 w-1 h-1 rounded-full ${ci === 0 ? 'bg-gold-500' : 'bg-charcoal-600'}`} />
                {renderInline(item)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function CaseStudySeparator() {
  return (
    <div className="my-10 flex items-center gap-4">
      <div className="flex-1 h-px bg-white/10" />
      <p className="text-[9px] tracking-[0.3em] uppercase text-gold-500/60 font-semibold flex-shrink-0 px-2">Client Case Study</p>
      <div className="flex-1 h-px bg-white/10" />
    </div>
  )
}

function ReferenceBox({ items }: { items: string[] }) {
  return (
    <div className="mt-12 border border-white/10 p-6">
      <p className="text-[10px] tracking-[0.3em] uppercase text-gold-500 font-semibold mb-4">References &amp; Sources</p>
      <ol className="flex flex-col gap-3">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-[12px] text-charcoal-500 leading-relaxed">
            <span className="flex-shrink-0 text-gold-500/50 font-medium w-4">{i + 1}.</span>
            <span>{renderInline(item)}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function CascadeList({ items }: { items: string[] }) {
  return (
    <div className="my-8 flex flex-col">
      {items.map((item, i) => (
        <div key={i} className="flex gap-0">
          {/* Left gutter: connector line + dot */}
          <div className="flex flex-col items-center" style={{ width: `${20 + i * 20}px`, flexShrink: 0 }}>
            <div className={`w-2 h-2 rounded-full border-2 flex-shrink-0 ${i === items.length - 1 ? 'bg-gold-500 border-gold-500' : 'border-gold-500/50 bg-transparent'}`} />
            <div className="w-px flex-1 bg-gold-500/20" />
          </div>
          {/* Content */}
          <div className={`pb-6 pt-0.5 pl-4 flex-1 ${i === items.length - 1 ? 'pb-0' : ''}`}>
            {i === 0 && (
              <p className="text-[9px] tracking-[0.25em] uppercase font-semibold mb-1.5" style={{ color: 'rgba(201,168,76,0.75)' }}>Scalp environment support | NV-273</p>
            )}
            {i === 1 && (
              <p className="text-[9px] tracking-[0.25em] uppercase font-semibold mb-1.5" style={{ color: 'rgba(201,168,76,0.75)' }}>DHT-related stress modulation | NV-1065</p>
            )}
            {i === items.length - 1 && i > 1 && (
              <p className="text-[9px] tracking-[0.25em] uppercase font-semibold mb-1.5" style={{ color: 'rgba(201,168,76,0.75)' }}>Follicle cell support | NV-623 + NV-624</p>
            )}
            <p className="text-base md:text-[17px] leading-[1.8] text-charcoal-300">
              {renderInline(item)}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

function CardGrid({ cards }: { cards: { title: string; tag?: string; body: string }[] }) {
  return (
    <div className="my-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className="group relative border border-white/10 p-5 transition-all duration-300 hover:border-gold-500/60 hover:bg-white/[0.03] hover:-translate-y-0.5"
        >
          <div className="flex items-center gap-3 mb-2.5">
            <span className="flex-shrink-0 w-7 h-7 bg-gold-500 text-black text-[11px] font-bold flex items-center justify-center">
              {i + 1}
            </span>
            <h4 className="text-charcoal-100 font-semibold text-[15px] leading-tight">{card.title}</h4>
          </div>
          {card.tag && (
            <p className="text-[9px] tracking-[0.2em] uppercase text-gold-500/80 font-semibold mb-2.5">{card.tag}</p>
          )}
          <p className="text-charcoal-300 text-sm md:text-[15px] leading-[1.7]">{renderInline(card.body)}</p>
        </div>
      ))}
    </div>
  )
}

const formulaRows = [
  { col1: 'Wella Koleston Perfect', col2: '7/43: Medium Blonde Red-Gold', col3: '50g' },
  { col1: 'Wella Koleston Perfect', col2: '8/43: Light Blonde Red-Gold', col3: '20g' },
  { col1: 'Developer', col2: '6% (20 vol)', col3: '70ml' },
  { col1: 'Processing Time', col2: '35 minutes, no heat', col3: '' },
]

function renderInline(text: string): React.ReactNode[] {
  const pattern = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`|==(.+?)==|~~(.+?)~~|\[([^\]]+)\]\(([^)]+)\))/g
  const nodes: React.ReactNode[] = []
  let cursor = 0
  let match: RegExpExecArray | null
  let key = 0
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) nodes.push(text.slice(cursor, match.index))
    if (match[2]) nodes.push(<strong key={key++} className="text-charcoal-100 font-semibold">{match[2]}</strong>)
    else if (match[3]) nodes.push(<em key={key++}>{match[3]}</em>)
    else if (match[4]) nodes.push(<code key={key++} className="text-[0.9em] bg-white/10 px-1 rounded font-mono">{match[4]}</code>)
    else if (match[5]) nodes.push(<mark key={key++} className="bg-gold-500 text-black font-semibold px-0.5 rounded-sm not-italic">{match[5]}</mark>)
    else if (match[6]) nodes.push(<span key={key++} className="text-gold-500">{match[6]}</span>)
    else if (match[7]) nodes.push(<a key={key++} href={match[8] ?? '#'} className="text-gold-500 hover:underline" target="_blank" rel="noopener noreferrer">{match[7]}</a>)
    cursor = match.index + match[0].length
  }
  if (cursor < text.length) nodes.push(text.slice(cursor))
  return nodes
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

type ClinicalStat = { label: string; foot?: string; text?: string; value?: number; decimals?: number; prefix?: string; suffix?: string }
type ClinicalTab = { key: string; label: string; note: string; stats: ClinicalStat[] }

const clinicalTabs: ClinicalTab[] = [
  {
    key: 'measured',
    label: 'Measured Improvements',
    note: 'Objective lab measurements after 90 days',
    stats: [
      { value: 70, prefix: '+', suffix: '%', label: 'Increase in hair thickness' },
      { value: 58, prefix: '−', suffix: '%', label: 'Decrease in hair loss', foot: '26% better than minoxidil' },
      { value: 19, prefix: '+', suffix: '%', label: 'Increase in hair density' },
    ],
  },
  {
    key: 'reported',
    label: 'What Participants Noticed',
    note: 'Self-reported by participants after 90 days',
    stats: [
      { value: 90, suffix: '%', label: 'Saw thicker hair after just 90 days' },
      { value: 1.7, decimals: 1, suffix: 'x', label: 'Greater improvement in thinning than minoxidil' },
      { value: 3, suffix: 'x', label: 'Higher overall satisfaction vs. baseline' },
      { value: 86, suffix: '%', label: 'Saw new growth where the serum was applied' },
    ],
  },
  {
    key: 'design',
    label: 'Study Design',
    note: 'How the trial was run',
    stats: [
      { value: 190, label: 'Participants', foot: 'Women with visible thinning, Ludwig I-3 to II-2' },
      { value: 3, suffix: ' mo', label: 'Daily use', foot: 'Machine and expert assessments' },
      { text: 'Double-blind', label: 'Neither participants nor evaluators knew the product' },
      { text: 'vs. Minoxidil', label: 'Compared to the gold standard, not placebo' },
    ],
  },
]

function CountUpStat({ value, decimals = 0, prefix = '', suffix = '' }: { value: number; decimals?: number; prefix?: string; suffix?: string }) {
  // Initialise to the final value so SSR and the first client render match (hydration-safe),
  // then animate up from zero after mount.
  const [display, setDisplay] = useState(value)
  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const dur = 900
    const step = (t: number) => {
      const p = Math.min((t - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(value * eased)
      if (p < 1) raf = requestAnimationFrame(step)
      else setDisplay(value)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [value])
  return <>{prefix}{display.toFixed(decimals)}{suffix}</>
}

function ClinicalTrialInterim() {
  const [active, setActive] = useState(0)
  const tab = clinicalTabs[active]
  // 4-stat tabs (Participants, Study Design) render 2 x 2; the 3-stat tab stays 3-up.
  const gridCols = tab.stats.length === 4 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3'
  return (
    <div className="my-12 border border-gold-500/25 bg-white/[0.02]">
      <div className="px-6 pt-6 md:px-8 md:pt-7">
        <p className="text-[9px] tracking-[0.3em] uppercase text-gold-500 font-semibold mb-2">3-Month Interim Clinical Data</p>
        <p className="text-sm text-charcoal-400 leading-relaxed">{tab.note}.</p>
      </div>
      <div className="flex gap-2 overflow-x-auto px-6 md:px-8 mt-5 pb-1 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
        {clinicalTabs.map((t, i) => (
          <button
            key={t.key}
            onClick={() => setActive(i)}
            className={`flex-shrink-0 text-[11px] tracking-wide px-3 py-1.5 border transition-colors ${
              i === active
                ? 'border-gold-500 text-gold-500 bg-gold-500/10'
                : 'border-white/10 text-charcoal-400 hover:text-white hover:border-white/30'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className={`grid ${gridCols} gap-px bg-white/5 mt-5 border-t border-white/5`}>
        {tab.stats.map((s, j) => (
          <div key={j} className="bg-charcoal-950 p-5 md:p-6 flex flex-col gap-1.5">
            <div className="text-3xl md:text-4xl font-bold text-gold-500 leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
              {s.text != null
                ? s.text
                : <CountUpStat value={s.value ?? 0} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />}
            </div>
            <p className="text-xs text-charcoal-300 leading-snug">{s.label}</p>
            {s.foot ? <p className="text-[10px] text-charcoal-500 tracking-wide">{s.foot}</p> : null}
          </div>
        ))}
      </div>
      <div className="px-6 py-4 md:px-8 border-t border-white/5 flex items-center justify-between gap-3 flex-wrap">
        <p className="text-[10px] text-charcoal-500 tracking-wide">Interim readout of an ongoing double-blind study vs. minoxidil.</p>
        <a href="https://getreyou.com/pages/science" target="_blank" rel="noopener noreferrer" className="text-[11px] tracking-widest uppercase text-gold-500 hover:underline whitespace-nowrap">
          See the full study →
        </a>
      </div>
    </div>
  )
}

function MarkdownBody({ body }: { body: string }) {
  // Pre-process: extract :::quote-carousel blocks before splitting on double newlines
  const carouselPlaceholders: { quotes: { text: string; attribution?: string }[] }[] = []
  const imageRowPlaceholders: { images: { src: string; caption: string }[] }[] = []
  const barChartPlaceholders: { title: string; bars: { label: string; value: number }[]; footnote?: string }[] = []
  const lineChartPlaceholders: { title: string; xLabel?: string; yLabel?: string; series: string[]; points: { x: string; values: number[] }[]; footnote?: string }[] = []
  const cascadePlaceholders: { items: string[] }[] = []
  let processedBody = body.replace(
    /:::cascade-list\n([\s\S]*?):::/g,
    (_match, inner: string) => {
      const items = inner.trim().split('\n').filter((l) => l.trim().startsWith('- ')).map((l) => l.replace(/^-\s+/, '').trim())
      const id = cascadePlaceholders.length
      cascadePlaceholders.push({ items })
      return `CASCADE_LIST_PLACEHOLDER_${id}`
    }
  )
  processedBody = processedBody.replace(
    /:::bar-chart\n([\s\S]*?):::/g,
    (_match, inner: string) => {
      const lines = inner.trim().split('\n').filter(Boolean)
      const titleLine = lines.find((l) => l.startsWith('title:'))
      const title = titleLine ? titleLine.replace(/^title:\s*/, '') : ''
      const footnoteLine = lines.find((l) => l.startsWith('footnote:'))
      const footnote = footnoteLine ? footnoteLine.replace(/^footnote:\s*/, '') : undefined
      const bars = lines
        .filter((l) => l.startsWith('- '))
        .map((l) => {
          const m = l.match(/^-\s+(.+?)\s*:\s*(\d+)$/)
          return m ? { label: m[1], value: parseInt(m[2]) } : null
        })
        .filter(Boolean) as { label: string; value: number }[]
      const id = barChartPlaceholders.length
      barChartPlaceholders.push({ title, bars, footnote })
      return `BARCHART_PLACEHOLDER_${id}`
    }
  )
  processedBody = processedBody.replace(
    /:::line-chart\n([\s\S]*?):::/g,
    (_match, inner: string) => {
      const lines = inner.trim().split('\n').filter(Boolean)
      const grab = (key: string) => {
        const l = lines.find((x) => x.startsWith(`${key}:`))
        return l ? l.replace(new RegExp(`^${key}:\\s*`), '').trim() : undefined
      }
      const title = grab('title') ?? ''
      const xLabel = grab('x-label')
      const yLabel = grab('y-label')
      const footnote = grab('footnote')
      const series = lines
        .filter((l) => l.startsWith('series:'))
        .map((l) => l.replace(/^series:\s*/, '').trim())
      const points = lines
        .filter((l) => l.startsWith('- '))
        .map((l) => {
          const m = l.match(/^-\s+(.+?)\s*:\s*(.+)$/)
          if (!m) return null
          return { x: m[1].trim(), values: m[2].split(',').map((v) => parseFloat(v.trim())) }
        })
        .filter(Boolean) as { x: string; values: number[] }[]
      const id = lineChartPlaceholders.length
      lineChartPlaceholders.push({ title, xLabel, yLabel, series, points, footnote })
      return `LINECHART_PLACEHOLDER_${id}`
    }
  )
  processedBody = processedBody.replace(
    /:::image-row\n([\s\S]*?):::/g,
    (_match, inner: string) => {
      const lines = inner.trim().split('\n').filter(Boolean)
      const images = lines.map((line) => {
        const m = line.match(/^!\[([^\]]*)\]\(([^)]*)\)$/)
        if (m) return { caption: m[1], src: m[2] }
        return { caption: line, src: '' }
      })
      const id = imageRowPlaceholders.length
      imageRowPlaceholders.push({ images })
      return `IMAGEROW_PLACEHOLDER_${id}`
    }
  )
  processedBody = processedBody.replace(
    /:::quote-carousel\n([\s\S]*?):::/g,
    (_match, inner: string) => {
      const quoteBlocks = inner.trim().split(/\n---\n/)
      const quotes = quoteBlocks.map((block) => {
        const lines = block.trim().split('\n')
        const attrIndex = lines.findIndex((l) => l.startsWith('— '))
        const text = (attrIndex > -1 ? lines.slice(0, attrIndex) : lines).join(' ').replace(/^> /, '').trim()
        const attribution = attrIndex > -1 ? lines[attrIndex].replace(/^— /, '').trim() : undefined
        return { text, attribution }
      })
      const id = carouselPlaceholders.length
      carouselPlaceholders.push({ quotes })
      return `CAROUSEL_PLACEHOLDER_${id}`
    }
  )
  const splitTablePlaceholders: { left: { heading: string; items: string[] }; right: { heading: string; items: string[] } }[] = []
  processedBody = processedBody.replace(
    /:::split-table\n([\s\S]*?):::/g,
    (_match, inner: string) => {
      const lines = inner.trim().split('\n')
      let leftHeading = '', rightHeading = ''
      const leftItems: string[] = [], rightItems: string[] = []
      let section: 'left' | 'right' | null = null
      for (const line of lines) {
        const lh = line.match(/^left-heading:\s*(.+)$/)
        const rh = line.match(/^right-heading:\s*(.+)$/)
        if (lh) { leftHeading = lh[1]; section = 'left'; continue }
        if (rh) { rightHeading = rh[1]; section = 'right'; continue }
        if (line.trim().startsWith('- ') && section === 'left') leftItems.push(line.replace(/^-\s+/, '').trim())
        if (line.trim().startsWith('- ') && section === 'right') rightItems.push(line.replace(/^-\s+/, '').trim())
      }
      const id = splitTablePlaceholders.length
      splitTablePlaceholders.push({ left: { heading: leftHeading, items: leftItems }, right: { heading: rightHeading, items: rightItems } })
      return `SPLIT_TABLE_PLACEHOLDER_${id}`
    }
  )
  const referencePlaceholders: { items: string[] }[] = []
  processedBody = processedBody.replace(
    /:::references\n([\s\S]*?):::/g,
    (_match, inner: string) => {
      const items = inner.trim().split('\n').filter((l) => l.trim().startsWith('- ')).map((l) => l.replace(/^-\s+/, '').trim())
      const id = referencePlaceholders.length
      referencePlaceholders.push({ items })
      return `REFERENCES_PLACEHOLDER_${id}`
    }
  )
  const cardGridPlaceholders: { cards: { title: string; tag?: string; body: string }[] }[] = []
  processedBody = processedBody.replace(
    /:::card-grid\n([\s\S]*?):::/g,
    (_match, inner: string) => {
      const cardBlocks = inner.trim().split(/\n---\n/)
      const cards = cardBlocks.map((block) => {
        const lines = block.trim().split('\n')
        let title = '', tag: string | undefined
        const bodyLines: string[] = []
        for (const line of lines) {
          const t = line.match(/^title:\s*(.+)$/)
          const g = line.match(/^tag:\s*(.+)$/)
          if (t) { title = t[1].trim(); continue }
          if (g) { tag = g[1].trim(); continue }
          bodyLines.push(line)
        }
        return { title, tag, body: bodyLines.join(' ').trim() }
      })
      const id = cardGridPlaceholders.length
      cardGridPlaceholders.push({ cards })
      return `CARD_GRID_PLACEHOLDER_${id}`
    }
  )
  processedBody = processedBody.replace(/:::case-study-separator:::/g, 'CASE_STUDY_SEPARATOR')
  processedBody = processedBody.replace(/:::clinical-trial:::/g, 'CLINICAL_TRIAL')

  const blocks = processedBody.split(/\n\n+/)
  return (
    <article className="max-w-2xl">
      {blocks.map((block, i) => {
        const trimmed = block.trim()
        if (!trimmed) return null

        if (trimmed === 'CASE_STUDY_SEPARATOR') return <CaseStudySeparator key={i} />
        if (trimmed === 'CLINICAL_TRIAL') return <ClinicalTrialInterim key={i} />

        const refMatch = trimmed.match(/^REFERENCES_PLACEHOLDER_(\d+)$/)
        if (refMatch) {
          const rp = referencePlaceholders[parseInt(refMatch[1])]
          return <ReferenceBox key={i} items={rp.items} />
        }

        // Bar chart placeholder
        const barChartMatch = trimmed.match(/^BARCHART_PLACEHOLDER_(\d+)$/)
        if (barChartMatch) {
          const bp = barChartPlaceholders[parseInt(barChartMatch[1])]
          return <BarChart key={i} title={bp.title} bars={bp.bars} footnote={bp.footnote} />
        }

        // Line chart placeholder
        const lineChartMatch = trimmed.match(/^LINECHART_PLACEHOLDER_(\d+)$/)
        if (lineChartMatch) {
          const lp = lineChartPlaceholders[parseInt(lineChartMatch[1])]
          return <LineChart key={i} title={lp.title} xLabel={lp.xLabel} yLabel={lp.yLabel} series={lp.series} points={lp.points} footnote={lp.footnote} />
        }

        // Split table placeholder
        const splitTableMatch = trimmed.match(/^SPLIT_TABLE_PLACEHOLDER_(\d+)$/)
        if (splitTableMatch) {
          const st = splitTablePlaceholders[parseInt(splitTableMatch[1])]
          return <SplitTable key={i} left={st.left} right={st.right} />
        }

        // Quote carousel placeholder
        const carouselMatch = trimmed.match(/^CAROUSEL_PLACEHOLDER_(\d+)$/)
        if (carouselMatch) {
          const cp = carouselPlaceholders[parseInt(carouselMatch[1])]
          return <QuoteCarousel key={i} quotes={cp.quotes} />
        }

        // Image row placeholder
        const imageRowMatch = trimmed.match(/^IMAGEROW_PLACEHOLDER_(\d+)$/)
        if (imageRowMatch) {
          const rp = imageRowPlaceholders[parseInt(imageRowMatch[1])]
          return <ImageRow key={i} images={rp.images} />
        }

        // Cascade list placeholder
        const cascadeMatch = trimmed.match(/^CASCADE_LIST_PLACEHOLDER_(\d+)$/)
        if (cascadeMatch) {
          const cl = cascadePlaceholders[parseInt(cascadeMatch[1])]
          return <CascadeList key={i} items={cl.items} />
        }

        // Card grid placeholder
        const cardGridMatch = trimmed.match(/^CARD_GRID_PLACEHOLDER_(\d+)$/)
        if (cardGridMatch) {
          const cg = cardGridPlaceholders[parseInt(cardGridMatch[1])]
          return <CardGrid key={i} cards={cg.cards} />
        }

        const cta = trimmed.match(/^(\*\*CTA:\*\*|CTA:)\s*(.+)$/s)
        if (cta) return <CtaCallout key={i}>{renderInline(cta[2])}</CtaCallout>
        const h2 = trimmed.match(/^## (.+)/)
        if (h2) return <SectionHeading key={i} id={slugify(h2[1])}>{h2[1]}</SectionHeading>
        // inline image: ![caption](url) or ![caption|full](url) — empty url becomes a placeholder
        const img = trimmed.match(/^!\[([^\]]*)\]\(([^)]*)\)$/)
        if (img) {
          const full = img[1].endsWith('|full')
          const caption = full ? img[1].slice(0, -5) : img[1]
          if (!img[2]) return <ImagePlaceholder key={i} caption={caption} />
          return <InlineImage key={i} src={img[2]} caption={caption} full={full} />
        }
        const h3 = trimmed.match(/^### (.+)/)
        if (h3) return <Subheading key={i} id={slugify(h3[1])}>{h3[1]}</Subheading>
        const h4 = trimmed.match(/^#### (.+)/)
        if (h4) return <MinorHeading key={i} id={slugify(h4[1])}>{h4[1]}</MinorHeading>
        const h1 = trimmed.match(/^# (.+)/)
        if (h1) return <SectionHeading key={i} id={slugify(h1[1])}>{h1[1]}</SectionHeading>
        // bullet list
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const items = trimmed.split('\n').filter((l) => l.trim().startsWith('- ') || l.trim().startsWith('* '))
          return (
            <ul key={i} className="list-disc list-inside text-charcoal-300 text-base md:text-[17px] leading-[1.85] mb-5 space-y-1 pl-2">
              {items.map((item, j) => <li key={j}>{renderInline(item.replace(/^[-*]\s+/, ''))}</li>)}
            </ul>
          )
        }
        // numbered list
        if (/^\d+\.\s/.test(trimmed)) {
          const items = trimmed.split('\n').filter((l) => /^\d+\.\s/.test(l.trim()))
          return (
            <div key={i} className="my-6 flex flex-col gap-3">
              {items.map((item, j) => (
                <div key={j} className="flex gap-4">
                  <div className="flex-shrink-0 w-7 h-7 bg-gold-500 flex items-center justify-center text-black text-[11px] font-bold">
                    {j + 1}
                  </div>
                  <p className="text-charcoal-300 text-base md:text-[17px] leading-[1.85] pt-0.5">
                    {renderInline(item.replace(/^\d+\.\s+/, ''))}
                  </p>
                </div>
              ))}
            </div>
          )
        }
        // markdown table: lines starting with |
        if (trimmed.startsWith('|')) {
          const rows = trimmed.split('\n').filter((l) => l.trim().startsWith('|'))
          const parsed = rows.map((r) =>
            r.split('|').slice(1, -1).map((c) => c.trim())
          )
          const isSep = (row: string[]) => row.every((c) => /^[-: ]+$/.test(c))
          const headerRow = parsed[0]
          const bodyRows = parsed.slice(1).filter((r) => !isSep(r))
          return (
            <div key={i} className="my-8 border border-white/10">
              {/* Mobile: stacked cards */}
              <div className="md:hidden divide-y divide-white/5">
                {bodyRows.map((row, ri) => (
                  <div key={ri} className="p-4 flex flex-col gap-3">
                    {row.map((cell, ci) => cell ? (
                      <div key={ci}>
                        <p className="text-[9px] tracking-[0.25em] uppercase text-gold-500/70 font-medium mb-1">{headerRow[ci]}</p>
                        <p className="text-sm text-charcoal-300 leading-relaxed">{renderInline(cell)}</p>
                      </div>
                    ) : null)}
                  </div>
                ))}
              </div>
              {/* Desktop: regular table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-white/[0.04] border-b border-white/10">
                      {headerRow.map((cell, j) => (
                        <th key={j} className="text-left px-4 py-3 text-[10px] tracking-widest uppercase text-gold-500 font-medium">
                          {cell}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {bodyRows.map((row, ri) => (
                      <tr key={ri} className="hover:bg-white/[0.02]">
                        {row.map((cell, ci) => (
                          <td key={ci} className="px-4 py-3 text-charcoal-300 align-top">
                            {renderInline(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        }
        // blockquote
        if (trimmed.startsWith('> ')) {
          const lines = trimmed.split('\n').map((l) => l.replace(/^> /, ''))
          const attrIndex = lines.findIndex((l) => l.startsWith('— '))
          const quote = (attrIndex > -1 ? lines.slice(0, attrIndex) : lines).join(' ')
          const attribution = attrIndex > -1 ? lines[attrIndex].replace(/^— /, '') : null
          return (
            <div key={i} className="my-10 border-l-4 border-gold-500 pl-6 md:pl-8 py-2">
              <Quote size={24} className="text-gold-500/40 mb-3" />
              <p className="text-xl md:text-2xl text-white font-medium leading-snug italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                {quote}
              </p>
              {attribution && (
                <p className="text-[11px] tracking-widest uppercase text-gold-500 mt-4 font-medium">— {attribution}</p>
              )}
            </div>
          )
        }
        return <p key={i} className="text-charcoal-300 text-base md:text-[17px] leading-[1.85] mb-5">{renderInline(trimmed)}</p>
      })}
    </article>
  )
}

export default function ArticleBody({ article }: { article: Article }) {
  // If the article has generated body content, render it with the markdown renderer
  if (article.body) {
    return <MarkdownBody body={article.body} />
  }
  // Fallback: copper article static content
  return <CopperArticleBody />
}

function CopperArticleBody() {
  return (
    <article className="max-w-2xl">
      {/* Drop cap opening */}
      <p
        className="text-charcoal-300 text-base md:text-[17px] leading-[1.85] mb-5"
        style={{ position: 'relative' }}
      >
        <span
          className="float-left text-[5.5rem] font-bold text-gold-500 leading-[0.8] mr-3 mt-2 select-none"
          style={{ fontFamily: "'Playfair Display', serif" }}
          aria-hidden="true"
        >
          C
        </span>
        opper hair isn't new, but what's happening to it right now is. This isn't the brassy, over-processed
        orange of 2008. The 2026 version is something altogether more intentional: warm, dimensional, deeply
        saturated at the root and feathered into molten gold at the ends. It reads editorial in the chair and
        natural in the street.
      </p>

      <Paragraph>
        The shift started quietly. A handful of top colorists posting client work featuring cognac, auburn,
        and spiced-peach blends. Then brands started pushing copper-adjacent shades in their new collections.
        By February 2026, search trends for "copper balayage" and "rust hair" had tripled year-over-year.
        Now every client wants it, and the good stylists are already fluent in it.
      </Paragraph>

      <PullQuote
        quote="Copper is the perfect intersection of wearable and editorial. It works on every skin tone if you understand undertones."
        attribution="Lucia Vargas, Celebrity Colorist, Los Angeles"
      />

      <SectionHeading id="why-copper-works">Why Copper Works on Every Client</SectionHeading>

      <Paragraph>
        The genius of the copper family is its versatility. Unlike cool-toned blondes or pure blacks, copper
        tones have warm undertones that complement nearly every complexion, they just need to be calibrated
        correctly. A client with cool undertones wears a deeper, more muted auburn. Warm undertones? Push
        toward the bright, almost electric cognac. Neutral? The classic 7/43-based formula lands perfectly.
      </Paragraph>

      <Paragraph>
        This is something colorist Marcus Bell has been
        preaching for years from his London studio. "I've never had a client walk out unhappy with a copper
        that was chosen for them but not applied to them," he says. "The consultation is everything. We're
        looking at skin, eye color, even their wardrobe. Copper is a system, not a formula."
      </Paragraph>

      <TipBox title="Read undertones before mixing">
        Check the inside of the wrist and the neck hairline. Blue veins = cool; green veins = warm; both =
        neutral. Use this to skew your copper warmer or cooler by adjusting the red-to-gold ratio.
      </TipBox>

      <InlineImage
        src={INLINE_IMAGE_1}
        caption="A warm cognac balayage by Marcus Bell, shot in natural light. Note the seamless melt from root shadow to mid-shaft copper."
      />

      <SectionHeading id="the-formula-breakdown">The Formula Breakdown</SectionHeading>

      <Paragraph>
        While every colorist adapts their formula to the client, a reliable starting base has emerged
        from the conversations we had with 10 professionals for this piece. Here is the foundation.
        Adjust developer strength based on existing hair condition:
      </Paragraph>

      {/* Formula table */}
      <div className="my-8 border border-white/10 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-white/[0.04] border-b border-white/10">
              <th className="text-left px-4 py-3 text-[10px] tracking-widest uppercase text-gold-500 font-medium">Product</th>
              <th className="text-left px-4 py-3 text-[10px] tracking-widest uppercase text-gold-500 font-medium">Shade</th>
              <th className="text-left px-4 py-3 text-[10px] tracking-widest uppercase text-gold-500 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {formulaRows.map((row, i) => (
              <tr key={i} className="hover:bg-white/[0.02]">
                <td className="px-4 py-3 text-charcoal-300">{row.col1}</td>
                <td className="px-4 py-3 text-charcoal-300">{row.col2}</td>
                <td className="px-4 py-3 text-charcoal-400">{row.col3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Subheading id="application-technique">Application Technique</Subheading>

      <Paragraph>
        The placement is what separates a dated copper from a current one. Forget uniform application.
        The modern approach is a hybrid: shadow root for depth, with freehand balayage panels through
        the mid-shaft and ends to create dimension and movement.
      </Paragraph>

      <StepList
        steps={[
          {
            step: 1,
            title: 'Shadow the root zone (0–3 inches)',
            body: 'Mix 1 part copper with 1 part a neutral brown one level darker than target. Apply directly to root zone with no foil. This creates a seamless, lived-in base.',
          },
          {
            step: 2,
            title: 'Freehand panels, mid-shaft to ends',
            body: 'Using a balayage board, saturate the backcombed mid-shaft sections with your main copper formula. Work diagonal-back sections for the most natural result.',
          },
          {
            step: 3,
            title: 'Foil highlights, optional brightness',
            body: 'On clients requesting maximum vibrancy, place 4–6 fine foils at the face-frame and part line. Use a one shade lighter copper formula here.',
          },
          {
            step: 4,
            title: 'Tone at the bowl',
            body: 'After rinsing, apply a clear or peach gloss for 10 minutes to close the cuticle and add mirror shine. This is non-negotiable for the glass-copper finish.',
          },
        ]}
      />

      <InlineImage
        src={INLINE_IMAGE_2}
        caption="The finished result: a copper balayage with glass-finish toning. Client: Zara T., photographed by Studio Lumen."
      />

      <SectionHeading id="selling-the-maintenance-story">Selling the Maintenance Story</SectionHeading>

      <Paragraph>
        Copper fades faster than cool tones, and that's actually a selling point if you frame it right.
        Colorist Dana Reeves has made copper her bread
        and butter by building a "copper journey" program at her Nashville suite. Clients book in every
        8 weeks, and between visits, they use a copper-depositing conditioner she retails.
      </Paragraph>

      <PullQuote
        quote="I don't sell copper as a color. I sell it as a season-long transformation. They leave the first appointment warm and bright. By the third, they're a rich, burnished auburn. Clients are addicted."
        attribution="Dana Reeves, Salon Business Coach, Nashville, TN"
      />

      <Paragraph>
        The retail angle alone can add $40–$80 per visit. Combined with the rebooking frequency copper
        naturally demands, this single color specialization has real revenue potential for working stylists.
      </Paragraph>

      <Paragraph>
        The bottom line: copper in 2026 is not a trend to chase. It's a skill to own. Learn the
        undertone system, build a signature formula, and position it as a premium service. Your clients
        are already asking for it. The stylists who master it this year will still be the go-to for it
        in 2030.
      </Paragraph>

      {/* Tags */}
      <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-2">
        {['Copper Color', 'Balayage', 'Color Formulas', 'Techniques', 'Trending', 'Business Strategy'].map((tag) => (
          <a
            key={tag}
            href="#"
            className="text-[10px] tracking-widest uppercase border border-white/10 text-charcoal-400 hover:border-gold-500 hover:text-gold-500 transition-colors px-3 py-1.5"
          >
            {tag}
          </a>
        ))}
      </div>
    </article>
  )
}

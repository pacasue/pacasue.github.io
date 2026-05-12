import type { Article } from '../../data/articles'
import { Quote, Sparkles } from 'lucide-react'

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

function InlineImage({ src, caption }: { src: string; caption: string }) {
  return (
    <figure className="my-10 -mx-4 md:mx-0">
      <div className="overflow-hidden aspect-[16/9]">
        <img src={src} alt={caption} className="w-full h-full object-cover" />
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

const formulaRows = [
  { col1: 'Wella Koleston Perfect', col2: '7/43 — Medium Blonde Red-Gold', col3: '50g' },
  { col1: 'Wella Koleston Perfect', col2: '8/43 — Light Blonde Red-Gold', col3: '20g' },
  { col1: 'Developer', col2: '6% (20 vol)', col3: '70ml' },
  { col1: 'Processing Time', col2: '35 minutes — no heat', col3: '—' },
]

function renderInline(text: string): React.ReactNode[] {
  const pattern = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`|\[([^\]]+)\]\([^)]+\))/g
  const nodes: React.ReactNode[] = []
  let cursor = 0
  let match: RegExpExecArray | null
  let key = 0
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) nodes.push(text.slice(cursor, match.index))
    if (match[2]) nodes.push(<strong key={key++} className="text-charcoal-100 font-semibold">{match[2]}</strong>)
    else if (match[3]) nodes.push(<em key={key++}>{match[3]}</em>)
    else if (match[4]) nodes.push(<code key={key++} className="text-[0.9em] bg-white/10 px-1 rounded font-mono">{match[4]}</code>)
    else if (match[5]) nodes.push(match[5])
    cursor = match.index + match[0].length
  }
  if (cursor < text.length) nodes.push(text.slice(cursor))
  return nodes
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function MarkdownBody({ body }: { body: string }) {
  const blocks = body.split(/\n\n+/)
  return (
    <article className="max-w-2xl">
      {blocks.map((block, i) => {
        const trimmed = block.trim()
        if (!trimmed) return null
        const cta = trimmed.match(/^(\*\*CTA:\*\*|CTA:)\s*(.+)$/s)
        if (cta) return <CtaCallout key={i}>{renderInline(cta[2])}</CtaCallout>
        const h2 = trimmed.match(/^## (.+)/)
        if (h2) return <SectionHeading key={i} id={slugify(h2[1])}>{h2[1]}</SectionHeading>
        // inline image: ![caption](url)
        const img = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
        if (img) return <InlineImage key={i} src={img[2]} caption={img[1]} />
        const h3 = trimmed.match(/^### (.+)/)
        if (h3) return <Subheading key={i} id={slugify(h3[1])}>{h3[1]}</Subheading>
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
          // second row is the separator (---|---), skip it
          const isSep = (row: string[]) => row.every((c) => /^[-: ]+$/.test(c))
          const headerRow = parsed[0]
          const bodyRows = parsed.slice(1).filter((r) => !isSep(r))
          return (
            <div key={i} className="my-8 border border-white/10 overflow-x-auto">
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
        opper hair isn't new — but what's happening to it right now is. This isn't the brassy, over-processed
        orange of 2008. The 2026 version is something altogether more intentional: warm, dimensional, deeply
        saturated at the root and feathered into molten gold at the ends. It reads editorial in the chair and
        natural in the street.
      </p>

      <Paragraph>
        The shift started quietly. A handful of top colorists posting client work featuring cognac, auburn,
        and spiced-peach blends. Then brands started pushing copper-adjacent shades in their new collections.
        By February 2026, search trends for "copper balayage" and "rust hair" had tripled year-over-year.
        Now every client wants it — and the good stylists are already fluent in it.
      </Paragraph>

      <PullQuote
        quote="Copper is the perfect intersection of wearable and editorial. It works on every skin tone if you understand undertones."
        attribution="Lucia Vargas, Celebrity Colorist — Los Angeles"
      />

      <SectionHeading id="why-copper-works">Why Copper Works on Every Client</SectionHeading>

      <Paragraph>
        The genius of the copper family is its versatility. Unlike cool-toned blondes or pure blacks, copper
        tones have warm undertones that complement nearly every complexion — they just need to be calibrated
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
            title: 'Freehand panels — mid-shaft to ends',
            body: 'Using a balayage board, saturate the backcombed mid-shaft sections with your main copper formula. Work diagonal-back sections for the most natural result.',
          },
          {
            step: 3,
            title: 'Foil highlights — optional brightness',
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
        attribution="Dana Reeves, Salon Business Coach — Nashville, TN"
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

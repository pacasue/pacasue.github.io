import { mkdir, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises'
import { basename, dirname, extname, join, resolve } from 'node:path'
import { createHash } from 'node:crypto'
import mammoth from 'mammoth'
import TurndownService from 'turndown'

const REQUIRED_FIELDS = ['Title', 'Author', 'Date', 'Section', 'Category', 'Excerpt']
const OPTIONAL_FIELDS = ['Slug', 'Tag', 'Read Time', 'Meta Title', 'Meta Description']
const KNOWN_FIELDS = new Set([...REQUIRED_FIELDS, ...OPTIONAL_FIELDS])
const SECTIONS = new Set(['Trends', 'Inspiration', 'Hair Care'])
const IMAGE_EXTENSIONS = new Map([
  ['image/png', 'png'],
  ['image/jpeg', 'jpg'],
  ['image/gif', 'gif'],
  ['image/webp', 'webp'],
  ['image/svg+xml', 'svg'],
])

const STYLE_MAP = [
  "p[style-name='Heading 1'] => h2:fresh",
  "p[style-name='Heading 2'] => h3:fresh",
  "p[style-name='Heading 3'] => h4:fresh",
  "p[style-name='Quote'] => blockquote > p:fresh",
]

function articleError(sourcePath, message) {
  return new Error(`[${basename(sourcePath)}] ${message}`)
}

function decodeHtml(value) {
  const named = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' }
  return value.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (entity, code) => {
    if (code[0] !== '#') return named[code.toLowerCase()] ?? entity
    const number = code[1].toLowerCase() === 'x'
      ? Number.parseInt(code.slice(2), 16)
      : Number.parseInt(code.slice(1), 10)
    return Number.isFinite(number) ? String.fromCodePoint(number) : entity
  })
}

function plainText(html) {
  return decodeHtml(html.replace(/<br\s*\/?\s*>/gi, '\n').replace(/<[^>]+>/g, '')).trim()
}

function parseMetadata(html, sourcePath) {
  const metadata = {}
  let remaining = html.trimStart()
  let sawMetadata = false

  while (true) {
    const match = remaining.match(/^<p>([\s\S]*?)<\/p>\s*/i)
    if (!match) break
    const text = plainText(match[1])
    const field = text.match(/^([^:]+):\s*(.*)$/s)
    if (!field) break

    const key = field[1].trim()
    if (!KNOWN_FIELDS.has(key)) {
      throw articleError(sourcePath, `Unknown metadata field "${key}".`)
    }
    if (Object.hasOwn(metadata, key)) {
      throw articleError(sourcePath, `Duplicate metadata field "${key}".`)
    }
    metadata[key] = field[2].trim()
    sawMetadata = true
    remaining = remaining.slice(match[0].length).trimStart()
  }

  if (!sawMetadata) {
    throw articleError(sourcePath, 'The document must begin with the labeled metadata paragraphs described in content/articles/README.md.')
  }
  for (const field of REQUIRED_FIELDS) {
    if (!metadata[field]) throw articleError(sourcePath, `Missing required metadata field "${field}".`)
  }
  return { metadata, bodyHtml: remaining }
}

function slugify(value) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function stableId(slug) {
  const digest = createHash('sha256').update(slug).digest()
  return 1_000_000_000 + digest.readUInt32BE(0)
}

function formatDate(isoDate, sourcePath) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) {
    throw articleError(sourcePath, 'Date must use ISO format YYYY-MM-DD.')
  }
  const date = new Date(`${isoDate}T00:00:00Z`)
  if (Number.isNaN(date.valueOf()) || date.toISOString().slice(0, 10) !== isoDate) {
    throw articleError(sourcePath, `Invalid calendar date "${isoDate}".`)
  }
  return new Intl.DateTimeFormat('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC',
  }).format(date)
}

function normalizeReadTime(value, body, sourcePath) {
  if (!value) {
    const words = plainText(body).split(/\s+/).filter(Boolean).length
    return `${Math.max(1, Math.ceil(words / 225))} min`
  }
  const match = value.match(/^(\d+)(?:\s*min)?$/i)
  if (!match || Number(match[1]) < 1) {
    throw articleError(sourcePath, 'Read Time must be a positive number of minutes.')
  }
  return `${Number(match[1])} min`
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function removeHeroImage(html, heroPath) {
  const path = escapeRegExp(heroPath)
  const wrapped = new RegExp(`<p>\\s*<img\\b[^>]*\\bsrc=["']${path}["'][^>]*>\\s*<\\/p>`, 'i')
  if (wrapped.test(html)) return html.replace(wrapped, '')
  const standalone = new RegExp(`<img\\b[^>]*\\bsrc=["']${path}["'][^>]*>`, 'i')
  return html.replace(standalone, '')
}

function markdownTable(node, service) {
  const rows = Array.from(node.rows ?? [])
  if (rows.length === 0) return ''
  const cells = rows.map((row) => Array.from(row.cells).map((cell) =>
    service.turndown(cell.innerHTML)
      .replace(/\n+/g, ' ')
      .replace(/\|/g, '\\|')
      .trim()
  ))
  const width = Math.max(...cells.map((row) => row.length))
  const normalized = cells.map((row) => [...row, ...Array(Math.max(0, width - row.length)).fill('')])
  const line = (row) => `| ${row.join(' | ')} |`
  return `\n\n${line(normalized[0])}\n${line(Array(width).fill('---'))}\n${normalized.slice(1).map(line).join('\n')}\n\n`
}

function htmlToMarkdown(html) {
  const service = new TurndownService({
    bulletListMarker: '-',
    codeBlockStyle: 'fenced',
    emDelimiter: '*',
    headingStyle: 'atx',
    strongDelimiter: '**',
  })
  service.addRule('gfmTable', {
    filter: 'table',
    replacement: (_content, node) => markdownTable(node, service),
  })
  return service.turndown(html)
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

async function writeGeneratedModule(outputModule, articles) {
  await mkdir(dirname(outputModule), { recursive: true })
  const source = `// Generated by scripts/import-docx.mjs. Do not edit.\n\nimport type { Article } from '../data/articles'\n\nexport const docxArticles: Article[] = ${JSON.stringify(articles, null, 2)}\n`
  await writeFile(outputModule, source)
}

export async function convertDocxFile({ sourcePath, outputImageDir }) {
  const fallbackSlug = slugify(basename(sourcePath, extname(sourcePath)))
  if (!fallbackSlug) throw articleError(sourcePath, 'The filename cannot produce a valid URL slug.')

  const stagedImages = []
  const result = await mammoth.convertToHtml(
    { path: sourcePath },
    {
      styleMap: STYLE_MAP,
      convertImage: mammoth.images.imgElement(async (image) => {
        const extension = IMAGE_EXTENSIONS.get(image.contentType)
        if (!extension) {
          throw articleError(sourcePath, `Unsupported embedded image type "${image.contentType}".`)
        }
        const number = stagedImages.length + 1
        const filename = `image-${String(number).padStart(2, '0')}.${extension}`
        stagedImages.push({ filename, buffer: Buffer.from(await image.read('base64'), 'base64') })
        return { src: `__DOCX_IMAGE_${number}__` }
      }),
    },
  )

  const { metadata, bodyHtml: rawBodyHtml } = parseMetadata(result.value, sourcePath)
  const slug = slugify(metadata.Slug || fallbackSlug)
  if (!slug) throw articleError(sourcePath, 'Slug must contain at least one letter or number.')
  if (metadata.Section && !SECTIONS.has(metadata.Section)) {
    throw articleError(sourcePath, `Section must be one of: ${[...SECTIONS].join(', ')}.`)
  }
  if (stagedImages.length === 0) {
    throw articleError(sourcePath, 'Every DOCX article must contain at least one embedded image for its hero.')
  }

  const articleImageDir = join(outputImageDir, slug)
  await mkdir(articleImageDir, { recursive: true })
  let bodyHtml = rawBodyHtml
  for (let index = 0; index < stagedImages.length; index += 1) {
    const image = stagedImages[index]
    const publicPath = `/image/docx/${slug}/${image.filename}`
    await writeFile(join(articleImageDir, image.filename), image.buffer)
    bodyHtml = bodyHtml.replaceAll(`__DOCX_IMAGE_${index + 1}__`, publicPath)
  }

  const heroPath = `/image/docx/${slug}/${stagedImages[0].filename}`
  bodyHtml = removeHeroImage(bodyHtml, heroPath)
  const body = htmlToMarkdown(bodyHtml)
  if (!body) throw articleError(sourcePath, 'The article body is empty after metadata and hero-image extraction.')

  return {
    id: stableId(slug),
    slug,
    tag: metadata.Tag || metadata.Category,
    title: metadata.Title,
    excerpt: metadata.Excerpt,
    author: metadata.Author,
    date: formatDate(metadata.Date, sourcePath),
    readTime: normalizeReadTime(metadata['Read Time'], body, sourcePath),
    image: heroPath,
    category: metadata.Category,
    section: metadata.Section,
    body,
    metaTitle: metadata['Meta Title'] || metadata.Title,
    metaDescription: metadata['Meta Description'] || metadata.Excerpt,
  }
}

export async function importDocxArticles({ inputDir, outputModule, outputImageDir }) {
  await mkdir(inputDir, { recursive: true })
  const names = (await readdir(inputDir, { withFileTypes: true }))
    // Microsoft Word creates lock files next to open documents with a `~$`
    // prefix. They are not DOCX archives, so treating them as articles makes
    // the whole import fail as soon as somebody uploads an open document (or
    // commits one of these temporary files by accident).
    .filter((entry) => (
      entry.isFile()
      && entry.name.toLowerCase().endsWith('.docx')
      && !entry.name.startsWith('~$')
    ))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b))

  const stagingDir = `${resolve(outputImageDir)}.staging`
  await rm(stagingDir, { recursive: true, force: true })
  await mkdir(stagingDir, { recursive: true })

  try {
    const articles = []
    const slugs = new Map()
    const ids = new Map()
    for (const name of names) {
      const article = await convertDocxFile({ sourcePath: join(inputDir, name), outputImageDir: stagingDir })
      if (slugs.has(article.slug)) {
        throw articleError(join(inputDir, name), `Slug "${article.slug}" is already used by ${slugs.get(article.slug)}.`)
      }
      if (ids.has(article.id)) {
        throw articleError(join(inputDir, name), `Generated ID collision with ${ids.get(article.id)}; set an explicit Slug.`)
      }
      slugs.set(article.slug, name)
      ids.set(article.id, name)
      articles.push(article)
    }

    articles.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf() || a.slug.localeCompare(b.slug))
    await rm(outputImageDir, { recursive: true, force: true })
    await mkdir(dirname(outputImageDir), { recursive: true })
    await rename(stagingDir, outputImageDir)
    await writeGeneratedModule(outputModule, articles)
    return articles
  } catch (error) {
    await rm(stagingDir, { recursive: true, force: true })
    throw error
  }
}

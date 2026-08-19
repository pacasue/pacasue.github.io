import assert from 'node:assert/strict'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import test from 'node:test'
import JSZip from 'jszip'
import { convertDocxFile, importDocxArticles } from './docx-importer.mjs'

const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M/wHwAF/gL+3F4pAAAAAElFTkSuQmCC', 'base64')

function escapeXml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function paragraph(text, style) {
  const properties = style ? `<w:pPr><w:pStyle w:val="${style}"/></w:pPr>` : ''
  return `<w:p>${properties}<w:r><w:t xml:space="preserve">${escapeXml(text)}</w:t></w:r></w:p>`
}

function imageParagraph(id, relationId, description) {
  return `<w:p><w:r><w:drawing><wp:inline><wp:extent cx="914400" cy="914400"/><wp:docPr id="${id}" name="Image ${id}" descr="${description}"/><a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic><pic:nvPicPr><pic:cNvPr id="${id}" name="image-${id}.png"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="${relationId}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="914400" cy="914400"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>`
}

function table() {
  const cell = (text) => `<w:tc><w:tcPr/><w:p><w:r><w:t>${text}</w:t></w:r></w:p></w:tc>`
  return `<w:tbl><w:tblPr/><w:tblGrid><w:gridCol w:w="3000"/><w:gridCol w:w="3000"/></w:tblGrid><w:tr>${cell('Service')}${cell('Timing')}</w:tr><w:tr>${cell('Gloss')}${cell('30 minutes')}</w:tr></w:tbl>`
}

async function makeDocx(path, { metadata = {}, includeImages = true } = {}) {
  const values = {
    Title: 'Imported Article',
    Author: 'Test Writer',
    Date: '2026-08-06',
    Section: 'Trends',
    Category: 'Color',
    Excerpt: 'A concise imported article summary.',
    ...metadata,
  }
  const metadataXml = Object.entries(values).map(([key, value]) => paragraph(`${key}: ${value}`)).join('')
  const imagesXml = includeImages
    ? `${imageParagraph(1, 'rId1', 'Hero image')}${paragraph('Opening with useful detail.')}${paragraph('Main Section', 'Heading1')}${paragraph('Body with styled hierarchy.')}${imageParagraph(2, 'rId2', 'Inline image')}${paragraph('Subsection', 'Heading2')}${table()}`
    : `${paragraph('Opening with useful detail.')}${paragraph('Main Section', 'Heading1')}${paragraph('Body with styled hierarchy.')}`

  const zip = new JSZip()
  zip.file('[Content_Types].xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>`)
  zip.file('_rels/.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`)
  zip.file('word/document.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><w:body>${metadataXml}${imagesXml}<w:sectPr/></w:body></w:document>`)
  zip.file('word/styles.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/></w:style><w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/></w:style><w:style w:type="paragraph" w:styleId="Heading3"><w:name w:val="heading 3"/></w:style></w:styles>`)
  zip.file('word/_rels/document.xml.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/image1.png"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/image2.png"/><Relationship Id="rIdStyles" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`)
  zip.file('word/media/image1.png', PNG)
  zip.file('word/media/image2.png', PNG)
  await writeFile(path, await zip.generateAsync({ type: 'nodebuffer' }))
}

async function withWorkspace(run) {
  const root = await mkdtemp(join(tmpdir(), 'hairprovoices-docx-'))
  try {
    await run(root)
  } finally {
    await rm(root, { recursive: true, force: true })
  }
}

test('converts a DOCX and uses only its first image as the hero', async () => {
  await withWorkspace(async (root) => {
    const sourcePath = join(root, 'My Article.docx')
    const imageDir = join(root, 'images')
    await makeDocx(sourcePath)

    const article = await convertDocxFile({ sourcePath, outputImageDir: imageDir })

    assert.equal(article.slug, 'my-article')
    assert.equal(article.image, '/image/docx/my-article/image-01.png')
    assert.equal(article.date, 'Aug 6, 2026')
    assert.equal(article.readTime, '1 min')
    assert.match(article.body, /^Opening with useful detail\./)
    assert.match(article.body, /## Main Section/)
    assert.match(article.body, /### Subsection/)
    assert.match(article.body, /\| Service \| Timing \|\n\| --- \| --- \|\n\| Gloss \| 30 minutes \|/)
    assert.doesNotMatch(article.body, /image-01\.png/)
    assert.match(article.body, /!\[Inline image\]\(\/image\/docx\/my-article\/image-02\.png\)/)
    assert.equal((await readFile(join(imageDir, 'my-article/image-01.png'))).length, PNG.length)
    assert.equal((await readFile(join(imageDir, 'my-article/image-02.png'))).length, PNG.length)
  })
})

test('imports a folder and writes a generated article module', async () => {
  await withWorkspace(async (root) => {
    const inputDir = join(root, 'content')
    const outputModule = join(root, 'generated/docxArticles.ts')
    const outputImageDir = join(root, 'public/image/docx')
    await import('node:fs/promises').then(({ mkdir }) => mkdir(inputDir, { recursive: true }))
    await makeDocx(join(inputDir, 'article.docx'), { metadata: { Slug: 'explicit-slug', 'Read Time': '7 min' } })
    // Word lock files use the same extension but are not DOCX archives.
    await writeFile(join(inputDir, '~$article.docx'), 'temporary lock file')

    const articles = await importDocxArticles({ inputDir, outputModule, outputImageDir })

    assert.equal(articles.length, 1)
    assert.equal(articles[0].slug, 'explicit-slug')
    assert.equal(articles[0].readTime, '7 min')
    assert.match(await readFile(outputModule, 'utf8'), /export const docxArticles/)
  })
})

test('rejects invalid metadata and documents without hero images', async () => {
  await withWorkspace(async (root) => {
    const invalidSection = join(root, 'invalid-section.docx')
    const noImage = join(root, 'no-image.docx')
    await makeDocx(invalidSection, { metadata: { Section: 'News' } })
    await makeDocx(noImage, { includeImages: false })

    await assert.rejects(
      convertDocxFile({ sourcePath: invalidSection, outputImageDir: join(root, 'images-a') }),
      /Section must be one of/,
    )
    await assert.rejects(
      convertDocxFile({ sourcePath: noImage, outputImageDir: join(root, 'images-b') }),
      /must contain at least one embedded image/,
    )
  })
})

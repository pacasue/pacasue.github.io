import { resolve } from 'node:path'
import { importDocxArticles } from './docx-importer.mjs'

const root = resolve(import.meta.dirname, '..')

try {
  const articles = await importDocxArticles({
    inputDir: resolve(root, 'content/articles'),
    outputModule: resolve(root, 'src/generated/docxArticles.ts'),
    outputImageDir: resolve(root, 'public/image/docx'),
  })
  console.log(`Imported ${articles.length} DOCX article${articles.length === 1 ? '' : 's'}.`)
} catch (error) {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
}

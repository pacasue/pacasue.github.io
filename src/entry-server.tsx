import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { AppRoutes } from './App'
import { articles, authors } from './data/articles'
import PreferredSourceButton from './components/PreferredSourceButton'

export { articles, authors }
export { buildPageSeo, authorPath } from './seo'

export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <PreferredSourceButton />
      <AppRoutes />
    </StaticRouter>
  )
}

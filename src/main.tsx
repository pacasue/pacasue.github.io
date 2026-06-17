import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App'

const root = document.getElementById('root')!

// Only hydrate when the server actually rendered real element content.
// In dev, #root contains just the `<!--ssr-outlet-->` comment (no prerender),
// so we must mount fresh with createRoot instead of trying to hydrate.
if (root.firstElementChild) {
  hydrateRoot(root, <StrictMode><App /></StrictMode>)
} else {
  createRoot(root).render(<StrictMode><App /></StrictMode>)
}

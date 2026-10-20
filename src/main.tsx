import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { installAttribution } from './attribution.js'

// Capture landing parameters before React navigation. Tag partner hrefs only
// after hydration so prerendered markup still matches the first client render.
const attribution = installAttribution()

const root = document.getElementById('root')!

// Only hydrate when the server actually rendered real element content.
// In dev, #root contains just the `<!--ssr-outlet-->` comment (no prerender),
// so we must mount fresh with createRoot instead of trying to hydrate.
if (root.firstElementChild) {
  hydrateRoot(root, <StrictMode><App /></StrictMode>)
} else {
  createRoot(root).render(<StrictMode><App /></StrictMode>)
}

attribution?.startTagging()

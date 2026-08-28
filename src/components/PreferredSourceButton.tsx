import { useEffect, useRef, useState } from 'react'
import { Star } from 'lucide-react'

// Google "Preferred Sources" SDK, loaded from Google's own CDN — not an npm
// package, so this is a runtime ESM import rather than a static one.
// https://developers.google.com/search/docs/appearance/preferred-sources
type PreferredSourceClient = {
  init: (opts: { theme?: 'light' | 'dark'; lang?: string }) => void
  addPreferredSource: () => void
}

type PublisherModule = { preferredSource: PreferredSourceClient }

// Routed through a variable (not a string literal) so TypeScript treats the
// specifier as dynamic and doesn't try to resolve real type declarations for
// a URL that only exists on Google's CDN.
const PUBLISHER_SDK_URL = 'https://news.google.com/swg/js/v1/publisher.mjs'

// We drive the flow ourselves (the "advanced" integration) instead of the
// drop-in <div google-add-preferred-source-btn> markup: this app is a
// client-side-routed SPA, and Google's standard script only scans the DOM
// once when it first loads — a client-side navigation never gets a second
// scan, so the drop-in button's slot silently stays empty. Loading the SDK
// lazily and calling addPreferredSource() ourselves on click sidesteps that
// entirely, and lets the button match our own design system.
let clientPromise: Promise<PreferredSourceClient> | null = null

function loadClient() {
  if (!clientPromise) {
    clientPromise = import(/* @vite-ignore */ PUBLISHER_SDK_URL).then(
      (mod: PublisherModule) => {
        mod.preferredSource.init({ theme: 'dark' })
        return mod.preferredSource
      },
    )
  }
  return clientPromise
}

// Rendered once, globally (see App.tsx), so it appears floating on every
// page — not just article pages. Sits bottom-left, opposite FloatingNav's
// bottom-right menu toggle, so the two never collide.
export default function PreferredSourceButton() {
  const clientRef = useRef<PreferredSourceClient | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    loadClient()
      .then((client) => {
        if (cancelled) return
        clientRef.current = client
        setReady(true)
      })
      .catch(() => {
        // Fails closed: button stays disabled if Google's SDK can't load
        // (offline, blocked, or the domain isn't preferred-source eligible).
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <button
      type="button"
      onClick={() => clientRef.current?.addPreferredSource()}
      disabled={!ready}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-black border border-white/10 hover:border-gold-500 hover:text-gold-500 text-charcoal-300 shadow-lg transition-colors px-4 py-2.5 text-[10px] tracking-widest uppercase disabled:opacity-40 disabled:cursor-default"
      aria-label="Add HairProVoices as a preferred source on Google"
    >
      <Star size={12} className="text-gold-500" />
      Prefer Us on Google
    </button>
  )
}

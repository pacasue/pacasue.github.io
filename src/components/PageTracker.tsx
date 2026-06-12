import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SESSION_PV_COUNT_KEY = 'hpv_session_pv_count'
const FIRED_PV2_KEY        = 'hpv_fired_pv2'
const FIRED_PV3_KEY        = 'hpv_fired_pv3'

export default function PageTracker () {
  const { pathname } = useLocation()

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const cvg = (window as any).cvg
      if (!cvg) return

      ;(window as any).resetScrollDepth?.()
      cvg({ method: 'track', eventName: '$page_load' })

      const prev = parseInt(sessionStorage.getItem(SESSION_PV_COUNT_KEY) ?? '0', 10)
      const next = isFinite(prev) ? prev + 1 : 1
      sessionStorage.setItem(SESSION_PV_COUNT_KEY, String(next))

      if (next === 2 && !sessionStorage.getItem(FIRED_PV2_KEY)) {
        sessionStorage.setItem(FIRED_PV2_KEY, '1')
        cvg({ method: 'track', eventName: 'Session Pageviews 2', properties: { session_page_views: 2 } })
      }
      if (next === 3 && !sessionStorage.getItem(FIRED_PV3_KEY)) {
        sessionStorage.setItem(FIRED_PV3_KEY, '1')
        cvg({ method: 'track', eventName: 'Session Pageviews 3', properties: { session_page_views: 3 } })
      }
    }, 200)

    return () => clearTimeout(timeoutId)
  }, [pathname])

  return null
}
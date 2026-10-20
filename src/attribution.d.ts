export function installAttribution(target?: Window): {
  startTagging: () => void
  capture: (url?: string, pathname?: string) => void
  load: () => { params: Record<string, string>; capturedAt: number } | null
  buildOutboundUrl: (destination: string, base?: string) => string
  tagLinks: (root?: ParentNode) => void
} | null

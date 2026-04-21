import { Button } from "@/components/ui/button"

export interface TickerMatch {
  home: string
  hAbbr: string
  hScore: number
  away: string
  aAbbr: string
  aScore: number
  time: string
  live: boolean
}

export interface CinematicHeroProps {
  /** Eyebrow text after the live dot, e.g. "Match Day 18 · Charlotte FC" */
  eyebrow?: string
  liveLabel?: string
  /** First headline line */
  headline?: string
  /** Middle line — rendered in #697279 accent */
  headlineAccent?: string
  /** Third headline line */
  headlineSub?: string
  description?: string
  primaryCta?: { label: string; href?: string }
  secondaryCta?: { label: string; href?: string }
  /** src for <img> background — leave undefined to show gradient placeholder */
  imageSrc?: string
  tickerLabel?: string
  tickerMatches?: TickerMatch[]
}

const DEFAULT_TICKER: TickerMatch[] = [
  { home: "Charlotte FC", hAbbr: "CFA", hScore: 3, away: "Raleigh Athletic", aAbbr: "RLH", aScore: 1, time: "72'", live: true },
  { home: "Durham United", hAbbr: "DUR", hScore: 0, away: "Triangle FC",     aAbbr: "TFC", aScore: 2, time: "45'", live: true },
  { home: "Greensboro FC", hAbbr: "GFC", hScore: 1, away: "Winston-Salem SC",aAbbr: "WSS", aScore: 1, time: "FT",   live: false },
  { home: "Outer Banks FC",hAbbr: "OBK", hScore: 0, away: "Asheville City",  aAbbr: "AVL", aScore: 0, time: "3:00 PM", live: false },
]

export function CinematicHero({
  eyebrow       = "Match Day 18 · Charlotte FC",
  liveLabel     = "Live Now",
  headline      = "CAROLINA",
  headlineAccent= "PREMIER",
  headlineSub   = "SOCCER LEAGUE",
  description   = "The premier youth soccer league in the Carolinas. Follow every match, every moment, every season.",
  primaryCta    = { label: "Watch Live →" },
  secondaryCta  = { label: "View Schedule" },
  imageSrc,
  tickerLabel   = "Today",
  tickerMatches = DEFAULT_TICKER,
}: CinematicHeroProps) {
  return (
    <div className="relative min-h-[420px] md:min-h-[540px] overflow-hidden" style={{ background: "#091628" }}>

      {/* Background */}
      {imageSrc ? (
        <img src={imageSrc} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(115deg, #0A1628 0%, #112244 35%, #1A3A6A 60%, #0D2550 100%)" }} />
      )}

      {/* Diagonal light lines */}
      {["-30%", "-10%", "10%", "35%", "58%", "78%"].map((left, i) => (
        <div key={i} style={{
          position: "absolute", top: "-50%", bottom: "-50%",
          left, width: i % 3 === 0 ? "2px" : "1px",
          background: `rgba(0,71,255,${i % 2 === 0 ? 0.12 : 0.06})`,
          transform: "rotate(18deg)",
        }} />
      ))}

      {/* Content mask */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(2,11,26,0.97) 30%, rgba(2,11,26,0.65) 55%, rgba(2,11,26,0.05) 100%)" }} />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center px-6 md:px-16 py-12 md:py-0">
        <div style={{ maxWidth: "560px" }}>
          {/* Eyebrow */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-5">
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#FF1744", display: "inline-block", flexShrink: 0, boxShadow: "0 0 8px #FF1744" }} />
            <span style={{ color: "#FF1744", fontSize: "10px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase" }}>{liveLabel}</span>
            <span style={{ width: "1px", height: "12px", background: "#334155", flexShrink: 0 }} />
            <span style={{ color: "#64748B", fontSize: "11px", fontWeight: 500 }}>{eyebrow}</span>
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "var(--text-display)", fontWeight: 800, color: "white", lineHeight: 0.92, letterSpacing: "-2px", marginBottom: "24px" }}>
            {headline}<br />
            <span style={{ color: "#697279" }}>{headlineAccent}</span><br />
            {headlineSub}
          </h1>

          <p style={{ color: "#94A3B8", fontSize: "16px", lineHeight: 1.65, marginBottom: "32px", maxWidth: "420px" }}>{description}</p>

          <div style={{ display: "flex", gap: "12px" }}>
            {primaryCta  && <Button size="lg">{primaryCta.label}</Button>}
            {secondaryCta && <Button size="lg" variant="secondary">{secondaryCta.label}</Button>}
          </div>
        </div>
      </div>

      {/* Bottom ticker — hidden on mobile */}
      <div className="hidden md:flex" style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,71,255,0.12)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(0,71,255,0.25)", padding: "10px 64px", alignItems: "center", gap: "32px" }}>
        <span style={{ color: "#475569", fontSize: "9px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", flexShrink: 0 }}>{tickerLabel}</span>
        {tickerMatches.map((m) => (
          <div key={m.hAbbr} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", whiteSpace: "nowrap", flexShrink: 0 }}>
            {m.live && <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#FF1744", flexShrink: 0 }} />}
            <span style={{ color: "#94A3B8", fontWeight: 600 }}>{m.hAbbr}</span>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "18px", fontWeight: 800, color: "white", letterSpacing: "-0.5px" }}>{m.hScore}–{m.aScore}</span>
            <span style={{ color: "#64748B", fontWeight: 600 }}>{m.aAbbr}</span>
            <span style={{ color: m.live ? "#FF1744" : "#475569", fontSize: "9px", fontWeight: 700, letterSpacing: "1px" }}>{m.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

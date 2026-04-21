import { Button } from "@/components/ui/button"

export interface MagazineHeroProps {
  season?: string
  /** Three headline lines: [line1, line2 (accent), line3] */
  headline?: string
  headlineAccent?: string
  headlineSub?: string
  stats?: Array<{ value: string; label: string }>
  primaryCta?: { label: string; href?: string }
  secondaryCta?: { label: string; href?: string }
  /** src for <img> right-panel background */
  imageSrc?: string
}

export function MagazineHero({
  season         = "2025–26 Season",
  headline       = "THE",
  headlineAccent = "LEAGUE",
  headlineSub    = "AWAITS",
  stats          = [{ value: "12", label: "Clubs" }, { value: "38", label: "Match Days" }, { value: "NC", label: "Statewide" }],
  primaryCta     = { label: "Explore Clubs →" },
  secondaryCta   = { label: "See Fixtures" },
  imageSrc,
}: MagazineHeroProps) {
  return (
    <div className="relative min-h-[480px] md:h-[540px] overflow-hidden" style={{ background: "#F4F6FA" }}>

      {/* Accent stripe */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "4px", background: "linear-gradient(to bottom, #697279, #BF1D2D)" }} />

      {/* Right — photo slot (hidden on mobile) */}
      <div className="hidden md:block absolute right-0 top-0 bottom-0 w-[55%] overflow-hidden">
        {imageSrc ? (
          <img src={imageSrc} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #1A2A35 0%, #697279 40%, #3A4248 70%, #262D32 100%)" }} />
        )}
        {/* Jersey watermark */}
        <div style={{ position: "absolute", right: "-40px", top: "50%", transform: "translateY(-52%)", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "320px", fontWeight: 800, color: "rgba(255,255,255,0.07)", lineHeight: 1, letterSpacing: "-10px", userSelect: "none" }}>9</div>
        {/* Left fade */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "180px", background: "linear-gradient(to right, #F4F6FA 0%, rgba(244,246,250,0) 100%)" }} />
      </div>

      {/* Left — text content (full width on mobile) */}
      <div className="relative z-10 flex flex-col justify-center px-6 md:pl-14 md:pr-8 py-12 md:py-0 md:max-w-[600px]">
        {/* Season pill */}
        <div style={{ display: "inline-flex", alignItems: "center", background: "#697279", padding: "5px 12px", borderRadius: "4px", marginBottom: "20px", width: "fit-content" }}>
          <span style={{ color: "white", fontSize: "10px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase" }}>{season}</span>
        </div>

        {/* Headline */}
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "var(--text-display-xl)", fontWeight: 800, lineHeight: 0.88, letterSpacing: "-3px", color: "#091628", marginBottom: "28px" }}>
          {headline}<br />
          <span style={{ color: "#697279" }}>{headlineAccent}</span><br />
          {headlineSub}
        </h1>

        {/* Stats row */}
        <div className="flex flex-wrap gap-x-6 gap-y-4 mb-8 md:mb-9">
          {stats.map((s, i) => (
            <div key={s.label} className={`pr-6 ${i < stats.length - 1 ? "border-r border-[#CBD5E1]" : ""}`}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "var(--text-h2)", fontWeight: 800, color: "#697279", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: "10px", fontWeight: 600, color: "#64748B", letterSpacing: "1.5px", textTransform: "uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          {primaryCta   && <Button size="lg">{primaryCta.label}</Button>}
          {secondaryCta && <Button size="lg" variant="ghost">{secondaryCta.label}</Button>}
        </div>
      </div>
    </div>
  )
}

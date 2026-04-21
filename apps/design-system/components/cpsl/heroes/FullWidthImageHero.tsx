export interface FullWidthImageHeroProps {
  /** First headline line */
  headline?: string
  /** Second headline line */
  headlineSub?: string
  /** src for <img> background */
  imageSrc?: string
}

export function FullWidthImageHero({
  headline    = "CAROLINA",
  headlineSub = "PREMIER LEAGUE",
  imageSrc,
}: FullWidthImageHeroProps) {
  return (
    <div className="relative min-h-[300px] sm:min-h-[400px] md:min-h-[480px] lg:min-h-[560px]">
      {/* Background */}
      {imageSrc ? (
        <img src={imageSrc} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, #071A2E 0%, #0A2A50 30%, #697279 65%, #1F2D35 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 68% 38%, rgba(255,255,255,0.06) 0%, transparent 55%)" }} />
        </>
      )}

      {/* Scrim */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "65%", background: "linear-gradient(to top, rgba(2,11,26,0.94) 0%, rgba(2,11,26,0.5) 50%, transparent 100%)" }} />

      {/* Headline */}
      <div style={{ position: "absolute", bottom: "clamp(24px, 5vw, 52px)", left: "clamp(20px, 5vw, 60px)" }}>
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "var(--text-display-lg)", fontWeight: 800, color: "white", lineHeight: 0.91, letterSpacing: "-2.5px", margin: 0 }}>
          {headline}<br />{headlineSub}
        </h1>
      </div>
    </div>
  )
}

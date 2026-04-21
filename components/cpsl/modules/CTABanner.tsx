import { Button } from "@/components/ui/button"

export type CTABannerBackground = "white" | "cream" | "surface" | "navy" | "gold"

export interface CTABannerProps {
  eyebrow?:        string
  headline?:       string
  headlineAccent?: string
  description?:    string
  primaryCta?:     { label: string; href?: string }
  secondaryCta?:   { label: string; href?: string }
  background?:     CTABannerBackground
}

const outerBgMap: Record<CTABannerBackground, string> = {
  white:   "#FFFFFF",
  cream:   "#F4EFE6",
  surface: "#F4F6FA",
  navy:    "#091628",
  gold:    "#C9A74C",
}

const cardBgMap: Record<CTABannerBackground, string> = {
  white:   "#091628",
  cream:   "#091628",
  surface: "#091628",
  navy:    "#0D1B3E",
  gold:    "#091628",
}

export function CTABanner({
  eyebrow        = "2025–26 Season",
  headline       = "REGISTER YOUR CLUB",
  headlineAccent = "BEFORE APRIL 30",
  description    = "Applications for the 2025–26 CPSL Premiership and Development League are now open. Secure your spot for next season before the deadline closes.",
  primaryCta     = { label: "Apply Now →" },
  secondaryCta   = { label: "Learn More" },
  background     = "cream",
}: CTABannerProps) {
  const outerBg  = outerBgMap[background]
  const cardBg   = cardBgMap[background]

  return (
    <section style={{ background: outerBg, padding: "64px 24px" }}>
      <div
        className="mx-auto max-w-7xl rounded-2xl overflow-hidden border"
        style={{ background: cardBg, borderColor: "#1E2D45" }}
      >
        <div className="px-6 py-10 md:px-16 md:py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div style={{ color: "#E74552", fontSize: "10px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px" }}>
              {eyebrow}
            </div>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "var(--text-display-sm)", fontWeight: 800, color: "#F4EFE6", lineHeight: 0.95, letterSpacing: "-1.5px", marginBottom: "16px" }}>
              {headline}<br />
              <span style={{ color: "#C9A74C" }}>{headlineAccent}</span>
            </h2>
            <p style={{ color: "#64748B", fontSize: "14px", lineHeight: 1.65, maxWidth: "520px" }}>{description}</p>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto shrink-0">
            {primaryCta   && <Button size="lg" className="w-full sm:w-auto md:min-w-[180px]">{primaryCta.label}</Button>}
            {secondaryCta && <Button size="lg" variant="secondary" className="w-full sm:w-auto md:min-w-[180px]">{secondaryCta.label}</Button>}
          </div>
        </div>
      </div>
    </section>
  )
}

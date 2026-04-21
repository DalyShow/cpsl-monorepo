import PageHeader from "@/components/PageHeader"
import Section from "@/components/Section"
import { CinematicHero } from "@/components/cpsl/heroes/CinematicHero"
import { SplitFrameHero } from "@/components/cpsl/heroes/SplitFrameHero"
import { GlassCardHero } from "@/components/cpsl/heroes/GlassCardHero"
import { MagazineHero } from "@/components/cpsl/heroes/MagazineHero"
import { FullWidthImageHero } from "@/components/cpsl/heroes/FullWidthImageHero"
import { SectionHeader } from "@/components/cpsl/heroes/SectionHeader"

export default function HeroesPage() {
  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <PageHeader
        section="12 — Components"
        title="Hero Sections"
        description="Five production-ready hero layouts built from CPSL design tokens. Each accepts a photo or video background — swap the gradient placeholder for an <img> or <video> tag."
      />

      <div className="px-12 py-12">

        <Section title="1 — Cinematic Gradient">
          <p className="text-xs text-muted-foreground mb-4">
            Full-bleed background with a directional gradient mask keeping text readable. Live match ticker anchored to the bottom. Best for homepage and season-launch moments.
          </p>
          <div className="rounded-2xl overflow-hidden border border-[#E2E8F0]">
            <CinematicHero />
          </div>
        </Section>

        <Section title="2 — Split Frame">
          <p className="text-xs text-muted-foreground mb-4">
            Dark navy content panel left, diagonal-clipped action photo right. Match preview layout. Works equally well as a player spotlight or venue feature.
          </p>
          <div className="rounded-2xl overflow-hidden border border-[#E2E8F0]">
            <SplitFrameHero />
          </div>
        </Section>

        <Section title="3 — Glass Card on Dark">
          <p className="text-xs text-muted-foreground mb-4">
            Frosted glass card floats over a full-bleed dark stadium background. Minimal, focused, and ideal for live match moments. The <code className="bg-secondary px-1.5 py-0.5 rounded">backdrop-filter: blur</code> reads best over a real photo.
          </p>
          <div className="rounded-2xl overflow-hidden border border-[#E2E8F0]">
            <GlassCardHero />
          </div>
        </Section>

        <Section title="4 — Magazine Overlap">
          <p className="text-xs text-muted-foreground mb-4">
            Editorial magazine grid — huge Barlow Condensed headline bleeds over the right-hand photo panel. Great for league launches, player features, and season recaps.
          </p>
          <div className="rounded-2xl overflow-hidden border border-[#E2E8F0]">
            <MagazineHero />
          </div>
        </Section>

        <Section title="5 — Full Width Image + Headline">
          <p className="text-xs text-muted-foreground mb-4">
            Image-first hero — the photo takes full command, headline anchored bottom-left over a gradient scrim. Nothing else. Let the image do the work.
          </p>
          <div className="rounded-2xl overflow-hidden border border-[#E2E8F0]">
            <FullWidthImageHero />
          </div>
        </Section>

        <Section title="6 — Section Header">
          <p className="text-xs text-muted-foreground mb-4">
            Compact module-level header — sits above data-heavy sections like Standings, Schedule, or Club Directory. Large Barlow Condensed title with an optional gold badge and muted subtitle. Gold accent bar anchors bottom-left. Dark and light variants.
          </p>
          <div className="flex flex-col gap-3 rounded-2xl overflow-hidden border border-[#E2E8F0]">
            <SectionHeader
              title="Standings"
              badge="2024–25 Season"
              subtitle="Select a conference and age group to view division standings"
              variant="dark"
            />
            <SectionHeader
              title="Schedule"
              badge="Spring 2025"
              subtitle="Upcoming fixtures across all age groups and divisions"
              variant="light"
            />
          </div>
        </Section>

        {/* Photo & Video Integration guide */}
        <Section title="Photo & Video Integration">
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                title: "Static Photo",
                code: `<CinematicHero
  imageSrc="/stadium.jpg"
  headline="CAROLINA"
  headlineAccent="PREMIER"
  headlineSub="SOCCER LEAGUE"
  primaryCta={{ label: "Watch Live →" }}
  secondaryCta={{ label: "View Schedule" }}
/>`,
              },
              {
                title: "With custom ticker",
                code: `<CinematicHero
  tickerMatches={[
    { home: "Charlotte FC", hAbbr: "CFA", hScore: 2,
      away: "Durham United", aAbbr: "DUR", aScore: 0,
      time: "65'", live: true },
  ]}
  headline="CAROLINA"
  headlineAccent="PREMIER"
  headlineSub="SOCCER LEAGUE"
/>`,
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border bg-white border-[#E2E8F0] overflow-hidden">
                <div className="px-4 py-2.5 border-b border-[#F1F5F9] bg-[#FAFBFF]">
                  <span className="text-xs font-bold text-foreground">{item.title}</span>
                </div>
                <pre className="text-[11px] leading-relaxed p-4 overflow-x-auto" style={{ fontFamily: "'Fira Code', 'Cascadia Code', monospace", color: "#475569" }}>
                  {item.code}
                </pre>
              </div>
            ))}
          </div>
        </Section>

      </div>
    </div>
  )
}

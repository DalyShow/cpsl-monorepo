import { CinematicHero } from "@/components/cpsl/heroes/CinematicHero"
import { DocsHeader } from "@/components/docs/DocsHeader"
import { PreviewPane } from "@/components/docs/PreviewPane"
import { PropsTable } from "@/components/docs/PropsTable"
import CodeBlock from "@/components/CodeBlock"
import type { PropDoc } from "@/components/docs/types"

const PROP_DOCS: PropDoc[] = [
  { name: "imageSrc",       type: "string",         default: "—", description: "Background photo URL. Falls back to a gradient placeholder when omitted." },
  { name: "videoSrc",       type: "string",         default: "—", description: "Background video URL. Takes priority over imageSrc." },
  { name: "headline",       type: "string",         default: '"CAROLINA"',           description: "Top headline line." },
  { name: "headlineAccent", type: "string",         default: '"PREMIER"',            description: "Gold accent line." },
  { name: "headlineSub",    type: "string",         default: '"SOCCER LEAGUE"',      description: "Sub-line beneath the accent." },
  { name: "tagline",        type: "string",         default: "—", description: "Optional eyebrow / tagline." },
  { name: "primaryCta",     type: "{label, href?}", default: "—", description: "Primary CTA button." },
  { name: "secondaryCta",   type: "{label, href?}", default: "—", description: "Secondary outline CTA." },
  { name: "tickerMatches",  type: "TickerMatch[]",  default: "—", description: "Live match strip pinned to the bottom of the hero." },
]

const code = `<CinematicHero
  imageSrc="/stadium.jpg"
  headline="CAROLINA"
  headlineAccent="PREMIER"
  headlineSub="SOCCER LEAGUE"
  primaryCta={{ label: "Watch Live →" }}
  secondaryCta={{ label: "View Schedule" }}
/>`

export const metadata = { title: "Cinematic Gradient Hero — CPSL" }

export default function Page() {
  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <DocsHeader
        crumbs={[{ label: "Components", href: "/" }, { label: "Hero Sections", href: "/heroes" }, { label: "Cinematic Gradient" }]}
        title="Cinematic Gradient Hero"
        status="stable"
        description="Full-bleed background with a directional gradient mask keeping text readable. Live match ticker anchored to the bottom. Best for homepage and season-launch moments."
      />
      <div className="px-12 py-10 flex flex-col gap-6">
        <PreviewPane label="Live Preview" canvas="surface" padding={0}>
          <CinematicHero />
        </PreviewPane>
        <CodeBlock code={code} language="tsx" />
        <PropsTable props={PROP_DOCS} />
      </div>
    </div>
  )
}

import { SplitFrameHero } from "@/components/cpsl/heroes/SplitFrameHero"
import { DocsHeader } from "@/components/docs/DocsHeader"
import { PreviewPane } from "@/components/docs/PreviewPane"
import { PropsTable } from "@/components/docs/PropsTable"
import CodeBlock from "@/components/CodeBlock"
import type { PropDoc } from "@/components/docs/types"

const PROP_DOCS: PropDoc[] = [
  { name: "headline",     type: "string",         default: "—", description: "Main headline (Barlow Condensed)." },
  { name: "subheadline",  type: "string",         default: "—", description: "Sub-line beneath the headline." },
  { name: "tagline",      type: "string",         default: "—", description: "Eyebrow above the headline." },
  { name: "imageSrc",     type: "string",         default: "—", description: "Right-panel photo." },
  { name: "primaryCta",   type: "{label, href?}", default: "—", description: "Primary action button." },
  { name: "secondaryCta", type: "{label, href?}", default: "—", description: "Secondary action button." },
]

const code = `<SplitFrameHero
  tagline="MATCH PREVIEW"
  headline="CHARLOTTE FC vs DURHAM"
  subheadline="Saturday · 3:00 PM · Matthews Sportsplex"
  imageSrc="/preview.jpg"
  primaryCta={{ label: "Buy Tickets" }}
/>`

export const metadata = { title: "Split Frame Hero — CPSL" }

export default function Page() {
  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <DocsHeader
        crumbs={[{ label: "Components", href: "/" }, { label: "Hero Sections", href: "/heroes" }, { label: "Split Frame" }]}
        title="Split Frame Hero"
        status="stable"
        description="Dark navy content panel on the left, diagonal-clipped action photo on the right. Match preview layout — works equally well as a player spotlight or venue feature."
      />
      <div className="px-12 py-10 flex flex-col gap-6">
        <PreviewPane label="Live Preview" canvas="surface" padding={0}>
          <SplitFrameHero />
        </PreviewPane>
        <CodeBlock code={code} language="tsx" />
        <PropsTable props={PROP_DOCS} />
      </div>
    </div>
  )
}

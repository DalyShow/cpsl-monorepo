import { GlassCardHero } from "@/components/cpsl/heroes/GlassCardHero"
import { DocsHeader } from "@/components/docs/DocsHeader"
import { PreviewPane } from "@/components/docs/PreviewPane"
import { PropsTable } from "@/components/docs/PropsTable"
import CodeBlock from "@/components/CodeBlock"
import type { PropDoc } from "@/components/docs/types"

const PROP_DOCS: PropDoc[] = [
  { name: "imageSrc",   type: "string",         default: "—", description: "Full-bleed background photo." },
  { name: "headline",   type: "string",         default: "—", description: "Headline rendered inside the frosted card." },
  { name: "tagline",    type: "string",         default: "—", description: "Eyebrow label above the headline." },
  { name: "body",       type: "string",         default: "—", description: "Supporting paragraph." },
  { name: "primaryCta", type: "{label, href?}", default: "—", description: "Primary action button." },
]

const code = `<GlassCardHero
  imageSrc="/stadium-night.jpg"
  tagline="LIVE NOW"
  headline="MATCHDAY 18"
  body="Charlotte FC face Durham United for the playoff opener."
  primaryCta={{ label: "Watch Live →" }}
/>`

export const metadata = { title: "Glass Card Hero — CPSL" }

export default function Page() {
  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <DocsHeader
        crumbs={[{ label: "Components", href: "/" }, { label: "Hero Sections", href: "/heroes" }, { label: "Glass Card" }]}
        title="Glass Card Hero"
        status="stable"
        description="Frosted glass card floats over a full-bleed dark stadium background. Minimal, focused, and ideal for live match moments. The backdrop-filter blur reads best over a real photo."
      />
      <div className="px-12 py-10 flex flex-col gap-6">
        <PreviewPane label="Live Preview" canvas="surface" padding={0}>
          <GlassCardHero />
        </PreviewPane>
        <CodeBlock code={code} language="tsx" />
        <PropsTable props={PROP_DOCS} />
      </div>
    </div>
  )
}

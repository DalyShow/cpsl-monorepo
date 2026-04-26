import { FullWidthImageHero } from "@/components/cpsl/heroes/FullWidthImageHero"
import { DocsHeader } from "@/components/docs/DocsHeader"
import { PreviewPane } from "@/components/docs/PreviewPane"
import { PropsTable } from "@/components/docs/PropsTable"
import CodeBlock from "@/components/CodeBlock"
import type { PropDoc } from "@/components/docs/types"

const PROP_DOCS: PropDoc[] = [
  { name: "imageSrc",   type: "string",         default: "—", description: "Full-bleed background photo." },
  { name: "headline",   type: "string",         default: "—", description: "Bottom-anchored headline." },
  { name: "tagline",    type: "string",         default: "—", description: "Optional eyebrow." },
  { name: "primaryCta", type: "{label, href?}", default: "—", description: "Optional inline CTA." },
]

const code = `<FullWidthImageHero
  imageSrc="/team-photo.jpg"
  tagline="2026 ROSTER"
  headline="MEET THE CLASS OF '26."
/>`

export const metadata = { title: "Full Width Image Hero — CPSL" }

export default function Page() {
  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <DocsHeader
        crumbs={[{ label: "Components", href: "/" }, { label: "Hero Sections", href: "/heroes" }, { label: "Full Width Image" }]}
        title="Full Width Image Hero"
        status="stable"
        description="Image-first hero — the photo takes full command, headline anchored bottom-left over a gradient scrim. Nothing else. Let the image do the work."
      />
      <div className="px-12 py-10 flex flex-col gap-6">
        <PreviewPane label="Live Preview" canvas="surface" padding={0}>
          <FullWidthImageHero />
        </PreviewPane>
        <CodeBlock code={code} language="tsx" />
        <PropsTable props={PROP_DOCS} />
      </div>
    </div>
  )
}

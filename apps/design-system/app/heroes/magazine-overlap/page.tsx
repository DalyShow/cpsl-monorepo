import { MagazineHero } from "@/components/cpsl/heroes/MagazineHero"
import { DocsHeader } from "@/components/docs/DocsHeader"
import { PreviewPane } from "@/components/docs/PreviewPane"
import { PropsTable } from "@/components/docs/PropsTable"
import CodeBlock from "@/components/CodeBlock"
import type { PropDoc } from "@/components/docs/types"

const PROP_DOCS: PropDoc[] = [
  { name: "imageSrc",  type: "string",         default: "—", description: "Right-panel photo." },
  { name: "headline",  type: "string",         default: "—", description: "Oversized Barlow Condensed headline that bleeds across the photo edge." },
  { name: "tagline",   type: "string",         default: "—", description: "Eyebrow above the headline." },
  { name: "body",      type: "string",         default: "—", description: "Lead paragraph." },
  { name: "primaryCta", type: "{label, href?}", default: "—", description: "Primary action button." },
]

const code = `<MagazineHero
  tagline="LEAGUE LAUNCH"
  headline="A NEW ERA"
  body="National 1 reshapes the top tier of US Club Soccer."
  imageSrc="/launch.jpg"
  primaryCta={{ label: "Read the story" }}
/>`

export const metadata = { title: "Magazine Overlap Hero — CPSL" }

export default function Page() {
  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <DocsHeader
        crumbs={[{ label: "Components", href: "/" }, { label: "Hero Sections", href: "/heroes" }, { label: "Magazine Overlap" }]}
        title="Magazine Overlap Hero"
        status="stable"
        description="Editorial magazine grid — huge Barlow Condensed headline bleeds over the right-hand photo panel. Great for league launches, player features, and season recaps."
      />
      <div className="px-12 py-10 flex flex-col gap-6">
        <PreviewPane label="Live Preview" canvas="surface" padding={0}>
          <MagazineHero />
        </PreviewPane>
        <CodeBlock code={code} language="tsx" />
        <PropsTable props={PROP_DOCS} />
      </div>
    </div>
  )
}

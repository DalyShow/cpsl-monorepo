import { SectionHeader } from "@/components/cpsl/heroes/SectionHeader"
import { DocsHeader } from "@/components/docs/DocsHeader"
import { PreviewPane } from "@/components/docs/PreviewPane"
import { PropsTable } from "@/components/docs/PropsTable"
import CodeBlock from "@/components/CodeBlock"
import type { PropDoc } from "@/components/docs/types"

const PROP_DOCS: PropDoc[] = [
  { name: "title",    type: "string",            required: true, description: "Section title in Barlow Condensed." },
  { name: "badge",    type: "string",            default: "—",   description: "Optional gold badge to the right of the title." },
  { name: "subtitle", type: "string",            default: "—",   description: "Muted subtitle line below the title." },
  { name: "variant",  type: '"dark" | "light"',  default: '"dark"', description: "Color scheme. Dark = navy fill with cream type; light = cream fill with navy type." },
]

const code = `<SectionHeader
  title="Standings"
  badge="2024–25 Season"
  subtitle="Select a conference and age group to view division standings"
  variant="dark"
/>`

export const metadata = { title: "Section Header — CPSL" }

export default function Page() {
  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <DocsHeader
        crumbs={[{ label: "Components", href: "/" }, { label: "Hero Sections", href: "/heroes" }, { label: "Section Header" }]}
        title="Section Header"
        status="stable"
        description="Compact module-level header — sits above data-heavy sections like Standings, Schedule, or Club Directory. Large Barlow Condensed title with optional gold badge and muted subtitle. Dark and light variants."
      />
      <div className="px-12 py-10 flex flex-col gap-6">
        <PreviewPane label="Dark Variant" canvas="surface" padding={0}>
          <SectionHeader
            title="Standings"
            badge="2024–25 Season"
            subtitle="Select a conference and age group to view division standings"
            variant="dark"
          />
        </PreviewPane>
        <PreviewPane label="Light Variant" canvas="surface" padding={0}>
          <SectionHeader
            title="Schedule"
            badge="Spring 2025"
            subtitle="Upcoming fixtures across all age groups and divisions"
            variant="light"
          />
        </PreviewPane>
        <CodeBlock code={code} language="tsx" />
        <PropsTable props={PROP_DOCS} />
      </div>
    </div>
  )
}

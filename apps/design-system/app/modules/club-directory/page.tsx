import { ClubDirectory } from "@/components/cpsl/modules/ClubDirectory"
import { DocsHeader } from "@/components/docs/DocsHeader"
import { PreviewPane } from "@/components/docs/PreviewPane"
import { PropsTable } from "@/components/docs/PropsTable"
import CodeBlock from "@/components/CodeBlock"
import { demoClubs } from "@/components/docs/demo-data"
import type { PropDoc } from "@/components/docs/types"

const PROP_DOCS: PropDoc[] = [
  { name: "clubs",       type: "Club[]", required: true, description: "Array of `{ abbr, name, city, color, tier }` objects." },
  { name: "onViewClub",  type: "(club: Club) => void", default: "—", description: "Optional click handler when a club card is selected." },
]

const code = `<ClubDirectory clubs={clubs} />`

export const metadata = { title: "Club Directory — CPSL Design System" }

export default function ClubDirectoryDocs() {
  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <DocsHeader
        crumbs={[{ label: "Components", href: "/" }, { label: "Body Modules", href: "/modules" }, { label: "Club Directory" }]}
        title="Club Directory"
        status="stable"
        description="Card grid with Avatar initials crest, club name, city, and tier Badge. Includes filter pills for ALL / EAST / WEST."
      />
      <div className="px-12 py-10 flex flex-col gap-6">
        <PreviewPane label="Live Preview" canvas="surface" padding={24}>
          <ClubDirectory clubs={demoClubs} />
        </PreviewPane>
        <CodeBlock code={code} language="tsx" />
        <PropsTable props={PROP_DOCS} />
      </div>
    </div>
  )
}

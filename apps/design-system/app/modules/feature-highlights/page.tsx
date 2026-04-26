import { FeatureHighlights } from "@/components/cpsl/modules/FeatureHighlights"
import { DocsHeader } from "@/components/docs/DocsHeader"
import { PreviewPane } from "@/components/docs/PreviewPane"
import { PropsTable } from "@/components/docs/PropsTable"
import CodeBlock from "@/components/CodeBlock"
import { demoFeatures } from "@/components/docs/demo-data"
import type { PropDoc } from "@/components/docs/types"

const PROP_DOCS: PropDoc[] = [
  { name: "features", type: "Feature[]", required: true, description: "Array of `{ icon, title, body, linkLabel? }` objects." },
]

const code = `<FeatureHighlights
  features={[
    { icon: <Clock />,  title: "Live Match Tracking",    body: "Real-time scores…",       linkLabel: "Learn more →" },
    { icon: <Users />,  title: "Club Management Portal", body: "Submit rosters…",         linkLabel: "Learn more →" },
    { icon: <Chart />,  title: "Performance Analytics",  body: "Season-long statistics…", linkLabel: "Learn more →" },
  ]}
/>`

export const metadata = { title: "Feature Highlights — CPSL Design System" }

export default function FeatureHighlightsDocs() {
  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <DocsHeader
        crumbs={[{ label: "Components", href: "/" }, { label: "Body Modules", href: "/modules" }, { label: "Feature Highlights" }]}
        title="Feature Highlights"
        status="stable"
        description="Three-column Card grid. Icon → title → description → optional link. Use for value props, league benefits, or platform features."
      />
      <div className="px-12 py-10 flex flex-col gap-6">
        <PreviewPane label="Live Preview" canvas="surface" padding={24}>
          <FeatureHighlights features={demoFeatures} />
        </PreviewPane>
        <CodeBlock code={code} language="tsx" />
        <PropsTable props={PROP_DOCS} />
      </div>
    </div>
  )
}

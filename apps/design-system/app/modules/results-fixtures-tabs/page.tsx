import { ResultsFixturesTabs } from "@/components/cpsl/modules/ResultsFixturesTabs"
import { DocsHeader } from "@/components/docs/DocsHeader"
import { PreviewPane } from "@/components/docs/PreviewPane"
import { PropsTable } from "@/components/docs/PropsTable"
import CodeBlock from "@/components/CodeBlock"
import { demoResults, demoFixtures } from "@/components/docs/demo-data"
import type { PropDoc } from "@/components/docs/types"

const PROP_DOCS: PropDoc[] = [
  { name: "teamName",    type: "string", default: "—", description: "Team scoping the results / fixtures." },
  { name: "season",      type: "string", default: "—", description: "Season label (e.g. \"2025–26\")." },
  { name: "competition", type: "string", default: "—", description: "Competition label (e.g. \"Premiership\")." },
  { name: "results",     type: "MatchResult[]", required: true, description: "Recent match results." },
  { name: "fixtures",    type: "Fixture[]", required: true, description: "Upcoming fixtures." },
]

const code = `<ResultsFixturesTabs
  teamName="Charlotte FC"
  season="2025–26"
  competition="Premiership"
  results={results}
  fixtures={fixtures}
/>`

export const metadata = { title: "Results & Fixtures Tabs — CPSL Design System" }

export default function ResultsFixturesTabsDocs() {
  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <DocsHeader
        crumbs={[{ label: "Components", href: "/" }, { label: "Body Modules", href: "/modules" }, { label: "Results & Fixtures Tabs" }]}
        title="Results & Fixtures Tabs"
        status="stable"
        description="shadcn Tabs switching between recent results and upcoming fixtures, scoped to one team and one competition."
      />
      <div className="px-12 py-10 flex flex-col gap-6">
        <PreviewPane label="Live Preview" canvas="surface" padding={24}>
          <ResultsFixturesTabs teamName="Charlotte FC" season="2025–26" competition="Premiership" results={demoResults} fixtures={demoFixtures} />
        </PreviewPane>
        <CodeBlock code={code} language="tsx" />
        <PropsTable props={PROP_DOCS} />
      </div>
    </div>
  )
}

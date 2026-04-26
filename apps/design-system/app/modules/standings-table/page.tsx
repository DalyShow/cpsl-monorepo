"use client"

import { useState } from "react"
import { StandingsTable } from "@/components/cpsl/modules/StandingsTable"
import { DocsHeader } from "@/components/docs/DocsHeader"
import { PreviewPane } from "@/components/docs/PreviewPane"
import { ControlsPanel } from "@/components/docs/ControlsPanel"
import { PropsTable } from "@/components/docs/PropsTable"
import CodeBlock from "@/components/CodeBlock"
import { generateJSX } from "@/components/docs/generate-code"
import { demoStandings } from "@/components/docs/demo-data"
import type { Control, ControlsState, PropDoc } from "@/components/docs/types"

const CONTROLS: Control[] = [
  { type: "select", prop: "promotionSpots", label: "Promotion Spots", options: ["0", "1", "2", "3"] as const, default: "2", description: "Top-N rows highlighted as promotion places." },
]

const PROP_DOCS: PropDoc[] = [
  { name: "rows",           type: "StandingRow[]", required: true, description: "Rows in current standings order." },
  { name: "promotionSpots", type: "number", default: "2", description: "How many top rows to highlight." },
]

const DEFAULT_VALUES: ControlsState = Object.fromEntries(CONTROLS.map((c) => [c.prop, c.default as string | boolean]))

export default function StandingsTableDocs() {
  const [v, setV] = useState<ControlsState>(DEFAULT_VALUES)
  const set = (p: string, val: string | boolean) => setV((prev) => ({ ...prev, [p]: val }))
  const code = generateJSX("StandingsTable", CONTROLS, v, "{ rows={rows} }")

  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <DocsHeader
        crumbs={[{ label: "Components", href: "/" }, { label: "Body Modules", href: "/modules" }, { label: "Standings Table" }]}
        title="Standings Table"
        status="stable"
        description="shadcn Table skinned with CPSL tokens. Leader row highlighted, points in bold, configurable promotion spots."
      />
      <div className="px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 mb-10">
          <div className="flex flex-col gap-6">
            <PreviewPane label="Live Preview" canvas="white" padding={24}>
              <StandingsTable rows={demoStandings} promotionSpots={parseInt(v.promotionSpots as string, 10)} />
            </PreviewPane>
            <CodeBlock code={code} language="tsx" />
          </div>
          <ControlsPanel controls={CONTROLS} values={v} onChange={set} onReset={() => setV(DEFAULT_VALUES)} />
        </div>
        <PropsTable props={PROP_DOCS} />
      </div>
    </div>
  )
}

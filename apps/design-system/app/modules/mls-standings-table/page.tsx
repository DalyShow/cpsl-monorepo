"use client"

import { useState } from "react"
import { StandingsTable as MLSStandingsTable } from "@/components/cpsl/modules/MLSStandingsTable"
import { DocsHeader } from "@/components/docs/DocsHeader"
import { PreviewPane } from "@/components/docs/PreviewPane"
import { ControlsPanel } from "@/components/docs/ControlsPanel"
import { PropsTable } from "@/components/docs/PropsTable"
import CodeBlock from "@/components/CodeBlock"
import { generateJSX } from "@/components/docs/generate-code"
import type { Control, ControlsState, PropDoc } from "@/components/docs/types"

const CONTROLS: Control[] = [
  { type: "text", prop: "seasonLabel", label: "Season Label", default: "2024–25 Season" },
]

const PROP_DOCS: PropDoc[] = [
  { name: "seasonLabel", type: "string", default: '"2024–25 Season"', description: "Season label shown in the toolbar." },
]

const DEFAULT_VALUES: ControlsState = Object.fromEntries(CONTROLS.map((c) => [c.prop, c.default as string | boolean]))

export default function MLSStandingsTableDocs() {
  const [v, setV] = useState<ControlsState>(DEFAULT_VALUES)
  const set = (p: string, val: string | boolean) => setV((prev) => ({ ...prev, [p]: val }))
  const code = generateJSX("MLSStandingsTable", CONTROLS, v)

  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <DocsHeader
        crumbs={[{ label: "Components", href: "/" }, { label: "Body Modules", href: "/modules" }, { label: "MLS-Style Standings" }]}
        title="MLS-Style Standings"
        status="stable"
        description="Full-bleed dark standings block with conference tabs. Barlow Condensed headlines — gold for PTS, crimson for negative GD. First-place row marked with a 3px gold left border."
      />
      <div className="px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 mb-10">
          <div className="flex flex-col gap-6">
            <PreviewPane label="Live Preview" canvas="surface">
              <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "#E2E8F0" }}>
                <MLSStandingsTable seasonLabel={v.seasonLabel as string} />
              </div>
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

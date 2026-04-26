"use client"

import { useState } from "react"
import { MatchdayBlock } from "@/components/cpsl/modules/MatchdayBlock"
import { DocsHeader } from "@/components/docs/DocsHeader"
import { PreviewPane } from "@/components/docs/PreviewPane"
import { ControlsPanel } from "@/components/docs/ControlsPanel"
import { PropsTable } from "@/components/docs/PropsTable"
import CodeBlock from "@/components/CodeBlock"
import { generateJSX } from "@/components/docs/generate-code"
import type { Control, ControlsState, PropDoc } from "@/components/docs/types"

const CONTROLS: Control[] = [
  { type: "text", prop: "seasonLabel", label: "Season Label", default: "2026–2027 SEASON · MATCHDAY 18" },
]

const PROP_DOCS: PropDoc[] = [
  { name: "seasonLabel", type: "string", default: '"2026–2027 SEASON · MATCHDAY 18"', description: "Toolbar label." },
]

const DEFAULT_VALUES: ControlsState = Object.fromEntries(CONTROLS.map((c) => [c.prop, c.default as string | boolean]))

export default function MatchdayBlockDocs() {
  const [v, setV] = useState<ControlsState>(DEFAULT_VALUES)
  const set = (p: string, val: string | boolean) => setV((prev) => ({ ...prev, [p]: val }))
  const code = generateJSX("MatchdayBlock", CONTROLS, v)

  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <DocsHeader
        crumbs={[{ label: "Components", href: "/" }, { label: "Body Modules", href: "/modules" }, { label: "Matchday Block" }]}
        title="Matchday Block"
        status="stable"
        description="Conference-scoped matchday view. Dropdown selects active conference. Live matches surface a red accent bar and a LIVE badge in the toolbar."
      />
      <div className="px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 mb-10">
          <div className="flex flex-col gap-6">
            <PreviewPane label="Live Preview" canvas="surface">
              <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "#1E2D45" }}>
                <MatchdayBlock seasonLabel={v.seasonLabel as string} />
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

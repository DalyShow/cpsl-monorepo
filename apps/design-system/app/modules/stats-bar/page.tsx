"use client"

import { useState } from "react"
import { StatsBar } from "@/components/cpsl/modules/StatsBar"
import { DocsHeader } from "@/components/docs/DocsHeader"
import { PreviewPane } from "@/components/docs/PreviewPane"
import { ControlsPanel } from "@/components/docs/ControlsPanel"
import { PropsTable } from "@/components/docs/PropsTable"
import CodeBlock from "@/components/CodeBlock"
import { generateJSX } from "@/components/docs/generate-code"
import type { Control, ControlsState, PropDoc } from "@/components/docs/types"

const BG_PRESETS = ["#091628", "#091540", "#0A1628", "#1E2D45"] as const

const CONTROLS: Control[] = [
  { type: "select", prop: "background", label: "Background", options: BG_PRESETS, default: "#091628", description: "Hex value — pass any color to the component." },
]

const PROP_DOCS: PropDoc[] = [
  { name: "stats",      type: "StatItem[]", default: "—", description: "Array of `{ value, label }` items. Falls back to a 5-stat demo set." },
  { name: "background", type: "string", default: '"#091628"', description: "Any valid CSS color." },
]

const DEFAULT_VALUES: ControlsState = Object.fromEntries(CONTROLS.map((c) => [c.prop, c.default as string | boolean]))

export default function StatsBarDocs() {
  const [v, setV] = useState<ControlsState>(DEFAULT_VALUES)
  const set = (p: string, val: string | boolean) => setV((prev) => ({ ...prev, [p]: val }))
  const code = generateJSX("StatsBar", CONTROLS, v)

  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <DocsHeader
        crumbs={[{ label: "Components", href: "/" }, { label: "Body Modules", href: "/modules" }, { label: "League Stats Bar" }]}
        title="League Stats Bar"
        status="stable"
        description="Full-width counter strip. Barlow Condensed numbers command attention. Sits naturally directly below a hero."
      />
      <div className="px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 mb-10">
          <div className="flex flex-col gap-6">
            <PreviewPane label="Live Preview" canvas="surface">
              <div className="rounded-2xl overflow-hidden">
                <StatsBar background={v.background as string} />
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

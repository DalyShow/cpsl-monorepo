"use client"

import { useState } from "react"
import { SkeletonLoader, type SkeletonVariant } from "@/components/cpsl/modules/SkeletonLoader"
import { DocsHeader } from "@/components/docs/DocsHeader"
import { PreviewPane } from "@/components/docs/PreviewPane"
import { ControlsPanel } from "@/components/docs/ControlsPanel"
import { PropsTable } from "@/components/docs/PropsTable"
import CodeBlock from "@/components/CodeBlock"
import { generateJSX } from "@/components/docs/generate-code"
import type { Control, ControlsState, PropDoc } from "@/components/docs/types"

const VARIANTS = ["card-grid-table", "card-grid", "table"] as const

const CONTROLS: Control[] = [
  { type: "select", prop: "variant",    label: "Variant",     options: VARIANTS, default: "card-grid-table" },
  { type: "text",   prop: "cardCount",  label: "Card Count",  default: "3" },
  { type: "text",   prop: "tableRows",  label: "Table Rows",  default: "4" },
]

const PROP_DOCS: PropDoc[] = [
  { name: "variant",   type: '"card-grid" | "table" | "card-grid-table"', default: '"card-grid-table"', description: "Layout variant." },
  { name: "cardCount", type: "number", default: "3", description: "Number of skeleton cards." },
  { name: "tableRows", type: "number", default: "4", description: "Number of skeleton table rows." },
]

const DEFAULT_VALUES: ControlsState = Object.fromEntries(CONTROLS.map((c) => [c.prop, c.default as string | boolean]))

export default function SkeletonLoaderDocs() {
  const [v, setV] = useState<ControlsState>(DEFAULT_VALUES)
  const set = (p: string, val: string | boolean) => setV((prev) => ({ ...prev, [p]: val }))
  const code = generateJSX("SkeletonLoader", CONTROLS, v)

  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <DocsHeader
        crumbs={[{ label: "Components", href: "/" }, { label: "Body Modules", href: "/modules" }, { label: "Skeleton Loader" }]}
        title="Skeleton Loader"
        status="stable"
        description="shadcn Skeleton shimmer applied to a card grid, table rows, or both. Drop in while async data loads."
      />
      <div className="px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 mb-10">
          <div className="flex flex-col gap-6">
            <PreviewPane label="Live Preview" canvas="white" padding={24}>
              <SkeletonLoader
                variant={v.variant as SkeletonVariant}
                cardCount={parseInt(v.cardCount as string, 10) || 0}
                tableRows={parseInt(v.tableRows as string, 10) || 0}
              />
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

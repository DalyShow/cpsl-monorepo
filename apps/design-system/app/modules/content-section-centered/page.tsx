"use client"

import { useState } from "react"
import { ContentSectionCentered } from "@/components/cpsl/modules/ContentSectionCentered"
import { DocsHeader } from "@/components/docs/DocsHeader"
import { PreviewPane } from "@/components/docs/PreviewPane"
import { ControlsPanel } from "@/components/docs/ControlsPanel"
import { PropsTable } from "@/components/docs/PropsTable"
import CodeBlock from "@/components/CodeBlock"
import { generateJSX } from "@/components/docs/generate-code"
import type { Control, ControlsState, PropDoc } from "@/components/docs/types"

const BACKGROUNDS = ["cream", "white", "surface", "navy", "gold"] as const
const COLUMNS    = ["1", "2"] as const

const CONTROLS: Control[] = [
  { type: "select", prop: "background", label: "Background", options: BACKGROUNDS, default: "cream" },
  { type: "select", prop: "columns",    label: "Columns",    options: COLUMNS,     default: "2", description: "Body copy column count." },
]

const PROP_DOCS: PropDoc[] = [
  { name: "eyebrow",     type: "string", default: "—", description: "Small uppercase label above the heading." },
  { name: "heading",     type: "string", default: "—", description: "Main display heading." },
  { name: "image",       type: "{ src: string; alt?: string }", default: "—", description: "Optional image below the heading." },
  { name: "lottie",      type: "LottieMedia", default: "—", description: "Optional Lottie animation. Overrides `image` if both provided." },
  { name: "lead",        type: "string", default: "—", description: "Lead paragraph centered below the heading." },
  { name: "paragraphs",  type: "string[]", default: "—", description: "Body paragraphs. Splits into 2 columns at lg by default." },
  { name: "background",  type: '"cream" | "white" | "surface" | "navy" | "gold"', default: '"cream"', description: "Surface variant." },
  { name: "columns",     type: "1 | 2", default: "2", description: "Body-copy column count." },
  { name: "bottomImage", type: "{ src: string; alt?: string }", default: "—", description: "Optional image at the bottom of the section." },
]

const DEFAULT_VALUES: ControlsState = Object.fromEntries(CONTROLS.map((c) => [c.prop, c.default as string | boolean]))

export default function ContentSectionCenteredDocs() {
  const [v, setV] = useState<ControlsState>(DEFAULT_VALUES)
  const set = (p: string, val: string | boolean) => setV((prev) => ({ ...prev, [p]: val }))
  const code = generateJSX("ContentSectionCentered", CONTROLS, v)

  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <DocsHeader
        crumbs={[{ label: "Components", href: "/" }, { label: "Body Modules", href: "/modules" }, { label: "Content Section: Centered" }]}
        title="Content Section: Centered"
        status="stable"
        description="Full-width centered section. Eyebrow → heading → optional image/lottie → lead → divider → body copy. Supports single or two-column body."
      />
      <div className="px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 mb-10">
          <div className="flex flex-col gap-6">
            <PreviewPane label="Live Preview" canvas={v.background === "navy" ? "navy" : "surface"}>
              <ContentSectionCentered
                background={v.background as "white" | "surface" | "cream" | "navy" | "gold"}
                columns={parseInt(v.columns as string, 10) as 1 | 2}
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

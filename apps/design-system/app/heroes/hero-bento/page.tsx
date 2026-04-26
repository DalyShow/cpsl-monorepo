"use client"

import { useState } from "react"
import { HeroBento } from "@cpsl/ui"
import { DocsHeader } from "@/components/docs/DocsHeader"
import { PreviewPane } from "@/components/docs/PreviewPane"
import { ControlsPanel } from "@/components/docs/ControlsPanel"
import { PropsTable } from "@/components/docs/PropsTable"
import CodeBlock from "@/components/CodeBlock"
import { generateJSX } from "@/components/docs/generate-code"
import type { Control, ControlsState, PropDoc } from "@/components/docs/types"

const CONTROLS: Control[] = [
  { type: "text",     prop: "eyebrow",     label: "Eyebrow",     default: "2026–2027 SEASON" },
  { type: "text",     prop: "headline",    label: "Headline",    default: "WHERE COLLEGE COACHES SCOUT NEXT." },
  { type: "textarea", prop: "description", label: "Description", default: "Three showcases per year. NCSA-published feeds for every fixture. 180+ college programs in attendance last cycle." },
  { type: "text",     prop: "ctaLabel",    label: "CTA Label",   default: "View showcases" },
  { type: "text",     prop: "ctaHref",     label: "CTA URL",     default: "/showcases" },
  { type: "text",     prop: "badge",       label: "Badge Value", default: "180+",       description: "Optional gold proof-point. Leave blank to hide." },
  { type: "text",     prop: "badgeLabel",  label: "Badge Label", default: "College programs" },
  { type: "text",     prop: "heroImage",   label: "Hero Image",  default: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1400&q=85", description: "URL of the large top-right photo." },
  { type: "text",     prop: "subImage",    label: "Sub Image",   default: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&q=85",  description: "URL of the smaller bottom-right photo." },
]

const PROP_DOCS: PropDoc[] = [
  { name: "eyebrow",     type: "string", default: '"2026–2027 SEASON"',                description: "Small uppercase label above the headline." },
  { name: "headline",    type: "string", default: '"WHERE COLLEGE COACHES SCOUT NEXT."', description: "Main headline rendered in Barlow Condensed." },
  { name: "description", type: "string", default: "—",                                  description: "Supporting paragraph beneath the headline." },
  { name: "ctaLabel",    type: "string", default: '"View showcases"',                   description: "Pill button label." },
  { name: "ctaHref",     type: "string", default: '"/showcases"',                       description: "Pill button destination." },
  { name: "heroImage",   type: "string", default: "—",                                  description: "URL of the large top-right photo." },
  { name: "subImage",    type: "string", default: "—",                                  description: "URL of the smaller bottom-right photo." },
  { name: "badge",       type: "string", default: '"180+"',                             description: "Gold proof-point value. Pass empty string to hide." },
  { name: "badgeLabel",  type: "string", default: '"College programs"',                 description: "Small uppercase label beneath the badge value." },
]

const DEFAULT_VALUES: ControlsState = Object.fromEntries(CONTROLS.map((c) => [c.prop, c.default as string | boolean]))

export default function HeroBentoDocs() {
  const [v, setV] = useState<ControlsState>(DEFAULT_VALUES)
  const set = (p: string, val: string | boolean) => setV((prev) => ({ ...prev, [p]: val }))
  const code = generateJSX("HeroBento", CONTROLS, v)

  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <DocsHeader
        crumbs={[{ label: "Components", href: "/" }, { label: "Hero Sections", href: "/heroes" }, { label: "Hero Bento" }]}
        title="Hero Bento"
        status="stable"
        description="Contained bento-style hero (~640px tall, not full viewport). Cream text tile + two stacked photos with a floating gold proof-point badge."
      />
      <div className="px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 mb-10">
          <div className="flex flex-col gap-6">
            <PreviewPane label="Live Preview" canvas="navy" padding={0}>
              <HeroBento
                eyebrow={v.eyebrow as string}
                headline={v.headline as string}
                description={v.description as string}
                ctaLabel={v.ctaLabel as string}
                ctaHref={v.ctaHref as string}
                heroImage={v.heroImage as string}
                subImage={v.subImage as string}
                badge={v.badge as string}
                badgeLabel={v.badgeLabel as string}
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

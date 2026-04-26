"use client"

import { useState } from "react"
import { HeroBento, type HeroBentoBadge } from "@cpsl/ui"
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
  { type: "select",   prop: "badgeCount",  label: "Badges",      options: ["0", "1", "2", "3"] as const, default: "1", description: "How many badges to render (max 3)." },
  { type: "switch",   prop: "showSubImage", label: "Sub Image",  default: false, description: "When off, hero photo spans the full right column." },
  { type: "text",     prop: "heroImage",   label: "Hero Image",  default: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1400&q=85" },
  { type: "text",     prop: "subImage",    label: "Sub Image URL", default: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&q=85" },
]

const DEMO_BADGES: HeroBentoBadge[] = [
  { value: "180+", label: "College programs" },
  { value: "14",   label: "Member clubs"     },
  { value: "38",   label: "Match days"       },
]

const PROP_DOCS: PropDoc[] = [
  { name: "eyebrow",     type: "string",            default: '"2026–2027 SEASON"',                description: "Small uppercase label above the headline." },
  { name: "headline",    type: "string",            default: '"WHERE COLLEGE COACHES SCOUT NEXT."', description: "Main headline rendered in Barlow Condensed." },
  { name: "description", type: "string",            default: "—",                                  description: "Supporting paragraph (32px gap below headline)." },
  { name: "ctaLabel",    type: "string",            default: '"View showcases"',                   description: "Pill button label, anchored to the bottom of the cream tile." },
  { name: "ctaHref",     type: "string",            default: '"/showcases"',                       description: "Pill button destination." },
  { name: "heroImage",   type: "string",            default: "—",                                  description: "Right-column photo. Spans both rows when subImage is omitted." },
  { name: "subImage",    type: "string",            default: "—",                                  description: "Optional second photo stacked below the hero. Omit for a single full-height photo." },
  { name: "badges",      type: "HeroBentoBadge[]",  default: "—",                                  description: "Up to 3 gold proof-point badges anchored top-right. Each: { value, label? }. On mobile they reflow into a full-width grid strip across the bottom of the photo." },
]

const DEFAULT_VALUES: ControlsState = Object.fromEntries(CONTROLS.map((c) => [c.prop, c.default as string | boolean]))

export default function HeroBentoDocs() {
  const [v, setV] = useState<ControlsState>(DEFAULT_VALUES)
  const set = (p: string, val: string | boolean) => setV((prev) => ({ ...prev, [p]: val }))

  const badgeCount = parseInt(v.badgeCount as string, 10) || 0
  const badges = DEMO_BADGES.slice(0, badgeCount)

  const code = `<HeroBento
  eyebrow=${JSON.stringify(v.eyebrow)}
  headline=${JSON.stringify(v.headline)}
  description=${JSON.stringify(v.description)}
  ctaLabel=${JSON.stringify(v.ctaLabel)}
  ctaHref=${JSON.stringify(v.ctaHref)}
  heroImage=${JSON.stringify(v.heroImage)}${v.showSubImage ? `
  subImage=${JSON.stringify(v.subImage)}` : ""}${badges.length > 0 ? `
  badges={${JSON.stringify(badges, null, 2).split("\n").join("\n  ")}}` : ""}
/>`

  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <DocsHeader
        crumbs={[{ label: "Components", href: "/" }, { label: "Hero Sections", href: "/heroes" }, { label: "Hero Bento" }]}
        title="Hero Bento"
        status="stable"
        description="Contained bento-style hero (~640px tall). Cream text tile + right-column photo, with up to three gold proof-point badges. Optional second photo stacks below the hero; otherwise the hero photo fills the full right column."
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
                subImage={v.showSubImage ? (v.subImage as string) : undefined}
                badges={badges}
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

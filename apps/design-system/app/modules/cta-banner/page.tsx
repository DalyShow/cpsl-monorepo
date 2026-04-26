"use client"

import { useState } from "react"
import { CTABanner, type CTABannerBackground } from "@/components/cpsl/modules/CTABanner"
import { DocsHeader } from "@/components/docs/DocsHeader"
import { PreviewPane } from "@/components/docs/PreviewPane"
import { ControlsPanel } from "@/components/docs/ControlsPanel"
import { PropsTable } from "@/components/docs/PropsTable"
import CodeBlock from "@/components/CodeBlock"
import { generateJSX } from "@/components/docs/generate-code"
import type { Control, ControlsState, PropDoc } from "@/components/docs/types"

const BACKGROUNDS = ["cream", "white", "surface", "navy", "gold"] as const

const CONTROLS: Control[] = [
  { type: "select", prop: "background",     label: "Background",      options: BACKGROUNDS, default: "cream", description: "Outer frame tone." },
  { type: "text",   prop: "eyebrow",        label: "Eyebrow",         default: "2025–26 Season" },
  { type: "text",   prop: "headline",       label: "Headline",        default: "REGISTER YOUR CLUB" },
  { type: "text",   prop: "headlineAccent", label: "Headline Accent", default: "BEFORE APRIL 30" },
  { type: "textarea", prop: "description",  label: "Description",     default: "Applications for the 2025–26 CPSL Premiership and Development League are now open. Secure your spot for next season before the deadline closes." },
  { type: "text",   prop: "primaryLabel",   label: "Primary CTA",     default: "Apply Now →" },
  { type: "text",   prop: "secondaryLabel", label: "Secondary CTA",   default: "Learn More" },
]

const PROP_DOCS: PropDoc[] = [
  { name: "background",     type: '"cream" | "white" | "surface" | "navy" | "gold"', default: '"cream"', description: "Outer frame tone." },
  { name: "eyebrow",        type: "string", default: '"2025–26 Season"', description: "Small uppercase label above the headline." },
  { name: "headline",       type: "string", default: '"REGISTER YOUR CLUB"', description: "Main headline (Barlow Condensed)." },
  { name: "headlineAccent", type: "string", default: '"BEFORE APRIL 30"', description: "Gold-colored second line." },
  { name: "description",    type: "string", default: "—", description: "Supporting paragraph beneath the headline." },
  { name: "primaryCta",     type: "{ label: string; href?: string }", default: "—", description: "Primary action button." },
  { name: "secondaryCta",   type: "{ label: string; href?: string }", default: "—", description: "Secondary action button." },
]

const DEFAULT_VALUES: ControlsState = Object.fromEntries(CONTROLS.map((c) => [c.prop, c.default as string | boolean]))

export default function CTABannerDocs() {
  const [v, setV] = useState<ControlsState>(DEFAULT_VALUES)
  const set = (p: string, val: string | boolean) => setV((prev) => ({ ...prev, [p]: val }))

  const code = generateJSX("CTABanner", CONTROLS, v)

  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <DocsHeader
        crumbs={[{ label: "Components", href: "/" }, { label: "Body Modules", href: "/modules" }, { label: "CTA Banner" }]}
        title="CTA Banner"
        status="stable"
        description="Full-bleed call-to-action band. Five background variants. Headline + accent line, supporting copy, primary/secondary CTAs."
      />
      <div className="px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 mb-10">
          <div className="flex flex-col gap-6">
            <PreviewPane label="Live Preview" canvas={v.background === "navy" ? "navy" : "surface"}>
              <CTABanner
                background={v.background as CTABannerBackground}
                eyebrow={v.eyebrow as string}
                headline={v.headline as string}
                headlineAccent={v.headlineAccent as string}
                description={v.description as string}
                primaryCta={{ label: v.primaryLabel as string }}
                secondaryCta={{ label: v.secondaryLabel as string }}
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

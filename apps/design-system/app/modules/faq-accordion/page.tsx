"use client"

import { useState } from "react"
import { FAQAccordion, type FAQAccordionBackground } from "@cpsl/ui"
import { DocsHeader } from "@/components/docs/DocsHeader"
import { PreviewPane } from "@/components/docs/PreviewPane"
import { ControlsPanel } from "@/components/docs/ControlsPanel"
import { PropsTable } from "@/components/docs/PropsTable"
import CodeBlock from "@/components/CodeBlock"
import { generateJSX } from "@/components/docs/generate-code"
import type { Control, ControlsState, PropDoc } from "@/components/docs/types"

const BACKGROUNDS = ["cream", "white", "surface", "navy", "gold"] as const

const CONTROLS: Control[] = [
  {
    type:    "select",
    prop:    "background",
    label:   "Background",
    options: BACKGROUNDS,
    default: "cream",
    description: "Surface tone — also drives the text-color contrast.",
  },
  {
    type:    "switch",
    prop:    "allowMultiple",
    label:   "Allow Multiple",
    default: false,
    description: "When on, multiple panels can stay open at once.",
  },
  {
    type:    "text",
    prop:    "eyebrow",
    label:   "Eyebrow",
    default: "Frequently Asked",
  },
  {
    type:    "text",
    prop:    "headline",
    label:   "Headline",
    default: "EVERYTHING YOU NEED TO KNOW",
  },
  {
    type:    "textarea",
    prop:    "intro",
    label:   "Intro",
    default: "Common questions about the National 1 League — admissions, season format, eligibility, and what to expect from the CPSL competition year.",
  },
]

const PROP_DOCS: PropDoc[] = [
  { name: "background",    type: '"cream" | "white" | "surface" | "navy" | "gold"', default: '"cream"', description: "Surface tone. Drives text-color contrast (light vs dark)." },
  { name: "allowMultiple", type: "boolean", default: "false", description: "Keep multiple panels open simultaneously." },
  { name: "eyebrow",       type: "string",  default: '"Frequently Asked"', description: "Small uppercase label above the headline." },
  { name: "headline",      type: "string",  default: '"EVERYTHING YOU NEED TO KNOW"', description: "Section headline rendered in Barlow Condensed." },
  { name: "intro",         type: "string",  default: "—", description: "Optional paragraph below the headline. Pass empty string to hide." },
  { name: "items",         type: "FAQItem[]", default: "—", description: "Array of `{ question, answer }` objects. Falls back to a built-in demo set." },
]

const DEFAULT_VALUES: ControlsState = Object.fromEntries(
  CONTROLS.map((c) => [c.prop, c.default as string | boolean])
)

export default function FAQAccordionDocs() {
  const [values, setValues] = useState<ControlsState>(DEFAULT_VALUES)

  const handleChange = (prop: string, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [prop]: value }))
  }
  const handleReset = () => setValues(DEFAULT_VALUES)

  const codeSnippet = generateJSX("FAQAccordion", CONTROLS, values)

  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <DocsHeader
        crumbs={[
          { label: "Components", href: "/" },
          { label: "Body Modules", href: "/modules" },
          { label: "FAQ Accordion" },
        ]}
        title="FAQ Accordion"
        status="stable"
        description="Question-and-answer module with expand/collapse interaction. Five background variants, single-open by default with optional multi-open mode."
      />

      <div className="px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 mb-10">
          <div className="flex flex-col gap-6">
            <PreviewPane label="Live Preview" canvas={values.background === "navy" ? "navy" : "surface"}>
              <FAQAccordion
                background={values.background as FAQAccordionBackground}
                allowMultiple={values.allowMultiple as boolean}
                eyebrow={values.eyebrow as string}
                headline={values.headline as string}
                intro={values.intro as string}
              />
            </PreviewPane>

            <CodeBlock code={codeSnippet} language="tsx" />
          </div>

          <ControlsPanel
            controls={CONTROLS}
            values={values}
            onChange={handleChange}
            onReset={handleReset}
          />
        </div>

        <PropsTable props={PROP_DOCS} />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-2xl p-6" style={{ borderColor: "#E2E8F0", background: "white" }}>
            <div className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "#697279" }}>
              Accessibility
            </div>
            <ul className="text-sm space-y-1.5 leading-relaxed" style={{ color: "#475569" }}>
              <li>• Triggers use <code className="font-mono text-xs">aria-expanded</code> + <code className="font-mono text-xs">aria-controls</code> for screen readers.</li>
              <li>• Panels are <code className="font-mono text-xs">role=&quot;region&quot;</code> labeled by the trigger button.</li>
              <li>• Visible focus ring (gold) on keyboard focus.</li>
              <li>• Respects <code className="font-mono text-xs">prefers-reduced-motion</code>.</li>
            </ul>
          </div>

          <div className="border rounded-2xl p-6" style={{ borderColor: "#E2E8F0", background: "white" }}>
            <div className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "#697279" }}>
              Usage Notes
            </div>
            <ul className="text-sm space-y-1.5 leading-relaxed" style={{ color: "#475569" }}>
              <li>• Theme is scoped via CSS custom properties — multiple instances on one page don&apos;t collide.</li>
              <li>• Single-open is the default; <code className="font-mono text-xs">allowMultiple</code> opts into accordion-with-multi behavior.</li>
              <li>• Headlines use Barlow Condensed (already loaded at the app level).</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

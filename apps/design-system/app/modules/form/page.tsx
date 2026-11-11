"use client"

import { useState } from "react"
import { FormBlock, type FormBlockBackground } from "@cpsl/ui"
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
    description: "Surface tone — also drives field and text contrast.",
  },
  { type: "text",     prop: "eyebrow",        label: "Eyebrow",         default: "Get in touch" },
  { type: "text",     prop: "headline",       label: "Headline",        default: "CONTACT THE LEAGUE" },
  {
    type:    "textarea",
    prop:    "intro",
    label:   "Intro",
    default: "Questions about membership, fixtures or anything else — send us a note and the league office will reply within two working days.",
  },
  { type: "text",     prop: "submitLabel",    label: "Submit Label",    default: "Send message" },
  { type: "text",     prop: "successTitle",   label: "Success Title",   default: "Message sent" },
  { type: "textarea", prop: "successMessage", label: "Success Message", default: "Thanks — we've got it and will be in touch soon." },
]

const PROP_DOCS: PropDoc[] = [
  { name: "background",     type: '"cream" | "white" | "surface" | "navy" | "gold"', default: '"cream"', description: "Surface tone. Drives text, field and focus colours." },
  { name: "eyebrow",        type: "string",      default: '"Get in touch"', description: "Small uppercase label above the headline. Empty string hides it." },
  { name: "headline",       type: "string",      default: '"CONTACT THE LEAGUE"', description: "Section headline in Barlow Condensed." },
  { name: "intro",          type: "string",      default: "—", description: "Optional paragraph below the headline." },
  { name: "fields",         type: "FormField[]", default: "demo set", description: "`{ name, label, type, required?, placeholder?, options?, width?, helpText? }`. Types: text, email, tel, textarea, select, checkbox. `width: \"half\"` pairs fields from 640px up." },
  { name: "submitLabel",    type: "string",      default: '"Send message"', description: "Text on the submit pill." },
  { name: "successTitle",   type: "string",      default: '"Message sent"', description: "Heading shown in place of the form after a successful submit." },
  { name: "successMessage", type: "string",      default: "—", description: "Copy under the success heading." },
  { name: "action",         type: "(prev, data: FormData) => Promise<FormBlockState>", default: "demo (fake success)", description: "Server action that delivers the submission. Return `{ error }` or `{ fieldErrors: { [name]: msg } }` to show messages; `{ success: true }` swaps in the success state." },
  { name: "formKey",        type: "string",      default: "—", description: "Sent to the action as hidden `_formKey`. The website uses `<documentId>:<blockKey>` so the server can look up recipients in Sanity." },
]

const DEFAULT_VALUES: ControlsState = Object.fromEntries(
  CONTROLS.map((c) => [c.prop, c.default as string | boolean])
)

export default function FormDocs() {
  const [values, setValues] = useState<ControlsState>(DEFAULT_VALUES)
  // Remount the preview after reset so the success state clears.
  const [instance, setInstance] = useState(0)

  const handleChange = (prop: string, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [prop]: value }))
  }
  const handleReset = () => {
    setValues(DEFAULT_VALUES)
    setInstance((n) => n + 1)
  }

  const codeSnippet = generateJSX("FormBlock", CONTROLS, values)

  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <DocsHeader
        crumbs={[
          { label: "Components", href: "/" },
          { label: "Body Modules", href: "/modules" },
          { label: "Form" },
        ]}
        title="Form"
        status="beta"
        description="Drop-in form module. Editors build the fields in Sanity (text, email, phone, long text, dropdown, checkbox); submissions are emailed via Resend to the recipients set on the block. Submitting here shows the success state without sending anything."
      />

      <div className="px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 mb-10">
          <div className="flex flex-col gap-6">
            <PreviewPane label="Live Preview" canvas={values.background === "navy" ? "navy" : "surface"}>
              <FormBlock
                key={instance}
                background={values.background as FormBlockBackground}
                eyebrow={values.eyebrow as string}
                headline={values.headline as string}
                intro={values.intro as string}
                submitLabel={values.submitLabel as string}
                successTitle={values.successTitle as string}
                successMessage={values.successMessage as string}
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
              <li>• Every control has a real <code className="font-mono text-xs">&lt;label&gt;</code>; optional fields are marked “(optional)” rather than starring required ones.</li>
              <li>• Help text and errors are linked with <code className="font-mono text-xs">aria-describedby</code>; invalid fields get <code className="font-mono text-xs">aria-invalid</code>.</li>
              <li>• The form-level error is <code className="font-mono text-xs">role=&quot;alert&quot;</code>; the success panel is <code className="font-mono text-xs">role=&quot;status&quot;</code>.</li>
              <li>• Inputs are 16px on phones so iOS Safari doesn&apos;t zoom on focus.</li>
            </ul>
          </div>

          <div className="border rounded-2xl p-6" style={{ borderColor: "#E2E8F0", background: "white" }}>
            <div className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "#697279" }}>
              Usage Notes
            </div>
            <ul className="text-sm space-y-1.5 leading-relaxed" style={{ color: "#475569" }}>
              <li>• Single column on phones; half-width fields pair up from 640px.</li>
              <li>• Inputs keep their values when the server returns an error — submission goes through <code className="font-mono text-xs">onSubmit</code>, not the form <code className="font-mono text-xs">action</code> attribute, so React doesn&apos;t reset the fields.</li>
              <li>• Includes a hidden honeypot field (<code className="font-mono text-xs">company_website</code>); the website action drops submissions that fill it.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client";

import { useState } from "react";
import { AlertBar, type AlertBarTone } from "@cpsl/ui";
import { DocsHeader } from "@/components/docs/DocsHeader";
import { PreviewPane } from "@/components/docs/PreviewPane";
import { ControlsPanel } from "@/components/docs/ControlsPanel";
import { PropsTable } from "@/components/docs/PropsTable";
import CodeBlock from "@/components/CodeBlock";
import { generateJSX } from "@/components/docs/generate-code";
import type { Control, ControlsState, PropDoc } from "@/components/docs/types";

const TONES = ["info", "warning", "success", "danger", "neutral"] as const;

const CONTROLS: Control[] = [
  {
    type:    "select",
    prop:    "tone",
    label:   "Tone",
    options: TONES,
    default: "info",
    description: "Palette variant — pick by intent (info / warning / success / danger / neutral).",
  },
  {
    type:    "text",
    prop:    "label",
    label:   "Label",
    default: "Update",
    description: "Short caps tag at the left. Blank to hide.",
  },
  {
    type:    "text",
    prop:    "text",
    label:   "Message",
    default: "Registration for the 2026–2027 season closes on August 31.",
  },
  {
    type:    "text",
    prop:    "linkLabel",
    label:   "Link Label",
    default: "Register now",
  },
  {
    type:    "text",
    prop:    "linkHref",
    label:   "Link URL",
    default: "/apply",
  },
  {
    type:    "switch",
    prop:    "linkNewWindow",
    label:   "Open link in new window",
    default: false,
  },
];

const PROP_DOCS: PropDoc[] = [
  { name: "tone",          type: '"info" | "warning" | "success" | "danger" | "neutral"', default: '"info"', description: "Palette variant." },
  { name: "label",         type: "string",  default: "—",     description: "Optional caps tag at the left (e.g. \"Update\", \"New\")." },
  { name: "text",          type: "string",  default: "—",     description: "The alert copy. Required." },
  { name: "linkLabel",     type: "string",  default: "—",     description: "Right-side link text. Omit to hide the link entirely." },
  { name: "linkHref",      type: "string",  default: "—",     description: "Link destination. Required whenever linkLabel is set." },
  { name: "linkNewWindow", type: "boolean", default: "false", description: "Open the link in a new browser tab." },
];

const DEFAULT_VALUES: ControlsState = Object.fromEntries(
  CONTROLS.map((c) => [c.prop, c.default as string | boolean])
);

export default function AlertBarDocs() {
  const [values, setValues] = useState<ControlsState>(DEFAULT_VALUES);

  const handleChange = (prop: string, value: string | boolean) =>
    setValues((prev) => ({ ...prev, [prop]: value }));
  const handleReset = () => setValues(DEFAULT_VALUES);

  const codeSnippet = generateJSX("AlertBar", CONTROLS, values);

  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <DocsHeader
        crumbs={[
          { label: "Components", href: "/" },
          { label: "Body Modules", href: "/modules" },
          { label: "Alert Bar" },
        ]}
        title="Alert Bar"
        status="stable"
        description="Slim, edge-to-edge alert with a label, message, and optional link. Drop it into any page's sections list — five tone variants for different intents."
      />

      <div className="px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 mb-10">
          <div className="flex flex-col gap-6">
            <PreviewPane label="Live Preview" canvas="surface" padding={0}>
              <AlertBar
                tone={values.tone as AlertBarTone}
                label={values.label as string}
                text={values.text as string}
                linkLabel={values.linkLabel as string}
                linkHref={values.linkHref as string}
                linkNewWindow={values.linkNewWindow as boolean}
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

        {/* ── Tone matrix ────────────────────────────────────────────── */}
        <section className="mb-10">
          <div className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "#94A3B8" }}>
            Variants
          </div>
          <h2 className="text-lg font-semibold mb-4" style={{ color: "#091628" }}>All five tones</h2>
          <div className="flex flex-col gap-3">
            {TONES.map((t) => (
              <PreviewPane key={t} label={`tone="${t}"`} canvas="surface" padding={0}>
                <AlertBar
                  tone={t}
                  label={t.toUpperCase()}
                  text={`This is a ${t} alert. Register for the 2026–2027 season before it closes.`}
                  linkLabel="Register now"
                  linkHref="/apply"
                />
              </PreviewPane>
            ))}
          </div>
        </section>

        {/* ── No-link + no-label ─────────────────────────────────────── */}
        <section className="mb-10">
          <div className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "#94A3B8" }}>
            Minimal
          </div>
          <h2 className="text-lg font-semibold mb-4" style={{ color: "#091628" }}>Just a message</h2>
          <PreviewPane label="No label, no link" canvas="surface" padding={0}>
            <AlertBar
              text="Field 3 at Matthews Sportsplex is closed for maintenance this weekend."
            />
          </PreviewPane>
        </section>

        <PropsTable props={PROP_DOCS} />
      </div>
    </div>
  );
}

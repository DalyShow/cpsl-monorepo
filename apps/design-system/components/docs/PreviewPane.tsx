"use client"

import { ReactNode } from "react"

interface PreviewPaneProps {
  children:   ReactNode
  /** Optional label shown above the preview */
  label?:     string
  /** Padding around the rendered component (px). Default 0 — component sets its own. */
  padding?:   number
  /** Background of the preview canvas */
  canvas?:    "checker" | "white" | "surface" | "navy"
}

const canvasBg: Record<NonNullable<PreviewPaneProps["canvas"]>, string> = {
  checker: "transparent",
  white:   "#FFFFFF",
  surface: "#F4F6FA",
  navy:    "#091628",
}

export function PreviewPane({ children, label, padding = 0, canvas = "surface" }: PreviewPaneProps) {
  const isChecker = canvas === "checker"
  return (
    <div className="border rounded-2xl overflow-hidden" style={{ borderColor: "#E2E8F0" }}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b" style={{ background: "#F4F6FA", borderColor: "#E2E8F0" }}>
        <div className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#697279" }}>
          {label ?? "Preview"}
        </div>
        <div className="flex items-center gap-1.5">
          <span style={{ width: 8, height: 8, borderRadius: 999, background: "#E74552", opacity: 0.5 }} />
          <span style={{ width: 8, height: 8, borderRadius: 999, background: "#C9A74C", opacity: 0.5 }} />
          <span style={{ width: 8, height: 8, borderRadius: 999, background: "#10B981", opacity: 0.5 }} />
        </div>
      </div>
      <div
        style={{
          padding,
          background: isChecker
            ? `repeating-conic-gradient(#F4F6FA 0% 25%, #FFFFFF 0% 50%) 50% / 16px 16px`
            : canvasBg[canvas],
        }}
      >
        {children}
      </div>
    </div>
  )
}

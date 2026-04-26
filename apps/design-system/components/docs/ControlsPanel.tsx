"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import type { Control, ControlsState } from "./types"

interface ControlsPanelProps {
  controls: Control[]
  values:   ControlsState
  onChange: (prop: string, value: string | boolean) => void
  onReset?: () => void
}

export function ControlsPanel({ controls, values, onChange, onReset }: ControlsPanelProps) {
  return (
    <div className="border rounded-2xl overflow-hidden" style={{ borderColor: "#E2E8F0" }}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b" style={{ background: "#F4F6FA", borderColor: "#E2E8F0" }}>
        <div className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#697279" }}>
          Controls
        </div>
        {onReset && (
          <Button variant="ghost" size="sm" onClick={onReset} className="h-6 px-2 text-[11px] font-medium">
            Reset
          </Button>
        )}
      </div>

      <div className="divide-y" style={{ borderColor: "#F1F5F9" }}>
        {controls.map((c) => (
          <div key={c.prop} className="px-4 py-3 grid grid-cols-[140px_1fr] items-start gap-4">
            <div className="pt-1.5">
              <Label htmlFor={`ctl-${c.prop}`} className="text-xs font-semibold" style={{ color: "#091628" }}>
                {c.label}
              </Label>
              <div className="text-[10px] font-mono mt-0.5" style={{ color: "#94A3B8" }}>
                {c.prop}
              </div>
            </div>

            <div>
              {c.type === "select" && (
                <Select
                  value={values[c.prop] as string}
                  onValueChange={(v) => onChange(c.prop, v)}
                >
                  <SelectTrigger id={`ctl-${c.prop}`} className="h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {c.options.map((opt) => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {c.type === "switch" && (
                <div className="flex items-center gap-2 h-9">
                  <Switch
                    id={`ctl-${c.prop}`}
                    checked={values[c.prop] as boolean}
                    onCheckedChange={(v) => onChange(c.prop, v)}
                  />
                  <span className="text-xs" style={{ color: "#697279" }}>
                    {(values[c.prop] as boolean) ? "true" : "false"}
                  </span>
                </div>
              )}

              {c.type === "text" && (
                <Input
                  id={`ctl-${c.prop}`}
                  value={values[c.prop] as string}
                  onChange={(e) => onChange(c.prop, e.target.value)}
                  placeholder={c.placeholder}
                  className="h-9 text-sm"
                />
              )}

              {c.type === "textarea" && (
                <textarea
                  id={`ctl-${c.prop}`}
                  value={values[c.prop] as string}
                  onChange={(e) => onChange(c.prop, e.target.value)}
                  placeholder={c.placeholder}
                  rows={3}
                  className="w-full resize-y rounded-md border px-3 py-2 text-sm leading-relaxed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
                  style={{ borderColor: "#E2E8F0", color: "#091628" }}
                />
              )}

              {c.description && (
                <p className="text-xs mt-1.5" style={{ color: "#94A3B8" }}>{c.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

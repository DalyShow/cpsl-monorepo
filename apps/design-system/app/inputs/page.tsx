"use client"

import PageHeader from "@/components/PageHeader"
import Section from "@/components/Section"
import CodeBlock from "@/components/CodeBlock"
import { CPSLInput } from "@/components/cpsl/CPSLInput"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

const inputCode = `import { CPSLInput } from "@/components/cpsl/CPSLInput"

// Default
<CPSLInput label="Team Name" placeholder="e.g. Charlotte FC Academy" />

// With left icon
<CPSLInput
  label="Email"
  type="email"
  leftIcon={<MailIcon size={14} />}
  hint="We'll send your confirmation here"
/>

// Error state
<CPSLInput
  label="Email"
  type="email"
  error="Please enter a valid email address"
/>

// Disabled
<CPSLInput label="League Code" value="CPSL-2025" disabled />`

const selectCode = `import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "@/components/ui/select"

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Choose division..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="premier">Premier Division</SelectItem>
    <SelectItem value="elite">Elite Division</SelectItem>
    <SelectItem value="academy">Academy Division</SelectItem>
  </SelectContent>
</Select>`

const checkboxCode = `import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"

// Checkbox
<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms & conditions</Label>
</div>

// Radio group
<RadioGroup defaultValue="premier">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="premier" id="premier" />
    <Label htmlFor="premier">Premier Division</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="elite" id="elite" />
    <Label htmlFor="elite">Elite Division</Label>
  </div>
</RadioGroup>

// Switch
<div className="flex items-center gap-2">
  <Switch id="notifications" />
  <Label htmlFor="notifications">Match alerts</Label>
</div>`

export default function InputsPage() {
  const [switchOn, setSwitchOn] = useState(true)
  const [switchTwo, setSwitchTwo] = useState(false)
  const [switchThree, setSwitchThree] = useState(true)

  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <PageHeader
        section="05 — Components"
        title="Inputs & Form Controls"
        description="All controls are real interactive components — try clicking, typing, and toggling. Built on shadcn/ui + Radix UI primitives with CPSL design tokens."
      />

      <div className="px-12 py-12">

        {/* Text Input States */}
        <Section title="Text Input — All States">
          <div className="rounded-2xl p-8 border bg-white border-[#E2E8F0]">
            <div className="grid grid-cols-2 gap-6">
              <CPSLInput
                label="Default"
                placeholder="Enter team name…"
              />
              <CPSLInput
                label="With hint text"
                placeholder="e.g. Charlotte FC Academy"
                hint="Enter your full registered club name"
              />
              <CPSLInput
                label="With left icon"
                type="email"
                placeholder="coach@yourclub.com"
                defaultValue=""
                leftIcon={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                }
                hint="Primary contact email"
              />
              <CPSLInput
                label="With right icon"
                type="password"
                placeholder="••••••••"
                leftIcon={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                }
                rightElement={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                }
              />
              <CPSLInput
                label="Error state"
                type="email"
                defaultValue="not-an-email"
                error="Please enter a valid email address"
                leftIcon={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                }
              />
              <CPSLInput
                label="Disabled"
                value="CPSL-2025-PRE"
                disabled
                hint="League code cannot be changed"
              />
            </div>
          </div>
          <div className="mt-4">
            <CodeBlock code={inputCode} language="tsx" />
          </div>
        </Section>

        {/* Select */}
        <Section title="Select / Dropdown">
          <div className="rounded-2xl p-8 border bg-white border-[#E2E8F0]">
            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-semibold">Division</Label>
                <Select>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Choose division…" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="premier">Premier Division</SelectItem>
                    <SelectItem value="elite">Elite Division</SelectItem>
                    <SelectItem value="academy">Academy Division</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Default placeholder</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-semibold">Season</Label>
                <Select defaultValue="2025">
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2026">2025–26</SelectItem>
                    <SelectItem value="2025">2024–25</SelectItem>
                    <SelectItem value="2024">2023–24</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Pre-selected value</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-semibold text-muted-foreground">Region (disabled)</Label>
                <Select disabled>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="North Carolina" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nc">North Carolina</SelectItem>
                    <SelectItem value="sc">South Carolina</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Disabled state</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <CodeBlock code={selectCode} language="tsx" />
          </div>
        </Section>

        {/* Checkbox, Radio, Switch */}
        <Section title="Checkbox, Radio & Toggle — Interactive">
          <div className="rounded-2xl p-8 border bg-white border-[#E2E8F0]">
            <div className="flex gap-12">

              {/* Checkbox column */}
              <div className="flex flex-col gap-2 min-w-[180px]">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Checkbox</p>
                <div className="flex items-center gap-2.5">
                  <Checkbox id="cb-terms" defaultChecked />
                  <Label htmlFor="cb-terms" className="text-sm cursor-pointer">Accept terms</Label>
                </div>
                <div className="flex items-center gap-2.5">
                  <Checkbox id="cb-notify" />
                  <Label htmlFor="cb-notify" className="text-sm cursor-pointer">Match alerts</Label>
                </div>
                <div className="flex items-center gap-2.5">
                  <Checkbox id="cb-news" />
                  <Label htmlFor="cb-news" className="text-sm cursor-pointer">Newsletter</Label>
                </div>
                <div className="flex items-center gap-2.5">
                  <Checkbox id="cb-disabled" disabled />
                  <Label htmlFor="cb-disabled" className="text-sm text-muted-foreground cursor-not-allowed">Unavailable</Label>
                </div>
              </div>

              <Separator orientation="vertical" className="h-auto" />

              {/* Radio column */}
              <div className="flex flex-col gap-2 min-w-[180px]">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Radio Group</p>
                <RadioGroup defaultValue="premier" className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-2.5">
                    <RadioGroupItem value="premier" id="r-premier" />
                    <Label htmlFor="r-premier" className="text-sm cursor-pointer">Premier Division</Label>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <RadioGroupItem value="elite" id="r-elite" />
                    <Label htmlFor="r-elite" className="text-sm cursor-pointer">Elite Division</Label>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <RadioGroupItem value="academy" id="r-academy" />
                    <Label htmlFor="r-academy" className="text-sm cursor-pointer">Academy</Label>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <RadioGroupItem value="dev" id="r-dev" disabled />
                    <Label htmlFor="r-dev" className="text-sm text-muted-foreground cursor-not-allowed">Development</Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator orientation="vertical" className="h-auto" />

              {/* Switch column */}
              <div className="flex flex-col gap-2 min-w-[200px]">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Switch / Toggle</p>
                <div className="flex items-center justify-between gap-8">
                  <Label htmlFor="sw-1" className="text-sm cursor-pointer">Match alerts</Label>
                  <Switch id="sw-1" checked={switchOn} onCheckedChange={setSwitchOn} />
                </div>
                <div className="flex items-center justify-between gap-8">
                  <Label htmlFor="sw-2" className="text-sm cursor-pointer">Email digest</Label>
                  <Switch id="sw-2" checked={switchTwo} onCheckedChange={setSwitchTwo} />
                </div>
                <div className="flex items-center justify-between gap-8">
                  <Label htmlFor="sw-3" className="text-sm cursor-pointer">Live updates</Label>
                  <Switch id="sw-3" checked={switchThree} onCheckedChange={setSwitchThree} />
                </div>
                <div className="flex items-center justify-between gap-8">
                  <Label htmlFor="sw-4" className="text-sm text-muted-foreground">Unavailable</Label>
                  <Switch id="sw-4" disabled />
                </div>
              </div>

              <Separator orientation="vertical" className="h-auto" />

              {/* Textarea */}
              <div className="flex flex-col gap-2 flex-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Textarea</p>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="ta-report" className="text-sm font-semibold">Match Report</Label>
                  <Textarea
                    id="ta-report"
                    placeholder="Describe the match…"
                    defaultValue="Charlotte FC dominated from the first whistle, pressing high and winning the midfield battle convincingly."
                    className="min-h-[100px] resize-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary"
                  />
                  <p className="text-xs text-muted-foreground">Max 500 characters</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <CodeBlock code={checkboxCode} language="tsx" />
          </div>
        </Section>

        {/* Full form example */}
        <Section title="Complete Form — Register a Team">
          <div className="max-w-lg rounded-2xl p-8 border bg-white border-[#E2E8F0] shadow-sm">
            <h3 className="text-base font-bold text-foreground mb-6">Register Team for 2025–26 Season</h3>
            <div className="flex flex-col gap-5">
              <CPSLInput
                label="Team Name"
                placeholder="e.g. Charlotte FC Academy"
                hint="Enter your full registered club name"
              />

              <CPSLInput
                label="Head Coach Email"
                type="email"
                placeholder="coach@yourclub.com"
                leftIcon={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                }
              />

              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-semibold">Division</Label>
                <Select>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Choose division…" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="premier">Premier Division</SelectItem>
                    <SelectItem value="elite">Elite Division</SelectItem>
                    <SelectItem value="academy">Academy Division</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="ta-notes" className="text-sm font-semibold">Additional Notes</Label>
                <Textarea
                  id="ta-notes"
                  placeholder="Any special requirements or information…"
                  className="resize-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary"
                />
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Checkbox id="cb-agree" className="mt-0.5" />
                <Label htmlFor="cb-agree" className="text-sm cursor-pointer leading-relaxed text-muted-foreground">
                  I confirm this team meets all CPSL eligibility requirements and agree to the{" "}
                  <span className="text-primary font-medium">League Rules & Code of Conduct</span>.
                </Label>
              </div>

              <div className="flex gap-3 pt-1">
                <Button className="flex-1" size="lg">Submit Registration</Button>
                <Button variant="secondary" size="lg">Save Draft</Button>
              </div>
            </div>
          </div>
        </Section>

      </div>
    </div>
  )
}

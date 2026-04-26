"use client"

import PageHeader from "@/components/PageHeader"
import Section from "@/components/Section"
import CodeBlock from "@/components/CodeBlock"
import { Button } from "@/components/ui/button"
import { ArrowPillButton } from "@cpsl/ui"

// ── Exact token values used by each state ──────────────────────────────────
// Derived from buttonVariants in components/ui/button.tsx
const STATE_TOKENS = {
  primary: {
    default:  { bg: "#697279",                color: "#ffffff", border: "none",              ring: "none" },
    hover:    { bg: "rgba(0,71,255,0.88)",     color: "#ffffff", border: "none",              ring: "none" },
    focus:    { bg: "#697279",                color: "#ffffff", border: "none",              ring: "0 0 0 3px rgba(0,71,255,0.5)" },
    active:   { bg: "rgba(0,71,255,0.82)",     color: "#ffffff", border: "none",              ring: "none" },
    disabled: { bg: "#697279",                color: "#ffffff", border: "none",              ring: "none", opacity: 0.5 },
  },
  crimson: {
    default:  { bg: "#BF1D2D",                color: "#ffffff", border: "none",              ring: "none" },
    hover:    { bg: "rgba(191,29,45,0.88)",    color: "#ffffff", border: "none",              ring: "none" },
    focus:    { bg: "#BF1D2D",                color: "#ffffff", border: "none",              ring: "0 0 0 3px rgba(191,29,45,0.4)" },
    active:   { bg: "rgba(191,29,45,0.82)",    color: "#ffffff", border: "none",              ring: "none" },
    disabled: { bg: "#BF1D2D",                color: "#ffffff", border: "none",              ring: "none", opacity: 0.5 },
  },
  secondary: {
    default:  { bg: "transparent",            color: "#697279", border: "2px solid #697279",  ring: "none" },
    hover:    { bg: "#697279",                color: "#ffffff", border: "2px solid #697279",  ring: "none" },
    focus:    { bg: "transparent",            color: "#697279", border: "2px solid #697279",  ring: "0 0 0 3px rgba(0,71,255,0.4)" },
    active:   { bg: "rgba(0,71,255,0.90)",    color: "#ffffff", border: "2px solid #697279",  ring: "none" },
    disabled: { bg: "transparent",            color: "#697279", border: "2px solid #697279",  ring: "none", opacity: 0.5 },
  },
  ghost: {
    default:  { bg: "transparent",            color: "#091628", border: "none",              ring: "none" },
    hover:    { bg: "#EEF1F7",                color: "#091628", border: "none",              ring: "none" },
    focus:    { bg: "transparent",            color: "#091628", border: "none",              ring: "0 0 0 3px rgba(0,71,255,0.5)" },
    active:   { bg: "rgba(238,241,247,0.8)",   color: "#091628", border: "none",              ring: "none" },
    disabled: { bg: "transparent",            color: "#091628", border: "none",              ring: "none", opacity: 0.5 },
  },
  destructive: {
    default:  { bg: "#FF1744",                color: "#ffffff", border: "none",              ring: "none" },
    hover:    { bg: "rgba(255,23,68,0.88)",    color: "#ffffff", border: "none",              ring: "none" },
    focus:    { bg: "#FF1744",                color: "#ffffff", border: "none",              ring: "0 0 0 3px rgba(255,23,68,0.3)" },
    active:   { bg: "rgba(255,23,68,0.82)",    color: "#ffffff", border: "none",              ring: "none" },
    disabled: { bg: "#FF1744",                color: "#ffffff", border: "none",              ring: "none", opacity: 0.5 },
  },
}

type StateKey = "default" | "hover" | "focus" | "active" | "disabled"
type VariantKey = keyof typeof STATE_TOKENS

const STATE_LABELS: Record<StateKey, string> = {
  default:  "Default",
  hover:    ":hover",
  focus:    ":focus-visible",
  active:   ":active",
  disabled: ":disabled",
}

const STATE_DESCRIPTIONS: Record<StateKey, string> = {
  default:  "Resting state. No interaction.",
  hover:    "bg opacity → 88%. Cursor: pointer.",
  focus:    "3px ring · ring-ring/50 · #697279 at 50%.",
  active:   "bg opacity → 82%. scale(0.98).",
  disabled: "opacity-50 · pointer-events-none.",
}

const VARIANT_LABELS: Record<VariantKey, string> = {
  primary:     "Primary (default)",
  crimson:     "cpsl-crimson",
  secondary:   "Secondary",
  ghost:       "Ghost",
  destructive: "Destructive",
}

// Simulated state button — renders exact CSS that the pseudo-class would apply
function SimulatedButton({
  tokens,
  label,
}: {
  tokens: { bg: string; color: string; border: string; ring: string; opacity?: number }
  label: string
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: "36px",
        padding: "0 16px",
        borderRadius: "6px",
        fontSize: "14px",
        fontWeight: 600,
        fontFamily: "Inter, sans-serif",
        whiteSpace: "nowrap",
        userSelect: "none",
        cursor: label === ":disabled" ? "not-allowed" : "default",
        backgroundColor: tokens.bg,
        color: tokens.color,
        border: tokens.border === "none" ? "none" : tokens.border,
        boxShadow: tokens.ring === "none" ? undefined : tokens.ring,
        opacity: tokens.opacity ?? 1,
        outline: "none",
      }}
    >
      {label === ":focus-visible" ? (
        <span className="flex items-center gap-1.5">
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: tokens.color, opacity: 0.7, display: "inline-block" }} />
          Focused
        </span>
      ) : label}
    </div>
  )
}

const codeStates = `/* ── State tokens for Primary button ──────────────────────── */

/* Default */
.btn-primary {
  background-color: var(--primary);          /* #697279 */
  color: var(--primary-foreground);          /* #ffffff */
}

/* Hover */
.btn-primary:hover {
  background-color: color-mix(in srgb, var(--primary) 88%, transparent);
}

/* Focus (keyboard only) */
.btn-primary:focus-visible {
  box-shadow: 0 0 0 3px oklch(from var(--ring) l c h / 50%);
  /* ring = #697279 → rgba(0,71,255,0.5) */
}

/* Active / Pressed */
.btn-primary:active {
  background-color: color-mix(in srgb, var(--primary) 82%, transparent);
  transform: scale(0.98);
}

/* Disabled */
.btn-primary:disabled {
  opacity: 0.5;
  pointer-events: none;
  cursor: not-allowed;
}`

const cssCode = `import { Button } from "@/components/ui/button"

// Core CPSL variants
<Button variant="default">Primary</Button>
<Button variant="cpsl-crimson">Crimson CTA</Button>
<Button variant="cpsl-navy">Navy</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="cpsl-success">Success</Button>
<Button variant="cpsl-live">Live Match</Button>

// Sizes
<Button size="xs" />   // h-6
<Button size="sm" />   // h-8
<Button size="default" />  // h-9
<Button size="lg" />   // h-11
<Button size="xl" />   // h-13
<Button size="pill" />         // h-9 · rounded-full
<Button size="pill-lg" />      // h-11 · rounded-full

// Disabled
<Button disabled>Disabled</Button>`

export default function ButtonsPage() {
  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <PageHeader
        section="04 — Components"
        title="Buttons & CTAs"
        description="10 variants · 8 sizes · 5 interaction states. All documented with exact token values. Built on shadcn/ui CVA with CPSL design tokens."
      />

      <div className="px-12 py-12">

        {/* ── All Variants ── */}
        <Section title="All Variants — Live Interactive">
          <div className="rounded-2xl p-8 border bg-white border-[#E2E8F0]">
            <p className="text-xs text-muted-foreground mb-5">
              Real <code className="bg-secondary px-1.5 py-0.5 rounded text-xs">Button</code> components — hover, click, and Tab through them to see all states in action.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Button variant="default">Primary</Button>
              <Button variant="cpsl-crimson">Crimson CTA</Button>
              <Button variant="cpsl-navy">Navy</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="cpsl-outline-crimson">Outline Crimson</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="cpsl-success">Success</Button>
              <Button variant="cpsl-live">Live</Button>
            </div>
          </div>
        </Section>

        {/* ── Arrow Pill Button ── */}
        <Section title="Arrow Pill Button — Hero CTA">
          <p className="text-xs text-muted-foreground mb-4">
            Pill-shaped CTA with a circular icon disc on the right end. Designed for hero modules and prominent calls-to-action.
            Two tones: <code className="bg-secondary px-1.5 py-0.5 rounded text-xs">dark</code> for light/photo surfaces,
            {" "}<code className="bg-secondary px-1.5 py-0.5 rounded text-xs">light</code> for dark/navy surfaces.
            Three sizes: <code className="bg-secondary px-1.5 py-0.5 rounded text-xs">sm</code> /
            {" "}<code className="bg-secondary px-1.5 py-0.5 rounded text-xs">md</code> (default) /
            {" "}<code className="bg-secondary px-1.5 py-0.5 rounded text-xs">lg</code>. Imported from
            {" "}<code className="bg-secondary px-1.5 py-0.5 rounded text-xs">@cpsl/ui</code>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl p-8 border bg-white border-[#E2E8F0]">
              <div className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: "#697279" }}>
                Tone: dark — on light surface
              </div>
              <div className="flex flex-wrap gap-4 items-center">
                <ArrowPillButton size="sm" href="#">Small</ArrowPillButton>
                <ArrowPillButton size="md" href="#">View showcases</ArrowPillButton>
                <ArrowPillButton size="lg" href="#">Apply now</ArrowPillButton>
              </div>
            </div>
            <div className="rounded-2xl p-8 border" style={{ background: "#091628", borderColor: "#1E2D45" }}>
              <div className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: "#94A3B8" }}>
                Tone: light — on dark surface
              </div>
              <div className="flex flex-wrap gap-4 items-center">
                <ArrowPillButton size="sm" tone="light" href="#">Small</ArrowPillButton>
                <ArrowPillButton size="md" tone="light" href="#">View showcases</ArrowPillButton>
                <ArrowPillButton size="lg" tone="light" href="#">Apply now</ArrowPillButton>
              </div>
            </div>
          </div>
        </Section>

        {/* ── State Matrix ── */}
        <Section title="Interaction States — Documented">
          <div className="rounded-2xl overflow-hidden border border-[#E2E8F0]">
            {/* Column headers */}
            <div className="grid bg-[#091628]" style={{ gridTemplateColumns: "180px repeat(5, 1fr)" }}>
              <div className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-white/40">Variant</div>
              {(Object.keys(STATE_LABELS) as StateKey[]).map((s) => (
                <div key={s} className="px-4 py-3 border-l border-white/10">
                  <p className="text-[11px] font-bold text-white">{STATE_LABELS[s]}</p>
                  <p className="text-[10px] text-white/40 mt-0.5 leading-tight">{STATE_DESCRIPTIONS[s]}</p>
                </div>
              ))}
            </div>

            {/* Rows */}
            {(Object.keys(STATE_TOKENS) as VariantKey[]).map((variant, i) => (
              <div
                key={variant}
                className="grid items-center"
                style={{
                  gridTemplateColumns: "180px repeat(5, 1fr)",
                  background: i % 2 === 0 ? "white" : "#FAFBFF",
                  borderTop: "1px solid #F1F5F9",
                }}
              >
                {/* Variant label */}
                <div className="px-5 py-5">
                  <p className="text-xs font-bold text-foreground">{VARIANT_LABELS[variant]}</p>
                </div>

                {/* State cells */}
                {(Object.keys(STATE_LABELS) as StateKey[]).map((state) => (
                  <div key={state} className="px-4 py-5 border-l border-[#F1F5F9] flex flex-col gap-2">
                    <SimulatedButton
                      tokens={STATE_TOKENS[variant][state]}
                      label={STATE_LABELS[state]}
                    />
                    {state === "focus" && (
                      <p className="text-[9px] text-muted-foreground leading-tight">
                        3px · #697279 · 50% alpha
                      </p>
                    )}
                    {state === "hover" && (
                      <p className="text-[9px] text-muted-foreground leading-tight">
                        opacity(bg) → 88%
                      </p>
                    )}
                    {state === "active" && (
                      <p className="text-[9px] text-muted-foreground leading-tight">
                        opacity(bg) → 82% + scale(0.98)
                      </p>
                    )}
                    {state === "disabled" && (
                      <p className="text-[9px] text-muted-foreground leading-tight">
                        opacity-50 · no events
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Section>

        {/* ── Focus ring callout ── */}
        <Section title="Focus Ring — Keyboard Navigation">
          <div className="rounded-2xl border bg-white border-[#E2E8F0] p-8 flex gap-8 items-start">
            {/* Visual */}
            <div className="flex flex-col gap-4 shrink-0">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Tab to focus these buttons →</p>
              <div className="flex gap-4 p-6 rounded-xl bg-[#F4F6FA] border border-[#E2E8F0]">
                <Button variant="default">Primary</Button>
                <Button variant="cpsl-crimson">Crimson</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Press <kbd className="px-1.5 py-0.5 rounded bg-secondary border border-[#E2E8F0] text-[11px] font-mono">Tab</kbd> to cycle through buttons and see the live focus ring.
              </p>
            </div>

            {/* Token breakdown */}
            <div className="flex-1 flex flex-col gap-3">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Focus ring anatomy</p>
              <div className="rounded-xl border border-[#E2E8F0] overflow-hidden">
                {[
                  { property: "Property", value: "Value", token: "Token", isHeader: true },
                  { property: "box-shadow style", value: "ring (not outline)", token: "focus-visible:ring-[3px]" },
                  { property: "ring color", value: "#697279 at 50% alpha", token: "ring-ring/50" },
                  { property: "ring width", value: "3px", token: "ring-[3px]" },
                  { property: "visibility", value: "keyboard only", token: "focus-visible (not focus)" },
                  { property: "never suppressed", value: "outline: none is not used", token: "WCAG 2.4.7" },
                ].map(({ property, value, token, isHeader }) => (
                  <div
                    key={property}
                    className={`grid text-xs ${isHeader ? "bg-secondary font-bold text-muted-foreground uppercase tracking-widest" : "border-t border-[#F1F5F9]"}`}
                    style={{ gridTemplateColumns: "1fr 1fr 1fr" }}
                  >
                    <div className="px-4 py-2.5">{property}</div>
                    <div className={`px-4 py-2.5 ${!isHeader ? "font-mono text-[11px]" : ""}`}>{value}</div>
                    <div className={`px-4 py-2.5 ${!isHeader ? "text-primary font-mono text-[11px]" : ""}`}>{token}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ── State CSS reference ── */}
        <Section title="State CSS Reference">
          <CodeBlock code={codeStates} language="css" />
        </Section>

        {/* ── Sizes ── */}
        <Section title="Sizes">
          <div className="rounded-2xl p-8 border bg-white border-[#E2E8F0]">
            <div className="flex flex-wrap gap-4 items-end">
              {[
                { size: "xs" as const,      label: "xs · h-6" },
                { size: "sm" as const,      label: "sm · h-8" },
                { size: "default" as const, label: "default · h-9" },
                { size: "lg" as const,      label: "lg · h-11" },
                { size: "xl" as const,      label: "xl · h-13" },
              ].map(({ size, label }) => (
                <div key={size} className="flex flex-col items-center gap-2">
                  <Button size={size}>{size}</Button>
                  <span className="text-[10px] text-muted-foreground">{label}</span>
                </div>
              ))}
              <div className="flex flex-col items-center gap-2">
                <Button size="pill" variant="secondary">Pill</Button>
                <span className="text-[10px] text-muted-foreground">pill · rounded-full</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Button size="pill-sm" variant="cpsl-crimson">Pill SM</Button>
                <span className="text-[10px] text-muted-foreground">pill-sm</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Button size="pill-lg" variant="cpsl-navy">Pill LG</Button>
                <span className="text-[10px] text-muted-foreground">pill-lg</span>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-[#F1F5F9]">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Icon Buttons</p>
              <div className="flex gap-3 items-center">
                {(["icon-xs","icon-sm","icon","icon-lg"] as const).map((s, i) => (
                  <Button key={s} size={s} variant={i === 0 ? "secondary" : i === 1 ? "ghost" : i === 2 ? "default" : "cpsl-crimson"} aria-label="Navigate">
                    <svg width={10 + i * 2} height={10 + i * 2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ── Common patterns ── */}
        <Section title="Common Patterns">
          <div className="rounded-2xl p-8 border bg-white border-[#E2E8F0] flex flex-col gap-6">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Primary + Secondary CTA</p>
              <div className="flex gap-3">
                <Button variant="cpsl-crimson" size="lg">
                  Apply for Admission
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Button>
                <Button variant="secondary" size="lg">Learn More</Button>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Match Actions</p>
              <div className="flex gap-2">
                <Button variant="cpsl-live" size="pill">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="8" /></svg>
                  Watch Live
                </Button>
                <Button variant="ghost" size="pill-sm">Highlights</Button>
                <Button variant="ghost" size="pill-sm">Stats</Button>
                <Button variant="ghost" size="pill-sm">Lineups</Button>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Destructive Confirm</p>
              <div className="flex gap-3">
                <Button variant="destructive">Remove Club</Button>
                <Button variant="ghost">Cancel</Button>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Implementation">
          <CodeBlock code={cssCode} language="tsx" />
        </Section>

        {/* ── A11y ── */}
        <Section title="Accessibility Checklist">
          <div className="grid grid-cols-3 gap-4">
            {[
              { rule: "44×44px min touch target", desc: "All sizes at sm and above meet WCAG 2.5.5. icon-xs is docs-only." },
              { rule: "Focus ring always visible", desc: "3px ring at 50% alpha on :focus-visible. Never suppressed with outline:none." },
              { rule: "Keyboard only focus", desc: "focus-visible means mouse clicks don't trigger the ring — only Tab/keyboard." },
              { rule: "Disabled ≠ aria-hidden", desc: "Disabled buttons stay in tab order with pointer-events-none. Use aria-disabled for cleaner UX." },
              { rule: "Icon buttons need aria-label", desc: "All icon-only buttons require aria-label describing the action." },
              { rule: "asChild for links", desc: "Use <Button asChild><Link> to get button styles on Next.js Link without nesting <button> inside <a>." },
            ].map((r) => (
              <div key={r.rule} className="rounded-xl p-5 border bg-white border-[#E2E8F0]">
                <div className="text-sm font-bold mb-1.5 text-primary">✓ {r.rule}</div>
                <div className="text-xs leading-relaxed text-muted-foreground">{r.desc}</div>
              </div>
            ))}
          </div>
        </Section>

      </div>
    </div>
  )
}

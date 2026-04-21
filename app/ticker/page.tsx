import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import CodeBlock from "@/components/CodeBlock";
import { LogoTicker } from "@/components/cpsl/modules/LogoTicker";
import type { LogoTickerItem } from "@/components/cpsl/modules/LogoTicker";

// ─── Sample data ────────────────────────────────────────────────────────────

const logos: LogoTickerItem[] = [
  { slug: "asheville-fc",       name: "Asheville FC" },
  { slug: "charleston-fc",      name: "Charleston FC" },
  { slug: "charlotte-fc",       name: "Charlotte FC" },
  { slug: "coastal-sc",         name: "Coastal SC" },
  { slug: "columbia-united",    name: "Columbia United" },
  { slug: "durham-united",      name: "Durham United" },
  { slug: "greensboro-fc",      name: "Greensboro FC" },
  { slug: "raleigh-athletic",   name: "Raleigh Athletic" },
  { slug: "triangle-fc",        name: "Triangle FC" },
  { slug: "winston-salem-sc",   name: "Winston-Salem SC" },
];

const sampleCode = `import { LogoTicker } from "@/components/cpsl/modules/LogoTicker"

<LogoTicker
  logos={[
    { slug: "charlotte-fc",     name: "Charlotte FC" },
    { slug: "raleigh-athletic", name: "Raleigh Athletic" },
    // ...
  ]}
  durationSeconds={40}
  pauseOnHover
  edgeFade
/>`;

// ─── Page ────────────────────────────────────────────────────────────────────

export default function TickerPage() {
  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <PageHeader
        section="16 — Components"
        title="Logo Ticker"
        description="Horizontal marquee of club crests — seamless infinite scroll with pause-on-hover and soft edge fades. Each tile is a fixed 115 × 115 px container with a 30 px gap between tiles. Pure CSS animation; respects prefers-reduced-motion."
      />

      <div className="px-12 py-12">

        {/* ── 1. Default — on Light ── */}
        <Section title="1 — Default — on Light">
          <p className="text-xs text-muted-foreground mb-4">
            Forty-second loop, pause on hover, soft edge fade. 115 × 115 tiles with 30 px gap — the canonical spec.
          </p>
          <div
            className="rounded-2xl p-10 border"
            style={{ background: "white", borderColor: "#E2E8F0" }}
          >
            <LogoTicker logos={logos} />
          </div>
          <div className="mt-4">
            <CodeBlock code={sampleCode} language="tsx" />
          </div>
        </Section>

        {/* ── 2. On Dark Navy ── */}
        <Section title="2 — On Dark Navy">
          <p className="text-xs text-muted-foreground mb-4">
            Same component with darker tile background for use on the navy surface — crests retain contrast against the dark panel.
          </p>
          <div
            className="rounded-2xl p-10 border"
            style={{ background: "#091628", borderColor: "#1E2D45" }}
          >
            <LogoTicker
              logos={logos}
              tileBackground="#0D1B3E"
              tileBorderColor="#1E2D45"
            />
          </div>
        </Section>

        {/* ── 3. Reversed — Faster ── */}
        <Section title="3 — Reversed · Faster">
          <p className="text-xs text-muted-foreground mb-4">
            Reverse direction with a shorter duration — useful for stacking two tickers travelling in opposite directions.
          </p>
          <div
            className="rounded-2xl p-10 border flex flex-col gap-4"
            style={{ background: "white", borderColor: "#E2E8F0" }}
          >
            <LogoTicker logos={logos} durationSeconds={25} />
            <LogoTicker logos={logos} durationSeconds={25} reverse />
          </div>
        </Section>

        {/* ── 4. Props ── */}
        <Section title="Props">
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "#E2E8F0" }}>
            <div className="px-6 py-3 border-b" style={{ background: "#091628", borderColor: "#1E2D45" }}>
              <span className="text-xs font-bold text-white">LogoTickerProps</span>
            </div>
            <div className="bg-white divide-y" style={{ borderColor: "#F1F5F9" }}>
              {[
                { name: "logos",           type: "LogoTickerItem[]", def: "—",          desc: "Array of { slug, name }. Slug must match a file in /public/logos/{slug}.svg." },
                { name: "durationSeconds", type: "number",           def: "40",         desc: "Full loop time. Lower is faster." },
                { name: "reverse",         type: "boolean",          def: "false",      desc: "Reverse the scroll direction." },
                { name: "pauseOnHover",    type: "boolean",          def: "true",       desc: "Pause the animation while the pointer is over the ticker." },
                { name: "edgeFade",        type: "boolean",          def: "true",       desc: "Apply a soft CSS mask fade on the left and right edges." },
                { name: "tileBackground",  type: "string",           def: "'#FFFFFF'",  desc: "Background color of each 115 × 115 tile." },
                { name: "tileBorderColor", type: "string",           def: "'#E2E8F0'",  desc: "Border color of each 115 × 115 tile." },
              ].map((p) => (
                <div key={p.name} className="grid grid-cols-[180px_180px_120px_1fr] gap-4 px-6 py-3 text-xs">
                  <span className="font-mono font-semibold" style={{ color: "#091628" }}>{p.name}</span>
                  <span className="font-mono"             style={{ color: "#475569" }}>{p.type}</span>
                  <span className="font-mono"             style={{ color: "#94A3B8" }}>{p.def}</span>
                  <span className="text-muted-foreground">{p.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

      </div>
    </div>
  );
}

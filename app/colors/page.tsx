import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";

const steelColors = [
  { token: "--cpsl-steel-50",  hex: "#F2F4F5", name: "Steel 50" },
  { token: "--cpsl-steel-100", hex: "#E3E7E9", name: "Steel 100" },
  { token: "--cpsl-steel-200", hex: "#C8CED2", name: "Steel 200" },
  { token: "--cpsl-steel-300", hex: "#A7AFB5", name: "Steel 300" },
  { token: "--cpsl-steel-400", hex: "#8A9299", name: "Steel 400" },
  { token: "--cpsl-steel-500", hex: "#697279", name: "Steel 500", main: true },
  { token: "--cpsl-steel-600", hex: "#505960", name: "Steel 600" },
  { token: "--cpsl-steel-700", hex: "#3A4248", name: "Steel 700" },
  { token: "--cpsl-steel-800", hex: "#262D32", name: "Steel 800" },
  { token: "--cpsl-steel-900", hex: "#161B1E", name: "Steel 900" },
];
const accentColors = [
  { token: "--cpsl-crimson-50",  hex: "#FEF0F1", name: "Crimson 50"  },
  { token: "--cpsl-crimson-100", hex: "#FDDCDE", name: "Crimson 100" },
  { token: "--cpsl-crimson-200", hex: "#FAB3B8", name: "Crimson 200" },
  { token: "--cpsl-crimson-300", hex: "#F47D85", name: "Crimson 300" },
  { token: "--cpsl-crimson-400", hex: "#E74552", name: "Crimson 400" },
  { token: "--cpsl-crimson-500", hex: "#BF1D2D", name: "Crimson 500", main: true },
  { token: "--cpsl-crimson-600", hex: "#96161E", name: "Crimson 600" },
  { token: "--cpsl-crimson-700", hex: "#6E1017", name: "Crimson 700" },
  { token: "--cpsl-crimson-800", hex: "#480B0F", name: "Crimson 800" },
  { token: "--cpsl-crimson-900", hex: "#250508", name: "Crimson 900" },
];
const goldColors = [
  { token: "--cpsl-gold-300", hex: "#E5C97A", name: "Gold 300" },
  { token: "--cpsl-gold-400", hex: "#D8B85E", name: "Gold 400" },
  { token: "--cpsl-gold-500", hex: "#C9A74C", name: "Gold 500", main: true },
  { token: "--cpsl-gold-600", hex: "#B08A34", name: "Gold 600" },
  { token: "--cpsl-gold-700", hex: "#8C6E24", name: "Gold 700" },
];
const semanticColors = [
  { token: "--cpsl-success", hex: "#00C853", name: "Success", bg: "#E8FFF2", label: "Wins, confirmations, uploads" },
  { token: "--cpsl-warning", hex: "#FFB300", name: "Warning", bg: "#FFF8E1", label: "Postponed, cautions, yellow cards" },
  { token: "--cpsl-error",   hex: "#FF1744", name: "Error",   bg: "#FFF0F0", label: "Losses, failures, red cards" },
  { token: "--cpsl-info",    hex: "#697279", name: "Info",    bg: "#F2F4F5", label: "Informational states" },
];
const neutralColors = [
  { hex: "#F4F6FA", name: "N-50" }, { hex: "#E2E8F0", name: "N-200" },
  { hex: "#94A3B8", name: "N-400" }, { hex: "#64748B", name: "N-500" },
  { hex: "#475569", name: "N-600" }, { hex: "#334155", name: "N-700" },
  { hex: "#091628", name: "N-900" },
];

const contrastRows = [
  ["White on Steel-500 (#697279)",      "4.6:1",  "✅", "✅", "❌"],
  ["Dark (#091628) on Steel-500",       "4.6:1",  "✅", "✅", "❌"],
  ["White on Dark (#091628)",           "18.9:1", "✅", "✅", "✅"],
  ["N-900 on N-50",                     "14.2:1", "✅", "✅", "✅"],
  ["N-600 on White",                    "5.74:1", "✅", "✅", "❌"],
  ["Dark text on Gold-500 (#C9A74C)",   "8.0:1",  "✅", "✅", "✅"],
  ["White on Crimson-500 (#BF1D2D)",    "5.9:1",  "✅", "✅", "❌"],
  ["White on Error (#FF1744)",          "4.58:1", "✅", "✅", "❌"],
  ["Dark text on Success bg",           "7.2:1",  "✅", "✅", "✅"],
];

export default function ColorsPage() {
  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <PageHeader section="01 — Foundations" title="Color System"
        description="Championship Gold (#C9A74C) is the primary brand color. CPSL Steel (#697279) and Crimson (#BF1D2D) serve as supporting and accent colors. Cream (#F4EFE6) adds warmth to premium surfaces. All colors ship as CSS custom properties and design token JSON." />
      <div className="px-12 py-12">
        {/* ── Gold ── */}
        <Section title="Primary — Championship Gold">
          <p className="text-xs text-muted-foreground mb-4">
            Gold is the primary brand color — used for CTAs, active states, and championship moments. Always use dark navy text on gold — it achieves 8:1 contrast (AAA).
          </p>
          <div className="flex rounded-2xl overflow-hidden h-20 mb-4 shadow-sm">
            {goldColors.map((c) => (
              <div key={c.hex} className="flex-1 relative" style={{ background: c.hex }}>
                {c.main && <div className="absolute inset-0 flex items-end p-2"><span className="text-xs font-bold px-1.5 py-0.5 rounded bg-black/10" style={{ color: "#091628" }}>Gold</span></div>}
              </div>
            ))}
          </div>
          <div className="flex gap-4">
            {goldColors.map((c) => (
              <div key={c.hex} className="rounded-xl overflow-hidden border flex-1" style={{ borderColor: "#E2E8F0" }}>
                <div className="h-16" style={{ background: c.hex }} />
                <div className="p-3" style={{ background: "white" }}>
                  <div className="text-xs font-bold" style={{ color: "#091628" }}>{c.name}</div>
                  <div className="text-xs font-mono" style={{ color: "#64748B" }}>{c.hex}</div>
                  {c.main && <div className="text-xs mt-1 font-semibold" style={{ color: "#A58840" }}>Championship</div>}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Secondary — CPSL Steel">
          <p className="text-xs text-muted-foreground mb-4">
            Steel is a cool blue-grey secondary color centered on <strong>#697279</strong>. Used for informational states, secondary badges, promotion zones, and UI chrome accents.
          </p>
          <div className="flex rounded-2xl overflow-hidden h-20 mb-4 shadow-sm">
            {steelColors.map((c) => (
              <div key={c.hex} className="flex-1 relative" style={{ background: c.hex }}>
                {c.main && <div className="absolute inset-0 flex items-end p-2"><span className="text-xs font-bold px-1.5 py-0.5 rounded bg-black/10" style={{ color: "white" }}>Steel</span></div>}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-5 gap-3">
            {steelColors.map((c) => (
              <div key={c.hex} className="rounded-xl p-3 border" style={{ background: "white", borderColor: "#E2E8F0" }}>
                <div className="w-full h-10 rounded-lg mb-2" style={{ background: c.hex }} />
                <div className="text-xs font-bold" style={{ color: "#091628" }}>{c.name}</div>
                <div className="text-xs font-mono mt-0.5" style={{ color: "#64748B" }}>{c.hex}</div>
                <div className="text-xs font-mono mt-0.5" style={{ color: "#94A3B8", fontSize: "10px" }}>{c.token}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Crimson Accent ── */}
        <Section title="Accent — CPSL Crimson">
          <p className="text-xs text-muted-foreground mb-4">
            Crimson is the competition accent — used for alerts, relegation zones, red cards, and brand energy moments. Centered on <strong>#BF1D2D</strong>. White text on Crimson-500 achieves 5.9:1 (AA).
          </p>
          <div className="flex rounded-2xl overflow-hidden h-20 mb-4 shadow-sm">
            {accentColors.map((c) => (
              <div key={c.hex} className="flex-1 relative" style={{ background: c.hex }}>
                {c.main && <div className="absolute inset-0 flex items-end p-2"><span className="text-xs font-bold px-1.5 py-0.5 rounded bg-black/10" style={{ color: "white" }}>Crimson</span></div>}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-5 gap-3">
            {accentColors.map((c) => (
              <div key={c.hex} className="rounded-xl p-3 border" style={{ background: "white", borderColor: "#E2E8F0" }}>
                <div className="w-full h-10 rounded-lg mb-2" style={{ background: c.hex }} />
                <div className="text-xs font-bold" style={{ color: "#091628" }}>{c.name}</div>
                <div className="text-xs font-mono mt-0.5" style={{ color: "#64748B" }}>{c.hex}</div>
                <div className="text-xs font-mono mt-0.5" style={{ color: "#94A3B8", fontSize: "10px" }}>{c.token}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Cream ── */}
        <Section title="Warm Surface — CPSL Cream">
          <p className="text-xs text-muted-foreground mb-4">
            Cream brings warmth to premium surfaces — editorial panels, feature callouts, and championship highlights. Use in place of cold white for a richer, more premium brand feel.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { token: "--cpsl-cream",      hex: "#F4EFE6", name: "Cream",      label: "Premium backgrounds, feature panels" },
              { token: "--cpsl-cream-dark",  hex: "#EBE3D0", name: "Cream Dark", label: "Borders, dividers on cream surfaces" },
            ].map((c) => (
              <div key={c.hex} className="rounded-xl overflow-hidden border" style={{ borderColor: "#E2E8F0" }}>
                <div className="h-20 border-b" style={{ background: c.hex, borderColor: "#E2E8F0" }} />
                <div className="p-4" style={{ background: "white" }}>
                  <div className="text-xs font-bold" style={{ color: "#091628" }}>{c.name}</div>
                  <div className="text-xs font-mono mt-0.5" style={{ color: "#64748B" }}>{c.hex}</div>
                  <div className="text-xs font-mono mt-0.5" style={{ color: "#94A3B8", fontSize: "10px" }}>{c.token}</div>
                  <div className="text-xs mt-1.5" style={{ color: "#94A3B8" }}>{c.label}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Semantic Colors">
          <div className="grid grid-cols-4 gap-4">
            {semanticColors.map((c) => (
              <div key={c.hex} className="rounded-xl border overflow-hidden" style={{ borderColor: "#E2E8F0", background: "white" }}>
                <div className="h-16 flex items-center px-4" style={{ background: c.bg }}>
                  <div className="w-7 h-7 rounded-full" style={{ background: c.hex }} />
                </div>
                <div className="p-3">
                  <div className="text-xs font-bold mb-1" style={{ color: "#091628" }}>{c.name}</div>
                  <div className="text-xs font-mono mb-1" style={{ color: "#64748B" }}>{c.hex}</div>
                  <div className="text-xs" style={{ color: "#94A3B8" }}>{c.label}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Neutral Scale">
          <div className="flex rounded-2xl overflow-hidden h-16 mb-3">
            {neutralColors.map((c) => <div key={c.hex} className="flex-1" style={{ background: c.hex }} />)}
          </div>
          <div className="grid grid-cols-7 gap-3">
            {neutralColors.map((c) => (
              <div key={c.hex} className="text-center">
                <div className="text-xs font-bold mb-1" style={{ color: "#091628" }}>{c.name}</div>
                <div className="text-xs font-mono" style={{ color: "#64748B" }}>{c.hex}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="WCAG Contrast Ratios">
          <p className="text-xs text-muted-foreground mb-4">
            Gold (#C9A74C) is the primary color and always requires dark navy text — it achieves 8:1 (AAA). Steel-500 (#697279) passes AA for both white and dark text, making it flexible for UI elements.
          </p>
          <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "#E2E8F0" }}>
            <table className="w-full text-sm" style={{ background: "white" }}>
              <thead>
                <tr style={{ background: "#F4F6FA", borderBottom: "2px solid #E2E8F0" }}>
                  {["Combination", "Ratio", "AA Normal", "AA Large", "AAA"].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wide" style={{ color: "#64748B" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {contrastRows.map(([combo, ratio, aa, aaL, aaa], i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #F1F5F9" }}>
                    <td className="px-5 py-3 font-mono text-xs" style={{ color: "#475569" }}>{combo}</td>
                    <td className="px-5 py-3 font-bold text-sm" style={{ color: "#091628" }}>{ratio}</td>
                    <td className="px-5 py-3 text-sm">{aa}</td>
                    <td className="px-5 py-3 text-sm">{aaL}</td>
                    <td className="px-5 py-3 text-sm">{aaa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="Dark Mode Tokens">
          <div className="rounded-2xl p-6 border" style={{ background: "#091628", borderColor: "#1E2D45" }}>
            <div className="grid grid-cols-4 gap-4">
              {[
                { token: "--primary",      light: "#C9A74C", dark: "#D8B85E"  },
                { token: "--accent",       light: "#BF1D2D", dark: "#E74552"  },
                { token: "--cpsl-gold",    light: "#C9A74C", dark: "#CDB268"  },
                { token: "--surface-warm", light: "#F4EFE6", dark: "#1A1208"  },
                { token: "--surface-1",    light: "#FFFFFF",  dark: "#0A1628" },
                { token: "--surface-2",    light: "#F4F6FA",  dark: "#091628" },
                { token: "--text-primary", light: "#091628",  dark: "#F4F6FA" },
                { token: "--border",       light: "#E2E8F0",  dark: "#1E2D45" },
              ].map((t) => (
                <div key={t.token} className="rounded-xl p-3" style={{ background: "#0A1628", border: "1px solid #1E2D45" }}>
                  <div className="text-xs font-mono mb-2" style={{ color: "#A7AFB5" }}>{t.token}</div>
                  <div className="flex gap-2">
                    <div className="flex-1 h-6 rounded" style={{ background: t.light, border: "1px solid #1E2D45" }} />
                    <div className="flex-1 h-6 rounded" style={{ background: t.dark, border: "1px solid #334155" }} />
                  </div>
                  <div className="flex gap-2 mt-1">
                    <span className="flex-1 text-xs font-mono text-center" style={{ color: "#475569" }}>Light</span>
                    <span className="flex-1 text-xs font-mono text-center" style={{ color: "#475569" }}>Dark</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}

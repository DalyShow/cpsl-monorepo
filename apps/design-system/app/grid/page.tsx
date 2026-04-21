import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import CodeBlock from "@/components/CodeBlock";

const spacingScale = [
  { token: "--space-1", px: "4px", mult: "0.5×", width: 4 },
  { token: "--space-2", px: "8px", mult: "1× base", width: 8 },
  { token: "--space-3", px: "12px", mult: "1.5×", width: 12 },
  { token: "--space-4", px: "16px", mult: "2×", width: 16 },
  { token: "--space-6", px: "24px", mult: "3×", width: 24 },
  { token: "--space-8", px: "32px", mult: "4×", width: 32 },
  { token: "--space-12", px: "48px", mult: "6×", width: 48 },
  { token: "--space-16", px: "64px", mult: "8×", width: 64 },
];

const gridCode = `/* 12-col grid container */
.container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--space-6);        /* 24px gutters */
  padding: 0 var(--space-16); /* 64px margins */
  max-width: 1440px;
  margin: 0 auto;
}

/* Responsive example */
@media (max-width: 768px) {
  .container {
    grid-template-columns: repeat(4, 1fr);
    padding: 0 var(--space-4);
    gap: var(--space-4);
  }
}`;

export default function GridPage() {
  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <PageHeader section="03 — Foundations" title="Grid & Spacing"
        description="A 12-column grid with 24px gutters scales across 5 breakpoints. All spacing is an 8px base unit — no arbitrary values. Border radii follow a consistent 4-step scale." />
      <div className="px-12 py-12">
        <Section title="12-Column Grid">
          <div className="rounded-2xl p-6 border" style={{ background: "white", borderColor: "#E2E8F0" }}>
            <div className="flex gap-3 mb-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="flex-1 h-12 rounded flex items-center justify-center text-xs font-bold"
                  style={{ background: i % 2 === 0 ? "#697279" : "#C8CED2", color: i % 2 === 0 ? "white" : "#3A4248" }}>
                  {i + 1}
                </div>
              ))}
            </div>
            <div className="flex gap-3 mb-2">
              <div className="h-8 rounded" style={{ flex: 8, background: "#F2F4F5", border: "1.5px dashed #C8CED2" }} />
              <div className="h-8 rounded" style={{ flex: 4, background: "#F2F4F5", border: "1.5px dashed #C8CED2" }} />
            </div>
            <div className="flex gap-3 mb-2">
              <div className="h-8 rounded" style={{ flex: 4, background: "#FFF3E0", border: "1.5px dashed #FFCC80" }} />
              <div className="h-8 rounded" style={{ flex: 4, background: "#FFF3E0", border: "1.5px dashed #FFCC80" }} />
              <div className="h-8 rounded" style={{ flex: 4, background: "#FFF3E0", border: "1.5px dashed #FFCC80" }} />
            </div>
            <div className="flex gap-3">
              <div className="h-8 rounded" style={{ flex: 3, background: "#F0FFF4", border: "1.5px dashed #A7F3D0" }} />
              <div className="h-8 rounded" style={{ flex: 3, background: "#F0FFF4", border: "1.5px dashed #A7F3D0" }} />
              <div className="h-8 rounded" style={{ flex: 3, background: "#F0FFF4", border: "1.5px dashed #A7F3D0" }} />
              <div className="h-8 rounded" style={{ flex: 3, background: "#F0FFF4", border: "1.5px dashed #A7F3D0" }} />
            </div>
          </div>
        </Section>

        <Section title="Breakpoints">
          <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "#E2E8F0" }}>
            <table className="w-full" style={{ background: "white" }}>
              <thead>
                <tr style={{ background: "#F4F6FA", borderBottom: "2px solid #E2E8F0" }}>
                  {["Name", "Width", "Columns", "Gutter", "Margin", "Use Case"].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wide" style={{ color: "#64748B" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Mobile", "375px", "4", "16px", "16px", "Default phone portrait"],
                  ["Phablet", "640px", "8", "20px", "20px", "Large phones, small tablets"],
                  ["Tablet", "768px", "8", "24px", "24px", "iPad portrait"],
                  ["Laptop", "1024px", "12", "24px", "32px", "Laptop screen"],
                  ["Desktop", "1440px", "12", "24px", "64px", "Wide desktop default"],
                ].map(([name, ...rest], i) => (
                  <tr key={name} style={{ borderBottom: "1px solid #F1F5F9", background: i % 2 === 0 ? "white" : "#FAFBFC" }}>
                    <td className="px-5 py-3 font-bold text-sm" style={{ color: "#091628" }}>{name}</td>
                    {rest.map((v, j) => (
                      <td key={j} className="px-5 py-3 font-mono text-xs" style={{ color: j === 0 ? "#697279" : "#475569" }}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="Spacing Scale (8px base)">
          <div className="rounded-2xl p-6 border" style={{ background: "white", borderColor: "#E2E8F0" }}>
            <div className="flex flex-col gap-4">
              {spacingScale.map((s) => (
                <div key={s.token} className="flex items-center gap-5">
                  <span className="font-mono text-xs w-28 flex-shrink-0" style={{ color: "#64748B" }}>{s.token}</span>
                  <span className="font-mono text-xs w-12 flex-shrink-0 font-bold" style={{ color: "#697279" }}>{s.px}</span>
                  <div className="rounded" style={{ width: `${s.width * 2}px`, height: "20px", background: "#69727922", border: "1px solid #C8CED2", flexShrink: 0 }} />
                  <span className="text-xs" style={{ color: "#94A3B8" }}>{s.mult}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section title="Border Radius Scale">
          <div className="flex gap-4">
            {[
              { name: "sm", token: "--radius-sm", px: "6px", radius: "6px" },
              { name: "md", token: "--radius-md", px: "10px", radius: "10px" },
              { name: "lg", token: "--radius-lg", px: "16px", radius: "16px" },
              { name: "pill", token: "--radius-pill", px: "100px", radius: "100px" },
            ].map((r) => (
              <div key={r.name} className="flex-1 rounded-xl p-5 border text-center" style={{ background: "white", borderColor: "#E2E8F0" }}>
                <div className="w-20 h-20 mx-auto mb-4 border-2" style={{ borderRadius: r.radius, borderColor: "#697279", background: "#F2F4F5" }} />
                <div className="text-sm font-bold mb-1" style={{ color: "#091628" }}>{r.name}</div>
                <div className="text-xs font-mono mb-1" style={{ color: "#697279" }}>{r.px}</div>
                <div className="text-xs font-mono" style={{ color: "#94A3B8", fontSize: "10px" }}>{r.token}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="CSS Grid Implementation">
          <CodeBlock code={gridCode} language="css" />
        </Section>
      </div>
    </div>
  );
}

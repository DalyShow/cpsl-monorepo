import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";

const typeScale = [
  { level: "Display", size: "72px", weight: "700", lh: "1.0", ls: "-2px", font: "Barlow Condensed", usage: "Hero headlines, scoreboard scores" },
  { level: "H1", size: "48px", weight: "700", lh: "1.05", ls: "-1px", font: "Barlow Condensed", usage: "Page titles" },
  { level: "H2", size: "36px", weight: "700", lh: "1.1", ls: "-0.5px", font: "Barlow Condensed", usage: "Section headers" },
  { level: "H3", size: "24px", weight: "700", lh: "1.2", ls: "-0.3px", font: "Inter", usage: "Card titles, subsections" },
  { level: "H4", size: "20px", weight: "600", lh: "1.3", ls: "-0.2px", font: "Inter", usage: "Component headings" },
  { level: "Body L", size: "18px", weight: "400", lh: "1.6", ls: "0", font: "Inter", usage: "Long-form content" },
  { level: "Body", size: "15px", weight: "400", lh: "1.6", ls: "0", font: "Inter", usage: "Default body text" },
  { level: "Small", size: "13px", weight: "500", lh: "1.5", ls: "0", font: "Inter", usage: "Labels, captions" },
  { level: "Caption", size: "11px", weight: "600", lh: "1.4", ls: "0.5px", font: "Inter", usage: "Tags, legal, metadata" },
];

export default function TypographyPage() {
  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <PageHeader section="02 — Foundations" title="Typography"
        description="Two typeface roles: Barlow Condensed is the primary headline font — used for all display text, headings, and live scores. Inter handles all UI body text and labels. A 9-level scale ensures consistent hierarchy." />
      <div className="px-12 py-12">
        <Section title="Type Specimen">
          <div className="rounded-2xl p-10 border" style={{ background: "white", borderColor: "#E2E8F0" }}>
            <div className="mb-6 pb-6 border-b" style={{ borderColor: "#F1F5F9" }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "80px", fontWeight: 800, color: "#091628", letterSpacing: "-2px", lineHeight: 1 }}>PREMIER</div>
              <div className="text-xs mt-2" style={{ color: "#94A3B8" }}>Barlow Condensed ExtraBold · Display · 80px</div>
            </div>
            <div className="mb-6 pb-6 border-b" style={{ borderColor: "#F1F5F9" }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "56px", fontWeight: 700, color: "#697279", letterSpacing: "-1px", lineHeight: 1 }}>CAROLINA</div>
              <div className="text-xs mt-2" style={{ color: "#94A3B8" }}>Barlow Condensed Bold · H1 · 56px</div>
            </div>
            <div className="mb-6 pb-6 border-b" style={{ borderColor: "#F1F5F9" }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "28px", fontWeight: 700, color: "#475569" }}>Soccer League</div>
              <div className="text-xs mt-2" style={{ color: "#94A3B8" }}>Inter Bold · H3 · 28px</div>
            </div>
            <div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", fontWeight: 400, color: "#64748B", lineHeight: 1.6 }}>
                CPSL · Week 18 · Charlotte FC 3–1 Raleigh Athletic · Saturday, February 22, 2026
              </div>
              <div className="text-xs mt-2" style={{ color: "#94A3B8" }}>Inter Regular · Body · 15px</div>
            </div>
          </div>
        </Section>

        <Section title="Type Scale">
          <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "#E2E8F0" }}>
            <table className="w-full" style={{ background: "white" }}>
              <thead>
                <tr style={{ background: "#F4F6FA", borderBottom: "2px solid #E2E8F0" }}>
                  {["Level", "Size", "Weight", "Line Ht", "Tracking", "Typeface", "Usage"].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wide" style={{ color: "#64748B" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {typeScale.map((t, i) => (
                  <tr key={t.level} style={{ borderBottom: "1px solid #F1F5F9", background: i % 2 === 0 ? "white" : "#FAFBFC" }}>
                    <td className="px-5 py-3 font-bold text-sm" style={{ color: "#091628" }}>{t.level}</td>
                    <td className="px-5 py-3 font-mono text-xs font-bold" style={{ color: "#697279" }}>{t.size}</td>
                    <td className="px-5 py-3 text-xs" style={{ color: "#475569" }}>{t.weight}</td>
                    <td className="px-5 py-3 text-xs" style={{ color: "#475569" }}>{t.lh}</td>
                    <td className="px-5 py-3 font-mono text-xs" style={{ color: "#475569" }}>{t.ls}</td>
                    <td className="px-5 py-3 text-xs font-mono" style={{ color: "#64748B" }}>{t.font}</td>
                    <td className="px-5 py-3 text-xs" style={{ color: "#94A3B8" }}>{t.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="Accessibility Rules">
          <div className="grid grid-cols-3 gap-4">
            {[
              { rule: "Minimum body 15px", detail: "15px for UI labels. 11px only for metadata with sufficient contrast and uppercase treatment." },
              { rule: "No font below 11px", detail: "Use abbreviations or tags rather than reducing font size further on any surface." },
              { rule: "WCAG 4.5:1 for body text", detail: "Large text (18px+ regular or 14px+ bold) only requires 3:1. Body always requires 4.5:1." },
            ].map(r => (
              <div key={r.rule} className="rounded-xl p-5 border" style={{ background: "white", borderColor: "#E2E8F0" }}>
                <div className="text-sm font-bold mb-2" style={{ color: "#697279" }}>✓ {r.rule}</div>
                <div className="text-xs leading-relaxed" style={{ color: "#64748B" }}>{r.detail}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Responsive Scale">
          <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "#E2E8F0" }}>
            <table className="w-full" style={{ background: "white" }}>
              <thead>
                <tr style={{ background: "#F4F6FA", borderBottom: "2px solid #E2E8F0" }}>
                  {["Level", "Mobile (375px)", "Tablet (768px)", "Desktop (1440px)"].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wide" style={{ color: "#64748B" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Display", "48px", "60px", "72px"],
                  ["H1", "32px", "40px", "48px"],
                  ["H2", "24px", "30px", "36px"],
                  ["Body", "15px", "15px", "15px"],
                ].map(([level, ...sizes], i) => (
                  <tr key={level} style={{ borderBottom: "1px solid #F1F5F9", background: i % 2 === 0 ? "white" : "#FAFBFC" }}>
                    <td className="px-5 py-3 font-bold text-sm" style={{ color: "#091628" }}>{level}</td>
                    {sizes.map((s, j) => <td key={j} className="px-5 py-3 font-mono text-xs" style={{ color: j === 2 ? "#697279" : "#475569" }}>{s}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </div>
    </div>
  );
}

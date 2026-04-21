import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";

// ── Placeholder tile ────────────────────────────────────────────────────────
function LogoPlaceholder({
  label,
  bg = "#F4F6FA",
  border = "#E2E8F0",
  note,
  wide = false,
}: {
  label: string;
  bg?: string;
  border?: string;
  note?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border flex flex-col overflow-hidden ${wide ? "col-span-2" : ""}`}
      style={{ borderColor: border }}
    >
      {/* Canvas */}
      <div
        className="flex-1 flex items-center justify-center py-14 px-8"
        style={{ background: bg, minHeight: 180 }}
      >
        <div className="flex flex-col items-center gap-3">
          {/* Dashed placeholder box */}
          <div
            className="w-28 h-28 rounded-xl flex items-center justify-center"
            style={{ border: "2px dashed #CBD5E1" }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9l4-4 4 4 4-4 4 4" />
              <circle cx="8.5" cy="14.5" r="1.5" />
            </svg>
          </div>
          <span
            className="text-xs font-semibold tracking-wide"
            style={{ color: bg === "#091628" || bg === "#091628" ? "#475569" : "#94A3B8" }}
          >
            Asset pending
          </span>
        </div>
      </div>

      {/* Label bar */}
      <div
        className="px-4 py-3 border-t flex items-center justify-between"
        style={{ background: "white", borderColor: "#F1F5F9" }}
      >
        <span className="text-xs font-bold" style={{ color: "#091628" }}>{label}</span>
        {note && (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: "#F4F6FA", color: "#94A3B8" }}>
            {note}
          </span>
        )}
      </div>
    </div>
  );
}

// ── Spec row ────────────────────────────────────────────────────────────────
function SpecRow({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-start justify-between py-3 border-b" style={{ borderColor: "#F1F5F9" }}>
      <span className="text-xs font-semibold" style={{ color: "#475569" }}>{label}</span>
      <span
        className={`text-xs text-right max-w-xs ${mono ? "font-mono" : ""}`}
        style={{ color: "#091628" }}
      >
        {value}
      </span>
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function LogosPage() {
  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <PageHeader
        section="00 — Foundation"
        title="Logo & Brand Marks"
        description="Primary crest, wordmark lockups, horizontal and stacked variants, and the standalone brandmark. Assets pending final approval — placeholders show intended layout and background usage."
      />
      <div className="px-12 py-12">

        {/* ── Spec callout ── */}
        <div className="rounded-2xl border overflow-hidden mb-10" style={{ borderColor: "#E2E8F0" }}>
          <div className="px-6 py-3 border-b flex items-center justify-between" style={{ background: "#091628", borderColor: "#1E2D45" }}>
            <span className="text-xs font-bold text-white">Required delivery specs</span>
            <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#697279" }}>Send to designer</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x" style={{ background: "white", borderColor: "#F1F5F9" }}>
            <div className="px-6 py-5">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#94A3B8" }}>Format</p>
              <SpecRow label="Primary format"       value="SVG — clean vector, no embedded rasters" />
              <SpecRow label="Raster fallback"      value="PNG with transparent background" />
              <SpecRow label="Color profile"        value="RGB / sRGB (digital)" />
              <SpecRow label="SVG viewBox"          value="Must be set — no fixed width/height on root" mono />
              <SpecRow label="Named layers"         value="Preferred but not required" />
            </div>
            <div className="px-6 py-5">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#94A3B8" }}>PNG sizes needed (height × scale)</p>
              <SpecRow label="UI / nav bar"         value="40px, 80px @ 1× and 2×" />
              <SpecRow label="Cards / thumbnails"   value="120px, 200px @ 1× and 2×" />
              <SpecRow label="Hero / print"         value="400px, 600px @ 1×" />
              <SpecRow label="App icon / favicon"   value="16, 32, 48, 192, 512 px (square, PNG)" />
              <SpecRow label="OG / social"          value="1200 × 630 px (PNG or JPG, opaque bg)" />
            </div>
          </div>
        </div>

        {/* ── 1. Primary Crest ── */}
        <Section title="1 — Primary Crest">
          <p className="text-xs text-muted-foreground mb-4">
            Full-colour crest on all three approved backgrounds — light, dark navy, and forest green.
            Never place the crest on a background that reduces contrast below 3:1.
          </p>
          <div className="grid grid-cols-3 gap-4">
            <LogoPlaceholder label="Crest — on Light"       bg="#F4F6FA" note="SVG + PNG" />
            <LogoPlaceholder label="Crest — on Dark Navy"   bg="#091628" border="#1E2D45" note="SVG + PNG" />
            <LogoPlaceholder label="Crest — on Forest"      bg="#1A3D2B" border="#1A3D2B" note="SVG + PNG" />
          </div>
        </Section>

        {/* ── 2. Crest Variations ── */}
        <Section title="2 — Crest Variations">
          <p className="text-xs text-muted-foreground mb-4">
            Reversed (white knockout) for dark surfaces where brand color is unavailable.
            Mono (black) for single-colour print. Both must pass at minimum 4.5:1 contrast.
          </p>
          <div className="grid grid-cols-3 gap-4">
            <LogoPlaceholder label="Crest — Reversed (White)"    bg="#091628" border="#1E2D45" note="SVG" />
            <LogoPlaceholder label="Crest — Mono (Black)"        bg="#F4F6FA" note="SVG" />
            <LogoPlaceholder label="Crest — Gold on Dark"        bg="#091628" border="#1E2D45" note="SVG" />
          </div>
        </Section>

        {/* ── 3. Wordmark Lockups ── */}
        <Section title="3 — Wordmark Lockups">
          <p className="text-xs text-muted-foreground mb-4">
            Horizontal lockup: crest left, wordmark right — minimum width 200 px.
            Stacked lockup: crest top, wordmark below — minimum height 80 px. Do not re-kern or recolour either lockup.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <LogoPlaceholder label="Horizontal — on Light"     bg="#F4F6FA" note="SVG + PNG" />
            <LogoPlaceholder label="Horizontal — on Dark"      bg="#091628" border="#1E2D45" note="SVG + PNG" />
            <LogoPlaceholder label="Stacked — on Light"        bg="#F4F6FA" note="SVG + PNG" />
            <LogoPlaceholder label="Stacked — on Dark"         bg="#091628" border="#1E2D45" note="SVG + PNG" />
          </div>
        </Section>

        {/* ── 4. Standalone Brandmark ── */}
        <Section title="4 — Standalone Brandmark">
          <p className="text-xs text-muted-foreground mb-4">
            Shield-only mark — used at small sizes (nav icons, favicons, app icons) where the full
            crest becomes illegible. Minimum display size: <code className="bg-secondary px-1.5 py-0.5 rounded">24 × 24 px</code>.
          </p>
          <div className="grid grid-cols-4 gap-4">
            <LogoPlaceholder label="Brandmark — Colour"  bg="#F4F6FA" note="SVG" />
            <LogoPlaceholder label="Brandmark — White"   bg="#091628" border="#1E2D45" note="SVG" />
            <LogoPlaceholder label="Brandmark — Mono"    bg="#F4F6FA" note="SVG" />
            <LogoPlaceholder label="Favicon — Square"    bg="#697279" border="#697279" note="ICO + PNG" />
          </div>
        </Section>

        {/* ── 5. Social & OG ── */}
        <Section title="5 — Social & Open Graph">
          <p className="text-xs text-muted-foreground mb-4">
            Pre-built 1200 × 630 px card for link previews (Twitter, LinkedIn, iMessage).
            Deliver as high-res PNG or JPG — no transparency required on this asset.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <LogoPlaceholder
              label="OG Card — Default (1200 × 630)"
              bg="#091628" border="#1E2D45"
              note="PNG · 1200×630"
              wide
            />
          </div>
        </Section>

        {/* ── Usage rules summary ── */}
        <Section title="Usage Rules">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { rule: "Clear space", desc: "Maintain clear space equal to the height of the \u2018C\u2019 in CPSL on all four sides of any lockup." },
              { rule: "Minimum size", desc: "Crest: 32 px height minimum on screen. Wordmark horizontal: 200 px width. Brandmark: 24 px." },
              { rule: "Approved backgrounds", desc: "Light (#F4F6FA, white), Dark Navy (#091628), Forest (#1A3D2B). No gradients behind the crest." },
              { rule: "Don't distort", desc: "Never stretch, skew, or rotate the crest. Scale uniformly from centre only." },
              { rule: "Don't recolour", desc: "Use only the approved colour variants. No custom tints, shadows, or glow effects on the logo." },
              { rule: "Don't crop", desc: "The crest shield must never be cropped — all elements inside the shield must remain fully visible." },
            ].map((r) => (
              <div key={r.rule} className="rounded-xl p-5 border bg-white border-[#E2E8F0]">
                <div className="text-sm font-bold mb-1.5" style={{ color: "#697279" }}>✓ {r.rule}</div>
                <div className="text-xs leading-relaxed text-muted-foreground">{r.desc}</div>
              </div>
            ))}
          </div>
        </Section>

      </div>
    </div>
  );
}

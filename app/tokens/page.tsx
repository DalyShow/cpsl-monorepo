import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import CodeBlock from "@/components/CodeBlock";

const tokenJson = `{
  "color": {
    "steel": {
      "50":  "#F2F4F5",
      "100": "#E3E7E9",
      "200": "#C8CED2",
      "300": "#A7AFB5",
      "400": "#8A9299",
      "500": "#697279",
      "600": "#505960",
      "700": "#3A4248",
      "800": "#262D32",
      "900": "#161B1E"
    },
    "crimson": {
      "50":  "#FEF0F1",
      "100": "#FDDCDE",
      "200": "#FAB3B8",
      "300": "#F47D85",
      "400": "#E74552",
      "500": "#BF1D2D",
      "600": "#96161E",
      "700": "#6E1017",
      "800": "#480B0F",
      "900": "#250508"
    },
    "gold": {
      "300": "#E0C88A",
      "400": "#CDB268",
      "500": "#C9A74C",
      "600": "#A58840",
      "700": "#8C7030"
    },
    "cream": {
      "default": "#F4EFE6",
      "dark":    "#EDE4CC"
    },
    "neutral": {
      "50":  "#F4F6FA",
      "200": "#E2E8F0",
      "400": "#94A3B8",
      "500": "#64748B",
      "600": "#475569",
      "700": "#334155",
      "900": "#091628"
    },
    "semantic": {
      "success": "#00C853",
      "warning": "#FFB300",
      "error":   "#FF1744",
      "info":    "#697279"
    }
  },
  "spacing": {
    "1": "4px",  "2": "8px",
    "3": "12px", "4": "16px",
    "6": "24px", "8": "32px",
    "12": "48px","16": "64px"
  },
  "radius": {
    "sm":   "6px",
    "md":   "10px",
    "lg":   "16px",
    "pill": "100px"
  },
  "typography": {
    "family": {
      "display": "Barlow Condensed",
      "heading": "Barlow Condensed",
      "body":    "Inter"
    },
    "scale": {
      "display-xl":  "clamp(52px, 10vw, 104px)",
      "display-lg":  "clamp(40px, 8vw, 88px)",
      "display":     "clamp(36px, 7vw, 76px)",
      "display-sm":  "clamp(28px, 5vw, 56px)",
      "score":       "clamp(48px, 10vw, 80px)",
      "h1":          "clamp(28px, 4.5vw, 48px)",
      "h2":          "clamp(20px, 3.5vw, 36px)",
      "h3":          "24px",
      "h4":          "20px",
      "body-l":      "18px",
      "body":        "15px",
      "small":       "13px",
      "caption":     "11px"
    }
  }
}`;

const cssVars = `:root {
  /* Color — Primary */
  --cpsl-steel-50:  #F2F4F5;
  --cpsl-steel-500: #697279;
  --cpsl-steel-600: #505960;
  --cpsl-steel-900: #161B1E;

  /* Color — Crimson (accent) */
  --cpsl-crimson-400: #E74552;
  --cpsl-crimson-500: #BF1D2D;
  --cpsl-crimson-600: #96161E;

  /* Color — Gold */
  --cpsl-gold-500: #C9A74C;
  --cpsl-gold-600: #A58840;
  --cpsl-gold-300: #E0C88A;

  /* Color — Cream */
  --cpsl-cream:      #F4EFE6;
  --cpsl-cream-dark: #EDE4CC;

  /* Color — Neutral */
  --cpsl-neutral-50:  #F4F6FA;
  --cpsl-neutral-200: #E2E8F0;
  --cpsl-neutral-400: #94A3B8;
  --cpsl-neutral-600: #475569;
  --cpsl-neutral-900: #091628;

  /* Semantic */
  --cpsl-success: #00C853;
  --cpsl-warning: #FFB300;
  --cpsl-error:   #FF1744;
  --cpsl-info:    #697279;

  /* Surface tokens (swap in dark mode) */
  --surface-1:     #FFFFFF;
  --surface-2:     #F4F6FA;
  --surface-3:     #E2E8F0;
  --surface-warm:  #F4EFE6;
  --text-primary:  #091628;
  --text-secondary:#475569;
  --text-muted:    #94A3B8;
  --border:        #E2E8F0;

  /* Spacing */
  --space-1: 4px;  --space-2: 8px;
  --space-3: 12px; --space-4: 16px;
  --space-6: 24px; --space-8: 32px;
  --space-12: 48px; --space-16: 64px;

  /* Border radius */
  --radius-sm:   6px;  --radius-md: 10px;
  --radius-lg:   16px; --radius-pill: 100px;

  /* Type scale */
  --text-display-xl:  clamp(52px, 10vw, 104px);
  --text-display-lg:  clamp(40px, 8vw, 88px);
  --text-display:     clamp(36px, 7vw, 76px);
  --text-display-sm:  clamp(28px, 5vw, 56px);
  --text-score:       clamp(48px, 10vw, 80px);
  --text-h1:          clamp(28px, 4.5vw, 48px);
  --text-h2:          clamp(20px, 3.5vw, 36px);
  --text-h3:          24px;
  --text-h4:          20px;
  --text-body-l:      18px;
  --text-body:        15px;
  --text-small:       13px;
  --text-caption:     11px;

  /* Typefaces */
  --font-display: 'Barlow Condensed', sans-serif;
  --font-heading: 'Barlow Condensed', sans-serif;
  --font-body:    'Inter', sans-serif;
}

/* Dark mode */
[data-theme="dark"] {
  --surface-1:     #0A1628;
  --surface-2:     #091628;
  --surface-3:     #1E2D45;
  --text-primary:  #F4F6FA;
  --text-secondary:#94A3B8;
  --text-muted:    #475569;
  --border:        #1E2D45;
}`;

const checklist = [
  "Uses design tokens only — no hardcoded colors, spacing, or radii",
  "All interactive states documented: default, hover, active, focus, disabled",
  "WCAG AA contrast verified (4.5:1 for body text, 3:1 for large text)",
  "Fully keyboard accessible — focus ring, tab order, no keyboard traps",
  "Responsive across all 5 breakpoints (375px → 1440px)",
  "Dark mode via surface tokens — no per-component dark overrides",
  "Semantic HTML with correct ARIA attributes documented",
  "Minimum 44×44px touch target on all interactive elements",
];

const principles = [
  { icon: "⚡", title: "Speed First", desc: "Optimistic updates, skeleton screens, and sub-200ms interactions keep fans engaged." },
  { icon: "🎯", title: "Data at a Glance", desc: "Large numerals, high contrast. Legible in bright sunlight on a mobile screen." },
  { icon: "♿", title: "Inclusive Default", desc: "WCAG AA always. Color is never the only signal — always paired with label or icon." },
  { icon: "🏟️", title: "Brand Cohesion", desc: "Tokens enforced everywhere. No one-off hex values in component implementations." },
  { icon: "📱", title: "Mobile-Led", desc: "44×44px touch targets. All layouts designed mobile-first, then scaled to desktop." },
];

export default function TokensPage() {
  return (
    <div style={{ background: "#091628", minHeight: "100vh" }}>
      <div style={{ background: "#091628", borderBottom: "1px solid #1E2D45" }}>
        <div className="px-12 pt-12 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <div style={{ width: "4px", height: "40px", background: "#697279", borderRadius: "2px" }} />
            <div>
              <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "#697279" }}>11 — Tokens &amp; Dev Guide</div>
              <h1 className="text-4xl font-bold" style={{ color: "#F4F6FA", letterSpacing: "-0.5px" }}>Design Tokens &amp; Dev Guide</h1>
            </div>
          </div>
          <p className="text-base leading-relaxed pl-4 border-l-2" style={{ color: "#64748B", borderColor: "#1E2D45", maxWidth: "560px" }}>
            All design decisions codified as JSON tokens and CSS custom properties. Ship consistently across React, Vue, Svelte, Next.js, and plain HTML.
          </p>
        </div>
      </div>

      <div className="px-12 py-12">
        <Section title="tokens.json">
          <CodeBlock code={tokenJson} language="json" />
        </Section>

        <Section title="tokens.css — CSS Custom Properties">
          <CodeBlock code={cssVars} language="css" />
        </Section>

        <Section title="Contribution Checklist">
          <div className="rounded-2xl p-6 border" style={{ background: "#091628", borderColor: "#1E2D45" }}>
            <div className="grid grid-cols-2 gap-3">
              {checklist.map((item) => (
                <div key={item} className="flex items-start gap-3 p-3.5 rounded-xl" style={{ background: "#0A1628", border: "1px solid #1E2D45" }}>
                  <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "#69727922", border: "1.5px solid #697279" }}>
                    <svg width="10" height="8" viewBox="0 0 10 8"><path d="M1 4l3 3 5-6" stroke="#697279" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg>
                  </div>
                  <span className="text-sm leading-relaxed" style={{ color: "#94A3B8" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section title="Design Principles">
          <div className="grid grid-cols-5 gap-4">
            {principles.map((p) => (
              <div key={p.title} className="rounded-xl p-5 border" style={{ background: "#091628", borderColor: "#1E2D45" }}>
                <div className="text-2xl mb-3">{p.icon}</div>
                <div className="text-sm font-bold mb-2" style={{ color: "#F4F6FA" }}>{p.title}</div>
                <div className="text-xs leading-relaxed" style={{ color: "#64748B" }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Supported Stacks">
          <div className="rounded-2xl p-6 border" style={{ background: "#091628", borderColor: "#1E2D45" }}>
            <div className="flex flex-wrap gap-3">
              {["React", "Next.js", "Vue 3", "Svelte", "Remix", "Vanilla CSS", "Tailwind CSS", "CSS Modules"].map(s => (
                <span key={s} className="px-4 py-2 rounded-lg text-sm font-semibold border" style={{ background: "#69727922", borderColor: "#69727944", color: "#A7AFB5" }}>{s}</span>
              ))}
            </div>
          </div>
        </Section>

        <div className="flex items-center justify-between p-6 rounded-2xl border mt-4" style={{ background: "#091628", borderColor: "#1E2D45" }}>
          <div>
            <div className="text-xl font-bold mb-1" style={{ color: "#F4F6FA" }}>CPSL Design System <span style={{ color: "#697279" }}>v1.0</span></div>
            <div className="text-sm" style={{ color: "#475569" }}>11 sections · 30+ components · 3 patterns · Publish-ready · 2026</div>
          </div>
          <div className="flex gap-2.5 items-center">
            {["#697279","#C9A74C","#BF1D2D","#F4EFE6","#F4F6FA"].map(c => (
              <div key={c} className="w-8 h-8 rounded-full border-2" style={{ background: c, borderColor: "#1E2D45" }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

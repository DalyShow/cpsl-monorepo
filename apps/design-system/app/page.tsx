import Link from "next/link";

const sections = [
  { num: "00", label: "Logo & Brand Marks", href: "/logos", desc: "Primary crest, wordmark lockups, horizontal and stacked variants, brandmark, and OG assets. Specs included.", color: "#C9A74C" },
  { num: "01", label: "Color System", href: "/colors", desc: "Primary, accent, semantic, neutral palettes. Dark mode tokens and WCAG contrast ratios.", color: "#697279" },
  { num: "02", label: "Typography", href: "/typography", desc: "9-level type scale. Barlow Condensed for headlines, Inter for body text. Responsive and accessible.", color: "#BF1D2D" },
  { num: "03", label: "Grid & Spacing", href: "/grid", desc: "12-column grid, 5 breakpoints, 8px base spacing scale, border radius tokens.", color: "#697279" },
  { num: "04", label: "Buttons & CTAs", href: "/buttons", desc: "5 variants, 4 states, 3 sizes. Full anatomy, CSS tokens, and a11y specs.", color: "#00875A" },
  { num: "05", label: "Inputs & Forms", href: "/inputs", desc: "Text, select, checkbox, radio, toggle, textarea. All interactive states.", color: "#BF1D2D" },
  { num: "06", label: "Cards & Lists", href: "/cards", desc: "Default, elevated, score, and horizontal card variants. Standings list pattern.", color: "#E65100" },
  { num: "07", label: "Navigation", href: "/navigation", desc: "Top nav, tab bar, breadcrumb, pagination, sidebar, and mobile tab bar.", color: "#BF1D2D" },
  { num: "08", label: "Feedback & Overlays", href: "/feedback", desc: "Alerts, toasts, progress bars, badges, modal, tooltip, and empty states.", color: "#FF1744" },
  { num: "09", label: "Data Display", href: "/data-display", desc: "Sortable tables, avatar groups, tags, stat displays, and skeleton loading.", color: "#697279" },
  { num: "10", label: "Patterns", href: "/patterns", desc: "Live scoreboard widget, match cards, auth sign-in flow with 2FA.", color: "#BF1D2D" },
  { num: "11", label: "Tokens & Dev Guide", href: "/tokens", desc: "tokens.json, CSS custom properties, dark mode, contribution checklist.", color: "#00875A" },
  { num: "12", label: "Hero Sections", href: "/heroes", desc: "Four production-ready hero layouts — cinematic gradient, split frame, glass card, and magazine overlap. Photo and video ready.", color: "#697279" },
  { num: "13", label: "Body Modules", href: "/modules", desc: "Nine plug-and-play page sections — stats bar, tabs, standings table, club directory, news grid, player spotlight, CTA banner, and skeleton states.", color: "#00875A" },
  { num: "14", label: "Calendar — Day View", href: "/calendar", desc: "Day-by-day match schedule with a mini month picker, competition badges, live scores, and empty state. Three composable primitives assembled into one drop-in view.", color: "#3B82F6" },
  { num: "15", label: "Club Directory", href: "/clubs", desc: "Filterable club directory with conference grouping, crest logos, record stats, and points. Data-source agnostic — static array or Airtable with no component changes.", color: "#10B981" },
];

const stats = [
  { value: "16", label: "Sections" },
  { value: "30+", label: "Components" },
  { value: "3", label: "Patterns" },
  { value: "WCAG AA", label: "Accessibility" },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <div className="px-12 py-16 border-b" style={{ background: "#091628", borderColor: "#1E2D45" }}>
        <div className="max-w-3xl">
          <div className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#C9A74C" }}>
            Carolina Premier Soccer League
          </div>
          <h1 className="font-bold mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "56px", lineHeight: 1.05, letterSpacing: "-1px", color: "white" }}>
            CPSL<br /><span style={{ color: "#C9A74C" }}>Design System</span>
          </h1>
          <p className="text-lg mb-8 leading-relaxed" style={{ color: "#64748B", maxWidth: "520px" }}>
            A complete, publish-ready design system for the Carolina Premier Soccer League. Built for speed, accessibility, and brand cohesion across all digital surfaces.
          </p>
          <div className="flex gap-3">
            <Link href="/colors"
              className="px-6 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
              style={{ background: "#C9A74C", color: "#091628" }}>
              Get Started →
            </Link>
            <Link href="/tokens"
              className="px-6 py-3 rounded-xl font-bold text-sm transition-all"
              style={{ border: "1.5px solid #1E2D45", color: "#94A3B8", background: "transparent" }}>
              View Tokens
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-10 mt-12 pt-8 border-t" style={{ borderColor: "#1E2D45" }}>
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold mb-1" style={{ color: "white", letterSpacing: "-0.5px" }}>{s.value}</div>
              <div className="text-xs" style={{ color: "#475569" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Section cards grid */}
      <div className="px-12 py-12" style={{ background: "#F4F6FA" }}>
        <div className="grid grid-cols-3 gap-4">
          {sections.map((s) => (
            <Link key={s.href} href={s.href}
              className="group block rounded-2xl p-6 border transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              style={{ background: "white", borderColor: "#E2E8F0" }}>
              <div className="flex items-start gap-4 mb-3">
                <span className="text-3xl font-black leading-none" style={{ color: s.color, fontFamily: "'Barlow Condensed', sans-serif" }}>
                  {s.num}
                </span>
                <div className="w-px self-stretch" style={{ background: "#E2E8F0" }} />
                <h3 className="font-bold text-base leading-tight" style={{ color: "#091628" }}>{s.label}</h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#64748B" }}>{s.desc}</p>
              <div className="mt-4 text-xs font-semibold transition-colors" style={{ color: "#94A3B8" }}>
                View docs →
              </div>
            </Link>
          ))}
        </div>

        {/* Footer banner */}
        <div className="mt-8 rounded-2xl p-6 border flex items-center justify-between" style={{ background: "#091628", borderColor: "#1E2D45" }}>
          <div>
            <div className="text-base font-bold text-white mb-1">CPSL Design System <span style={{ color: "#C9A74C" }}>v1.0</span></div>
            <div className="text-xs" style={{ color: "#475569" }}>16 sections · 30+ components · 3 patterns · Publish-ready · 2026</div>
          </div>
          <div className="flex gap-2.5">
            {["#C9A74C", "#697279", "#BF1D2D"].map((c) => (
              <div key={c} className="w-7 h-7 rounded-full border" style={{ background: c, borderColor: "#1E2D45" }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import CodeBlock from "@/components/CodeBlock";
import { TopNav } from "@/components/cpsl/navigation/TopNav";
import { SubNav } from "@/components/cpsl/navigation/SubNav";
import { TabBar } from "@/components/cpsl/navigation/TabBar";
import { Breadcrumb } from "@/components/cpsl/navigation/Breadcrumb";
import { Pagination } from "@/components/cpsl/navigation/Pagination";
import { MobileTabBar } from "@/components/cpsl/navigation/MobileTabBar";
import { FlyoutMenu, type FlyoutItem, type FlyoutAction } from "@/components/cpsl/navigation/FlyoutMenu";

export default function NavigationPage() {
  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <PageHeader
        section="07 — Components"
        title="Navigation"
        description="Top nav, tab bars, breadcrumbs, pagination, and bottom tab bars — all interactive. Card variants for component showcases; full-width variants for production layouts."
      />
      <div className="px-12 py-12">

        {/* ───────────────────────────────────────────── CARD VARIANTS ─── */}

        {/* 1. Top Navigation Bar — card */}
        <Section title="1 — Top Navigation Bar">
          <p className="text-xs text-muted-foreground mb-4">
            Dark-navy bar with brand mark, interactive nav links, live badge, and user avatar. Nav links use <strong>Barlow Condensed SemiBold, 14 px, uppercase, 0.11 em letter-spacing</strong>. Click any link to switch the active state. Use <code className="bg-secondary px-1.5 py-0.5 rounded">variant="card"</code> (default) inside modals, drawers, or preview frames.
          </p>
          <TopNav variant="card" showLive={true} />
        </Section>

        {/* 1.5 Sub Navigation */}
        <Section title="2 — Sub Navigation">
          <p className="text-xs text-muted-foreground mb-4">
            Sits directly below the main Top Nav. Lists child pages of the active section. Smaller type treatment — <strong>Barlow Condensed SemiBold, 12 px, uppercase, 0.12 em letter-spacing</strong> — so it reads as secondary to the main nav above it. Same gold underline pattern marks the active page.
          </p>
          <div className="flex flex-col">
            <TopNav variant="card" />
            <SubNav
              variant="card"
              items={[
                { label: "Overview" },
                { label: "Rules" },
                { label: "Handbook" },
                { label: "Clubs" },
                { label: "Contact" },
              ]}
            />
          </div>
        </Section>

        {/* 2. Tab Bar Variants — card */}
        <Section title="2 — Tab Bar">
          <p className="text-xs text-muted-foreground mb-4">
            Two interactive tab styles. Use <code className="bg-secondary px-1.5 py-0.5 rounded">variant="underline"</code> for content pages,{" "}
            <code className="bg-secondary px-1.5 py-0.5 rounded">variant="pill"</code> for filter controls.
          </p>
          <div className="flex flex-col gap-4">
            <div className="rounded-xl p-5 border" style={{ background: "white", borderColor: "#E2E8F0" }}>
              <div className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "#94A3B8" }}>Underline</div>
              <TabBar tabs={["Overview", "Matches", "Players", "Stats"]} variant="underline" />
            </div>
            <div className="rounded-xl p-5 border" style={{ background: "white", borderColor: "#E2E8F0" }}>
              <div className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "#94A3B8" }}>Pill</div>
              <TabBar tabs={["All", "Home", "Away", "Cup"]} variant="pill" />
            </div>
          </div>
        </Section>

        {/* 3. Breadcrumb & Pagination */}
        <Section title="3 — Breadcrumb &amp; Pagination">
          <p className="text-xs text-muted-foreground mb-4">
            Breadcrumb uses chevron separators, bold current-page item. Pagination is interactive — click numbers or arrow buttons to navigate; ellipsis collapses large page counts automatically.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl p-5 border" style={{ background: "white", borderColor: "#E2E8F0" }}>
              <div className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "#94A3B8" }}>Breadcrumb</div>
              <Breadcrumb items={["CPSL", "Teams", "Charlotte FC", "Matches"]} />
            </div>
            <div className="rounded-xl p-5 border" style={{ background: "white", borderColor: "#E2E8F0" }}>
              <div className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "#94A3B8" }}>Pagination — 8 pages</div>
              <Pagination totalPages={8} defaultPage={1} />
            </div>
          </div>
        </Section>

        {/* 4. Mobile Tab Bar — card */}
        <Section title="4 — Mobile Bottom Tab Bar">
          <p className="text-xs text-muted-foreground mb-4">
            Centered card for mobile previews. Rounded corners, max-width 384 px. SVG icons turn blue on tap; dot marks the active item.
          </p>
          <MobileTabBar variant="mobile" />
        </Section>

        {/* 5. Flyout Menu */}
        <Section title="5 — Flyout Menu">
          <p className="text-xs text-muted-foreground mb-4">
            Dropdown flyout panel with icon rows, descriptions, and optional footer actions. Closes on outside click, Escape key, or item selection. Styled with CPSL deep navy, gold accents, and Barlow Condensed labels.
          </p>

          {/* Live demo on dark surface */}
          <div
            className="rounded-2xl p-10 mb-4 flex items-start gap-8"
            style={{ background: "#091628", border: "1px solid #1E2D45" }}
          >
            <FlyoutMenu
              label="League Information"
              items={[
                {
                  label: "About the CPSL",
                  description: "History, mission, governance, and membership.",
                  href: "#",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                  ),
                },
                {
                  label: "Competition Formats",
                  description: "Premiership, NPL, CPSL Cup, and age group structures.",
                  href: "#",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                      <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                    </svg>
                  ),
                },
                {
                  label: "Season Calendar",
                  description: "Key dates, matchday windows, and cup rounds.",
                  href: "#",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                      <line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" />
                      <line x1="3" x2="21" y1="10" y2="10" />
                    </svg>
                  ),
                },
                {
                  label: "Rules & Regulations",
                  description: "CPSL handbook, discipline procedures, and appeals.",
                  href: "#",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" />
                      <line x1="16" x2="8" y1="17" y2="17" /><polyline points="10 9 9 9 8 9" />
                    </svg>
                  ),
                },
                {
                  label: "Member Clubs",
                  description: "Full directory of CPSL clubs across NC and SC.",
                  href: "#",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  ),
                },
              ] satisfies FlyoutItem[]}
              actions={[
                {
                  label: "View Handbook",
                  href: "#",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  ),
                },
                {
                  label: "Contact League",
                  href: "#",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.4a16 16 0 0 0 6.72 6.72l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  ),
                },
              ] satisfies FlyoutAction[]}
            />

            <FlyoutMenu
              label="For Teams"
              size="sm"
              items={[
                {
                  label: "Game Day Standards",
                  description: "Field prep and match-day protocols.",
                  href: "#",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><path d="m4.93 4.93 4.24 4.24" /><path d="m14.83 9.17 4.24-4.24" /><path d="m14.83 14.83 4.24 4.24" /><path d="m9.17 14.83-4.24 4.24" /><circle cx="12" cy="12" r="4" />
                    </svg>
                  ),
                },
                {
                  label: "Report Scores",
                  description: "Submit final results after each match.",
                  href: "#",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                  ),
                },
                {
                  label: "Discipline & Appeals",
                  description: "Cards, bans, and the appeals process.",
                  href: "#",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  ),
                },
              ] satisfies FlyoutItem[]}
            />
          </div>

          <CodeBlock
            language="tsx"
            code={`import { FlyoutMenu } from "@/components/cpsl/navigation/FlyoutMenu"

<FlyoutMenu
  label="League Information"
  size="md"                  // "sm" | "md" | "lg"
  items={[
    {
      label: "About the CPSL",
      description: "History, mission, governance, and membership.",
      href: "/about",
      icon: <InfoIcon />,
    },
    // …more items
  ]}
  actions={[
    { label: "View Handbook", href: "/handbook", icon: <DocIcon /> },
    { label: "Contact League", href: "/contact", icon: <PhoneIcon /> },
  ]}
/>`}
          />
        </Section>

        {/* ─────────────────────────────────────────── FULL-WIDTH VARIANTS ─── */}

        <div className="mt-12 mb-6">
          <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "#94A3B8" }}>Full-width variants</div>
          <h2 className="text-xl font-bold" style={{ color: "#091628" }}>Edge-to-Edge Production Layouts</h2>
          <p className="text-sm mt-1" style={{ color: "#64748B" }}>
            No rounded corners — each bar spans the full browser width exactly as it would in a deployed app.
          </p>
        </div>

      </div>

      {/* 5. Desktop — Full-Width Top Nav */}
      <div className="px-12 mb-2">
        <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "#94A3B8" }}>5 — Desktop</div>
        <p className="text-xs mb-3" style={{ color: "#64748B" }}>
          <code className="bg-secondary px-1.5 py-0.5 rounded">variant="full"</code> — bottom border only, no border-radius. Pair with a <code className="bg-secondary px-1.5 py-0.5 rounded">sticky top-0</code> wrapper in production.
        </p>
      </div>
      <TopNav variant="full" showLive={true} />

      {/* 6. Tablet — Full-Width Tab Bar */}
      <div className="px-12 mt-8 mb-2">
        <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "#94A3B8" }}>6 — Tablet</div>
        <p className="text-xs mb-3" style={{ color: "#64748B" }}>
          <code className="bg-secondary px-1.5 py-0.5 rounded">stretch</code> prop makes each tab fill equal width across the full bar. Works with both <code className="bg-secondary px-1.5 py-0.5 rounded">underline</code> and <code className="bg-secondary px-1.5 py-0.5 rounded">pill</code> variants.
        </p>
      </div>
      {/* White background card so the underline border reads cleanly */}
      <div style={{ background: "white", borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #E2E8F0" }}>
        <TabBar tabs={["Overview", "Matches", "Players", "Stats", "News"]} variant="underline" stretch />
      </div>
      <div className="mt-3" style={{ background: "#F4F6FA", borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #E2E8F0", padding: "10px 0" }}>
        <TabBar tabs={["All", "Home", "Away", "Neutral", "Cup"]} variant="pill" stretch />
      </div>

      {/* 7. Mobile — Full-Width Bottom Tab Bar */}
      <div className="px-12 mt-8 mb-2">
        <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "#94A3B8" }}>7 — Mobile</div>
        <p className="text-xs mb-3" style={{ color: "#64748B" }}>
          <code className="bg-secondary px-1.5 py-0.5 rounded">variant="full"</code> — edge-to-edge, top-border only. Active item shows a sliding top-bar indicator. Place inside a <code className="bg-secondary px-1.5 py-0.5 rounded">fixed bottom-0 w-full</code> wrapper in production.
        </p>
      </div>
      <MobileTabBar variant="full" />

      {/* Component API */}
      <div className="px-12 py-12">
        <Section title="Component API">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "FlyoutMenu",
                code: `<FlyoutMenu
  label="League Information"
  size="md"   // "sm" | "md" | "lg"
  items={[
    {
      label: "About the CPSL",
      description: "History and governance.",
      href: "/about",
      icon: <InfoIcon />,
    },
  ]}
  actions={[
    { label: "View Handbook", href: "/handbook", icon: <DocIcon /> },
  ]}
/>`,
              },
              {
                title: "TopNav",
                code: `<TopNav
  items={[{ label: "Standings" }, ...]}
  logoText="CPSL"
  userInitials="JD"
  showLive={true}
  defaultActive={0}
  variant="card"   // or "full"
/>`,
              },
              {
                title: "TabBar",
                code: `<TabBar
  tabs={["Overview", "Matches", "Players"]}
  variant="underline"   // or "pill"
  defaultActive={0}
  stretch={false}       // true → fills full width
/>`,
              },
              {
                title: "Breadcrumb",
                code: `<Breadcrumb
  items={["CPSL", "Teams", "Charlotte FC"]}
/>`,
              },
              {
                title: "Pagination",
                code: `<Pagination
  totalPages={12}
  defaultPage={1}
/>`,
              },
              {
                title: "MobileTabBar",
                code: `<MobileTabBar
  tabs={[{ label: "Home", icon: <HomeIcon /> }, ...]}
  defaultActive={0}
  variant="mobile"   // or "full"
/>`,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border overflow-hidden"
                style={{ background: "white", borderColor: "#E2E8F0" }}
              >
                <div className="px-4 py-2.5 border-b" style={{ background: "#FAFBFF", borderColor: "#F1F5F9" }}>
                  <span className="text-xs font-bold" style={{ color: "#091628" }}>{item.title}</span>
                </div>
                <pre
                  className="text-[11px] leading-relaxed p-4 overflow-x-auto"
                  style={{ fontFamily: "'Fira Code', 'Cascadia Code', monospace", color: "#475569" }}
                >
                  {item.code}
                </pre>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}

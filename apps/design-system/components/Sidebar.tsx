"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, X } from "lucide-react";

interface NavItem {
  label:    string;
  href:     string;
  icon?:    string;
  status?:  "new" | "beta";
  children?: NavItem[];
}

const foundations: NavItem[] = [
  { label: "Overview", href: "/", icon: "⬡" },
  { label: "Color System", href: "/colors", icon: "01" },
  { label: "Typography", href: "/typography", icon: "02" },
  { label: "Grid & Spacing", href: "/grid", icon: "03" },
];

const components: NavItem[] = [
  { label: "Buttons & CTAs",       href: "/buttons",      icon: "04" },
  { label: "Inputs & Forms",       href: "/inputs",       icon: "05" },
  { label: "Cards & Lists",        href: "/cards",        icon: "06" },
  { label: "Navigation",           href: "/navigation",   icon: "07" },
  { label: "Feedback & Overlays",  href: "/feedback",     icon: "08" },
  { label: "Data Display",         href: "/data-display", icon: "09" },
  {
    label: "Hero Sections",
    href:  "/heroes",
    icon:  "12",
    children: [
      { label: "Hero Bento", href: "/heroes/hero-bento", status: "new" },
    ],
  },
  {
    label: "Body Modules",
    href:  "/modules",
    icon:  "13",
    children: [
      { label: "League Stats Bar",         href: "/modules/stats-bar" },
      { label: "Feature Highlights",       href: "/modules/feature-highlights" },
      { label: "Results & Fixtures Tabs",  href: "/modules/results-fixtures-tabs" },
      { label: "Standings Table",          href: "/modules/standings-table" },
      { label: "MLS-Style Standings",      href: "/modules/mls-standings-table" },
      { label: "Club Directory",           href: "/modules/club-directory" },
      { label: "News & Stories",           href: "/modules/news-grid" },
      { label: "Player Spotlight",         href: "/modules/player-spotlight" },
      { label: "CTA Banner",               href: "/modules/cta-banner" },
      { label: "Skeleton Loader",          href: "/modules/skeleton-loader" },
      { label: "Content Section: Centered", href: "/modules/content-section-centered" },
      { label: "Matchday Block",           href: "/modules/matchday-block" },
      { label: "FAQ Accordion",            href: "/modules/faq-accordion", status: "new" },
    ],
  },
  { label: "Calendar — Day View",  href: "/calendar",     icon: "14" },
  { label: "Club Directory",       href: "/clubs",        icon: "15" },
  { label: "Logo Ticker",          href: "/ticker",       icon: "16" },
];

const resources: NavItem[] = [
  { label: "Patterns",             href: "/patterns",     icon: "10" },
  { label: "Tokens & Dev Guide",   href: "/tokens",       icon: "11" },
];

function flattenForSearch(groups: { title: string; items: NavItem[] }[]) {
  const flat: { title: string; group: string; href: string }[] = [];
  for (const g of groups) {
    for (const it of g.items) {
      flat.push({ title: it.label, group: g.title, href: it.href });
      if (it.children) {
        for (const c of it.children) {
          flat.push({ title: `${it.label} → ${c.label}`, group: g.title, href: c.href });
        }
      }
    }
  }
  return flat;
}

function NavLink({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const pathname = usePathname();
  const active = pathname === item.href;
  const childActive = item.children?.some((c) => pathname === c.href);
  return (
    <>
      <Link
        href={item.href}
        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 hover:bg-black/5"
        style={{
          background: active ? "#091628" : "transparent",
          color:      active ? "#F4EFE6" : "#475569",
          paddingLeft: depth ? 36 : 12,
        }}
      >
        {item.icon && (
          <span className="text-xs font-mono w-5 flex-shrink-0 opacity-60">{item.icon}</span>
        )}
        <span className="flex-1 truncate">{item.label}</span>
        {item.status === "new" && (
          <span
            className="text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded"
            style={{ background: "#10B98122", color: "#10B981", border: "1px solid #10B98144" }}
          >
            new
          </span>
        )}
      </Link>
      {item.children && (active || childActive) && (
        <div className="flex flex-col gap-0.5 mt-0.5 mb-1">
          {item.children.map((c) => (
            <NavLink key={c.href} item={c} depth={1} />
          ))}
        </div>
      )}
    </>
  );
}

function NavGroup({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <div className="mb-6">
      <div className="text-xs font-semibold uppercase tracking-widest mb-2 px-3" style={{ color: "#697279" }}>
        {title}
      </div>
      <div className="flex flex-col gap-0.5">
        {items.map((item) => <NavLink key={item.href} item={item} />)}
      </div>
    </div>
  );
}

export default function Sidebar() {
  const [query, setQuery] = useState("");

  const groups = [
    { title: "Foundations", items: foundations },
    { title: "Components",  items: components  },
    { title: "Resources",   items: resources   },
  ];

  const flat = useMemo(() => flattenForSearch(groups), []);
  const q = query.trim().toLowerCase();
  const results = q
    ? flat.filter((r) => r.title.toLowerCase().includes(q) || r.group.toLowerCase().includes(q))
    : null;

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-64 flex flex-col overflow-y-auto z-50"
      style={{ background: "#F4EFE6", borderRight: "1px solid #E5DCC9" }}
    >
      {/* Logo */}
      <div className="p-5 border-b" style={{ borderColor: "#E5DCC9" }}>
        <div className="mb-3">
          <Image src="/cpsl-horizontal-dark.svg" alt="CPSL" width={160} height={59} unoptimized priority />
        </div>
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold tracking-widest uppercase" style={{ color: "#697279" }}>
            Design System
          </div>
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full inline-block"
            style={{ background: "#FFFFFF", color: "#091628", border: "1px solid #E5DCC9" }}
          >
            v1.0
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 pt-4 pb-2">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "#94A3B8" }}
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search docs…"
            className="w-full rounded-lg pl-9 pr-8 py-2 text-sm focus:outline-none focus-visible:ring-2"
            style={{
              background: "#FFFFFF",
              color:      "#091628",
              border:     "1px solid #E5DCC9",
            }}
            aria-label="Search documentation"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-black/5"
              style={{ color: "#94A3B8" }}
            >
              <X size={12} />
            </button>
          )}
        </div>
      </div>

      {/* Nav or Search Results */}
      <nav className="flex-1 p-4 pt-2">
        {results ? (
          results.length === 0 ? (
            <div className="px-3 py-6 text-xs" style={{ color: "#697279" }}>
              No matches for &quot;{query}&quot;.
            </div>
          ) : (
            <div className="flex flex-col gap-0.5">
              <div className="text-xs font-semibold uppercase tracking-widest mb-2 px-3" style={{ color: "#697279" }}>
                {results.length} result{results.length === 1 ? "" : "s"}
              </div>
              {results.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  onClick={() => setQuery("")}
                  className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-black/5"
                  style={{ color: "#475569" }}
                >
                  <span className="truncate">{r.title}</span>
                  <span className="text-[10px] font-mono opacity-50">{r.group}</span>
                </Link>
              ))}
            </div>
          )
        ) : (
          <>
            <NavGroup title="Foundations" items={foundations} />
            <NavGroup title="Components"  items={components}  />
            <NavGroup title="Resources"   items={resources}   />
          </>
        )}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t text-xs leading-relaxed" style={{ borderColor: "#E5DCC9", color: "#697279" }}>
        Carolina Premier Soccer League<br />
        <span style={{ color: "#94A3B8" }}>Design System · 2026</span>
      </div>
    </aside>
  );
}

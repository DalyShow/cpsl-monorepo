"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, X, ChevronRight } from "lucide-react";

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

const linkBase =
  "flex items-center gap-2.5 rounded-md text-[13px] font-medium transition-all duration-150 hover:bg-slate-50";

function LeafLink({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const pathname = usePathname();
  const active = pathname === item.href;
  return (
    <Link
      href={item.href}
      className={linkBase}
      style={{
        background:  active ? "#091628" : "transparent",
        color:       active ? "#F4EFE6" : "#475569",
        padding:     "7px 10px",
        paddingLeft: depth ? 32 : 10,
        fontSize:    depth ? 12 : 13,
      }}
    >
      {item.icon && (
        <span className="text-[10px] font-mono w-4 flex-shrink-0 opacity-60">{item.icon}</span>
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
  );
}

function AccordionGroup({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const childActive = item.children?.some((c) => pathname === c.href) ?? false;
  const selfActive  = pathname === item.href;
  const [open, setOpen] = useState<boolean>(childActive || selfActive);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={linkBase}
        style={{
          width:       "100%",
          background:  selfActive ? "#091628" : "transparent",
          color:       selfActive ? "#F4EFE6" : "#475569",
          padding:     "7px 10px",
          textAlign:   "left",
          border:      0,
          cursor:      "pointer",
        }}
      >
        {item.icon && (
          <span className="text-[10px] font-mono w-4 flex-shrink-0 opacity-60">{item.icon}</span>
        )}
        <span className="flex-1 truncate">{item.label}</span>
        <ChevronRight
          size={12}
          style={{
            transform:  open ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 200ms cubic-bezier(.2,.8,.2,1)",
            opacity:    selfActive ? 0.7 : 0.5,
          }}
        />
      </button>

      {open && (
        <div className="flex flex-col gap-0.5 mt-0.5 mb-1">
          <Link
            href={item.href}
            className={linkBase}
            style={{
              padding:     "5px 10px",
              paddingLeft: 32,
              fontSize:    12,
              fontStyle:   "italic",
              background:  selfActive ? "#0916281A" : "transparent",
              color:       selfActive ? "#091628" : "#697279",
            }}
          >
            <span className="flex-1 truncate">All {item.label}</span>
          </Link>
          {item.children?.map((c) => (
            <LeafLink key={c.href} item={c} depth={1} />
          ))}
        </div>
      )}
    </div>
  );
}

function NavLink({ item }: { item: NavItem }) {
  if (item.children && item.children.length > 0) {
    return <AccordionGroup item={item} />;
  }
  return <LeafLink item={item} />;
}

function NavGroup({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <div className="mb-5">
      <div className="text-[10px] font-bold uppercase tracking-widest mb-1.5 px-2.5" style={{ color: "#94A3B8" }}>
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
      style={{ background: "#FFFFFF", borderRight: "1px solid #E2E8F0" }}
    >
      {/* Logo */}
      <div className="p-5 border-b" style={{ borderColor: "#E2E8F0" }}>
        <div className="mb-3">
          <Image src="/cpsl-horizontal-dark.svg" alt="CPSL" width={160} height={59} unoptimized priority />
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#94A3B8" }}>
            Design System
          </div>
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full inline-block"
            style={{ background: "#F4F6FA", color: "#091628", border: "1px solid #E2E8F0" }}
          >
            v1.0
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="px-3 pt-3 pb-2">
        <div className="relative">
          <Search
            size={13}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "#94A3B8" }}
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search docs…"
            className="w-full rounded-md pl-8 pr-7 py-1.5 text-[12px] focus:outline-none focus-visible:ring-2"
            style={{
              background: "#F4F6FA",
              color:      "#091628",
              border:     "1px solid #E2E8F0",
            }}
            aria-label="Search documentation"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-slate-100"
              style={{ color: "#94A3B8" }}
            >
              <X size={11} />
            </button>
          )}
        </div>
      </div>

      {/* Nav or Search Results */}
      <nav className="flex-1 p-3 pt-1">
        {results ? (
          results.length === 0 ? (
            <div className="px-2.5 py-6 text-[12px]" style={{ color: "#94A3B8" }}>
              No matches for &quot;{query}&quot;.
            </div>
          ) : (
            <div className="flex flex-col gap-0.5">
              <div className="text-[10px] font-bold uppercase tracking-widest mb-1.5 px-2.5" style={{ color: "#94A3B8" }}>
                {results.length} result{results.length === 1 ? "" : "s"}
              </div>
              {results.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  onClick={() => setQuery("")}
                  className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-md text-[13px] font-medium hover:bg-slate-50"
                  style={{ color: "#475569" }}
                >
                  <span className="truncate">{r.title}</span>
                  <span className="text-[9px] font-mono opacity-50">{r.group}</span>
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
      <div className="p-4 border-t text-[11px] leading-relaxed" style={{ borderColor: "#E2E8F0", color: "#94A3B8" }}>
        Carolina Premier Soccer League<br />
        <span style={{ color: "#CBD5E1" }}>Design System · 2026</span>
      </div>
    </aside>
  );
}

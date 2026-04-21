"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const foundations = [
  { label: "Overview", href: "/", icon: "⬡" },
  { label: "Color System", href: "/colors", icon: "01" },
  { label: "Typography", href: "/typography", icon: "02" },
  { label: "Grid & Spacing", href: "/grid", icon: "03" },
];
const components = [
  { label: "Buttons & CTAs",       href: "/buttons",      icon: "04" },
  { label: "Inputs & Forms",       href: "/inputs",       icon: "05" },
  { label: "Cards & Lists",        href: "/cards",        icon: "06" },
  { label: "Navigation",           href: "/navigation",   icon: "07" },
  { label: "Feedback & Overlays",  href: "/feedback",     icon: "08" },
  { label: "Data Display",         href: "/data-display", icon: "09" },
  { label: "Hero Sections",        href: "/heroes",       icon: "12" },
  { label: "Body Modules",         href: "/modules",      icon: "13" },
  { label: "Calendar — Day View",  href: "/calendar",     icon: "14" },
  { label: "Club Directory",       href: "/clubs",        icon: "15" },
  { label: "Logo Ticker",          href: "/ticker",       icon: "16" },
];
const resources = [
  { label: "Patterns",             href: "/patterns",     icon: "10" },
  { label: "Tokens & Dev Guide",   href: "/tokens",       icon: "11" },
];

function NavGroup({ title, items }: { title: string; items: typeof foundations }) {
  const pathname = usePathname();
  return (
    <div className="mb-6">
      <div className="text-xs font-semibold uppercase tracking-widest mb-2 px-3" style={{ color: "#334155" }}>
        {title}
      </div>
      <div className="flex flex-col gap-0.5">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150"
              style={{ background: active ? "#C9A74C" : "transparent", color: active ? "#091628" : "#94A3B8" }}>
              <span className="text-xs font-mono w-5 flex-shrink-0 opacity-60">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 flex flex-col overflow-y-auto z-50"
      style={{ background: "#091628", borderRight: "1px solid #1E2D45" }}>
      {/* Logo */}
      <div className="p-5 border-b" style={{ borderColor: "#1E2D45" }}>
        <div className="mb-3">
          <Image
            src="/cpsl-horizontal.svg"
            alt="CPSL"
            width={160}
            height={59}
            unoptimized
            priority
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold tracking-widest uppercase" style={{ color: "#475569" }}>Design System</div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full inline-block"
            style={{ background: "#C9A74C22", color: "#C9A74C", border: "1px solid #C9A74C44" }}>
            v1.0
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 pt-5">
        <NavGroup title="Foundations" items={foundations} />
        <NavGroup title="Components" items={components} />
        <NavGroup title="Resources" items={resources} />
      </nav>

      {/* Footer */}
      <div className="p-4 border-t text-xs leading-relaxed" style={{ borderColor: "#1E2D45", color: "#334155" }}>
        Carolina Premier Soccer League<br />
        <span style={{ color: "#1E2D45" }}>Design System · 2026</span>
      </div>
    </aside>
  );
}

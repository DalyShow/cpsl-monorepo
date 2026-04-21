// Ported from CPSL Design System — components/cpsl/navigation/SubNav.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SubNavLink {
  _key?: string;
  label?: string;
  href?: string;
}

export interface SubNavBlockProps {
  items?: SubNavLink[];
}

export function SubNavBlock({ items }: SubNavBlockProps) {
  const pathname = usePathname();
  const links = (items ?? []).filter(
    (l): l is Required<Pick<SubNavLink, "label" | "href">> & SubNavLink =>
      !!l?.label && !!l?.href
  );
  if (links.length === 0) return null;

  return (
    <div
      style={{
        position: "sticky",
        top: 80,
        zIndex: 40,
        background: "#0A1628",
        borderBottom: "1px solid #1E2D45",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center px-4 sm:px-6">
        <nav className="flex gap-1 overflow-x-auto">
          {links.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item._key ?? item.href}
                href={item.href}
                className="px-3 py-3 border-b-2 transition-colors flex-shrink-0"
                style={{
                  color: active ? "white" : "#7A9BAA",
                  borderColor: active ? "#D4B949" : "transparent",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 600,
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

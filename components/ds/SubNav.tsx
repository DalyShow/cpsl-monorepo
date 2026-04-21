// Ported from CPSL Design System — components/cpsl/navigation/SubNav.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface SubNavItem {
  label: string;
  href: string;
}

export interface SubNavProps {
  items: SubNavItem[];
}

export function SubNav({ items }: SubNavProps) {
  const pathname = usePathname();
  if (!items || items.length === 0) return null;

  return (
    <div
      className="fixed left-0 right-0 z-40"
      style={{
        top: 80,
        background: "#0A1628",
        borderBottom: "1px solid #1E2D45",
      }}
    >
      <div className="max-w-7xl mx-auto h-full flex items-center px-4 sm:px-6">
        <nav className="flex gap-1 overflow-x-auto">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
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

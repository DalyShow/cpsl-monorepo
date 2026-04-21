// Ported from CPSL Design System — components/cpsl/navigation/TopNav.tsx
// Extended for marketing site: Next.js Link, mobile menu, CTA button

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export interface TopNavItem {
  label: string;
  href: string;
}

export interface TopNavProps {
  items?: TopNavItem[];
  logoText?: string;
  logoSub?: string;
  ctaLabel?: string;
  ctaHref?: string;
  showLive?: boolean;
}

export function TopNav({
  items = [
    { label: "League Information",   href: "#league" },
    { label: "For Teams",            href: "#teams" },
    { label: "For Coaches/Managers", href: "#coaches" },
    { label: "Contact",              href: "#contact" },
  ],
  logoText = "CPSL",
  logoSub  = "CAROLINA PREMIER",
  ctaLabel = "Join Our League",
  ctaHref  = "/apply",
  showLive = false,
}: TopNavProps) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [theme, setTheme]             = useState<"light" | "dark">("light");

  useEffect(() => {
    // Sync with whatever data-theme is on <html> at mount
    const current = document.documentElement.dataset.theme as "light" | "dark";
    setTheme(current === "dark" ? "dark" : "light");
  }, []);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    setTheme(next);
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-20"
      style={{ background: "#041124", borderBottom: "1px solid #1E2D45" }}
    >
      <div className="max-w-7xl mx-auto h-full grid grid-cols-[auto_1fr_auto] items-center px-4 sm:px-6">

        {/* ── Logo ─────────────────────────────────────────────── */}
        <Link
          href="/"
          className="flex items-center py-3 flex-shrink-0"
          onClick={() => setActiveIndex(-1)}
        >
          <Image
            src="/cpsl-horizontal.svg"
            alt="CPSL"
            width={148}
            height={54}
            unoptimized
            priority
          />
        </Link>

        {/* ── Centered nav ─────────────────────────────────────── */}
        <nav className="hidden md:flex gap-1 justify-self-center">
          {items.map((item, i) => (
            <Link
              key={item.label}
              href={item.href || "#"}
              onClick={() => setActiveIndex(i)}
              className="px-4 py-4 border-b-2 transition-colors text-[#7A9BAA] hover:text-[#F4EFE6]"
              style={{
                color: i === activeIndex ? "white" : undefined,
                borderColor: i === activeIndex ? "#D4B949" : "transparent",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                textTransform: "uppercase",
                letterSpacing: "0.11em",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* ── Right slot ───────────────────────────────────────── */}
        <div className="flex items-center gap-2 sm:gap-3 justify-self-end">
          {showLive && (
            <div
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold"
              style={{ background: "#FF1744", color: "white" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="hidden sm:inline">Live</span>
            </div>
          )}

          <Link
            href={ctaHref || "#"}
            className="hidden md:flex items-center px-4 py-2 transition-all hover:opacity-90"
            style={{
              background: "#D4B949",
              color: "#041124",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: "14px",
              letterSpacing: "0.04em",
              borderRadius: "6px",
              textTransform: "uppercase",
            }}
          >
            {ctaLabel}
          </Link>

          {/* Theme toggle hidden — dark mode only for now */}

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={`block h-0.5 w-5 rounded transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} style={{ background: "#F4EFE6" }} />
            <span className={`block h-0.5 w-5 rounded transition-all ${menuOpen ? "opacity-0" : ""}`} style={{ background: "#F4EFE6" }} />
            <span className={`block h-0.5 w-5 rounded transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} style={{ background: "#F4EFE6" }} />
          </button>
        </div>
      </div>

      {/* ── Mobile menu ──────────────────────────────────────────────── */}
      {menuOpen && (
        <div style={{ background: "#041124", borderTop: "1px solid #1E2D45" }}>
          {items.map((item, i) => (
            <Link
              key={item.label}
              href={item.href || "#"}
              onClick={() => { setActiveIndex(i); setMenuOpen(false); }}
              className="block px-6 py-4 text-sm font-medium border-b text-[#7A9BAA] hover:text-[#F4EFE6] transition-colors"
              style={{ color: i === activeIndex ? "#D4B949" : undefined, borderColor: "#1E2D45", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 500, fontSize: "15px" }}
            >
              {item.label}
            </Link>
          ))}
          <div className="px-6 py-4">
            <Link
              href={ctaHref || "#"}
              className="block text-center px-4 py-3 rounded-none text-sm font-bold"
              style={{ background: "#D4B949", color: "#041124", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 500, fontSize: "15px" }}
              onClick={() => setMenuOpen(false)}
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

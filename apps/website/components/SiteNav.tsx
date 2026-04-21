"use client";
import { useState } from "react";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "Standings", href: "#standings" },
  { label: "Schedule",  href: "#schedule" },
  { label: "Teams",     href: "#teams" },
  { label: "Stats",     href: "#stats" },
  { label: "News",      href: "#news" },
];

export function SiteNav() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ background: "#020B1A", borderBottom: "1px solid #1E2D45" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-0">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 py-4 flex-shrink-0" onClick={() => setActiveIndex(-1)}>
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "#4A78E8" }}
          >
            <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
              <path d="M1 1L15 1L15 12C15 16 8 17 8 17C8 17 1 16 1 12Z" fill="none" stroke="white" strokeWidth="1.5" />
              <path d="M4 9.5L8 6L12 9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div className="text-white font-bold text-sm leading-none" style={{ fontFamily: "var(--font-display)" }}>
              CPSL
            </div>
            <div className="text-[10px] tracking-widest" style={{ color: "#475569", fontFamily: "var(--font-display)" }}>
              CAROLINA PREMIER
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-1">
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setActiveIndex(i)}
              className="px-4 py-4 text-sm font-medium border-b-2 transition-colors"
              style={{
                color: i === activeIndex ? "white" : "#64748B",
                borderColor: i === activeIndex ? "#4A78E8" : "transparent",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right slot */}
        <div className="flex items-center gap-3">
          {/* Live badge */}
          <div
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold"
            style={{ background: "#FF1744", color: "white" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Live
          </div>

          {/* CTA */}
          <Link
            href="#schedule"
            className="hidden md:flex items-center px-4 py-2 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: "#4A78E8" }}
          >
            Get Tickets
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {[0,1,2].map(i => (
              <span
                key={i}
                className="block h-0.5 w-5 rounded transition-all"
                style={{ background: "#94A3B8" }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: "#0A0E1A", borderTop: "1px solid #1E2D45" }}>
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => { setActiveIndex(i); setMenuOpen(false); }}
              className="block px-6 py-4 text-sm font-medium border-b"
              style={{ color: i === activeIndex ? "#4A78E8" : "#94A3B8", borderColor: "#1E2D45" }}
            >
              {item.label}
            </Link>
          ))}
          <div className="px-6 py-4">
            <Link
              href="#schedule"
              className="block w-full text-center px-4 py-2.5 rounded-xl text-sm font-bold text-white"
              style={{ background: "#4A78E8" }}
              onClick={() => setMenuOpen(false)}
            >
              Get Tickets
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

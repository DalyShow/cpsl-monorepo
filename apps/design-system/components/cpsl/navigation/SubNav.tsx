"use client";
import { useState } from "react";

export interface SubNavItem {
  label: string;
  href?: string;
}

export interface SubNavProps {
  items?: SubNavItem[];
  /** "card" = rounded-2xl with border (default demo style)
   *  "full" = edge-to-edge, no border-radius, bottom border only */
  variant?: "card" | "full";
  defaultActive?: number;
}

export function SubNav({
  items = [
    { label: "Overview" },
    { label: "Rules" },
    { label: "Handbook" },
    { label: "Clubs" },
    { label: "Contact" },
  ],
  variant = "card",
  defaultActive = 0,
}: SubNavProps) {
  const [activeIndex, setActiveIndex] = useState(defaultActive);
  const isFull = variant === "full";

  const inner = (
    <div
      className="flex items-center px-6 py-0"
      style={{ background: "#0A1628" }}
    >
      <nav className="flex gap-1">
        {items.map((item, i) => (
          <button
            key={item.label}
            onClick={() => setActiveIndex(i)}
            className="px-3 py-3 border-b-2 transition-colors"
            style={{
              color: i === activeIndex ? "white" : "#64748B",
              borderColor: i === activeIndex ? "#C9A74C" : "transparent",
              background: "none",
              cursor: "pointer",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600,
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );

  if (isFull) {
    return (
      <div
        style={{
          width: "100%",
          borderBottom: "1px solid #1E2D45",
        }}
      >
        {inner}
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl overflow-hidden border"
      style={{ borderColor: "#1E2D45" }}
    >
      {inner}
    </div>
  );
}

"use client";
import { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface TopNavItem {
  label: string;
}

export interface TopNavProps {
  items?: TopNavItem[];
  logoText?: string;
  userInitials?: string;
  showLive?: boolean;
  showSearch?: boolean;
  defaultActive?: number;
  /** "card" = rounded-2xl with border (default)
   *  "full" = edge-to-edge, no border-radius, bottom border only */
  variant?: "card" | "full";
}

export function TopNav({
  items = [
    { label: "Standings" },
    { label: "Matches" },
    { label: "Teams" },
    { label: "Stats" },
    { label: "News" },
  ],
  logoText = "CPSL",
  userInitials = "JD",
  showLive = false,
  showSearch = false,
  defaultActive = 0,
  variant = "card",
}: TopNavProps) {
  const [activeIndex, setActiveIndex] = useState(defaultActive);
  const isFull = variant === "full";

  const inner = (
    <div
      className="grid grid-cols-[auto_1fr_auto] items-center px-6 py-0"
      style={{ background: "#091628" }}
    >
      {/* Logo */}
      <div className="flex items-center py-4">
        <Image
          src="/cpsl-horizontal.svg"
          alt="CPSL"
          width={140}
          height={52}
          unoptimized
          priority
        />
      </div>

      {/* Nav — centered */}
      <nav className="flex gap-1 justify-self-center">
        {items.map((item, i) => (
          <button
            key={item.label}
            onClick={() => setActiveIndex(i)}
            className="px-4 py-4 border-b-2 transition-colors"
            style={{
              color: i === activeIndex ? "white" : "#64748B",
              borderColor: i === activeIndex ? "#C9A74C" : "transparent",
              background: "none",
              cursor: "pointer",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600,
              fontSize: "14px",
              textTransform: "uppercase",
              letterSpacing: "0.11em",
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Right slot */}
      <div className="flex items-center gap-3">
        {showLive && (
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold"
            style={{ background: "#FF1744", color: "white" }}
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-white" />
            Live
          </div>
        )}

        {showSearch && (
          <div className="relative">
            <Search
              aria-hidden
              className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4"
              style={{ color: "#64748B" }}
            />
            <Input
              type="search"
              placeholder="Search"
              aria-label="Search"
              className="h-9 w-52 pl-8 bg-transparent text-white placeholder:text-[#64748B]"
              style={{ borderColor: "#1E2D45" }}
            />
          </div>
        )}

        <Button variant="cpsl-gold" size="default">Apply Now</Button>

        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
          style={{ background: "#C9A74C", color: "#091628" }}
        >
          {userInitials}
        </div>
      </div>
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

  // Card variant (default)
  return (
    <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "#1E2D45" }}>
      {inner}
    </div>
  );
}

"use client";

// Showcase wrapper around the canonical @cpsl/ui TopNav.
// Source of truth: packages/ui/src/components/top-nav.tsx.
// This file only adds the catalog-specific "card" vs "full" framing;
// edits to the nav itself belong in @cpsl/ui.

import { TopNav as UITopNav, type TopNavProps as UITopNavProps } from "@cpsl/ui";

export interface TopNavItem {
  label: string;
  href?: string;
}

export interface TopNavProps {
  items?: TopNavItem[];
  showLive?: boolean;
  /** "card" = rounded-2xl with border (default showcase framing)
   *  "full" = edge-to-edge, inline with the page flow */
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
  showLive = false,
  variant = "card",
}: TopNavProps) {
  const navItems: UITopNavProps["items"] = items.map((i) => ({
    label: i.label,
    href: i.href ?? "#",
  }));

  const nav = (
    <UITopNav
      items={navItems}
      showLive={showLive}
      position="static"
    />
  );

  if (variant === "full") return nav;

  return (
    <div
      className="rounded-2xl overflow-hidden border"
      style={{ borderColor: "#1E2D45" }}
    >
      {nav}
    </div>
  );
}

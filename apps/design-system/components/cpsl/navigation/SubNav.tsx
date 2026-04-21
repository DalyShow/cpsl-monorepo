"use client";

// Showcase wrapper around the canonical @cpsl/ui SubNav.
// Source of truth: packages/ui/src/components/sub-nav.tsx.
// Edits to the SubNav itself belong in @cpsl/ui.

import { SubNav as UISubNav, type SubNavProps as UISubNavProps } from "@cpsl/ui";

export interface SubNavItem {
  label: string;
  href?: string;
}

export interface SubNavProps {
  items?: SubNavItem[];
  /** "card" = rounded-2xl with border (default showcase framing)
   *  "full" = edge-to-edge, inline with the page flow */
  variant?: "card" | "full";
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
}: SubNavProps) {
  const navItems: UISubNavProps["items"] = items.map((i) => ({
    label: i.label,
    href: i.href ?? "#",
  }));

  const nav = <UISubNav items={navItems} sticky={false} />;

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

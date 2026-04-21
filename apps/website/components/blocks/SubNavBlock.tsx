"use client";

import { SubNav } from "@cpsl/ui";

interface SubNavLink {
  _key?: string;
  label?: string;
  href?: string;
}

export interface SubNavBlockProps {
  items?: SubNavLink[];
}

export function SubNavBlock({ items }: SubNavBlockProps) {
  const links = (items ?? []).filter(
    (l): l is Required<Pick<SubNavLink, "label" | "href">> & SubNavLink =>
      !!l?.label && !!l?.href
  );
  if (links.length === 0) return null;

  return <SubNav items={links.map((l) => ({ label: l.label, href: l.href }))} />;
}

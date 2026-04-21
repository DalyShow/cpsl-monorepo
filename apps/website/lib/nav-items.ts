import type { TopNavItem } from "@cpsl/ui";

/**
 * GROQ projection for siteSettings.navItems that handles both the simple-link
 * and flyout-menu variants. Dereferences icon asset URLs for flyout items.
 */
export const NAV_ITEMS_GROQ = `
  navItems[]{
    _type,
    label,
    // Simple link
    _type == "topNavLink" => { href },
    // Flyout
    _type == "topNavFlyout" => {
      size,
      "items": items[]{
        label,
        description,
        href,
        "iconUrl": icon.asset->url
      },
      "actions": actions[]{
        label,
        href,
        "iconUrl": icon.asset->url
      }
    }
  }
`;

type RawNavItem =
  | {
      _type: "topNavLink";
      label: string;
      href?: string;
    }
  | {
      _type: "topNavFlyout";
      label: string;
      size?: "sm" | "md" | "lg";
      items?: Array<{
        label: string;
        description: string;
        href?: string;
        iconUrl?: string;
      }>;
      actions?: Array<{
        label: string;
        href?: string;
        iconUrl?: string;
      }>;
    };

export type SiteNavSettings = {
  navItems?: RawNavItem[];
  ctaLabel?: string;
  ctaHref?: string;
};

/**
 * Transform Sanity navItems into @cpsl/ui TopNav items.
 * - Simple links pass through as { label, href }.
 * - Flyouts are shaped into { label, flyout: { size, items, actions } } with
 *   icon URLs already resolved by the GROQ projection.
 */
export function resolveTopNavItems(
  raw: RawNavItem[] | undefined | null,
): TopNavItem[] | undefined {
  if (!raw || raw.length === 0) return undefined;

  const resolved: TopNavItem[] = [];

  for (const item of raw) {
    if (!item?.label) continue;

    if (item._type === "topNavLink") {
      resolved.push({ label: item.label, href: item.href ?? "#" });
      continue;
    }

    if (item._type === "topNavFlyout") {
      const flyoutItems = (item.items ?? [])
        .filter((i) => i?.label && i?.description)
        .map((i) => ({
          label: i.label,
          description: i.description,
          href: i.href,
          iconUrl: i.iconUrl,
        }));

      if (flyoutItems.length === 0) continue;

      const flyoutActions = (item.actions ?? [])
        .filter((a) => a?.label)
        .map((a) => ({
          label: a.label,
          href: a.href,
          iconUrl: a.iconUrl,
        }));

      resolved.push({
        label: item.label,
        flyout: {
          size: item.size ?? "md",
          items: flyoutItems,
          actions: flyoutActions.length > 0 ? flyoutActions : undefined,
        },
      });
    }
  }

  return resolved;
}

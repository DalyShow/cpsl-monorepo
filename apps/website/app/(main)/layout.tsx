import { TopNav } from "@cpsl/ui";
import { LogoTickerBlock } from "@/components/blocks/LogoTickerBlock";
import { sanityFetch } from "@/lib/sanity/client";
import {
  NAV_ITEMS_GROQ,
  resolveTopNavItems,
  type SiteNavSettings,
} from "@/lib/nav-items";

/**
 * Shared layout for the main marketing site. Lives in a Next.js route
 * group so brand / studio routes can sit outside this chrome without
 * needing their own opt-out.
 *
 * Two things persist across navigation by virtue of being in this
 * layout (App Router keeps layouts mounted while only children change):
 *   - TopNav: state like the active underline and any future animation
 *     no longer reset on every route change.
 *   - LogoTickerBlock: the marquee keeps running smoothly when the user
 *     moves between pages instead of restarting from frame zero.
 */
export default async function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  let settings: SiteNavSettings | null = null;
  try {
    settings = await sanityFetch<SiteNavSettings>(
      `*[_type == "siteSettings"][0]{ ${NAV_ITEMS_GROQ}, ctaLabel, ctaHref }`
    );
  } catch { /* fall through to TopNav defaults */ }

  return (
    <>
      <TopNav
        items={resolveTopNavItems(settings?.navItems)}
        ctaLabel={settings?.ctaLabel ?? "Join Our League"}
        ctaHref={settings?.ctaHref ?? "/apply"}
        showLive={false}
      />
      {/* pt-20 offsets the fixed nav (80 px). LogoTicker sits directly
          below the nav, then page content. */}
      <div className="pt-20">
        <LogoTickerBlock />
        {children}
      </div>
    </>
  );
}

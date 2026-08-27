import type { Metadata } from "next";
import { TopNavSliding } from "@cpsl/ui";
import { sanityFetch } from "@/lib/sanity/client";
import {
  NAV_ITEMS_GROQ,
  resolveTopNavItems,
  type SiteNavSettings,
} from "@/lib/nav-items";

/**
 * Review page for the shadcn-style sliding navigation. Lives OUTSIDE
 * the (main) route group so the production TopNav doesn't render on
 * top of it — this page shows only the candidate nav, wired to the
 * real siteSettings nav data.
 *
 * Unlinked + noindex. Delete once the nav is promoted (or rejected).
 */

export const metadata: Metadata = {
  title: "Nav Preview — CPSL",
  robots: { index: false, follow: false },
};

export const revalidate = 60;

export default async function NavPreviewPage() {
  let settings: SiteNavSettings | null = null;
  try {
    settings = await sanityFetch<SiteNavSettings>(
      `*[_type == "siteSettings"][0]{ ${NAV_ITEMS_GROQ}, ctaLabel, ctaHref, ctaNewWindow }`
    );
  } catch { /* renders with empty nav */ }

  return (
    <div style={{ minHeight: "200vh", background: "#0A1628" }}>
      <TopNavSliding
        items={resolveTopNavItems(settings?.navItems)}
        ctaLabel={settings?.ctaLabel || undefined}
        ctaHref={settings?.ctaHref || undefined}
        ctaNewWindow={settings?.ctaNewWindow}
      />

      <main
        className="pt-20 flex flex-col items-center text-center px-6"
        style={{ color: "#F4EFE6" }}
      >
        <p
          className="mt-28 mb-4"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "#D4B949",
          }}
        >
          Design Review
        </p>
        <h1
          className="uppercase"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(40px, 5vw, 64px)",
            lineHeight: 1,
            margin: 0,
          }}
        >
          Sliding Navigation
        </h1>
        <p
          className="mt-5 max-w-xl"
          style={{ fontFamily: "Inter, sans-serif", fontSize: 15, lineHeight: 1.7, color: "#94A3B8" }}
        >
          Hover League Info, then glide across to League Standards — the panel
          stays open and slides with you, resizing to fit each menu. The gold
          top strip is gone. Mobile behavior is unchanged.
        </p>
      </main>
    </div>
  );
}

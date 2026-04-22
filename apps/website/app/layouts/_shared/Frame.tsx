import { TopNav, LogoTicker, PromoHero, PromoReveal } from "@cpsl/ui";
import type { LogoTickerLogo } from "@cpsl/ui";
import { sanityFetch } from "@/lib/sanity/client";
import {
  NAV_ITEMS_GROQ,
  resolveTopNavItems,
  type SiteNavSettings,
} from "@/lib/nav-items";

/**
 * Shared frame for the /layouts preview routes.
 * Wires the existing @cpsl/ui design-system components (TopNav,
 * LogoTicker, PromoHero, PromoReveal) around the variant-specific
 * grid. Pulls nav items + logo ticker slides from Sanity so the
 * previews reflect the production content.
 */

type SanityLogo = {
  _key?: string;
  asset?: { url?: string };
  alt?: string;
};

const LOGOS_GROQ = `*[_type == "homePage"][0].sections[_type == "logoTickerBlock"][0].logos[]{
  _key,
  "alt": asset->altText,
  asset->{ url }
}`;

async function fetchLogos(): Promise<LogoTickerLogo[]> {
  const result = await sanityFetch<SanityLogo[]>(LOGOS_GROQ);
  if (!result || result.length === 0) return [];
  return result
    .filter((l): l is SanityLogo & { asset: { url: string } } => !!l?.asset?.url)
    .map((l, i) => ({
      key: l._key ?? String(i),
      url: l.asset.url,
      alt: l.alt ?? "",
    }));
}

interface FrameProps {
  heroHeadline: string;
  heroSubheadline: string;
  heroEyebrow?: string;
  heroBackgroundSeed?: string;
  children: React.ReactNode;
}

export async function Frame({
  heroHeadline,
  heroSubheadline,
  heroEyebrow,
  heroBackgroundSeed = "cpsl-hero",
  children,
}: FrameProps) {
  const [settings, logos] = await Promise.all([
    sanityFetch<SiteNavSettings>(
      `*[_type == "siteSettings"][0]{ ${NAV_ITEMS_GROQ}, ctaLabel, ctaHref }`,
    ).catch(() => null),
    fetchLogos().catch(() => [] as LogoTickerLogo[]),
  ]);

  const navItems = resolveTopNavItems(settings?.navItems);
  const ctaLabel = settings?.ctaLabel ?? "Join the League";
  const ctaHref = settings?.ctaHref ?? "#apply";

  return (
    <>
      <PromoReveal />

      <TopNav items={navItems} ctaLabel={ctaLabel} ctaHref={ctaHref} />

      <main className="pt-20" style={{ background: "#041124", minHeight: "100vh" }}>
        {logos.length > 0 && <LogoTicker logos={logos} sectionBackground="#041124" />}

        <PromoHero
          eyebrow={heroEyebrow}
          headline={heroHeadline}
          subheadline={heroSubheadline}
          backgroundUrl={`https://picsum.photos/seed/${heroBackgroundSeed}/1920/1200`}
          ctaLabel="Apply for Admission"
          ctaHref="#apply"
        />

        {/* Vertical rhythm between grid sections — matches the gap used
            within each grid so the whole mosaic reads as one beat. */}
        <div
          style={{
            background: "#041124",
            paddingBottom: 80,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {children}
        </div>
      </main>
    </>
  );
}

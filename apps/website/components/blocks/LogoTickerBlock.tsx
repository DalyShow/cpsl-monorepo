import { LogoTicker } from "@cpsl/ui";
import { sanityFetch } from "@/lib/sanity/client";

interface SanityLogo {
  _key?: string;
  asset?: { url?: string; altText?: string };
}

interface LogoTickerSettings {
  logos?:             SanityLogo[];
  durationSeconds?:   number;
  reverse?:           boolean;
  pauseOnHover?:      boolean;
  edgeFade?:          boolean;
  sectionBackground?: string;
}

const QUERY = `*[_type == "siteSettings"][0].logoTicker{
  durationSeconds,
  reverse,
  pauseOnHover,
  edgeFade,
  sectionBackground,
  logos[]{ _key, asset->{ url, altText } }
}`;

/**
 * Server-side block wrapper. The `block` prop has no useful fields —
 * it's a placement marker. The actual config lives on the singleton
 * siteSettings document so the ticker is shared across every page
 * that uses the block.
 */
export async function LogoTickerBlock() {
  const settings = await sanityFetch<LogoTickerSettings>(QUERY);
  if (!settings) return null;

  const mapped = (settings.logos ?? [])
    .filter((l) => !!l?.asset?.url)
    .map((l) => ({
      key: l._key,
      url: l.asset!.url!,
      alt: l.asset!.altText,
    }));

  if (mapped.length === 0) return null;

  return (
    <LogoTicker
      logos={mapped}
      durationSeconds={settings.durationSeconds}
      reverse={settings.reverse}
      pauseOnHover={settings.pauseOnHover}
      edgeFade={settings.edgeFade}
      sectionBackground={settings.sectionBackground}
    />
  );
}

import { LogoTicker } from "@cpsl/ui";
import { sanityFetch } from "@/lib/sanity/client";
import { enhanceImageUrl } from "@/lib/sanity/image";

interface SanityImage {
  _type?: string;
  _key?:  string;
  asset?: { url?: string; altText?: string };
}

interface TickerEntry {
  _type?: "clubLogo" | "image" | string;
  _key?:  string;
  /** Present when _type === "clubLogo". */
  name?:  string;
  /** Present when _type === "clubLogo". */
  logo?:  SanityImage;
  /** Present when _type === "image" (legacy). */
  asset?: SanityImage["asset"];
}

interface LogoTickerSettings {
  logos?:             TickerEntry[];
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
  logos[]{
    _type,
    _key,
    // clubLogo shape
    name,
    logo{ asset->{ url, altText } },
    // legacy bare-image shape
    asset->{ url, altText }
  }
}`;

/**
 * Server-side block wrapper. The `block` prop has no useful fields —
 * it's a placement marker. The actual config lives on the singleton
 * siteSettings document so the ticker is shared across every page
 * that uses the block.
 *
 * Accepts BOTH the new `clubLogo` shape ({ name, logo }) and legacy bare
 * `image` entries so a schema flip doesn't leave old data invisible.
 */
export async function LogoTickerBlock() {
  const settings = await sanityFetch<LogoTickerSettings>(QUERY);
  if (!settings) return null;

  const mapped = (settings.logos ?? [])
    .map((entry) => {
      const asset = entry._type === "clubLogo" ? entry.logo?.asset : entry.asset;
      const url   = asset?.url;
      const alt   = entry.name ?? asset?.altText;
      if (!url) return null;
      return {
        key: entry._key,
        // Logos are mostly flat vector-derived PNGs — sharp=8 keeps edges crisp
        // without crunching the negative space.
        url: enhanceImageUrl(url, { sharp: 8 })!,
        alt,
      };
    })
    .filter((l) => l !== null) as { key?: string; url: string; alt?: string }[];

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

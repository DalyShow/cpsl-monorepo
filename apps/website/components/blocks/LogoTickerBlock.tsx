"use client";

import { LogoTicker } from "@cpsl/ui";

interface TickerLogo {
  _key?: string;
  asset?: { url?: string };
  altText?: string;
}

export interface LogoTickerBlockProps {
  heading?: string;
  logos?: TickerLogo[];
  durationSeconds?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  edgeFade?: boolean;
  sectionBackground?: string;
}

export function LogoTickerBlock({
  heading,
  logos,
  durationSeconds,
  reverse,
  pauseOnHover,
  edgeFade,
  sectionBackground,
}: LogoTickerBlockProps) {
  const mapped = (logos ?? [])
    .filter((l) => !!l?.asset?.url)
    .map((l) => ({
      key: l._key,
      url: l.asset!.url!,
      alt: l.altText,
    }));

  return (
    <LogoTicker
      logos={mapped}
      heading={heading}
      durationSeconds={durationSeconds}
      reverse={reverse}
      pauseOnHover={pauseOnHover}
      edgeFade={edgeFade}
      sectionBackground={sectionBackground}
    />
  );
}

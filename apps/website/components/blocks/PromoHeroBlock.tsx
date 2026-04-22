import { PromoHero } from "@cpsl/ui";

export interface PromoHeroBlockProps {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  ctaLabel?: string;
  ctaHref?: string;
  backgroundImage?: { asset?: { url?: string } };
  backgroundVideo?: { asset?: { url?: string } };
  height?: string;
  fullHeight?: boolean;
  layout?: "center" | "left";
}

/**
 * Sanity wrapper around the @cpsl/ui PromoHero component. Renders
 * the full-bleed hero with an optional image + video background,
 * configurable height and layout.
 */
export function PromoHeroBlock({
  eyebrow,
  headline,
  subheadline,
  ctaLabel,
  ctaHref,
  backgroundImage,
  backgroundVideo,
  height,
  fullHeight,
  layout,
}: PromoHeroBlockProps) {
  if (!headline) return null;
  return (
    <PromoHero
      eyebrow={eyebrow}
      headline={headline}
      subheadline={subheadline}
      ctaLabel={ctaLabel}
      ctaHref={ctaHref}
      backgroundUrl={backgroundImage?.asset?.url}
      videoUrl={backgroundVideo?.asset?.url}
      height={height}
      fullHeight={fullHeight}
      layout={layout}
    />
  );
}

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
}

/**
 * Sanity wrapper around the @cpsl/ui PromoHero component. Renders
 * the full-bleed 70vh hero with an optional image + video background.
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
    />
  );
}

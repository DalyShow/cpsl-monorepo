import { PromoHero } from "@cpsl/ui";

interface SanitySlide {
  _key?: string;
  image?: { asset?: { url?: string } };
  video?: { asset?: { url?: string } };
}

export interface PromoHeroBlockProps {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  ctaLabel?: string;
  ctaHref?: string;
  backgroundImage?: { asset?: { url?: string } };
  backgroundVideo?: { asset?: { url?: string } };
  slides?: SanitySlide[];
  slideDuration?: number;
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
  slides,
  slideDuration,
  height,
  fullHeight,
  layout,
}: PromoHeroBlockProps) {
  if (!headline) return null;
  const mappedSlides = (slides ?? [])
    .map((s) => ({
      imageUrl: s.image?.asset?.url,
      videoUrl: s.video?.asset?.url,
    }))
    .filter((s) => s.imageUrl || s.videoUrl);

  return (
    <PromoHero
      eyebrow={eyebrow}
      headline={headline}
      subheadline={subheadline}
      ctaLabel={ctaLabel}
      ctaHref={ctaHref}
      backgroundUrl={backgroundImage?.asset?.url}
      videoUrl={backgroundVideo?.asset?.url}
      slides={mappedSlides.length > 0 ? mappedSlides : undefined}
      slideDuration={slideDuration}
      height={height}
      fullHeight={fullHeight}
      layout={layout}
    />
  );
}

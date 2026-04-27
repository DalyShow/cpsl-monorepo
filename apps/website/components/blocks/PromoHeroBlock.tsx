import { PromoHero } from "@cpsl/ui";
import { enhanceImageUrl } from "@/lib/sanity/image";

interface SanitySlide {
  _key?: string;
  image?: { asset?: { url?: string } };
  video?: { asset?: { url?: string } };
  graphic?: { asset?: { url?: string } };
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  ctaLabel?: string;
  ctaHref?: string;
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
  const mappedSlides = (slides ?? [])
    .map((s) => ({
      imageUrl: enhanceImageUrl(s.image?.asset?.url),
      videoUrl: s.video?.asset?.url,
      graphicUrl: enhanceImageUrl(s.graphic?.asset?.url, { sharp: 8 }),
      eyebrow: s.eyebrow,
      headline: s.headline,
      subheadline: s.subheadline,
      ctaLabel: s.ctaLabel,
      ctaHref: s.ctaHref,
    }))
    // A slide is useful if it has either media OR its own copy.
    .filter(
      (s) =>
        s.imageUrl ||
        s.videoUrl ||
        s.graphicUrl ||
        s.eyebrow ||
        s.headline ||
        s.subheadline ||
        s.ctaLabel,
    );

  // Only bail if there's literally nothing to show: no top-level
  // headline AND no slides with content or media.
  if (!headline && mappedSlides.length === 0) return null;

  return (
    <PromoHero
      eyebrow={eyebrow}
      headline={headline}
      subheadline={subheadline}
      ctaLabel={ctaLabel}
      ctaHref={ctaHref}
      backgroundUrl={enhanceImageUrl(backgroundImage?.asset?.url)}
      videoUrl={backgroundVideo?.asset?.url}
      slides={mappedSlides.length > 0 ? mappedSlides : undefined}
      slideDuration={slideDuration}
      height={height}
      fullHeight={fullHeight}
      layout={layout}
    />
  );
}

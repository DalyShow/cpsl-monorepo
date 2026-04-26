import { HeroBento } from "@cpsl/ui";

interface SanityImage {
  asset?: { url?: string };
}

interface HeroBentoBlockProps {
  eyebrow?:     string;
  headline?:    string;
  description?: string;
  ctaLabel?:    string;
  ctaHref?:     string;
  heroImage?:   SanityImage;
  subImage?:    SanityImage;
  badge?:       string;
  badgeLabel?:  string;
}

export function HeroBentoBlock({
  eyebrow,
  headline,
  description,
  ctaLabel,
  ctaHref,
  heroImage,
  subImage,
  badge,
  badgeLabel,
}: HeroBentoBlockProps) {
  return (
    <HeroBento
      eyebrow={eyebrow}
      headline={headline}
      description={description}
      ctaLabel={ctaLabel}
      ctaHref={ctaHref}
      heroImage={heroImage?.asset?.url}
      subImage={subImage?.asset?.url}
      badge={badge}
      badgeLabel={badgeLabel}
    />
  );
}

import { HeroBento, type HeroBentoBadge } from "@cpsl/ui";

interface SanityImage {
  asset?: { url?: string };
}

interface SanityBadge {
  _key?: string;
  value?: string;
  label?: string;
}

interface HeroBentoBlockProps {
  eyebrow?:     string;
  headline?:    string;
  description?: string;
  ctaLabel?:    string;
  ctaHref?:     string;
  heroImage?:   SanityImage;
  subImage?:    SanityImage;
  badges?:      SanityBadge[];
}

export function HeroBentoBlock({
  eyebrow,
  headline,
  description,
  ctaLabel,
  ctaHref,
  heroImage,
  subImage,
  badges,
}: HeroBentoBlockProps) {
  const mappedBadges: HeroBentoBadge[] = (badges ?? [])
    .filter((b) => !!b?.value)
    .slice(0, 3)
    .map((b) => ({ value: b.value!, label: b.label }));

  return (
    <HeroBento
      eyebrow={eyebrow}
      headline={headline}
      description={description}
      ctaLabel={ctaLabel}
      ctaHref={ctaHref}
      heroImage={heroImage?.asset?.url}
      subImage={subImage?.asset?.url}
      badges={mappedBadges.length > 0 ? mappedBadges : undefined}
    />
  );
}

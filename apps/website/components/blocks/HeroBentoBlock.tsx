import { HeroBento, type HeroBentoBadge } from "@cpsl/ui";
import { enhanceImageUrl } from "@/lib/sanity/image";

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
      heroImage={enhanceImageUrl(heroImage?.asset?.url)}
      subImage={enhanceImageUrl(subImage?.asset?.url)}
      badges={mappedBadges.length > 0 ? mappedBadges : undefined}
    />
  );
}

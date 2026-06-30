import {
  HeroBento,
  type HeroBentoBadge,
  type HeroBentoBadgeTone,
  type HeroBentoSectionBackground,
} from "@cpsl/ui";
import { enhanceImageUrl } from "@/lib/sanity/image";

interface SanityImage {
  asset?: { url?: string };
}

interface SanityBadge {
  _key?: string;
  value?: string;
  label?: string;
  tone?: HeroBentoBadgeTone;
}

interface HeroBentoBlockProps {
  eyebrow?:           string;
  headline?:          string;
  description?:       string;
  ctaLabel?:          string;
  ctaHref?:           string;
  ctaNewWindow?:      boolean;
  heroImage?:         SanityImage;
  subImage?:          SanityImage;
  badges?:            SanityBadge[];
  sectionBackground?: HeroBentoSectionBackground;
}

export function HeroBentoBlock({
  eyebrow,
  headline,
  description,
  ctaLabel,
  ctaHref,
  ctaNewWindow,
  heroImage,
  subImage,
  badges,
  sectionBackground,
}: HeroBentoBlockProps) {
  const mappedBadges: HeroBentoBadge[] = (badges ?? [])
    .filter((b) => !!b?.value)
    .slice(0, 3)
    .map((b) => ({ value: b.value!, label: b.label, tone: b.tone }));

  return (
    <HeroBento
      eyebrow={eyebrow}
      headline={headline}
      description={description}
      ctaLabel={ctaLabel}
      ctaHref={ctaHref}
      ctaNewWindow={ctaNewWindow}
      heroImage={enhanceImageUrl(heroImage?.asset?.url)}
      subImage={enhanceImageUrl(subImage?.asset?.url)}
      badges={mappedBadges.length > 0 ? mappedBadges : undefined}
      sectionBackground={sectionBackground}
    />
  );
}

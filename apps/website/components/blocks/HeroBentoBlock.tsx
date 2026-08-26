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
  /** Dereferenced documentAsset (projected by the page GROQ). Wins over ctaHref. */
  ctaDocument?:       { fileUrl?: string; filename?: string };
  ctaNewWindow?:      boolean;
  heroImage?:         SanityImage;
  subImage?:          SanityImage;
  badges?:            SanityBadge[];
  sectionBackground?: HeroBentoSectionBackground;
  reverse?:           boolean;
}

export function HeroBentoBlock({
  eyebrow,
  headline,
  description,
  ctaLabel,
  ctaHref,
  ctaDocument,
  ctaNewWindow,
  heroImage,
  subImage,
  badges,
  sectionBackground,
  reverse,
}: HeroBentoBlockProps) {
  const mappedBadges: HeroBentoBadge[] = (badges ?? [])
    .filter((b) => !!b?.value)
    .slice(0, 3)
    .map((b) => ({ value: b.value!, label: b.label, tone: b.tone }));

  // Linked document wins over the manual URL; file links open in a new
  // tab unless the editor explicitly turned that off.
  const resolvedHref      = ctaDocument?.fileUrl || ctaHref;
  const resolvedNewWindow = ctaDocument?.fileUrl ? (ctaNewWindow ?? true) : ctaNewWindow;

  return (
    <HeroBento
      eyebrow={eyebrow}
      headline={headline}
      description={description}
      ctaLabel={ctaLabel}
      ctaHref={resolvedHref}
      ctaNewWindow={resolvedNewWindow}
      heroImage={enhanceImageUrl(heroImage?.asset?.url)}
      subImage={enhanceImageUrl(subImage?.asset?.url)}
      badges={mappedBadges.length > 0 ? mappedBadges : undefined}
      sectionBackground={sectionBackground}
      reverse={reverse}
    />
  );
}

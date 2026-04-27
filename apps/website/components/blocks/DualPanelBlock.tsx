import { DualPanel, type DualPanelItem } from "@cpsl/ui";
import { enhanceImageUrl } from "@/lib/sanity/image";

interface SanityPanel {
  image?: { asset?: { url?: string } };
  video?: { asset?: { url?: string } };
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface DualPanelBlockProps {
  leftPanel?: SanityPanel;
  rightPanel?: SanityPanel;
}

function mapPanel(p: SanityPanel | undefined): DualPanelItem | null {
  if (!p || !p.headline) return null;
  return {
    imageUrl: enhanceImageUrl(p.image?.asset?.url),
    videoUrl: p.video?.asset?.url,
    eyebrow: p.eyebrow,
    headline: p.headline,
    subheadline: p.subheadline,
    ctaLabel: p.ctaLabel,
    ctaHref: p.ctaHref,
  };
}

/**
 * Sanity wrapper around the @cpsl/ui DualPanel component. Both panels
 * are required (headline at minimum) — if either is missing the block
 * renders nothing so half-configured drafts don't ship a broken half.
 */
export function DualPanelBlock({ leftPanel, rightPanel }: DualPanelBlockProps) {
  const left = mapPanel(leftPanel);
  const right = mapPanel(rightPanel);
  if (!left || !right) return null;
  return <DualPanel left={left} right={right} />;
}

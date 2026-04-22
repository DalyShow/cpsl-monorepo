import {
  PhotoTile,
  PromoTile,
  GraphicTile,
  PromoGrid,
  PromoReveal,
  type RevealVariant,
} from "@cpsl/ui";

type TileShared = {
  _key?: string;
  _type: "photoTile" | "promoTile" | "graphicTile";
  colSpan?: number;
  rowSpan?: number;
  minHeight?: number;
  reveal?: RevealVariant;
  loadOnMount?: boolean;
  delay?: number;
};

type SanityPhotoTile = TileShared & {
  _type: "photoTile";
  image?: { asset?: { url?: string }; alt?: string };
  video?: { asset?: { url?: string } };
  eyebrow?: string;
  title?: string;
  href?: string;
  scrim?: number;
};

type SanityPromoTile = TileShared & {
  _type: "promoTile";
  tone: "gold" | "crimson" | "cream";
  eyebrow?: string;
  title: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  backgroundImage?: { asset?: { url?: string } };
  backgroundVideo?: { asset?: { url?: string } };
  mediaOverlay?: number;
};

type SanityGraphicTile = TileShared & {
  _type: "graphicTile";
  tone?: "navy" | "crimson" | "gold";
  pattern?: "hex" | "stripes";
  stat?: string;
  label?: string;
  backgroundImage?: { asset?: { url?: string } };
  backgroundVideo?: { asset?: { url?: string } };
  mediaOverlay?: number;
};

type AnyTile = SanityPhotoTile | SanityPromoTile | SanityGraphicTile;

export interface PromoGridBlockProps {
  cols?: number;
  gap?: number;
  fullBleed?: boolean;
  tiles?: AnyTile[];
}

function spanFromNumber(n: number | undefined, fallback: number): string {
  const v = typeof n === "number" && n > 0 ? n : fallback;
  return `span ${v}`;
}

export function PromoGridBlock({
  cols = 12,
  gap = 16,
  fullBleed = true,
  tiles = [],
}: PromoGridBlockProps) {
  if (!tiles || tiles.length === 0) return null;

  return (
    <>
      {/* PromoReveal injects the scroll-reveal CSS once per page. It's
          idempotent — rendering multiple grids on one page is fine. */}
      <PromoReveal />
      <PromoGrid cols={cols} gap={gap} fullBleed={fullBleed}>
        {tiles.map((t) => {
          const common = {
            key: t._key,
            colSpan: spanFromNumber(t.colSpan, 4),
            rowSpan: spanFromNumber(t.rowSpan, 1),
            reveal: t.reveal ?? "stripe",
            loadOnMount: t.loadOnMount ?? false,
            delay: t.delay ?? 0,
            style: t.minHeight ? { minHeight: t.minHeight } : undefined,
          };

          if (t._type === "photoTile") {
            const src = t.image?.asset?.url;
            if (!src) return null;
            return (
              <PhotoTile
                {...common}
                src={src}
                alt={t.image?.alt ?? ""}
                eyebrow={t.eyebrow}
                title={t.title}
                href={t.href}
                scrim={t.scrim ?? 0.55}
                videoUrl={t.video?.asset?.url}
              />
            );
          }

          if (t._type === "promoTile") {
            return (
              <PromoTile
                {...common}
                tone={t.tone}
                eyebrow={t.eyebrow}
                title={t.title}
                body={t.body}
                ctaLabel={t.ctaLabel}
                ctaHref={t.ctaHref}
                imageUrl={t.backgroundImage?.asset?.url}
                videoUrl={t.backgroundVideo?.asset?.url}
                mediaOverlay={t.mediaOverlay}
              />
            );
          }

          if (t._type === "graphicTile") {
            return (
              <GraphicTile
                {...common}
                tone={t.tone ?? "navy"}
                pattern={t.pattern ?? "hex"}
                stat={t.stat}
                label={t.label}
                imageUrl={t.backgroundImage?.asset?.url}
                videoUrl={t.backgroundVideo?.asset?.url}
                mediaOverlay={t.mediaOverlay}
              />
            );
          }

          return null;
        })}
      </PromoGrid>
    </>
  );
}

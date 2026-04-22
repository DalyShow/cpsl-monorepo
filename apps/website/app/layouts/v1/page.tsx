import {
  PhotoTile,
  PromoTile,
  GraphicTile,
  PromoGrid,
} from "@cpsl/ui";
import { Frame } from "../_shared/Frame";

export const metadata = {
  title: "V1 Bento — CPSL",
  robots: { index: false, follow: false },
};

const seed = (n: string) => `https://picsum.photos/seed/cpsl-${n}/1200/1200`;

export default function V1Page() {
  return (
    <Frame
      heroEyebrow="A New Era Has Begun"
      heroHeadline="League Operator for the National 1 League"
      heroSubheadline="Now accepting applications for the 2026–2027 league year."
      heroBackgroundSeed="v1-hero"
    >
      <PromoGrid cols={12} gap={12}>
        {/* Row 1 — large photo hero-tile spans 4 cols × 2 rows */}
        <PhotoTile
          reveal="hex"
          colSpan="span 6"
          rowSpan="span 2"
          src={seed("matchday")}
          eyebrow="Matchday"
          title="Saturday results,\nlive from every pitch"
          href="#matchday"
          style={{ minHeight: 520 }}
        />

        <PromoTile
          reveal="hex"
          colSpan="span 3"
          tone="gold"
          eyebrow="Applications Open"
          title="Join the League"
          body="Membership applications are now open for the 2026–2027 season."
          ctaLabel="Apply"
          ctaHref="#apply"
          delay={60}
        />

        <GraphicTile
          reveal="hex"
          colSpan="span 3"
          tone="navy"
          pattern="hex"
          stat="24"
          label="Member Clubs"
          delay={120}
        />

        <PhotoTile
          reveal="hex"
          colSpan="span 3"
          src={seed("academy")}
          eyebrow="Academy"
          title="Player Pathways"
          href="#academy"
          delay={180}
          style={{ minHeight: 260 }}
        />

        <PhotoTile
          reveal="hex"
          colSpan="span 3"
          src={seed("coaches")}
          eyebrow="Coaches"
          title="Resources & Education"
          href="#coaches"
          delay={240}
          style={{ minHeight: 260 }}
        />

        {/* Row — cream + crimson accent + graphic */}
        <PromoTile
          reveal="hex"
          colSpan="span 4"
          tone="cream"
          eyebrow="League Info"
          title="Competition Formats"
          body="Premiership, NPL, CPSL Cup, and age-group structures explained."
          ctaLabel="View Handbook"
          ctaHref="#handbook"
        />
        <PromoTile
          reveal="hex"
          colSpan="span 4"
          tone="crimson"
          eyebrow="Season Calendar"
          title="Key Dates & Matchday Windows"
          body="Track cup rounds, international breaks, and window closes."
          ctaLabel="Full Calendar"
          ctaHref="#calendar"
          delay={80}
        />
        <PhotoTile
          reveal="hex"
          colSpan="span 4"
          src={seed("stadium")}
          eyebrow="Venues"
          title="NC & SC Venues"
          href="#venues"
          delay={160}
        />

        {/* Final band — wide photo */}
        <PhotoTile
          reveal="hex"
          colSpan="span 12"
          src={seed("crowd-1600")}
          eyebrow="Supporter Culture"
          title="Two states, one league"
          href="#news"
          style={{ minHeight: 320 }}
        />
      </PromoGrid>
    </Frame>
  );
}

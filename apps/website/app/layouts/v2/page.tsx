import {
  PhotoTile,
  PromoTile,
  GraphicTile,
  PromoGrid,
} from "@cpsl/ui";
import { Frame } from "../_shared/Frame";

export const metadata = {
  title: "V2 Editorial — CPSL",
  robots: { index: false, follow: false },
};

const seed = (n: string) => `https://picsum.photos/seed/cpsl-v2-${n}/1600/1600`;

export default function V2Page() {
  return (
    <Frame
      heroEyebrow="A New Era Has Begun"
      heroHeadline="League Operator for the National 1 League"
      heroSubheadline="Now accepting applications for the 2026–2027 league year."
      heroBackgroundSeed="v2-hero"
    >
      {/* ── Section 1 — Silky anchor + gold apply + academy.
            All three animate on mount with a cascaded delay. ── */}
      <PromoGrid cols={12} gap={16} fullBleed>
        {/* Main anchor — silky, very tall */}
        <PhotoTile
          reveal="silk"
          loadOnMount
          colSpan="span 7"
          rowSpan="span 2"
          src={seed("anchor")}
          eyebrow="Featured"
          title="The weekend that reshaped the table"
          href="#story"
          style={{ minHeight: 720 }}
          scrim={0.60}
        />

        {/* Top-right — gold applications CTA, big type */}
        <PromoTile
          reveal="stripe"
          loadOnMount
          colSpan="span 5"
          tone="gold"
          eyebrow="Applications Open"
          title="Season 2026–27"
          body="Applications close July 15. Member and partner clubs welcome."
          ctaLabel="Apply"
          ctaHref="#apply"
          delay={200}
          style={{ minHeight: 340, padding: 40 }}
        />

        {/* Bottom-right — academy photo */}
        <PhotoTile
          reveal="stripe"
          loadOnMount
          colSpan="span 5"
          src={seed("academy")}
          eyebrow="Academy"
          title="Inside training"
          href="#academy"
          delay={360}
          style={{ minHeight: 340 }}
        />
      </PromoGrid>

      {/* ── Full-bleed crimson band — the Cup ── */}
      <PromoTile
        reveal="stripe"
        tone="crimson"
        eyebrow="Cup"
        title="The CPSL Cup returns"
        body="Single-elimination knockout across all 24 clubs. Draw reveal: June 12."
        ctaLabel="Draw Details"
        ctaHref="#cup"
        style={{
          padding: "72px clamp(30px, 6vw, 96px)",
          minHeight: 300,
          borderRadius: 0,
        }}
      />

      {/* ── Section 2 — Tall handbook + stat + matchday ── */}
      <PromoGrid cols={12} gap={16} fullBleed>
        {/* Tall cream handbook — anchor of this section */}
        <PromoTile
          reveal="stripe"
          colSpan="span 5"
          rowSpan="span 2"
          tone="cream"
          eyebrow="Rules & Handbook"
          title="Competition formats"
          body="Premiership, NPL, CPSL Cup, and full age-group structures — with discipline procedures and appeals for the 2026–27 season."
          ctaLabel="Read handbook"
          ctaHref="#handbook"
          style={{ minHeight: 680, padding: 48 }}
        />

        {/* Top-right — wide matchday photo */}
        <PhotoTile
          reveal="stripe"
          colSpan="span 7"
          src={seed("matchday")}
          eyebrow="Matchday"
          title="Saturday preview"
          href="#matchday"
          delay={80}
          style={{ minHeight: 330 }}
        />

        {/* Bottom-right — stat graphic with soccer-field markings */}
        <GraphicTile
          reveal="stripe"
          colSpan="span 7"
          tone="navy"
          pattern="hex"
          stat="24"
          label="Member Clubs"
          delay={160}
          style={{ minHeight: 330, padding: 40 }}
        />
      </PromoGrid>

      {/* ── Final closer — full-width supporter photo ── */}
      <PromoGrid cols={12} gap={16} fullBleed>
        <PhotoTile
          reveal="stripe"
          colSpan="span 12"
          src={seed("supporter-finale")}
          eyebrow="Supporter Culture"
          title="Two states, one league"
          href="#news"
          style={{ minHeight: 440 }}
          scrim={0.45}
        />
      </PromoGrid>
    </Frame>
  );
}

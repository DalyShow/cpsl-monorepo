import {
  PhotoTile,
  PromoTile,
  GraphicTile,
  PromoGrid,
} from "@cpsl/ui";
import { Frame } from "../_shared/Frame";

export const metadata = {
  title: "V3 Magazine — CPSL",
  robots: { index: false, follow: false },
};

const seed = (n: string) => `https://picsum.photos/seed/cpsl-v3-${n}/1200/1200`;

export default function V3Page() {
  return (
    <Frame
      heroEyebrow="A New Era Has Begun"
      heroHeadline="League Operator for the National 1 League"
      heroSubheadline="Now accepting applications for the 2026–2027 league year."
      heroBackgroundSeed="v3-hero"
    >
      <PromoGrid cols={12} gap={10}>
        {/* Row 1 — dense mix */}
        <PhotoTile reveal="goal" colSpan="span 5" src={seed("a")} eyebrow="Feature"   title="This week in the league" href="#news"  style={{ minHeight: 320 }} />
        <PhotoTile reveal="goal" colSpan="span 4" src={seed("b")} eyebrow="Matchday"  title="Saturday preview"         href="#preview" delay={60} style={{ minHeight: 320 }} />
        <PromoTile reveal="goal" colSpan="span 3" tone="gold"
          eyebrow="Apply" title="Season 2026–27" body="Window closes July 15." ctaLabel="Apply" ctaHref="#apply" delay={120} />

        {/* Row 2 — quartet of square photos */}
        <PhotoTile reveal="goal" colSpan="span 3" src={seed("c")} eyebrow="Club" title="Charlotte FC" href="#charlotte-fc"  style={{ aspectRatio: "1" }} />
        <PhotoTile reveal="goal" colSpan="span 3" src={seed("d")} eyebrow="Club" title="Raleigh Athletic" href="#raleigh-athletic" delay={60} style={{ aspectRatio: "1" }} />
        <PhotoTile reveal="goal" colSpan="span 3" src={seed("e")} eyebrow="Club" title="Triangle FC" href="#triangle-fc" delay={120} style={{ aspectRatio: "1" }} />
        <PhotoTile reveal="goal" colSpan="span 3" src={seed("f")} eyebrow="Club" title="Coastal SC" href="#coastal-sc" delay={180} style={{ aspectRatio: "1" }} />

        {/* Row 3 — tall crimson + tall photo + graphic */}
        <PromoTile reveal="goal" colSpan="span 4" rowSpan="span 2" tone="crimson"
          eyebrow="Cup" title="CPSL Cup 2026"
          body="Knockout across all 24 clubs. Draw reveal June 12, first round June 28."
          ctaLabel="Draw" ctaHref="#cup" style={{ minHeight: 420 }} />

        <PhotoTile reveal="goal" colSpan="span 4" rowSpan="span 2"
          src={seed("tall")} eyebrow="Academy" title="Pathway to the pros" href="#academy"
          delay={80} style={{ minHeight: 420 }} />

        <GraphicTile reveal="goal" colSpan="span 4" tone="gold" pattern="stripes"
          stat="24" label="Member Clubs" delay={160} />
        <GraphicTile reveal="goal" colSpan="span 4" tone="navy"  pattern="hex"
          stat="84" label="Matches This Week" delay={220} />

        {/* Row 4 — cream + photo + cream */}
        <PromoTile reveal="goal" colSpan="span 4" tone="cream"
          eyebrow="Rules" title="Handbook"
          body="Competition formats, discipline, appeals."
          ctaLabel="Read" ctaHref="#handbook" />
        <PhotoTile reveal="goal" colSpan="span 4" src={seed("g")} eyebrow="Venues" title="Stadium guide" href="#venues" delay={80} style={{ minHeight: 280 }} />
        <PromoTile reveal="goal" colSpan="span 4" tone="cream"
          eyebrow="Press" title="Media Centre"
          body="Match reports, press packs, and broadcast schedules."
          ctaLabel="Latest" ctaHref="#press" delay={160} />

        {/* Final wide photo */}
        <PhotoTile reveal="goal" colSpan="span 12" src={seed("crowd")} eyebrow="Supporter Culture" title="Two states, one league" href="#news" style={{ minHeight: 340 }} />
      </PromoGrid>
    </Frame>
  );
}

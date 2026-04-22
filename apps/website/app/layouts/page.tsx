import Link from "next/link";

export const metadata = {
  title: "Layout Previews — CPSL",
  robots: { index: false, follow: false },
};

const VARIANTS = [
  {
    slug: "v1",
    name: "V1 — Bento Symmetric",
    desc: "Even 12-col rhythm. Large photo slots anchor the page with tone tiles in the gaps.",
    reveal: "Hex iris",
  },
  {
    slug: "v2",
    name: "V2 — Editorial Asymmetric",
    desc: "Deliberate breaks. One hero tile, stacked verticals, full-width bands, mixed 3-col rows.",
    reveal: "Field stripe",
  },
  {
    slug: "v3",
    name: "V3 — Dense Magazine",
    desc: "Tight 12-col weave. Lots of small tiles, photo-heavy density, layered discovery.",
    reveal: "Goal iris",
  },
];

export default function LayoutsIndex() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#041124",
        color: "#F4EFE6",
        fontFamily: "Inter, sans-serif",
        padding: "64px 24px",
      }}
    >
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <p
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#D4B949",
            marginBottom: 12,
          }}
        >
          Scratch / Previews
        </p>
        <h1
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(36px, 6vw, 56px)",
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            margin: "0 0 16px",
          }}
        >
          Homepage Layout Options
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: "#94A3B8", marginBottom: 40 }}>
          Three grid variants built from the same design-system tiles
          ({" "}
          <code style={{ color: "#D4B949" }}>PhotoTile</code>,{" "}
          <code style={{ color: "#D4B949" }}>PromoTile</code>,{" "}
          <code style={{ color: "#D4B949" }}>GraphicTile</code>
          ). Each uses a different soccer-inspired scroll reveal. Pick a
          direction and I&apos;ll port the winner into the production homepage.
        </p>

        <div style={{ display: "grid", gap: 12 }}>
          {VARIANTS.map((v) => (
            <Link
              key={v.slug}
              href={`/layouts/${v.slug}`}
              style={{
                display: "block",
                padding: "22px 24px",
                background: "#0A1628",
                border: "1px solid #1E2D45",
                borderRadius: 12,
                textDecoration: "none",
                color: "#F4EFE6",
                transition: "transform 140ms, border-color 140ms",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: 16,
                  marginBottom: 6,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800,
                    fontSize: 22,
                    textTransform: "uppercase",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {v.name}
                </div>
                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#D4B949",
                  }}
                >
                  Reveal · {v.reveal}
                </div>
              </div>
              <p style={{ margin: 0, color: "#94A3B8", fontSize: 14, lineHeight: 1.55 }}>{v.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

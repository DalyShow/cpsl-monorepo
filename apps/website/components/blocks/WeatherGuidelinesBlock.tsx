import { PortableText } from "@portabletext/react";
import type { PortableTextBlock, PortableTextReactComponents } from "@portabletext/react";

type Tier = "normal" | "caution" | "emphasis" | "warning" | "stop";

interface Row {
  _key?: string;
  range: string;
  guideline: PortableTextBlock[] | string;
  tier?: Tier;
}

interface WeatherGuidelinesBlockProps {
  title:           string;
  eyebrow?:        string;
  intro?:          PortableTextBlock[];
  rangeHeader?:    string;
  guidelineHeader?: string;
  rows:            Row[];
  footnote?:       PortableTextBlock[];
}

// ─── Tier palette (matches the printed PDF's row tints) ─────────────────────

const TIER_STYLE: Record<Tier, { bg: string; text: string; border: string }> = {
  normal:   { bg: "#FFFFFF", text: "#041124", border: "#E5E7EB" },
  caution:  { bg: "#E6EEF6", text: "#041124", border: "#C7D5E4" },
  emphasis: { bg: "#F4EFE6", text: "#041124", border: "#D9CEBF" },
  warning:  { bg: "#FBF3D6", text: "#3E2E00", border: "#EFDFA1" },
  stop:     { bg: "#FBE1E1", text: "#4B0F13", border: "#F1B7B7" },
};

// ─── Portable Text serializers (inherits ink from the row/footnote) ─────────

const richTextComponents: Partial<PortableTextReactComponents> = {
  marks: {
    strong: ({ children }) => <strong style={{ fontWeight: 700 }}>{children}</strong>,
    em:     ({ children }) => <em>{children}</em>,
    underline: ({ children }) => (
      <span style={{ textDecoration: "underline" }}>{children}</span>
    ),
    link: ({ value, children }) => {
      const href = (value as { href?: string; newWindow?: boolean })?.href ?? "#";
      const newWindow = (value as { newWindow?: boolean })?.newWindow;
      return (
        <a
          href={href}
          target={newWindow ? "_blank" : undefined}
          rel={newWindow ? "noopener noreferrer" : undefined}
          style={{ color: "#B0910B", textDecoration: "underline" }}
        >
          {children}
        </a>
      );
    },
  },
  block: {
    normal: ({ children }) => <p style={{ margin: "0.4em 0" }}>{children}</p>,
  },
  list: {
    bullet: ({ children }) => (
      <ul style={{ paddingLeft: "1.1em", margin: "0.4em 0" }}>{children}</ul>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li style={{ margin: "0.2em 0" }}>{children}</li>,
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

export function WeatherGuidelinesBlock({
  title,
  eyebrow,
  intro,
  rangeHeader   = "Heat Index / Feels Like",
  guidelineHeader = "CPSL Guideline",
  rows,
  footnote,
}: WeatherGuidelinesBlockProps) {
  if (!title || !Array.isArray(rows) || rows.length === 0) return null;

  return (
    <>
      <section
        className="cpsl-weather"
        style={{
          background:    "#F4EFE6",
          borderTop:     "1px solid #E5E7EB",
          borderBottom:  "1px solid #E5E7EB",
          padding:       "60px 0",
          color:         "#041124",
        }}
      >
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6">
          {eyebrow && (
            <div
              style={{
                fontFamily:     "'Barlow Condensed', sans-serif",
                fontWeight:     700,
                fontSize:       12,
                letterSpacing:  "0.24em",
                textTransform:  "uppercase",
                color:          "#B0910B",
                marginBottom:   10,
              }}
            >
              {eyebrow}
            </div>
          )}

          <h2
            style={{
              fontFamily:     "'Barlow Condensed', sans-serif",
              fontWeight:     900,
              fontSize:       "clamp(32px, 4vw, 44px)",
              letterSpacing:  "0.02em",
              textTransform:  "uppercase",
              lineHeight:     1,
              margin:         0,
              color:          "#041124",
            }}
          >
            {title}
          </h2>

          {intro && (
            <div
              className="cpsl-weather__intro"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize:   15,
                lineHeight: 1.6,
                color:      "#334155",
                marginTop:  18,
                maxWidth:   820,
              }}
            >
              <PortableText value={intro} components={richTextComponents} />
            </div>
          )}

          {/* ── Table ────────────────────────────────────────────── */}
          <div
            className="cpsl-weather__table"
            style={{
              marginTop:   28,
              border:      "1px solid #041124",
              background:  "#FFFFFF",
            }}
          >
            {/* Header row */}
            <div
              className="cpsl-weather__header"
              style={{
                display:              "grid",
                gridTemplateColumns:  "minmax(160px, 1fr) 3fr",
                background:           "#041124",
                color:                "#F4EFE6",
                fontFamily:           "'Barlow Condensed', sans-serif",
                fontWeight:           700,
                fontSize:             13,
                letterSpacing:        "0.16em",
                textTransform:        "uppercase",
              }}
            >
              <div style={{ padding: "12px 16px", borderRight: "1px solid #1E2D45" }}>
                {rangeHeader}
              </div>
              <div style={{ padding: "12px 16px" }}>{guidelineHeader}</div>
            </div>

            {/* Data rows */}
            {rows.map((row, i) => {
              const tier  = row.tier ?? "normal";
              const style = TIER_STYLE[tier];
              return (
                <div
                  key={row._key ?? i}
                  className={`cpsl-weather__row cpsl-weather__row--${tier}`}
                  style={{
                    display:              "grid",
                    gridTemplateColumns:  "minmax(160px, 1fr) 3fr",
                    background:           style.bg,
                    color:                style.text,
                    borderTop:            i === 0 ? "none" : `1px solid ${style.border}`,
                    fontFamily:           "Inter, sans-serif",
                    fontSize:             14,
                    lineHeight:           1.55,
                  }}
                >
                  <div
                    className="cpsl-weather__range"
                    style={{
                      padding:       "14px 16px",
                      borderRight:   `1px solid ${style.border}`,
                      fontFamily:    "'Barlow Condensed', sans-serif",
                      fontWeight:    700,
                      fontSize:      15,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}
                  >
                    {row.range}
                  </div>
                  <div className="cpsl-weather__guideline" style={{ padding: "14px 16px" }}>
                    {typeof row.guideline === "string" ? (
                      <p style={{ margin: 0 }}>{row.guideline}</p>
                    ) : (
                      <PortableText value={row.guideline} components={richTextComponents} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {footnote && (
            <div
              className="cpsl-weather__footnote"
              style={{
                marginTop:  22,
                fontFamily: "Inter, sans-serif",
                fontSize:   13,
                lineHeight: 1.6,
                color:      "#475569",
                maxWidth:   820,
              }}
            >
              <PortableText value={footnote} components={richTextComponents} />
            </div>
          )}
        </div>
      </section>

      {/* Mobile: stack range over guideline in each row (avoid two-col squeeze). */}
      <style>{`
        @media (max-width: 640px) {
          .cpsl-weather__header {
            display: none !important;
          }
          .cpsl-weather__row {
            grid-template-columns: 1fr !important;
          }
          .cpsl-weather__range {
            border-right: none !important;
            border-bottom: 1px solid rgba(0,0,0,0.06);
            padding: 12px 14px !important;
          }
          .cpsl-weather__guideline {
            padding: 12px 14px !important;
          }
        }
      `}</style>
    </>
  );
}

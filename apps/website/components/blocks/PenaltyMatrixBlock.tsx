import { PortableText } from "@portabletext/react";
import type { PortableTextBlock, PortableTextReactComponents } from "@portabletext/react";

type Tier = "normal" | "warning" | "high" | "severe" | "critical";

interface Row {
  _key?:   string;
  offense: string;
  detail?: string;
  cells?:  string[];
  tier?:   Tier;
}

interface PenaltyMatrixBlockProps {
  title:          string;
  eyebrow?:       string;
  intro?:         PortableTextBlock[];
  offenseHeader?: string;
  columns?:       string[];
  rows:           Row[];
  footnote?:      PortableTextBlock[];
}

// ─── Tier palette (matches the printed matrix's severity tints) ─────────────

const TIER_STYLE: Record<Tier, { bg: string; text: string; border: string }> = {
  normal:   { bg: "",        text: "#041124", border: "#E5E7EB" },
  warning:  { bg: "#F5D662", text: "#3E2E00", border: "#E4C243" },
  high:     { bg: "#F0913D", text: "#3B1D00", border: "#DD7D28" },
  severe:   { bg: "#E04343", text: "#FFF4F4", border: "#C93030" },
  critical: { bg: "#A83A45", text: "#FFF4F4", border: "#8F2C36" },
};

// ─── Portable Text serializers (same treatment as the weather tables) ───────

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

/** A cell's text stacks on line breaks; the first line carries the weight
 *  ("3 games") and the rest reads as supporting detail. */
function CellLines({ text }: { text: string }) {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  if (lines.length === 0) return <span style={{ color: "#94A3B8" }}>—</span>;
  return (
    <>
      {lines.map((line, i) => (
        <p
          key={i}
          style={{
            margin:     i === 0 ? 0 : "6px 0 0",
            fontWeight: i === 0 ? 600 : 400,
            fontSize:   i === 0 ? 14 : 13,
            color:      i === 0 ? "#041124" : "#475569",
            lineHeight: 1.5,
          }}
        >
          {line}
        </p>
      ))}
    </>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export function PenaltyMatrixBlock({
  title,
  eyebrow,
  intro,
  offenseHeader = "Offense",
  columns = [],
  rows,
  footnote,
}: PenaltyMatrixBlockProps) {
  if (!title || !Array.isArray(rows) || rows.length === 0) return null;

  const dataCols = Math.max(1, columns.length);
  const gridTemplate = `minmax(220px, 2.2fr) repeat(${dataCols}, minmax(120px, 1fr))`;

  return (
    <>
      <section
        className="cpsl-matrix"
        style={{
          background:   "#F4EFE6",
          borderTop:    "1px solid #E5E7EB",
          borderBottom: "1px solid #E5E7EB",
          padding:      "60px 0",
          color:        "#041124",
        }}
      >
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6">
          {eyebrow && (
            <div
              style={{
                fontFamily:    "'Barlow Condensed', sans-serif",
                fontWeight:    700,
                fontSize:      12,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color:         "#B0910B",
                marginBottom:  10,
              }}
            >
              {eyebrow}
            </div>
          )}

          <h2
            style={{
              fontFamily:    "'Barlow Condensed', sans-serif",
              fontWeight:    900,
              fontSize:      "clamp(32px, 4vw, 44px)",
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              lineHeight:    1,
              margin:        0,
              color:         "#041124",
            }}
          >
            {title}
          </h2>

          {intro && (
            <div
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

          {/* ── Table (scrolls horizontally on narrow viewports) ── */}
          <div className="cpsl-matrix__scroll" style={{ marginTop: 28, overflowX: "auto" }}>
            <div
              className="cpsl-matrix__table"
              style={{
                border:     "1px solid #041124",
                background: "#FFFFFF",
                minWidth:   dataCols > 1 ? 720 : 560,
              }}
            >
              {/* Header row */}
              <div
                className="cpsl-matrix__row cpsl-matrix__row--head"
                style={{
                  display:             "grid",
                  gridTemplateColumns: gridTemplate,
                  background:          "#041124",
                  color:               "#F4EFE6",
                  fontFamily:          "'Barlow Condensed', sans-serif",
                  fontWeight:          700,
                  fontSize:            13,
                  letterSpacing:       "0.16em",
                  textTransform:       "uppercase",
                }}
              >
                <div style={{ padding: "12px 16px", borderRight: "1px solid #1E2D45" }}>
                  {offenseHeader}
                </div>
                {columns.map((col, i) => (
                  <div
                    key={i}
                    style={{
                      padding:     "12px 16px",
                      borderRight: i < columns.length - 1 ? "1px solid #1E2D45" : "none",
                    }}
                  >
                    {col}
                  </div>
                ))}
              </div>

              {/* Data rows */}
              {rows.map((row, i) => {
                const tier  = row.tier ?? "normal";
                const style = TIER_STYLE[tier];
                // Untinted rows stripe for scanability, like the printed matrix.
                const offenseBg = style.bg || (i % 2 === 0 ? "#EEF1F4" : "#F8FAFC");
                const cellBg    = i % 2 === 0 ? "#F4F6F8" : "#FFFFFF";
                return (
                  <div
                    key={row._key ?? i}
                    className={`cpsl-matrix__row cpsl-matrix__row--${tier}`}
                    style={{
                      display:             "grid",
                      gridTemplateColumns: gridTemplate,
                      borderTop:           i === 0 ? "none" : "1px solid #D8DDE3",
                      fontFamily:          "Inter, sans-serif",
                    }}
                  >
                    <div
                      className="cpsl-matrix__offense"
                      style={{
                        padding:     "14px 16px",
                        background:  offenseBg,
                        color:       style.text,
                        borderRight: "1px solid #D8DDE3",
                      }}
                    >
                      <p
                        style={{
                          margin:     0,
                          fontWeight: 700,
                          fontSize:   14,
                          lineHeight: 1.4,
                        }}
                      >
                        {row.offense}
                      </p>
                      {row.detail && (
                        <p
                          style={{
                            margin:     "6px 0 0",
                            fontWeight: 400,
                            fontSize:   12.5,
                            lineHeight: 1.55,
                            color:      style.bg ? style.text : "#475569",
                            opacity:    style.bg ? 0.9 : 1,
                          }}
                        >
                          {row.detail}
                        </p>
                      )}
                    </div>
                    {Array.from({ length: dataCols }).map((_, c) => (
                      <div
                        key={c}
                        className="cpsl-matrix__cell"
                        data-label={columns[c] ?? ""}
                        style={{
                          padding:     "14px 16px",
                          background:  cellBg,
                          borderRight: c < dataCols - 1 ? "1px solid #D8DDE3" : "none",
                        }}
                      >
                        <CellLines text={row.cells?.[c] ?? ""} />
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          {footnote && (
            <div
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

      {/* Mobile: each row becomes a card — offense on top, labelled cells stacked. */}
      <style>{`
        @media (max-width: 700px) {
          .cpsl-matrix__scroll { overflow-x: visible; }
          .cpsl-matrix__table { min-width: 0 !important; }
          .cpsl-matrix__row--head { display: none !important; }
          .cpsl-matrix__row { grid-template-columns: 1fr !important; }
          .cpsl-matrix__offense { border-right: none !important; }
          .cpsl-matrix__cell {
            border-right: none !important;
            border-top: 1px solid #E5E7EB;
            padding: 10px 16px !important;
          }
          .cpsl-matrix__cell::before {
            content: attr(data-label);
            display: block;
            font-family: 'Barlow Condensed', sans-serif;
            font-weight: 700;
            font-size: 11px;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: #7A8699;
            margin-bottom: 4px;
          }
        }
      `}</style>
    </>
  );
}

"use client";

// ─── Types ────────────────────────────────────────────────────────────────────

export type AlertBarTone = "info" | "warning" | "success" | "danger" | "neutral";

export interface AlertBarProps {
  /** Body copy — usually one line, wraps on narrow viewports. */
  text:        string;
  /** Optional short label to the left of the text (e.g. "Update", "New"). */
  label?:      string;
  /** Optional link at the far right. Omit to render just the message. */
  linkLabel?:  string;
  linkHref?:   string;
  linkNewWindow?: boolean;
  /** Visual tone. Defaults to `info` (navy on cream). */
  tone?:       AlertBarTone;
  /** Optional CSS class hook. */
  className?:  string;
}

// ─── Palette (bg + border + ink + link) ─────────────────────────────────────

const PALETTE: Record<AlertBarTone, {
  bg:      string;
  border:  string;
  ink:     string;
  label:   string;
  linkInk: string;
}> = {
  info: {
    bg:      "#0B1D3A",
    border:  "#1E3A6B",
    ink:     "#F4EFE6",
    label:   "#D4B949",
    linkInk: "#D4B949",
  },
  warning: {
    bg:      "#D4B949",
    border:  "#B39A38",
    ink:     "#1A1408",
    label:   "#1A1408",
    linkInk: "#1A1408",
  },
  success: {
    bg:      "#0F3D2E",
    border:  "#1F6B4F",
    ink:     "#E7F5EF",
    label:   "#7FD1A5",
    linkInk: "#7FD1A5",
  },
  danger: {
    bg:      "#3A0F13",
    border:  "#6B1F24",
    ink:     "#F5E7E9",
    label:   "#F0A5AB",
    linkInk: "#F0A5AB",
  },
  neutral: {
    bg:      "#F4EFE6",
    border:  "#D9CEBF",
    ink:     "#041124",
    label:   "#041124",
    linkInk: "#041124",
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * Site-wide-styled alert bar. Slim, edge-to-edge, page-level block.
 *
 * Layout: [ label? · text ..................... link → ]
 * Stacks vertically below 640px.
 *
 * The bar carries no dismiss button — that lives in siteSettings if we
 * ever add a persistently-dismissible variant later.
 */
export function AlertBar({
  text,
  label,
  linkLabel,
  linkHref,
  linkNewWindow = false,
  tone = "info",
  className = "",
}: AlertBarProps) {
  const p = PALETTE[tone];
  const hasLink = !!(linkLabel && linkHref);

  return (
    <>
      <div
        className={`cpsl-alert cpsl-alert--${tone} ${className}`}
        role="status"
        style={{
          background:    p.bg,
          borderTop:     `1px solid ${p.border}`,
          borderBottom:  `1px solid ${p.border}`,
          color:         p.ink,
        }}
      >
        <div
          className="cpsl-alert__inner max-w-7xl mx-auto w-full px-4 sm:px-6"
          style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "space-between",
            gap:            16,
            padding:        "12px 0",
            flexWrap:       "wrap",
          }}
        >
          <div
            className="cpsl-alert__body"
            style={{
              display:     "flex",
              alignItems:  "center",
              gap:         12,
              flex:        "1 1 auto",
              minWidth:    0,
            }}
          >
            {label && (
              <span
                style={{
                  fontFamily:     "'Barlow Condensed', sans-serif",
                  fontWeight:     700,
                  fontSize:       11,
                  letterSpacing:  "0.18em",
                  textTransform:  "uppercase",
                  color:          p.label,
                  whiteSpace:     "nowrap",
                  flexShrink:     0,
                }}
              >
                {label}
              </span>
            )}
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize:   14,
                fontWeight: 500,
                lineHeight: 1.4,
              }}
            >
              {text}
            </span>
          </div>

          {hasLink && (
            <a
              href={linkHref}
              target={linkNewWindow ? "_blank" : undefined}
              rel={linkNewWindow ? "noopener noreferrer" : undefined}
              className="cpsl-alert__link"
              style={{
                fontFamily:     "'Barlow Condensed', sans-serif",
                fontWeight:     700,
                fontSize:       13,
                letterSpacing:  "0.14em",
                textTransform:  "uppercase",
                color:          p.linkInk,
                textDecoration: "none",
                display:        "inline-flex",
                alignItems:     "center",
                gap:            6,
                borderBottom:   `1px solid ${p.linkInk}`,
                paddingBottom:  1,
                whiteSpace:     "nowrap",
                flexShrink:     0,
              }}
            >
              {linkLabel}
              <span aria-hidden style={{ fontSize: 14, lineHeight: 1 }}>→</span>
            </a>
          )}
        </div>
      </div>

      <style>{`
        .cpsl-alert__link:hover { opacity: 0.85; }
        @media (max-width: 640px) {
          .cpsl-alert__inner { flex-direction: column; align-items: flex-start !important; }
        }
      `}</style>
    </>
  );
}

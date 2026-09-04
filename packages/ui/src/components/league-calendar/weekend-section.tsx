"use client";

import { useEffect, useRef, useState } from "react";

export interface WeekendSectionProps {
  /** Human label, e.g. "The weekend of October 4–5". */
  label:        string;
  matchCount:   number;
  /** When true, section starts expanded. Defaults to false. */
  defaultOpen?: boolean;
  /** Sub-label shown right of the count, e.g. "Sat & Sun · 10 matches". */
  meta?:        string;
  /** Panel layout — "grid" (default, responsive columns) or "list"
   *  (single column of full-width rows, matching the day view). */
  layout?:      "grid" | "list";
  /** Renders the header row smaller and faded — for dates already played,
   *  so upcoming sections carry the visual weight. Default: false. */
  dimmed?:      boolean;
  children:     React.ReactNode;
}

/**
 * Collapsible section wrapping one weekend's matches.
 *
 * Uses `<details>` under the hood so it degrades gracefully without JS and
 * keeps keyboard/AT semantics for free. The animated height is a CSS grid
 * trick (`grid-template-rows: 0fr → 1fr`) that transitions cleanly.
 */
export function WeekendSection({
  label,
  matchCount,
  defaultOpen = false,
  meta,
  layout = "grid",
  dimmed = false,
  children,
}: WeekendSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  // Keep <details>.open in sync when defaultOpen changes (e.g. filters
  // that flip which weekend is "first upcoming").
  useEffect(() => {
    setOpen(defaultOpen);
  }, [defaultOpen]);

  return (
    <>
      <details
        ref={detailsRef}
        className="cpsl-weekend"
        open={open}
        onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}
        style={{
          borderTop:    "1px solid #1E2D45",
          padding:      "0",
        }}
      >
        <summary
          className="cpsl-weekend__summary"
          style={{
            listStyle:      "none",
            cursor:         "pointer",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "space-between",
            gap:            16,
            padding:        "24px 0",
            userSelect:     "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, minWidth: 0 }}>
            <span
              style={{
                fontFamily:     "'Barlow Condensed', sans-serif",
                fontWeight:     700,
                fontSize:       dimmed ? 20 : 28,
                lineHeight:     1,
                letterSpacing:  "0.02em",
                textTransform:  "uppercase",
                color:          dimmed ? "#5B6B7E" : "#F4EFE6",
                transition:     "color 160ms ease",
              }}
            >
              {label}
            </span>
            <span
              style={{
                fontSize:       12,
                fontWeight:     600,
                letterSpacing:  "0.14em",
                textTransform:  "uppercase",
                color:          dimmed ? "#42526B" : "#7A9BAA",
              }}
            >
              {meta ?? `${matchCount} match${matchCount === 1 ? "" : "es"}`}
            </span>
          </div>

          <span style={{ opacity: dimmed ? 0.5 : 1, display: "inline-flex" }}>
            <Chevron open={open} />
          </span>
        </summary>

        <div
          className="cpsl-weekend__panel"
          style={
            layout === "list"
              ? {
                  display:       "flex",
                  flexDirection: "column",
                  gap:           12,
                  paddingBottom: 30,
                }
              : {
                  display:             "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
                  gap:                 16,
                  paddingBottom:       30,
                }
          }
        >
          {children}
        </div>
      </details>

      <style>{`
        .cpsl-weekend__summary::-webkit-details-marker { display: none; }
        .cpsl-weekend__summary:hover { color: #FFFFFF; }
      `}</style>
    </>
  );
}

// ─── Chevron ──────────────────────────────────────────────────────────────────

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#7A9BAA"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={{
        flexShrink: 0,
        transform:  open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 180ms ease",
      }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

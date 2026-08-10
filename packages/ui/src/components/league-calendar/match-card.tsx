"use client";

import type { AgeGroup, CalendarClub, Competition } from "./types";

// ─── Palette (per-competition badge tints) ───────────────────────────────────

const COMPETITION_PALETTE: Record<
  Competition,
  { bg: string; border: string; ink: string; label: string }
> = {
  Premiership: {
    bg:     "rgba(59,130,246,0.15)",
    border: "rgba(59,130,246,0.35)",
    ink:    "#93C5FD",
    label:  "Premiership",
  },
  Cup: {
    bg:     "rgba(201,167,76,0.15)",
    border: "rgba(201,167,76,0.35)",
    ink:    "#E5C97A",
    label:  "CPSL Cup",
  },
  Development: {
    bg:     "rgba(148,163,184,0.15)",
    border: "rgba(148,163,184,0.35)",
    ink:    "#CBD5E1",
    label:  "Development",
  },
};

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MatchCardProps {
  kickoff:      string;      // ISO datetime with offset
  home:         CalendarClub;
  away:         CalendarClub;
  field:        string;
  competition:  Competition;
  ageGroup:     AgeGroup;
  notes?:       string;
  className?:   string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatKickoff(iso: string): string {
  const d = new Date(iso);
  // 12-hour local, no seconds, no leading zero on hour.
  return d.toLocaleTimeString("en-US", {
    hour:   "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatDayLabel(iso: string): string {
  const d = new Date(iso);
  // "Sat · Oct 4"
  const wk = d.toLocaleDateString("en-US", { weekday: "short" });
  const md = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${wk} · ${md}`;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Rich match card — home crest + name, "vs", away crest + name, kickoff,
 * field, plus competition + age-group pills. All decorative, no interactive
 * elements — the card is a link target if the caller wraps it.
 *
 * Layout is desktop-oriented (3-column: home | meta | away) and reflows to
 * a single stacked column below 640px.
 */
export function MatchCard({
  kickoff,
  home,
  away,
  field,
  competition,
  ageGroup,
  notes,
  className = "",
}: MatchCardProps) {
  const palette = COMPETITION_PALETTE[competition];

  return (
    <>
      <article
        className={`cpsl-match-card ${className}`}
        style={{
          background:    "#0A1628",
          border:        "1px solid #1E2D45",
          borderRadius:  0,
          padding:       "18px 20px",
          display:       "grid",
          gridTemplateColumns: "1fr auto 1fr",
          gap:           16,
          alignItems:    "center",
          color:         "#F4EFE6",
        }}
      >
        {/* ── HOME ────────────────────────── */}
        <div className="cpsl-match-card__team cpsl-match-card__team--home">
          <TeamPanel club={home} align="right" />
        </div>

        {/* ── META (time, day, vs) ───────── */}
        <div
          className="cpsl-match-card__meta"
          style={{
            display:        "flex",
            flexDirection:  "column",
            alignItems:     "center",
            gap:            2,
            minWidth:       120,
          }}
        >
          <div
            style={{
              fontFamily:     "'Barlow Condensed', sans-serif",
              fontWeight:     700,
              fontSize:       22,
              lineHeight:     1,
              letterSpacing:  "0.02em",
            }}
          >
            {formatKickoff(kickoff)}
          </div>
          <div
            style={{
              fontSize:       10,
              fontWeight:     600,
              letterSpacing:  "0.14em",
              textTransform:  "uppercase",
              color:          "#7A9BAA",
              marginTop:      2,
            }}
          >
            {formatDayLabel(kickoff)}
          </div>
          <div
            aria-hidden
            style={{
              marginTop:      6,
              fontSize:       10,
              fontWeight:     700,
              letterSpacing:  "0.2em",
              color:          "#475569",
            }}
          >
            VS
          </div>
        </div>

        {/* ── AWAY ────────────────────────── */}
        <div className="cpsl-match-card__team cpsl-match-card__team--away">
          <TeamPanel club={away} align="left" />
        </div>

        {/* ── FOOTER (field + competition + age) ─── */}
        <footer
          className="cpsl-match-card__footer"
          style={{
            gridColumn:   "1 / -1",
            display:      "flex",
            flexWrap:     "wrap",
            alignItems:   "center",
            gap:          10,
            paddingTop:   14,
            marginTop:    4,
            borderTop:    "1px solid #1E2D45",
            fontFamily:   "Inter, sans-serif",
          }}
        >
          {/* Field */}
          <span
            style={{
              display:        "inline-flex",
              alignItems:     "center",
              gap:            6,
              fontSize:       12,
              color:          "#94A3B8",
              flex:           "1 1 auto",
              minWidth:       0,
            }}
          >
            <PinIcon />
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {field}
            </span>
          </span>

          {/* Competition pill */}
          <span
            style={{
              display:        "inline-flex",
              alignItems:     "center",
              padding:        "4px 10px",
              fontSize:       10,
              fontWeight:     700,
              letterSpacing:  "0.14em",
              textTransform:  "uppercase",
              background:     palette.bg,
              border:         `1px solid ${palette.border}`,
              color:          palette.ink,
              borderRadius:   999,
            }}
          >
            {palette.label}
          </span>

          {/* Age group pill */}
          <span
            style={{
              display:        "inline-flex",
              alignItems:     "center",
              padding:        "4px 10px",
              fontSize:       10,
              fontWeight:     700,
              letterSpacing:  "0.14em",
              textTransform:  "uppercase",
              background:     "rgba(148,163,184,0.10)",
              border:         "1px solid rgba(148,163,184,0.25)",
              color:          "#CBD5E1",
              borderRadius:   999,
            }}
          >
            {ageGroup}
          </span>
        </footer>

        {/* ── OPTIONAL NOTE ────────────────── */}
        {notes && (
          <p
            className="cpsl-match-card__note"
            style={{
              gridColumn:   "1 / -1",
              margin:       "6px 0 0",
              fontFamily:   "Inter, sans-serif",
              fontSize:     12,
              fontStyle:    "italic",
              color:        "#7A9BAA",
              lineHeight:   1.5,
            }}
          >
            {notes}
          </p>
        )}
      </article>

      {/* Scoped responsive rules — stack on narrow viewports. */}
      <style>{`
        @media (max-width: 640px) {
          .cpsl-match-card {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .cpsl-match-card__team--home,
          .cpsl-match-card__team--away {
            justify-content: center !important;
          }
          .cpsl-match-card__team--home > * ,
          .cpsl-match-card__team--away > * {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
          .cpsl-match-card__meta {
            padding: 6px 0;
            border-top: 1px solid #1E2D45;
            border-bottom: 1px solid #1E2D45;
          }
          .cpsl-match-card__footer {
            justify-content: center !important;
          }
        }
      `}</style>
    </>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TeamPanel({
  club,
  align,
}: {
  club:  CalendarClub;
  align: "left" | "right";
}) {
  const flexDir = align === "right" ? "row-reverse" : "row";
  const textAlign = align === "right" ? "right" : "left";
  return (
    <div
      style={{
        display:        "flex",
        flexDirection:  flexDir,
        alignItems:     "center",
        gap:            12,
        justifyContent: align === "right" ? "flex-end" : "flex-start",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={club.logoUrl}
        alt=""
        aria-hidden
        width={44}
        height={44}
        style={{
          width:       44,
          height:      44,
          objectFit:   "contain",
          flexShrink:  0,
          filter:      "drop-shadow(0 1px 2px rgba(0,0,0,0.25)) drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
        }}
      />
      <div style={{ textAlign, minWidth: 0 }}>
        <div
          style={{
            fontFamily:     "'Barlow Condensed', sans-serif",
            fontWeight:     700,
            fontSize:       17,
            lineHeight:     1.1,
            letterSpacing:  "0.02em",
            textTransform:  "uppercase",
            overflow:       "hidden",
            textOverflow:   "ellipsis",
            whiteSpace:     "nowrap",
          }}
        >
          {club.name}
        </div>
        <div
          style={{
            fontSize:       10,
            fontWeight:     600,
            letterSpacing:  "0.14em",
            textTransform:  "uppercase",
            color:          "#7A9BAA",
            marginTop:      3,
          }}
        >
          {club.conference}
        </div>
      </div>
    </div>
  );
}

function PinIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={{ flexShrink: 0 }}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

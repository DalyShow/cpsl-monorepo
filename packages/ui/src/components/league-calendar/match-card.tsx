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
  /** Optional team-specific labels rendered inline with the club name,
   *  e.g. "U12 A". Falls back to the match's ageGroup when absent. */
  homeTeamLabel?: string;
  awayTeamLabel?: string;
  field:        string;
  competition:  Competition;
  ageGroup:     AgeGroup;
  notes?:       string;
  /** When true, skip rendering the competition pill in the footer. */
  hideCompetition?: boolean;
  className?:   string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatKickoff(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", {
    hour:   "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Full-width match card. Three-column grid:
 *
 *   HOME NAME · U11    ┃  9:00 AM        ┃  U11 · AWAY NAME
 *   [crest right]      ┃  VS.            ┃  [crest left]
 *                      ┃  Field, right → ┃
 *
 * Meta column stacks kickoff / VS / field. Age lives inline next to
 * each team name (no footer badge — one place, not two). Footer only
 * renders when there's something to show (competition pill or notes).
 */
export function MatchCard({
  kickoff,
  home,
  away,
  homeTeamLabel,
  awayTeamLabel,
  field,
  competition,
  ageGroup,
  notes,
  hideCompetition = false,
  className = "",
}: MatchCardProps) {
  const palette = COMPETITION_PALETTE[competition];
  const homeAge = homeTeamLabel || ageGroup;
  const awayAge = awayTeamLabel || ageGroup;
  const showFooter = !hideCompetition || !!notes;

  return (
    <>
      <article
        className={`cpsl-match-card ${className}`}
        style={{
          background:    "#0A1628",
          border:        "1px solid #1E2D45",
          borderRadius:  0,
          padding:       "16px 24px",
          color:         "#F4EFE6",
          overflow:      "hidden",
          display:       "grid",
          gridTemplateColumns: "minmax(0, 1fr) auto minmax(0, 1fr)",
          rowGap:        12,
          columnGap:     40,
          alignItems:    "center",
        }}
      >
        {/* ── HOME ─────────────────────────────────────────────── */}
        <div className="cpsl-match-card__team cpsl-match-card__team--home" style={{ minWidth: 0 }}>
          <TeamPanel club={home} ageLabel={homeAge} align="right" />
        </div>

        {/* ── META (time · VS · location) ──────────────────────── */}
        <div
          className="cpsl-match-card__meta"
          style={{
            display:        "flex",
            flexDirection:  "column",
            alignItems:     "stretch",
            gap:            4,
            minWidth:       120,
            maxWidth:       320,
          }}
        >
          <div
            className="cpsl-match-card__time"
            style={{
              fontFamily:     "'Barlow Condensed', sans-serif",
              fontWeight:     700,
              fontSize:       28,
              lineHeight:     1,
              letterSpacing:  "0.02em",
              whiteSpace:     "nowrap",
              textAlign:      "center",
            }}
          >
            {formatKickoff(kickoff)}
          </div>
          <div
            aria-hidden
            style={{
              fontFamily:     "'Barlow Condensed', sans-serif",
              fontWeight:     700,
              fontSize:       11,
              letterSpacing:  "0.24em",
              color:          "#475569",
              textAlign:      "center",
            }}
          >
            VS.
          </div>
          <div
            style={{
              display:        "inline-flex",
              alignItems:     "center",
              justifyContent: "flex-end",
              gap:            6,
              fontSize:       12,
              color:          "#94A3B8",
              minWidth:       0,
              marginTop:      2,
            }}
          >
            <PinIcon />
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {field}
            </span>
          </div>
        </div>

        {/* ── AWAY ─────────────────────────────────────────────── */}
        <div className="cpsl-match-card__team cpsl-match-card__team--away" style={{ minWidth: 0 }}>
          <TeamPanel club={away} ageLabel={awayAge} align="left" />
        </div>

        {/* ── FOOTER (competition pill or notes) ───────────────── */}
        {showFooter && (
          <footer
            className="cpsl-match-card__footer"
            style={{
              gridColumn:   "1 / -1",
              display:      "flex",
              flexWrap:     "wrap",
              alignItems:   "center",
              gap:          10,
              paddingTop:   10,
              borderTop:    "1px solid #1E2D45",
              fontFamily:   "Inter, sans-serif",
            }}
          >
            {!hideCompetition && (
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
            )}
            {notes && (
              <span
                style={{
                  fontSize:   12,
                  fontStyle:  "italic",
                  color:      "#7A9BAA",
                  lineHeight: 1.5,
                  flex:       "1 1 auto",
                }}
              >
                {notes}
              </span>
            )}
          </footer>
        )}
      </article>

      {/* Narrow viewports: stack meta between teams. */}
      <style>{`
        @media (max-width: 640px) {
          .cpsl-match-card {
            grid-template-columns: 1fr !important;
            padding: 16px 18px !important;
            row-gap: 8px !important;
          }
          .cpsl-match-card__team--home,
          .cpsl-match-card__team--away {
            justify-content: center !important;
          }
          .cpsl-match-card__team--home > div,
          .cpsl-match-card__team--away > div {
            flex-direction: row !important;
            justify-content: center !important;
          }
          .cpsl-match-card__team--home > div > div,
          .cpsl-match-card__team--away > div > div {
            text-align: center !important;
          }
          .cpsl-match-card__meta {
            max-width: none !important;
          }
          .cpsl-match-card__time {
            font-size: 22px !important;
          }
        }
      `}</style>
    </>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TeamPanel({
  club,
  ageLabel,
  align,
}: {
  club:     CalendarClub;
  ageLabel: string;
  align:    "left" | "right";
}) {
  const flexDir   = align === "right" ? "row-reverse" : "row";
  const textAlign = align === "right" ? "right" : "left";
  return (
    <div
      style={{
        display:        "flex",
        flexDirection:  flexDir,
        alignItems:     "center",
        gap:            14,
        justifyContent: align === "right" ? "flex-end" : "flex-start",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={club.logoUrl}
        alt=""
        aria-hidden
        width={36}
        height={36}
        style={{
          width:       36,
          height:      36,
          objectFit:   "contain",
          flexShrink:  0,
          filter:      "drop-shadow(0 1px 2px rgba(0,0,0,0.25)) drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
        }}
      />
      <div
        style={{
          textAlign,
          minWidth:      0,
          fontFamily:    "'Barlow Condensed', sans-serif",
          textTransform: "uppercase",
          lineHeight:    1.1,
          letterSpacing: "0.02em",
          overflow:      "hidden",
          textOverflow:  "ellipsis",
          whiteSpace:    "nowrap",
        }}
      >
        <span style={{ fontWeight: 700, fontSize: 22 }}>{club.name}</span>
        <span
          style={{
            fontWeight:  700,
            fontSize:    22,
            color:       "#7A9BAA",
            marginLeft:  10,
            marginRight: 0,
          }}
        >
          {ageLabel}
        </span>
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

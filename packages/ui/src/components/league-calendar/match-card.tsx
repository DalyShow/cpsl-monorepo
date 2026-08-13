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
  /** Optional team-specific labels rendered under the club name, e.g. "U12 A".
   *  Use when one crest represents many teams (multi-tier / multi-age clubs). */
  homeTeamLabel?: string;
  awayTeamLabel?: string;
  field:        string;
  competition:  Competition;
  ageGroup:     AgeGroup;
  notes?:       string;
  /** When true, skip rendering the competition pill in the footer. Use for
   *  contexts where every match shares the same competition (e.g. CDL). */
  hideCompetition?: boolean;
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

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Full-width match card, teams stacked vertically:
 *
 *   [crest] Home Team      U11                          9:00 AM
 *   [crest] Away Team      U11
 *   ───────────────────────────────────────────────────────
 *   📍 Field Name          [Premiership] [U11]
 *
 * Time sits vertically centred on the right; date is intentionally omitted
 * (the day header above the grid already says it).
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

  return (
    <>
      <article
        className={`cpsl-match-card ${className}`}
        style={{
          background:    "#0A1628",
          border:        "1px solid #1E2D45",
          borderRadius:  0,
          padding:       "18px 20px",
          color:         "#F4EFE6",
          overflow:      "hidden",
          display:       "grid",
          gridTemplateColumns: "minmax(0, 1fr) auto",
          rowGap:        14,
          columnGap:     20,
          alignItems:    "center",
        }}
      >
        {/* ── TEAMS (stacked) ───────────────────────────────────── */}
        <div
          className="cpsl-match-card__teams"
          style={{
            display:       "flex",
            flexDirection: "column",
            gap:           10,
            minWidth:      0,
          }}
        >
          <TeamRow club={home} teamLabel={homeTeamLabel} />
          <TeamRow club={away} teamLabel={awayTeamLabel} />
        </div>

        {/* ── TIME (right, vertically centred) ─────────────────── */}
        <div
          className="cpsl-match-card__time"
          style={{
            fontFamily:     "'Barlow Condensed', sans-serif",
            fontWeight:     700,
            fontSize:       26,
            lineHeight:     1,
            letterSpacing:  "0.02em",
            whiteSpace:     "nowrap",
            alignSelf:      "center",
          }}
        >
          {formatKickoff(kickoff)}
        </div>

        {/* ── FOOTER (field + competition + age) ─────────────── */}
        <footer
          className="cpsl-match-card__footer"
          style={{
            gridColumn:   "1 / -1",
            display:      "flex",
            flexWrap:     "wrap",
            alignItems:   "center",
            gap:          10,
            paddingTop:   12,
            borderTop:    "1px solid #1E2D45",
            fontFamily:   "Inter, sans-serif",
          }}
        >
          <span
            style={{
              display:    "inline-flex",
              alignItems: "center",
              gap:        6,
              fontSize:   12,
              color:      "#94A3B8",
              flex:       "1 1 auto",
              minWidth:   0,
            }}
          >
            <PinIcon />
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {field}
            </span>
          </span>

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

        {notes && (
          <p
            className="cpsl-match-card__note"
            style={{
              gridColumn:   "1 / -1",
              margin:       0,
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

      {/* Narrow viewports: shrink the time so long team names have more room. */}
      <style>{`
        @media (max-width: 480px) {
          .cpsl-match-card__time { font-size: 20px !important; }
        }
      `}</style>
    </>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TeamRow({
  club,
  teamLabel,
}: {
  club:       CalendarClub;
  teamLabel?: string;
}) {
  return (
    <div
      className="cpsl-match-card__team"
      style={{
        display:    "flex",
        alignItems: "center",
        gap:        12,
        minWidth:   0,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={club.logoUrl}
        alt=""
        aria-hidden
        width={31}
        height={31}
        style={{
          width:       31,
          height:      31,
          objectFit:   "contain",
          flexShrink:  0,
          filter:      "drop-shadow(0 1px 2px rgba(0,0,0,0.25)) drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
        }}
      />
      <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }}>
        <div
          style={{
            fontFamily:     "'Barlow Condensed', sans-serif",
            fontWeight:     700,
            fontSize:       17,
            lineHeight:     1.15,
            letterSpacing:  "0.02em",
            textTransform:  "uppercase",
            overflow:       "hidden",
            textOverflow:   "ellipsis",
            whiteSpace:     "nowrap",
          }}
        >
          {club.name}
        </div>
        {(teamLabel || club.conference) && (
          <div
            style={{
              fontSize:       10,
              fontWeight:     600,
              letterSpacing:  "0.14em",
              textTransform:  "uppercase",
              color:          "#7A9BAA",
            }}
          >
            {teamLabel || club.conference}
          </div>
        )}
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

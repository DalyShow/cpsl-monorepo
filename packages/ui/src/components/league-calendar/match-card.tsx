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
  kickoff:      string;
  home:         CalendarClub;
  away:         CalendarClub;
  homeTeamLabel?: string;
  awayTeamLabel?: string;
  field:        string;
  /** Optional venue address — turns the field label into a directions link. */
  locationAddress?: string;
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
 * Full-width match card. Left side stacks HOME + big VS + AWAY as a
 * single row (both teams read left-to-right, crest first). Right side
 * stacks kickoff over field, both right-aligned within the card.
 *
 *   [crest] HOME · U11    VS    [crest] AWAY · U11          9:00 AM
 *                                                  Manchester Meadows 6B
 */
export function MatchCard({
  kickoff,
  home,
  away,
  homeTeamLabel,
  awayTeamLabel,
  field,
  locationAddress,
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
          gridTemplateColumns: "minmax(0, 1fr) auto",
          rowGap:        12,
          columnGap:     32,
          alignItems:    "center",
        }}
      >
        {/* ── TEAMS: home over VS. over away, stacked ────────────── */}
        <div
          className="cpsl-match-card__teams"
          style={{
            display:       "flex",
            flexDirection: "column",
            alignItems:    "flex-start",
            gap:           6,
            minWidth:      0,
          }}
        >
          <TeamPanel club={home} ageLabel={homeAge} />
          <div
            aria-hidden
            style={{
              fontFamily:     "'Barlow Condensed', sans-serif",
              fontWeight:     900,
              fontSize:       14,
              lineHeight:     1,
              letterSpacing:  "0.24em",
              color:          "#475569",
              marginLeft:     50, // align with the club name (past the 36px crest + 14px gap)
            }}
          >
            VS.
          </div>
          <TeamPanel club={away} ageLabel={awayAge} />
        </div>

        {/* ── META (kickoff + field, right-aligned) ──────────────── */}
        <div
          className="cpsl-match-card__meta"
          style={{
            display:        "flex",
            flexDirection:  "column",
            alignItems:     "flex-end",
            gap:            4,
            textAlign:      "right",
            minWidth:       0,
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
            }}
          >
            {formatKickoff(kickoff)}
          </div>
          <FieldLine field={field} locationAddress={locationAddress} />
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

      {/* Narrow viewports: teams cluster wraps, meta stacks below. */}
      <style>{`
        @media (max-width: 640px) {
          .cpsl-match-card {
            grid-template-columns: 1fr !important;
            padding: 16px 18px !important;
            row-gap: 10px !important;
          }
          .cpsl-match-card__teams {
            gap: 20px !important;
            flex-wrap: wrap;
          }
          .cpsl-match-card__meta {
            align-items: flex-start !important;
            text-align: left !important;
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

function FieldLine({
  field,
  locationAddress,
}: {
  field:            string;
  locationAddress?: string;
}) {
  const baseStyle: React.CSSProperties = {
    display:    "inline-flex",
    alignItems: "center",
    gap:        6,
    fontFamily: "Inter, sans-serif",
    fontSize:   12,
    color:      "#94A3B8",
    minWidth:   0,
    maxWidth:   "100%",
  };
  const label = (
    <>
      <PinIcon />
      <span
        style={{
          overflow:      "hidden",
          textOverflow:  "ellipsis",
          whiteSpace:    "nowrap",
        }}
      >
        {field}
      </span>
    </>
  );

  if (!locationAddress) {
    return <div className="cpsl-match-card__field" style={baseStyle}>{label}</div>;
  }

  const href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(locationAddress)}`;
  return (
    <>
      <a
        className="cpsl-match-card__field cpsl-match-card__field--link"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Directions to ${field}`}
        style={{
          ...baseStyle,
          color:          "#C1D0E0",
          textDecoration: "none",
          cursor:         "pointer",
        }}
      >
        {label}
      </a>
      <style>{`
        .cpsl-match-card__field--link:hover {
          color: #F4EFE6 !important;
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-color: #7A9BAA;
        }
      `}</style>
    </>
  );
}

function TeamPanel({
  club,
  ageLabel,
}: {
  club:     CalendarClub;
  ageLabel: string;
}) {
  return (
    <div
      style={{
        display:    "flex",
        alignItems: "center",
        gap:        14,
        minWidth:   0,
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
          minWidth:      0,
          fontFamily:    "'Barlow Condensed', sans-serif",
          textTransform: "uppercase",
          lineHeight:    1.1,
          letterSpacing: "0.02em",
        }}
      >
        <div
          style={{
            fontWeight:   700,
            fontSize:     22,
            overflow:     "hidden",
            textOverflow: "ellipsis",
            whiteSpace:   "nowrap",
          }}
        >
          {club.name}
        </div>
        {ageLabel && (
          <div
            style={{
              fontWeight:    700,
              fontSize:      13,
              letterSpacing: "0.14em",
              color:         "#7A9BAA",
              marginTop:     2,
              overflow:      "hidden",
              textOverflow:  "ellipsis",
              whiteSpace:    "nowrap",
            }}
          >
            {ageLabel}
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

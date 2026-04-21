"use client";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CalendarMatchStatus = "upcoming" | "live" | "fulltime" | "postponed";
export type CalendarCompetition = "premiership" | "cup" | string;

export interface CalendarMatchTeam {
  name: string;
  shortName?: string;
  position?: number;
  score?: number;
}

export interface CalendarMatchCardProps {
  kickoff: string;                      // e.g. "12:00"
  home: CalendarMatchTeam;
  away: CalendarMatchTeam;
  status: CalendarMatchStatus;
  competition?: CalendarCompetition;    // "premiership" | "cup" | custom label
  matchday?: number;
  venue?: string;
  minute?: number;                      // live minute
  className?: string;
  onClick?: () => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function competitionLabel(comp: CalendarCompetition): string {
  if (comp === "premiership") return "PREMIERSHIP";
  if (comp === "cup") return "CPSL CUP";
  return comp.toUpperCase();
}

function competitionColors(comp: CalendarCompetition) {
  if (comp === "cup") {
    return {
      bg: "rgba(201,167,76,0.12)",
      border: "rgba(201,167,76,0.3)",
      text: "#D4B96E",
    };
  }
  // premiership or default → blue
  return {
    bg: "rgba(59,130,246,0.12)",
    border: "rgba(59,130,246,0.3)",
    text: "#93C5FD",
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CalendarMatchCard({
  kickoff,
  home,
  away,
  status,
  competition = "premiership",
  matchday,
  venue,
  minute,
  className = "",
  onClick,
}: CalendarMatchCardProps) {
  const isLive = status === "live";
  const isResult = status === "fulltime";
  const isPostponed = status === "postponed";
  const isUpcoming = status === "upcoming";
  const cc = competitionColors(competition);

  const borderStyle = isLive
    ? "1px solid rgba(191,29,45,0.45)"
    : "1px solid #1E2D45";

  const boxShadow = isLive
    ? "0 0 0 1px rgba(191,29,45,0.12), 0 4px 16px rgba(191,29,45,0.08)"
    : "none";

  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        borderRadius: 16,
        border: borderStyle,
        background: "#131B2D",
        overflow: "hidden",
        display: "flex",
        cursor: onClick ? "pointer" : "default",
        boxShadow,
        position: "relative",
      }}
    >
      {/* Live accent bar — left edge */}
      {isLive && (
        <div
          style={{
            width: 4,
            flexShrink: 0,
            background: "#BF1D2D",
          }}
        />
      )}

      {/* Kickoff time column */}
      <div
        style={{
          width: isLive ? 84 : 88,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px 0",
          borderRight: "1px solid #1E2D45",
          gap: 4,
        }}
      >
        <div
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: 22,
            color: isPostponed ? "#8899B0" : "white",
            letterSpacing: "-0.5px",
          }}
        >
          {kickoff}
        </div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 10,
            color: "#8899B0",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {isPostponed ? "PPD" : "KICK-OFF"}
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          flex: 1,
          padding: "20px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          minWidth: 0,
        }}
      >
        {/* Top row: competition badge + status */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                padding: "3px 10px",
                borderRadius: 4,
                background: isPostponed ? "rgba(100,116,139,0.1)" : cc.bg,
                border: `1px solid ${isPostponed ? "#1E2D45" : cc.border}`,
              }}
            >
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  color: isPostponed ? "#8899B0" : cc.text,
                }}
              >
                {competitionLabel(competition)}
              </span>
            </div>
            {matchday && (
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  color: "#8899B0",
                }}
              >
                Matchday {matchday}
              </span>
            )}
          </div>

          {/* Status badge */}
          <StatusBadge status={status} minute={minute} />
        </div>

        {/* Teams row */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Home */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: 20,
                color: isPostponed ? "#8899B0" : "white",
                letterSpacing: "0.01em",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {home.name.toUpperCase()}
            </div>
            {home.position != null && (
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#8899B0" }}>
                Home · {ordinal(home.position)} Place
              </div>
            )}
          </div>

          {/* Score / VS */}
          {(isResult || isLive) && home.score != null && away.score != null ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
                background: "#131B2D",
                borderRadius: 10,
                padding: "6px 16px",
                margin: "0 12px",
                gap: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: 28,
                  color: "white",
                  letterSpacing: "-1px",
                }}
              >
                {home.score}
              </span>
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 300,
                  fontSize: 20,
                  color: "#8899B0",
                  margin: "0 8px",
                }}
              >
                —
              </span>
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: 28,
                  color: "white",
                  letterSpacing: "-1px",
                }}
              >
                {away.score}
              </span>
            </div>
          ) : (
            <div
              style={{
                width: 48,
                textAlign: "center",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  color: "#8899B0",
                  letterSpacing: "0.05em",
                }}
              >
                VS
              </span>
            </div>
          )}

          {/* Away */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 4,
              minWidth: 0,
            }}
          >
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: 20,
                color: isPostponed ? "#8899B0" : "white",
                letterSpacing: "0.01em",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {away.name.toUpperCase()}
            </div>
            {away.position != null && (
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#8899B0" }}>
                Away · {ordinal(away.position)} Place
              </div>
            )}
          </div>
        </div>

        {/* Venue row */}
        {venue && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              paddingTop: 12,
              borderTop: "1px solid #1E2D45",
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8899B0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                color: "#8899B0",
              }}
            >
              {venue}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({
  status,
  minute,
}: {
  status: CalendarMatchStatus;
  minute?: number;
}) {
  if (status === "live") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "3px 10px",
          borderRadius: 20,
          background: "rgba(191,29,45,0.15)",
          border: "1px solid rgba(191,29,45,0.35)",
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#BF1D2D",
          }}
        />
        <span
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: "0.06em",
            color: "#F87171",
          }}
        >
          LIVE{minute != null ? ` · ${minute}'` : ""}
        </span>
      </div>
    );
  }

  if (status === "fulltime") {
    return (
      <div
        style={{
          padding: "3px 10px",
          borderRadius: 20,
          background: "rgba(100,116,139,0.12)",
          border: "1px solid rgba(100,116,139,0.25)",
        }}
      >
        <span
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: "0.06em",
            color: "#8899B0",
          }}
        >
          FULL TIME
        </span>
      </div>
    );
  }

  if (status === "postponed") {
    return (
      <div
        style={{
          padding: "3px 10px",
          borderRadius: 20,
          background: "rgba(100,116,139,0.08)",
          border: "1px solid rgba(100,116,139,0.2)",
        }}
      >
        <span
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: "0.06em",
            color: "#8899B0",
          }}
        >
          POSTPONED
        </span>
      </div>
    );
  }

  // upcoming
  return (
    <div
      style={{
        padding: "3px 10px",
        borderRadius: 20,
        background: "rgba(201,167,76,0.12)",
        border: "1px solid rgba(201,167,76,0.25)",
      }}
    >
      <span
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: 11,
          letterSpacing: "0.06em",
          color: "#D4B949",
        }}
      >
        UPCOMING
      </span>
    </div>
  );
}

// ─── Util ─────────────────────────────────────────────────────────────────────

function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

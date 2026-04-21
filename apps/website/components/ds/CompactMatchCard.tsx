"use client";

export type CompactMatchStatus = "upcoming" | "live" | "fulltime" | "postponed";

export interface CompactMatchTeam {
  name: string;
  shortName?: string;  // e.g. "CHA" — auto-derived if omitted
  score?: number;
}

export interface CompactMatchCardProps {
  kickoff: string;            // "14:00"
  home: CompactMatchTeam;
  away: CompactMatchTeam;
  status: CompactMatchStatus;
  competition?: string;       // conference name or "cup"
  matchday?: number;
  venue?: string;
  minute?: number;            // live only
  onClick?: () => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const FONT  = "'Barlow Condensed', sans-serif";
const INTER = "'Inter', sans-serif";

function statusLabel(status: CompactMatchStatus, minute?: number): string {
  if (status === "live") return minute != null ? `${minute}'` : "LIVE";
  if (status === "fulltime") return "FT";
  if (status === "postponed") return "PPD";
  return "";
}

function statusColor(status: CompactMatchStatus): string {
  if (status === "live") return "#F87171";
  if (status === "fulltime") return "#8899B0";
  if (status === "postponed") return "#8899B0";
  return "#8899B0";
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CompactMatchCard({
  kickoff,
  home,
  away,
  status,
  competition = "CPSL",
  matchday,
  venue,
  minute,
  onClick,
}: CompactMatchCardProps) {
  const isLive      = status === "live";
  const isResult    = status === "fulltime";
  const isPostponed = status === "postponed";
  const homeScore   = home.score ?? 0;
  const awayScore   = away.score ?? 0;

  const borderColor = isLive ? "rgba(191,29,45,0.5)" : "#1E2D45";
  const shadow      = isLive ? "0 0 0 1px rgba(191,29,45,0.1), 0 2px 8px rgba(191,29,45,0.06)" : "none";

  return (
    <div
      onClick={onClick}
      style={{
        width: 200,
        flexShrink: 0,
        background: "#131B2D",
        border: `1px solid ${borderColor}`,
        borderRadius: 10,
        overflow: "hidden",
        cursor: onClick ? "pointer" : "default",
        boxShadow: shadow,
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Live accent — top edge */}
      {isLive && (
        <div style={{ height: 2, background: "#BF1D2D", flexShrink: 0 }} />
      )}

      {/* ── Status bar — live / FT / PPD only ── */}
      {(isLive || isResult || isPostponed) && (
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "5px 10px 4px",
          borderBottom: "1px solid #1E2D45",
          gap: 4,
        }}>
          {isLive && (
            <>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#BF1D2D", flexShrink: 0 }} />
              <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 10, letterSpacing: "0.08em", color: "#F87171" }}>
                {statusLabel(status, minute)}
              </span>
            </>
          )}
          {(isResult || isPostponed) && (
            <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 10, letterSpacing: "0.08em", color: statusColor(status) }}>
              {statusLabel(status)}
            </span>
          )}
        </div>
      )}

      {/* ── Teams block ── */}
      <div style={{ padding: "10px 10px 10px", flex: 1 }}>
        {/* Home */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{
            fontFamily: FONT, fontWeight: 700, fontSize: 12,
            letterSpacing: "0.04em", textTransform: "uppercase",
            color: isPostponed ? "#8899B0" : "#F4EFE6",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            minWidth: 0,
          }}>
            {home.name}
          </span>
          <span style={{ fontFamily: FONT, fontWeight: 900, fontSize: 18, color: isPostponed ? "#8899B0" : "#F4EFE6", flexShrink: 0, marginLeft: 8 }}>
            {homeScore}
          </span>
        </div>

        {/* Thin separator */}
        <div style={{ height: 1, background: "#1E2D45", marginBottom: 8 }} />

        {/* Away */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{
            fontFamily: FONT, fontWeight: 700, fontSize: 12,
            letterSpacing: "0.04em", textTransform: "uppercase",
            color: isPostponed ? "#8899B0" : "#F4EFE6",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            minWidth: 0,
          }}>
            {away.name}
          </span>
          <span style={{ fontFamily: FONT, fontWeight: 900, fontSize: 18, color: isPostponed ? "#8899B0" : "#F4EFE6", flexShrink: 0, marginLeft: 8 }}>
            {awayScore}
          </span>
        </div>
      </div>

      {/* ── Footer: venue only ── */}
      {venue && (
        <div style={{
          padding: "5px 10px 7px",
          borderTop: "1px solid #1E2D45",
        }}>
          <span style={{
            fontFamily: INTER, fontSize: 9, color: "#8899B0",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            display: "block",
          }}>
            {venue}
          </span>
        </div>
      )}
    </div>
  );
}

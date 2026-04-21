export interface StandingsListRow {
  team: string;
  init: string;
  color?: string;
  p: number;
  w: number;
  d: number;
  l: number;
  gd: string;
  pts: number;
}

export interface StandingsListProps {
  rows: StandingsListRow[];
  /** Highlight the top row (leader) with a blue tint */
  highlightLeader?: boolean;
}

const COLUMNS = ["P", "W", "D", "L", "GD", "Pts"] as const;

export function StandingsList({ rows, highlightLeader = true }: StandingsListProps) {
  return (
    <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "#E2E8F0", background: "white" }}>
      {/* Header */}
      <div
        className="flex items-center px-5 py-3 text-xs font-bold uppercase tracking-wide"
        style={{ background: "#F4F6FA", borderBottom: "2px solid #E2E8F0", color: "#64748B" }}
      >
        <span className="flex-1">Team</span>
        {COLUMNS.map((h) => (
          <span key={h} className="w-10 text-center">{h}</span>
        ))}
      </div>

      {/* Rows */}
      {rows.map((row, i) => {
        const isLeader = i === 0 && highlightLeader;
        const cells = [row.p, row.w, row.d, row.l, row.gd, row.pts];
        return (
          <div
            key={row.team}
            className="flex items-center px-5 py-3.5 border-b"
            style={{ borderColor: "#F1F5F9", background: isLeader ? "#F2F4F5" : "white" }}
          >
            <div className="flex-1 flex items-center gap-3">
              <span className="text-xs font-mono w-4" style={{ color: "#94A3B8" }}>{i + 1}</span>
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ background: row.color ?? "#94A3B8" }}
              >
                {row.init}
              </div>
              <span className="text-sm font-semibold" style={{ color: "#091628" }}>{row.team}</span>
            </div>
            {cells.map((v, j) => (
              <span
                key={j}
                className="w-10 text-center text-sm"
                style={{
                  color: j === 5 ? "#697279" : "#475569",
                  fontWeight: j === 5 ? 700 : 400,
                }}
              >
                {v}
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
}

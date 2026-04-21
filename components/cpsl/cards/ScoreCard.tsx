export type MatchResult = "WIN" | "LOSS" | "DRAW";

export interface ScoreCardProps {
  competition?: string;
  status?: string;
  homeTeam: string;
  homeInitials: string;
  homeColor?: string;
  awayTeam: string;
  awayInitials: string;
  awayColor?: string;
  score: string;
  result?: MatchResult;
  date?: string;
  venue?: string;
}

const RESULT_COLOR: Record<MatchResult, string> = {
  WIN:  "#00C853",
  LOSS: "#FF1744",
  DRAW: "#94A3B8",
};

export function ScoreCard({
  competition = "CPSL League",
  status = "FT",
  homeTeam,
  homeInitials,
  homeColor = "#697279",
  awayTeam,
  awayInitials,
  awayColor = "#BF1D2D",
  score,
  result,
  date,
  venue,
}: ScoreCardProps) {
  return (
    <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "#E2E8F0" }}>
      {/* Dark header */}
      <div className="px-5 py-4" style={{ background: "#091628" }}>
        <div className="text-xs font-bold mb-4" style={{ color: "#475569" }}>
          {competition} · {status}
        </div>
        <div className="flex items-center justify-between">
          {/* Home team */}
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: homeColor }}
            >
              {homeInitials}
            </div>
            <span className="text-xs text-white">{homeTeam}</span>
          </div>

          {/* Score */}
          <div className="text-center">
            <div className="font-black text-white" style={{ fontSize: "28px", letterSpacing: "-1px" }}>
              {score}
            </div>
            {result && (
              <div className="text-xs mt-1 font-semibold" style={{ color: RESULT_COLOR[result] }}>
                {result}
              </div>
            )}
          </div>

          {/* Away team */}
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: awayColor }}
            >
              {awayInitials}
            </div>
            <span className="text-xs" style={{ color: "#64748B" }}>{awayTeam}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      {(date || venue) && (
        <div className="px-5 py-3 text-xs" style={{ background: "white", color: "#64748B" }}>
          {[date, venue].filter(Boolean).join(" · ")}
        </div>
      )}
    </div>
  );
}

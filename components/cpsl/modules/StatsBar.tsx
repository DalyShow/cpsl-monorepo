import { Separator } from "@/components/ui/separator"

export interface StatItem {
  value: string
  label: string
}

export interface StatsBarProps {
  stats?: StatItem[]
  background?: string
}

const DEFAULT_STATS: StatItem[] = [
  { value: "12",    label: "Clubs" },
  { value: "380+",  label: "Players" },
  { value: "38",    label: "Match Days" },
  { value: "6",     label: "Venues" },
  { value: "2026",  label: "Season" },
]

export function StatsBar({ stats = DEFAULT_STATS, background = "#091628" }: StatsBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-around gap-y-8 px-6 py-8 md:px-12 md:py-9" style={{ background }}>
      {stats.map((s, i) => (
        <div key={s.label} className="flex items-center">
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "var(--text-display-sm)", fontWeight: 800, color: "white", lineHeight: 1, letterSpacing: "-1.5px" }}>
              {s.value}
            </div>
            <div style={{ color: "#475569", fontSize: "10px", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", marginTop: "8px" }}>
              {s.label}
            </div>
          </div>
          {i < stats.length - 1 && <Separator orientation="vertical" className="hidden md:block h-12 opacity-10 mx-6" />}
        </div>
      ))}
    </div>
  )
}

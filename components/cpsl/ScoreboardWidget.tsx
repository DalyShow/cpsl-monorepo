"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export interface TeamScore {
  name: string
  shortName?: string
  /** URL to a team crest/logo image */
  logoUrl?: string
  score: number
}

export type MatchStatus = "live" | "halftime" | "fulltime" | "upcoming" | "postponed"

export interface ScoreboardWidgetProps {
  home: TeamScore
  away: TeamScore
  status: MatchStatus
  /** Minutes elapsed — shown when status is "live" */
  minute?: number
  /** Kickoff time string e.g. "3:00 PM" — shown when status is "upcoming" */
  kickoff?: string
  /** Competition name e.g. "CPSL Premiership" */
  competition?: string
  /** CSS class override */
  className?: string
}

const statusLabel: Record<MatchStatus, string> = {
  live: "LIVE",
  halftime: "HT",
  fulltime: "FT",
  upcoming: "UPCOMING",
  postponed: "PPD",
}

/**
 * ScoreboardWidget
 *
 * A live match scoreboard. Mount anywhere — sidebar, card, hero section.
 *
 * @example
 * <ScoreboardWidget
 *   home={{ name: "Charlotte FC Academy", shortName: "CFA", score: 2 }}
 *   away={{ name: "Raleigh Railhawks U19", shortName: "RLH", score: 1 }}
 *   status="live"
 *   minute={67}
 *   competition="CPSL Premiership"
 * />
 */
export function ScoreboardWidget({
  home,
  away,
  status,
  minute,
  kickoff,
  competition,
  className,
}: ScoreboardWidgetProps) {
  const isLive = status === "live"
  const isUpcoming = status === "upcoming"

  return (
    <div
      data-slot="scoreboard-widget"
      className={cn(
        "w-full max-w-sm rounded-2xl bg-[#091628] text-white overflow-hidden select-none",
        className
      )}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#091628]/80 border-b border-white/10">
        <span className="text-[10px] font-semibold tracking-[2px] uppercase text-white/50">
          {competition ?? "CPSL"}
        </span>
        <div className="flex items-center gap-2">
          {isLive && (
            <span className="size-1.5 rounded-full bg-[#FF1744] animate-pulse block" />
          )}
          <Badge
            variant={
              status === "live" ? "live"
              : status === "halftime" ? "draw"
              : status === "fulltime" ? "secondary"
              : status === "postponed" ? "postponed"
              : "upcoming"
            }
            className="text-[10px] px-2 py-0"
          >
            {statusLabel[status]}
            {isLive && minute != null ? ` ${minute}'` : ""}
          </Badge>
        </div>
      </div>

      {/* Score row */}
      <div className="flex items-center justify-between px-6 py-5">
        {/* Home team */}
        <div className="flex flex-col items-center gap-1.5 flex-1">
          <TeamLogo logoUrl={home.logoUrl} name={home.name} />
          <span className="text-xs font-semibold text-white/70 text-center leading-tight">
            {home.shortName ?? home.name}
          </span>
        </div>

        {/* Scores */}
        <div className="flex items-center gap-3 px-4">
          {isUpcoming ? (
            <div className="flex flex-col items-center">
              <span className="text-4xl font-black font-mono tracking-tighter text-white/30">VS</span>
              {kickoff && (
                <span className="text-[11px] text-white/50 mt-1">{kickoff}</span>
              )}
            </div>
          ) : (
            <>
              <span className="text-5xl font-black font-mono tracking-tighter leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                {home.score}
              </span>
              <span className="text-2xl font-light text-white/30">–</span>
              <span className="text-5xl font-black font-mono tracking-tighter leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                {away.score}
              </span>
            </>
          )}
        </div>

        {/* Away team */}
        <div className="flex flex-col items-center gap-1.5 flex-1">
          <TeamLogo logoUrl={away.logoUrl} name={away.name} />
          <span className="text-xs font-semibold text-white/70 text-center leading-tight">
            {away.shortName ?? away.name}
          </span>
        </div>
      </div>

      {/* Possession bar (live only) */}
      {isLive && (
        <div className="px-4 pb-4">
          <div className="flex justify-between text-[10px] text-white/40 mb-1">
            <span>Possession</span>
            <span>Possession</span>
          </div>
          <div className="flex h-1 rounded-full overflow-hidden bg-white/10">
            <div className="bg-[#697279]" style={{ width: "54%" }} />
            <div className="bg-[#BF1D2D]" style={{ width: "46%" }} />
          </div>
          <div className="flex justify-between text-[10px] text-white/60 mt-1">
            <span>54%</span>
            <span>46%</span>
          </div>
        </div>
      )}
    </div>
  )
}

function TeamLogo({ logoUrl, name }: { logoUrl?: string; name: string }) {
  if (logoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={logoUrl} alt={name} className="size-10 object-contain rounded-full bg-white/10" />
    )
  }
  // Fallback initials crest
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
  return (
    <div className="size-10 rounded-full bg-[#697279]/30 border border-[#697279]/60 flex items-center justify-center">
      <span className="text-xs font-bold text-white">{initials}</span>
    </div>
  )
}

"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { MatchStatus } from "./ScoreboardWidget"

export interface MatchCardProps {
  home: { name: string; shortName?: string; logoUrl?: string; score?: number }
  away: { name: string; shortName?: string; logoUrl?: string; score?: number }
  status: MatchStatus
  /** The team that is "home" from the perspective of the viewer — used to determine WIN/LOSS styling */
  perspectiveTeam?: "home" | "away"
  date?: string
  kickoff?: string
  venue?: string
  competition?: string
  minute?: number
  className?: string
  onClick?: () => void
}

/**
 * MatchCard
 *
 * A compact match summary card. Adapts its visual treatment based on `status`:
 * - upcoming: shows venue & kickoff time
 * - live: shows pulsing live badge + minute
 * - fulltime / halftime: shows final/half-time score with result badge
 * - postponed: muted gray treatment
 *
 * @example
 * <MatchCard
 *   home={{ name: "Charlotte FC Academy", shortName: "CFA", score: 2 }}
 *   away={{ name: "Raleigh Railhawks", shortName: "RLH", score: 1 }}
 *   status="fulltime"
 *   perspectiveTeam="home"
 *   date="Sat 22 Mar"
 *   venue="Matthews Sportsplex"
 *   competition="CPSL Premiership"
 * />
 */
export function MatchCard({
  home,
  away,
  status,
  perspectiveTeam,
  date,
  kickoff,
  venue,
  competition,
  minute,
  className,
  onClick,
}: MatchCardProps) {
  const isPostponed = status === "postponed"
  const isUpcoming = status === "upcoming"
  const isLive = status === "live"
  const isResult = status === "fulltime" || status === "halftime"

  const result: "win" | "loss" | "draw" | null = React.useMemo(() => {
    if (!isResult || perspectiveTeam == null || home.score == null || away.score == null) return null
    const myScore = perspectiveTeam === "home" ? home.score : away.score
    const oppScore = perspectiveTeam === "home" ? away.score : home.score
    if (myScore > oppScore) return "win"
    if (myScore < oppScore) return "loss"
    return "draw"
  }, [isResult, perspectiveTeam, home.score, away.score])

  return (
    <Card
      data-slot="match-card"
      onClick={onClick}
      className={cn(
        "gap-0 py-0 overflow-hidden transition-shadow",
        isPostponed && "opacity-60 grayscale",
        onClick && "cursor-pointer hover:shadow-md",
        result === "win" && "border-l-4 border-l-[#00C853]",
        result === "loss" && "border-l-4 border-l-[#FF1744]",
        result === "draw" && "border-l-4 border-l-[#64748B]",
        isLive && "border-l-4 border-l-[#FF1744]",
        className
      )}
    >
      {/* Card header strip */}
      <div className="flex items-center justify-between px-4 py-2 bg-secondary/50 border-b">
        <div className="flex items-center gap-2">
          {date && (
            <span className="text-[11px] text-muted-foreground font-medium">{date}</span>
          )}
          {competition && (
            <>
              <span className="text-muted-foreground text-[11px]">·</span>
              <span className="text-[11px] text-muted-foreground">{competition}</span>
            </>
          )}
        </div>
        <StatusBadge status={status} minute={minute} result={result} />
      </div>

      <CardContent className="px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Home team */}
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <TeamMini name={home.name} logoUrl={home.logoUrl} />
            <span className="text-sm font-semibold truncate leading-tight">
              {home.shortName ?? home.name}
            </span>
          </div>

          {/* Score / separator */}
          <div className="flex items-center gap-1 px-2 shrink-0">
            {isUpcoming ? (
              <div className="flex flex-col items-center">
                <span className="text-xs text-muted-foreground font-medium">{kickoff ?? "TBD"}</span>
              </div>
            ) : (
              <>
                <span className={cn("text-xl font-black font-mono tabular-nums", isPostponed && "text-muted-foreground")}>
                  {home.score ?? 0}
                </span>
                <span className="text-muted-foreground text-base mx-0.5">–</span>
                <span className={cn("text-xl font-black font-mono tabular-nums", isPostponed && "text-muted-foreground")}>
                  {away.score ?? 0}
                </span>
              </>
            )}
          </div>

          {/* Away team */}
          <div className="flex items-center gap-2.5 flex-1 min-w-0 justify-end">
            <span className="text-sm font-semibold truncate leading-tight text-right">
              {away.shortName ?? away.name}
            </span>
            <TeamMini name={away.name} logoUrl={away.logoUrl} />
          </div>
        </div>
      </CardContent>

      {/* Footer — venue for upcoming, result badge for finished */}
      {(isUpcoming && venue) && (
        <CardFooter className="px-4 py-2 border-t bg-secondary/30">
          <div className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground shrink-0">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-[11px] text-muted-foreground">{venue}</span>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}

function StatusBadge({
  status,
  minute,
  result,
}: {
  status: MatchStatus
  minute?: number
  result: "win" | "loss" | "draw" | null
}) {
  if (status === "live") {
    return (
      <Badge variant="live" className="text-[10px] px-1.5">
        LIVE {minute != null ? `${minute}'` : ""}
      </Badge>
    )
  }
  if (status === "halftime") {
    return <Badge variant="draw" className="text-[10px] px-1.5">HT</Badge>
  }
  if (status === "fulltime") {
    if (result) {
      return (
        <Badge variant={result} className="text-[10px] px-1.5">
          {result === "win" ? "WIN" : result === "loss" ? "LOSS" : "DRAW"}
        </Badge>
      )
    }
    return <Badge variant="secondary" className="text-[10px] px-1.5">FT</Badge>
  }
  if (status === "postponed") {
    return <Badge variant="postponed" className="text-[10px] px-1.5">PPD</Badge>
  }
  return <Badge variant="upcoming" className="text-[10px] px-1.5">UPCOMING</Badge>
}

function TeamMini({ name, logoUrl }: { name: string; logoUrl?: string }) {
  if (logoUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={logoUrl} alt={name} className="size-6 rounded-full object-contain bg-secondary" />
  }
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
  return (
    <div className="size-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
      <span className="text-[9px] font-bold text-primary">{initials}</span>
    </div>
  )
}

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import React from "react"

export interface PerformanceStat {
  label: string
  value: number
  color?: string
}

export interface MiniStat {
  label: string
  value: string
}

export interface PlayerBadge {
  label: string
  variant: "premier" | "elite" | "academy" | "gold" | "promotion" | "win" | "upcoming" | "default"
}

export interface PlayerSpotlightProps {
  name: string
  position: string
  club: string
  initials: string
  color?: string
  goals?: number
  assists?: number
  games?: number
  badges?: PlayerBadge[]
  stats?: PerformanceStat[]
  miniStats?: MiniStat[]
  season?: string
  competition?: string
  matchDay?: number
}

export function PlayerSpotlight({
  name        = "Ryan Thompson",
  position    = "Forward",
  club        = "Charlotte FC",
  initials    = "RT",
  color       = "#697279",
  goals       = 14,
  assists     = 7,
  games       = 18,
  badges      = [{ label: "Premiership", variant: "premier" }, { label: "Top Scorer", variant: "gold" }],
  stats       = [
    { label: "Shooting Accuracy", value: 72, color: "#697279" },
    { label: "Pass Completion",   value: 84, color: "#697279" },
    { label: "Dribble Success",   value: 61, color: "#BF1D2D" },
    { label: "Aerial Duels Won",  value: 55, color: "#BF1D2D" },
    { label: "Distance Covered",  value: 88, color: "#00C853" },
  ],
  miniStats   = [
    { label: "Mins Played", value: "1,530" },
    { label: "Yellow Cards", value: "2" },
    { label: "Red Cards", value: "0" },
    { label: "Man of the Match", value: "5×" },
  ],
  season      = "2025–26",
  competition = "CPSL Premiership",
  matchDay    = 18,
}: PlayerSpotlightProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4 items-start">
      {/* Player card */}
      <Card className="bg-white border-[#E2E8F0]">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center gap-3 mb-5">
            <Avatar size="lg" className="w-20 h-20">
              <AvatarFallback className="text-white font-bold w-20 h-20" style={{ background: color, fontSize: "24px" }}>
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-base font-bold text-[#091628]">{name}</div>
              <div className="text-xs text-[#64748B]">{position} · {club}</div>
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              {badges.map((b) => (
                <Badge key={b.label} variant={b.variant}>{b.label}</Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-5">
            {[
              { value: String(goals),   label: "Goals" },
              { value: String(assists), label: "Assists" },
              { value: String(games),   label: "Games" },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: "#F4F6FA" }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "var(--text-h2)", fontWeight: 800, color, lineHeight: 1 }}>{s.value}</div>
                <div className="text-[10px] font-semibold text-[#94A3B8] mt-1 uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats breakdown */}
      <Card className="bg-white border-[#E2E8F0]">
        <CardHeader>
          <CardTitle className="text-sm text-[#091628]">Season Performance</CardTitle>
          <CardDescription className="text-xs text-[#64748B]">{season} {competition} · Match Day {matchDay}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {stats.map(stat => (
              <div key={stat.label}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-semibold text-[#475569]">{stat.label}</span>
                  <span className="text-xs font-bold tabular-nums" style={{ color: stat.color ?? "#697279" }}>{stat.value}%</span>
                </div>
                <Progress value={stat.value} className="h-2" style={{ "--progress-color": stat.color ?? "#697279" } as React.CSSProperties} />
              </div>
            ))}
          </div>

          <Separator className="my-5" />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {miniStats?.map(s => (
              <div key={s.label} className="rounded-lg p-3" style={{ background: "#F4F6FA" }}>
                <div className="text-sm font-bold text-[#091628]">{s.value}</div>
                <div className="text-[10px] text-[#94A3B8] mt-0.5 leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

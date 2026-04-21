"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export interface StandingsRow {
  rank: number
  team: {
    name: string
    shortName?: string
    logoUrl?: string
  }
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  points: number
  /** "promotion" | "playoff" | "relegation" | undefined */
  zone?: "promotion" | "playoff" | "relegation"
  /** 5-item array of "W" | "D" | "L" for form guide */
  form?: Array<"W" | "D" | "L">
}

export interface StandingsTableProps {
  rows: StandingsRow[]
  /** Number of rows to show promotion zone styling (default: 1) */
  promotionZone?: number
  /** Number of rows to show playoff zone styling (default: 3) */
  playoffZone?: number
  /** Number of rows from bottom to show relegation zone (default: 2) */
  relegationZone?: number
  /** Highlight a specific team by name */
  highlightTeam?: string
  showForm?: boolean
  className?: string
}

const formColors = {
  W: "bg-[#00C853] text-white",
  D: "bg-[#64748B] text-white",
  L: "bg-[#FF1744] text-white",
}

/**
 * StandingsTable
 *
 * A fully-featured league standings table with zone indicators, form guide,
 * and team highlighting. Implements CPSL design tokens throughout.
 *
 * @example
 * <StandingsTable
 *   rows={standingsData}
 *   promotionZone={1}
 *   playoffZone={3}
 *   relegationZone={2}
 *   highlightTeam="Charlotte FC Academy"
 *   showForm
 * />
 */
export function StandingsTable({
  rows,
  promotionZone = 1,
  playoffZone = 3,
  relegationZone = 2,
  highlightTeam,
  showForm = true,
  className,
}: StandingsTableProps) {
  const total = rows.length

  function getZone(rank: number): "promotion" | "playoff" | "relegation" | null {
    if (rank <= promotionZone) return "promotion"
    if (rank <= playoffZone) return "playoff"
    if (rank > total - relegationZone) return "relegation"
    return null
  }

  return (
    <div
      data-slot="standings-table"
      className={cn("rounded-xl border overflow-hidden bg-card", className)}
    >
      <Table>
        <TableHeader>
          <TableRow className="bg-secondary/50 hover:bg-secondary/50">
            <TableHead className="w-8 text-center text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">#</TableHead>
            <TableHead className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Club</TableHead>
            <TableHead className="text-center text-[11px] font-semibold uppercase tracking-widest text-muted-foreground w-10">P</TableHead>
            <TableHead className="text-center text-[11px] font-semibold uppercase tracking-widest text-muted-foreground w-10">W</TableHead>
            <TableHead className="text-center text-[11px] font-semibold uppercase tracking-widest text-muted-foreground w-10">D</TableHead>
            <TableHead className="text-center text-[11px] font-semibold uppercase tracking-widest text-muted-foreground w-10">L</TableHead>
            <TableHead className="text-center text-[11px] font-semibold uppercase tracking-widest text-muted-foreground w-12">GD</TableHead>
            <TableHead className="text-center text-[11px] font-semibold uppercase tracking-widest text-muted-foreground w-12 font-black text-primary">Pts</TableHead>
            {showForm && (
              <TableHead className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground w-28">Form</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => {
            const zone = getZone(row.rank)
            const gd = row.goalsFor - row.goalsAgainst
            const isHighlighted = highlightTeam && row.team.name === highlightTeam

            return (
              <TableRow
                key={row.rank}
                className={cn(
                  "transition-colors border-b last:border-0",
                  isHighlighted && "bg-primary/5 font-semibold",
                )}
              >
                {/* Rank with zone indicator */}
                <TableCell className="text-center py-3 relative">
                  {zone && (
                    <span
                      className={cn(
                        "absolute left-0 top-0 bottom-0 w-0.5",
                        zone === "promotion" && "bg-[#697279]",
                        zone === "playoff" && "bg-[#A7AFB5]",
                        zone === "relegation" && "bg-[#FF1744]",
                      )}
                    />
                  )}
                  <span className="text-sm text-muted-foreground font-mono">{row.rank}</span>
                </TableCell>

                {/* Team */}
                <TableCell className="py-3">
                  <div className="flex items-center gap-2.5">
                    <TeamMini name={row.team.name} logoUrl={row.team.logoUrl} />
                    <div className="flex flex-col">
                      <span className={cn("text-sm leading-tight", isHighlighted && "font-bold text-primary")}>
                        {row.team.shortName ?? row.team.name}
                      </span>
                    </div>
                  </div>
                </TableCell>

                {/* Stats */}
                <TableCell className="text-center text-sm font-mono text-muted-foreground">{row.played}</TableCell>
                <TableCell className="text-center text-sm font-mono">{row.won}</TableCell>
                <TableCell className="text-center text-sm font-mono text-muted-foreground">{row.drawn}</TableCell>
                <TableCell className="text-center text-sm font-mono text-muted-foreground">{row.lost}</TableCell>
                <TableCell className={cn("text-center text-sm font-mono", gd > 0 ? "text-[#00C853]" : gd < 0 ? "text-[#FF1744]" : "text-muted-foreground")}>
                  {gd > 0 ? `+${gd}` : gd}
                </TableCell>
                <TableCell className="text-center">
                  <span className="text-sm font-black text-primary">{row.points}</span>
                </TableCell>

                {/* Form */}
                {showForm && (
                  <TableCell className="py-3">
                    <div className="flex items-center gap-1">
                      {(row.form ?? []).slice(-5).map((r, i) => (
                        <span
                          key={i}
                          className={cn(
                            "size-5 rounded-sm text-[10px] font-bold flex items-center justify-center",
                            formColors[r]
                          )}
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      {/* Legend */}
      <div className="px-4 py-2 border-t bg-secondary/30 flex items-center gap-4">
        <LegendItem color="bg-[#697279]" label="Promotion" />
        <LegendItem color="bg-[#A7AFB5]" label="Playoff" />
        <LegendItem color="bg-[#FF1744]" label="Relegation" />
      </div>
    </div>
  )
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={cn("w-2.5 h-2.5 rounded-sm shrink-0", color)} />
      <span className="text-[11px] text-muted-foreground">{label}</span>
    </div>
  )
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

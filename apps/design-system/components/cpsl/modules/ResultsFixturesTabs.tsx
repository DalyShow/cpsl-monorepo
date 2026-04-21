"use client"

import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export interface MatchResult {
  home: string
  hScore: number
  away: string
  aScore: number
  date: string
  result: "win" | "draw" | "loss"
}

export interface Fixture {
  home: string
  away: string
  date: string
  time: string
  venue: string
  comp: string
}

export interface ResultsFixturesTabsProps {
  teamName?: string
  season?: string
  competition?: string
  results?: MatchResult[]
  fixtures?: Fixture[]
}

export function ResultsFixturesTabs({
  teamName    = "Charlotte FC",
  season      = "2025–26",
  competition = "Premiership",
  results     = [],
  fixtures    = [],
}: ResultsFixturesTabsProps) {
  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden">
      <Tabs defaultValue="results">
        <div className="px-6 pt-5 pb-0 border-b border-[#F1F5F9]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[#091628]">{teamName} · {season}</h3>
            <Badge variant="premier">{competition}</Badge>
          </div>
          <TabsList variant="line" className="bg-transparent p-0 h-auto gap-6">
            <TabsTrigger value="results" className="pb-3 text-xs font-semibold uppercase tracking-widest">Results</TabsTrigger>
            <TabsTrigger value="fixtures" className="pb-3 text-xs font-semibold uppercase tracking-widest">Fixtures</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="results" className="mt-0">
          <div className="divide-y divide-[#F1F5F9]">
            {results.map((r, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4">
                <span className="text-xs text-[#94A3B8] sm:w-20 shrink-0">{r.date}</span>
                <div className="flex-1 flex items-center justify-between gap-3 w-full sm:w-auto">
                  <span className="text-sm font-semibold text-[#091628] flex-1 text-right truncate">{r.home}</span>
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "var(--text-h4)", fontWeight: 800, color: "#091628", letterSpacing: "-0.5px", minWidth: "52px", textAlign: "center" }}>
                    {r.hScore}–{r.aScore}
                  </span>
                  <span className="text-sm font-medium text-[#64748B] flex-1 truncate">{r.away}</span>
                </div>
                <Badge variant={r.result} className="w-12 justify-center shrink-0">
                  {r.result === "win" ? "W" : r.result === "draw" ? "D" : "L"}
                </Badge>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="fixtures" className="mt-0">
          <div className="divide-y divide-[#F1F5F9]">
            {fixtures.map((f, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4">
                <div className="sm:w-20 shrink-0">
                  <div className="text-xs font-semibold text-[#091628]">{f.date}</div>
                  <div className="text-xs text-[#94A3B8]">{f.time}</div>
                </div>
                <div className="flex-1 flex items-center justify-between gap-3 w-full sm:w-auto">
                  <span className="text-sm font-semibold text-[#091628] flex-1 text-right truncate">{f.home}</span>
                  <span className="text-xs font-bold text-[#94A3B8] px-3">vs</span>
                  <span className="text-sm font-medium text-[#64748B] flex-1 truncate">{f.away}</span>
                </div>
                <div className="text-right shrink-0">
                  <Badge variant="upcoming" className="mb-1">{f.comp}</Badge>
                  <div className="hidden sm:block text-[10px] text-[#94A3B8]">{f.venue}</div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

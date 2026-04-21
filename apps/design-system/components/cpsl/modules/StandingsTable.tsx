import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export interface StandingRow {
  pos: number
  club: string
  abbr: string
  color: string
  p: number
  w: number
  d: number
  l: number
  gd: string
  pts: number
  form?: Array<"W" | "D" | "L">
}

export interface StandingsTableProps {
  rows: StandingRow[]
  /** Number of positions that count as promotion zone */
  promotionSpots?: number
}

export function StandingsTable({ rows, promotionSpots = 2 }: StandingsTableProps) {
  return (
    <div className="rounded-2xl border border-[#E2E8F0] overflow-hidden bg-white">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F4F6FA] hover:bg-[#F4F6FA] border-b-2 border-[#E2E8F0]">
              <TableHead className="w-10 text-center text-[10px] font-bold uppercase tracking-widest text-[#64748B]">#</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-[#64748B]">Club</TableHead>
              {["P","W","D","L"].map(h => (
                <TableHead key={h} className="text-center text-[10px] font-bold uppercase tracking-widest text-[#64748B] w-12">{h}</TableHead>
              ))}
              <TableHead className="hidden sm:table-cell text-center text-[10px] font-bold uppercase tracking-widest text-[#64748B] w-12">GD</TableHead>
              <TableHead className="text-center text-[10px] font-bold uppercase tracking-widest text-[#64748B] w-12">Pts</TableHead>
              <TableHead className="hidden md:table-cell text-[10px] font-bold uppercase tracking-widest text-[#64748B]">Form</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.club} className="border-b border-[#F1F5F9]" style={{ background: row.pos === 1 ? "#F2F4F5" : "white" }}>
                <TableCell className="text-center">
                  <span className="text-xs font-mono text-[#94A3B8]">{row.pos}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0" style={{ background: row.color }}>
                      {row.abbr.slice(0, 2)}
                    </div>
                    <span className="hidden sm:inline text-sm font-semibold text-[#091628]">{row.club}</span>
                    <span className="sm:hidden text-sm font-semibold text-[#091628]">{row.abbr}</span>
                    {row.pos <= promotionSpots && <Badge variant="promotion" className="text-[9px] px-1.5 py-0 hidden sm:inline-flex">Promo</Badge>}
                  </div>
                </TableCell>
                {[row.p, row.w, row.d, row.l].map((v, j) => (
                  <TableCell key={j} className="text-center text-sm text-[#475569]">{v}</TableCell>
                ))}
                <TableCell className="hidden sm:table-cell text-center text-sm text-[#475569]">{row.gd}</TableCell>
                <TableCell className="text-center">
                  <span className="text-sm font-bold text-[#697279]">{row.pts}</span>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex gap-1">
                    {(row.form ?? []).map((r, k) => (
                      <span key={k} className="w-5 h-5 rounded-sm flex items-center justify-center text-[9px] font-bold text-white" style={{ background: r === "W" ? "#00C853" : r === "D" ? "#94A3B8" : "#FF1744" }}>{r}</span>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

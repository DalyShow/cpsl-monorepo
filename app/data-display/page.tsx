import PageHeader from "@/components/PageHeader"
import Section from "@/components/Section"
import CodeBlock from "@/components/CodeBlock"
import { StandingsTable, type StandingsRow } from "@/components/cpsl/StandingsTable"
import { StatCard } from "@/components/cpsl/StatCard"
import { CPSLAvatar, AvatarGroup } from "@/components/cpsl/CPSLAvatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

const standingsData: StandingsRow[] = [
  { rank: 1, team: { name: "Charlotte FC Academy", shortName: "Charlotte FC" }, played: 18, won: 14, drawn: 2, lost: 2, goalsFor: 48, goalsAgainst: 18, points: 44, form: ["W","W","D","W","W"] },
  { rank: 2, team: { name: "Raleigh Railhawks U19", shortName: "Raleigh RH" }, played: 18, won: 12, drawn: 3, lost: 3, goalsFor: 38, goalsAgainst: 20, points: 39, form: ["W","L","W","W","D"] },
  { rank: 3, team: { name: "Durham United Academy", shortName: "Durham Utd" }, played: 18, won: 11, drawn: 2, lost: 5, goalsFor: 35, goalsAgainst: 24, points: 35, form: ["D","W","W","L","W"] },
  { rank: 4, team: { name: "Triangle FC", shortName: "Triangle FC" }, played: 18, won: 9, drawn: 4, lost: 5, goalsFor: 30, goalsAgainst: 22, points: 31, form: ["L","W","D","W","L"] },
  { rank: 5, team: { name: "Greensboro FC", shortName: "Greensboro" }, played: 18, won: 8, drawn: 3, lost: 7, goalsFor: 27, goalsAgainst: 29, points: 27, form: ["W","D","L","W","L"] },
  { rank: 6, team: { name: "Winston-Salem SC", shortName: "W-Salem SC" }, played: 18, won: 6, drawn: 5, lost: 7, goalsFor: 24, goalsAgainst: 28, points: 23, form: ["D","L","D","W","D"] },
  { rank: 7, team: { name: "Asheville City SC", shortName: "Asheville" }, played: 18, won: 5, drawn: 3, lost: 10, goalsFor: 20, goalsAgainst: 36, points: 18, form: ["L","L","W","L","D"] },
  { rank: 8, team: { name: "Outer Banks FC", shortName: "Outer Banks" }, played: 18, won: 2, drawn: 2, lost: 14, goalsFor: 14, goalsAgainst: 48, points: 8, form: ["L","L","D","L","L"] },
]

const standingsCode = `import { StandingsTable } from "@/components/cpsl/StandingsTable"

<StandingsTable
  rows={standingsData}
  promotionZone={1}
  playoffZone={3}
  relegationZone={2}
  highlightTeam="Charlotte FC Academy"
  showForm
/>`

const statCardCode = `import { StatCard } from "@/components/cpsl/StatCard"

<StatCard
  label="Goals Scored"
  value={48}
  subLabel="+8 vs last season"
  trend="up"
/>
<StatCard
  label="Clean Sheets"
  value={9}
  subLabel="+2 vs last season"
  trend="up"
  accentColor="#BF1D2D"
/>`

const avatarCode = `import { CPSLAvatar, AvatarGroup } from "@/components/cpsl/CPSLAvatar"

// Single avatar with status
<CPSLAvatar name="Marcus Johnson" status="online" size="lg" role="GK" />

// Avatar group with overflow
<AvatarGroup
  avatars={players}
  max={5}
  size="sm"
/>`

export default function DataDisplayPage() {
  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <PageHeader
        section="09 — Components"
        title="Data Display, Tags & Avatars"
        description="Live standings table, stat cards, avatar system, badge taxonomy, and skeleton loading states. All built from shadcn primitives with CPSL tokens."
      />
      <div className="px-12 py-12">

        {/* Standings Table */}
        <Section title="League Standings Table — Live Component">
          <StandingsTable
            rows={standingsData}
            promotionZone={1}
            playoffZone={3}
            relegationZone={2}
            highlightTeam="Charlotte FC Academy"
            showForm
          />
          <div className="mt-4">
            <CodeBlock code={standingsCode} language="tsx" />
          </div>
        </Section>

        {/* Stat Cards */}
        <Section title="Stat Cards — Live Components">
          <div className="grid grid-cols-4 gap-4 mb-4">
            <StatCard
              label="Goals Scored"
              value={48}
              subLabel="+8 vs last season"
              trend="up"
            />
            <StatCard
              label="Goals Conceded"
              value={18}
              subLabel="-5 vs last season"
              trend="up"
              accentColor="#00C853"
            />
            <StatCard
              label="Clean Sheets"
              value={9}
              subLabel="+2 vs last season"
              trend="up"
              accentColor="#BF1D2D"
            />
            <StatCard
              label="League Position"
              value="#1"
              subLabel="Top of table"
              trend="neutral"
              accentColor="#FFB300"
            />
          </div>
          <CodeBlock code={statCardCode} language="tsx" />
        </Section>

        {/* Avatars */}
        <Section title="Avatar System — Live Components">
          <div className="rounded-2xl p-8 border bg-white border-[#E2E8F0] flex flex-col gap-8">
            {/* Sizes */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Sizes</p>
              <div className="flex items-end gap-6">
                {(["xs","sm","md","lg","xl"] as const).map((size) => (
                  <div key={size} className="flex flex-col items-center gap-2">
                    <CPSLAvatar name="Marcus Johnson" size={size} />
                    <span className="text-[10px] text-muted-foreground">{size}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Status */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Status Indicators</p>
              <div className="flex items-start gap-6">
                <div className="flex flex-col items-center gap-2">
                  <CPSLAvatar name="Marcus Johnson" size="lg" status="online" />
                  <span className="text-[10px] text-muted-foreground">online</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <CPSLAvatar name="Jordan Smith" size="lg" status="away" />
                  <span className="text-[10px] text-muted-foreground">away</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <CPSLAvatar name="Alex Turner" size="lg" status="offline" />
                  <span className="text-[10px] text-muted-foreground">offline</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <CPSLAvatar name="Sam Rivera" size="lg" status="live" />
                  <span className="text-[10px] text-muted-foreground">live (pulsing)</span>
                </div>
              </div>
            </div>
            {/* With role */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">With Role Label</p>
              <div className="flex gap-6">
                {[
                  { name: "Marcus Johnson", role: "GK" },
                  { name: "Jordan Smith", role: "CB" },
                  { name: "Alex Turner", role: "CM" },
                  { name: "Sam Rivera", role: "ST" },
                ].map((p) => (
                  <CPSLAvatar key={p.name} name={p.name} size="lg" status="online" role={p.role} />
                ))}
              </div>
            </div>
            {/* Group */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Avatar Group</p>
              <div className="flex items-center gap-6">
                <AvatarGroup
                  avatars={[
                    { name: "Marcus Johnson" },
                    { name: "Jordan Smith" },
                    { name: "Alex Turner" },
                    { name: "Sam Rivera" },
                    { name: "Chris Lee" },
                    { name: "Taylor Kim" },
                    { name: "Morgan Park" },
                  ]}
                  max={5}
                  size="sm"
                />
                <span className="text-sm text-muted-foreground">7 squad members (+2 overflow)</span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <CodeBlock code={avatarCode} language="tsx" />
          </div>
        </Section>

        {/* Badge taxonomy */}
        <Section title="Badge System — Full Taxonomy">
          <div className="rounded-2xl p-8 border bg-white border-[#E2E8F0] flex flex-col gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Match Results</p>
              <div className="flex gap-2">
                <Badge variant="win">WIN</Badge>
                <Badge variant="loss">LOSS</Badge>
                <Badge variant="draw">DRAW</Badge>
                <Badge variant="live">LIVE</Badge>
                <Badge variant="upcoming">UPCOMING</Badge>
                <Badge variant="postponed">POSTPONED</Badge>
                <Badge variant="confirmed">CONFIRMED</Badge>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">League Position Zones</p>
              <div className="flex gap-2">
                <Badge variant="gold">1ST PLACE</Badge>
                <Badge variant="promotion">PROMOTION</Badge>
                <Badge variant="playoff">PLAYOFF</Badge>
                <Badge variant="relegation">RELEGATION</Badge>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Club Tier</p>
              <div className="flex gap-2">
                <Badge variant="premier">PREMIER</Badge>
                <Badge variant="elite">ELITE</Badge>
                <Badge variant="academy">ACADEMY</Badge>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Base shadcn Variants</p>
              <div className="flex gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </div>
          </div>
        </Section>

        {/* Skeleton loading */}
        <Section title="Skeleton Loading States">
          <div className="grid grid-cols-2 gap-6">
            {/* Card skeleton */}
            <div className="rounded-xl border bg-white p-6 border-[#E2E8F0]">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Card Skeleton</p>
              <div className="flex flex-col gap-3">
                <Skeleton className="h-4 w-3/4 rounded" />
                <Skeleton className="h-4 w-1/2 rounded" />
                <Skeleton className="h-24 w-full rounded-lg" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-20 rounded-lg" />
                  <Skeleton className="h-8 w-20 rounded-lg" />
                </div>
              </div>
            </div>
            {/* Table skeleton */}
            <div className="rounded-xl border bg-white p-6 border-[#E2E8F0]">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Table Skeleton</p>
              <div className="flex flex-col gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="size-6 rounded-full shrink-0" />
                    <Skeleton className="h-3 flex-1 rounded" />
                    <Skeleton className="h-3 w-8 rounded" />
                    <Skeleton className="h-3 w-8 rounded" />
                    <Skeleton className="h-3 w-10 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  )
}

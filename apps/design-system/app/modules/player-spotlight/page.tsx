import { PlayerSpotlight } from "@/components/cpsl/modules/PlayerSpotlight"
import { DocsHeader } from "@/components/docs/DocsHeader"
import { PreviewPane } from "@/components/docs/PreviewPane"
import { PropsTable } from "@/components/docs/PropsTable"
import CodeBlock from "@/components/CodeBlock"
import type { PropDoc } from "@/components/docs/types"

const PROP_DOCS: PropDoc[] = [
  { name: "name",        type: "string", required: true, description: "Player's full name." },
  { name: "position",    type: "string", required: true, description: "Position label (e.g. \"Forward\")." },
  { name: "club",        type: "string", required: true, description: "Club name." },
  { name: "initials",    type: "string", required: true, description: "Two-letter avatar initials." },
  { name: "color",       type: "string", required: true, description: "Avatar tint hex." },
  { name: "goals",       type: "number", required: true, description: "Goal count." },
  { name: "assists",     type: "number", required: true, description: "Assist count." },
  { name: "games",       type: "number", required: true, description: "Games played." },
  { name: "badges",      type: "PlayerBadge[]", default: "—", description: "Status pills shown under the name." },
  { name: "stats",       type: "PerformanceStat[]", default: "—", description: "Progress-bar stats shown in the body." },
  { name: "miniStats",   type: "MiniStat[]", default: "—", description: "Small KPI tiles shown at the bottom." },
  { name: "season",      type: "string", default: "—", description: "Season label." },
  { name: "competition", type: "string", default: "—", description: "Competition label." },
  { name: "matchDay",    type: "number", default: "—", description: "Current match-day number." },
]

const code = `<PlayerSpotlight
  name="Ryan Thompson"
  position="Forward"
  club="Charlotte FC"
  initials="RT"
  color="#697279"
  goals={14}
  assists={7}
  games={18}
  badges={[
    { label: "Premiership", variant: "premier" },
    { label: "Top Scorer",  variant: "gold"    },
  ]}
  stats={[
    { label: "Shooting Accuracy", value: 72, color: "#697279" },
    { label: "Pass Completion",   value: 84, color: "#697279" },
  ]}
/>`

export const metadata = { title: "Player Spotlight — CPSL Design System" }

export default function PlayerSpotlightDocs() {
  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <DocsHeader
        crumbs={[{ label: "Components", href: "/" }, { label: "Body Modules", href: "/modules" }, { label: "Player Spotlight" }]}
        title="Player Spotlight"
        status="stable"
        description="Featured player Card with large Avatar, season stats, and shadcn Progress bars. Use to anchor a homepage or a club page."
      />
      <div className="px-12 py-10 flex flex-col gap-6">
        <PreviewPane label="Live Preview" canvas="surface" padding={24}>
          <PlayerSpotlight
            name="Ryan Thompson"
            position="Forward"
            club="Charlotte FC"
            initials="RT"
            color="#697279"
            goals={14}
            assists={7}
            games={18}
            badges={[{ label: "Premiership", variant: "premier" }, { label: "Top Scorer", variant: "gold" }]}
            stats={[
              { label: "Shooting Accuracy", value: 72, color: "#697279" },
              { label: "Pass Completion",   value: 84, color: "#697279" },
              { label: "Dribble Success",   value: 61, color: "#BF1D2D" },
              { label: "Aerial Duels Won",  value: 55, color: "#BF1D2D" },
              { label: "Distance Covered",  value: 88, color: "#00C853" },
            ]}
            miniStats={[
              { label: "Mins Played", value: "1,530" },
              { label: "Yellow Cards", value: "2" },
              { label: "Red Cards", value: "0" },
              { label: "Man of the Match", value: "5×" },
            ]}
            season="2025–26"
            competition="CPSL Premiership"
            matchDay={18}
          />
        </PreviewPane>
        <CodeBlock code={code} language="tsx" />
        <PropsTable props={PROP_DOCS} />
      </div>
    </div>
  )
}

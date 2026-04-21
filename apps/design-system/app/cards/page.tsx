import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import {
  DefaultCard,
  ElevatedCard,
  ScoreCard,
  HorizontalCard,
  StandingsList,
  type StandingsListRow,
  ActivityList,
  type ActivityItem,
} from "@/components/cpsl/cards";

const standingsData: StandingsListRow[] = [
  { team: "Charlotte FC",     init: "CC", color: "#697279", p: 18, w: 14, d: 2, l: 2, gd: "+24", pts: 44 },
  { team: "Raleigh Athletic", init: "RA", color: "#BF1D2D", p: 18, w: 11, d: 4, l: 3, gd: "+14", pts: 37 },
  { team: "Durham United",    init: "DU", color: "#1A1A2E", p: 18, w: 10, d: 3, l: 5, gd: "+8",  pts: 33 },
];

const activityItems: ActivityItem[] = [
  { icon: "⚽", title: "Goal — Thompson, R.",      sub: "Charlotte FC vs Raleigh · 67'", time: "2min ago",  color: "#00875A" },
  { icon: "🟨", title: "Yellow card — Davies, M.", sub: "Raleigh Athletic · 54'",        time: "15min ago", color: "#FFB300" },
  { icon: "🔄", title: "Substitution — Barnes for Cole", sub: "Charlotte FC · 45'",     time: "45min ago", color: "#697279" },
];

export default function CardsPage() {
  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <PageHeader
        section="06 — Components"
        title="Cards & Lists"
        description="Four card variants for different content needs, plus standings and activity list patterns. Cards use border-radius: 16px, 1px borders, and subtle box shadows for elevation."
      />
      <div className="px-12 py-12">

        <Section title="Card Variants">
          <p className="text-xs text-muted-foreground mb-4">
            Four surface patterns — default border, elevated shadow, score (dark header), and horizontal thumbnail. All use <code className="bg-secondary px-1.5 py-0.5 rounded">border-radius: 16px</code>.
          </p>
          <div className="grid grid-cols-4 gap-4">
            <DefaultCard
              title="Charlotte FC Preview"
              description="Match preview ahead of Saturday's clash at Bank of America Stadium."
            />
            <ElevatedCard
              title="Featured Match"
              description="Promoted content, pinned items, or featured stories."
            />
            <ScoreCard
              homeTeam="Charlotte"
              homeInitials="CC"
              homeColor="#697279"
              awayTeam="Raleigh"
              awayInitials="RA"
              awayColor="#BF1D2D"
              score="3–1"
              result="WIN"
              date="Sat, Feb 22"
              venue="Bank of America"
            />
            <HorizontalCard
              title="Player Profile"
              description="Compact cards with side thumbnails. Great for player lists."
            />
          </div>
        </Section>

        <Section title="Standings List">
          <p className="text-xs text-muted-foreground mb-4">
            Compact league standings — rank badge, team avatar, and six stat columns. Leader row highlighted blue.
          </p>
          <StandingsList rows={standingsData} />
        </Section>

        <Section title="Activity List">
          <p className="text-xs text-muted-foreground mb-4">
            Event feed for live match updates. Icon background uses the event color at 13% alpha.
          </p>
          <ActivityList items={activityItems} />
        </Section>

      </div>
    </div>
  );
}

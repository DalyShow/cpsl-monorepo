import PageHeader from "@/components/PageHeader"
import Section from "@/components/Section"
import { MatchdayBlock } from "@/components/cpsl/modules/MatchdayBlock"
import { StatsBar } from "@/components/cpsl/modules/StatsBar"
import { FeatureHighlights } from "@/components/cpsl/modules/FeatureHighlights"
import { ResultsFixturesTabs } from "@/components/cpsl/modules/ResultsFixturesTabs"
import { StandingsTable } from "@/components/cpsl/modules/StandingsTable"
import { StandingsTable as MLSStandingsTable } from "@/components/cpsl/modules/MLSStandingsTable"
import { ClubDirectory } from "@/components/cpsl/modules/ClubDirectory"
import { NewsGrid } from "@/components/cpsl/modules/NewsGrid"
import { PlayerSpotlight } from "@/components/cpsl/modules/PlayerSpotlight"
import { CTABanner } from "@/components/cpsl/modules/CTABanner"
import { SkeletonLoader } from "@/components/cpsl/modules/SkeletonLoader"
import { ContentSectionCentered } from "@/components/cpsl/modules/ContentSectionCentered"
import { FAQAccordion } from "@/components/cpsl/modules/FAQAccordion"
import type { StandingRow } from "@/components/cpsl/modules/StandingsTable"
import type { MatchResult, Fixture } from "@/components/cpsl/modules/ResultsFixturesTabs"
import type { Club } from "@/components/cpsl/modules/ClubDirectory"
import type { NewsArticle } from "@/components/cpsl/modules/NewsGrid"

// ─── Sample data ────────────────────────────────────────────────────────────

const clubs: Club[] = [
  { abbr: "CFA", name: "Charlotte FC Academy", city: "Charlotte",      color: "#697279", tier: "premier"  },
  { abbr: "RLH", name: "Raleigh Athletic",      city: "Raleigh",       color: "#BF1D2D", tier: "premier"  },
  { abbr: "DUR", name: "Durham United",         city: "Durham",        color: "#091628", tier: "elite"    },
  { abbr: "TFC", name: "Triangle FC",           city: "Cary",          color: "#697279", tier: "elite"    },
  { abbr: "GFC", name: "Greensboro FC",         city: "Greensboro",    color: "#00875A", tier: "academy"  },
  { abbr: "WSS", name: "Winston-Salem SC",      city: "Winston-Salem", color: "#FF5722", tier: "academy"  },
]

const standingsRows: StandingRow[] = [
  { pos: 1, club: "Charlotte FC",     abbr: "CFA", color: "#697279", p: 18, w: 14, d: 2,  l: 2,  gd: "+24", pts: 44, form: ["W","W","W","D","W"] },
  { pos: 2, club: "Raleigh Athletic", abbr: "RLH", color: "#BF1D2D", p: 18, w: 11, d: 4,  l: 3,  gd: "+14", pts: 37, form: ["W","D","W","L","W"] },
  { pos: 3, club: "Durham United",    abbr: "DUR", color: "#091628", p: 18, w: 10, d: 3,  l: 5,  gd: "+8",  pts: 33, form: ["D","W","L","W","D"] },
  { pos: 4, club: "Triangle FC",      abbr: "TFC", color: "#697279", p: 18, w:  8, d: 5,  l: 5,  gd: "+2",  pts: 29, form: ["D","L","W","D","W"] },
  { pos: 5, club: "Greensboro FC",    abbr: "GFC", color: "#00875A", p: 18, w:  6, d: 3,  l: 9,  gd: "-8",  pts: 21, form: ["L","W","L","D","L"] },
  { pos: 6, club: "Winston-Salem SC", abbr: "WSS", color: "#FF5722", p: 18, w:  2, d: 1,  l: 15, gd: "-28", pts: 7,  form: ["L","L","D","L","L"] },
]

const results: MatchResult[] = [
  { home: "Charlotte FC",  hScore: 3, away: "Raleigh Athletic", aScore: 1, date: "Sat 22 Feb", result: "win"  },
  { home: "Durham United", hScore: 2, away: "Charlotte FC",      aScore: 2, date: "Sat 15 Feb", result: "draw" },
  { home: "Charlotte FC",  hScore: 4, away: "Triangle FC",       aScore: 0, date: "Sat 8 Feb",  result: "win"  },
  { home: "Greensboro FC", hScore: 1, away: "Charlotte FC",      aScore: 3, date: "Sun 2 Feb",  result: "win"  },
]

const fixtures: Fixture[] = [
  { home: "Charlotte FC",    away: "Durham United",    date: "Sat 1 Mar",  time: "3:00 PM", venue: "Matthews Sportsplex", comp: "Premiership" },
  { home: "Raleigh Athletic", away: "Triangle FC",     date: "Sat 1 Mar",  time: "1:00 PM", venue: "Dix Park Fields",     comp: "Premiership" },
  { home: "Charlotte FC",    away: "Raleigh Athletic", date: "Sat 8 Mar",  time: "3:00 PM", venue: "Matthews Sportsplex", comp: "CPSL Cup"    },
  { home: "Winston-Salem SC", away: "Greensboro FC",   date: "Sun 9 Mar",  time: "2:00 PM", venue: "Truist Stadium",      comp: "Premiership" },
]

const news: NewsArticle[] = [
  { category: "Match Report", date: "Feb 22", title: "Charlotte FC Cruise Past Raleigh in Dominant 3–1 Win",         excerpt: "Thompson's brace and a stunning long-range strike from Davies sealed a comprehensive victory for Charlotte." },
  { category: "Transfer",     date: "Feb 20", title: "Charlotte FC Sign Striker Marcus Webb from Triangle FC",        excerpt: "The 21-year-old forward joins on a season-long deal after a standout campaign in the CPSL Cup last year." },
  { category: "League News",  date: "Feb 18", title: "CPSL Announces Expansion to 14 Clubs for 2026–27 Season",      excerpt: "Two new franchises from Asheville and Wilmington will join the league following a rigorous admission process." },
]

const featureIcons = {
  clock: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#697279" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>,
  users: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#697279" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  chart: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#697279" strokeWidth="2" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ModulesPage() {
  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <PageHeader
        section="13 — Components"
        title="Body Modules"
        description="Nine reusable page sections built from shadcn primitives — skinned with CPSL design tokens. Drop these below any hero to assemble a complete page."
      />

      <div className="px-12 py-12">

        <Section title="1 — League Stats Bar">
          <p className="text-xs text-muted-foreground mb-4">
            Full-width counter strip. Barlow Condensed numbers command attention. Sits naturally directly below a hero.
          </p>
          <div className="rounded-2xl overflow-hidden border border-[#E2E8F0]">
            <StatsBar />
          </div>
        </Section>

        <Section title="2 — Feature Highlights">
          <p className="text-xs text-muted-foreground mb-4">
            Three-column <code className="bg-secondary px-1.5 py-0.5 rounded">Card</code> grid. Icon → title → description. Use for value props, league benefits, or platform features.
          </p>
          <FeatureHighlights features={[
            { icon: featureIcons.clock, title: "Live Match Tracking",    body: "Real-time scores, stats, and minute-by-minute updates for every CPSL fixture across all competitions.", linkLabel: "Learn more →" },
            { icon: featureIcons.users, title: "Club Management Portal", body: "Submit rosters, manage transfers, upload documents, and track registration status — all in one place.",    linkLabel: "Learn more →" },
            { icon: featureIcons.chart, title: "Performance Analytics",  body: "Season-long player and team statistics, heat maps, and form guides updated after every match.",             linkLabel: "Learn more →" },
          ]} />
        </Section>

        <Section title="3 — Results & Fixtures (Tabs)">
          <p className="text-xs text-muted-foreground mb-4">
            <code className="bg-secondary px-1.5 py-0.5 rounded">Tabs</code> switching between recent results and upcoming fixtures.
          </p>
          <ResultsFixturesTabs
            teamName="Charlotte FC"
            season="2025–26"
            competition="Premiership"
            results={results}
            fixtures={fixtures}
          />
        </Section>

        <Section title="4 — Standings Table">
          <p className="text-xs text-muted-foreground mb-4">
            shadcn <code className="bg-secondary px-1.5 py-0.5 rounded">Table</code> skinned with CPSL tokens. Leader row highlighted in primary blue. Points in bold blue.
          </p>
          <StandingsTable rows={standingsRows} promotionSpots={2} />
        </Section>

        <Section title="4b — MLS-Style Standings (Conference Tabs)">
          <p className="text-xs text-muted-foreground mb-4">
            Full-bleed dark standings block with 8 conference tabs. Barlow Condensed headlines — gold for PTS, crimson for negative GD. First-place row marked with a 3px gold left border. Drop directly below a Hero-slim section header.
          </p>
          <div className="rounded-2xl overflow-hidden border border-[#E2E8F0]">
            <MLSStandingsTable seasonLabel="2024–25 Season" />
          </div>
        </Section>

        <Section title="5 — Club Directory">
          <p className="text-xs text-muted-foreground mb-4">
            <code className="bg-secondary px-1.5 py-0.5 rounded">Card</code> grid with <code className="bg-secondary px-1.5 py-0.5 rounded">Avatar</code> initials crest, club name, city, and tier <code className="bg-secondary px-1.5 py-0.5 rounded">Badge</code>.
          </p>
          <ClubDirectory clubs={clubs} />
        </Section>

        <Section title="6 — News & Stories">
          <p className="text-xs text-muted-foreground mb-4">
            Three-column article <code className="bg-secondary px-1.5 py-0.5 rounded">Card</code> grid. Category <code className="bg-secondary px-1.5 py-0.5 rounded">Badge</code>, date, headline, excerpt, and read-more link.
          </p>
          <NewsGrid articles={news} />
        </Section>

        <Section title="7 — Player Spotlight">
          <p className="text-xs text-muted-foreground mb-4">
            Featured player <code className="bg-secondary px-1.5 py-0.5 rounded">Card</code> with large <code className="bg-secondary px-1.5 py-0.5 rounded">Avatar</code>, season stats, and shadcn <code className="bg-secondary px-1.5 py-0.5 rounded">Progress</code> bars.
          </p>
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
        </Section>

        <Section title="8 — CTA Banner">
          <p className="text-xs text-muted-foreground mb-4">
            Five <code className="bg-secondary px-1.5 py-0.5 rounded">background</code> variants — <code className="bg-secondary px-1.5 py-0.5 rounded">cream</code> (default), <code className="bg-secondary px-1.5 py-0.5 rounded">white</code>, <code className="bg-secondary px-1.5 py-0.5 rounded">surface</code>, <code className="bg-secondary px-1.5 py-0.5 rounded">navy</code>, <code className="bg-secondary px-1.5 py-0.5 rounded">gold</code>. Matches the ContentSectionCentered background token set.
          </p>
        </Section>
      </div>
      {(["cream","white","surface","navy","gold"] as const).map((bg) => (
        <CTABanner key={bg} background={bg} eyebrow={`${bg} variant`} />
      ))}
      <div className="px-12 py-12">

        <Section title="9 — Skeleton Loading State">
          <p className="text-xs text-muted-foreground mb-4">
            shadcn <code className="bg-secondary px-1.5 py-0.5 rounded">Skeleton</code> shimmer applied to a card grid and table rows.
          </p>
          <SkeletonLoader variant="card-grid-table" cardCount={3} tableRows={4} />
        </Section>

      </div>

      {/* 10 — Content Section: Centered */}
      <div className="px-12 pb-4">
        <Section title="10 — Content Section: Centered">
          <p className="text-xs text-muted-foreground mb-4">
            Full-width centered section. Eyebrow label, display heading, optional <strong>image</strong> (below heading), lead paragraph, divider, body copy.{" "}
            <strong>columns</strong>: <code className="bg-secondary px-1.5 py-0.5 rounded">1</code> single column;{" "}
            <code className="bg-secondary px-1.5 py-0.5 rounded">2</code> (default) two columns at lg.{" "}
            Background variants: <code className="bg-secondary px-1.5 py-0.5 rounded">"white"</code>, <code className="bg-secondary px-1.5 py-0.5 rounded">"cream"</code>, <code className="bg-secondary px-1.5 py-0.5 rounded">"surface"</code>, <code className="bg-secondary px-1.5 py-0.5 rounded">"navy"</code>, <code className="bg-secondary px-1.5 py-0.5 rounded">"gold"</code>.
          </p>
        </Section>
      </div>
      <ContentSectionCentered
        background="cream"
        columns={1}
        image={{ src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80", alt: "Soccer match aerial view" }}
      />
      <ContentSectionCentered background="white" columns={2} />
      <ContentSectionCentered background="surface" />
      <ContentSectionCentered background="gold" />
      <ContentSectionCentered background="navy" />

      <div className="px-12 py-12">
        <Section title="12 — FAQ Accordion">
          <p className="text-xs text-muted-foreground mb-4">
            Question/answer module with expand/collapse interaction. Single-open by default; pass{" "}
            <code className="bg-secondary px-1.5 py-0.5 rounded">allowMultiple</code> to keep several panels open. Five{" "}
            <code className="bg-secondary px-1.5 py-0.5 rounded">background</code> variants —
            <code className="bg-secondary px-1.5 py-0.5 rounded mx-1">cream</code>
            <code className="bg-secondary px-1.5 py-0.5 rounded mx-1">white</code>
            <code className="bg-secondary px-1.5 py-0.5 rounded mx-1">surface</code>
            <code className="bg-secondary px-1.5 py-0.5 rounded mx-1">navy</code>
            <code className="bg-secondary px-1.5 py-0.5 rounded mx-1">gold</code>.
          </p>
        </Section>
      </div>
      <FAQAccordion background="cream" />
      <FAQAccordion background="navy"  eyebrow="navy variant"  />
      <FAQAccordion background="gold"  eyebrow="gold variant"  />

      <div className="px-12 py-12">
        <Section title="11 — Matchday">
          <p className="text-xs text-muted-foreground mb-6">
            Conference-scoped matchday view. Dropdown selects the active conference — scores default to 0-0 for upcoming fixtures. Live matches surface a red accent bar and a LIVE badge in the toolbar. Designed to hold 20-40 cards per conference with flex-wrap.
          </p>
          <div className="rounded-2xl overflow-hidden border border-[#1E2D45]">
            <MatchdayBlock />
          </div>
        </Section>
      </div>

    </div>
  )
}

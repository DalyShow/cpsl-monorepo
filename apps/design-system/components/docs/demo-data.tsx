import type { Club } from "@/components/cpsl/modules/ClubDirectory"
import type { StandingRow } from "@/components/cpsl/modules/StandingsTable"
import type { MatchResult, Fixture } from "@/components/cpsl/modules/ResultsFixturesTabs"
import type { NewsArticle } from "@/components/cpsl/modules/NewsGrid"

export const demoClubs: Club[] = [
  { abbr: "CFA", name: "Charlotte FC Academy", city: "Charlotte",      color: "#697279", tier: "premier"  },
  { abbr: "RLH", name: "Raleigh Athletic",      city: "Raleigh",       color: "#BF1D2D", tier: "premier"  },
  { abbr: "DUR", name: "Durham United",         city: "Durham",        color: "#091628", tier: "elite"    },
  { abbr: "TFC", name: "Triangle FC",           city: "Cary",          color: "#697279", tier: "elite"    },
  { abbr: "GFC", name: "Greensboro FC",         city: "Greensboro",    color: "#00875A", tier: "academy"  },
  { abbr: "WSS", name: "Winston-Salem SC",      city: "Winston-Salem", color: "#FF5722", tier: "academy"  },
]

export const demoStandings: StandingRow[] = [
  { pos: 1, club: "Charlotte FC",     abbr: "CFA", color: "#697279", p: 18, w: 14, d: 2,  l: 2,  gd: "+24", pts: 44, form: ["W","W","W","D","W"] },
  { pos: 2, club: "Raleigh Athletic", abbr: "RLH", color: "#BF1D2D", p: 18, w: 11, d: 4,  l: 3,  gd: "+14", pts: 37, form: ["W","D","W","L","W"] },
  { pos: 3, club: "Durham United",    abbr: "DUR", color: "#091628", p: 18, w: 10, d: 3,  l: 5,  gd: "+8",  pts: 33, form: ["D","W","L","W","D"] },
  { pos: 4, club: "Triangle FC",      abbr: "TFC", color: "#697279", p: 18, w:  8, d: 5,  l: 5,  gd: "+2",  pts: 29, form: ["D","L","W","D","W"] },
  { pos: 5, club: "Greensboro FC",    abbr: "GFC", color: "#00875A", p: 18, w:  6, d: 3,  l: 9,  gd: "-8",  pts: 21, form: ["L","W","L","D","L"] },
  { pos: 6, club: "Winston-Salem SC", abbr: "WSS", color: "#FF5722", p: 18, w:  2, d: 1,  l: 15, gd: "-28", pts: 7,  form: ["L","L","D","L","L"] },
]

export const demoResults: MatchResult[] = [
  { home: "Charlotte FC",  hScore: 3, away: "Raleigh Athletic", aScore: 1, date: "Sat 22 Feb", result: "win"  },
  { home: "Durham United", hScore: 2, away: "Charlotte FC",      aScore: 2, date: "Sat 15 Feb", result: "draw" },
  { home: "Charlotte FC",  hScore: 4, away: "Triangle FC",       aScore: 0, date: "Sat 8 Feb",  result: "win"  },
  { home: "Greensboro FC", hScore: 1, away: "Charlotte FC",      aScore: 3, date: "Sun 2 Feb",  result: "win"  },
]

export const demoFixtures: Fixture[] = [
  { home: "Charlotte FC",     away: "Durham United",    date: "Sat 1 Mar", time: "3:00 PM", venue: "Matthews Sportsplex", comp: "Premiership" },
  { home: "Raleigh Athletic", away: "Triangle FC",      date: "Sat 1 Mar", time: "1:00 PM", venue: "Dix Park Fields",     comp: "Premiership" },
  { home: "Charlotte FC",     away: "Raleigh Athletic", date: "Sat 8 Mar", time: "3:00 PM", venue: "Matthews Sportsplex", comp: "CPSL Cup"    },
  { home: "Winston-Salem SC", away: "Greensboro FC",    date: "Sun 9 Mar", time: "2:00 PM", venue: "Truist Stadium",      comp: "Premiership" },
]

export const demoNews: NewsArticle[] = [
  { category: "Match Report", date: "Feb 22", title: "Charlotte FC Cruise Past Raleigh in Dominant 3–1 Win",     excerpt: "Thompson's brace and a stunning long-range strike from Davies sealed a comprehensive victory for Charlotte." },
  { category: "Transfer",     date: "Feb 20", title: "Charlotte FC Sign Striker Marcus Webb from Triangle FC",   excerpt: "The 21-year-old forward joins on a season-long deal after a standout campaign in the CPSL Cup last year." },
  { category: "League News",  date: "Feb 18", title: "CPSL Announces Expansion to 14 Clubs for 2026–27 Season", excerpt: "Two new franchises from Asheville and Wilmington will join the league following a rigorous admission process." },
]

export const demoFeatureIcons = {
  clock: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#697279" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>,
  users: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#697279" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  chart: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#697279" strokeWidth="2" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
}

export const demoFeatures = [
  { icon: demoFeatureIcons.clock, title: "Live Match Tracking",    body: "Real-time scores, stats, and minute-by-minute updates for every CPSL fixture across all competitions.", linkLabel: "Learn more →" },
  { icon: demoFeatureIcons.users, title: "Club Management Portal", body: "Submit rosters, manage transfers, upload documents, and track registration status — all in one place.",    linkLabel: "Learn more →" },
  { icon: demoFeatureIcons.chart, title: "Performance Analytics",  body: "Season-long player and team statistics, heat maps, and form guides updated after every match.",             linkLabel: "Learn more →" },
]

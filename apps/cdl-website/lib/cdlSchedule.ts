import type { CalendarClub, CalendarMatch, AgeGroup } from "@cpsl/ui";
import scheduleData from "@/data/cdl-fall-2026.json";

interface CdlClub {
  id:         string;
  name:       string;
  shortName:  string;
  conference: string;
  logoUrl:    string;
}

interface CdlMatchRaw {
  id:            string;
  kickoff:       string;
  homeClubId:    string;
  awayClubId:    string;
  homeTeamLabel: string;
  awayTeamLabel: string;
  field:         string;
  ageGroup:      string;
  gender:        string;
  notes:         string | null;
  sourceRow:     number;
}

interface CdlSchedule {
  generatedAt: string;
  source:      string;
  clubs:       CdlClub[];
  matches:     CdlMatchRaw[];
}

const raw = scheduleData as CdlSchedule;

/** Ordered age groups CDL actually uses (v1: U9–U12). */
export const CDL_AGE_GROUPS: AgeGroup[] = ["U9", "U10", "U11", "U12"];

/** Available clubs, alphabetised — feeds the calendar Club dropdown. */
export const CDL_CLUBS: CalendarClub[] = raw.clubs.map((c) => ({
  id:         c.id,
  name:       c.name,
  shortName:  c.shortName,
  conference: c.conference,
  logoUrl:    c.logoUrl,
}));

/** Match roster in insertion order. Kickoff already local ISO, no offset. */
export const CDL_MATCHES: CalendarMatch[] = raw.matches.map((m) => ({
  id:            m.id,
  kickoff:       m.kickoff,
  homeClubId:    m.homeClubId,
  awayClubId:    m.awayClubId,
  homeTeamLabel: m.homeTeamLabel,
  awayTeamLabel: m.awayTeamLabel,
  field:         m.field,
  ageGroup:      m.ageGroup as AgeGroup,
  competition:   "Development",
  notes:         m.notes ?? undefined,
}));

export const CDL_META = {
  generatedAt: raw.generatedAt,
  source:      raw.source,
  matchCount:  raw.matches.length,
};

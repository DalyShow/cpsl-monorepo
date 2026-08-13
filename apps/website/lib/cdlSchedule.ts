import type { CalendarClub, CalendarMatch, AgeGroup } from "@cpsl/ui";
import scheduleData from "@/data/cdl-fall-2026.json";
import { fetchCalendarClubs } from "@/lib/sanity/calendarClubs";

interface CdlClub {
  id:               string;
  name:             string;
  shortName:        string;
  conference:       string;
  logoUrl:          string;
  sanityNameHints?: string[];
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

/**
 * Server-side: build the CDL club roster with real Sanity crests where
 * available. Falls back to the embedded placeholder SVG when Sanity is
 * offline OR no name-hint matches a Sanity clubLogo entry.
 *
 * The match is done case-insensitively against each Sanity club's `name`
 * — any hint being a substring of the Sanity name counts as a match. First
 * match wins. Zero matches → keep the placeholder.
 */
export async function getCdlClubs(): Promise<CalendarClub[]> {
  let sanityClubs: CalendarClub[] = [];
  try {
    sanityClubs = await fetchCalendarClubs();
  } catch {
    // Sanity unavailable at build/request time — placeholders are the fallback.
  }

  const lower = sanityClubs.map((c) => ({ club: c, name: c.name.toLowerCase() }));

  return raw.clubs
    .map((c) => {
      const hints = (c.sanityNameHints ?? []).map((h) => h.toLowerCase());
      const hit = hints.length
        ? lower.find(({ name }) => hints.some((h) => name.includes(h)))
        : undefined;
      return {
        id:         c.id,
        name:       c.name,
        shortName:  c.shortName,
        conference: c.conference,
        logoUrl:    hit?.club.logoUrl ?? c.logoUrl,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

import type { CalendarClub, CalendarMatch, AgeGroup } from "@cpsl/ui";
import scheduleData from "@/data/cdl-fall-2026.json";
import { fetchAllClubLogos } from "@/lib/sanity/calendarClubs";

interface CdlClub {
  id:               string;
  name:             string;
  shortName:        string;
  conference:       string;
  logoUrl:          string;
  sanityNameHints?: string[];
}

interface CdlMatchRaw {
  id:              string;
  kickoff:         string;
  homeClubId:      string;
  awayClubId:      string;
  homeTeamLabel:   string;
  awayTeamLabel:   string;
  field:           string;
  locationAddress?: string;
  ageGroup:        string;
  gender:          "M" | "G" | string;
  notes:           string | null;
  sourceRow:       number;
}

interface CdlSchedule {
  generatedAt: string;
  /** Older single-source schemas used `source`; multi-source uses `sources`. */
  source?:     string;
  sources?:    { path: string; tab: string; gender: string }[];
  clubs:       CdlClub[];
  matches:     CdlMatchRaw[];
}

const raw = scheduleData as CdlSchedule;

/** Ordered age groups CDL actually uses (v1: U9–U12). */
export const CDL_AGE_GROUPS: AgeGroup[] = ["U9", "U10", "U11", "U12"];

/** Match roster in insertion order. Kickoff already local ISO, no offset. */
export const CDL_MATCHES: CalendarMatch[] = raw.matches.map((m) => ({
  id:              m.id,
  kickoff:         m.kickoff,
  homeClubId:      m.homeClubId,
  awayClubId:      m.awayClubId,
  homeTeamLabel:   m.homeTeamLabel,
  awayTeamLabel:   m.awayTeamLabel,
  field:           m.field,
  locationAddress: m.locationAddress || undefined,
  gender:          m.gender === "G" ? "G" : "M",
  ageGroup:        m.ageGroup as AgeGroup,
  competition:     "Development",
  notes:           m.notes ?? undefined,
}));

export const CDL_META = {
  generatedAt: raw.generatedAt,
  source:      raw.source ?? raw.sources?.map((s) => s.tab).join(" + ") ?? "",
  matchCount:  raw.matches.length,
};

/** Sync club-name lookup for feed titles etc. — no Sanity round-trip. */
export const CDL_CLUBS_BY_ID: ReadonlyMap<string, { name: string; shortName: string }> =
  new Map(raw.clubs.map((c) => [c.id, { name: c.name, shortName: c.shortName }]));

export { filterCdlMatches, type CdlMatchFilter } from "./cdlFilter";

/**
 * Server-side: build the CDL club roster with real Sanity crests where
 * available. Falls back to the embedded placeholder SVG when Sanity is
 * offline OR no name-hint matches a Sanity crest.
 *
 * Match strategy: each hint (case-insensitive substring) is checked
 * against the Sanity entry's `name`, `altText`, AND `originalFilename` —
 * so a crest whose display name is blank still resolves when its
 * filename ("logo-hammerheads.png") carries the club identity.
 * First match wins; zero matches keeps the placeholder.
 */
export async function getCdlClubs(): Promise<CalendarClub[]> {
  let sanityLogos: Awaited<ReturnType<typeof fetchAllClubLogos>> = [];
  try {
    sanityLogos = await fetchAllClubLogos();
  } catch {
    // Sanity unavailable at build/request time — placeholders are the fallback.
  }

  const searchable = sanityLogos.map((s) => ({
    logo:  s,
    blob:  `${s.name} ${s.altText} ${s.originalFilename}`.toLowerCase(),
  }));

  return raw.clubs
    .map((c) => {
      const hints = (c.sanityNameHints ?? []).map((h) => h.toLowerCase());
      const hit = hints.length
        ? searchable.find(({ blob }) => hints.some((h) => blob.includes(h)))
        : undefined;
      return {
        id:         c.id,
        name:       c.name,
        shortName:  c.shortName,
        conference: c.conference,
        logoUrl:    hit?.logo.logoUrl ?? c.logoUrl,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

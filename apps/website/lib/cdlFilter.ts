import type { CalendarMatch } from "@cpsl/ui";

/**
 * Pure, client-safe CDL match filtering — shared by the schedule UI
 * (client component) and the calendar.ics route so what a parent sees
 * on the page and what lands in their subscribed calendar can never
 * disagree. Lives outside lib/cdlSchedule.ts because that module pulls
 * in the Sanity server client (next/headers) via getCdlClubs.
 * (Date filtering is a UI-only concern and deliberately lives outside.)
 */

export interface CdlMatchFilter {
  clubId?:   string | null;
  ageGroup?: string | null;
  gender?:   "M" | "G" | null;
}

export function filterCdlMatches(
  matches: CalendarMatch[],
  f: CdlMatchFilter,
): CalendarMatch[] {
  return matches.filter(
    (m) =>
      (!f.clubId || m.homeClubId === f.clubId || m.awayClubId === f.clubId) &&
      (!f.ageGroup || m.ageGroup === f.ageGroup) &&
      (!f.gender || m.gender === f.gender),
  );
}

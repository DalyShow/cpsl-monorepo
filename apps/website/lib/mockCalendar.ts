/**
 * Mock data for the v1 League Calendar visual mockup. Everything shapes to
 * the eventual Sanity `match` schema so swapping this file for a real GROQ
 * fetch is a rendering-layer no-op.
 *
 * Uses the 10 crest SVGs already in `/public/logos/`. Kickoffs are anchored
 * to three weekends around "today" so the "first upcoming weekend expanded"
 * behaviour is exercised every time the page loads.
 */

import type {
  CalendarClub,
  CalendarMatch,
  CalendarWeekend,
} from "@cpsl/ui";

// ─── Clubs (10 — match /public/logos/*.svg) ──────────────────────────────────

export const MOCK_CLUBS: CalendarClub[] = [
  { id: "charlotte-fc",     name: "Charlotte FC",       shortName: "CFC", conference: "West",       logoUrl: "/logos/charlotte-fc.svg"     },
  { id: "raleigh-athletic", name: "Raleigh Athletic",   shortName: "RAL", conference: "Central",    logoUrl: "/logos/raleigh-athletic.svg" },
  { id: "durham-united",    name: "Durham United",      shortName: "DUR", conference: "Central",    logoUrl: "/logos/durham-united.svg"    },
  { id: "triangle-fc",      name: "Triangle FC",        shortName: "TFC", conference: "Central",    logoUrl: "/logos/triangle-fc.svg"      },
  { id: "greensboro-fc",    name: "Greensboro FC",      shortName: "GFC", conference: "Midwest",    logoUrl: "/logos/greensboro-fc.svg"    },
  { id: "winston-salem-sc", name: "Winston-Salem SC",   shortName: "WSS", conference: "Midwest",    logoUrl: "/logos/winston-salem-sc.svg" },
  { id: "asheville-fc",     name: "Asheville FC",       shortName: "AVL", conference: "Northwest",  logoUrl: "/logos/asheville-fc.svg"     },
  { id: "charleston-fc",    name: "Charleston FC",      shortName: "CHS", conference: "Southeast",  logoUrl: "/logos/charleston-fc.svg"    },
  { id: "coastal-sc",       name: "Coastal SC",         shortName: "COA", conference: "Southeast",  logoUrl: "/logos/coastal-sc.svg"       },
  { id: "columbia-united",  name: "Columbia United",    shortName: "COL", conference: "South",      logoUrl: "/logos/columbia-united.svg"  },
];

/** Ordered conference list — feeds the filter dropdown. */
export const MOCK_CONFERENCES = [
  "Northwest",
  "West",
  "Central",
  "South",
  "Midwest",
  "Northeast",
  "Mid-Atlantic",
  "Southeast",
];

// ─── Fields ───────────────────────────────────────────────────────────────────

const FIELDS = [
  "Matthews Sportsplex — Field 3",
  "Dix Park Fields — Field 1",
  "Winston Coliseum Park — Field A",
  "Truist Stadium — Main",
  "Duke East Campus — Turf 2",
  "Rock Hill Sports Complex — Field 5",
  "Asheville Buncombe SC — Field 1",
  "MUSC Health Stadium — Practice",
  "Carolina Bank Field — Complex A",
];

// ─── Weekend anchor helpers ──────────────────────────────────────────────────

/** Return the Saturday of the CURRENT ISO week (weeks starting Monday). */
function saturdayOfThisWeek(from: Date = new Date()): Date {
  const d = new Date(from);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay();                    // 0=Sun … 6=Sat
  const delta = 6 - day;                     // Sat = today or ahead
  d.setDate(d.getDate() + delta);
  return d;
}

function addDays(base: Date, days: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

/** Build an ISO datetime string in the LOCAL timezone (naïve — good for a mockup). */
function isoAt(day: Date, hour: number, minute = 0): string {
  const d = new Date(day);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

// ─── Match template ──────────────────────────────────────────────────────────

interface Pairing {
  home: string; // club id
  away: string;
  hour: number;
  minute?: number;
  competition: CalendarMatch["competition"];
  ageGroup:    CalendarMatch["ageGroup"];
  notes?:      string;
  fieldIndex?: number;
}

const LAST_WEEKEND: Pairing[] = [
  { home: "charlotte-fc",     away: "durham-united",    hour: 9,  competition: "Premiership", ageGroup: "U15", fieldIndex: 0 },
  { home: "raleigh-athletic", away: "triangle-fc",      hour: 10, minute: 30, competition: "Premiership", ageGroup: "U17", fieldIndex: 1 },
  { home: "asheville-fc",     away: "greensboro-fc",    hour: 12, competition: "Development", ageGroup: "U13", fieldIndex: 6 },
  { home: "coastal-sc",       away: "charleston-fc",    hour: 13, minute: 30, competition: "Premiership", ageGroup: "U15", fieldIndex: 7 },
  { home: "winston-salem-sc", away: "columbia-united",  hour: 15, competition: "Cup",         ageGroup: "U17", fieldIndex: 2, notes: "Quarter-final — extra time if drawn" },
  { home: "durham-united",    away: "triangle-fc",      hour: 9,  competition: "Premiership", ageGroup: "U14", fieldIndex: 4 }, // Sunday, wraps day below
  { home: "charlotte-fc",     away: "greensboro-fc",    hour: 11, competition: "Premiership", ageGroup: "U19", fieldIndex: 0 },
  { home: "asheville-fc",     away: "raleigh-athletic", hour: 13, minute: 15, competition: "Premiership", ageGroup: "U17", fieldIndex: 6 },
  { home: "coastal-sc",       away: "columbia-united",  hour: 15, competition: "Development", ageGroup: "U15", fieldIndex: 7 },
  { home: "charleston-fc",    away: "winston-salem-sc", hour: 16, minute: 30, competition: "Premiership", ageGroup: "U17", fieldIndex: 5 },
];

const THIS_WEEKEND: Pairing[] = [
  { home: "raleigh-athletic", away: "charlotte-fc",     hour: 9,  competition: "Premiership", ageGroup: "U15", fieldIndex: 1 },
  { home: "durham-united",    away: "greensboro-fc",    hour: 10, minute: 30, competition: "Cup", ageGroup: "U17", fieldIndex: 4, notes: "Semifinal — winner advances to the CPSL Cup final" },
  { home: "triangle-fc",      away: "asheville-fc",     hour: 11, competition: "Development", ageGroup: "U14", fieldIndex: 3 },
  { home: "charleston-fc",    away: "coastal-sc",       hour: 12, minute: 30, competition: "Premiership", ageGroup: "U19", fieldIndex: 7 },
  { home: "columbia-united",  away: "winston-salem-sc", hour: 14, competition: "Premiership", ageGroup: "U15", fieldIndex: 8 },
  { home: "asheville-fc",     away: "charlotte-fc",     hour: 16, minute: 30, competition: "Premiership", ageGroup: "U19", fieldIndex: 6 },
  { home: "charlotte-fc",     away: "triangle-fc",      hour: 9,  competition: "Premiership", ageGroup: "U13", fieldIndex: 0 },
  { home: "greensboro-fc",    away: "raleigh-athletic", hour: 10, minute: 45, competition: "Premiership", ageGroup: "U15", fieldIndex: 2 },
  { home: "durham-united",    away: "coastal-sc",       hour: 13, competition: "Development", ageGroup: "U17", fieldIndex: 4 },
  { home: "winston-salem-sc", away: "charleston-fc",    hour: 15, minute: 15, competition: "Premiership", ageGroup: "U17", fieldIndex: 2 },
  { home: "columbia-united",  away: "asheville-fc",     hour: 17, competition: "Premiership", ageGroup: "U19", fieldIndex: 8 },
];

const NEXT_WEEKEND: Pairing[] = [
  { home: "charlotte-fc",     away: "raleigh-athletic", hour: 9,  competition: "Cup", ageGroup: "U19", fieldIndex: 0, notes: "CPSL Cup Final" },
  { home: "greensboro-fc",    away: "durham-united",    hour: 10, minute: 30, competition: "Premiership", ageGroup: "U15", fieldIndex: 2 },
  { home: "asheville-fc",     away: "triangle-fc",      hour: 12, competition: "Development", ageGroup: "U14", fieldIndex: 6 },
  { home: "coastal-sc",       away: "winston-salem-sc", hour: 13, minute: 30, competition: "Premiership", ageGroup: "U17", fieldIndex: 7 },
  { home: "charleston-fc",    away: "columbia-united",  hour: 15, competition: "Premiership", ageGroup: "U15", fieldIndex: 5 },
  { home: "raleigh-athletic", away: "charlotte-fc",     hour: 16, minute: 45, competition: "Premiership", ageGroup: "U19", fieldIndex: 1 },
  { home: "triangle-fc",      away: "greensboro-fc",    hour: 10, competition: "Premiership", ageGroup: "U13", fieldIndex: 3 },
  { home: "durham-united",    away: "asheville-fc",     hour: 12, minute: 15, competition: "Premiership", ageGroup: "U17", fieldIndex: 4 },
  { home: "winston-salem-sc", away: "charleston-fc",    hour: 14, competition: "Development", ageGroup: "U15", fieldIndex: 2 },
  { home: "columbia-united",  away: "coastal-sc",       hour: 15, minute: 30, competition: "Premiership", ageGroup: "U19", fieldIndex: 8 },
];

// ─── Build match list ────────────────────────────────────────────────────────

function buildWeekend(saturdayAnchor: Date, pairings: Pairing[], prefix: string): CalendarMatch[] {
  const matches: CalendarMatch[] = [];
  const cutover = Math.floor(pairings.length * 0.55); // ~55% Saturday, rest Sunday
  pairings.forEach((p, i) => {
    const day = i < cutover ? saturdayAnchor : addDays(saturdayAnchor, 1);
    matches.push({
      id:          `${prefix}-${i}`,
      kickoff:     isoAt(day, p.hour, p.minute ?? 0),
      homeClubId:  p.home,
      awayClubId:  p.away,
      field:       FIELDS[p.fieldIndex ?? i % FIELDS.length],
      competition: p.competition,
      ageGroup:    p.ageGroup,
      notes:       p.notes,
    });
  });
  return matches;
}

const thisSat = saturdayOfThisWeek();
const lastSat = addDays(thisSat, -7);
const nextSat = addDays(thisSat,  7);

export const MOCK_MATCHES: CalendarMatch[] = [
  ...buildWeekend(lastSat, LAST_WEEKEND, "last"),
  ...buildWeekend(thisSat, THIS_WEEKEND, "this"),
  ...buildWeekend(nextSat, NEXT_WEEKEND, "next"),
];

// ─── Weekend grouping ────────────────────────────────────────────────────────

/**
 * Group matches by Saturday-anchored weekend. `matches` may be any subset
 * (e.g. after filters). Empty weekends are dropped.
 */
export function groupByWeekend(matches: CalendarMatch[]): CalendarWeekend[] {
  const bucket = new Map<string, CalendarMatch[]>();
  for (const m of matches) {
    const d = new Date(m.kickoff);
    // Roll Sunday back to Saturday for grouping.
    const dayOfWeek = d.getDay(); // 0=Sun, 6=Sat
    const satOffset = dayOfWeek === 0 ? -1 : 6 - dayOfWeek;
    const sat = new Date(d);
    sat.setHours(0, 0, 0, 0);
    sat.setDate(sat.getDate() + satOffset);
    const key = sat.toISOString().slice(0, 10);
    const arr = bucket.get(key) ?? [];
    arr.push(m);
    bucket.set(key, arr);
  }

  const weekends: CalendarWeekend[] = [];
  const sortedKeys = Array.from(bucket.keys()).sort();
  for (const key of sortedKeys) {
    const sat = new Date(key + "T00:00:00");
    const sun = addDays(sat, 1);
    const label = `The weekend of ${sat.toLocaleDateString("en-US", { month: "long", day: "numeric" })}–${sun.getDate()}`;
    const items = bucket.get(key)!.sort((a, b) => a.kickoff.localeCompare(b.kickoff));
    weekends.push({ id: key, label, saturday: sat, matches: items });
  }
  return weekends;
}

/** Index of the first weekend that hasn't yet happened. Falls back to 0. */
export function firstUpcomingWeekendIndex(weekends: CalendarWeekend[]): number {
  const now = Date.now();
  const idx = weekends.findIndex((w) => addDays(w.saturday, 2).getTime() > now);
  return idx === -1 ? 0 : idx;
}

// ─── Utility to look up a club by id ─────────────────────────────────────────

const CLUBS_BY_ID = new Map(MOCK_CLUBS.map((c) => [c.id, c]));
export function clubById(id: string): CalendarClub | undefined {
  return CLUBS_BY_ID.get(id);
}

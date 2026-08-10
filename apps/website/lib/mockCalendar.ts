/**
 * Mock fixture generator for the v1 League Calendar visual mockup.
 *
 * v2-ready: `MOCK_CLUBS` is only used as a fallback when the site's Sanity
 * `logoTicker.logos[]` hasn't been converted to named `clubLogo` entries
 * yet. Whenever real clubs are available they drive both the dropdown
 * AND the generated mock schedule — so every crest & name on the page
 * comes from Sanity.
 */

import type { CalendarClub, CalendarMatch } from "@cpsl/ui";

// ─── Fallback clubs (used only when Sanity has no named clubs) ──────────────

export const MOCK_CLUBS: CalendarClub[] = [
  { id: "charlotte-fc",     name: "Charlotte FC",       conference: "West",       logoUrl: "/logos/charlotte-fc.svg"     },
  { id: "raleigh-athletic", name: "Raleigh Athletic",   conference: "Central",    logoUrl: "/logos/raleigh-athletic.svg" },
  { id: "durham-united",    name: "Durham United",      conference: "Central",    logoUrl: "/logos/durham-united.svg"    },
  { id: "triangle-fc",      name: "Triangle FC",        conference: "Central",    logoUrl: "/logos/triangle-fc.svg"      },
  { id: "greensboro-fc",    name: "Greensboro FC",      conference: "Midwest",    logoUrl: "/logos/greensboro-fc.svg"    },
  { id: "winston-salem-sc", name: "Winston-Salem SC",   conference: "Midwest",    logoUrl: "/logos/winston-salem-sc.svg" },
  { id: "asheville-fc",     name: "Asheville FC",       conference: "Northwest",  logoUrl: "/logos/asheville-fc.svg"     },
  { id: "charleston-fc",    name: "Charleston FC",      conference: "Southeast",  logoUrl: "/logos/charleston-fc.svg"    },
  { id: "coastal-sc",       name: "Coastal SC",         conference: "Southeast",  logoUrl: "/logos/coastal-sc.svg"       },
  { id: "columbia-united",  name: "Columbia United",    conference: "South",      logoUrl: "/logos/columbia-united.svg"  },
];

// ─── Fields ─────────────────────────────────────────────────────────────────

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

const COMPETITIONS: CalendarMatch["competition"][] = ["Premiership", "Cup", "Development"];
const AGES:         CalendarMatch["ageGroup"][]    = ["U13", "U14", "U15", "U16", "U17", "U19"];

// ─── Weekend helpers ────────────────────────────────────────────────────────

/** Saturday of THIS calendar week (today, if today is Saturday). */
export function saturdayOfThisWeek(from: Date = new Date()): Date {
  const d = new Date(from);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay();
  d.setDate(d.getDate() + ((6 - day + 7) % 7));
  return d;
}

function addDays(base: Date, days: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

function isoAt(day: Date, hour: number, minute = 0): string {
  const d = new Date(day);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

// ─── Deterministic pairing ──────────────────────────────────────────────────

/**
 * Rotates pairings so every club plays every other club at least once
 * across the schedule — classic round-robin. Deterministic per club-list
 * length; no randomness (SSR-safe).
 */
function pairingsForRound(clubs: CalendarClub[], round: number): [CalendarClub, CalendarClub][] {
  if (clubs.length < 2) return [];
  const n     = clubs.length % 2 === 0 ? clubs.length : clubs.length + 1;
  const list  = clubs.length % 2 === 0 ? clubs.slice() : [...clubs, null];
  const half  = n / 2;
  const rot   = round % (n - 1);

  // Standard circle rotation.
  const rotated = [list[0], ...list.slice(1 + rot), ...list.slice(1, 1 + rot)];
  const pairs: [CalendarClub, CalendarClub][] = [];
  for (let i = 0; i < half; i++) {
    const a = rotated[i];
    const b = rotated[n - 1 - i];
    if (a && b) pairs.push([a, b]);
  }
  return pairs;
}

// ─── Public: build mock matches for 3 weekends around today ────────────────

/**
 * Build ~3 weekends of fixtures spanning last/this/next weekend, using the
 * supplied club roster. Deterministic (no randomness) so SSR matches CSR
 * exactly. Returns kickoffs at typical Saturday/Sunday slots.
 *
 * Pass `MOCK_CLUBS` to get the historical fallback schedule; pass real
 * Sanity-fetched clubs to get a schedule anchored to them.
 */
export function buildMockMatches(clubs: CalendarClub[]): CalendarMatch[] {
  if (clubs.length < 2) return [];

  const anchor = saturdayOfThisWeek();
  const weekendSaturdays = [addDays(anchor, -7), anchor, addDays(anchor, 7)];

  const slots: { hour: number; minute: number }[] = [
    { hour: 9,  minute: 0  },
    { hour: 10, minute: 30 },
    { hour: 12, minute: 0  },
    { hour: 13, minute: 30 },
    { hour: 15, minute: 0  },
    { hour: 16, minute: 30 },
  ];

  const matches: CalendarMatch[] = [];
  let matchIdx = 0;

  weekendSaturdays.forEach((satDay, weekIdx) => {
    const pairs = pairingsForRound(clubs, weekIdx);
    if (pairs.length === 0) return;

    // Split pairs across Sat + Sun to give the day a real feel.
    const cutover = Math.ceil(pairs.length * 0.55);
    pairs.forEach((pair, i) => {
      const day  = i < cutover ? satDay : addDays(satDay, 1);
      const slot = slots[i % slots.length];
      matches.push({
        id:          `w${weekIdx}-m${i}`,
        kickoff:     isoAt(day, slot.hour, slot.minute),
        homeClubId:  pair[0].id,
        awayClubId:  pair[1].id,
        field:       FIELDS[matchIdx % FIELDS.length],
        competition: COMPETITIONS[matchIdx % COMPETITIONS.length],
        ageGroup:    AGES[matchIdx % AGES.length],
        notes:       matchIdx % 11 === 3 ? "Semifinal — winner advances to the CPSL Cup final" : undefined,
      });
      matchIdx++;
    });
  });

  return matches;
}

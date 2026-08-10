/**
 * Shared types for the League Calendar mockup. These shapes are what the
 * eventual Sanity `match` document will project to via GROQ — so swapping
 * mock data for real data is a rendering-layer no-op.
 */

export type Competition = "Premiership" | "Cup" | "Development";
export type AgeGroup    = "U13" | "U14" | "U15" | "U16" | "U17" | "U19";

export interface CalendarClub {
  id: string;
  name: string;
  /** Short label for compact rows, e.g. "CFC". */
  shortName?: string;
  /** URL of the crest — resolved at the caller so both mock and Sanity data flow through. */
  logoUrl: string;
  /** One of the 8 CPSL conferences (see apps/website/lib/clubConferences.ts). */
  conference: string;
}

export interface CalendarMatch {
  id: string;
  /** Full ISO datetime with offset, e.g. "2026-10-04T14:00:00-04:00". */
  kickoff: string;
  homeClubId: string;
  awayClubId: string;
  /** Free-form field label, e.g. "Matthews Sportsplex — Field 3". */
  field: string;
  competition: Competition;
  ageGroup: AgeGroup;
  /** Optional editorial note, e.g. "Rescheduled from 9/28". */
  notes?: string;
}

/** One weekend's worth of matches — Sat & Sun rolled together. */
export interface CalendarWeekend {
  /** Stable key for React lists — the Saturday's YYYY-MM-DD. */
  id: string;
  /** Human label, e.g. "The weekend of October 4–5". */
  label: string;
  /** Saturday date. Used to decide default expand state. */
  saturday: Date;
  matches: CalendarMatch[];
}

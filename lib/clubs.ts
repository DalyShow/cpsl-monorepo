// ─── Types ────────────────────────────────────────────────────────────────────

export interface Club {
  id: string;
  name: string;
  location: string;
  /** Matches filename in /public/logos/{logoSlug}.svg */
  logoSlug: string;
  conference: "East" | "West";
  record: { wins: number; draws: number; losses: number };
  director: string;
}

export function getPoints(record: Club["record"]): number {
  return record.wins * 3 + record.draws;
}

// ─── Airtable fetch ───────────────────────────────────────────────────────────
// Runs server-side only (Next.js Server Component / Route Handler).
// Airtable field names must match exactly:
//   "Club Name" | "Location" | "Logo Slug" | "Conference"
//   "Wins" | "Draws" | "Losses" | "Director"

interface AirtableRecord {
  id: string;
  fields: {
    "Club Name"?: string;
    "Location"?: string;
    "Logo Slug"?: string;
    "Conference"?: string;
    "Wins"?: number;
    "Draws"?: number;
    "Losses"?: number;
    "Director"?: string;
  };
}

interface AirtableResponse {
  records: AirtableRecord[];
  offset?: string;
}

export async function fetchClubs(): Promise<Club[]> {
  const token = process.env.AIRTABLE_TOKEN;
  const base  = process.env.AIRTABLE_CLUBS_BASE;
  const table = process.env.AIRTABLE_CLUBS_TABLE;

  if (!token || !base || !table) {
    console.warn("Airtable env vars missing — falling back to static data.");
    return CLUBS;
  }

  const allRecords: AirtableRecord[] = [];
  let offset: string | undefined;

  // Page through all records (Airtable returns max 100 per request)
  do {
    const url = new URL(`https://api.airtable.com/v0/${base}/${table}`);
    url.searchParams.set("view", "Grid view");
    if (offset) url.searchParams.set("offset", offset);

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
      // Revalidate every 5 minutes so the directory stays fresh
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      console.error(`Airtable fetch failed: ${res.status} ${res.statusText}`);
      return CLUBS; // graceful fallback
    }

    const data: AirtableResponse = await res.json();
    allRecords.push(...data.records);
    offset = data.offset;
  } while (offset);

  // Map Airtable records → Club shape, skip any incomplete rows
  const mapped = allRecords
    .filter((r) => r.fields["Club Name"] && r.fields["Conference"])
    .map((r) => {
      const f = r.fields;
      const name = f["Club Name"] ?? "";
      return {
        id: r.id,
        name,
        location:   f["Location"]    ?? "",
        logoSlug:   f["Logo Slug"]   ?? slugify(name),
        conference: (f["Conference"] === "West" ? "West" : "East") as "East" | "West",
        record: {
          wins:   f["Wins"]   ?? 0,
          draws:  f["Draws"]  ?? 0,
          losses: f["Losses"] ?? 0,
        },
        director: f["Director"] ?? "",
      };
    });

  // Fall back to static data if Airtable returned no usable records yet
  return mapped.length > 0 ? mapped : CLUBS;
}

/** Converts "Charlotte FC" → "charlotte-fc" as a fallback logo slug */
function slugify(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

// ─── Static fallback data — 10 clubs across NC and SC ────────────────────────
// Used when Airtable env vars are missing or the fetch fails.

export const CLUBS: Club[] = [
  // ── East Conference ──────────────────────────────────────────────────────
  {
    id: "charlotte-fc",
    name: "Charlotte FC",
    location: "Charlotte, NC",
    logoSlug: "charlotte-fc",
    conference: "East",
    record: { wins: 12, draws: 3, losses: 2 },
    director: "Marcus Webb",
  },
  {
    id: "durham-united",
    name: "Durham United",
    location: "Durham, NC",
    logoSlug: "durham-united",
    conference: "East",
    record: { wins: 10, draws: 4, losses: 3 },
    director: "Sarah Chen",
  },
  {
    id: "raleigh-athletic",
    name: "Raleigh Athletic",
    location: "Raleigh, NC",
    logoSlug: "raleigh-athletic",
    conference: "East",
    record: { wins: 9, draws: 5, losses: 3 },
    director: "James Okafor",
  },
  {
    id: "triangle-fc",
    name: "Triangle FC",
    location: "Cary, NC",
    logoSlug: "triangle-fc",
    conference: "East",
    record: { wins: 8, draws: 3, losses: 6 },
    director: "Lisa Park",
  },
  {
    id: "coastal-sc",
    name: "Coastal SC",
    location: "Wilmington, NC",
    logoSlug: "coastal-sc",
    conference: "East",
    record: { wins: 6, draws: 4, losses: 7 },
    director: "Carlos Rivera",
  },
  // ── West Conference ──────────────────────────────────────────────────────
  {
    id: "greensboro-fc",
    name: "Greensboro FC",
    location: "Greensboro, NC",
    logoSlug: "greensboro-fc",
    conference: "West",
    record: { wins: 11, draws: 2, losses: 4 },
    director: "Tom Bradley",
  },
  {
    id: "winston-salem-sc",
    name: "Winston-Salem SC",
    location: "Winston-Salem, NC",
    logoSlug: "winston-salem-sc",
    conference: "West",
    record: { wins: 9, draws: 3, losses: 5 },
    director: "Diana Moore",
  },
  {
    id: "asheville-fc",
    name: "Asheville FC",
    location: "Asheville, NC",
    logoSlug: "asheville-fc",
    conference: "West",
    record: { wins: 7, draws: 6, losses: 4 },
    director: "Patrick Hughes",
  },
  {
    id: "columbia-united",
    name: "Columbia United",
    location: "Columbia, SC",
    logoSlug: "columbia-united",
    conference: "West",
    record: { wins: 5, draws: 4, losses: 8 },
    director: "Amara Johnson",
  },
  {
    id: "charleston-fc",
    name: "Charleston FC",
    location: "Charleston, SC",
    logoSlug: "charleston-fc",
    conference: "West",
    record: { wins: 4, draws: 5, losses: 8 },
    director: "Robert Kim",
  },
];

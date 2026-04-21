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

interface AirtableRecord {
  id: string;
  fields: {
    "Club Name"?:  string;
    "Location"?:   string;
    "Logo Slug"?:  string;
    "Conference"?: string;
    "Wins"?:       number;
    "Draws"?:      number;
    "Losses"?:     number;
    "Director"?:   string;
  };
}

interface AirtableResponse {
  records: AirtableRecord[];
  offset?: string;
}

export async function fetchClubs(): Promise<Club[]> {
  const token = process.env.AIRTABLE_CLUBS_TOKEN;
  const base  = process.env.AIRTABLE_CLUBS_BASE;
  const table = process.env.AIRTABLE_CLUBS_TABLE;

  if (!token || !base || !table) {
    console.warn("Airtable env vars missing — returning empty club list.");
    return [];
  }

  const allRecords: AirtableRecord[] = [];
  let offset: string | undefined;

  do {
    const url = new URL(`https://api.airtable.com/v0/${base}/${table}`);
    url.searchParams.set("view", "Grid view");
    if (offset) url.searchParams.set("offset", offset);

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 300 }, // refresh every 5 minutes
    });

    if (!res.ok) {
      console.error(`Airtable fetch failed: ${res.status} ${res.statusText}`);
      return [];
    }

    const data: AirtableResponse = await res.json();
    allRecords.push(...data.records);
    offset = data.offset;
  } while (offset);

  return allRecords
    .filter((r) => r.fields["Club Name"] && r.fields["Conference"])
    .map((r) => {
      const f = r.fields;
      const name = f["Club Name"] ?? "";
      return {
        id:         r.id,
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
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

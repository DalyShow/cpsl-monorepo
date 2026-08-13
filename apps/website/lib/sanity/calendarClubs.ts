import type { CalendarClub } from "@cpsl/ui";
import { sanityFetch } from "@/lib/sanity/client";
import { enhanceImageUrl } from "@/lib/sanity/image";

/**
 * Fetches the Match Calendar's club roster from
 * `siteSettings.logoTicker.logos[]`.
 *
 * That array is the single source of truth for CPSL crests today —
 * once we build a proper `club` document type, this file becomes a
 * one-line swap and every consumer keeps working.
 *
 * Handles BOTH shapes in the array:
 *   - `clubLogo` — { name, logo } (has the club's real name)
 *   - `image`    — legacy bare crest (falls back to altText / "Unnamed club")
 */

interface RawEntry {
  _type?: "clubLogo" | "image" | string;
  _key?:  string;
  name?:  string;
  logo?:  { asset?: { url?: string; altText?: string; originalFilename?: string } };
  asset?: { url?: string; altText?: string; originalFilename?: string };
}

const QUERY = `*[_type == "siteSettings"][0].logoTicker.logos[]{
  _type, _key, name,
  logo{ asset->{ url, altText, originalFilename } },
  asset->{ url, altText, originalFilename }
}`;

/**
 * Broader shape used for name-hint matching: keeps every crest even when
 * `name` and `altText` are blank, exposing `originalFilename` so callers
 * can pattern-match on "logo-hammerheads.png" etc.
 */
export interface RawClubLogo {
  logoUrl:          string;
  name:             string;
  altText:          string;
  originalFilename: string;
}

export async function fetchAllClubLogos(): Promise<RawClubLogo[]> {
  const raw = await sanityFetch<RawEntry[]>(QUERY);
  if (!raw || !Array.isArray(raw)) return [];

  const out: RawClubLogo[] = [];
  for (const entry of raw) {
    const asset = entry._type === "clubLogo" ? entry.logo?.asset : entry.asset;
    const url = asset?.url;
    if (!url) continue;
    out.push({
      logoUrl:          enhanceImageUrl(url, { sharp: 8 }) ?? url,
      name:             (entry.name ?? "").trim(),
      altText:          (asset?.altText ?? "").trim(),
      originalFilename: (asset?.originalFilename ?? "").trim(),
    });
  }
  return out;
}

/** Kebab-case slug — stable across visual renames as long as the name stays. */
export function slugifyClubName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function fetchCalendarClubs(): Promise<CalendarClub[]> {
  const raw = await sanityFetch<RawEntry[]>(QUERY);
  if (!raw || !Array.isArray(raw)) return [];

  const clubs: CalendarClub[] = [];
  const seen = new Set<string>();

  for (const entry of raw) {
    const isNew = entry._type === "clubLogo";
    const asset = isNew ? entry.logo?.asset : entry.asset;
    const url   = asset?.url;
    if (!url) continue;

    const name = (entry.name || asset?.altText || "").trim();
    if (!name) continue; // Bare, unnamed crests are skipped in the calendar.

    const id = slugifyClubName(name);
    if (!id || seen.has(id)) continue;
    seen.add(id);

    clubs.push({
      id,
      name,
      logoUrl:    enhanceImageUrl(url, { sharp: 8 }) ?? url,
      conference: "", // Placeholder — until `club` doc type carries it.
    });
  }

  // Alphabetise for a stable dropdown.
  clubs.sort((a, b) => a.name.localeCompare(b.name));
  return clubs;
}

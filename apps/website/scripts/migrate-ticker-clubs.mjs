#!/usr/bin/env node
/**
 * Convert legacy bare-image entries in siteSettings.logoTicker.logos[] into
 * the new `clubLogo` shape ({ name, logo }) so every crest carries a
 * club name — powering the Match Calendar's dropdown.
 *
 * Derives the initial name from (in order):
 *   1. asset.altText   — anything the editor already set
 *   2. asset.originalFilename — "asheville-fc.svg" → "Asheville FC"
 *   3. empty string    — editor has to fill it in in Studio
 *
 * Entries already saved as clubLogo are skipped, so the script is idempotent.
 *
 * Dry-run by default. Pass `--apply` to commit.
 *
 *   SANITY_API_WRITE_TOKEN=sk... node apps/website/scripts/migrate-ticker-clubs.mjs
 *   SANITY_API_WRITE_TOKEN=sk... node apps/website/scripts/migrate-ticker-clubs.mjs --apply
 */

import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";

// ── Load .env.local ──────────────────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "..", ".env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/);
    if (!m) continue;
    if (!process.env[m[1]]) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, "");
  }
}

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const TOKEN      = process.env.SANITY_API_WRITE_TOKEN;
const APPLY      = process.argv.includes("--apply");

if (!PROJECT_ID) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID.");
  process.exit(1);
}
if (!TOKEN) {
  console.error(
    "Missing SANITY_API_WRITE_TOKEN.\n" +
    "Usage:\n" +
    "  SANITY_API_WRITE_TOKEN=sk... node apps/website/scripts/migrate-ticker-clubs.mjs [--apply]",
  );
  process.exit(1);
}

const client = createClient({
  projectId:  PROJECT_ID,
  dataset:    DATASET,
  apiVersion: "2024-01-01",
  token:      TOKEN,
  useCdn:     false,
});

// ── Name-derivation helpers ─────────────────────────────────────────────────

/** Words that should stay all-caps (soccer club suffixes, etc.). */
const UPPER_WORDS = new Set(["fc", "sc", "cf", "sk", "cd", "afc", "usa", "us", "ii", "iii"]);

function titleCaseWord(w) {
  const lower = w.toLowerCase();
  if (UPPER_WORDS.has(lower)) return lower.toUpperCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

function humaniseFilename(filename) {
  if (!filename) return "";
  const stem = filename
    .replace(/\.[a-z0-9]+$/i, "")                    // strip .svg / .png
    .replace(/^(logo|crest|club|team|badge)[-_]+/i, ""); // strip common prefixes
  return stem
    .replace(/[_-]+/g, " ")
    .trim()
    .split(/\s+/)
    .map(titleCaseWord)
    .join(" ");
}

function deriveName(alt, filename) {
  const a = (alt || "").trim();
  if (a) return a;
  return humaniseFilename(filename || "");
}

// ── Fetch the singleton ─────────────────────────────────────────────────────

const QUERY = `*[_type == "siteSettings"][0]{
  _id,
  logoTicker{
    logos[]{
      _type, _key,
      name,
      logo{ asset->{ _id, altText, originalFilename }, hotspot, crop },
      asset->{ _id, altText, originalFilename },
      hotspot,
      crop
    }
  }
}`;

const doc = await client.fetch(QUERY);

if (!doc) {
  console.error("No siteSettings document found.");
  process.exit(1);
}

const logos = doc.logoTicker?.logos ?? [];
if (logos.length === 0) {
  console.log("No logos in siteSettings.logoTicker.logos[] — nothing to migrate.");
  process.exit(0);
}

// ── Build the new array ─────────────────────────────────────────────────────

let convertedCount = 0;
let skippedCount   = 0;
let missingName    = 0;

const nextLogos = logos.map((entry) => {
  if (entry._type === "clubLogo") {
    skippedCount++;
    return entry; // already migrated
  }

  const assetRef  = entry.asset?._id;
  if (!assetRef) {
    // Nothing to migrate — orphan. Keep as-is so a human can inspect.
    return entry;
  }

  const name = deriveName(entry.asset?.altText, entry.asset?.originalFilename);
  if (!name) missingName++;

  const converted = {
    _type: "clubLogo",
    _key:  entry._key, // preserve order
    name,
    logo: {
      _type: "image",
      asset: { _type: "reference", _ref: assetRef },
      ...(entry.hotspot ? { hotspot: entry.hotspot } : {}),
      ...(entry.crop    ? { crop:    entry.crop    } : {}),
    },
  };

  convertedCount++;
  console.log(
    `  • ${entry._key.padEnd(14)} → Club "${name || "(no name — please set in Studio)"}"` +
    ` (was image ${entry.asset?.originalFilename ?? assetRef})`
  );

  return converted;
});

console.log(
  `\nTotal: ${logos.length}  ` +
  `— to convert: ${convertedCount}  ` +
  `— already clubLogo: ${skippedCount}  ` +
  `— missing derived name (fill in Studio): ${missingName}`
);

if (convertedCount === 0) {
  console.log("Nothing to do.");
  process.exit(0);
}

if (!APPLY) {
  console.log("\nDry-run only — re-run with --apply to commit.");
  process.exit(0);
}

await client
  .patch(doc._id)
  .set({ "logoTicker.logos": nextLogos })
  .commit({ autoGenerateArrayKeys: false });

console.log(`\n✓ Applied — ${convertedCount} entr${convertedCount === 1 ? "y" : "ies"} converted.`);

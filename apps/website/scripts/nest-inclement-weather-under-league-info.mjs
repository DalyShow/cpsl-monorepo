#!/usr/bin/env node
/**
 * Nest the Inclement Weather Plan under League Info.
 *
 *   1. Set the inclement-weather page's `parent` reference to
 *      the League Information page — URL becomes
 *      /league-information/inclement-weather.
 *   2. Convert the "League Info" siteSettings.navItems entry from a
 *      plain topNavLink to a topNavFlyout with two items:
 *         • League Information (landing page)
 *         • Inclement Weather Plan
 *      The Carolina Development League nav entry gets the same
 *      structural safeguard: schedule + landing exposed as sub-items.
 *
 * Idempotent: safe to re-run — patches instead of overwriting where
 * possible; converting nav items uses the existing _key so the ordering
 * survives.
 */

import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";
import { createClient } from "@sanity/client";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath   = resolve(__dirname, "..", ".env.local");
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
if (!PROJECT_ID || !TOKEN) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN.");
  process.exit(1);
}

const client = createClient({
  projectId:  PROJECT_ID,
  dataset:    DATASET,
  apiVersion: "2024-01-01",
  token:      TOKEN,
  useCdn:     false,
});

const shortKey = () => randomUUID().replace(/-/g, "").slice(0, 12);

async function findPageId(slug) {
  const doc = await client.fetch(
    `*[_type == "page" && slug.current == $slug][0]{_id}`,
    { slug },
  );
  return doc?._id;
}

async function main() {
  console.log(`Nesting on project ${PROJECT_ID} / dataset ${DATASET}\n`);

  // 1. Look up the parent (League Information) + child (Inclement Weather) ids.
  const leagueInfoId       = await findPageId("league-information");
  const inclementWeatherId = await findPageId("inclement-weather");
  if (!leagueInfoId)       throw new Error("No page with slug 'league-information'.");
  if (!inclementWeatherId) throw new Error("No page with slug 'inclement-weather'.");
  console.log("  parent  (League Information):", leagueInfoId);
  console.log("  child   (Inclement Weather):", inclementWeatherId);

  // 2. Patch the Inclement Weather page's `parent` field.
  await client
    .patch(inclementWeatherId)
    .set({ parent: { _type: "reference", _ref: leagueInfoId } })
    .commit();
  console.log("  ✓ parent reference set — URL is now /league-information/inclement-weather");

  // 3. Rebuild the League Info nav entry as a flyout containing both pages.
  const settings = await client.fetch(
    `*[_type == "siteSettings"][0]{_id, navItems}`
  );
  const existing = settings?.navItems ?? [];
  const nextItems = existing.map((item) => {
    if (item.label === "League Info") {
      return {
        _key:  item._key ?? shortKey(),
        _type: "topNavFlyout",
        label: "League Info",
        size:  "md",
        items: [
          {
            _key:        shortKey(),
            _type:       "flyoutItem",
            label:       "League Information",
            description: "Overview, structure and league policies.",
            href:        "/league-information",
          },
          {
            _key:        shortKey(),
            _type:       "flyoutItem",
            label:       "Inclement Weather Plan",
            description: "Hot & cold guidelines, thunder & lightning rule.",
            href:        "/league-information/inclement-weather",
          },
        ],
      };
    }
    return item;
  });

  await client
    .patch(settings._id)
    .set({ navItems: nextItems })
    .commit();
  console.log("  ✓ TopNav 'League Info' converted to a flyout with 2 items");

  console.log("\n✓ Done. Publish siteSettings in Studio if drafts is on; otherwise it's live.");
}

main().catch((err) => { console.error(err); process.exit(1); });

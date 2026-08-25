#!/usr/bin/env node
/**
 * Convert the "League Standards" top-nav entry from a plain link into a
 * flyout with two items: the League Standards landing page and the Game
 * Day Operations Guide (a static route at
 * /league-standards/game-day-operations).
 *
 * Idempotent: matches the nav entry by href, keeps its _key so ordering
 * survives, and re-running simply rewrites the same flyout.
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

async function main() {
  const settings = await client.fetch(`*[_type == "siteSettings"][0]{_id, navItems}`);
  const existing = settings?.navItems ?? [];

  let converted = false;
  const nextItems = existing.map((item) => {
    const isLeagueStandards =
      item.href === "/league-standards" ||
      (item._type === "topNavFlyout" && /league standards/i.test(item.label ?? ""));
    if (!isLeagueStandards) return item;
    converted = true;
    return {
      _key:  item._key ?? shortKey(),
      _type: "topNavFlyout",
      label: item.label || "League Standards",
      size:  "md",
      items: [
        {
          _key:        shortKey(),
          _type:       "flyoutItem",
          label:       "League Standards",
          description: "Standards and expectations for every CPSL club.",
          href:        "/league-standards",
        },
        {
          _key:        shortKey(),
          _type:       "flyoutItem",
          label:       "Game Day Operations Guide",
          description: "Match day requirements & pre-match checklists by division.",
          href:        "/league-standards/game-day-operations",
        },
      ],
    };
  });

  if (!converted) throw new Error("No 'League Standards' nav entry found to convert.");

  await client.patch(settings._id).set({ navItems: nextItems }).commit();
  console.log("✓ TopNav 'League Standards' converted to a flyout with 2 items.");
}

main().catch((err) => { console.error(err); process.exit(1); });

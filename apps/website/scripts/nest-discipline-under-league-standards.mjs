#!/usr/bin/env node
/**
 * Nest the Discipline page under League Standards:
 *   1. Set the discipline page's parent → the League Standards page, so
 *      the route becomes /league-standards/discipline, with nav label
 *      "Discipline and Conduct".
 *   2. Append a "Discipline and Conduct" item to the League Standards
 *      top-nav flyout (two-cards icon, matching the existing 20×20
 *      white-stroke icon set).
 *
 * Pair with the /discipline → /league-standards/discipline redirect in
 * next.config.ts. Idempotent: replaces the flyout item by href.
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=sk... ICON_SVG=/path/to/discipline-icon.svg \
 *     node apps/website/scripts/nest-discipline-under-league-standards.mjs
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
  projectId: PROJECT_ID, dataset: DATASET,
  apiVersion: "2024-01-01", token: TOKEN, useCdn: false,
});

const shortKey = () => randomUUID().replace(/-/g, "").slice(0, 12);

const HREF = "/league-standards/discipline";

async function main() {
  // 1. Parent the page.
  const leagueStandards = await client.fetch(
    `*[_type == "page" && slug.current == "league-standards"][0]{_id}`
  );
  if (!leagueStandards) throw new Error("league-standards page not found");

  await client
    .patch("discipline-page")
    .set({
      parent:   { _type: "reference", _ref: leagueStandards._id },
      navLabel: "Discipline and Conduct",
      navOrder: 30,
    })
    .commit();
  console.log(`✓ discipline-page parented → ${HREF}`);

  // 2. Flyout item with icon.
  let iconRef;
  const iconPath = process.env.ICON_SVG;
  if (iconPath && existsSync(iconPath)) {
    console.log("  ↑ uploading flyout icon…");
    const asset = await client.assets.upload("image", readFileSync(iconPath), {
      filename: "nav-icon-discipline.svg",
    });
    iconRef = asset._id;
  }

  const settings = await client.fetch(`*[_type == "siteSettings"][0]{_id, navItems}`);
  const navItems = (settings?.navItems ?? []).map((item) => {
    if (item._type !== "topNavFlyout" || !/league standards/i.test(item.label ?? "")) {
      return item;
    }
    const items = (item.items ?? []).filter((i) => i.href !== HREF);
    const existing = (item.items ?? []).find((i) => i.href === HREF);
    items.push({
      _key:        existing?._key ?? shortKey(),
      _type:       "flyoutItem",
      label:       "Discipline and Conduct",
      description: "Referee abuse prevention & penalties matrix",
      href:        HREF,
      ...(iconRef
        ? { icon: { _type: "image", asset: { _type: "reference", _ref: iconRef } } }
        : existing?.icon
          ? { icon: existing.icon }
          : {}),
    });
    return { ...item, items };
  });

  await client.patch(settings._id).set({ navItems }).commit();
  console.log("✓ 'Discipline and Conduct' added to the League Standards flyout.");
}

main().catch((err) => { console.error(err); process.exit(1); });

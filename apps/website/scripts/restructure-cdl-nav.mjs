#!/usr/bin/env node
/**
 * Publish the CDL schedule + restructure the Carolina Development League nav:
 *   1. Copy the CDL landing page's sections into a new child page
 *      "Welcome" (/carolina-development-league/welcome) so the existing
 *      content isn't lost.
 *   2. Empty the CDL landing page's sections — its bare URL now 308s to
 *      the Welcome page (redirect lives in next.config.ts).
 *   3. Convert the "Carolina Development League" top-nav link into a
 *      flyout with two items: Welcome and Schedule (house + calendar
 *      icons, matching the 20×20 white-stroke set).
 *
 * Idempotent: fixed _id for the welcome page; the flyout conversion
 * rewrites the same entry (matched by href or label) on re-run.
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=sk... WELCOME_ICON=/path/welcome-icon.svg \
 *     SCHEDULE_ICON=/path/schedule-icon.svg node apps/website/scripts/restructure-cdl-nav.mjs
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

async function uploadIcon(envVar, filename) {
  const path = process.env[envVar];
  if (!path || !existsSync(path)) return undefined;
  console.log(`  ↑ uploading ${filename}…`);
  const asset = await client.assets.upload("image", readFileSync(path), { filename });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

async function main() {
  const cdl = await client.fetch(
    `*[_type == "page" && slug.current == "carolina-development-league"][0]{_id, sections, seoDescription}`
  );
  if (!cdl) throw new Error("carolina-development-league page not found");

  // 1. Welcome page carries the existing landing content.
  const existingWelcome = await client.fetch(`*[_id == "cdl-welcome-page"][0]{_id}`);
  if (existingWelcome) {
    console.log("  ↻ cdl-welcome-page already exists — leaving its content alone.");
  } else {
    await client.createOrReplace({
      _id:   "cdl-welcome-page",
      _type: "page",
      title: "Welcome",
      slug:  { _type: "slug", current: "welcome" },
      parent:   { _type: "reference", _ref: cdl._id },
      navLabel: "Welcome",
      navOrder: 10,
      ...(cdl.seoDescription ? { seoDescription: cdl.seoDescription } : {}),
      sections: cdl.sections ?? [],
    });
    console.log("  ✓ Welcome page created with the CDL landing content.");

    // 2. Landing page becomes a shell (parent for nesting + redirect target).
    await client.patch(cdl._id).set({ sections: [] }).commit();
    console.log("  ✓ CDL landing page emptied (bare URL redirects to /welcome).");
  }

  // 3. Nav flyout.
  const welcomeIcon  = await uploadIcon("WELCOME_ICON", "nav-icon-cdl-welcome.svg");
  const scheduleIcon = await uploadIcon("SCHEDULE_ICON", "nav-icon-cdl-schedule.svg");

  const settings = await client.fetch(`*[_type == "siteSettings"][0]{_id, navItems}`);
  let converted = false;
  const navItems = (settings?.navItems ?? []).map((item) => {
    const isCdl =
      item.href === "/carolina-development-league" ||
      /carolina development league/i.test(item.label ?? "");
    if (!isCdl) return item;
    converted = true;
    const prevItems = item._type === "topNavFlyout" ? (item.items ?? []) : [];
    const prevBy = (href) => prevItems.find((i) => i.href === href);
    return {
      _key:  item._key ?? shortKey(),
      _type: "topNavFlyout",
      label: item.label || "Carolina Development League",
      size:  "md",
      items: [
        {
          _key:        prevBy("/carolina-development-league/welcome")?._key ?? shortKey(),
          _type:       "flyoutItem",
          label:       "Welcome",
          description: "What the CDL is and how the league works",
          href:        "/carolina-development-league/welcome",
          ...(welcomeIcon ? { icon: welcomeIcon } : {}),
        },
        {
          _key:        prevBy("/carolina-development-league/schedule")?._key ?? shortKey(),
          _type:       "flyoutItem",
          label:       "Match Schedule",
          description: "Fall 2026 fixtures for every age group",
          href:        "/carolina-development-league/schedule",
          ...(scheduleIcon ? { icon: scheduleIcon } : {}),
        },
      ],
    };
  });
  if (!converted) throw new Error("No 'Carolina Development League' nav entry found.");

  await client.patch(settings._id).set({ navItems }).commit();
  console.log("  ✓ Nav: Carolina Development League is now a flyout (Welcome · Match Schedule).");
}

main().catch((err) => { console.error(err); process.exit(1); });

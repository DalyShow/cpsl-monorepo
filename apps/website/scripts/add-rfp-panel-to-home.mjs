#!/usr/bin/env node
/**
 * Homepage dual panel: split the right column — keep "National 1 League
 * explained" on top and add an RFP callout beneath it (rightPanelSecondary),
 * using the RFP landing's background photo and headline, linking to /rfp.
 *
 * Idempotent: re-running overwrites the same rightPanelSecondary field.
 */

import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
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

const IMAGE_PATH = resolve(__dirname, "..", "public", "rfp", "rfp-background.jpg");

async function main() {
  const home = await client.fetch(`*[_type == "homePage"][0]{_id, sections}`);
  if (!home) throw new Error("homePage document not found");
  const idx = (home.sections ?? []).findIndex((s) => s._type === "dualPanelBlock");
  if (idx < 0) throw new Error("No dualPanelBlock on the home page");

  console.log("  ↑ uploading RFP panel image…");
  const asset = await client.assets.upload("image", readFileSync(IMAGE_PATH), {
    filename: "rfp-panel-background.jpg",
  });

  await client
    .patch(home._id)
    .set({
      [`sections[${idx}].rightPanelSecondary`]: {
        _type:       "dualPanelItem",
        eyebrow:     "Request for Proposal",
        headline:    "Tournament Series & Team Travel Management",
        subheadline: "CPSL is seeking an official tournament operations and team travel partner for the 2026–27 season.",
        ctaLabel:    "View RFP",
        ctaHref:     "/rfp",
        image: {
          _type: "image",
          asset: { _type: "reference", _ref: asset._id },
        },
      },
    })
    .commit();

  console.log("✓ Homepage right column now stacks National 1 + RFP panels.");
}

main().catch((err) => { console.error(err); process.exit(1); });

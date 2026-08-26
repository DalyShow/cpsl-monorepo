#!/usr/bin/env node
/**
 * League Standards page:
 *   1. Upload the referee photo and append a second Hero Bento module
 *      below the Local Operator's Handbook — reversed layout (image
 *      left, text right) calling out the Matchday Addendum form, with
 *      the CTA wired to the "Matchday Addendum" documentAsset.
 *   2. Retrofit the existing handbook module's CTA to reference its
 *      documentAsset — its current ctaHref points at the OLD Sanity
 *      project's (6fq1zd6y) file CDN, which will break when that
 *      project is deleted.
 *
 * Idempotent: replaces the existing "Matchday Addendum" section (by
 * headline) instead of appending twice.
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

const IMAGE_PATH = `${process.env.HOME}/Desktop/referree.jpg`;

async function main() {
  const page = await client.fetch(
    `*[_type == "page" && slug.current == "league-standards"][0]{_id, sections}`
  );
  if (!page) throw new Error("league-standards page not found");

  const addendumDoc = await client.fetch(
    `*[_type == "documentAsset" && title match "Matchday Addendum"][0]{_id}`
  );
  const handbookDoc = await client.fetch(
    `*[_type == "documentAsset" && title match "*operator handbook*"][0]{_id}`
  );
  if (!addendumDoc) throw new Error("Matchday Addendum documentAsset not found");
  console.log("  addendum doc:", addendumDoc._id);
  console.log("  handbook doc:", handbookDoc?._id ?? "(not found — skipping retrofit)");

  if (!existsSync(IMAGE_PATH)) throw new Error(`Image not found: ${IMAGE_PATH}`);
  console.log("  ↑ uploading referee image…");
  const imageAsset = await client.assets.upload("image", readFileSync(IMAGE_PATH), {
    filename: "matchday-addendum-referee.jpg",
  });

  const addendumSection = {
    _type: "heroBentoBlock",
    _key:  shortKey(),
    eyebrow:  "LEAGUE STANDARDS",
    headline: "Matchday Addendum",
    description:
      "Every home club must complete the Matchday Addendum and hand it to the referee alongside the printed GotSport Match Report before kickoff. Download the form and have it ready on matchday.",
    ctaLabel:     "Download addendum form",
    ctaDocument:  { _type: "reference", _ref: addendumDoc._id },
    ctaNewWindow: true,
    heroImage: {
      _type: "image",
      asset: { _type: "reference", _ref: imageAsset._id },
    },
    sectionBackground: "none",
    reverse: true,
  };

  // Replace an existing Matchday Addendum section, else insert right after
  // the handbook module (index of the first heroBentoBlock).
  const sections = [...(page.sections ?? [])];
  const existingIdx = sections.findIndex(
    (s) => s._type === "heroBentoBlock" && s.headline === "Matchday Addendum"
  );
  if (existingIdx >= 0) {
    addendumSection._key = sections[existingIdx]._key; // keep stable key
    sections[existingIdx] = addendumSection;
    console.log("  ↻ replacing existing Matchday Addendum section");
  } else {
    const handbookIdx = sections.findIndex((s) => s._type === "heroBentoBlock");
    sections.splice(handbookIdx + 1, 0, addendumSection);
    console.log("  + inserting Matchday Addendum section after the handbook module");
  }

  // Retrofit the handbook module's document reference.
  if (handbookDoc) {
    const idx = sections.findIndex(
      (s) => s._type === "heroBentoBlock" && /handbook/i.test(s.headline ?? "")
    );
    if (idx >= 0 && !sections[idx].ctaDocument) {
      sections[idx] = {
        ...sections[idx],
        ctaDocument: { _type: "reference", _ref: handbookDoc._id },
      };
      console.log("  ✓ handbook CTA now references its documentAsset (old-project URL retired)");
    }
  }

  await client.patch(page._id).set({ sections }).commit();
  console.log("\n✓ league-standards page updated.");
}

main().catch((err) => { console.error(err); process.exit(1); });

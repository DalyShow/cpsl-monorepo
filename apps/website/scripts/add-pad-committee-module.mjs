#!/usr/bin/env node
/**
 * League Standards page:
 *   1. Upload the sunset-keeper photo and insert a PAD Committee Policy
 *      Hero Bento module SECOND — right after the Local Operator's
 *      Handbook — reversed (image left), CTA wired to the
 *      "Pad-Committee-Policy" documentAsset.
 *   2. Keep the image sides alternating down the page: with PAD taking
 *      the reversed slot, the Matchday Addendum (now third) flips back
 *      to the default layout (image right).
 *
 * Idempotent: replaces an existing PAD section (by headline) instead of
 * inserting twice, and re-asserts the addendum's orientation either way.
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

const IMAGE_PATH = `${process.env.HOME}/Desktop/committee-policy.jpg`;

async function main() {
  const page = await client.fetch(
    `*[_type == "page" && slug.current == "league-standards"][0]{_id, sections}`
  );
  if (!page) throw new Error("league-standards page not found");

  const padDoc = await client.fetch(
    `*[_type == "documentAsset" && title match "*Pad-Committee*"][0]{_id}`
  );
  if (!padDoc) throw new Error("Pad-Committee-Policy documentAsset not found");
  console.log("  PAD policy doc:", padDoc._id);

  if (!existsSync(IMAGE_PATH)) throw new Error(`Image not found: ${IMAGE_PATH}`);
  console.log("  ↑ uploading committee-policy image…");
  const imageAsset = await client.assets.upload("image", readFileSync(IMAGE_PATH), {
    filename: "pad-committee-policy.jpg",
  });

  const padSection = {
    _type: "heroBentoBlock",
    _key:  shortKey(),
    eyebrow:  "LEAGUE STANDARDS",
    headline: "PAD Committee Policy",
    description:
      "The Protest, Appeals & Discipline Committee provides a clear, consistent process for reporting, reviewing, deciding, and appealing alleged violations of CPSL rules and standards. Review the full policy before filing a formal report.",
    ctaLabel:     "Download PAD policy",
    ctaDocument:  { _type: "reference", _ref: padDoc._id },
    ctaNewWindow: true,
    heroImage: {
      _type: "image",
      asset: { _type: "reference", _ref: imageAsset._id },
    },
    sectionBackground: "none",
    reverse: true,
  };

  const sections = [...(page.sections ?? [])];
  const existingIdx = sections.findIndex(
    (s) => s._type === "heroBentoBlock" && s.headline === "PAD Committee Policy"
  );
  if (existingIdx >= 0) {
    padSection._key = sections[existingIdx]._key; // keep stable key
    sections[existingIdx] = padSection;
    console.log("  ↻ replacing existing PAD Committee Policy section");
  } else {
    const handbookIdx = sections.findIndex((s) => s._type === "heroBentoBlock");
    sections.splice(handbookIdx + 1, 0, padSection);
    console.log("  + inserting PAD section second, after the handbook module");
  }

  // Third row: Matchday Addendum returns to the default layout so the
  // image sides alternate right → left → right down the page.
  const addendumIdx = sections.findIndex(
    (s) => s._type === "heroBentoBlock" && s.headline === "Matchday Addendum"
  );
  if (addendumIdx >= 0 && sections[addendumIdx].reverse !== false) {
    sections[addendumIdx] = { ...sections[addendumIdx], reverse: false };
    console.log("  ✓ Matchday Addendum flipped back to image-right");
  }

  await client.patch(page._id).set({ sections }).commit();
  console.log("\n✓ league-standards: handbook → PAD (image left) → addendum (image right).");
}

main().catch((err) => { console.error(err); process.exit(1); });

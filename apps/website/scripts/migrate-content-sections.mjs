#!/usr/bin/env node
/**
 * Migrate Content Section blocks from plain-string fields to Portable Text.
 *
 * The schema was upgraded on 2026-06-30 so `lead` (was `text`) and
 * `paragraphs` (was `array of text`) both accept rich text with bold,
 * italic, underline, links, and — for paragraphs — bullet/numbered lists
 * plus H4 subheadings.
 *
 * This script walks every page/homePage/brandPage document, finds any
 * `contentSectionBlock` items whose `lead` is still a string OR whose
 * `paragraphs` array contains string items, and patches them in place
 * into single-block Portable Text structures. Items already in PT shape
 * are skipped, so the script is idempotent.
 *
 * Dry-run by default — prints what would change. Pass `--apply` to write.
 *
 *   SANITY_API_WRITE_TOKEN=sk... node apps/website/scripts/migrate-content-sections.mjs
 *   SANITY_API_WRITE_TOKEN=sk... node apps/website/scripts/migrate-content-sections.mjs --apply
 *
 * Reads projectId / dataset from apps/website/.env.local (NEXT_PUBLIC_SANITY_*).
 */

import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";
import { randomUUID } from "node:crypto";

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
    "Create an Editor-role token in Sanity → Manage Project → API → Tokens, then re-run:\n" +
    "  SANITY_API_WRITE_TOKEN=sk... node apps/website/scripts/migrate-content-sections.mjs [--apply]",
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

// ── PT helpers ───────────────────────────────────────────────────────────────
const shortKey = () => randomUUID().replace(/-/g, "").slice(0, 12);

/** Wrap a plain string into one PT block (paragraph). Preserves single-line
 *  breaks by turning them into spaces. Blank-line-separated paragraphs are
 *  emitted as separate blocks. */
function stringToBlocks(text) {
  return text
    .split(/\n{2,}/)
    .map((p) => p.replace(/\n/g, " ").trim())
    .filter(Boolean)
    .map((p) => ({
      _type: "block",
      _key: shortKey(),
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: shortKey(), text: p, marks: [] }],
    }));
}

// ── Fetch everything in one query ────────────────────────────────────────────
const QUERY = `*[
  _type in ["page","homePage","brandPage"]
  && count(sections[_type == "contentSectionBlock"]) > 0
]{
  _id, _type,
  sections[]{ _key, _type, heading, lead, paragraphs }
}`;

const docs = await client.fetch(QUERY);

let docsTouched = 0;
let fieldsPatched = 0;

for (const doc of docs) {
  const patches = [];
  for (const section of doc.sections ?? []) {
    if (section._type !== "contentSectionBlock") continue;

    // lead: convert string → PT
    if (typeof section.lead === "string" && section.lead.trim().length > 0) {
      const value = stringToBlocks(section.lead);
      patches.push({
        path:  `sections[_key=="${section._key}"].lead`,
        value,
        label: `lead of "${section.heading ?? "(untitled)"}"`,
      });
    }

    // paragraphs: convert any string items to PT blocks. The array itself
    // stays put — Sanity treats mixed shapes as PT once the schema switches.
    if (Array.isArray(section.paragraphs)) {
      const anyStrings = section.paragraphs.some((p) => typeof p === "string");
      if (anyStrings) {
        const value = section.paragraphs.flatMap((p) => {
          if (typeof p === "string") return stringToBlocks(p);
          return [p]; // already a block, keep as-is
        });
        patches.push({
          path:  `sections[_key=="${section._key}"].paragraphs`,
          value,
          label: `paragraphs of "${section.heading ?? "(untitled)"}"`,
        });
      }
    }
  }

  if (patches.length === 0) continue;
  docsTouched++;
  fieldsPatched += patches.length;

  console.log(`\n📄 ${doc._type}/${doc._id}  —  ${patches.length} field${patches.length === 1 ? "" : "s"}`);
  for (const p of patches) console.log(`   • ${p.label}`);

  if (APPLY) {
    let tx = client.patch(doc._id);
    for (const p of patches) tx = tx.set({ [p.path]: p.value });
    await tx.commit({ autoGenerateArrayKeys: true });
    console.log("   ✓ applied");
  }
}

console.log("\n────────────────────────────────────────");
console.log(`Documents touched : ${docsTouched}`);
console.log(`Fields patched    : ${fieldsPatched}`);
console.log(APPLY ? "✓ Changes applied to Sanity." : "Dry-run only — pass --apply to commit.");

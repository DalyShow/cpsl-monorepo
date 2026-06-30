#!/usr/bin/env node
/**
 * Migrate FAQ item `answer` fields from plain strings to Portable Text.
 *
 * Reads every page document (`page`, `homePage`, `brandPage`) that contains
 * an `faqAccordionBlock` section, finds items whose `answer` is still a
 * string, wraps each into a single-block Portable Text structure, and
 * patches the document in place. Items already migrated are skipped.
 *
 * Dry-run by default — prints what it would change. Pass `--apply` to
 * actually write the changes.
 *
 *   # Dry run (preview only)
 *   SANITY_API_WRITE_TOKEN=sk... node apps/website/scripts/migrate-faq-answers.mjs
 *
 *   # Apply
 *   SANITY_API_WRITE_TOKEN=sk... node apps/website/scripts/migrate-faq-answers.mjs --apply
 *
 * Pulls projectId / dataset from `.env.local` (`NEXT_PUBLIC_SANITY_*`) if
 * present so the script stays in lockstep with the running site.
 */

import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";
import { randomUUID } from "node:crypto";

// ── Load .env.local (lightweight, no dotenv dep) ──────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "..", ".env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/);
    if (!m) continue;
    if (!process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, "");
    }
  }
}

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const TOKEN      = process.env.SANITY_API_WRITE_TOKEN;
const APPLY      = process.argv.includes("--apply");

if (!PROJECT_ID) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID — set it in apps/website/.env.local or via env.");
  process.exit(1);
}
if (!TOKEN) {
  console.error(
    "Missing SANITY_API_WRITE_TOKEN.\n" +
    "Create a write-permission token in Sanity → Manage Project → API → Tokens, then re-run:\n" +
    "  SANITY_API_WRITE_TOKEN=sk... node apps/website/scripts/migrate-faq-answers.mjs [--apply]"
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

// ── Convert a plain string into Portable Text ─────────────────────────────────
function stringToPortableText(text) {
  // Split on blank lines into paragraphs; preserve hard line breaks within a
  // paragraph by collapsing single newlines to spaces (matches `text` field
  // behaviour the editors are used to).
  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => p.replace(/\n/g, " ").trim())
    .filter((p) => p.length > 0);
  return paragraphs.map((p) => ({
    _type: "block",
    _key: randomUUID().replace(/-/g, "").slice(0, 12),
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: randomUUID().replace(/-/g, "").slice(0, 12),
        text: p,
        marks: [],
      },
    ],
  }));
}

// ── Query docs that have any FAQ block with a string-typed answer ────────────
const QUERY = `*[
  _type in ["page", "homePage", "brandPage"]
  && count(sections[_type == "faqAccordionBlock"]) > 0
]{
  _id,
  _type,
  _rev,
  sections[]{
    _key,
    _type,
    items[]{
      _key,
      question,
      answer
    }
  }
}`;

const docs = await client.fetch(QUERY);

let totalDocs = 0;
let totalItems = 0;

for (const doc of docs) {
  const patches = [];
  for (const section of doc.sections ?? []) {
    if (section._type !== "faqAccordionBlock") continue;
    for (const item of section.items ?? []) {
      if (typeof item.answer !== "string" || item.answer.length === 0) continue;
      const pt = stringToPortableText(item.answer);
      const path = `sections[_key=="${section._key}"].items[_key=="${item._key}"].answer`;
      patches.push({ path, value: pt, question: item.question });
    }
  }
  if (patches.length === 0) continue;

  totalDocs++;
  totalItems += patches.length;

  console.log(`\n📄 ${doc._type}/${doc._id}  —  ${patches.length} item${patches.length === 1 ? "" : "s"}`);
  for (const p of patches) {
    console.log(`   • ${p.question?.slice(0, 60) ?? "(no question)"}`);
  }

  if (APPLY) {
    let tx = client.patch(doc._id);
    for (const p of patches) {
      tx = tx.set({ [p.path]: p.value });
    }
    await tx.commit({ autoGenerateArrayKeys: true });
    console.log("   ✓ applied");
  }
}

console.log("\n────────────────────────────────────────");
console.log(`Documents touched: ${totalDocs}`);
console.log(`FAQ items migrated: ${totalItems}`);
console.log(APPLY ? "✓ Changes applied to Sanity." : "Dry-run only — pass --apply to commit.");

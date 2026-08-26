#!/usr/bin/env node
/**
 * Seed the "Discipline" page in Sanity from the printed policy documents:
 *   1. U.S. Soccer Policy 531-9 — Referee Abuse Prevention (page 1)
 *   2. CPSL / U.S. Soccer Penalties Matrix (non-physical + physical)
 *   3. US Club Soccer Discipline Matrix
 *
 * Structure mirrors the inclement-weather page: navy hero, alert bar for
 * the official-policy banner, prose content sections for the policy text,
 * penaltyMatrixBlock tables for the matrices.
 *
 * Idempotent: createOrReplace against a fixed `_id`. Unlinked from nav —
 * lives at /discipline until it's nested under a parent.
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=sk... node apps/website/scripts/seed-discipline.mjs
 */

import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";
import { createClient } from "@sanity/client";

// ── Load .env.local ─────────────────────────────────────────────────────────
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
if (!PROJECT_ID || !TOKEN) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN.");
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID, dataset: DATASET,
  apiVersion: "2024-01-01", token: TOKEN, useCdn: false,
});

// ── Portable-text helpers (same markdown-lite [[b]]…[[/b]] as weather seed) ──

const shortKey = () => randomUUID().replace(/-/g, "").slice(0, 12);

function spans(text) {
  const parts = String(text).split(/(\[\[b\]\][\s\S]*?\[\[\/b\]\])/g);
  return parts.filter(Boolean).map((part) => {
    const m = part.match(/^\[\[b\]\]([\s\S]*)\[\[\/b\]\]$/);
    return m
      ? { _type: "span", _key: shortKey(), text: m[1], marks: ["strong"] }
      : { _type: "span", _key: shortKey(), text: part, marks: [] };
  });
}

function pt(...paragraphs) {
  return paragraphs.filter(Boolean).map((text) => ({
    _type: "block", _key: shortKey(),
    style: "normal", markDefs: [], children: spans(text),
  }));
}

function ptBullets(...items) {
  return items.map((text) => ({
    _type: "block", _key: shortKey(),
    style: "normal", listItem: "bullet", level: 1,
    markDefs: [], children: spans(text),
  }));
}

function block(type, fields) {
  return { _type: type, _key: shortKey(), ...fields };
}

function matrixRow(offense, cells, tier = "normal", detail) {
  return {
    _type: "penaltyMatrixRow",
    _key:  shortKey(),
    offense,
    ...(detail ? { detail } : {}),
    cells,
    tier,
  };
}

// ── Page body ───────────────────────────────────────────────────────────────

async function main() {
  console.log(`Seeding discipline-page → project ${PROJECT_ID} / dataset ${DATASET}`);

  const hero = block("heroBlock", {
    eyebrow:      "LEAGUE STANDARDS",
    heading:      "Discipline & Conduct",
    subheading:   "Referee Abuse Prevention · Penalties Matrix · Discipline Matrix",
    ctaLabel:     "",
    ctaHref:      "",
    ctaNewWindow: false,
  });

  const policyBanner = block("alertBarBlock", {
    tone:  "info",
    label: "Official U.S. Soccer Policy",
    text:  "Policy 531-9 — Misconduct Toward Game Officials in Amateur Matches. Effective March 2025 · Adopted by the U.S. Soccer Board of Directors on November 22, 2024.",
  });

  const section1 = block("contentSectionBlock", {
    eyebrow: "Policy 531-9 · Section 1",
    heading: "General",
    columns: 1,
    lead: pt(
      "Misconduct against Referees may occur before, during, and/or after the match, specifically when the Referee arrives at and/or departs the venue. Misconduct may also occur at later times when directly related to duties of a match affiliated with U.S. Soccer or its Organizational Members.",
    ),
  });

  const section2 = block("contentSectionBlock", {
    eyebrow: "Policy 531-9 · Section 2",
    heading: "Rule Application",
    columns: 1,
    lead: pt("Where the policy applies — and where existing rules still stand."),
    paragraphs: ptBullets(
      "This policy supersedes any inconsistent rules of Member Organizations that pertain to assault, abuse, or gross mistreatment of Federation Game Officials, and the manner and means of hearings, appeals, and rehearings in matters pertaining thereto. It does not supersede any codes of conduct, which may be enforced in addition to this policy.",
      "Nothing in this policy restricts or limits any league, event/tournament, or Member Organization from applying equal or greater restrictions to anyone not listed in section 4(a)(1) of the policy (i.e., a spectator associated with a club or team).",
      "This policy does not apply to players, coaches, managers, club officials, or league officials while participating in Professional League Member activities — U.S. Soccer Policy 202-2 covers participants in professional matches.",
    ),
  });

  const section3 = block("contentSectionBlock", {
    eyebrow: "Policy 531-9 · Section 3",
    heading: "Terms & References",
    columns: 1,
    lead: pt("As used in this policy:"),
    paragraphs: ptBullets(
      "[[b]]“Referee”[[/b]] includes all currently registered USSF Referees, assistant Referees, fourth officials, match officials, or others duly appointed to assist in officiating in a sanctioned match or similar USSF-affiliated activity (e.g., scrimmage); any non-licensed, non-registered person serving in an emergency capacity as a Referee under USSF policies; and any person serving in a Referee support function, such as Referee mentors, coaches, and other support staff at the venue.",
      "[[b]]“Hearing”[[/b]] means a meeting of at least three neutral members, one of whom is designated or elected to serve as chairperson, comprised and conducted pursuant to guidelines established by the Federation and followed by the Member Organization.",
      "[[b]]Protected period[[/b]] — a Referee is protected by U.S. Soccer policy from the time they arrive at the venue (including the parking area) until their departure. A “Protected Party” is a member of the Referee's family or household, or a guest of the Referee at the match or venue. All U.S. Soccer policies are in addition to local, state, and Federal laws.",
      "[[b]]Referee assault[[/b]] is any deliberate physical action against a Referee. [[b]]Referee abuse[[/b]] is extreme, deliberate, and non-contact behavior that causes a Referee or Protected Party significant harm. Actions in this category may be subject to an immediate suspension, meaning the perpetrator cannot appear at the next sanctioned match.",
    ),
  });

  const penaltiesIntro =
    "The Penalties Matrix defines consequences associated with physical and non-physical offenses against Referees.";

  const nonPhysical = block("penaltyMatrixBlock", {
    title:         "Non-Physical Offenses",
    eyebrow:       "Penalties Matrix",
    intro:         pt(penaltiesIntro, "Non-physical offenses of gross misconduct, abuse, and/or assault:"),
    offenseHeader: "Non-Physical*",
    columns:       ["Min. Games", "Time"],
    rows: [
      matrixRow("Insulting, Belittling, Insinuating or Taunting Behavior Undermining Referee Authority", ["2", ""], "warning"),
      matrixRow("Harassment, Intimidation, Retaliation, Abusive, or Threatening (Non-Physical) Language", ["4", ""], "high"),
      matrixRow("Aggression, Attacking, Derogatory, Cyberbullying, Doxing or Threatening (Physical / Violence) Language", ["6", "6–24 Months"], "severe"),
      matrixRow("Offensive or Discriminatory Act", ["10", "12–24 Months"], "critical"),
    ],
    footnote: pt(
      "(*) Disclaimer: These are only a few examples of abuse — other actions or statements may also fall into this category.",
    ),
  });

  const physical = block("penaltyMatrixBlock", {
    title:         "Physical Offenses",
    eyebrow:       "Penalties Matrix",
    intro:         pt("Physical offenses of gross misconduct, abuse, and/or assault:"),
    offenseHeader: "Physical*",
    columns:       ["Min. Games", "Time"],
    rows: [
      matrixRow("Minor or Slight Deliberate Touching", ["3", "1–6 Months"], "warning"),
      matrixRow("Pushing, Grabbing, Pulling, Squeezing, Pinching, Lightly Slapping, Use of Object in Non-Striking Manner, or Physical Property Damage", ["10", "6–24 Months"], "high"),
      matrixRow("Hitting, Punching, Elbowing, Kicking, Biting, Spitting, Choking, Tackling, Throwing or Use of Object or Any Part of Body (Forearm, Knee, Head) in a Striking Manner", ["", "12 Months – Lifetime"], "severe"),
    ],
    footnote: pt(
      "(*) Disclaimer: These are only a few examples of abuse — other actions or statements may also fall into this category.",
    ),
  });

  const keyFactors = block("contentSectionBlock", {
    eyebrow: "Penalties Matrix",
    heading: "Key Penalty Factors",
    columns: 1,
    lead: pt("How penalties are applied, stacked, and escalated."),
    paragraphs: [
      ...ptBullets(
        "Single offenses are at minimum the [[b]]prescribed game penalty or time penalty[[/b]] for non red-zone offenses.",
        "Penalties can be [[b]]both game and time[[/b]] depending on severity and circumstances.",
        "Second-time offenders receive [[b]]double punishment[[/b]].",
        "Third-time offenders receive a [[b]]lifetime ban[[/b]].",
        "More than one offense at the same time is [[b]]at least the punishment for the most serious offense[[/b]].",
        "Offenses against minors are automatically subject to a [[b]]“minor multiplier”[[/b]] resulting in triple punishment.",
        "[[b]]One offense warning per league[[/b]], to be managed by states and leagues collaboratively.",
        "Game consequences are [[b]]inclusive of 1 game penalty for any red cards given[[/b]].",
        "Optionality for [[b]]50% penalty for first offense from a minor[[/b]].",
      ),
      ...pt("Please follow your current reporting structure — an updated reporting procedure will be part of Phase 3."),
    ],
  });

  const disciplineMatrix = block("penaltyMatrixBlock", {
    title:         "Discipline Matrix",
    eyebrow:       "US Club Soccer",
    intro:         pt(
      "Minimum consequences by offense and role. All referee assault and abuse must be sent to US Club Soccer — see Policy 531-9 above for misconduct toward game officials.",
    ),
    offenseHeader: "Offense",
    columns:       ["Player Minimum", "Coach Minimum", "Spectator Minimum"],
    rows: [
      matrixRow(
        "Physical Assault (Major)",
        [
          "3 games\nActs committed outside of game play are subject to a minimum suspension of 5 games.\nHandled at league level unless serious injury occurs.\nUS Club Soccer to be notified of suspensions for physical assault.",
          "3 months\nReport to US Club Soccer.\nSuspended from all soccer activities pending US Club Soccer hearing.",
          "1 year\nEnforced by club and league.",
        ],
        "normal",
        "Any intentional or attempted act or threat of physical violence, including but not limited to: hitting, kicking, punching, choking, spitting on, grabbing or bodily running into a person; head butting; kicking or throwing any object that could inflict injury; damaging personal property (car, equipment, etc.); putting hands on a referee, player, coach, or spectator. Spectators: all of the above, in addition to entering the field of play during/after a match.",
      ),
      matrixRow(
        "Physical Assault (Minor)",
        [
          "1 game\nActs committed outside of game play are subject to a minimum suspension of 2 games.",
          "6 games (first infraction)\nReport to US Club Soccer.\nSuspended from all soccer activities pending US Club Soccer hearing.",
          "1 year\nEnforced by club and league.",
        ],
        "normal",
        "Includes but is not limited to pushing, physical intimidation (i.e. nose to nose), instigating mass confrontation, spewing any beverage on personal property, spitting at (but not on) another player, coach, referee, or spectator.",
      ),
      matrixRow(
        "Verbal Abuse (Major)",
        ["2 games", "6 games", "6 games\nEnforced by club and league."],
        "normal",
        "Using foul, abusive, profane, derogatory, or insulting language including but not limited to language based on age, religion, marital status, sex, ancestry, national origin, citizenship, veteran's status, pregnancy, disability, or sexual orientation.",
      ),
      matrixRow(
        "Verbal Abuse (Minor)",
        ["1 game", "2 games", "6 games\nEnforced by club and league."],
        "normal",
        "Using foul, abusive, profane, derogatory, or insulting language towards opposition (player, coach, spectator). See Policy 531-9 for misconduct towards game officials.",
      ),
      matrixRow(
        "Verbal Dissent",
        ["1 game", "2 games", "1 game\nEnforced by club and league."],
        "normal",
        "Excessive arguing with opposition (player, coach, spectator).",
      ),
      matrixRow(
        "Racial Abuse",
        [
          "3 months\nReport to US Club Soccer.\nSuspended from all soccer activities pending US Club Soccer hearing.",
          "6 months\nReport to US Club Soccer.\nSuspended from all soccer activities pending US Club Soccer hearing.",
          "6 months\nEnforced by club and league.",
        ],
        "critical",
        "Abusive and/or bigoted language or physical gestures based on race.",
      ),
    ],
  });

  const closingBar = block("alertBarBlock", {
    tone:          "warning",
    label:         "Respect the Call",
    text:          "CPSL has zero tolerance for referee abuse. All referee assault and abuse must be reported to US Club Soccer.",
    linkLabel:     "ussoccer.com/rap",
    linkHref:      "https://www.ussoccer.com/rap",
    linkNewWindow: true,
  });

  const doc = {
    _id:   "discipline-page",
    _type: "page",
    title: "Discipline",
    slug:  { _type: "slug", current: "discipline" },
    seoDescription:
      "CPSL discipline and conduct standards: U.S. Soccer Policy 531-9 referee abuse prevention, the penalties matrix for offenses against referees, and the US Club Soccer discipline matrix.",
    sections: [
      hero,
      policyBanner,
      section1,
      section2,
      section3,
      nonPhysical,
      physical,
      keyFactors,
      disciplineMatrix,
      closingBar,
    ],
  };

  await client.createOrReplace(doc);
  console.log("✓ discipline-page seeded → /discipline (unlinked from nav).");
}

main().catch((err) => { console.error(err); process.exit(1); });

#!/usr/bin/env node
/**
 * Seed the "CPSL Inclement Weather Plan" page in Sanity from the printed
 * policy PDF. Idempotent: uses createOrReplace against a fixed document
 * `_id` so re-running with content edits produces the same URL.
 *
 * Optional: uploads a hero image if HERO_IMAGE (path) is provided or the
 * default fallback exists on disk. Otherwise the hero renders on plain
 * navy — Sanity editors can drop an image in later via Studio.
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=sk... node apps/website/scripts/seed-inclement-weather.mjs
 *   SANITY_API_WRITE_TOKEN=sk... HERO_IMAGE=~/Desktop/weather-hero.jpg node …/seed-inclement-weather.mjs
 */

import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";
import { createClient } from "@sanity/client";

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

if (!PROJECT_ID) { console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID."); process.exit(1); }
if (!TOKEN)      {
  console.error(
    "Missing SANITY_API_WRITE_TOKEN.\n" +
    "Create an Editor token at https://www.sanity.io/manage → API → Tokens, then:\n" +
    "  SANITY_API_WRITE_TOKEN=sk... node apps/website/scripts/seed-inclement-weather.mjs"
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

// ── Portable-text helpers ───────────────────────────────────────────────────

const shortKey = () => randomUUID().replace(/-/g, "").slice(0, 12);

/** Turn a plain sentence into one Portable Text block. Supports **bold** via
 *  markdown-lite: wrap portions in [[b]]…[[/b]] for bold spans. Simple enough
 *  for a one-shot seed. */
function pt(...paragraphs) {
  return paragraphs.filter(Boolean).map((text) => {
    const parts = String(text).split(/(\[\[b\]\][\s\S]*?\[\[\/b\]\])/g);
    const children = [];
    const markDefs = [];
    for (const part of parts) {
      if (!part) continue;
      const m = part.match(/^\[\[b\]\]([\s\S]*)\[\[\/b\]\]$/);
      if (m) {
        children.push({
          _type: "span", _key: shortKey(),
          text: m[1], marks: ["strong"],
        });
      } else {
        children.push({
          _type: "span", _key: shortKey(),
          text: part, marks: [],
        });
      }
    }
    return {
      _type: "block", _key: shortKey(),
      style: "normal", markDefs, children,
    };
  });
}

/** Bullet list — one block per item. */
function ptBullets(...items) {
  return items.map((text) => {
    const parts = String(text).split(/(\[\[b\]\][\s\S]*?\[\[\/b\]\])/g);
    const children = parts.filter(Boolean).map((part) => {
      const m = part.match(/^\[\[b\]\]([\s\S]*)\[\[\/b\]\]$/);
      return m
        ? { _type: "span", _key: shortKey(), text: m[1], marks: ["strong"] }
        : { _type: "span", _key: shortKey(), text: part, marks: [] };
    });
    return {
      _type:     "block", _key: shortKey(),
      style:     "normal",
      listItem:  "bullet",
      level:     1,
      markDefs:  [],
      children,
    };
  });
}

function block(type, fields) {
  return { _type: type, _key: shortKey(), ...fields };
}

function row(range, guideline, tier = "normal") {
  return {
    _type: "weatherGuidelineRow",
    _key:  shortKey(),
    range,
    guideline: pt(guideline),
    tier,
  };
}

// ── Optional hero image upload ──────────────────────────────────────────────

async function maybeUploadHero() {
  const candidates = [
    process.env.HERO_IMAGE,
    `${process.env.HOME}/Desktop/CPSL_weather_hero.jpg`,
    `${process.env.HOME}/Desktop/CPSL_weather_hero.png`,
    `${process.env.HOME}/Desktop/weather-hero.jpg`,
  ].filter(Boolean).map((p) => p.replace(/^~\//, `${process.env.HOME}/`));

  const path = candidates.find((p) => existsSync(p));
  if (!path) {
    console.log("  ℹ No hero image on disk — hero will render on plain navy. Drop one via Studio later.");
    return undefined;
  }
  console.log(`  ↑ Uploading hero image: ${path}`);
  const asset = await client.assets.upload("image", readFileSync(path), {
    filename: path.split("/").pop(),
  });
  return asset._id;
}

// ── Page body ──────────────────────────────────────────────────────────────

async function main() {
  console.log(`Seeding inclement-weather-page → project ${PROJECT_ID} / dataset ${DATASET}`);

  const heroAssetRef = await maybeUploadHero();

  const heroSection = block("heroBlock", {
    eyebrow:    "SAFETY",
    heading:    "CPSL Inclement Weather Plan",
    subheading: "Hot Weather · Cold Weather · Thunder & Lightning",
    ctaLabel:   "",
    ctaHref:    "",
    ctaNewWindow: false,
    ...(heroAssetRef
      ? {
          backgroundImage: {
            _type: "image",
            asset: { _type: "reference", _ref: heroAssetRef },
          },
          backgroundOpacity: 0.55,
        }
      : {}),
  });

  const intro = block("contentSectionBlock", {
    eyebrow: "Player Safety First",
    heading: "Everyone's responsibility",
    lead: pt(
      "The safety of players, referees, coaches, team staff and spectators is the highest priority of the Carolina Premier Soccer League (CPSL). All CPSL clubs, teams and match officials are expected to use good judgment and follow these guidelines whenever extreme or potentially dangerous weather conditions exist.",
    ),
  });

  const hotWeather = block("weatherGuidelinesBlock", {
    title:   "Hot Weather Guidelines",
    eyebrow: "Heat Index / Feels Like temperature",
    intro:   pt(
      "CPSL recommends monitoring the [[b]]Wet Bulb Globe Temperature (WBGT)[[/b]] whenever possible. When a WBGT reading is not available, the [[b]]Heat Index / \"Feels Like\"[[/b]] temperature should be used as a practical guide.",
    ),
    rangeHeader:     "Heat Index / Feels Like",
    guidelineHeader: "CPSL Guideline",
    rows: [
      row("Below 90°F",  "Normal play. Water should be readily available.",                                                                                                              "normal"),
      row("90–94°F",     "Increased hydration encouraged. Referee may authorize additional water breaks.",                                                                              "caution"),
      row("95–99°F",     "[[b]]Mandatory hydration breaks[[/b]] approximately halfway through each half.",                                                                              "emphasis"),
      row("100–104°F",   "Mandatory hydration breaks. Consider shortening halves, increasing recovery time and delaying kickoff when appropriate.",                                     "warning"),
      row("105°F+",      "[[b]]CPSL recommends delaying or suspending play[[/b]] until conditions improve. League/venue officials may cancel matches when conditions remain unsafe.",  "stop"),
    ],
    footnote: [
      ...pt("[[b]]Hydration Breaks[[/b]]"),
      ...ptBullets(
        "Breaks should generally occur approximately halfway through each half.",
        "The referee should allow approximately [[b]]3–4 minutes[[/b]] for players to hydrate.",
        "Players should be permitted to leave the field for water. Water should be readily available to both teams.",
        "Additional breaks may be authorized when conditions warrant.",
      ),
      ...pt(
        "[[b]]Signs of heat illness:[[/b]] dizziness, headache, nausea or vomiting, unusual fatigue or weakness, muscle cramping, confusion, loss of coordination or collapse. Any player displaying significant symptoms should be immediately removed from play and evaluated. [[b]]Suspected heat stroke is a medical emergency — call 911 and begin rapid cooling immediately.[[/b]]",
      ),
    ],
  });

  const coldWeather = block("weatherGuidelinesBlock", {
    title:   "Cold Weather Guidelines",
    eyebrow: "Wind Chill / Feels Like temperature",
    intro:   pt(
      "CPSL will consider both the actual air temperature and [[b]]wind chill / \"feels like\"[[/b]] temperature when determining whether conditions are appropriate for play.",
    ),
    rangeHeader:     "Wind Chill / Feels Like",
    guidelineHeader: "CPSL Guideline",
    rows: [
      row("Above 32°F", "Normal play with appropriate cold-weather clothing.",                                                             "normal"),
      row("25–32°F",    "Use caution. Players should wear appropriate layers and remain dry.",                                             "caution"),
      row("20–24°F",    "Increased caution. Consider additional warming opportunities and reduced exposure.",                              "emphasis"),
      row("15–19°F",    "[[b]]Strong consideration should be given to postponing or canceling the match.[[/b]]",                          "warning"),
      row("Below 15°F", "[[b]]CPSL matches should not be played.[[/b]]",                                                                   "stop"),
    ],
    footnote: [
      ...pt(
        "Wet conditions, strong winds, snow or freezing precipitation may require matches to be postponed even when temperatures are above these thresholds.",
      ),
      ...pt(
        "[[b]]Player protection:[[/b]] Safe cold-weather clothing consistent with the Laws of the Game may include gloves, hats/headbands, long-sleeve base layers, leggings/compression clothing and additional appropriate layers. Wet clothing should be replaced whenever possible.",
      ),
      ...pt(
        "[[b]]Signs of cold-related illness:[[/b]] excessive or uncontrollable shivering, numbness, pale or bluish skin, confusion, slurred speech, unusual fatigue/drowsiness or loss of coordination. Anyone suspected of hypothermia or frostbite should immediately be removed from the cold and receive appropriate medical attention.",
      ),
    ],
  });

  const thunderAlert = block("alertBarBlock", {
    tone:          "warning",
    label:         "Thunder & Lightning",
    text:          "When thunder roars — go indoors. Play is suspended the moment thunder is heard or lightning is observed.",
    linkLabel:     "",
    linkHref:      "",
    linkNewWindow: false,
  });

  const thunderBody = block("contentSectionBlock", {
    eyebrow: "Thunder & Lightning Policy",
    heading: "Safe shelter and the 30-minute rule",
    lead: pt(
      "If thunder is heard or lightning is observed, play must be suspended immediately. There is no requirement to see lightning before suspending play — hearing thunder is sufficient reason to clear the field. The referee will suspend the match and all players, coaches, referees and spectators should immediately seek appropriate shelter.",
      "[[b]]Preferred shelter:[[/b]] a substantial, fully enclosed building; or a fully enclosed vehicle with a solid metal roof and windows closed.",
      "[[b]]Not safe shelter:[[/b]] team tents or canopies, dugouts, covered benches, pavilions or picnic shelters, trees, open-sided buildings, or remaining on/near the playing field.",
      "[[b]]30-minute rule.[[/b]] Play may not resume until 30 minutes have passed since the [[b]]last[[/b]] sound of thunder or [[b]]last[[/b]] observed lightning. Every additional occurrence of thunder or lightning restarts the 30-minute clock.",
      "[[b]]Example.[[/b]] Thunder heard at 4:10 PM → earliest restart 4:40 PM. Additional thunder at 4:25 PM → clock resets → earliest restart 4:55 PM.",
      "[[b]]Responsibility.[[/b]] The referee has authority over the match once the game is under their jurisdiction. Facility management, tournament staff or CPSL officials may also suspend or close fields because of dangerous weather. No coach, team official or parent may pressure a referee to continue or restart a match when the referee believes conditions are unsafe.",
    ),
  });

  const severeWeather = block("contentSectionBlock", {
    eyebrow: "Severe Weather",
    heading: "Tornado warnings, hail and flash flooding",
    lead: pt(
      "Matches should also be suspended when other severe weather presents an immediate safety risk, including tornado warnings, severe thunderstorm warnings, high winds, hail, flash flooding or dangerous field conditions. When a [[b]]Tornado Warning[[/b]] is issued for the immediate area, everyone should immediately seek appropriate shelter.",
    ),
  });

  const delays = block("contentSectionBlock", {
    eyebrow: "Match Delays & Abandoned Matches",
    heading: "Resuming — or reporting — a suspended match",
    lead: pt(
      "When weather causes a match to be suspended, the referee and home club should make reasonable efforts to allow conditions to improve. Consider remaining daylight, field availability, facility closing times, subsequent scheduled matches, travel considerations, continuing weather threats and overall participant safety.",
      "If conditions do not allow the match to safely resume, the referee may abandon the match. The match should be reported to CPSL, and the [[b]]League will determine whether the match is considered complete, resumed at a later date or replayed[[/b]] in accordance with CPSL competition rules.",
    ),
  });

  const authority = block("contentSectionBlock", {
    eyebrow: "Authority & Safety",
    heading: "No match is worth an unsafe decision",
    lead: pt(
      "[[b]]No CPSL match is important enough to compromise participant safety.[[/b]] When weather conditions are questionable, CPSL expects referees, clubs and team officials to make conservative decisions with player safety as the priority. Local government, facility or emergency-management restrictions always take precedence over CPSL match scheduling.",
    ),
  });

  const summary = block("alertBarBlock", {
    tone:  "warning",
    label: "CPSL — Player Safety First",
    text:  "HEAT: hydrate · monitor conditions · provide breaks   |   COLD: layer · stay dry · monitor wind chill   |   LIGHTNING: hear thunder → clear the field → wait 30 minutes",
    linkLabel:     "",
    linkHref:      "",
    linkNewWindow: false,
  });

  // Look up the League Information page id so we can nest under it.
  const leagueInfoId = await client.fetch(
    `*[_type == "page" && slug.current == "league-information"][0]._id`
  );

  const doc = {
    _id:      "inclement-weather-page",
    _type:    "page",
    title:    "Inclement Weather Plan",
    slug:     { _type: "slug", current: "inclement-weather" },
    ...(leagueInfoId
      ? { parent: { _type: "reference", _ref: leagueInfoId } }
      : {}),
    sections: [
      heroSection,
      intro,
      hotWeather,
      coldWeather,
      thunderAlert,
      thunderBody,
      severeWeather,
      delays,
      authority,
      summary,
    ],
  };

  await client.createOrReplace(doc);

  console.log("\n✓ Page seeded.");
  console.log(`  → Studio: https://cpsl-website.vercel.app/studio/structure/page;${doc._id}`);
  console.log(`  → Live:   https://cpsl-website.vercel.app/league-information/inclement-weather`);
}

main().catch((err) => { console.error(err); process.exit(1); });

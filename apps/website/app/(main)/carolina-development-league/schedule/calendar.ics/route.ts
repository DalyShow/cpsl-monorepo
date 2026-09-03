import type { NextRequest } from "next/server";
import {
  CDL_MATCHES,
  CDL_META,
  CDL_CLUBS_BY_ID,
  CDL_AGE_GROUPS,
  filterCdlMatches,
} from "@/lib/cdlSchedule";

/**
 * iCalendar feed for the CDL schedule, scoped by ?club=&age=&gender=.
 * Serves both one-shot downloads (?download=1) and live webcal
 * subscriptions — Apple/Google/Outlook re-fetch this URL on their own
 * cadence, so committed schedule updates propagate to subscribers.
 *
 * Kickoffs are stored as timezone-naive local ISO strings, which map
 * 1:1 onto DTSTART;TZID=America/New_York with zero timezone math. The
 * VTIMEZONE block is required for classic Outlook, and matters: the
 * season crosses the Nov 1 DST boundary.
 */

const TZID = "America/New_York";

const VTIMEZONE = [
  "BEGIN:VTIMEZONE",
  `TZID:${TZID}`,
  "BEGIN:DAYLIGHT",
  "TZOFFSETFROM:-0500",
  "TZOFFSETTO:-0400",
  "TZNAME:EDT",
  "DTSTART:19700308T020000",
  "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU",
  "END:DAYLIGHT",
  "BEGIN:STANDARD",
  "TZOFFSETFROM:-0400",
  "TZOFFSETTO:-0500",
  "TZNAME:EST",
  "DTSTART:19701101T020000",
  "RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU",
  "END:STANDARD",
  "END:VTIMEZONE",
];

/** "2026-08-29T09:00:00" → "20260829T090000" (no timezone conversion). */
function icsLocal(iso: string): string {
  return iso.replace(/[-:]/g, "").slice(0, 15);
}

/** Wall-clock addition on a naive local timestamp — round-trips through
 *  Date components only, so the server's own timezone never leaks in. */
function addMinutes(iso: string, minutes: number): string {
  const [date, time] = iso.split("T");
  const [y, mo, d] = date.split("-").map(Number);
  const [h, mi] = time.split(":").map(Number);
  const dt = new Date(y, mo - 1, d, h, mi + minutes);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${dt.getFullYear()}-${p(dt.getMonth() + 1)}-${p(dt.getDate())}T${p(dt.getHours())}:${p(dt.getMinutes())}:00`;
}

/** RFC 5545 TEXT escaping — addresses contain commas, so not optional. */
function esc(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

/** Fold content lines at 74 chars (RFC 5545 §3.1: CRLF + single space). */
function fold(line: string): string {
  if (line.length <= 74) return line;
  const parts: string[] = [];
  let rest = line;
  parts.push(rest.slice(0, 74));
  rest = rest.slice(74);
  while (rest.length > 73) {
    parts.push(" " + rest.slice(0, 73));
    rest = rest.slice(73);
  }
  if (rest) parts.push(" " + rest);
  return parts.join("\r\n");
}

/** Play time + halftime, by age group. */
function durationMinutes(ageGroup: string): number {
  return ageGroup === "U9" || ageGroup === "U10" ? 60 : 75;
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const clubId   = params.get("club");
  const ageRaw   = params.get("age");
  const gender   = params.get("gender") === "M" ? "M" : params.get("gender") === "G" ? "G" : null;
  const download = params.get("download") === "1";

  // Unknown values degrade to "no filter" — a valid calendar always
  // comes back with 200; a 4xx would make clients mark the feed dead.
  const ageGroup = ageRaw && (CDL_AGE_GROUPS as string[]).includes(ageRaw) ? ageRaw : null;
  const club     = clubId && CDL_CLUBS_BY_ID.has(clubId) ? clubId : null;

  const matches = filterCdlMatches(CDL_MATCHES, { clubId: club, ageGroup, gender });

  const clubName   = club ? CDL_CLUBS_BY_ID.get(club)!.shortName || CDL_CLUBS_BY_ID.get(club)!.name : "All Clubs";
  const genderName = gender === "M" ? "Boys" : gender === "G" ? "Girls" : null;
  const calName    = ["CDL Fall 2026", clubName, ageGroup, genderName].filter(Boolean).join(" · ");

  // Stable DTSTAMP from the dataset build — byte-stable output caches well.
  const stamp = (() => {
    const d = new Date(CDL_META.generatedAt);
    return Number.isNaN(d.getTime())
      ? "20260801T000000Z"
      : d.toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";
  })();

  const origin  = request.nextUrl.origin;
  const backParams = new URLSearchParams({ view: "season" });
  if (club) backParams.set("club", club);
  if (ageGroup) backParams.set("age", ageGroup);
  if (gender) backParams.set("show", gender === "M" ? "boys" : "girls");
  const backUrl = `${origin}/carolina-development-league/schedule?${backParams.toString()}`;

  const disclaimer =
    "The CDL schedule is managed by the leaders of CDL participant clubs. Always verify game dates and times with your CDL club director, as games and times are subject to change.";

  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Carolina Premier Soccer League//CDL Schedule//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${esc(calName)}`,
    `X-WR-TIMEZONE:${TZID}`,
    "REFRESH-INTERVAL;VALUE=DURATION:PT12H",
    "X-PUBLISHED-TTL:PT12H",
    ...VTIMEZONE,
  ];

  for (const m of matches) {
    const homeLabel = m.homeTeamLabel || CDL_CLUBS_BY_ID.get(m.homeClubId)?.shortName || m.homeClubId;
    const awayLabel = m.awayTeamLabel || CDL_CLUBS_BY_ID.get(m.awayClubId)?.shortName || m.awayClubId;
    const location  = m.locationAddress ? `${m.field}, ${m.locationAddress}` : m.field;
    lines.push(
      "BEGIN:VEVENT",
      `UID:${m.id}@carolinapremiersoccerleague.com`,
      `DTSTAMP:${stamp}`,
      `DTSTART;TZID=${TZID}:${icsLocal(m.kickoff)}`,
      `DTEND;TZID=${TZID}:${icsLocal(addMinutes(m.kickoff, durationMinutes(m.ageGroup)))}`,
      `SUMMARY:${esc(`${homeLabel} vs ${awayLabel}`)}`,
      `LOCATION:${esc(location)}`,
      `DESCRIPTION:${esc(`${disclaimer}\nFull schedule: ${backUrl}${m.notes ? `\nNote: ${m.notes}` : ""}`)}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
    );
  }

  lines.push("END:VCALENDAR");

  const body = lines.map(fold).join("\r\n") + "\r\n";

  const filenameBits = ["cdl-fall-2026", club, ageGroup, genderName?.toLowerCase()]
    .filter(Boolean)
    .join("-");

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type":  "text/calendar; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "X-Robots-Tag":  "noindex",
      ...(download
        ? { "Content-Disposition": `attachment; filename="${filenameBits}.ics"` }
        : {}),
    },
  });
}

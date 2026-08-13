#!/usr/bin/env python3
"""
Ingest the CDL Fall 2026 schedule from an Excel file into normalised JSON.

Reads:
  ~/Desktop/CDL - Schedules and Contact Sheet Fall 2026.xlsx  (default)
  OR the path passed as arg 1

Writes:
  apps/website/data/cdl-fall-2026.json
      { generatedAt, source, clubs[], matches[] }
  apps/website/data/cdl-fall-2026.warnings.json
      { row: {…}, warnings: [...] }

Design notes:
  - Reads the "Fall Schedule" sheet only. "DivisionName" = age group (per the
    club president). We split the age from any trailing M/A/B suffix.
  - Every team string is matched against a canonical CDL_CLUBS list of
    { name, aliases[] }. First match wins. If none match, we drop into
    a fallback ("Unknown Club") and log a warning.
  - Time cells arrive as either datetime.time (72% of rows) or strings
    like "10.30 AM" / "9.00 am" — parse_time handles both.
  - Kickoff is emitted as a naive ISO string (YYYY-MM-DDTHH:MM:SS) with no
    timezone offset. The site renders in local time, so this is safe.
"""

from __future__ import annotations

import datetime as dt
import json
import os
import re
import sys
from pathlib import Path

import openpyxl

# ─── Paths ──────────────────────────────────────────────────────────────────

REPO_ROOT = Path(__file__).resolve().parents[3]        # cpsl-monorepo/
APP_DIR   = REPO_ROOT / "apps" / "website"
DATA_DIR  = APP_DIR / "data"
DATA_DIR.mkdir(parents=True, exist_ok=True)

DEFAULT_SOURCE = Path.home() / "Desktop" / "CDL - Schedules and Contact Sheet Fall 2026.xlsx"
SOURCE = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_SOURCE
if not SOURCE.exists():
    sys.exit(f"Source not found: {SOURCE}")

OUT_MATCHES  = DATA_DIR / "cdl-fall-2026.json"
OUT_WARNINGS = DATA_DIR / "cdl-fall-2026.warnings.json"

# ─── Canonical clubs ───────────────────────────────────────────────────────
# `aliases` are case-insensitive substrings that identify the club within a
# team-name string. The longest, most specific alias should come first — the
# matcher scores by longest hit so "NC Fusion" beats "NC" beats "".

CDL_CLUBS = [
    {
        "id":       "csa",
        "name":     "CSA",
        "short":    "CSA",
        "aliases":  ["charlotte soccer academy", "csa clt", "csa nh", "csa north", "csa charlotte", "csa"],
        # "csa" alone is too greedy — matches "loco-acsandhills.png" as a
        # substring. Anchor on filename structure so we only hit real CSA crests.
        "sanityNameHints": ["charlotte soccer academy", "logo-csa", "-csa.", "/csa"],
        # Tokens safe to strip from the team string when deriving the team
        # label — must identify the CLUB and nothing else (no location or
        # colour suffixes like "ncf ws" or "wake fc north").
        "label_strip":     ["charlotte soccer academy", "csa"],
    },
    {
        "id":       "cisc",
        "name":     "CISC",
        "short":    "CISC",
        "aliases":  ["cisc north", "cisc south", "cisc east", "cisc", "pre mls", "independence"],
        "sanityNameHints": ["independence", "cisc", "charlotte independence"],
        "label_strip":     ["charlotte independence", "cisc"],
    },
    {
        "id":       "nc-fusion",
        "name":     "NC Fusion",
        "short":    "NCF",
        "aliases":  ["north carolina fusion", "nc fusion", "ncf pre", "ncf ws", "ncf gso", "ws red", "gso red", "nc fus", "fusion", " ncf "],
        "sanityNameHints": ["fusion", "nc fusion", "north carolina fusion", "ncf"],
        "label_strip":     ["north carolina fusion", "nc fusion", "fusion", "ncf"],
    },
    {
        "id":       "nc-fc-youth",
        "name":     "NC FC Youth",
        "short":    "NCFC",
        "aliases":  ["north carolina fc youth", "ncfc north", "ncfc south", "ncfc", "nc fc"],
        "sanityNameHints": ["ncfc", "north carolina fc", "nc fc"],
        "label_strip":     ["north carolina fc youth", "nc fc youth", "ncfc", "nc fc"],
    },
    {
        "id":       "wilmington-hammerheads",
        "name":     "Wilmington Hammerheads Youth",
        "short":    "WHYFC",
        "aliases":  ["wilmington hammerheads youth", "wilmington hammerheads", "hammerheads", "whyfc"],
        "sanityNameHints": ["hammerheads", "wilmington", "whyfc"],
        "label_strip":     ["wilmington hammerheads youth", "wilmington hammerheads", "hammerheads", "whyfc"],
    },
    {
        "id":       "highland-fc",
        "name":     "Highland FC",
        "short":    "HFC",
        "aliases":  ["highland fc", "highland", "hfc"],
        "sanityNameHints": ["highland", "hfc"],
        "label_strip":     ["highland fc", "highland", "hfc"],
    },
    {
        "id":       "sc-surf",
        "name":     "SC Surf",
        "short":    "SCS",
        "aliases":  ["sc surf", "surf"],
        "sanityNameHints": ["sc surf", "surf"],
        "label_strip":     ["sc surf"],
    },
    {
        "id":       "wake-fc",
        "name":     "Wake FC",
        "short":    "WFC",
        "aliases":  ["wake fc north", "wake fc south", "wake fc", "wake", "wfc pa", "wfc"],
        "sanityNameHints": ["wake", "wfc"],
        "label_strip":     ["wake fc", "wake", "wfc"],
    },
    {
        "id":       "carolina-core-fc",
        "name":     "Carolina Core FC",
        "short":    "CCFC",
        "aliases":  ["carolina core fc youth", "carolina core fc", "carolina core", "ccfc"],
        "sanityNameHints": ["carolina core", "ccfc", "core"],
        "label_strip":     ["carolina core fc youth", "carolina core fc", "carolina core", "ccfc"],
    },
]

# ─── Parsers ────────────────────────────────────────────────────────────────

WORD_RE = re.compile(r"\s+")

def normalise_ws(s: str) -> str:
    return WORD_RE.sub(" ", (s or "").strip())

# Age group: match U9/U10/…/U19 OR 9u/10u/… OR birth-year 2007–2018.
BIRTH_YEAR_TO_AGE_FALL_2026 = {
    2007: "U19", 2008: "U18", 2009: "U17", 2010: "U16",
    2011: "U15", 2012: "U14", 2013: "U13", 2014: "U12",
    2015: "U12", 2016: "U11", 2017: "U10", 2018: "U9",
}
AGE_RE = re.compile(r"(?:\bU\s?(\d{1,2})(?![\d])|\b(\d{1,2})\s?[uU](?![\w])|\b(20\d{2})\b)", re.I)

def parse_age(text: str) -> str | None:
    """Return "U11" / "U12" / etc. from any of: U11 · 11u · 2015. None if unclear."""
    if not text:
        return None
    m = AGE_RE.search(text)
    if not m:
        return None
    if m.group(1) or m.group(2):
        n = int(m.group(1) or m.group(2))
        return f"U{n}" if 8 <= n <= 19 else None
    if m.group(3):
        year = int(m.group(3))
        return BIRTH_YEAR_TO_AGE_FALL_2026.get(year)
    return None

# Tier: A / B suffix if present (in team label or division).
TIER_RE = re.compile(r"\b([AB])\s*(?:team)?\s*$", re.I)

def parse_tier(*texts: str) -> str | None:
    for t in texts:
        if not t:
            continue
        m = TIER_RE.search(t.strip())
        if m:
            return m.group(1).upper()
    return None

# Gender: default M (CDL is boys-only per the sheet's context).
def parse_gender(division: str | None) -> str:
    if division and re.search(r"\bG\b", division):
        return "G"
    return "M"

def parse_time_loose(v) -> tuple[int, int] | None:
    """Accept datetime.time OR strings like '10.30 AM' / '1.00 pm' / '13:30'."""
    if v is None or v == "":
        return None
    if isinstance(v, dt.time):
        return (v.hour, v.minute)
    if isinstance(v, dt.datetime):
        return (v.hour, v.minute)
    s = str(v).strip().lower()
    m = re.match(r"^\s*(\d{1,2})\s*[.:]\s*(\d{2})\s*(am|pm|a\.m\.|p\.m\.)?\s*$", s)
    if not m:
        # Bare hour: "9 AM"
        m2 = re.match(r"^\s*(\d{1,2})\s*(am|pm)\s*$", s)
        if not m2:
            return None
        hour = int(m2.group(1))
        minute = 0
        suffix = m2.group(2)
    else:
        hour   = int(m.group(1))
        minute = int(m.group(2))
        suffix = m.group(3)
    if suffix:
        suffix = suffix.replace(".", "")
        if suffix == "pm" and hour < 12:
            hour += 12
        elif suffix == "am" and hour == 12:
            hour = 0
    return (hour, minute)

def match_club(team_str: str) -> dict | None:
    """Return the canonical club dict matching this team string, or None."""
    if not team_str:
        return None
    s = normalise_ws(team_str).lower()
    best = None
    best_len = 0
    for club in CDL_CLUBS:
        for alias in club["aliases"]:
            if alias in s and len(alias) > best_len:
                best = club
                best_len = len(alias)
    return best

def derive_team_label(team_str: str, club: dict | None, age: str | None, tier: str | None) -> str:
    """Preserve the team-specific suffix (e.g. "CLT Man City 1", "South Red",
    "WS RED", "CDL 2"). Parents need this to find their child's actual team.

    Algorithm:
      1. Strip every age token from the raw string (U11 / 11u / 2015 / …).
      2. Strip the club's canonical label_strip tokens (longest first) so
         only the team-distinguishing suffix survives.
      3. Prepend the age, if known, so the label reads "U12 Man City 1".
    """
    s = normalise_ws(team_str)

    # 1. Age tokens anywhere in the string.
    s = re.sub(r"\b(U\s?\d{1,2}[Mm]?|\d{1,2}[uU]|20\d{2})\b", "", s, flags=re.I)

    # 2. Club tokens — longest-first so "carolina core fc youth" wins over "ccfc".
    if club:
        for token in sorted(club.get("label_strip", [club.get("short", "")]), key=len, reverse=True):
            if token:
                s = re.sub(r"\b" + re.escape(token) + r"\b", "", s, flags=re.I)

    # 3. Clean up leftover separators & whitespace.
    s = re.sub(r"[\s\-_/]+", " ", s).strip(" -–—.,")

    parts = []
    if age: parts.append(age)
    if s:   parts.append(s)
    if parts:
        return " ".join(parts)
    return tier or team_str.strip()

# ─── Placeholder crest (data-uri SVG per club, brand-tinted) ───────────────

CLUB_TINT = {
    "csa":                     ("#0B3D91", "#F2F2F2"),  # navy / white
    "cisc":                    ("#00589C", "#F2F2F2"),
    "nc-fusion":               ("#C8102E", "#F2F2F2"),
    "nc-fc-youth":             ("#B30838", "#F2F2F2"),
    "wilmington-hammerheads":  ("#003057", "#3EB1C8"),
    "highland-fc":             ("#5A5A5A", "#F2F2F2"),
    "sc-surf":                 ("#005A8B", "#F2F2F2"),
    "wake-fc":                 ("#003C71", "#F2F2F2"),
    "carolina-core-fc":        ("#0E6E4A", "#F2F2F2"),
    "unknown":                 ("#1E2D45", "#94A3B8"),
}

def placeholder_svg(club_id: str, short: str) -> str:
    bg, fg = CLUB_TINT.get(club_id, CLUB_TINT["unknown"])
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 88">'
        f'<circle cx="44" cy="44" r="42" fill="{bg}"/>'
        f'<text x="44" y="55" font-family="Barlow Condensed, Impact, sans-serif" '
        f'font-weight="900" font-size="30" fill="{fg}" text-anchor="middle" '
        f'letter-spacing="2">{short}</text></svg>'
    )
    import base64
    b64 = base64.b64encode(svg.encode()).decode()
    return f"data:image/svg+xml;base64,{b64}"

# ─── Main ──────────────────────────────────────────────────────────────────

def main() -> None:
    wb = openpyxl.load_workbook(SOURCE, data_only=True)
    ws = wb["Fall Schedule"]

    matches      = []
    warnings     = []
    used_clubs   = {}
    skipped      = 0

    for r in range(2, ws.max_row + 1):
        date_v, time_v, field_v, home_v, away_v, div_v = (
            ws.cell(row=r, column=c).value for c in range(1, 7)
        )
        if not date_v and not home_v and not away_v:
            continue  # blank row

        row_warnings: list[str] = []

        # Date
        if not isinstance(date_v, (dt.date, dt.datetime)):
            row_warnings.append(f"missing/invalid date: {date_v!r}")
            skipped += 1
            warnings.append({"row": r, "warnings": row_warnings})
            continue
        date_only = date_v.date() if isinstance(date_v, dt.datetime) else date_v

        # Time
        hm = parse_time_loose(time_v)
        if hm is None:
            row_warnings.append(f"couldn't parse time: {time_v!r}")
            hm = (0, 0)
        hour, minute = hm

        kickoff = dt.datetime(date_only.year, date_only.month, date_only.day, hour, minute).isoformat()

        # Age (division is really age group per the source)
        div_str = normalise_ws(str(div_v) if div_v is not None else "")
        age = parse_age(div_str)
        gender = parse_gender(div_str)
        tier_from_div = parse_tier(div_str)

        # Home / away
        def parse_side(raw):
            raw = normalise_ws(str(raw or ""))
            club = match_club(raw)
            side_age  = age or parse_age(raw)
            side_tier = tier_from_div or parse_tier(raw)
            label = derive_team_label(raw, club, side_age, side_tier)
            return raw, club, side_age, side_tier, label

        home_raw, home_club, home_age, home_tier, home_label = parse_side(home_v)
        away_raw, away_club, away_age, away_tier, away_label = parse_side(away_v)

        if not home_club:
            row_warnings.append(f"could not identify home club: {home_raw!r}")
        if not away_club:
            row_warnings.append(f"could not identify away club: {away_raw!r}")

        # Pick a final ageGroup — the row's division wins; else fall back to whichever side had one.
        final_age = age or home_age or away_age
        if not final_age:
            row_warnings.append(f"no age group parseable (division={div_str!r}, home={home_raw!r})")
            final_age = "U11"  # sensible default so the row still renders

        # Track club usage so we can emit the clubs[] array
        for c in (home_club, away_club):
            if c and c["id"] not in used_clubs:
                used_clubs[c["id"]] = c
        if not home_club:
            used_clubs.setdefault("unknown", {"id": "unknown", "name": "Unknown Club", "short": "?"})
        if not away_club:
            used_clubs.setdefault("unknown", {"id": "unknown", "name": "Unknown Club", "short": "?"})

        matches.append({
            "id":             f"cdl-fall-{r}",
            "kickoff":        kickoff,
            "homeClubId":     (home_club or {"id": "unknown"})["id"],
            "awayClubId":     (away_club or {"id": "unknown"})["id"],
            "homeTeamLabel":  home_label,
            "awayTeamLabel":  away_label,
            "field":          normalise_ws(str(field_v or "")),
            "ageGroup":       final_age,
            "gender":         gender,
            "notes":          None,
            "sourceRow":      r,
        })

        if row_warnings:
            warnings.append({
                "row": r, "date": str(date_only), "home": home_raw, "away": away_raw,
                "division": div_str, "warnings": row_warnings,
            })

    # Emit clubs[] with placeholder crests + Sanity name hints so the server
    # component can swap in the real crest at request time.
    clubs_out = []
    for cid, meta in used_clubs.items():
        short = meta.get("short") or cid[:3].upper()
        clubs_out.append({
            "id":               cid,
            "name":             meta["name"],
            "shortName":        short,
            "conference":       "",  # CDL doesn't use conferences; blank so CalendarClub type is happy
            "logoUrl":          placeholder_svg(cid, short),
            "sanityNameHints":  meta.get("sanityNameHints", []),
        })
    clubs_out.sort(key=lambda c: c["name"])

    OUT_MATCHES.write_text(json.dumps({
        "generatedAt": dt.datetime.now().isoformat(timespec="seconds"),
        "source":      SOURCE.name,
        "clubs":       clubs_out,
        "matches":     matches,
    }, indent=2))

    OUT_WARNINGS.write_text(json.dumps(warnings, indent=2))

    print(f"✓ {len(matches)} matches ingested, {skipped} skipped, {len(warnings)} rows with warnings")
    print(f"  → {OUT_MATCHES.relative_to(REPO_ROOT)}")
    print(f"  → {OUT_WARNINGS.relative_to(REPO_ROOT)} ({len(warnings)} entries)")
    print(f"  → clubs identified: {[c['id'] for c in clubs_out]}")


if __name__ == "__main__":
    main()

"use client";

import { useMemo, useState } from "react";
import {
  LeagueCalendarFilters,
  defaultFilterValue,
  isFiltered,
  MatchCard,
  CalendarEmptyState,
  type LeagueCalendarFilterValue,
  type CalendarClub,
  type CalendarMatch,
  type AgeGroup,
} from "@cpsl/ui";

interface CalendarBodyProps {
  clubs:      CalendarClub[];
  matches:    CalendarMatch[];
  ageGroups?: AgeGroup[];
}

function localDateKey(iso: string): string {
  const d = new Date(iso);
  const y  = d.getFullYear();
  const m  = String(d.getMonth() + 1).padStart(2, "0");
  const da = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${da}`;
}

function applyFilters(all: CalendarMatch[], v: LeagueCalendarFilterValue): CalendarMatch[] {
  return all
    .filter((m) => {
      if (v.date && localDateKey(m.kickoff) !== v.date) return false;
      if (v.clubId && m.homeClubId !== v.clubId && m.awayClubId !== v.clubId) return false;
      if (v.ageGroup && m.ageGroup !== v.ageGroup) return false;
      return true;
    })
    .sort((a, b) => a.kickoff.localeCompare(b.kickoff));
}

function formatDateHeader(dateISO: string): string {
  if (!dateISO) return "";
  const [y, m, d] = dateISO.split("-").map(Number);
  const dt = new Date(y, (m ?? 1) - 1, d ?? 1);
  return dt.toLocaleDateString("en-US", {
    weekday: "long",
    month:   "long",
    day:     "numeric",
    year:    "numeric",
  });
}

/** Pick the first date in `all` that has any matches (search forward from the
 *  supplied default). Falls back to the default unchanged. */
function pickInitialDate(defaultISO: string, all: CalendarMatch[]): string {
  const available = new Set(all.map((m) => localDateKey(m.kickoff)));
  if (available.has(defaultISO)) return defaultISO;
  const sorted = [...available].sort();
  return sorted.find((d) => d >= defaultISO) ?? sorted[0] ?? defaultISO;
}

export function CalendarBody({ clubs, matches, ageGroups }: CalendarBodyProps) {
  const [filters, setFilters] = useState<LeagueCalendarFilterValue>(() => {
    const base = defaultFilterValue();
    return { ...base, date: pickInitialDate(base.date, matches) };
  });
  const clubsById = useMemo(() => new Map(clubs.map((c) => [c.id, c])), [clubs]);
  const filtered  = useMemo(() => applyFilters(matches, filters), [matches, filters]);

  return (
    <div
      className="max-w-7xl mx-auto w-full px-4 sm:px-6"
      style={{ paddingTop: 30, paddingBottom: 30 }}
    >
      <div style={{ marginBottom: 30 }}>
        <LeagueCalendarFilters
          clubs={clubs}
          value={filters}
          onChange={setFilters}
          ageGroups={ageGroups}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <h2
          style={{
            fontFamily:     "'Barlow Condensed', sans-serif",
            fontWeight:     700,
            fontSize:       28,
            letterSpacing:  "0.02em",
            textTransform:  "uppercase",
            color:          "#F4EFE6",
            margin:         0,
          }}
        >
          {formatDateHeader(filters.date)}
        </h2>
        <div
          style={{
            fontSize:       12,
            fontWeight:     600,
            letterSpacing:  "0.14em",
            textTransform:  "uppercase",
            color:          "#7A9BAA",
            marginTop:      6,
          }}
        >
          {filtered.length} match{filtered.length === 1 ? "" : "es"}
        </div>
      </div>

      {filtered.length === 0 ? (
        <CalendarEmptyState
          message="No matches scheduled."
          onReset={isFiltered(filters) ? () => setFilters({ ...defaultFilterValue(), date: filters.date }) : undefined}
        />
      ) : (
        <div
          style={{
            display:              "grid",
            gridTemplateColumns:  "repeat(auto-fill, minmax(360px, 1fr))",
            gap:                  16,
          }}
        >
          {filtered.map((m) => {
            const home = clubsById.get(m.homeClubId);
            const away = clubsById.get(m.awayClubId);
            if (!home || !away) return null;
            return (
              <MatchCard
                key={m.id}
                kickoff={m.kickoff}
                home={home}
                away={away}
                homeTeamLabel={m.homeTeamLabel}
                awayTeamLabel={m.awayTeamLabel}
                field={m.field}
                competition={m.competition}
                ageGroup={m.ageGroup}
                notes={m.notes}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

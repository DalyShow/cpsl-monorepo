"use client";

import { useMemo, useState } from "react";
import {
  LeagueCalendarFilters,
  defaultFilterValue,
  isFiltered,
  MatchCard,
  CalendarEmptyState,
  type LeagueCalendarFilterValue,
  type CalendarMatch,
} from "@cpsl/ui";
import { SectionHeader } from "@/components/blocks/SectionHeader";
import { MOCK_CLUBS, MOCK_MATCHES, clubById } from "@/lib/mockCalendar";

/** Local YYYY-MM-DD (matches native <input type="date">). */
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
  // Parse as LOCAL midnight so the label matches the picker.
  const [y, m, d] = dateISO.split("-").map(Number);
  const dt = new Date(y, (m ?? 1) - 1, d ?? 1);
  return dt.toLocaleDateString("en-US", {
    weekday: "long",
    month:   "long",
    day:     "numeric",
    year:    "numeric",
  });
}

export default function CalendarPage() {
  const [filters, setFilters] = useState<LeagueCalendarFilterValue>(() => defaultFilterValue());

  const matches = useMemo(() => applyFilters(MOCK_MATCHES, filters), [filters]);

  return (
    <main style={{ background: "#041124", minHeight: "100vh" }}>
      <SectionHeader
        title="Match Calendar"
        badge="2026–2027 Season"
        subtitle="Pick a date to see that day's fixtures across every CPSL conference"
      />

      <div
        className="max-w-7xl mx-auto w-full px-4 sm:px-6"
        style={{ paddingTop: 30, paddingBottom: 30 }}
      >
        <div style={{ marginBottom: 30 }}>
          <LeagueCalendarFilters
            clubs={MOCK_CLUBS}
            value={filters}
            onChange={setFilters}
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
            {matches.length} match{matches.length === 1 ? "" : "es"}
          </div>
        </div>

        {matches.length === 0 ? (
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
            {matches.map((m) => {
              const home = clubById(m.homeClubId);
              const away = clubById(m.awayClubId);
              if (!home || !away) return null;
              return (
                <MatchCard
                  key={m.id}
                  kickoff={m.kickoff}
                  home={home}
                  away={away}
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
    </main>
  );
}

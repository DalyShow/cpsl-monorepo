"use client";

import { useMemo, useState } from "react";
import {
  LeagueCalendarFilters,
  DEFAULT_FILTER_VALUE,
  isFiltered,
  WeekendSection,
  MatchCard,
  CalendarEmptyState,
  type LeagueCalendarFilterValue,
  type CalendarMatch,
} from "@cpsl/ui";
import { SectionHeader } from "@/components/blocks/SectionHeader";
import {
  MOCK_CLUBS,
  MOCK_MATCHES,
  MOCK_CONFERENCES,
  clubById,
  firstUpcomingWeekendIndex,
  groupByWeekend,
} from "@/lib/mockCalendar";

const DAY_MS = 24 * 60 * 60 * 1000;

function applyFilters(all: CalendarMatch[], v: LeagueCalendarFilterValue): CalendarMatch[] {
  const now = Date.now();
  return all.filter((m) => {
    if (v.dateScope === "this-weekend") {
      const d = new Date(m.kickoff);
      const day = d.getDay();
      const isWeekend = day === 0 || day === 6;
      const withinThisWeek = Math.abs(d.getTime() - now) < 7 * DAY_MS;
      if (!isWeekend || !withinThisWeek) return false;
    }
    if (v.dateScope === "next-30") {
      const delta = new Date(m.kickoff).getTime() - now;
      if (delta < -DAY_MS || delta > 30 * DAY_MS) return false;
    }
    if (v.conference) {
      const h = clubById(m.homeClubId);
      const a = clubById(m.awayClubId);
      if (h?.conference !== v.conference && a?.conference !== v.conference) return false;
    }
    if (v.clubId && m.homeClubId !== v.clubId && m.awayClubId !== v.clubId) return false;
    if (v.competition && m.competition !== v.competition) return false;
    if (v.ageGroup && m.ageGroup !== v.ageGroup) return false;
    return true;
  });
}

export default function CalendarPage() {
  const [filters, setFilters] = useState<LeagueCalendarFilterValue>(DEFAULT_FILTER_VALUE);

  const filtered = useMemo(() => applyFilters(MOCK_MATCHES, filters), [filters]);
  const weekends = useMemo(() => groupByWeekend(filtered), [filtered]);
  const openIdx  = useMemo(() => firstUpcomingWeekendIndex(weekends), [weekends]);

  return (
    <main style={{ background: "#041124", minHeight: "100vh" }}>
      <SectionHeader
        title="Match Calendar"
        badge="2026–2027 Season"
        subtitle="Fixtures across every CPSL conference — grouped by weekend"
      />

      <div
        className="max-w-7xl mx-auto w-full px-4 sm:px-6"
        style={{ paddingTop: 30, paddingBottom: 30 }}
      >
        <div style={{ marginBottom: 30 }}>
          <LeagueCalendarFilters
            conferences={MOCK_CONFERENCES}
            clubs={MOCK_CLUBS}
            value={filters}
            onChange={setFilters}
          />
        </div>

        {weekends.length === 0 ? (
          <CalendarEmptyState
            onReset={isFiltered(filters) ? () => setFilters(DEFAULT_FILTER_VALUE) : undefined}
          />
        ) : (
          <div>
            {weekends.map((w, i) => (
              <WeekendSection
                key={w.id}
                label={w.label}
                matchCount={w.matches.length}
                defaultOpen={i === openIdx}
              >
                {w.matches.map((m) => {
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
              </WeekendSection>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

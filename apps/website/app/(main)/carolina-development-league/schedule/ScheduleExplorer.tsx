"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  LeagueCalendarFilters,
  defaultFilterValue,
  isFiltered,
  MatchCard,
  CalendarEmptyState,
  WeekendSection,
  type LeagueCalendarFilterValue,
  type CalendarView,
  type CalendarClub,
  type CalendarMatch,
  type AgeGroup,
} from "@cpsl/ui";
import { filterCdlMatches } from "@/lib/cdlFilter";

/**
 * CDL schedule v2 — day view (classic) + full-season view grouped by
 * date, with shareable filter URLs.
 *
 * Successor to CalendarBody; the live page swaps over once approved.
 * The ./calendar.ics feed route still exists and works, but its
 * Add-to-Calendar UI was removed pending a later decision — restore it
 * from git history (ScheduleExplorer @ eb49a9d) when wanted.
 */

interface ScheduleExplorerProps {
  clubs:       CalendarClub[];
  matches:     CalendarMatch[];
  ageGroups?:  AgeGroup[];
  showGender?: boolean;
}

// ─── Date helpers ───────────────────────────────────────────────────────────

function localDateKey(iso: string): string {
  return iso.slice(0, 10);
}

function todayKey(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
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

function formatShortDate(dateISO: string): string {
  const [y, m, d] = dateISO.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1).toLocaleDateString("en-US", {
    month: "short",
    day:   "numeric",
  });
}

function pickInitialDate(defaultISO: string, all: CalendarMatch[]): string {
  const available = new Set(all.map((m) => localDateKey(m.kickoff)));
  if (available.has(defaultISO)) return defaultISO;
  const sorted = [...available].sort();
  return sorted.find((d) => d >= defaultISO) ?? sorted[0] ?? defaultISO;
}

// ─── URL state ──────────────────────────────────────────────────────────────

function readUrlState(
  clubs: CalendarClub[],
  ageGroups: AgeGroup[],
): { view: CalendarView | null; partial: Partial<LeagueCalendarFilterValue> } {
  const params = new URLSearchParams(window.location.search);
  const partial: Partial<LeagueCalendarFilterValue> = {};

  const club = params.get("club");
  if (club && clubs.some((c) => c.id === club)) partial.clubId = club;

  const age = params.get("age");
  if (age && (ageGroups as string[]).includes(age)) partial.ageGroup = age as AgeGroup;

  const show = params.get("show");
  if (show === "boys") partial.gender = "M";
  if (show === "girls") partial.gender = "G";

  const date = params.get("date");
  if (date && /^\d{4}-\d{2}-\d{2}$/.test(date)) partial.date = date;

  const view = params.get("view");
  return { view: view === "season" ? "season" : view === "day" ? "day" : null, partial };
}

function writeUrlState(
  filters: LeagueCalendarFilterValue,
  view: CalendarView,
  defaultDate: string,
) {
  const params = new URLSearchParams();
  if (view === "season") params.set("view", "season");
  if (filters.clubId) params.set("club", filters.clubId);
  if (filters.ageGroup) params.set("age", filters.ageGroup);
  if (filters.gender) params.set("show", filters.gender === "M" ? "boys" : "girls");
  if (view === "day" && filters.date && filters.date !== defaultDate) params.set("date", filters.date);
  const qs = params.toString();
  window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
}

// ─── Component ──────────────────────────────────────────────────────────────

export function ScheduleExplorer({ clubs, matches, ageGroups, showGender }: ScheduleExplorerProps) {
  const defaultDate = useMemo(() => {
    const base = defaultFilterValue();
    return pickInitialDate(base.date, matches);
  }, [matches]);

  const [filters, setFilters] = useState<LeagueCalendarFilterValue>(() => ({
    ...defaultFilterValue(),
    date: defaultDate,
  }));
  const [view, setView] = useState<CalendarView>("day");

  // "First upcoming" for season-view defaultOpen — captured once so
  // filter changes don't re-collapse sections the user opened.
  const [anchorDay] = useState(todayKey);

  // Read shared-link state AFTER hydration (mount effect, not the state
  // initializer) — preserves the static prerender, no hydration mismatch.
  const hydratedFromUrl = useRef(false);
  useEffect(() => {
    const { view: urlView, partial } = readUrlState(clubs, ageGroups ?? []);
    if (urlView) setView(urlView);
    if (Object.keys(partial).length > 0) setFilters((f) => ({ ...f, ...partial }));
    hydratedFromUrl.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mirror state into the URL so any filtered view is shareable.
  useEffect(() => {
    if (!hydratedFromUrl.current) return;
    writeUrlState(filters, view, defaultDate);
  }, [filters, view, defaultDate]);

  const clubsById = useMemo(() => new Map(clubs.map((c) => [c.id, c])), [clubs]);

  const scoped = useMemo(
    () =>
      filterCdlMatches(matches, {
        clubId:   filters.clubId,
        ageGroup: filters.ageGroup,
        gender:   filters.gender,
      }).sort((a, b) => a.kickoff.localeCompare(b.kickoff)),
    [matches, filters.clubId, filters.ageGroup, filters.gender],
  );

  const dayMatches = useMemo(
    () => scoped.filter((m) => localDateKey(m.kickoff) === filters.date),
    [scoped, filters.date],
  );

  const seasonGroups = useMemo(() => {
    const byDate = new Map<string, CalendarMatch[]>();
    for (const m of scoped) {
      const key = localDateKey(m.kickoff);
      const arr = byDate.get(key);
      if (arr) arr.push(m);
      else byDate.set(key, [m]);
    }
    return [...byDate.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [scoped]);

  const firstUpcomingKey = useMemo(
    () => seasonGroups.find(([key]) => key >= anchorDay)?.[0] ?? seasonGroups[0]?.[0],
    [seasonGroups, anchorDay],
  );

  const seasonRange = useMemo(() => {
    if (scoped.length === 0) return "";
    const first = localDateKey(scoped[0].kickoff);
    const last  = localDateKey(scoped[scoped.length - 1].kickoff);
    return `${formatShortDate(first)} – ${formatShortDate(last)}`;
  }, [scoped]);

  const shown = view === "day" ? dayMatches : scoped;

  const renderCard = (m: CalendarMatch) => {
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
        locationAddress={m.locationAddress}
        competition={m.competition}
        ageGroup={m.ageGroup}
        notes={m.notes}
        hideCompetition
      />
    );
  };

  return (
    <div>
      {/* ── Filter band — full-bleed fill, closed by a hairline like the
             one under the hero. Controls stay in the content column. ── */}
      <div
        style={{
          background:   "#0A1628",
          borderBottom: "1px solid #1E2D45",
        }}
      >
        <div
          className="max-w-7xl mx-auto w-full px-4 sm:px-6"
          style={{ paddingTop: 22, paddingBottom: 22 }}
        >
          <LeagueCalendarFilters
            clubs={clubs}
            value={filters}
            onChange={setFilters}
            ageGroups={ageGroups}
            showGender={showGender}
            view={view}
            onViewChange={setView}
            mobileSheet
          />
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto w-full px-4 sm:px-6"
        style={{ paddingTop: 44, paddingBottom: 30 }}
      >

      {/* ── Header row: title + count on the left, calendar CTA right ── */}
      <div
        style={{
          display:       "flex",
          alignItems:    "flex-end",
          justifyContent:"space-between",
          gap:           16,
          flexWrap:      "wrap",
          marginBottom:  24,
        }}
      >
        <div>
          <h2
            style={{
              fontFamily:    "'Barlow Condensed', sans-serif",
              fontWeight:    700,
              fontSize:      28,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              color:         "#F4EFE6",
              margin:        0,
            }}
          >
            {view === "day" ? formatDateHeader(filters.date) : "Full Season"}
          </h2>
          <div
            style={{
              fontSize:      12,
              fontWeight:    600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color:         "#7A9BAA",
              marginTop:     6,
            }}
          >
            {shown.length} match{shown.length === 1 ? "" : "es"}
            {view === "season" && seasonRange ? ` · ${seasonRange}` : ""}
          </div>
        </div>
      </div>

      {shown.length === 0 ? (
        <CalendarEmptyState
          message="No matches scheduled."
          onReset={
            isFiltered(filters)
              ? () => setFilters({ ...defaultFilterValue(), date: filters.date })
              : undefined
          }
        />
      ) : view === "day" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {dayMatches.map(renderCard)}
        </div>
      ) : (
        <div>
          {seasonGroups.map(([key, group]) => (
            <WeekendSection
              key={key}
              label={formatDateHeader(key)}
              matchCount={group.length}
              defaultOpen={key === firstUpcomingKey}
              layout="list"
            >
              {group.map(renderCard)}
            </WeekendSection>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}

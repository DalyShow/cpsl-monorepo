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
  type CalendarClub,
  type CalendarMatch,
  type CalendarWeekend,
} from "@cpsl/ui";
import { DocsHeader } from "@/components/docs/DocsHeader";
import { PreviewPane } from "@/components/docs/PreviewPane";
import { PropsTable } from "@/components/docs/PropsTable";
import type { PropDoc } from "@/components/docs/types";

// ─── Fixture data — self-contained, no cross-app import ─────────────────────

const CLUBS: CalendarClub[] = [
  { id: "charlotte-fc",     name: "Charlotte FC",     conference: "West",       logoUrl: "/logos/charlotte-fc.svg"     },
  { id: "raleigh-athletic", name: "Raleigh Athletic", conference: "Central",    logoUrl: "/logos/raleigh-athletic.svg" },
  { id: "durham-united",    name: "Durham United",    conference: "Central",    logoUrl: "/logos/durham-united.svg"    },
  { id: "triangle-fc",      name: "Triangle FC",      conference: "Central",    logoUrl: "/logos/triangle-fc.svg"      },
  { id: "greensboro-fc",    name: "Greensboro FC",    conference: "Midwest",    logoUrl: "/logos/greensboro-fc.svg"    },
  { id: "winston-salem-sc", name: "Winston-Salem SC", conference: "Midwest",    logoUrl: "/logos/winston-salem-sc.svg" },
  { id: "asheville-fc",     name: "Asheville FC",     conference: "Northwest",  logoUrl: "/logos/asheville-fc.svg"     },
  { id: "charleston-fc",    name: "Charleston FC",    conference: "Southeast",  logoUrl: "/logos/charleston-fc.svg"    },
  { id: "coastal-sc",       name: "Coastal SC",       conference: "Southeast",  logoUrl: "/logos/coastal-sc.svg"       },
  { id: "columbia-united",  name: "Columbia United",  conference: "South",      logoUrl: "/logos/columbia-united.svg"  },
];

const CONFERENCES = ["Northwest", "West", "Central", "South", "Midwest", "Southeast"];

const clubById = (id: string) => CLUBS.find((c) => c.id === id);

/** Build a fixed reference weekend so screenshots are stable. */
function refSaturday(): Date {
  const d = new Date();
  d.setHours(10, 0, 0, 0);
  const day = d.getDay();
  d.setDate(d.getDate() + (6 - day));
  return d;
}

function isoAt(day: Date, h: number, m = 0) {
  const d = new Date(day);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
}

const sat = refSaturday();
const sun = new Date(sat); sun.setDate(sun.getDate() + 1);

const WEEKEND_MATCHES: CalendarMatch[] = [
  { id: "m1", kickoff: isoAt(sat, 9, 0),   homeClubId: "raleigh-athletic", awayClubId: "charlotte-fc",     field: "Dix Park Fields — Field 1",   competition: "Premiership", ageGroup: "U15" },
  { id: "m2", kickoff: isoAt(sat, 10, 30), homeClubId: "durham-united",    awayClubId: "greensboro-fc",    field: "Duke East Campus — Turf 2",   competition: "Cup",         ageGroup: "U17", notes: "Semifinal — winner advances to the CPSL Cup final" },
  { id: "m3", kickoff: isoAt(sat, 12, 0),  homeClubId: "triangle-fc",      awayClubId: "asheville-fc",     field: "Carolina Bank Field — A",     competition: "Development", ageGroup: "U14" },
  { id: "m4", kickoff: isoAt(sat, 13, 30), homeClubId: "charleston-fc",    awayClubId: "coastal-sc",       field: "MUSC Health Stadium",         competition: "Premiership", ageGroup: "U19" },
  { id: "m5", kickoff: isoAt(sat, 15, 0),  homeClubId: "columbia-united",  awayClubId: "winston-salem-sc", field: "Rock Hill Sports Complex",    competition: "Premiership", ageGroup: "U15" },
  { id: "m6", kickoff: isoAt(sun, 9, 0),   homeClubId: "charlotte-fc",     awayClubId: "triangle-fc",      field: "Matthews Sportsplex — Field 3", competition: "Premiership", ageGroup: "U13" },
  { id: "m7", kickoff: isoAt(sun, 10, 45), homeClubId: "greensboro-fc",    awayClubId: "raleigh-athletic", field: "Winston Coliseum Park — A",   competition: "Premiership", ageGroup: "U15" },
  { id: "m8", kickoff: isoAt(sun, 13, 0),  homeClubId: "durham-united",    awayClubId: "coastal-sc",       field: "Duke East Campus — Turf 2",   competition: "Development", ageGroup: "U17" },
  { id: "m9", kickoff: isoAt(sun, 15, 15), homeClubId: "winston-salem-sc", awayClubId: "charleston-fc",    field: "Winston Coliseum Park — A",   competition: "Premiership", ageGroup: "U17" },
];

const WEEKEND: CalendarWeekend = {
  id:       sat.toISOString().slice(0, 10),
  label:    `The weekend of ${sat.toLocaleDateString("en-US", { month: "long", day: "numeric" })}–${sun.getDate()}`,
  saturday: sat,
  matches:  WEEKEND_MATCHES,
};

// ─── Prop docs ───────────────────────────────────────────────────────────────

const MATCH_CARD_PROPS: PropDoc[] = [
  { name: "kickoff",     type: "string",         default: "—", description: "ISO datetime string. Rendered as 12-hour local + day label." },
  { name: "home",        type: "CalendarClub",   default: "—", description: "Home team — { id, name, conference, logoUrl }." },
  { name: "away",        type: "CalendarClub",   default: "—", description: "Away team — same shape as home." },
  { name: "field",       type: "string",         default: "—", description: "Field / venue label — trimmed with ellipsis if it overflows." },
  { name: "competition", type: '"Premiership" | "Cup" | "Development"', default: "—", description: "Drives the pill color." },
  { name: "ageGroup",    type: '"U13" | "U14" | "U15" | "U16" | "U17" | "U19"', default: "—", description: "Age-group pill." },
  { name: "notes",       type: "string",         default: "—", description: "Optional italic note — semifinal, extra time, etc." },
];

const WEEKEND_SECTION_PROPS: PropDoc[] = [
  { name: "label",       type: "string",  default: "—", description: 'Human-readable weekend label ("The weekend of October 4–5").' },
  { name: "matchCount",  type: "number",  default: "—", description: "Count shown in the summary — used when `meta` isn't supplied." },
  { name: "defaultOpen", type: "boolean", default: "false", description: 'Section starts expanded. Set true for the "first upcoming" weekend.' },
  { name: "meta",        type: "string",  default: "—", description: 'Override the summary sub-label (e.g. "Sat & Sun · 10 matches").' },
  { name: "children",    type: "ReactNode", default: "—", description: "MatchCard(s) — rendered inside a responsive grid." },
];

const FILTERS_PROPS: PropDoc[] = [
  { name: "conferences", type: "string[]",        default: "—", description: "Ordered conference names for the dropdown." },
  { name: "clubs",       type: "CalendarClub[]",  default: "—", description: "All clubs — populates the Club dropdown with names." },
  { name: "value",       type: "LeagueCalendarFilterValue", default: "—", description: "Controlled — { conference, clubId, competition, ageGroup, dateScope }." },
  { name: "onChange",    type: "(next) => void",  default: "—", description: "Called on every filter change. Parent owns the state." },
];

// ─── Filtered variant (state) ───────────────────────────────────────────────

function FilteredVariant() {
  const [filters, setFilters] = useState<LeagueCalendarFilterValue>({
    ...DEFAULT_FILTER_VALUE,
    conference: "Central",
  });

  const filtered = useMemo(
    () =>
      WEEKEND_MATCHES.filter((m) => {
        if (filters.conference) {
          const h = clubById(m.homeClubId);
          const a = clubById(m.awayClubId);
          if (h?.conference !== filters.conference && a?.conference !== filters.conference) return false;
        }
        if (filters.clubId && m.homeClubId !== filters.clubId && m.awayClubId !== filters.clubId) return false;
        if (filters.competition && m.competition !== filters.competition) return false;
        if (filters.ageGroup && m.ageGroup !== filters.ageGroup) return false;
        return true;
      }),
    [filters]
  );

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 24 }}>
        <LeagueCalendarFilters
          conferences={CONFERENCES}
          clubs={CLUBS}
          value={filters}
          onChange={setFilters}
        />
      </div>

      {filtered.length === 0 ? (
        <CalendarEmptyState
          onReset={isFiltered(filters) ? () => setFilters(DEFAULT_FILTER_VALUE) : undefined}
        />
      ) : (
        <WeekendSection label={WEEKEND.label} matchCount={filtered.length} defaultOpen>
          {filtered.map((m) => {
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
      )}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function LeagueCalendarDocs() {
  const firstMatch = WEEKEND_MATCHES[1]; // The Cup semifinal — has notes
  const home = clubById(firstMatch.homeClubId)!;
  const away = clubById(firstMatch.awayClubId)!;

  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <DocsHeader
        crumbs={[
          { label: "Components", href: "/" },
          { label: "Body Modules", href: "/modules" },
          { label: "League Calendar" },
        ]}
        title="League Calendar"
        status="beta"
        description="Weekend-by-weekend fixture list. Comprises MatchCard, WeekendSection, LeagueCalendarFilters, and CalendarEmptyState — all shipped from @cpsl/ui. Data-agnostic: the calendar route currently reads from local mock data; the shape is designed to swap for a Sanity fetch without changing any component."
      />

      <div className="px-12 py-10 space-y-10">
        {/* ── Full weekend ────────────────────────────────────────────── */}
        <section>
          <SectionHeader
            eyebrow="Composition"
            title="One weekend — filters + WeekendSection + MatchCards"
            note="Filter state lives in the page; components are all controlled. WeekendSection defaults to closed — set `defaultOpen` on the first upcoming weekend."
          />
          <PreviewPane label="Default view" canvas="navy" padding={0}>
            <div style={{ padding: 24 }}>
              <WeekendSection label={WEEKEND.label} matchCount={WEEKEND.matches.length} defaultOpen>
                {WEEKEND.matches.map((m) => {
                  const h = clubById(m.homeClubId);
                  const a = clubById(m.awayClubId);
                  if (!h || !a) return null;
                  return (
                    <MatchCard
                      key={m.id}
                      kickoff={m.kickoff}
                      home={h}
                      away={a}
                      field={m.field}
                      competition={m.competition}
                      ageGroup={m.ageGroup}
                      notes={m.notes}
                    />
                  );
                })}
              </WeekendSection>
            </div>
          </PreviewPane>
        </section>

        {/* ── Filtered (interactive) ─────────────────────────────────── */}
        <section>
          <SectionHeader
            eyebrow="Interactive"
            title="Filter interaction — Conference = Central"
            note="Change the filters below. The weekend collapses to an empty state if nothing matches."
          />
          <PreviewPane label="Live" canvas="navy" padding={0}>
            <FilteredVariant />
          </PreviewPane>
        </section>

        {/* ── Single MatchCard ────────────────────────────────────────── */}
        <section>
          <SectionHeader
            eyebrow="Atom"
            title="MatchCard — with notes"
            note="Home crest + name, kickoff, away crest + name. Footer shows field + competition + age. Stacks single-column below 640px."
          />
          <PreviewPane label="MatchCard" canvas="navy" padding={24}>
            <div style={{ maxWidth: 560 }}>
              <MatchCard
                kickoff={firstMatch.kickoff}
                home={home}
                away={away}
                field={firstMatch.field}
                competition={firstMatch.competition}
                ageGroup={firstMatch.ageGroup}
                notes={firstMatch.notes}
              />
            </div>
          </PreviewPane>
        </section>

        {/* ── Collapsed weekend ──────────────────────────────────────── */}
        <section>
          <SectionHeader
            eyebrow="State"
            title="Collapsed — WeekendSection with defaultOpen = false"
            note="Sections use native <details> under the hood — keyboard/AT semantics for free."
          />
          <PreviewPane label="Collapsed" canvas="navy" padding={24}>
            <WeekendSection label={WEEKEND.label} matchCount={WEEKEND.matches.length}>
              {WEEKEND.matches.slice(0, 3).map((m) => {
                const h = clubById(m.homeClubId);
                const a = clubById(m.awayClubId);
                if (!h || !a) return null;
                return (
                  <MatchCard
                    key={m.id}
                    kickoff={m.kickoff}
                    home={h}
                    away={a}
                    field={m.field}
                    competition={m.competition}
                    ageGroup={m.ageGroup}
                  />
                );
              })}
            </WeekendSection>
          </PreviewPane>
        </section>

        {/* ── Empty state ────────────────────────────────────────────── */}
        <section>
          <SectionHeader
            eyebrow="State"
            title="Empty state — no matches for the current filter"
            note="Renders inside the calendar area when the filter set yields zero matches. Include `onReset` for a quick clear."
          />
          <PreviewPane label="Empty" canvas="navy" padding={24}>
            <CalendarEmptyState onReset={() => {}} />
          </PreviewPane>
        </section>

        {/* ── Props ──────────────────────────────────────────────────── */}
        <section className="space-y-6">
          <PropSectionHeader title="MatchCard props" />
          <PropsTable props={MATCH_CARD_PROPS} />

          <PropSectionHeader title="WeekendSection props" />
          <PropsTable props={WEEKEND_SECTION_PROPS} />

          <PropSectionHeader title="LeagueCalendarFilters props" />
          <PropsTable props={FILTERS_PROPS} />
        </section>

        {/* ── Notes ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-2xl p-6" style={{ borderColor: "#E2E8F0", background: "white" }}>
            <div className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "#697279" }}>
              Composition
            </div>
            <ul className="text-sm space-y-1.5 leading-relaxed" style={{ color: "#475569" }}>
              <li>• Filter state lives in the page — the calendar itself is stateless.</li>
              <li>• <code className="font-mono text-xs">groupByWeekend()</code> in <code className="font-mono text-xs">apps/website/lib/mockCalendar.ts</code> derives <code className="font-mono text-xs">CalendarWeekend[]</code> from the flat match list.</li>
              <li>• Fixtures only — no scores or live badges in v1.</li>
            </ul>
          </div>

          <div className="border rounded-2xl p-6" style={{ borderColor: "#E2E8F0", background: "white" }}>
            <div className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "#697279" }}>
              Backend swap (deferred)
            </div>
            <ul className="text-sm space-y-1.5 leading-relaxed" style={{ color: "#475569" }}>
              <li>• Sanity docs: <code className="font-mono text-xs">season</code>, <code className="font-mono text-xs">conference</code>, <code className="font-mono text-xs">club</code>, <code className="font-mono text-xs">venue</code>, <code className="font-mono text-xs">match</code>, <code className="font-mono text-xs">matchday</code>.</li>
              <li>• GROQ maps 1:1 to <code className="font-mono text-xs">CalendarMatch</code> — no component changes needed.</li>
              <li>• Bulk-import a CSV to seed the initial season, then edit individual matches in Studio.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Small helpers (kept local — they're doc chrome, not reusable) ──────────

function SectionHeader({
  eyebrow,
  title,
  note,
}: {
  eyebrow: string;
  title:   string;
  note?:   string;
}) {
  return (
    <div className="mb-3">
      <div className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#94A3B8" }}>
        {eyebrow}
      </div>
      <h2 className="text-base font-semibold" style={{ color: "#091628" }}>{title}</h2>
      {note && <p className="text-sm mt-1" style={{ color: "#697279" }}>{note}</p>}
    </div>
  );
}

function PropSectionHeader({ title }: { title: string }) {
  return (
    <div>
      <div className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "#94A3B8" }}>
        Reference
      </div>
      <h2 className="text-lg font-semibold" style={{ color: "#091628" }}>{title}</h2>
    </div>
  );
}

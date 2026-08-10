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
} from "@cpsl/ui";
import { DocsHeader } from "@/components/docs/DocsHeader";
import { PreviewPane } from "@/components/docs/PreviewPane";
import { PropsTable } from "@/components/docs/PropsTable";
import type { PropDoc } from "@/components/docs/types";

// ─── Fixture data ────────────────────────────────────────────────────────────

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

const clubById = (id: string) => CLUBS.find((c) => c.id === id);

function refSaturday(): Date {
  const d = new Date();
  d.setHours(10, 0, 0, 0);
  const day = d.getDay();
  d.setDate(d.getDate() + ((6 - day + 7) % 7));
  return d;
}

function isoAt(day: Date, h: number, m = 0) {
  const d = new Date(day);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
}

const sat = refSaturday();

const SAT_MATCHES: CalendarMatch[] = [
  { id: "m1", kickoff: isoAt(sat, 9, 0),   homeClubId: "raleigh-athletic", awayClubId: "charlotte-fc",     field: "Dix Park Fields — Field 1",     competition: "Premiership", ageGroup: "U15" },
  { id: "m2", kickoff: isoAt(sat, 10, 30), homeClubId: "durham-united",    awayClubId: "greensboro-fc",    field: "Duke East Campus — Turf 2",     competition: "Cup",         ageGroup: "U17", notes: "Semifinal — winner advances to the CPSL Cup final" },
  { id: "m3", kickoff: isoAt(sat, 12, 0),  homeClubId: "triangle-fc",      awayClubId: "asheville-fc",     field: "Carolina Bank Field — A",       competition: "Development", ageGroup: "U14" },
  { id: "m4", kickoff: isoAt(sat, 13, 30), homeClubId: "charleston-fc",    awayClubId: "coastal-sc",       field: "MUSC Health Stadium",           competition: "Premiership", ageGroup: "U19" },
  { id: "m5", kickoff: isoAt(sat, 15, 0),  homeClubId: "columbia-united",  awayClubId: "winston-salem-sc", field: "Rock Hill Sports Complex",      competition: "Premiership", ageGroup: "U15" },
];

// ─── Prop docs ───────────────────────────────────────────────────────────────

const MATCH_CARD_PROPS: PropDoc[] = [
  { name: "kickoff",     type: "string",       default: "—", description: "ISO datetime string. Rendered as 12-hour local + day label." },
  { name: "home",        type: "CalendarClub", default: "—", description: "Home team — { id, name, conference, logoUrl }." },
  { name: "away",        type: "CalendarClub", default: "—", description: "Away team — same shape as home." },
  { name: "field",       type: "string",       default: "—", description: "Field / venue label — trimmed with ellipsis if it overflows." },
  { name: "competition", type: '"Premiership" | "Cup" | "Development"', default: "—", description: "Drives the pill color." },
  { name: "ageGroup",    type: '"U13" | "U14" | "U15" | "U16" | "U17" | "U19"', default: "—", description: "Age-group pill." },
  { name: "notes",       type: "string",       default: "—", description: "Optional italic note — semifinal, extra time, etc." },
];

const FILTERS_PROPS: PropDoc[] = [
  { name: "clubs",    type: "CalendarClub[]",  default: "—", description: "All clubs — populates the Club dropdown." },
  { name: "value",    type: "LeagueCalendarFilterValue", default: "—", description: "Controlled — { date, clubId, ageGroup }. `date` is YYYY-MM-DD; always populated." },
  { name: "onChange", type: "(next) => void",  default: "—", description: "Called on every filter change. Parent owns the state." },
];

// ─── Filtered variant (interactive) ─────────────────────────────────────────

function InteractiveVariant() {
  const [filters, setFilters] = useState<LeagueCalendarFilterValue>(() => defaultFilterValue());

  const filtered = useMemo(() => {
    return SAT_MATCHES.filter((m) => {
      const key = m.kickoff.slice(0, 10);
      // Match against the local YYYY-MM-DD of the Saturday.
      const local = (() => {
        const d = new Date(m.kickoff);
        const y = d.getFullYear();
        const mo = String(d.getMonth() + 1).padStart(2, "0");
        const da = String(d.getDate()).padStart(2, "0");
        return `${y}-${mo}-${da}`;
      })();
      void key;
      if (filters.date && local !== filters.date) return false;
      if (filters.clubId && m.homeClubId !== filters.clubId && m.awayClubId !== filters.clubId) return false;
      if (filters.ageGroup && m.ageGroup !== filters.ageGroup) return false;
      return true;
    });
  }, [filters]);

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 24 }}>
        <LeagueCalendarFilters
          clubs={CLUBS}
          value={filters}
          onChange={setFilters}
        />
      </div>

      {filtered.length === 0 ? (
        <CalendarEmptyState
          message="No matches on that date."
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
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function LeagueCalendarDocs() {
  const first = SAT_MATCHES[1];
  const home  = clubById(first.homeClubId)!;
  const away  = clubById(first.awayClubId)!;

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
        description="Day-view fixture list. Filter bar (date picker + club dropdown + age pills) drives a single grid of MatchCards. Defaults to the upcoming Saturday."
      />

      <div className="px-12 py-10 space-y-10">
        {/* ── Interactive ───────────────────────────────────────────── */}
        <section>
          <SectionHeader
            eyebrow="Interactive"
            title="Filter → results"
            note="Pick a different date and the grid re-renders. Club and age narrow further; the date always stays selected."
          />
          <PreviewPane label="Live" canvas="navy" padding={0}>
            <InteractiveVariant />
          </PreviewPane>
        </section>

        {/* ── Single MatchCard ──────────────────────────────────────── */}
        <section>
          <SectionHeader
            eyebrow="Atom"
            title="MatchCard — with notes"
            note="Home crest + name, kickoff, away crest + name. Footer shows field + competition + age. Stacks single-column below 640px."
          />
          <PreviewPane label="MatchCard" canvas="navy" padding={24}>
            <div style={{ maxWidth: 560 }}>
              <MatchCard
                kickoff={first.kickoff}
                home={home}
                away={away}
                field={first.field}
                competition={first.competition}
                ageGroup={first.ageGroup}
                notes={first.notes}
              />
            </div>
          </PreviewPane>
        </section>

        {/* ── Empty state ───────────────────────────────────────────── */}
        <section>
          <SectionHeader
            eyebrow="State"
            title="Empty state — no matches for the current filter"
            note="Renders inside the calendar area when the filter set yields zero matches."
          />
          <PreviewPane label="Empty" canvas="navy" padding={24}>
            <CalendarEmptyState message="No matches on that date." onReset={() => {}} />
          </PreviewPane>
        </section>

        {/* ── Props ─────────────────────────────────────────────────── */}
        <section className="space-y-6">
          <PropSectionHeader title="MatchCard props" />
          <PropsTable props={MATCH_CARD_PROPS} />

          <PropSectionHeader title="LeagueCalendarFilters props" />
          <PropsTable props={FILTERS_PROPS} />
        </section>
      </div>
    </div>
  );
}

// ─── Doc chrome ─────────────────────────────────────────────────────────────

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

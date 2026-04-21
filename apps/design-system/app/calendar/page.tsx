import { conferenceFor } from "@/lib/clubConferences";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import CodeBlock from "@/components/CodeBlock";
import { CalendarDayView } from "@/components/cpsl/calendar/CalendarDayView";
import { CalendarMatchCard } from "@/components/cpsl/calendar/CalendarMatchCard";
import { DayPicker } from "@/components/cpsl/calendar/DayPicker";
import { CalendarViewToggle } from "@/components/cpsl/calendar/CalendarViewToggle";
import type { MatchDay } from "@/components/cpsl/calendar/DayPicker";

// ─── Sample data — March 2026 ─────────────────────────────────────────────────
// March 1 2026 = Sunday → startWeekday = 0

const MATCH_DAYS: MatchDay[] = [
  { day: 1,  dots: ["premiership", "premiership", "premiership"] },
  { day: 7,  dots: ["premiership", "premiership"] },
  { day: 8,  dots: ["premiership"] },
  { day: 14, dots: ["premiership", "premiership"] },
  { day: 21, dots: ["premiership", "cup"] },
  { day: 28, dots: ["cup", "cup"] },
];

const MATCHES = [
  // March 1
  { day: 1, kickoff: "12:00", status: "fulltime" as const, competition: conferenceFor("Charlotte FC"), matchday: 22,
    home: { name: "Charlotte FC", position: 1, score: 3 },
    away: { name: "Durham United", position: 3, score: 1 },
    venue: "Matthews Sportsplex, Charlotte NC" },
  { day: 1, kickoff: "14:00", status: "fulltime" as const, competition: conferenceFor("Raleigh Athletic"), matchday: 22,
    home: { name: "Raleigh Athletic", position: 2, score: 2 },
    away: { name: "Triangle FC", position: 4, score: 2 },
    venue: "Dix Park Fields, Raleigh NC" },
  { day: 1, kickoff: "16:00", status: "fulltime" as const, competition: conferenceFor("Winston-Salem SC"), matchday: 22,
    home: { name: "Winston-Salem SC", position: 6, score: 1 },
    away: { name: "Greensboro FC", position: 5, score: 2 },
    venue: "Truist Stadium, Winston-Salem NC" },
  // March 7
  { day: 7, kickoff: "14:00", status: "upcoming" as const, competition: conferenceFor("Durham United"), matchday: 23,
    home: { name: "Durham United", position: 3 },
    away: { name: "Raleigh Athletic", position: 2 },
    venue: "Durham Soccer Complex, Durham NC" },
  { day: 7, kickoff: "16:00", status: "upcoming" as const, competition: conferenceFor("Charlotte FC"), matchday: 23,
    home: { name: "Charlotte FC", position: 1 },
    away: { name: "Greensboro FC", position: 5 },
    venue: "Matthews Sportsplex, Charlotte NC" },
  // March 8
  { day: 8, kickoff: "15:00", status: "live" as const, competition: conferenceFor("Triangle FC"), matchday: 23, minute: 34,
    home: { name: "Triangle FC", position: 4, score: 1 },
    away: { name: "Winston-Salem SC", position: 6, score: 0 },
    venue: "WakeMed Soccer Park, Cary NC" },
  // March 14
  { day: 14, kickoff: "14:00", status: "upcoming" as const, competition: conferenceFor("Charlotte FC"), matchday: 24,
    home: { name: "Charlotte FC", position: 1 },
    away: { name: "Triangle FC", position: 4 },
    venue: "Matthews Sportsplex, Charlotte NC" },
  { day: 14, kickoff: "16:00", status: "upcoming" as const, competition: conferenceFor("Raleigh Athletic"), matchday: 24,
    home: { name: "Raleigh Athletic", position: 2 },
    away: { name: "Durham United", position: 3 },
    venue: "Dix Park Fields, Raleigh NC" },
  // March 21
  { day: 21, kickoff: "14:00", status: "upcoming" as const, competition: conferenceFor("Greensboro FC"), matchday: 25,
    home: { name: "Greensboro FC", position: 5 },
    away: { name: "Charlotte FC", position: 1 },
    venue: "Bryan Park, Greensboro NC" },
  { day: 21, kickoff: "16:30", status: "upcoming" as const, competition: "cup",
    home: { name: "Durham United", position: 3 },
    away: { name: "Triangle FC", position: 4 },
    venue: "Durham Soccer Complex, Durham NC" },
  // March 28
  { day: 28, kickoff: "15:00", status: "upcoming" as const, competition: "cup",
    home: { name: "Charlotte FC", position: 1 },
    away: { name: "Raleigh Athletic", position: 2 },
    venue: "Matthews Sportsplex, Charlotte NC" },
  { day: 28, kickoff: "17:00", status: "upcoming" as const, competition: "cup",
    home: { name: "Winston-Salem SC", position: 6 },
    away: { name: "Durham United", position: 3 },
    venue: "Truist Stadium, Winston-Salem NC" },
];

const dayViewCode = `import { CalendarDayView } from "@/components/cpsl/calendar"
import type { MatchDay } from "@/components/cpsl/calendar"

// March 2026: startWeekday=0 (1st = Sunday)
<CalendarDayView
  monthLabel="MARCH 2026"
  daysInMonth={31}
  startWeekday={0}
  defaultDay={1}
  todayDay={1}
  matchDays={matchDays}
  matches={matches}
  onSwitchToMonth={() => router.push("/calendar/month")}
/>`;

const matchCardCode = `import { CalendarMatchCard } from "@/components/cpsl/calendar"

// Upcoming
<CalendarMatchCard
  kickoff="14:00"
  status="upcoming"
  competition="premiership"
  matchday={23}
  home={{ name: "Charlotte FC", position: 1 }}
  away={{ name: "Durham United", position: 3 }}
  venue="Matthews Sportsplex, Charlotte NC"
/>

// Live with score
<CalendarMatchCard
  kickoff="16:00"
  status="live"
  minute={34}
  competition="premiership"
  home={{ name: "Triangle FC", position: 4, score: 1 }}
  away={{ name: "Winston-Salem SC", position: 6, score: 0 }}
  venue="WakeMed Soccer Park, Cary NC"
/>`;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CalendarPage() {
  return (
    <div style={{ background: "#F4F6FA", minHeight: "100vh" }}>
      <PageHeader
        section="14 — Components"
        title="Calendar — Day View"
        description="Day-by-day match schedule with a mini month picker, competition badges, live scores, and empty state. Three composable primitives assembled into one drop-in view."
      />

      <div className="px-12 py-12">

        {/* ── Assembled Day View ── */}
        <Section title="1 — CalendarDayView — Live Component">
          <p className="text-xs text-muted-foreground mb-4">
            Fully interactive — click any day in the sidebar to see its matches. Navigate between days with the arrow buttons. Switch match days to see different states: results (Mar 1), live (Mar 8), upcoming, and empty.
          </p>
          <div
            className="rounded-2xl overflow-hidden border"
            style={{ borderColor: "#1E2D45", height: 620 }}
          >
            <CalendarDayView
              monthLabel="MARCH 2026"
              daysInMonth={31}
              startWeekday={0}
              defaultDay={1}
              todayDay={1}
              matchDays={MATCH_DAYS}
              matches={MATCHES}
            />
          </div>
          <div className="mt-4">
            <CodeBlock code={dayViewCode} language="tsx" />
          </div>
        </Section>

        {/* ── CalendarMatchCard primitives ── */}
        <Section title="2 — CalendarMatchCard — All States">
          <p className="text-xs text-muted-foreground mb-6">
            Four status variants. Passes <code className="bg-secondary px-1.5 py-0.5 rounded">competition</code> to colour-code the badge — blue for Premiership, gold for CPSL Cup.
          </p>
          <div
            className="rounded-2xl p-8 border flex flex-col gap-4"
            style={{ background: "#091628", borderColor: "#1E2D45" }}
          >
            <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#475569" }}>Upcoming</div>
            <CalendarMatchCard
              kickoff="14:00" status="upcoming" competition={conferenceFor("Charlotte FC")} matchday={23}
              home={{ name: "Charlotte FC", position: 1 }}
              away={{ name: "Durham United", position: 3 }}
              venue="Matthews Sportsplex, Charlotte NC"
            />

            <div className="text-xs font-semibold uppercase tracking-widest mt-2 mb-1" style={{ color: "#475569" }}>Live</div>
            <CalendarMatchCard
              kickoff="16:00" status="live" minute={34} competition={conferenceFor("Triangle FC")} matchday={23}
              home={{ name: "Triangle FC", position: 4, score: 1 }}
              away={{ name: "Winston-Salem SC", position: 6, score: 0 }}
              venue="WakeMed Soccer Park, Cary NC"
            />

            <div className="text-xs font-semibold uppercase tracking-widest mt-2 mb-1" style={{ color: "#475569" }}>Full Time</div>
            <CalendarMatchCard
              kickoff="12:00" status="fulltime" competition={conferenceFor("Charlotte FC")} matchday={22}
              home={{ name: "Charlotte FC", position: 1, score: 3 }}
              away={{ name: "Durham United", position: 3, score: 1 }}
              venue="Matthews Sportsplex, Charlotte NC"
            />

            <div className="text-xs font-semibold uppercase tracking-widest mt-2 mb-1" style={{ color: "#475569" }}>CPSL Cup — Upcoming</div>
            <CalendarMatchCard
              kickoff="15:00" status="upcoming" competition="cup"
              home={{ name: "Charlotte FC", position: 1 }}
              away={{ name: "Raleigh Athletic", position: 2 }}
              venue="Matthews Sportsplex, Charlotte NC"
            />

            <div className="text-xs font-semibold uppercase tracking-widest mt-2 mb-1" style={{ color: "#475569" }}>Postponed</div>
            <CalendarMatchCard
              kickoff="13:00" status="postponed" competition={conferenceFor("Greensboro FC")} matchday={22}
              home={{ name: "Greensboro FC", position: 5 }}
              away={{ name: "Triangle FC", position: 4 }}
              venue="Bryan Park, Greensboro NC"
            />
          </div>
          <div className="mt-4">
            <CodeBlock code={matchCardCode} language="tsx" />
          </div>
        </Section>

        {/* ── Primitives ── */}
        <Section title="3 — Primitives">
          <p className="text-xs text-muted-foreground mb-6">
            Use <code className="bg-secondary px-1.5 py-0.5 rounded">DayPicker</code> and <code className="bg-secondary px-1.5 py-0.5 rounded">CalendarViewToggle</code> independently in your own layouts.
          </p>
          <div className="grid grid-cols-2 gap-6">
            {/* DayPicker standalone */}
            <div className="rounded-xl border overflow-hidden" style={{ borderColor: "#1E2D45" }}>
              <div className="px-4 py-2.5 border-b" style={{ background: "#0D1B3E", borderColor: "#1E2D45" }}>
                <span className="text-xs font-bold" style={{ color: "#C9A74C" }}>DayPicker</span>
              </div>
              <DayPicker
                monthLabel="MARCH 2026"
                daysInMonth={31}
                startWeekday={0}
                selectedDay={1}
                todayDay={1}
                matchDays={MATCH_DAYS}
                summary={{ premiership: 3, cup: 0 }}
              />
            </div>

            {/* ViewToggle standalone */}
            <div className="rounded-xl border p-6" style={{ background: "#091628", borderColor: "#1E2D45" }}>
              <div className="text-xs font-bold mb-4" style={{ color: "#C9A74C" }}>CalendarViewToggle</div>
              <div className="flex flex-col gap-4">
                <div>
                  <div className="text-xs mb-2" style={{ color: "#475569" }}>Month active</div>
                  <CalendarViewToggle value="month" />
                </div>
                <div>
                  <div className="text-xs mb-2" style={{ color: "#475569" }}>Day active</div>
                  <CalendarViewToggle value="day" />
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ── Component API ── */}
        <Section title="4 — Component API">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "CalendarDayView",
                code: `<CalendarDayView
  monthLabel="MARCH 2026"
  daysInMonth={31}
  startWeekday={0}   // 0=Sun, 1=Mon
  defaultDay={1}
  todayDay={3}
  matchDays={[
    { day: 1, dots: ["premiership", "cup"] },
  ]}
  matches={[
    { day: 1, kickoff: "14:00",
      status: "upcoming",
      competition: "premiership",
      matchday: 22,
      home: { name: "Charlotte FC", position: 1 },
      away: { name: "Durham United", position: 3 },
      venue: "Matthews Sportsplex" },
  ]}
  onSwitchToMonth={() => {}}
/>`,
              },
              {
                title: "CalendarMatchCard",
                code: `<CalendarMatchCard
  kickoff="14:00"
  status="upcoming"     // upcoming|live|fulltime|postponed
  competition="premiership"  // or "cup"
  matchday={22}
  minute={34}           // for live status
  home={{ name: "Charlotte FC", position: 1, score: 2 }}
  away={{ name: "Durham United", position: 3, score: 1 }}
  venue="Matthews Sportsplex, Charlotte NC"
  onClick={() => router.push("/matches/123")}
/>`,
              },
              {
                title: "DayPicker",
                code: `<DayPicker
  monthLabel="MARCH 2026"
  daysInMonth={31}
  startWeekday={0}      // weekday of the 1st (0=Sun)
  selectedDay={1}
  todayDay={3}
  matchDays={[
    { day: 1, dots: ["premiership", "premiership"] },
    { day: 7, dots: ["cup"] },
  ]}
  summary={{ premiership: 3, cup: 0 }}
  onDaySelect={(day) => setDay(day)}
  onPrevMonth={() => {}}
  onNextMonth={() => {}}
/>`,
              },
              {
                title: "CalendarViewToggle",
                code: `<CalendarViewToggle
  value="day"           // "month" | "day"
  onChange={(v) => setView(v)}
/>`,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border overflow-hidden"
                style={{ background: "white", borderColor: "#E2E8F0" }}
              >
                <div className="px-4 py-2.5 border-b" style={{ background: "#FAFBFF", borderColor: "#F1F5F9" }}>
                  <span className="text-xs font-bold" style={{ color: "#091628" }}>{item.title}</span>
                </div>
                <pre
                  className="text-[11px] leading-relaxed p-4 overflow-x-auto"
                  style={{ fontFamily: "'Fira Code', monospace", color: "#475569" }}
                >
                  {item.code}
                </pre>
              </div>
            ))}
          </div>
        </Section>

      </div>
    </div>
  );
}

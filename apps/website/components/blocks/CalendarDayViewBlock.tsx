"use client";
import { CalendarDayView } from "@/components/ds/CalendarDayView";
import { conferenceFor } from "@/lib/clubConferences";

interface Props {
  heading?: string;
  monthLabel?: string;
}

// ─── Sample match data — replace with a real fetch when match data is available ─

const MATCH_DAYS = [
  { day: 1,  dots: ["premiership" as const] },
  { day: 8,  dots: ["premiership" as const, "cup" as const] },
  { day: 15, dots: ["premiership" as const] },
  { day: 22, dots: ["premiership" as const, "cup" as const] },
  { day: 29, dots: ["premiership" as const] },
];

const MATCHES = [
  { day: 1,  kickoff: "12:00", home: { name: "Charlotte FC",      position: 1 }, away: { name: "Durham United",    position: 3 }, status: "upcoming" as const, competition: conferenceFor("Charlotte FC"),     matchday: 18, venue: "Memorial Stadium" },
  { day: 1,  kickoff: "14:00", home: { name: "Raleigh Athletic",  position: 2 }, away: { name: "Triangle FC",       position: 4 }, status: "upcoming" as const, competition: conferenceFor("Raleigh Athletic"),  matchday: 18, venue: "Dix Park" },
  { day: 8,  kickoff: "13:00", home: { name: "Greensboro FC",     position: 1 }, away: { name: "Winston-Salem SC",  position: 2 }, status: "upcoming" as const, competition: conferenceFor("Greensboro FC"),    matchday: 19, venue: "UNCG Stadium" },
  { day: 8,  kickoff: "16:00", home: { name: "Charlotte FC",      position: 1 }, away: { name: "Asheville FC",      position: 3 }, status: "upcoming" as const, competition: "cup"                           as const, matchday: 1,  venue: "Memorial Stadium" },
  { day: 15, kickoff: "12:00", home: { name: "Durham United",     position: 3 }, away: { name: "Coastal SC",        position: 5 }, status: "upcoming" as const, competition: conferenceFor("Durham United"),    matchday: 20, venue: "Durham Bulls Athletic" },
  { day: 15, kickoff: "14:30", home: { name: "Triangle FC",       position: 4 }, away: { name: "Charlotte FC",      position: 1 }, status: "upcoming" as const, competition: conferenceFor("Triangle FC"),      matchday: 20, venue: "Sahlen's Stadium" },
  { day: 22, kickoff: "13:00", home: { name: "Winston-Salem SC",  position: 2 }, away: { name: "Columbia United",   position: 4 }, status: "upcoming" as const, competition: conferenceFor("Winston-Salem SC"), matchday: 21, venue: "BB&T Field" },
  { day: 22, kickoff: "15:00", home: { name: "Greensboro FC",     position: 1 }, away: { name: "Charleston FC",     position: 5 }, status: "upcoming" as const, competition: "cup"                           as const, matchday: 2,  venue: "UNCG Stadium" },
  { day: 29, kickoff: "14:00", home: { name: "Charlotte FC",      position: 1 }, away: { name: "Greensboro FC",     position: 2 }, status: "upcoming" as const, competition: conferenceFor("Charlotte FC"),     matchday: 22, venue: "Memorial Stadium" },
];

export function CalendarDayViewBlock({ heading, monthLabel }: Props) {
  return (
    <section style={{ background: "#041124", padding: "64px 0" }}>
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)", fontWeight: 700, fontSize: 11, letterSpacing: "0.12em", color: "#D4B949", marginBottom: 10 }}>
            CAROLINA PREMIER SOCCER LEAGUE
          </div>
          <h2 style={{ fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)", fontWeight: 900, fontSize: 44, lineHeight: 1, color: "white", letterSpacing: "-0.5px" }}>
            {heading ?? "MATCH SCHEDULE"}
          </h2>
        </div>

        {/* Calendar */}
        <div style={{ border: "1px solid #1E2D45", borderRadius: 16, overflow: "hidden", height: 580 }}>
          <CalendarDayView
            monthLabel={monthLabel ?? "MARCH 2026"}
            daysInMonth={31}
            startWeekday={0}
            defaultDay={1}
            todayDay={3}
            matchDays={MATCH_DAYS}
            matches={MATCHES}
            onSwitchToMonth={() => {}}
          />
        </div>
      </div>
    </section>
  );
}

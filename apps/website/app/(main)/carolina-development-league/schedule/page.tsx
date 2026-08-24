import type { Metadata } from "next";
import { getCdlClubs, CDL_MATCHES, CDL_META, CDL_AGE_GROUPS } from "@/lib/cdlSchedule";
import { CalendarBody } from "./CalendarBody";

/** Revalidate hourly — newly renamed / added Sanity crests pick up fast. */
export const revalidate = 3600;

/**
 * Hidden page while we validate the schedule ingestion end-to-end.
 * `noindex` + no nav link = discoverable only by direct URL until the
 * Carolina Development League nav item exposes it as a child.
 */
export const metadata: Metadata = {
  title: "Match Calendar — Carolina Development League",
  description: "Fall 2026 CDL fixtures across every age group. Pick a date to see that day's matches.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default async function CalendarPage() {
  const clubs = await getCdlClubs();
  return (
    <main style={{ background: "#041124", minHeight: "100vh" }}>
      <header
        style={{
          background:   "#041124",
          borderBottom: "1px solid #1E2D45",
          paddingTop:    36,
          paddingBottom: 36,
        }}
      >
        <div
          className="max-w-7xl mx-auto w-full px-4 sm:px-6"
          style={{ display: "flex", flexDirection: "column", gap: 6 }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
            <h1
              className="text-4xl sm:text-5xl lg:text-[48px]"
              style={{
                fontFamily:    "'Barlow Condensed', sans-serif",
                fontWeight:    900,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color:         "#F4EFE6",
                lineHeight:    1,
                margin:        0,
              }}
            >
              Match Calendar
            </h1>
            <span
              style={{
                fontFamily:    "'Barlow Condensed', sans-serif",
                fontWeight:    600,
                fontSize:      18,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color:         "#D4B949",
                lineHeight:    1,
                whiteSpace:    "nowrap",
              }}
            >
              Fall 2026
            </span>
          </div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize:   14,
              color:      "#8899B0",
              margin:     "10px 0 0",
              lineHeight: 1.5,
              maxWidth:   760,
            }}
          >
            The CDL schedule is managed by the leaders of CDL participant clubs. You
            should always verify your CDL game dates and times with your CDL club
            director, as games and times are subject to change.
          </p>
        </div>
      </header>
      <CalendarBody clubs={clubs} matches={CDL_MATCHES} ageGroups={CDL_AGE_GROUPS} showGender />
    </main>
  );
}

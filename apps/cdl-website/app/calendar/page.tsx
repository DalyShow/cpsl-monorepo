import type { Metadata } from "next";
import Link from "next/link";
import { CDL_CLUBS, CDL_MATCHES, CDL_META, CDL_AGE_GROUPS } from "@/lib/cdlSchedule";
import { CalendarBody } from "./CalendarBody";

export const metadata: Metadata = {
  title: "Match Calendar — Carolina Development League",
  description: "Fall 2026 CDL fixtures across every age group. Pick a date to see that day's matches.",
};

export default function CalendarPage() {
  return (
    <main style={{ background: "#041124", minHeight: "100vh" }}>
      <header
        style={{
          background:    "#1A2438",
          borderBottom:  "1px solid #1E2D45",
          padding:       "36px 0",
        }}
      >
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
            <h1
              className="text-4xl sm:text-5xl lg:text-[48px]"
              style={{
                fontFamily:     "'Barlow Condensed', sans-serif",
                fontWeight:     900,
                letterSpacing:  "0.04em",
                textTransform:  "uppercase",
                color:          "#F4EFE6",
                lineHeight:     1,
                margin:         0,
              }}
            >
              Match Calendar
            </h1>
            <span
              style={{
                fontFamily:     "'Barlow Condensed', sans-serif",
                fontWeight:     600,
                fontSize:       18,
                letterSpacing:  "0.12em",
                textTransform:  "uppercase",
                color:          "#D4B949",
                lineHeight:     1,
              }}
            >
              Fall 2026
            </span>
          </div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize:   13,
              color:      "#8899B0",
              margin:     "6px 0 0",
            }}
          >
            {CDL_META.matchCount} fixtures across every CDL age group ·{" "}
            <Link href="/" style={{ color: "#D4B949" }}>← Home</Link>
          </p>
        </div>
      </header>

      <CalendarBody clubs={CDL_CLUBS} matches={CDL_MATCHES} ageGroups={CDL_AGE_GROUPS} />
    </main>
  );
}

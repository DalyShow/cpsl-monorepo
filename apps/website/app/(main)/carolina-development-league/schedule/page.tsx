import type { Metadata } from "next";
import { SectionHeader } from "@/components/blocks/SectionHeader";
import { CDL_CLUBS, CDL_MATCHES, CDL_META, CDL_AGE_GROUPS } from "@/lib/cdlSchedule";
import { CalendarBody } from "./CalendarBody";

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

export default function CalendarPage() {
  return (
    <main style={{ background: "#041124", minHeight: "100vh" }}>
      <SectionHeader
        title="Match Calendar"
        badge="CDL — Fall 2026"
        subtitle={`${CDL_META.matchCount} fixtures across every CDL age group · Pick a date to see that day's matches`}
      />
      <CalendarBody clubs={CDL_CLUBS} matches={CDL_MATCHES} ageGroups={CDL_AGE_GROUPS} />
    </main>
  );
}

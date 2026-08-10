import type { Metadata } from "next";
import { SectionHeader } from "@/components/blocks/SectionHeader";
import { fetchCalendarClubs } from "@/lib/sanity/calendarClubs";
import { MOCK_CLUBS, buildMockMatches } from "@/lib/mockCalendar";
import { CalendarBody } from "./CalendarBody";

export const metadata: Metadata = {
  title: "Match Calendar — Carolina Premier Soccer League",
  description: "Pick a date to see that day's fixtures across every CPSL conference.",
  alternates: { canonical: "/calendar" },
  openGraph: { url: "/calendar" },
};

/** Rebuild every 10 minutes so newly named clubs in Sanity land quickly. */
export const revalidate = 600;

export default async function CalendarPage() {
  const sanityClubs = await fetchCalendarClubs();
  const clubs       = sanityClubs.length > 0 ? sanityClubs : MOCK_CLUBS;
  const matches     = buildMockMatches(clubs);
  const usingFallback = sanityClubs.length === 0;

  return (
    <main style={{ background: "#041124", minHeight: "100vh" }}>
      <SectionHeader
        title="Match Calendar"
        badge="2026–2027 Season"
        subtitle="Pick a date to see that day's fixtures across every CPSL conference"
      />
      <CalendarBody clubs={clubs} matches={matches} usingFallback={usingFallback} />
    </main>
  );
}

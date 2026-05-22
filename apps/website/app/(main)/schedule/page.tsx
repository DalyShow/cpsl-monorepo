import type { Metadata } from "next";
import { SectionHeader } from "@/components/blocks/SectionHeader";
import { MatchdayBlock } from "@/components/blocks/ScheduleByConferenceBlock";

export const metadata: Metadata = {
  title: "Schedule — Carolina Premier Soccer League",
  description: "Match schedule, fixtures, and results for the Carolina Premier Soccer League 2026–2027 season.",
  alternates: { canonical: "/schedule" },
  openGraph: { url: "/schedule" },
};

export default async function SchedulePage() {
  return (
    <main style={{ background: "#041124", minHeight: "100vh" }}>
      <SectionHeader
        title="Schedule"
        badge="2026–2027 Season"
        subtitle="Select a conference to filter matchday results"
      />
      <MatchdayBlock />
    </main>
  );
}

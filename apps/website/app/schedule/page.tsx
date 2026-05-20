import type { Metadata } from "next";
import { TopNav } from "@cpsl/ui";
import { SectionHeader } from "@/components/blocks/SectionHeader";
import { MatchdayBlock } from "@/components/blocks/ScheduleByConferenceBlock";
import { sanityFetch } from "@/lib/sanity/client";
import {
  NAV_ITEMS_GROQ,
  resolveTopNavItems,
  type SiteNavSettings,
} from "@/lib/nav-items";

export const metadata: Metadata = {
  title: "Schedule — Carolina Premier Soccer League",
  description: "Match schedule, fixtures, and results for the Carolina Premier Soccer League 2026–2027 season.",
  alternates: { canonical: "/schedule" },
  openGraph: { url: "/schedule" },
};

export default async function SchedulePage() {
  let settings: SiteNavSettings | null = null;
  try {
    settings = await sanityFetch<SiteNavSettings>(
      `*[_type == "siteSettings"][0]{ ${NAV_ITEMS_GROQ}, ctaLabel, ctaHref }`
    );
  } catch { /* use defaults */ }

  return (
    <>
      <TopNav
        items={resolveTopNavItems(settings?.navItems)}
        ctaLabel={settings?.ctaLabel ?? "Join Our League"}
        ctaHref={settings?.ctaHref ?? "/apply"}
        showLive={false}
      />
      <main className="pt-20" style={{ background: "#041124", minHeight: "100vh" }}>
        <SectionHeader
          title="Schedule"
          badge="2026–2027 Season"
          subtitle="Select a conference to filter matchday results"
        />
        <MatchdayBlock />
      </main>
    </>
  );
}

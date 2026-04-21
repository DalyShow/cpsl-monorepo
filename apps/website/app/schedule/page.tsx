import { TopNav } from "@/components/ds/TopNav";
import { SectionHeader } from "@/components/blocks/SectionHeader";
import { MatchdayBlock } from "@/components/blocks/ScheduleByConferenceBlock";
import { sanityFetch } from "@/lib/sanity/client";

type NavSettings = {
  navItems?: { label: string; href: string }[];
  ctaLabel?: string;
  ctaHref?: string;
};

export default async function SchedulePage() {
  let settings: NavSettings | null = null;
  try {
    settings = await sanityFetch<NavSettings>(
      `*[_type == "siteSettings"][0]{ navItems, ctaLabel, ctaHref }`
    );
  } catch { /* use defaults */ }

  return (
    <>
      <TopNav
        items={settings?.navItems ?? undefined}
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

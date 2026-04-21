import { TopNav } from "@/components/ds/TopNav";
import { ClubDirectory } from "@/components/ds/ClubDirectory";
import { fetchClubs } from "@/lib/clubs";
import { sanityFetch } from "@/lib/sanity/client";

type NavSettings = {
  navItems?: { label: string; href: string }[];
  ctaLabel?: string;
  ctaHref?: string;
};

export default async function ClubsPage() {
  const [settings, clubs] = await Promise.all([
    sanityFetch<NavSettings>(
      `*[_type == "siteSettings"][0]{ navItems, ctaLabel, ctaHref }`
    ),
    fetchClubs(),
  ]);

  return (
    <>
      <TopNav
        items={settings?.navItems ?? undefined}
        ctaLabel={settings?.ctaLabel ?? "Join Our League"}
        ctaHref={settings?.ctaHref ?? "/apply"}
        showLive={false}
      />

      <main className="pt-20" style={{ background: "#041124", minHeight: "100vh" }}>
        {/* Page header */}
        <div style={{ borderBottom: "1px solid #1E2D45", padding: "48px 0 40px" }}>
          <div className="max-w-5xl mx-auto px-6">
            <div
              style={{
                fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "0.12em",
                color: "#D4B949",
                marginBottom: 10,
              }}
            >
              CAROLINA PREMIER SOCCER LEAGUE
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)",
                fontWeight: 900,
                fontSize: 48,
                lineHeight: 1,
                color: "white",
                letterSpacing: "-0.5px",
                marginBottom: 12,
              }}
            >
              CLUB DIRECTORY
            </h1>
            <p style={{ fontSize: 15, color: "#64748B", maxWidth: 480 }}>
              All member clubs of the Carolina Premier Soccer League across North and South Carolina.
            </p>
          </div>
        </div>

        {/* Directory */}
        <div className="max-w-5xl mx-auto px-6 py-10">
          {clubs.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 0",
                fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)",
                color: "#475569",
                fontSize: 16,
              }}
            >
              Club directory coming soon.
            </div>
          ) : (
            <ClubDirectory clubs={clubs} />
          )}
        </div>
      </main>
    </>
  );
}

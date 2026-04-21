import { ClubDirectory } from "@/components/ds/ClubDirectory";
import { fetchClubs } from "@/lib/clubs";

interface Props {
  heading?: string;
  subheading?: string;
}

export async function ClubDirectoryBlock({ heading, subheading }: Props) {
  const clubs = await fetchClubs();

  return (
    <section style={{ background: "#041124", padding: "64px 0" }}>
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div style={{ marginBottom: 40, borderBottom: "1px solid #1E2D45", paddingBottom: 32 }}>
          <div style={{ fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)", fontWeight: 700, fontSize: 11, letterSpacing: "0.12em", color: "#D4B949", marginBottom: 10 }}>
            CAROLINA PREMIER SOCCER LEAGUE
          </div>
          <h2 style={{ fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)", fontWeight: 900, fontSize: 44, lineHeight: 1, color: "white", letterSpacing: "-0.5px", marginBottom: 12 }}>
            {heading ?? "CLUB DIRECTORY"}
          </h2>
          {subheading && (
            <p style={{ fontSize: 15, color: "#64748B", maxWidth: 480 }}>
              {subheading}
            </p>
          )}
        </div>

        {/* Directory */}
        {clubs.length === 0 ? (
          <div style={{ textAlign: "center", padding: "64px 0", color: "#475569", fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)", fontSize: 16 }}>
            Club directory coming soon.
          </div>
        ) : (
          <ClubDirectory clubs={clubs} />
        )}
      </div>
    </section>
  );
}

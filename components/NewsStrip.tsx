import { StatusBadge } from "./ds/StatusBadge";

const NEWS = [
  {
    tag: "featured" as const,
    tagLabel: "Feature",
    date: "Mar 1, 2026",
    headline: "Charlotte FC Clinch Record Points Tally With Four Matches Remaining",
    excerpt: "An emphatic 3–0 victory over Raleigh Athletic on Saturday put Charlotte ahead of the pack with an unassailable lead in points.",
  },
  {
    tag: "new" as const,
    tagLabel: "Transfer",
    date: "Feb 28, 2026",
    headline: "Winter Window Recap: 14 Moves Shake Up the CPSL Landscape",
    excerpt: "Durham United led the way with four acquisitions while Greensboro SC secured two targeted signings to bolster their squad depth.",
  },
  {
    tag: "cup" as const,
    tagLabel: "Cup",
    date: "Feb 26, 2026",
    headline: "CPSL Cup Quarter-Final Draw: All Eyes on Triangle FC vs Charlotte Clash",
    excerpt: "The draw produced the mouth-watering tie the league has been waiting for — two top-six sides meeting at Durham Athletic Park.",
  },
];

export function NewsStrip() {
  return (
    <section id="news" style={{ background: "#020B1A", borderTop: "1px solid #1E2D45" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-24">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#4A78E8" }}>Latest</p>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-black uppercase"
              style={{ fontFamily: "var(--font-display)", color: "white", letterSpacing: "-1px" }}
            >
              News
            </h2>
          </div>
          <button className="hidden md:block text-sm font-semibold hover:opacity-70 transition-opacity" style={{ color: "#475569" }}>
            All articles →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NEWS.map((item, i) => (
            <article
              key={i}
              className="rounded-2xl border overflow-hidden group cursor-pointer hover:border-[#4A78E8] transition-colors"
              style={{ background: "#0A0E1A", borderColor: "#1E2D45" }}
            >
              {/* Image placeholder */}
              <div
                className="w-full h-44 relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, #1E2D45 0%, #0A0E1A 100%)` }}
              >
                {/* Diagonal motif on each card */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: `linear-gradient(135deg, ${i === 0 ? "#4A78E8" : i === 1 ? "#BFA05A" : "#8B40D4"} 0%, transparent 60%)`,
                  }}
                />
                <div
                  className="absolute bottom-3 right-3 text-3xl font-black opacity-20"
                  style={{ fontFamily: "var(--font-display)", color: "white" }}
                >
                  CPSL
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <StatusBadge label={item.tagLabel} variant={item.tag} />
                  <span className="text-xs" style={{ color: "#475569" }}>{item.date}</span>
                </div>
                <h3
                  className="text-base font-bold leading-snug mb-2 group-hover:text-[#4A78E8] transition-colors"
                  style={{ color: "white" }}
                >
                  {item.headline}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "#64748B" }}>
                  {item.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

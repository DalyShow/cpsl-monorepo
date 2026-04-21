import Link from "next/link";

export function CtaBanner() {
  return (
    <section style={{ background: "#0A0E1A", borderTop: "1px solid #1E2D45" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <div
          className="relative rounded-3xl overflow-hidden px-8 sm:px-16 py-14 sm:py-20 text-center"
          style={{ background: "linear-gradient(135deg, #1E2D45 0%, #020B1A 100%)", border: "1px solid #4A78E833" }}
        >
          {/* Gold accent bar */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-0.5" style={{ background: "#BFA05A" }} />

          {/* Ghost shield */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
            <svg viewBox="0 0 400 460" className="w-96 opacity-[0.035]" fill="none">
              <path d="M40 20L360 20L360 260C360 380 200 440 200 440C200 440 40 380 40 260Z" stroke="white" strokeWidth="2" />
              <path d="M40 20L360 260" stroke="white" strokeWidth="1.5" strokeDasharray="8 8" />
            </svg>
          </div>

          <div className="relative">
            <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#BFA05A" }}>
              2025–26 Season
            </p>
            <h2
              className="text-5xl sm:text-7xl font-black uppercase mb-6"
              style={{ fontFamily: "var(--font-display)", color: "white", letterSpacing: "-2px" }}
            >
              Be Part of the<br />
              <span style={{ color: "#4A78E8" }}>League</span>
            </h2>
            <p className="text-base sm:text-lg mb-10 max-w-xl mx-auto" style={{ color: "#94A3B8" }}>
              Season tickets, match-day experiences, and exclusive club access — across 22 clubs in North and South Carolina.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="#schedule"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white transition-all hover:opacity-90"
                style={{ background: "#4A78E8" }}
              >
                Buy Season Tickets
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="#standings"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold transition-all hover:opacity-80"
                style={{ background: "#1E2D45", color: "#94A3B8" }}
              >
                Explore Teams
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";

const FOOTER_LINKS = {
  League: ["Standings", "Schedule", "Results", "Stats", "Awards"],
  Teams:  ["Charlotte FC", "Raleigh Athletic", "Durham United", "Triangle FC", "All Clubs"],
  Info:   ["About CPSL", "Governance", "Referee Hub", "Youth Academy", "Contact"],
  Media:  ["Press Room", "Broadcast", "Photography", "Brand Assets", "Partners"],
};

export function SiteFooter() {
  return (
    <footer style={{ background: "#020B1A", borderTop: "1px solid #1E2D45" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-10">

        {/* Top row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#4A78E8" }}>
                <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
                  <path d="M1 1L15 1L15 12C15 16 8 17 8 17C8 17 1 16 1 12Z" fill="none" stroke="white" strokeWidth="1.5" />
                  <path d="M4 9.5L8 6L12 9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <div className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-display)" }}>CPSL</div>
                <div className="text-[10px] tracking-widest" style={{ color: "#475569", fontFamily: "var(--font-display)" }}>CAROLINA PREMIER</div>
              </div>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "#475569", maxWidth: 200 }}>
              The elite soccer league spanning North and South Carolina. Est. 2018.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4
                className="text-xs font-bold tracking-widest uppercase mb-4"
                style={{ color: "#94A3B8" }}
              >
                {category}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm transition-colors hover:opacity-80"
                      style={{ color: "#475569" }}
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Gold divider */}
        <div className="h-px mb-8" style={{ background: "linear-gradient(to right, #BFA05A44, transparent)" }} />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "#475569" }}>
            © 2026 Carolina Premier Soccer League. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs" style={{ color: "#475569" }}>
            <Link href="#" className="hover:opacity-80">Privacy Policy</Link>
            <Link href="#" className="hover:opacity-80">Terms of Use</Link>
            <Link href="#" className="hover:opacity-80">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

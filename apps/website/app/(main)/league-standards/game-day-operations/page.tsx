import type { Metadata } from "next";

/**
 * CPSL N1 Game Day Operations Guide — one page, three stacked division
 * sections (Premier 1 Gold, Premier 1 Navy, Premier 2), each with the
 * match-day requirements table and pre-match quick check from the
 * printed guide. Static content; unlinked + noindex while under review.
 */
/** Revalidate hourly so layout-level nav edits in Sanity reach this
 *  otherwise-static page without a redeploy. */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Game Day Operations Guide — CPSL N1",
  description:
    "Match day requirements and pre-match checklists for CPSL N1 Premier 1 Gold, Premier 1 Navy, and Premier 2 divisions.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

// ─── Small helpers ──────────────────────────────────────────────────────────

function B({ children }: { children: React.ReactNode }) {
  return <strong style={{ color: "#F4EFE6", fontWeight: 600 }}>{children}</strong>;
}

type Row = { req: string; standard: React.ReactNode };

// Rows shared by every division. Trainer + tents differ per division and
// are spliced in at build time below.
const ROW_MATCH_REPORT: Row = {
  req: "Match Report & Match Day Addendum",
  standard: (
    <>A printed <B>GotSport Match Report</B>{" should be handed to the Referee along with the "}<B>Game Day Addendum</B>.</>
  ),
};
const ROW_UNIFORMS: Row = {
  req: "Uniforms",
  standard: (
    <>
      <B>Home Team:</B>{" Light color · "}<B>Away Team:</B>{" Dark color"}
      <br />
      {"Uniform selections should follow the approved uniform matrix."}
    </>
  ),
};
const ROW_BENCHES: Row = {
  req: "Benches",
  standard: <>{"Benches should be in place for both the "}<B>Home</B>{" and "}<B>Away</B>{" teams."}</>,
};
const ROW_WATER: Row = {
  req: "Water & Ice",
  standard: <>{"Water and ice must be provided for both the "}<B>Home</B>{" and "}<B>Away</B>{" teams."}</>,
};
const ROW_FLAGS: Row = {
  req: "Corner Flags",
  standard: <>{"Corner flags must be in place prior to the start of the match."}</>,
};
const ROW_BALLS: Row = {
  req: "Game Balls",
  standard: <>{"A minimum of "}<B>2 High Quality Game Balls</B>{" should be presented to the Referee for game use."}</>,
};
const ROW_FEES: Row = {
  req: "Referee Fees",
  standard: <><B>Home Team responsibility.</B>{" The Home Team is responsible for referee fees."}</>,
};

function buildRows(trainer: React.ReactNode, tents: React.ReactNode): Row[] {
  return [
    ROW_MATCH_REPORT,
    ROW_UNIFORMS,
    { req: "Athletic Trainer", standard: trainer },
    { req: "Matching Tents",   standard: tents },
    ROW_BENCHES,
    ROW_WATER,
    ROW_FLAGS,
    ROW_BALLS,
    ROW_FEES,
  ];
}

const SHARED_CHECK_HEAD = [
  "Printed GotSport Match Report & Game Day Addendum ready for Referee",
  "Home team in light uniform / Away team in dark uniform",
];
const SHARED_CHECK_TAIL = [
  "Home & Away benches in place",
  "Water & ice available for both teams",
  "Corner flags in place",
  "Minimum of 2 High Quality Game Balls presented to the Referee",
  "Referee fees - Home Team responsibility",
];

const DIVISIONS = [
  {
    id:     "premier-1-gold",
    label:  "Premier 1 — Gold Division",
    accent: "#D4B949",
    intro:
      "The following standards are required for Premier 1 - Gold Division matches. Home clubs should ensure all game-day requirements are in place prior to kickoff.",
    rows: buildRows(
      <B>Athletic Trainers are mandatory for the duration of the game.</B>,
      <B>Matching tents should be provided for Home &amp; Away team benches.</B>,
    ),
    checklist: [
      ...SHARED_CHECK_HEAD,
      "Athletic Trainer present for the duration of the game - mandatory",
      "Matching tents should be provided for Home & Away team benches",
      ...SHARED_CHECK_TAIL,
    ],
  },
  {
    id:     "premier-1-navy",
    label:  "Premier 1 — Navy Division",
    accent: "#93C5FD",
    intro:
      "The following standards are required for Premier 1 - Navy Division matches. Home clubs should ensure all game-day requirements are in place prior to kickoff.",
    rows: buildRows(
      <B>Not mandatory, but highly encouraged.</B>,
      <B>Matching tents should be provided for Home &amp; Away team benches.</B>,
    ),
    checklist: [
      ...SHARED_CHECK_HEAD,
      "Athletic Trainer - not mandatory, but highly encouraged",
      "Matching tents should be provided for Home & Away team benches",
      ...SHARED_CHECK_TAIL,
    ],
  },
  {
    id:     "premier-2",
    label:  "Premier 2",
    accent: "#94A3B8",
    intro:
      "The following standards are required for Premier 2 matches. Home clubs should ensure all game-day requirements are in place prior to kickoff.",
    rows: buildRows(
      <B>Not mandatory, but highly encouraged.</B>,
      <B>Matching tents are encouraged for the Home &amp; Away team bench areas.</B>,
    ),
    checklist: [
      ...SHARED_CHECK_HEAD,
      "Athletic Trainer - not mandatory, but highly encouraged",
      "Matching tents encouraged for Home & Away team bench areas",
      ...SHARED_CHECK_TAIL,
    ],
  },
];

// ─── Components ─────────────────────────────────────────────────────────────

function RequirementsTable({ rows, accent }: { rows: Row[]; accent: string }) {
  return (
    <div
      className="gdo-table"
      style={{
        border:     "1px solid #1E2D45",
        background: "#0A1628",
        marginBottom: 28,
      }}
    >
      <div
        className="gdo-table__row"
        style={{
          display:             "grid",
          gridTemplateColumns: "minmax(170px, 1fr) 2.6fr",
          background:          "#1A2438",
          fontFamily:          "'Barlow Condensed', sans-serif",
          fontWeight:          700,
          fontSize:            13,
          letterSpacing:       "0.14em",
          textTransform:       "uppercase",
          color:               "#F4EFE6",
          borderTop:           `2px solid ${accent}`,
        }}
      >
        <div style={{ padding: "11px 16px", borderRight: "1px solid #1E2D45" }}>Requirement</div>
        <div style={{ padding: "11px 16px" }}>Game Day Standard</div>
      </div>
      {rows.map((row, i) => (
        <div
          key={i}
          className="gdo-table__row"
          style={{
            display:             "grid",
            gridTemplateColumns: "minmax(170px, 1fr) 2.6fr",
            borderTop:           "1px solid #1E2D45",
            fontFamily:          "Inter, sans-serif",
            fontSize:            14,
            lineHeight:          1.55,
          }}
        >
          <div
            style={{
              padding:       "13px 16px",
              borderRight:   "1px solid #1E2D45",
              fontFamily:    "'Barlow Condensed', sans-serif",
              fontWeight:    700,
              fontSize:      15,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color:         "#7A9BAA",
            }}
          >
            {row.req}
          </div>
          <div style={{ padding: "13px 16px", color: "#C8D2DF" }}>{row.standard}</div>
        </div>
      ))}
    </div>
  );
}

function QuickCheck({ items, accent }: { items: string[]; accent: string }) {
  return (
    <div style={{ border: "1px solid #1E2D45", background: "#0A1628" }}>
      <div
        style={{
          background:    "#1A2438",
          borderTop:     `2px solid ${accent}`,
          padding:       "11px 16px",
          fontFamily:    "'Barlow Condensed', sans-serif",
          fontWeight:    700,
          fontSize:      13,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color:         "#F4EFE6",
        }}
      >
        Pre-Match Quick Check
      </div>
      <ul
        style={{
          listStyle:     "none",
          margin:        0,
          padding:       "16px 16px 18px",
          display:       "flex",
          flexDirection: "column",
          gap:           10,
        }}
      >
        {items.map((item, i) => (
          <li
            key={i}
            style={{
              display:    "flex",
              alignItems: "flex-start",
              gap:        12,
              fontFamily: "Inter, sans-serif",
              fontSize:   14,
              lineHeight: 1.5,
              color:      "#C8D2DF",
            }}
          >
            <span
              aria-hidden
              style={{
                width:       15,
                height:      15,
                flexShrink:  0,
                marginTop:   2,
                border:      `1.5px solid ${accent}`,
                borderRadius: 2,
              }}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function GameDayOperationsPage() {
  return (
    <main style={{ background: "#041124", minHeight: "100vh" }}>
      {/* ── Hero — fullscreen photo, matching the Inclement Weather
             page's HeroBlock recipe: pulls up behind the transparent
             logo ticker, scrim + 0.55 image opacity, bottom blend into
             navy, centered copy. ─────────────────────────────────── */}
      <header
        style={{
          position:       "relative",
          marginTop:      "-78px",
          minHeight:      "100svh",
          paddingTop:     "clamp(96px, 18vh, 174px)",
          paddingRight:   "clamp(16px, 5vw, 24px)",
          paddingBottom:  "calc(clamp(56px, 10vh, 96px) + env(safe-area-inset-bottom))",
          paddingLeft:    "clamp(16px, 5vw, 24px)",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          zIndex:         0,
          background:     "#041124",
          overflow:       "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset:    0,
            background:
              "linear-gradient(to bottom, rgba(9,22,40,0.72) 0%, rgba(9,22,40,0.50) 55%, rgba(9,22,40,0.20) 100%), url(/gameday/gameday-hero.jpg) center/cover no-repeat",
            opacity:       0.55,
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            left:     0,
            right:    0,
            bottom:   0,
            height:   "35%",
            background:
              "linear-gradient(to bottom, rgba(4,17,36,0) 0%, rgba(4,17,36,1) 100%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position:  "relative",
            zIndex:    1,
            maxWidth:  "860px",
            margin:    "0 auto",
            padding:   "0 24px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily:    "'Barlow Condensed', sans-serif",
              fontWeight:    600,
              fontSize:      "13px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color:         "#D4B949",
              marginBottom:  "20px",
            }}
          >
            CPSL N1
          </p>
          <h1
            style={{
              fontFamily:    "'Barlow Condensed', sans-serif",
              fontWeight:    900,
              fontSize:      "clamp(48px, 8vw, 88px)",
              lineHeight:    1.0,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              color:         "#F4EFE6",
              margin:        "0 0 24px",
            }}
          >
            Game Day Operations Guide
          </h1>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize:   "clamp(16px, 2vw, 20px)",
              lineHeight: 1.65,
              color:      "#D7DEE8",
              margin:     "0 auto 32px",
              maxWidth:   620,
            }}
          >
            {"Match day requirements and pre-match checklists for every CPSL N1 division. Home clubs should have all standards in place prior to kickoff."}
          </p>

          {/* Division jump chips */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
            {DIVISIONS.map((d) => (
              <a
                key={d.id}
                href={`#${d.id}`}
                style={{
                  display:        "inline-flex",
                  alignItems:     "center",
                  gap:            8,
                  border:         "1px solid rgba(244,239,230,0.35)",
                  background:     "rgba(4,17,36,0.45)",
                  color:          "#F4EFE6",
                  fontFamily:     "'Barlow Condensed', sans-serif",
                  fontWeight:     700,
                  fontSize:       13,
                  letterSpacing:  "0.12em",
                  textTransform:  "uppercase",
                  padding:        "9px 16px",
                  borderRadius:   999,
                  textDecoration: "none",
                }}
              >
                <span
                  aria-hidden
                  style={{ width: 8, height: 8, borderRadius: 999, background: d.accent, flexShrink: 0 }}
                />
                {d.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* ── Division sections ──────────────────────────────────── */}
      <div
        className="max-w-7xl mx-auto w-full px-4 sm:px-6"
        style={{ paddingTop: 56, paddingBottom: 80 }}
      >
        {DIVISIONS.map((d, i) => (
          <section
            key={d.id}
            id={d.id}
            style={{
              scrollMarginTop: 110,
              marginBottom:    i === DIVISIONS.length - 1 ? 0 : 72,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
              <span
                aria-hidden
                style={{ width: 12, height: 12, borderRadius: 999, background: d.accent, flexShrink: 0 }}
              />
              <h2
                style={{
                  fontFamily:     "'Barlow Condensed', sans-serif",
                  fontWeight:     900,
                  fontSize:       "clamp(26px, 3.4vw, 36px)",
                  letterSpacing:  "0.03em",
                  textTransform:  "uppercase",
                  color:          "#F4EFE6",
                  lineHeight:     1,
                  margin:         0,
                }}
              >
                {d.label}
              </h2>
            </div>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize:   14,
                lineHeight: 1.65,
                color:      "#94A3B8",
                margin:     "0 0 24px",
                maxWidth:   720,
              }}
            >
              {d.intro}
            </p>

            <RequirementsTable rows={d.rows} accent={d.accent} />
            <QuickCheck items={d.checklist} accent={d.accent} />
          </section>
        ))}
      </div>

      <style>{`
        html { scroll-behavior: smooth; }
        @media (max-width: 640px) {
          .gdo-table__row {
            grid-template-columns: 1fr !important;
          }
          .gdo-table__row > div:first-child {
            border-right: none !important;
            padding-bottom: 2px !important;
          }
          .gdo-table__row > div:last-child {
            padding-top: 2px !important;
          }
        }
      `}</style>
    </main>
  );
}

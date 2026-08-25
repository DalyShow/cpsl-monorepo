import type { Metadata } from "next";

/**
 * The full RFP document, structured for the web: sticky anchor nav on
 * desktop, jump-chips on mobile, styled tables, and a Download RFP
 * button serving the original PDF.
 *
 * Static content by design — the RFP is a fixed-term document (proposals
 * due 9/11/26); edits go through code review, not Studio.
 */
/** Revalidate hourly so layout-level nav edits in Sanity reach this
 *  otherwise-static page without a redeploy. */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "RFP: Tournament Series & Team Travel Management — CPSL",
  description:
    "Request for Proposal — Tournament Series & Team Travel Management Services for the Carolina Premier Soccer League 2026–27 season.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

const PDF_HREF = "/documents/CPSL_RFP_Tournament_Travel_Management.pdf";

// ─── Section registry (drives the anchor nav) ───────────────────────────────

const NAV = [
  { id: "introduction",   n: "1",  label: "Introduction & Background" },
  { id: "purpose",        n: "2",  label: "Purpose & Objectives" },
  { id: "term",           n: "3",  label: "Term of Agreement" },
  { id: "events",         n: "4",  label: "2026–27 Event Schedule" },
  { id: "scope",          n: "5",  label: "Scope of Services" },
  { id: "qualifications", n: "6",  label: "Proposer Qualifications" },
  { id: "submission",     n: "7",  label: "Submission Requirements" },
  { id: "evaluation",     n: "8",  label: "Evaluation Criteria" },
  { id: "timeline",       n: "9",  label: "Timeline & Instructions" },
  { id: "terms",          n: "10", label: "General Terms & Conditions" },
  { id: "contact",        n: "11", label: "Contact Information" },
];

// ─── Content data ───────────────────────────────────────────────────────────

const EVENTS = [
  {
    id: "4.1",
    name: "CPSL U15–U19 Girls Championships",
    rows: [
      ["Dates", "January 16–18, 2027 (Saturday–Monday)"],
      ["Location", "Charlotte, NC – Matthews Sportsplex"],
      ["Field of Play", "66 teams total / 44 teams (≈67%) traveling from outside 90 miles"],
      ["Divisions", "Premier 1 Gold and Navy Divisions"],
      ["Format", "2-game guarantee Saturday and Sunday; Championship games Monday"],
    ],
  },
  {
    id: "4.2",
    name: "CPSL U13–U14 Girls Playoffs",
    rows: [
      ["Dates", "May 1–2, 2027 (Saturday–Sunday)"],
      ["Location", "Charlotte, NC – OrthoCarolina Sportsplex"],
      ["Field of Play", "40 teams total / 26 teams (≈65%) traveling from outside 90 miles"],
      ["Divisions", "Premier 1 Gold and Navy Divisions"],
      ["Format", "2-game guarantee Saturday and Sunday; Showcase bracket finals Sunday"],
    ],
  },
  {
    id: "4.3",
    name: "CPSL U13–U19 Boys Playoffs",
    rows: [
      ["Dates", "May 1–2, 2027 (Saturday–Sunday) — concurrent with 4.2"],
      ["Location", "Raleigh, NC – WRAL Soccer Park"],
      ["Field of Play", "163 teams total / 82 teams (≈50%) traveling from outside 90 miles"],
      ["Divisions", "Premier 1 Gold and Navy Divisions"],
      ["Format", "2-game guarantee Saturday and Sunday; Showcase bracket finals Sunday"],
    ],
  },
  {
    id: "4.4",
    name: "CPSL Premier 2 Championships",
    rows: [
      ["Dates", "May 15–16, 2027 (Saturday–Sunday) — concurrent with 4.5"],
      ["Location", "Wilmington, NC – nCino Sports Park"],
      ["Field of Play", "80 teams total (Premier 2 Boys) / 71 teams (≈89%) traveling from outside 90 miles"],
      ["Divisions", "Premier 2 Boys"],
      ["Format", "2-game guarantee Saturday and Sunday"],
    ],
  },
  {
    id: "4.5",
    name: "CPSL U13–U14 Girls / U13–U19 Boys Championships",
    rows: [
      ["Dates", "May 15–16, 2027 (Saturday–Sunday) — concurrent with 4.4"],
      ["Location", "Wilson, NC – J. Burt Gillette Athletic Complex"],
      ["Field of Play", "32 teams total / ~16 teams (≈50%) traveling from outside 90 miles"],
      ["Divisions", "Girls U13–U14; Boys U13–U19"],
      ["Format", "Semi-finals Saturday; Championship Sunday"],
    ],
  },
];

const CRITERIA = [
  ["Relevant experience & references", "20%"],
  ["Quality and depth of proposed scope-of-services approach", "20%"],
  ["Hotel sourcing strength / market relationships in host cities", "15%"],
  ["Technology & reporting capabilities", "15%"],
  ["Fee structure, transparency, and overall value to CPSL", "20%"],
  ["Staffing plan & capacity for concurrent events", "10%"],
];

const TIMELINE = [
  ["RFP Issued", "August 24, 2026"],
  ["Deadline for Proposer Questions", "September 4, 2026"],
  ["CPSL Responses to Questions Issued", "September 8, 2026"],
  ["Proposals Due", "September 11, 2026 · 5:00 PM EST"],
  ["Finalist Interviews / Presentations (if applicable)", "Week of September 21"],
  ["Anticipated Award Notification", "September 25, 2026"],
  ["Contract Execution", "September 30, 2026"],
];

// ─── Typographic helpers ────────────────────────────────────────────────────

function P({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "Inter, sans-serif",
        fontSize:   15,
        lineHeight: 1.7,
        color:      "#C8D2DF",
        margin:     "0 0 18px",
      }}
    >
      {children}
    </p>
  );
}

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul
      style={{
        fontFamily:  "Inter, sans-serif",
        fontSize:    15,
        lineHeight:  1.7,
        color:       "#C8D2DF",
        margin:      "0 0 18px",
        paddingLeft: "1.2em",
        display:     "flex",
        flexDirection: "column",
        gap:         8,
      }}
    >
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

function SubHead({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontFamily:     "'Barlow Condensed', sans-serif",
        fontWeight:     700,
        fontSize:       21,
        letterSpacing:  "0.03em",
        textTransform:  "uppercase",
        color:          "#F4EFE6",
        margin:         "30px 0 12px",
      }}
    >
      {children}
    </h3>
  );
}

function Strong({ children }: { children: React.ReactNode }) {
  return <strong style={{ color: "#F4EFE6", fontWeight: 600 }}>{children}</strong>;
}

function Section({
  id,
  n,
  title,
  children,
}: {
  id:       string;
  n:        string;
  title:    string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} style={{ scrollMarginTop: 110, marginBottom: 56 }}>
      <div
        style={{
          display:      "flex",
          alignItems:   "baseline",
          gap:          14,
          borderBottom: "2px solid #D4B949",
          paddingBottom: 10,
          marginBottom: 20,
        }}
      >
        <span
          style={{
            fontFamily:    "'Barlow Condensed', sans-serif",
            fontWeight:    900,
            fontSize:      22,
            color:         "#D4B949",
            lineHeight:    1,
          }}
        >
          {n}.
        </span>
        <h2
          style={{
            fontFamily:     "'Barlow Condensed', sans-serif",
            fontWeight:     900,
            fontSize:       "clamp(24px, 3vw, 32px)",
            letterSpacing:  "0.03em",
            textTransform:  "uppercase",
            color:          "#F4EFE6",
            lineHeight:     1,
            margin:         0,
          }}
        >
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

/** Two-column key/value table used for events, criteria and timeline.
 *  `plainKeys` renders the left column as body text (for content rows like
 *  criteria/milestones) instead of the condensed-caps label treatment. */
function DataTable({
  head,
  rows,
  keyWidth = "minmax(150px, 1fr)",
  plainKeys = false,
}: {
  head?:    [string, string];
  rows:     string[][];
  keyWidth?: string;
  plainKeys?: boolean;
}) {
  return (
    <div
      className="rfp-table"
      style={{
        border:       "1px solid #1E2D45",
        background:   "#0A1628",
        marginBottom: 22,
      }}
    >
      {head && (
        <div
          className="rfp-table__row"
          style={{
            display:              "grid",
            gridTemplateColumns:  `${keyWidth} 2.6fr`,
            background:           "#1A2438",
            fontFamily:           "'Barlow Condensed', sans-serif",
            fontWeight:           700,
            fontSize:             13,
            letterSpacing:        "0.14em",
            textTransform:        "uppercase",
            color:                "#F4EFE6",
          }}
        >
          <div style={{ padding: "11px 16px", borderRight: "1px solid #1E2D45" }}>{head[0]}</div>
          <div style={{ padding: "11px 16px" }}>{head[1]}</div>
        </div>
      )}
      {rows.map(([k, v], i) => (
        <div
          key={i}
          className="rfp-table__row"
          style={{
            display:              "grid",
            gridTemplateColumns:  `${keyWidth} 2.6fr`,
            borderTop:            i === 0 && !head ? "none" : "1px solid #1E2D45",
            fontFamily:           "Inter, sans-serif",
            fontSize:             14,
            lineHeight:           1.55,
          }}
        >
          <div
            style={
              plainKeys
                ? {
                    padding:     "12px 16px",
                    borderRight: "1px solid #1E2D45",
                    fontFamily:  "Inter, sans-serif",
                    fontSize:    14,
                    color:       "#C8D2DF",
                  }
                : {
                    padding:       "12px 16px",
                    borderRight:   "1px solid #1E2D45",
                    fontFamily:    "'Barlow Condensed', sans-serif",
                    fontWeight:    700,
                    fontSize:      14,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color:         "#7A9BAA",
                  }
            }
          >
            {k}
          </div>
          <div style={{ padding: "12px 16px", color: "#C8D2DF" }}>{v}</div>
        </div>
      ))}
    </div>
  );
}

function DownloadButton() {
  return (
    <a
      href={PDF_HREF}
      download
      style={{
        display:        "inline-flex",
        alignItems:     "center",
        gap:            10,
        background:     "#D4B949",
        color:          "#041124",
        fontFamily:     "'Barlow Condensed', sans-serif",
        fontWeight:     700,
        fontSize:       14,
        letterSpacing:  "0.14em",
        textTransform:  "uppercase",
        padding:        "13px 26px",
        borderRadius:   6,
        textDecoration: "none",
        whiteSpace:     "nowrap",
      }}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      Download RFP
    </a>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function RfpDocumentPage() {
  return (
    <main style={{ background: "#041124", minHeight: "100vh" }}>
      {/* ── Header ─────────────────────────────────────────────── */}
      <header
        style={{
          background:   "#041124",
          borderBottom: "1px solid #1E2D45",
          paddingTop:    40,
          paddingBottom: 40,
        }}
      >
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6">
          <div
            style={{
              fontFamily:     "'Barlow Condensed', sans-serif",
              fontWeight:     700,
              fontSize:       12,
              letterSpacing:  "0.28em",
              textTransform:  "uppercase",
              color:          "#D4B949",
              marginBottom:   12,
            }}
          >
            Request for Proposal
          </div>
          <div
            style={{
              display:        "flex",
              alignItems:     "flex-end",
              justifyContent: "space-between",
              gap:            24,
              flexWrap:       "wrap",
            }}
          >
            <h1
              style={{
                fontFamily:     "'Barlow Condensed', sans-serif",
                fontWeight:     900,
                fontSize:       "clamp(34px, 4.6vw, 52px)",
                lineHeight:     1,
                letterSpacing:  "0.02em",
                textTransform:  "uppercase",
                color:          "#F4EFE6",
                margin:         0,
                maxWidth:       760,
              }}
            >
              Tournament Series &amp; Team Travel Management Services
            </h1>
            <DownloadButton />
          </div>
          <p
            style={{
              fontFamily:     "'Barlow Condensed', sans-serif",
              fontWeight:     600,
              fontSize:       15,
              letterSpacing:  "0.1em",
              textTransform:  "uppercase",
              color:          "#7A9BAA",
              margin:         "18px 0 0",
            }}
          >
            Issued August 24, 2026 · Proposals due September 11, 2026 · Contract term October 2026 – June 2027
          </p>
        </div>
      </header>

      {/* ── Body: sticky nav + content ─────────────────────────── */}
      <div
        className="max-w-7xl mx-auto w-full px-4 sm:px-6 rfp-layout"
        style={{ paddingTop: 40, paddingBottom: 80 }}
      >
        {/* Anchor nav */}
        <nav className="rfp-nav" aria-label="RFP sections">
          <div
            style={{
              fontFamily:     "'Barlow Condensed', sans-serif",
              fontWeight:     700,
              fontSize:       11,
              letterSpacing:  "0.22em",
              textTransform:  "uppercase",
              color:          "#7A9BAA",
              marginBottom:   12,
            }}
          >
            On this page
          </div>
          <ol className="rfp-nav__list">
            {NAV.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="rfp-nav__link">
                  <span style={{ color: "#D4B949", fontWeight: 700, marginRight: 8 }}>{s.n}.</span>
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Document */}
        <article className="rfp-content" style={{ minWidth: 0 }}>
          <Section id="introduction" n="1" title="Introduction & Background">
            <P>
              {"The Carolina Premier Soccer League (“CPSL” or the “League”) is a competitive youth soccer league operating across North Carolina, organizing league play and a series of championship and playoff tournaments for boys and girls teams ranging from U13 through U19. CPSL is seeking proposals from qualified companies (“Proposers”) to serve as the League’s official Tournament Operations and Team Travel Management Partner (the “Partner”)."}
            </P>
            <P>
              {"CPSL’s tournament series draws teams from across North Carolina and neighboring states, with a significant percentage of participating teams traveling from outside a 90-mile radius of each host venue. This creates substantial demand for hotel accommodations, group travel logistics, and on-site tournament support at each event."}
            </P>
            <P>
              {"Through this Request for Proposal (“RFP”), CPSL intends to identify a partner (or partners) to manage (a) the operational execution of CPSL’s annual tournament series, and/or (b) the official travel and housing program for visiting teams, families, and staff. CPSL’s preference is to engage a single company, or a lead company with subcontracted partners, capable of providing both components as a turnkey solution; however, CPSL will also accept and evaluate proposals from companies that wish to bid on only one component — either Tournament Operations Management or Team Travel & Housing Management — as described in Section 2.1. CPSL’s goal is to establish a long-term partnership that improves the participant and family experience, protects host-venue and hotel relationships, and provides CPSL with reliable reporting and financial accountability."}
            </P>
          </Section>

          <Section id="purpose" n="2" title="Purpose & Objectives of this RFP">
            <P>{"CPSL is issuing this RFP to select a Partner that can provide comprehensive, turnkey management of the following:"}</P>
            <Bullets
              items={[
                <><Strong>Tournament operations</Strong>{" for all CPSL-hosted events listed in Section 4, including scheduling support, check-in/credentialing, field and venue-day operations coordination, officials and staffing coordination (in partnership with CPSL and host venues), and on-site tournament management."}</>,
                <><Strong>Official housing and travel management</Strong>{" for all CPSL tournaments, including hotel sourcing and contracting, an official “stay-to-play” or preferred-hotel program (if applicable), booking platform/website for team and family reservations, rooming list management, and on-site travel support."}</>,
                <><Strong>Reporting, compliance, and account management</Strong>{" throughout the term of the agreement, including performance metrics, financial reconciliation, and post-event recaps."}</>,
              ]}
            />
            <P>{"CPSL’s key objectives for this partnership are to:"}</P>
            <Bullets
              items={[
                "Provide a seamless, professional booking and travel experience for the 300+ traveling teams across CPSL’s 2026–27 event calendar.",
                "Secure competitive hotel rates and concessions (comp rooms, meeting space, hospitality) in each host market.",
                "Reduce the administrative burden on CPSL staff and volunteers for on-site tournament-day logistics.",
                "Protect CPSL’s relationships with host venues, municipalities, and sports commissions/CVBs in each market.",
                "Establish clear, measurable performance metrics that support a multi-year renewal relationship.",
              ]}
            />
            <SubHead>2.1 Proposal Options — Full-Service or Single-Component</SubHead>
            <P>{"CPSL recognizes that not every qualified company provides both tournament operations and travel/housing services. Proposers may respond to this RFP under any one of the following three options:"}</P>
            <Bullets
              items={[
                <><Strong>Option A – Full-Service Proposal:</Strong>{" covers both Tournament Operations Management (Section 5.1) and Team Travel & Housing Management (Section 5.2), plus the shared Technology and Reporting requirements in Sections 5.3–5.4."}</>,
                <><Strong>Option B – Tournament Operations Only:</Strong>{" covers Tournament Operations Management (Section 5.1) only, addressing the pre-event planning and on-site operational needs for all five events in Section 4."}</>,
                <><Strong>Option C – Team Travel & Housing Only:</Strong>{" covers Official Travel & Housing Management (Section 5.2) only, addressing hotel sourcing, the booking platform, and rooming list management for all five events in Section 4."}</>,
              ]}
            />
            <P>
              {"Proposers responding under Option B or Option C should address only the Technology and Reporting items in Sections 5.3–5.4 that are relevant to their proposed scope. CPSL may, at its sole discretion, award this engagement to a single full-service Partner, or to two separate Partners — one for tournament operations and one for travel/housing — depending on which combination of proposals best serves CPSL’s needs. Proposers must clearly state which option (A, B, or C) they are responding to on the cover page and in the cover letter of their proposal (see Section 7)."}
            </P>
          </Section>

          <Section id="term" n="3" title="Term of Agreement">
            <P>
              {"The initial term of the agreement resulting from this RFP will run from September 2026 through June 2027, encompassing pre-event planning for the 2026–27 season and all events listed in Section 4. CPSL anticipates the opportunity to renew the agreement for successive one-year (or multi-year) terms, contingent upon the Partner meeting the performance metrics and service standards defined in the resulting agreement and evaluated in the annual review described in Section 8."}
            </P>
          </Section>

          <Section id="events" n="4" title="CPSL 2026–27 Event Schedule">
            <P>
              {"The Partner will be responsible for tournament operations and travel/housing management for each of the following five (5) CPSL events during the contract term. Team counts and out-of-market percentages are estimates based on prior-season participation and are subject to change."}
            </P>
            {EVENTS.map((ev) => (
              <div key={ev.id} style={{ marginBottom: 30 }}>
                <SubHead>{ev.id} {ev.name}</SubHead>
                <DataTable rows={ev.rows} />
              </div>
            ))}
            <P>
              <Strong>Note:</Strong>{" The May 1–2 and May 15–16 weekends each involve two simultaneous events in different host cities. Proposers should describe their capacity and staffing model for supporting concurrent, geographically separate events on the same weekend."}
            </P>
          </Section>

          <Section id="scope" n="5" title="Scope of Services">
            <P>
              {"This section describes the full scope of services CPSL is seeking. Section 5.1 (Tournament Operations Management) applies to Proposers responding under Option A (Full-Service) or Option B (Tournament Operations Only). Section 5.2 (Official Travel & Housing Management) applies to Proposers responding under Option A or Option C (Team Travel & Housing Only). Sections 5.3 (Technology & Communications) and 5.4 (Reporting & Account Management) apply to whichever component(s) a Proposer is proposing."}
            </P>
            <SubHead>5.1 Tournament Operations Management</SubHead>
            <P>{"The Partner will support CPSL staff in the planning and on-site execution of each event listed in Section 4, including but not limited to:"}</P>
            <Bullets
              items={[
                "Pre-event operational planning in coordination with CPSL and each host venue (Matthews Sportsplex, OrthoCarolina Sportsplex, WRAL Soccer Park, nCino Sports Park, and J. Burt Gillette Athletic Complex).",
                "Team check-in, credentialing, and roster/pass verification support.",
                "On-site event-day operations staffing (information tent/HQ, way-finding/signage support, medical and weather-contingency coordination in partnership with venue and CPSL medical staff).",
                "Coordination of officials’ logistics (hotel, transportation, and check-in) where applicable, in partnership with CPSL’s assignor(s).",
                "Communication support for schedule changes, weather delays, and bracket updates to coaches, teams, and families.",
                "Post-event operational recap and after-action report for each event.",
              ]}
            />
            <SubHead>5.2 Official Travel &amp; Housing Management</SubHead>
            <P>{"The Partner will serve as CPSL’s official housing and travel partner, responsible for:"}</P>
            <Bullets
              items={[
                "Sourcing, negotiating, and contracting hotel room blocks in each host market sufficient to accommodate the estimated out-of-market team counts in Section 4, plus family/spectator demand.",
                "Negotiating rates, concessions (comp rooms, staff rooms, meeting/hospitality space, attrition and cancellation terms), and cutoff dates favorable to CPSL, teams, and families.",
                "Providing a branded, mobile-friendly online booking platform allowing teams and families to reserve rooms directly within CPSL’s official hotel program.",
                "Where CPSL adopts a “stay-to-play” or verified-housing policy, administering booking verification and compliance monitoring, and reporting non-compliant bookings to CPSL.",
                "Managing team rooming lists and transmitting final rooming lists to host hotels ahead of each event.",
                "Providing a dedicated travel/housing support contact for teams and families before and during each event, including on-site support for check-in issues, overflow, and last-minute changes.",
                "Monitoring and reporting room-block pickup, attrition risk, and any hotel-relationship issues to CPSL in advance of each cutoff date.",
                "Managing commission, rebate, or revenue-share arrangements with contracted hotels, and disclosing all such arrangements to CPSL in the Partner’s proposal and ongoing reporting.",
              ]}
            />
            <SubHead>5.3 Technology &amp; Communications</SubHead>
            <Bullets
              items={[
                "A team/family-facing booking website or app reflecting current CPSL branding for each event.",
                "Reporting dashboard accessible to CPSL staff showing real-time booking pickup, room-block status, and compliance (if a stay-to-play policy is used).",
                "Integration or coordination with CPSL’s existing tournament scheduling and registration systems (Proposers should describe current integration capabilities, e.g., GotSport, TourneyMachine, or similar platforms used by CPSL).",
              ]}
            />
            <SubHead>5.4 Reporting &amp; Account Management</SubHead>
            <Bullets
              items={[
                "A dedicated account manager serving as CPSL’s single point of contact for the duration of the agreement.",
                "Pre-event planning calls/meetings for each of the five events in Section 4.",
                "Post-event reporting including: total room nights booked and picked up, out-of-market team compliance (if applicable), financial reconciliation of any commission/rebate revenue owed to CPSL, and a summary of any operational or hotel-relationship issues.",
                "An annual season-end report summarizing performance against the metrics defined in Section 8, to inform CPSL’s renewal decision.",
              ]}
            />
          </Section>

          <Section id="qualifications" n="6" title="Proposer Qualifications">
            <P>{"At minimum, Proposers should demonstrate:"}</P>
            <P>
              {"Proposers responding to a single component (Option B or Option C, as described in Section 2.1) should demonstrate the qualifications below only as they relate to their proposed component."}
            </P>
            <Bullets
              items={[
                "A minimum of three (3) years of experience providing tournament operations and/or official housing management services for youth or amateur sports events of comparable or larger scale.",
                "Demonstrated experience managing hotel room blocks and “stay-to-play” style housing programs for multi-day, multi-team tournaments.",
                "Existing hotel relationships and/or sourcing capability in the Charlotte, Raleigh, Wilmington, and Wilson/eastern North Carolina markets.",
                "Financial stability and sufficient staffing capacity to support concurrent events in different cities on the same weekend (see Section 4).",
                "References from at least three (3) comparable youth or amateur sports clients, ideally including soccer leagues, clubs, or associations of similar scope.",
                "Appropriate insurance coverage (general liability, and any additional coverage required for on-site event operations).",
              ]}
            />
          </Section>

          <Section id="submission" n="7" title="Proposal Submission Requirements">
            <P>
              {"Proposals should be organized as follows and should not exceed 20 pages, excluding appendices. Proposers responding to Option B or Option C may omit or mark “Not Applicable” for any item below that does not pertain to their proposed component (e.g., a Tournament Operations Only Proposer may omit the Hotel Sourcing Approach section):"}
            </P>
            <Bullets
              items={[
                <><Strong>Cover Letter</Strong>{" — summarizing the Proposer’s interest and qualifications, and clearly stating which proposal option the Proposer is submitting: Option A (Full-Service), Option B (Tournament Operations Only), or Option C (Team Travel & Housing Only), as described in Section 2.1."}</>,
                <><Strong>Company Overview</Strong>{" — history, ownership structure, relevant experience, and organizational chart for the proposed CPSL account team."}</>,
                <><Strong>Scope of Services Response</Strong>{" — a narrative response to each item in Section 5 applicable to the Proposer’s selected option, including the Proposer’s proposed approach to tournament operations and/or housing/travel management for each of the five events in Section 4."}</>,
                <><Strong>Hotel Sourcing Approach</Strong>{" — methodology for identifying and contracting hotels in each host market, including sample rate/concession terms the Proposer would expect to secure."}</>,
                <><Strong>Technology Overview</Strong>{" — description of the booking platform, reporting dashboard, and any integrations with CPSL’s existing systems."}</>,
                <><Strong>Staffing Plan</Strong>{" — including the proposed account management team and on-site event staffing plan, with specific attention to the concurrent-event weekends identified in Section 4."}</>,
                <><Strong>Fee Structure</Strong>{" — a complete and transparent fee proposal, including any commission, rebate, or revenue-share arrangement with hotels, management/service fees to CPSL, and any pass-through costs to teams or families."}</>,
                <><Strong>References</Strong>{" — at least three (3) client references, including contact information and event scope."}</>,
                <><Strong>Sample Reporting</Strong>{" — an example of a post-event report or dashboard output from a comparable client engagement."}</>,
                <><Strong>Insurance &amp; Compliance</Strong>{" — certificates of insurance or a summary of current coverage."}</>,
              ]}
            />
          </Section>

          <Section id="evaluation" n="8" title="Evaluation Criteria & Performance Metrics">
            <P>{"CPSL will evaluate proposals based on the following weighted criteria:"}</P>
            <DataTable head={["Criterion", "Weight"]} rows={CRITERIA} keyWidth="4fr" plainKeys />
            <P>
              {"For Proposers submitting a single-component proposal (Option B or Option C, per Section 2.1), CPSL will apply the criteria above only to the extent they are relevant to the proposed scope (for example, hotel sourcing strength will not be scored for a Tournament Operations Only proposal), with weights adjusted proportionally among the applicable criteria."}
            </P>
            <P>
              {"Following contract award, the Partner’s performance will be evaluated against metrics that will be defined in the resulting agreement, which are expected to include: room-block pickup rates, stay-to-play compliance rates (if applicable), on-time delivery of pre- and post-event reporting, responsiveness to CPSL and team/family inquiries, and absence of material hotel-relationship or venue complaints. These metrics will form the basis for CPSL’s decision to renew the agreement beyond the initial term."}
            </P>
          </Section>

          <Section id="timeline" n="9" title="RFP Timeline & Submission Instructions">
            <DataTable head={["Milestone", "Date"]} rows={TIMELINE} keyWidth="2.4fr" plainKeys />
            <P>
              {"Questions regarding this RFP should be submitted in writing to Neil Orridge at "}
              <a href="mailto:neil@carolinapremiersoccerleague.com" style={{ color: "#D4B949", textDecoration: "underline" }}>
                neil@carolinapremiersoccerleague.com
              </a>
              {". Proposals should be submitted electronically no later than 5pm EST on September 11, 2026. Late or incomplete proposals may not be considered."}
            </P>
          </Section>

          <Section id="terms" n="10" title="General Terms & Conditions">
            <Bullets
              items={[
                "This RFP does not commit CPSL to award a contract, pay any costs incurred in preparing a proposal, or procure or contract for services.",
                "CPSL reserves the right to reject any or all proposals, to negotiate with any Proposer, and to waive minor irregularities in proposals received.",
                "CPSL may, at its sole discretion, award this engagement to a single full-service Partner (Option A) or to two separate Partners under Options B and C, and reserves the right to negotiate scope, staffing, and terms accordingly with each awarded Partner.",
                "CPSL reserves the right to request additional information, clarification, or a finalist presentation from any Proposer prior to final award.",
                "All proposals become the property of CPSL and may be subject to internal review by CPSL’s Board and event committee.",
                "The selected Partner will be required to execute a formal services agreement incorporating the scope of services, fee structure, performance metrics, and terms described in this RFP and the Partner’s proposal.",
                "The Partner will be required to maintain insurance coverage as specified in the final agreement and to comply with all applicable host-venue, municipal, and state requirements at each event location.",
              ]}
            />
          </Section>

          <Section id="contact" n="11" title="CPSL Contact Information">
            <P>{"For questions regarding this RFP, please contact:"}</P>
            <div
              style={{
                border:     "1px solid #1E2D45",
                background: "#0A1628",
                padding:    "24px 28px",
                maxWidth:   420,
              }}
            >
              <div
                style={{
                  fontFamily:    "'Barlow Condensed', sans-serif",
                  fontWeight:    700,
                  fontSize:      20,
                  letterSpacing: "0.03em",
                  textTransform: "uppercase",
                  color:         "#F4EFE6",
                }}
              >
                Neil Orridge
              </div>
              <div
                style={{
                  fontFamily:    "'Barlow Condensed', sans-serif",
                  fontWeight:    600,
                  fontSize:      13,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color:         "#7A9BAA",
                  margin:        "4px 0 14px",
                }}
              >
                League Commissioner · Carolina Premier Soccer League
              </div>
              <a
                href="mailto:neil@carolinapremiersoccerleague.com"
                style={{
                  fontFamily:     "Inter, sans-serif",
                  fontSize:       14,
                  color:          "#D4B949",
                  textDecoration: "underline",
                }}
              >
                neil@carolinapremiersoccerleague.com
              </a>
            </div>
          </Section>

          {/* Bottom download for readers who reach the end */}
          <div style={{ borderTop: "1px solid #1E2D45", paddingTop: 32 }}>
            <DownloadButton />
          </div>
        </article>
      </div>

      {/* Layout + nav styling. Desktop: sticky sidebar. Mobile: inline list. */}
      <style>{`
        .rfp-layout {
          display: grid;
          grid-template-columns: 250px minmax(0, 1fr);
          gap: 48px;
          align-items: start;
        }
        .rfp-nav {
          position: sticky;
          top: 110px;
        }
        .rfp-nav__list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          border-left: 1px solid #1E2D45;
        }
        .rfp-nav__link {
          display: block;
          padding: 7px 0 7px 14px;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #94A3B8;
          text-decoration: none;
          border-left: 2px solid transparent;
          margin-left: -1px;
          transition: color 120ms ease, border-color 120ms ease;
        }
        .rfp-nav__link:hover {
          color: #F4EFE6;
          border-left-color: #D4B949;
        }
        html { scroll-behavior: smooth; }
        @media (max-width: 900px) {
          .rfp-layout {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .rfp-nav {
            position: static;
            border: 1px solid #1E2D45;
            background: #0A1628;
            padding: 18px 20px;
          }
          .rfp-nav__list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 2px 20px;
            border-left: none;
          }
          .rfp-nav__link {
            border-left: none;
            margin-left: 0;
            padding: 5px 0;
          }
        }
        @media (max-width: 640px) {
          .rfp-table__row {
            grid-template-columns: 1fr !important;
          }
          .rfp-table__row > div:first-child {
            border-right: none !important;
            padding-bottom: 2px !important;
          }
          .rfp-table__row > div:last-child {
            padding-top: 2px !important;
          }
        }
      `}</style>
    </main>
  );
}

"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Conference =
  | "Northwest"
  | "West"
  | "Central"
  | "South"
  | "Midwest"
  | "Northeast"
  | "Mid-Atlantic"
  | "Southeast";

const CONFERENCES: Conference[] = [
  "Northwest",
  "West",
  "Central",
  "South",
  "Midwest",
  "Northeast",
  "Mid-Atlantic",
  "Southeast",
];

interface StandingsRow {
  pos: number;
  clubName: string;
  location: string;
  pts: number;
  gp: number;
  w: number;
  d: number;
  l: number;
  gf: number;
  ga: number;
  gd: number;
}

// ─── Mock data ─────────────────────────────────────────────────────────────────
// Replace with Airtable fetch once match data is populated.

const MOCK: Record<Conference, StandingsRow[]> = {
  "Northwest": [
    { pos: 1, clubName: "Asheville FC",       location: "Asheville, NC",      pts: 22, gp: 9, w: 7, d: 1, l: 1, gf: 24, ga:  9, gd:  15 },
    { pos: 2, clubName: "Blue Ridge United",  location: "Morganton, NC",      pts: 18, gp: 9, w: 5, d: 3, l: 1, gf: 18, ga: 10, gd:   8 },
    { pos: 3, clubName: "Boone Valley SC",    location: "Boone, NC",          pts: 14, gp: 9, w: 4, d: 2, l: 3, gf: 15, ga: 13, gd:   2 },
    { pos: 4, clubName: "High Country FC",    location: "Lenoir, NC",         pts: 11, gp: 9, w: 3, d: 2, l: 4, gf: 12, ga: 16, gd:  -4 },
    { pos: 5, clubName: "Piedmont Hills SC",  location: "Hickory, NC",        pts:  8, gp: 9, w: 2, d: 2, l: 5, gf: 10, ga: 18, gd:  -8 },
    { pos: 6, clubName: "Foothills United",   location: "Marion, NC",         pts:  4, gp: 9, w: 1, d: 1, l: 7, gf:  6, ga: 22, gd: -16 },
  ],
  "West": [
    { pos: 1, clubName: "Charlotte Athletic", location: "Charlotte, NC",      pts: 25, gp: 9, w: 8, d: 1, l: 0, gf: 28, ga:  7, gd:  21 },
    { pos: 2, clubName: "Lake Norman SC",     location: "Mooresville, NC",    pts: 19, gp: 9, w: 6, d: 1, l: 2, gf: 20, ga: 11, gd:   9 },
    { pos: 3, clubName: "Gastonia FC",        location: "Gastonia, NC",       pts: 15, gp: 9, w: 4, d: 3, l: 2, gf: 16, ga: 12, gd:   4 },
    { pos: 4, clubName: "Cabarrus United",    location: "Concord, NC",        pts: 10, gp: 9, w: 3, d: 1, l: 5, gf: 12, ga: 17, gd:  -5 },
    { pos: 5, clubName: "Gaston Rangers",     location: "Belmont, NC",        pts:  7, gp: 9, w: 2, d: 1, l: 6, gf:  9, ga: 20, gd: -11 },
    { pos: 6, clubName: "Steel City SC",      location: "Monroe, NC",         pts:  3, gp: 9, w: 1, d: 0, l: 8, gf:  5, ga: 26, gd: -21 },
  ],
  "Central": [
    { pos: 1, clubName: "Carolina Fusion",    location: "Cornelius, NC",      pts: 23, gp: 9, w: 7, d: 2, l: 0, gf: 25, ga:  8, gd:  17 },
    { pos: 2, clubName: "Queen City United",  location: "Charlotte, NC",      pts: 17, gp: 9, w: 5, d: 2, l: 2, gf: 19, ga: 13, gd:   6 },
    { pos: 3, clubName: "Mecklenburg SC",     location: "Huntersville, NC",   pts: 14, gp: 9, w: 4, d: 2, l: 3, gf: 14, ga: 13, gd:   1 },
    { pos: 4, clubName: "Rowan County FC",    location: "Salisbury, NC",      pts: 10, gp: 9, w: 3, d: 1, l: 5, gf: 11, ga: 16, gd:  -5 },
    { pos: 5, clubName: "Stanly Athletic",    location: "Albemarle, NC",      pts:  7, gp: 9, w: 2, d: 1, l: 6, gf:  8, ga: 19, gd: -11 },
    { pos: 6, clubName: "Davidson Stars",     location: "Davidson, NC",       pts:  4, gp: 9, w: 1, d: 1, l: 7, gf:  6, ga: 21, gd: -15 },
  ],
  "South": [
    { pos: 1, clubName: "Midlands United",    location: "Columbia, SC",       pts: 21, gp: 9, w: 6, d: 3, l: 0, gf: 22, ga:  9, gd:  13 },
    { pos: 2, clubName: "Palmetto SC",        location: "Lexington, SC",      pts: 16, gp: 9, w: 5, d: 1, l: 3, gf: 17, ga: 12, gd:   5 },
    { pos: 3, clubName: "Richland FC",        location: "Elgin, SC",          pts: 13, gp: 9, w: 4, d: 1, l: 4, gf: 14, ga: 14, gd:   0 },
    { pos: 4, clubName: "Newberry United",    location: "Newberry, SC",       pts: 10, gp: 9, w: 3, d: 1, l: 5, gf: 11, ga: 17, gd:  -6 },
    { pos: 5, clubName: "Sumter Rangers",     location: "Sumter, SC",         pts:  7, gp: 9, w: 2, d: 1, l: 6, gf:  9, ga: 20, gd: -11 },
    { pos: 6, clubName: "Orangeburg City SC", location: "Orangeburg, SC",     pts:  3, gp: 9, w: 1, d: 0, l: 8, gf:  5, ga: 24, gd: -19 },
  ],
  "Midwest": [
    { pos: 1, clubName: "Triad FC",           location: "Greensboro, NC",     pts: 24, gp: 9, w: 8, d: 0, l: 1, gf: 27, ga:  8, gd:  19 },
    { pos: 2, clubName: "High Point United",  location: "High Point, NC",     pts: 18, gp: 9, w: 5, d: 3, l: 1, gf: 18, ga: 10, gd:   8 },
    { pos: 3, clubName: "Winston Athletic",   location: "Winston-Salem, NC",  pts: 14, gp: 9, w: 4, d: 2, l: 3, gf: 15, ga: 12, gd:   3 },
    { pos: 4, clubName: "Alamance SC",        location: "Burlington, NC",     pts: 10, gp: 9, w: 3, d: 1, l: 5, gf: 12, ga: 16, gd:  -4 },
    { pos: 5, clubName: "Rockingham FC",      location: "Reidsville, NC",     pts:  6, gp: 9, w: 2, d: 0, l: 7, gf:  8, ga: 20, gd: -12 },
    { pos: 6, clubName: "Forsyth United",     location: "Kernersville, NC",   pts:  3, gp: 9, w: 1, d: 0, l: 8, gf:  5, ga: 25, gd: -20 },
  ],
  "Northeast": [
    { pos: 1, clubName: "Triangle SC",        location: "Raleigh, NC",        pts: 23, gp: 9, w: 7, d: 2, l: 0, gf: 27, ga:  8, gd:  19 },
    { pos: 2, clubName: "Durham United",      location: "Durham, NC",         pts: 17, gp: 9, w: 5, d: 2, l: 2, gf: 19, ga: 12, gd:   7 },
    { pos: 3, clubName: "Wake Forest FC",     location: "Wake Forest, NC",    pts: 14, gp: 9, w: 4, d: 2, l: 3, gf: 15, ga: 13, gd:   2 },
    { pos: 4, clubName: "Cary Athletic",      location: "Cary, NC",           pts: 10, gp: 9, w: 3, d: 1, l: 5, gf: 12, ga: 17, gd:  -5 },
    { pos: 5, clubName: "Chapel Hill SC",     location: "Chapel Hill, NC",    pts:  6, gp: 9, w: 2, d: 0, l: 7, gf:  8, ga: 21, gd: -13 },
    { pos: 6, clubName: "Johnston County FC", location: "Smithfield, NC",     pts:  3, gp: 9, w: 1, d: 0, l: 8, gf:  5, ga: 25, gd: -20 },
  ],
  "Mid-Atlantic": [
    { pos: 1, clubName: "Coastal Pines FC",   location: "Wilmington, NC",     pts: 20, gp: 9, w: 6, d: 2, l: 1, gf: 21, ga: 10, gd:  11 },
    { pos: 2, clubName: "Cape Fear SC",       location: "Wilmington, NC",     pts: 16, gp: 9, w: 5, d: 1, l: 3, gf: 17, ga: 13, gd:   4 },
    { pos: 3, clubName: "Brunswick FC",       location: "Leland, NC",         pts: 13, gp: 9, w: 4, d: 1, l: 4, gf: 14, ga: 14, gd:   0 },
    { pos: 4, clubName: "Onslow United",      location: "Jacksonville, NC",   pts: 10, gp: 9, w: 3, d: 1, l: 5, gf: 11, ga: 16, gd:  -5 },
    { pos: 5, clubName: "Crystal Coast SC",   location: "Morehead City, NC",  pts:  7, gp: 9, w: 2, d: 1, l: 6, gf:  9, ga: 19, gd: -10 },
    { pos: 6, clubName: "Outer Banks FC",     location: "Kill Devil Hills, NC", pts: 2, gp: 9, w: 0, d: 2, l: 7, gf:  5, ga: 23, gd: -18 },
  ],
  "Southeast": [
    { pos: 1, clubName: "Low Country FC",     location: "Charleston, SC",     pts: 22, gp: 9, w: 7, d: 1, l: 1, gf: 23, ga:  9, gd:  14 },
    { pos: 2, clubName: "Grand Strand SC",    location: "Myrtle Beach, SC",   pts: 18, gp: 9, w: 5, d: 3, l: 1, gf: 18, ga: 11, gd:   7 },
    { pos: 3, clubName: "Lowcountry United",  location: "Beaufort, SC",       pts: 14, gp: 9, w: 4, d: 2, l: 3, gf: 15, ga: 13, gd:   2 },
    { pos: 4, clubName: "Waccamaw FC",        location: "Conway, SC",         pts: 10, gp: 9, w: 3, d: 1, l: 5, gf: 11, ga: 17, gd:  -6 },
    { pos: 5, clubName: "Hilton Head SC",     location: "Hilton Head, SC",    pts:  7, gp: 9, w: 2, d: 1, l: 6, gf:  8, ga: 20, gd: -12 },
    { pos: 6, clubName: "Colleton County FC", location: "Walterboro, SC",     pts:  3, gp: 9, w: 1, d: 0, l: 8, gf:  5, ga: 24, gd: -19 },
  ],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const FONT  = "'Barlow Condensed', sans-serif";
const INTER = "'Inter', sans-serif";

function gdColor(gd: number) {
  if (gd > 0) return "#00C853";
  if (gd < 0) return "#BF1D2D";
  return "#8899B0";
}

function gdLabel(gd: number) {
  if (gd > 0) return `+${gd}`;
  return String(gd);
}

// Column width constants — stat cells are fixed, CLUB is flex-1
const W = {
  pos:  48,
  pts:  52,
  gp:   44,
  stat: 36,
  gd:   52,
};

interface StatCellProps {
  value: number | string;
  color?: string;
  width: number;
}

function StatCell({ value, color = "#8899B0", width }: StatCellProps) {
  return (
    <div style={{ width, flexShrink: 0, textAlign: "center" }}>
      <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 15, color }}>
        {value}
      </span>
    </div>
  );
}

function HeaderCell({ label, width, align = "center" }: { label: string; width: number; align?: "left" | "center" }) {
  return (
    <div style={{ width, flexShrink: 0, textAlign: align }}>
      <span style={{ fontFamily: FONT, fontWeight: 600, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8899B0" }}>
        {label}
      </span>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

interface StandingsTableProps {
  seasonLabel?: string;
}

export function StandingsTable({ seasonLabel }: StandingsTableProps) {
  const [active, setActive] = useState<Conference>("Northwest");
  const rows = MOCK[active];

  return (
    <div style={{ background: "#041124" }}>

      {/* ── Conference select (mobile) ── */}
      <div className="md:hidden" style={{ borderBottom: "1px solid #1E2D45" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6" style={{ paddingTop: 12, paddingBottom: 12 }}>
          <div style={{ position: "relative" }}>
            <select
              value={active}
              onChange={(e) => setActive(e.target.value as Conference)}
              style={{
                width: "100%",
                background: "#131B2D",
                border: "1px solid #1E2D45",
                borderRadius: 4,
                color: "#D4B949",
                fontFamily: FONT,
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "10px 36px 10px 14px",
                appearance: "none",
                cursor: "pointer",
                outline: "none",
              }}
            >
              {CONFERENCES.map((conf) => (
                <option key={conf} value={conf}>{conf}</option>
              ))}
            </select>
            <svg
              style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
              width="12" height="8" viewBox="0 0 12 8" fill="none"
            >
              <path d="M1 1L6 6L11 1" stroke="#D4B949" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* ── Conference tabs (desktop) ── */}
      <style>{`.cpsl-tabs::-webkit-scrollbar{display:none}`}</style>
      <div className="hidden md:block cpsl-tabs" style={{ borderBottom: "1px solid #1E2D45", overflowX: "auto", scrollbarWidth: "none" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6" style={{ display: "flex", whiteSpace: "nowrap" }}>
          {CONFERENCES.map((conf) => {
            const isActive = conf === active;
            return (
              <button
                key={conf}
                onClick={() => setActive(conf)}
                style={{
                  background: "none",
                  border: "none",
                  borderBottom: `3px solid ${isActive ? "#D4B949" : "transparent"}`,
                  marginBottom: -1,
                  padding: "0 18px",
                  height: 52,
                  cursor: "pointer",
                  fontFamily: FONT,
                  fontWeight: isActive ? 700 : 600,
                  fontSize: 13,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: isActive ? "#D4B949" : "#8899B0",
                  transition: "color 0.15s, border-color 0.15s",
                }}
              >
                {conf}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Table ── */}
      <style>{`.cpsl-table::-webkit-scrollbar{display:none} @media(min-width:768px){.cpsl-sticky-cell{box-shadow:none!important}}`}</style>
      <div className="max-w-7xl mx-auto">
      <div className="cpsl-table" style={{ overflowX: "auto", scrollbarWidth: "none" }}>
        {/* minWidth keeps the stat columns from collapsing; sticky cell is excluded from this calculation */}
        <div style={{ minWidth: 480, width: "100%" }}>

          {/* Header row */}
          <div style={{ borderBottom: "1px solid #1E2D45" }}>
            <div style={{ display: "flex", alignItems: "center", height: 40 }}>

              {/* Sticky: POS + CLUB header */}
              <div className="cpsl-sticky-cell" style={{
                position: "sticky", left: 0, zIndex: 2,
                background: "#131B2D",
                display: "flex", alignItems: "center",
                height: "100%",
                borderLeft: "3px solid transparent",
                paddingLeft: 13,
                paddingRight: 8,
                flexShrink: 0, width: 230,
                boxShadow: "4px 0 8px -2px rgba(0,0,0,0.4)",
              }}>
                <HeaderCell label="POS" width={W.pos - 3} align="left" />
                <span style={{ fontFamily: FONT, fontWeight: 600, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8899B0" }}>
                  CLUB
                </span>
              </div>

              {/* Scrollable stat headers */}
              <div style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
                <HeaderCell label="PTS" width={W.pts}  />
                <HeaderCell label="GP"  width={W.gp}   />
                <HeaderCell label="W"   width={W.stat}  />
                <HeaderCell label="D"   width={W.stat}  />
                <HeaderCell label="L"   width={W.stat}  />
                <HeaderCell label="GF"  width={W.gp}   />
                <HeaderCell label="GA"  width={W.gp}   />
                <HeaderCell label="GD"  width={W.gd}   />
                <div style={{ width: 16, flexShrink: 0 }} />
              </div>
            </div>
          </div>

          {/* Data rows */}
          {rows.map((row) => {
            const isFirst = row.pos === 1;
            return (
              <div key={row.pos} style={{ borderBottom: "1px solid #1E2D45" }}>
                <div style={{ display: "flex", alignItems: "center", height: 56 }}>

                  {/* Sticky: POS + CLUB — border-left lives here so it stays on screen during scroll */}
                  <div className="cpsl-sticky-cell" style={{
                    position: "sticky", left: 0, zIndex: 2,
                    background: "#131B2D",
                    display: "flex", alignItems: "center",
                    height: "100%",
                    borderLeft: `3px solid ${isFirst ? "#D4B949" : "transparent"}`,
                    paddingLeft: 13,
                    paddingRight: 8,
                    flexShrink: 0, width: 230,
                    boxShadow: "4px 0 8px -2px rgba(0,0,0,0.4)",
                  }}>
                    {/* POS */}
                    <div style={{ width: W.pos - 3, flexShrink: 0 }}>
                      <span style={{ fontFamily: FONT, fontWeight: 900, fontSize: 18, color: "#F4EFE6" }}>
                        {row.pos}
                      </span>
                    </div>

                    {/* Club + location */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontFamily: FONT, fontWeight: 700, fontSize: 15,
                        letterSpacing: "0.04em", textTransform: "uppercase",
                        color: "#F4EFE6", lineHeight: 1.2,
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                      }}>
                        {row.clubName}
                      </div>
                      <div style={{
                        fontFamily: INTER, fontWeight: 400, fontSize: 10,
                        color: "#8899B0", marginTop: 2, lineHeight: 1,
                      }}>
                        {row.location}
                      </div>
                    </div>
                  </div>

                  {/* Scrollable stats */}
                  <div style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
                    {/* PTS — gold */}
                    <div style={{ width: W.pts, flexShrink: 0, textAlign: "center" }}>
                      <span style={{ fontFamily: FONT, fontWeight: 900, fontSize: 17, color: "#D4B949" }}>
                        {row.pts}
                      </span>
                    </div>
                    <StatCell value={row.gp} width={W.gp}   color="#8899B0" />
                    <StatCell value={row.w}  width={W.stat} color="#F4EFE6" />
                    <StatCell value={row.d}  width={W.stat} color="#F4EFE6" />
                    <StatCell value={row.l}  width={W.stat} color="#F4EFE6" />
                    <StatCell value={row.gf} width={W.gp}   color="#8899B0" />
                    <StatCell value={row.ga} width={W.gp}   color="#8899B0" />
                    <div style={{ width: W.gd, flexShrink: 0, textAlign: "center" }}>
                      <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 15, color: gdColor(row.gd) }}>
                        {gdLabel(row.gd)}
                      </span>
                    </div>
                    <div style={{ width: 16, flexShrink: 0 }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </div>

      {/* Season label footer */}
      {seasonLabel && (
        <div
          style={{
            borderTop: "1px solid #1E2D45",
            padding: "12px 16px",
            textAlign: "right",
          }}
        >
          <span
            style={{
              fontFamily: FONT,
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#8899B0",
            }}
          >
            {seasonLabel}
          </span>
        </div>
      )}
    </div>
  );
}

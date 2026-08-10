"use client";

import type { AgeGroup, CalendarClub, Competition } from "./types";

// ─── Types ────────────────────────────────────────────────────────────────────

export type DateScope = "this-weekend" | "next-30" | "season";

export interface LeagueCalendarFilterValue {
  conference:  string | null;
  clubId:      string | null;
  competition: Competition | null;
  ageGroup:    AgeGroup | null;
  dateScope:   DateScope;
}

export const DEFAULT_FILTER_VALUE: LeagueCalendarFilterValue = {
  conference:  null,
  clubId:      null,
  competition: null,
  ageGroup:    null,
  dateScope:   "season",
};

export interface LeagueCalendarFiltersProps {
  conferences:  string[];              // e.g. ["Northwest", "West", …]
  clubs:        CalendarClub[];
  value:        LeagueCalendarFilterValue;
  onChange:     (next: LeagueCalendarFilterValue) => void;
}

const COMPETITIONS: Competition[] = ["Premiership", "Cup", "Development"];
const AGE_GROUPS:   AgeGroup[]    = ["U13", "U14", "U15", "U16", "U17", "U19"];
const DATE_SCOPES: { value: DateScope; label: string }[] = [
  { value: "this-weekend", label: "This weekend" },
  { value: "next-30",      label: "Next 30 days" },
  { value: "season",       label: "Full season" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function LeagueCalendarFilters({
  conferences,
  clubs,
  value,
  onChange,
}: LeagueCalendarFiltersProps) {
  const patch = (partial: Partial<LeagueCalendarFilterValue>) =>
    onChange({ ...value, ...partial });

  return (
    <>
      <div className="cpsl-calfilters">
        {/* ── Row 1: Date scope segmented (always visible) ─────────── */}
        <div className="cpsl-calfilters__row" style={{ marginBottom: 12 }}>
          <SegmentedGroup label="View">
            {DATE_SCOPES.map((ds) => (
              <SegmentedButton
                key={ds.value}
                active={value.dateScope === ds.value}
                onClick={() => patch({ dateScope: ds.value })}
              >
                {ds.label}
              </SegmentedButton>
            ))}
          </SegmentedGroup>
        </div>

        {/* ── Row 2: dropdowns (conference, club) ────────────────── */}
        <div className="cpsl-calfilters__row" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Selector
            label="Conference"
            value={value.conference ?? ""}
            onChange={(v) => patch({ conference: v || null })}
            options={[{ value: "", label: "All conferences" }, ...conferences.map((c) => ({ value: c, label: c }))]}
          />
          <Selector
            label="Club"
            value={value.clubId ?? ""}
            onChange={(v) => patch({ clubId: v || null })}
            options={[{ value: "", label: "All clubs" }, ...clubs.map((c) => ({ value: c.id, label: c.name }))]}
          />
        </div>

        {/* ── Row 3: chip toggles (competition, age) ────────────── */}
        <div className="cpsl-calfilters__row" style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 12 }}>
          <ChipGroup label="Competition">
            <Chip active={value.competition === null} onClick={() => patch({ competition: null })}>All</Chip>
            {COMPETITIONS.map((c) => (
              <Chip
                key={c}
                active={value.competition === c}
                onClick={() => patch({ competition: c })}
              >
                {c}
              </Chip>
            ))}
          </ChipGroup>

          <ChipGroup label="Age">
            <Chip active={value.ageGroup === null} onClick={() => patch({ ageGroup: null })}>All</Chip>
            {AGE_GROUPS.map((a) => (
              <Chip
                key={a}
                active={value.ageGroup === a}
                onClick={() => patch({ ageGroup: a })}
              >
                {a}
              </Chip>
            ))}
          </ChipGroup>
        </div>

        {/* ── Reset ─────────────────────────────────────────────── */}
        {isFiltered(value) && (
          <div style={{ marginTop: 14 }}>
            <button
              type="button"
              onClick={() => onChange({ ...DEFAULT_FILTER_VALUE, dateScope: value.dateScope })}
              style={{
                background:     "transparent",
                border:         "none",
                padding:        0,
                color:          "#D4B949",
                fontFamily:     "'Barlow Condensed', sans-serif",
                fontWeight:     700,
                fontSize:       12,
                letterSpacing:  "0.14em",
                textTransform:  "uppercase",
                cursor:         "pointer",
              }}
            >
              Reset filters ×
            </button>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .cpsl-calfilters__row { row-gap: 12px; }
        }
      `}</style>
    </>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function isFiltered(v: LeagueCalendarFilterValue): boolean {
  return !!(v.conference || v.clubId || v.competition || v.ageGroup);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SegmentedGroup({
  label,
  children,
}: {
  label:    string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
      <Label>{label}</Label>
      <div
        style={{
          display:       "inline-flex",
          border:        "1px solid #1E2D45",
          background:    "#0A1628",
          borderRadius:  0,
          overflow:      "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function SegmentedButton({
  active,
  onClick,
  children,
}: {
  active:   boolean;
  onClick:  () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={{
        appearance:     "none",
        border:         "none",
        borderRight:    "1px solid #1E2D45",
        padding:        "8px 14px",
        background:     active ? "#D4B949" : "transparent",
        color:          active ? "#041124" : "#F4EFE6",
        fontFamily:     "'Barlow Condensed', sans-serif",
        fontWeight:     700,
        fontSize:       13,
        letterSpacing:  "0.08em",
        textTransform:  "uppercase",
        cursor:         "pointer",
        transition:     "background 120ms ease, color 120ms ease",
      }}
    >
      {children}
    </button>
  );
}

function Selector({
  label,
  value,
  onChange,
  options,
}: {
  label:    string;
  value:    string;
  onChange: (v: string) => void;
  options:  { value: string; label: string }[];
}) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 10, flex: "1 1 220px", minWidth: 200 }}>
      <Label>{label}</Label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          flex:           "1 1 auto",
          appearance:     "none",
          background:     "#0A1628",
          border:         "1px solid #1E2D45",
          borderRadius:   0,
          padding:        "8px 32px 8px 12px",
          color:          "#F4EFE6",
          fontFamily:     "Inter, sans-serif",
          fontSize:       14,
          cursor:         "pointer",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237A9BAA' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>\")",
          backgroundRepeat:   "no-repeat",
          backgroundPosition: "right 10px center",
          backgroundSize:     "12px 12px",
        }}
      >
        {options.map((opt) => (
          <option key={opt.value || "-"} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function ChipGroup({
  label,
  children,
}: {
  label:    string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
      <Label>{label}</Label>
      <div style={{ display: "inline-flex", flexWrap: "wrap", gap: 6 }}>
        {children}
      </div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active:   boolean;
  onClick:  () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={{
        appearance:     "none",
        padding:        "5px 12px",
        border:         active ? "1px solid #D4B949" : "1px solid #1E2D45",
        background:     active ? "rgba(212,185,73,0.15)" : "transparent",
        color:          active ? "#E5C97A" : "#94A3B8",
        fontFamily:     "Inter, sans-serif",
        fontSize:       12,
        fontWeight:     600,
        letterSpacing:  "0.04em",
        borderRadius:   999,
        cursor:         "pointer",
        transition:     "all 120ms ease",
      }}
    >
      {children}
    </button>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily:     "'Barlow Condensed', sans-serif",
        fontWeight:     700,
        fontSize:       11,
        letterSpacing:  "0.18em",
        textTransform:  "uppercase",
        color:          "#7A9BAA",
        whiteSpace:     "nowrap",
      }}
    >
      {children}
    </span>
  );
}

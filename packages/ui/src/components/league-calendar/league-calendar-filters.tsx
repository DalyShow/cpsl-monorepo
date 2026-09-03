"use client";

import type { AgeGroup, CalendarClub } from "./types";

// ─── Types ────────────────────────────────────────────────────────────────────

export type GenderFilter = "M" | "G" | null;

export interface LeagueCalendarFilterValue {
  /** ISO date (YYYY-MM-DD). Always populated. */
  date:     string;
  clubId:   string | null;
  ageGroup: AgeGroup | null;
  /** null = All, "M" = Boys, "G" = Girls. */
  gender:   GenderFilter;
}

/** Compute the next upcoming Saturday (today, if today is Saturday). */
export function upcomingSaturdayISO(from: Date = new Date()): string {
  const d = new Date(from);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay(); // 0=Sun … 6=Sat
  const delta = (6 - day + 7) % 7;
  d.setDate(d.getDate() + delta);
  // Local YYYY-MM-DD (avoid UTC drift from .toISOString()).
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day2 = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day2}`;
}

export function defaultFilterValue(): LeagueCalendarFilterValue {
  return {
    date:     upcomingSaturdayISO(),
    clubId:   null,
    ageGroup: null,
    gender:   null,
  };
}

/** @deprecated use `defaultFilterValue()` — kept for backwards imports. */
export const DEFAULT_FILTER_VALUE: LeagueCalendarFilterValue = {
  date:     "",
  clubId:   null,
  ageGroup: null,
  gender:   null,
};

export type CalendarView = "day" | "season";

export interface LeagueCalendarFiltersProps {
  clubs:        CalendarClub[];
  value:        LeagueCalendarFilterValue;
  onChange:     (next: LeagueCalendarFilterValue) => void;
  /** Ordered age groups in the Age dropdown. Defaults to CPSL's U13–U19 range. */
  ageGroups?:   AgeGroup[];
  /** When true, render the All/Boys/Girls dropdown. Default: false. */
  showGender?:  boolean;
  /** Presentation mode. When provided (with onViewChange), a View
   *  dropdown renders (Day default) and the date picker hides in season
   *  view. Undefined keeps the classic date-only behavior. */
  view?:         CalendarView;
  onViewChange?: (view: CalendarView) => void;
}

const DEFAULT_AGE_GROUPS: AgeGroup[] = ["U13", "U14", "U15", "U16", "U17", "U19"];

// ─── Component ────────────────────────────────────────────────────────────────

export function LeagueCalendarFilters({
  clubs,
  value,
  onChange,
  ageGroups = DEFAULT_AGE_GROUPS,
  showGender = false,
  view,
  onViewChange,
}: LeagueCalendarFiltersProps) {
  const patch = (partial: Partial<LeagueCalendarFilterValue>) =>
    onChange({ ...value, ...partial });

  const hasViewToggle = view !== undefined && !!onViewChange;

  return (
    <>
      <div className="cpsl-calfilters">
        {/* ── Single row of matching dropdowns ─────────────────────── */}
        <div
          className="cpsl-calfilters__row"
          style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}
        >
          {hasViewToggle && (
            <Selector
              label="View"
              value={view!}
              onChange={(v) => onViewChange!((v === "season" ? "season" : "day") as CalendarView)}
              width={130}
              options={[
                { value: "day",    label: "Day" },
                { value: "season", label: "Season" },
              ]}
            />
          )}
          {!(hasViewToggle && view === "season") && (
            <DateField
              label="Date"
              value={value.date}
              onChange={(v) => patch({ date: v })}
            />
          )}
          <Selector
            label="Club"
            value={value.clubId ?? ""}
            onChange={(v) => patch({ clubId: v || null })}
            options={[
              { value: "", label: "All clubs" },
              ...clubs.map((c) => ({ value: c.id, label: c.name })),
            ]}
          />

          {showGender && (
            <Selector
              label="Show"
              value={value.gender ?? ""}
              onChange={(v) => patch({ gender: v === "M" || v === "G" ? v : null })}
              width={130}
              options={[
                { value: "",  label: "All" },
                { value: "M", label: "Boys" },
                { value: "G", label: "Girls" },
              ]}
            />
          )}

          <Selector
            label="Age"
            value={value.ageGroup ?? ""}
            onChange={(v) => patch({ ageGroup: (v || null) as AgeGroup | null })}
            width={140}
            options={[
              { value: "", label: "All ages" },
              ...ageGroups.map((a) => ({ value: a, label: a })),
            ]}
          />
        </div>

        {/* ── Reset ─────────────────────────────────────────────────── */}
        {isFiltered(value) && (
          <div style={{ marginTop: 14 }}>
            <button
              type="button"
              onClick={() => onChange({ ...defaultFilterValue(), date: value.date })}
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

/** True when any non-date filter is active (club or age or gender). */
export function isFiltered(v: LeagueCalendarFilterValue): boolean {
  return !!(v.clubId || v.ageGroup || v.gender);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function DateField({
  label,
  value,
  onChange,
}: {
  label:    string;
  value:    string;
  onChange: (v: string) => void;
}) {
  return (
    <label
      style={{
        display:    "inline-flex",
        alignItems: "center",
        gap:        10,
      }}
    >
      <Label>{label}</Label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width:          172,
          height:         38,
          appearance:     "none",
          background:     "#041124",
          border:         "1px solid #1E2D45",
          borderRadius:   999,
          padding:        "0 16px",
          color:          "#F4EFE6",
          fontFamily:     "Inter, sans-serif",
          fontSize:       14,
          cursor:         "pointer",
          colorScheme:    "dark",
        }}
      />
    </label>
  );
}

function Selector({
  label,
  value,
  onChange,
  options,
  width = 220,
}: {
  label:    string;
  value:    string;
  onChange: (v: string) => void;
  options:  { value: string; label: string }[];
  width?:   number;
}) {
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <Label>{label}</Label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width,
          height:         38,
          appearance:     "none",
          background:     "#041124",
          border:         "1px solid #1E2D45",
          borderRadius:   999,
          padding:        "0 36px 0 16px",
          color:          "#F4EFE6",
          fontFamily:     "Inter, sans-serif",
          fontSize:       14,
          cursor:         "pointer",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237A9BAA' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>\")",
          backgroundRepeat:   "no-repeat",
          backgroundPosition: "right 14px center",
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

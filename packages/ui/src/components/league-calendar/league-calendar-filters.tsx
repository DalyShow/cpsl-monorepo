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

export interface LeagueCalendarFiltersProps {
  clubs:        CalendarClub[];
  value:        LeagueCalendarFilterValue;
  onChange:     (next: LeagueCalendarFilterValue) => void;
  /** Ordered age groups shown as chips. Defaults to CPSL's U13–U19 range. */
  ageGroups?:   AgeGroup[];
  /** When true, render the All/Boys/Girls segmented control. Default: false. */
  showGender?:  boolean;
}

const DEFAULT_AGE_GROUPS: AgeGroup[] = ["U13", "U14", "U15", "U16", "U17", "U19"];

// ─── Component ────────────────────────────────────────────────────────────────

export function LeagueCalendarFilters({
  clubs,
  value,
  onChange,
  ageGroups = DEFAULT_AGE_GROUPS,
  showGender = false,
}: LeagueCalendarFiltersProps) {
  const patch = (partial: Partial<LeagueCalendarFilterValue>) =>
    onChange({ ...value, ...partial });

  return (
    <>
      <div className="cpsl-calfilters">
        {/* ── Single row: [Date] [Club] ······················ [Age chips] ── */}
        <div
          className="cpsl-calfilters__row"
          style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}
        >
          <DateField
            label="Date"
            value={value.date}
            onChange={(v) => patch({ date: v })}
          />
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
            <Segmented<GenderFilter>
              label="Show"
              value={value.gender}
              onChange={(g) => patch({ gender: g })}
              options={[
                { value: null, label: "All" },
                { value: "M",  label: "Boys" },
                { value: "G",  label: "Girls" },
              ]}
            />
          )}

          {/* Age chips pushed to the far right of the same row. */}
          <div style={{ marginLeft: "auto" }}>
            <ChipGroup label="Age">
              <Chip active={value.ageGroup === null} onClick={() => patch({ ageGroup: null })}>
                All
              </Chip>
              {ageGroups.map((a) => (
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
          width:          170,
          appearance:     "none",
          background:     "#0A1628",
          border:         "1px solid #1E2D45",
          borderRadius:   0,
          padding:        "8px 12px",
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
}: {
  label:    string;
  value:    string;
  onChange: (v: string) => void;
  options:  { value: string; label: string }[];
}) {
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <Label>{label}</Label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width:          220,
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

function Segmented<T>({
  label,
  value,
  onChange,
  options,
}: {
  label:    string;
  value:    T;
  onChange: (v: T) => void;
  options:  { value: T; label: string }[];
}) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <Label>{label}</Label>
      <div
        role="group"
        aria-label={label}
        style={{
          display:      "inline-flex",
          border:       "1px solid #1E2D45",
          borderRadius: 999,
          overflow:     "hidden",
          background:   "#0A1628",
        }}
      >
        {options.map((opt, i) => {
          const active = opt.value === value;
          return (
            <button
              key={String(opt.value)}
              type="button"
              onClick={() => onChange(opt.value)}
              aria-pressed={active}
              style={{
                appearance:     "none",
                border:         "none",
                borderLeft:     i === 0 ? "none" : "1px solid #1E2D45",
                padding:        "6px 14px",
                background:     active ? "rgba(212,185,73,0.15)" : "transparent",
                color:          active ? "#E5C97A" : "#94A3B8",
                fontFamily:     "'Barlow Condensed', sans-serif",
                fontWeight:     700,
                fontSize:       12,
                letterSpacing:  "0.14em",
                textTransform:  "uppercase",
                cursor:         "pointer",
                transition:     "all 120ms ease",
              }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
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

"use client";

import * as RadixToggleGroup from "@radix-ui/react-toggle-group";
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
  /** Ordered age groups shown as chips. Defaults to CPSL's U13–U19 range. */
  ageGroups?:   AgeGroup[];
  /** When true, render the All/Boys/Girls segmented control. Default: false. */
  showGender?:  boolean;
  /** Presentation mode. When provided (with onViewChange), a View
   *  dropdown renders (Day default) and the date picker hides in season
   *  view. Undefined keeps the classic date-only behavior. */
  view?:         CalendarView;
  onViewChange?: (view: CalendarView) => void;
  /** Render the filter row on a subtle card fill. Default: false. */
  panel?:        boolean;
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
  panel = false,
}: LeagueCalendarFiltersProps) {
  const patch = (partial: Partial<LeagueCalendarFilterValue>) =>
    onChange({ ...value, ...partial });

  const hasViewToggle = view !== undefined && !!onViewChange;

  return (
    <>
      <div
        className="cpsl-calfilters"
        style={
          panel
            ? {
                background:   "#0A1628",
                border:       "1px solid #1E2D45",
                borderRadius: 16,
                padding:      "18px 20px",
              }
            : undefined
        }
      >
        {/* ── Single row: [View] [Date] [Club] ··············· [Age chips] ── */}
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
            <GenderToggle
              value={value.gender}
              onChange={(g) => patch({ gender: g })}
            />
          )}

          {/* Age chips pushed to the far right of the same row (desktop);
              left-aligned with the stacked controls on mobile. */}
          <div className="cpsl-calfilters__age" style={{ marginLeft: "auto" }}>
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
          .cpsl-calfilters__age { margin-left: 0 !important; }
          .cpsl-calfilters__age .cpsl-chipgroup__chips { gap: 12px !important; }
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

/**
 * All / Boys / Girls single-select — shadcn-style, built on the Radix
 * ToggleGroup primitive (roving focus, arrow keys, aria for free) and
 * skinned to match the pill controls around it.
 */
function GenderToggle({
  value,
  onChange,
}: {
  value:    GenderFilter;
  onChange: (v: GenderFilter) => void;
}) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <Label>Show</Label>
      <RadixToggleGroup.Root
        type="single"
        value={value ?? "all"}
        onValueChange={(v) => {
          // Radix emits "" when the active item is re-clicked — keep the
          // current selection instead of allowing an empty state.
          if (v) onChange(v === "all" ? null : (v as "M" | "G"));
        }}
        aria-label="Show"
        className="cpsl-gender-toggle"
        style={{
          display:      "inline-flex",
          height:       38,
          alignItems:   "stretch",
          border:       "1px solid #1E2D45",
          borderRadius: 999,
          overflow:     "hidden",
          background:   "#041124",
        }}
      >
        {(
          [
            { value: "all", label: "All" },
            { value: "M",   label: "Boys" },
            { value: "G",   label: "Girls" },
          ] as const
        ).map((opt, i) => (
          <RadixToggleGroup.Item
            key={opt.value}
            value={opt.value}
            style={{
              appearance:    "none",
              border:        "none",
              borderLeft:    i === 0 ? "none" : "1px solid #1E2D45",
              padding:       "0 16px",
              background:    "transparent",
              color:         "#94A3B8",
              fontFamily:    "'Barlow Condensed', sans-serif",
              fontWeight:    700,
              fontSize:      12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              cursor:        "pointer",
              transition:    "all 120ms ease",
            }}
          >
            {opt.label}
          </RadixToggleGroup.Item>
        ))}
      </RadixToggleGroup.Root>
      <style>{`
        .cpsl-gender-toggle [data-state="on"] {
          background: rgba(212,185,73,0.15) !important;
          color: #E5C97A !important;
        }
        .cpsl-gender-toggle button:focus-visible {
          outline: 2px solid #D4B949;
          outline-offset: -2px;
        }
      `}</style>
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
      <div className="cpsl-chipgroup__chips" style={{ display: "inline-flex", flexWrap: "wrap", gap: 6 }}>
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
        display:        "inline-flex",
        alignItems:     "center",
        height:         32,
        padding:        "0 14px",
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

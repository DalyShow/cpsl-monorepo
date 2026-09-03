"use client";

import { useEffect, useState } from "react";
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
  /** On phones, collapse the row into a "Filters" trigger that opens a
   *  bottom sheet. Default: false (row always inline). */
  mobileSheet?:  boolean;
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
  mobileSheet = false,
}: LeagueCalendarFiltersProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const patch = (partial: Partial<LeagueCalendarFilterValue>) =>
    onChange({ ...value, ...partial });

  const hasViewToggle = view !== undefined && !!onViewChange;
  const activeCount =
    (value.clubId ? 1 : 0) + (value.ageGroup ? 1 : 0) + (value.gender ? 1 : 0);

  // Lock page scroll behind the open sheet.
  useEffect(() => {
    if (!sheetOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [sheetOpen]);

  useEffect(() => {
    if (!sheetOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSheetOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [sheetOpen]);

  const reset = () => onChange({ ...defaultFilterValue(), date: value.date });

  const fields = (fullWidth: boolean) => (
    <>
      {hasViewToggle && (
        <Selector
          label="View"
          value={view!}
          onChange={(v) => onViewChange!((v === "season" ? "season" : "day") as CalendarView)}
          width={fullWidth ? "100%" : 122}
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
          width={fullWidth ? "100%" : 172}
        />
      )}
      <Selector
        label="Club"
        value={value.clubId ?? ""}
        onChange={(v) => patch({ clubId: v || null })}
        width={fullWidth ? "100%" : 216}
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
          width={fullWidth ? "100%" : 122}
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
        width={fullWidth ? "100%" : 132}
        options={[
          { value: "", label: "All ages" },
          ...ageGroups.map((a) => ({ value: a, label: a })),
        ]}
      />
    </>
  );

  return (
    <>
      <div className={`cpsl-calfilters${mobileSheet ? " cpsl-calfilters--sheet" : ""}`}>
        {/* ── Inline row: every control + reset on one line ─────────── */}
        <div
          className="cpsl-calfilters__row"
          style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}
        >
          {fields(false)}
          {isFiltered(value) && <ResetButton onClick={reset} />}
        </div>

        {/* ── Mobile: compact trigger that opens the bottom sheet ───── */}
        {mobileSheet && (
          <button
            type="button"
            className="cpsl-calfilters__trigger"
            onClick={() => setSheetOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={sheetOpen}
            style={{
              display:       "none",
              alignItems:    "center",
              justifyContent:"space-between",
              gap:           10,
              width:         "100%",
              height:        46,
              padding:       "0 18px",
              background:    "#041124",
              border:        "1px solid #1E2D45",
              borderRadius:  999,
              color:         "#F4EFE6",
              fontFamily:    "'Barlow Condensed', sans-serif",
              fontWeight:    700,
              fontSize:      14,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor:        "pointer",
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
              <FunnelIcon />
              Filters
              {activeCount > 0 && (
                <span
                  style={{
                    display:       "inline-flex",
                    alignItems:    "center",
                    justifyContent:"center",
                    minWidth:      20,
                    height:        20,
                    padding:       "0 6px",
                    borderRadius:  999,
                    background:    "#D4B949",
                    color:         "#041124",
                    fontSize:      12,
                    letterSpacing: 0,
                  }}
                >
                  {activeCount}
                </span>
              )}
            </span>
            <span style={{ color: "#7A9BAA", fontSize: 12 }}>
              {view === "season" ? "Season" : "Day"} view
            </span>
          </button>
        )}
      </div>

      {/* ── Bottom sheet ──────────────────────────────────────────────── */}
      {mobileSheet && sheetOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Filters"
          style={{ position: "fixed", inset: 0, zIndex: 70 }}
        >
          <div
            onClick={() => setSheetOpen(false)}
            style={{ position: "absolute", inset: 0, background: "rgba(4,17,36,0.72)" }}
          />
          <div
            className="cpsl-calfilters__sheet"
            style={{
              position:      "absolute",
              left:          0,
              right:         0,
              bottom:        0,
              background:    "#0A1628",
              borderTop:     "1px solid #1E2D45",
              borderRadius:  "20px 20px 0 0",
              padding:       "20px 20px calc(20px + env(safe-area-inset-bottom))",
              maxHeight:     "82vh",
              overflowY:     "auto",
            }}
          >
            <div
              style={{
                display:       "flex",
                alignItems:    "center",
                justifyContent:"space-between",
                marginBottom:  18,
              }}
            >
              <span
                style={{
                  fontFamily:    "'Barlow Condensed', sans-serif",
                  fontWeight:    900,
                  fontSize:      22,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color:         "#F4EFE6",
                }}
              >
                Filters
              </span>
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                aria-label="Close filters"
                style={{
                  background: "transparent",
                  border:     "none",
                  color:      "#7A9BAA",
                  fontSize:   26,
                  lineHeight: 1,
                  cursor:     "pointer",
                  padding:    4,
                }}
              >
                ×
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {fields(true)}
            </div>

            <div
              style={{
                display:       "flex",
                alignItems:    "center",
                justifyContent:"space-between",
                gap:           14,
                marginTop:     20,
              }}
            >
              {isFiltered(value) ? <ResetButton onClick={reset} /> : <span />}
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                style={{
                  flex:          "0 0 auto",
                  height:        44,
                  padding:       "0 28px",
                  background:    "#D4B949",
                  border:        "none",
                  borderRadius:  999,
                  color:         "#041124",
                  fontFamily:    "'Barlow Condensed', sans-serif",
                  fontWeight:    700,
                  fontSize:      14,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  cursor:        "pointer",
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .cpsl-calfilters--sheet .cpsl-calfilters__row { display: none !important; }
          .cpsl-calfilters--sheet .cpsl-calfilters__trigger { display: inline-flex !important; }
        }
        @keyframes cpsl-sheet-up {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        /* No fill mode — the resting state is on-screen, so a dropped
           animation can never strand the sheet below the viewport. */
        .cpsl-calfilters__sheet {
          animation: cpsl-sheet-up 220ms cubic-bezier(.22,1,.36,1);
        }
        @media (prefers-reduced-motion: reduce) {
          .cpsl-calfilters__sheet { animation: none; }
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

/** Pill control with the label floating inside — saves the row the width
 *  of the external labels so every filter fits on one line. */
function Field({
  label,
  width,
  children,
}: {
  label:    string;
  width:    number | "100%";
  children: React.ReactNode;
}) {
  return (
    <label
      style={{
        position:     "relative",
        display:      "block",
        width,
        height:       52,
        background:   "#041124",
        border:       "1px solid #1E2D45",
        borderRadius: 999,
        cursor:       "pointer",
      }}
    >
      <span
        style={{
          position:      "absolute",
          top:           9,
          left:          19,
          fontFamily:    "'Barlow Condensed', sans-serif",
          fontWeight:    700,
          fontSize:      10,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color:         "#7A9BAA",
          pointerEvents: "none",
        }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}

const CONTROL_STYLE: React.CSSProperties = {
  width:      "100%",
  height:     "100%",
  appearance: "none",
  background: "transparent",
  border:     "none",
  padding:    "17px 34px 0 18px",
  color:      "#F4EFE6",
  fontFamily: "Inter, sans-serif",
  fontSize:   14,
  cursor:     "pointer",
  outline:    "none",
};

function DateField({
  label,
  value,
  onChange,
  width = 172,
}: {
  label:    string;
  value:    string;
  onChange: (v: string) => void;
  width?:   number | "100%";
}) {
  return (
    <Field label={label} width={width}>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        style={{ ...CONTROL_STYLE, padding: "17px 14px 0 18px", colorScheme: "dark" }}
      />
    </Field>
  );
}

function Selector({
  label,
  value,
  onChange,
  options,
  width = 216,
}: {
  label:    string;
  value:    string;
  onChange: (v: string) => void;
  options:  { value: string; label: string }[];
  width?:   number | "100%";
}) {
  return (
    <Field label={label} width={width}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        style={{
          ...CONTROL_STYLE,
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237A9BAA' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>\")",
          backgroundRepeat:   "no-repeat",
          backgroundPosition: "right 16px center",
          backgroundSize:     "12px 12px",
        }}
      >
        {options.map((opt) => (
          <option key={opt.value || "-"} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

function ResetButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background:     "transparent",
        border:         "none",
        padding:        "0 4px",
        color:          "#D4B949",
        fontFamily:     "'Barlow Condensed', sans-serif",
        fontWeight:     700,
        fontSize:       12,
        letterSpacing:  "0.14em",
        textTransform:  "uppercase",
        cursor:         "pointer",
        whiteSpace:     "nowrap",
      }}
    >
      Reset filters ×
    </button>
  );
}

function FunnelIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={{ flexShrink: 0 }}
    >
      <polygon points="22 3 2 3 10 12.5 10 19 14 21 14 12.5 22 3" />
    </svg>
  );
}

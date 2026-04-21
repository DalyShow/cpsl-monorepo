"use client";
import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type MatchDotType = "premiership" | "cup";

export interface MatchDay {
  day: number;
  dots: MatchDotType[];  // competitions on that day
}

export interface DayPickerProps {
  /** Display label — e.g. "MARCH 2026" */
  monthLabel: string;
  /** The calendar grid: first day of week (0=Sun, 1=Mon). Default 1 (Mon) */
  firstDayOfWeek?: 0 | 1;
  /** How many days are in this month */
  daysInMonth: number;
  /** Which weekday the 1st falls on (0=Sun … 6=Sat) */
  startWeekday: number;
  /** Currently selected day */
  selectedDay: number;
  /** Days that have matches */
  matchDays?: MatchDay[];
  /** Today's date number — gets the gold circle by default */
  todayDay?: number;
  /** Summary breakdown shown below the grid */
  summary?: { premiership: number; cup: number };
  onDaySelect?: (day: number) => void;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const WEEKDAY_HEADERS_MON = ["M", "T", "W", "T", "F", "S", "S"];
const WEEKDAY_HEADERS_SUN = ["S", "M", "T", "W", "T", "F", "S"];

const DOT_COLORS: Record<MatchDotType, string> = {
  premiership: "#3B82F6",
  cup: "#D4B949",
};

// ─── Component ────────────────────────────────────────────────────────────────

export function DayPicker({
  monthLabel,
  firstDayOfWeek = 1,
  daysInMonth,
  startWeekday,
  selectedDay,
  matchDays = [],
  todayDay,
  summary,
  onDaySelect,
  onPrevMonth,
  onNextMonth,
}: DayPickerProps) {
  const headers = firstDayOfWeek === 1 ? WEEKDAY_HEADERS_MON : WEEKDAY_HEADERS_SUN;

  // Build a map for quick dot lookup
  const dotMap = new Map<number, MatchDotType[]>();
  matchDays.forEach(({ day, dots }) => dotMap.set(day, dots));

  // How many blank cells before day 1
  const offset =
    firstDayOfWeek === 1
      ? (startWeekday === 0 ? 6 : startWeekday - 1) // Mon-first: Sun=6 blanks
      : startWeekday;                                  // Sun-first: use as-is

  // Build grid cells: nulls for blanks, numbers for days
  const cells: (number | null)[] = [
    ...Array(offset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // Pad to full weeks
  while (cells.length % 7 !== 0) cells.push(null);

  // Chunk into rows
  const rows: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));

  const total = (summary?.premiership ?? 0) + (summary?.cup ?? 0);

  return (
    <div
      style={{
        width: 280,
        flexShrink: 0,
        borderRight: "1px solid #1E2D45",
        padding: "24px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        background: "#131B2D",
      }}
    >
      {/* Month navigation */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <NavButton onClick={onPrevMonth} direction="left" />
        <span
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: "0.06em",
            color: "white",
          }}
        >
          {monthLabel}
        </span>
        <NavButton onClick={onNextMonth} direction="right" />
      </div>

      {/* Grid */}
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Weekday headers */}
        <div style={{ display: "flex", marginBottom: 4 }}>
          {headers.map((h, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                textAlign: "center",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 10,
                letterSpacing: "0.08em",
                color: i >= 5 ? "#D4B949" : "#475569", // SAT/SUN in gold (last 2 cols for Mon-first)
              }}
            >
              {h}
            </div>
          ))}
        </div>

        {/* Day rows */}
        {rows.map((row, ri) => (
          <div key={ri} style={{ display: "flex" }}>
            {row.map((day, ci) => {
              if (day === null) {
                return <div key={ci} style={{ flex: 1, height: 30 }} />;
              }

              const isSelected = day === selectedDay;
              const isToday = day === todayDay;
              const dots = dotMap.get(day) ?? [];
              const hasDots = dots.length > 0;
              const isSatOrSun = (ci + firstDayOfWeek) % 7 >= (firstDayOfWeek === 1 ? 5 : 6) || ci >= 5;

              return (
                <div
                  key={ci}
                  onClick={() => onDaySelect?.(day)}
                  style={{
                    flex: 1,
                    height: 30,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    cursor: onDaySelect ? "pointer" : "default",
                  }}
                >
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      background: isSelected ? "#D4B949" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 12,
                        fontWeight: isSelected || isToday ? 700 : 400,
                        color: isSelected
                          ? "#131B2D"
                          : isSatOrSun
                          ? "#94A3B8"
                          : "#64748B",
                      }}
                    >
                      {day}
                    </span>
                  </div>

                  {/* Match dots — shown below day number */}
                  {hasDots && !isSelected && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: 2,
                        left: "50%",
                        transform: "translateX(-50%)",
                        display: "flex",
                        gap: 2,
                      }}
                    >
                      {dots.slice(0, 3).map((type, di) => (
                        <div
                          key={di}
                          style={{
                            width: dots.length > 1 ? 3 : 4,
                            height: dots.length > 1 ? 3 : 4,
                            borderRadius: "50%",
                            background: DOT_COLORS[type],
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "#1E2D45" }} />

      {/* Summary */}
      {summary != null && (
        <div>
          <div
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "0.1em",
              color: "#475569",
              marginBottom: 12,
            }}
          >
            THIS DAY
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <SummaryRow dot="#3B82F6" label="Premiership" count={summary.premiership} />
            <SummaryRow dot="#D4B949" label="CPSL Cup" count={summary.cup} muted={summary.cup === 0} />
            <div style={{ height: 1, background: "#1E2D45", margin: "4px 0" }} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  color: "#64748B",
                }}
              >
                Total matches
              </span>
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: 18,
                  color: "white",
                }}
              >
                {total}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function NavButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 28,
        height: 28,
        borderRadius: 6,
        border: "1px solid #1E2D45",
        background: hovered ? "#162040" : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "background 0.15s",
      }}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#64748B"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {direction === "left" ? (
          <path d="M15 18l-6-6 6-6" />
        ) : (
          <path d="M9 18l6-6-6-6" />
        )}
      </svg>
    </button>
  );
}

function SummaryRow({
  dot,
  label,
  count,
  muted = false,
}: {
  dot: string;
  label: string;
  count: number;
  muted?: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: dot,
            opacity: muted ? 0.4 : 1,
          }}
        />
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            color: muted ? "#475569" : "#94A3B8",
          }}
        >
          {label}
        </span>
      </div>
      <span
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: 14,
          color: muted ? "#475569" : "white",
        }}
      >
        {count}
      </span>
    </div>
  );
}

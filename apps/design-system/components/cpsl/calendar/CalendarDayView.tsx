"use client";
import { useState } from "react";
import { DayPicker, type MatchDay } from "./DayPicker";
import { CalendarMatchCard, type CalendarMatchCardProps } from "./CalendarMatchCard";
import { CalendarViewToggle, type CalendarView } from "./CalendarViewToggle";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CalendarDayViewProps {
  /** Month label — e.g. "MARCH 2026" */
  monthLabel: string;
  daysInMonth: number;
  /** 0=Sun, 1=Mon … 6=Sat — the weekday of the 1st of this month */
  startWeekday: number;
  /** Initially selected day */
  defaultDay?: number;
  /** Today's day number (highlights with gold circle) */
  todayDay?: number;
  /** Days that have matches — shown as dots in the picker */
  matchDays?: MatchDay[];
  /**
   * All matches for the month.
   * The day field is used to filter by selected date.
   */
  matches: (CalendarMatchCardProps & { day: number })[];
  /** Optional: label for the day-of-week above the date */
  getDayLabel?: (day: number) => string;
  /** Called when the user switches to month view */
  onSwitchToMonth?: () => void;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function CalendarDayView({
  monthLabel,
  daysInMonth,
  startWeekday,
  defaultDay = 1,
  todayDay,
  matchDays = [],
  matches,
  getDayLabel,
  onSwitchToMonth,
  onPrevMonth,
  onNextMonth,
}: CalendarDayViewProps) {
  const [selectedDay, setSelectedDay] = useState(defaultDay);
  const [view, setView] = useState<CalendarView>("day");

  // Filter matches for the selected day
  const dayMatches = matches.filter((m) => m.day === selectedDay);

  // Compute day-of-week for the selected day
  const selectedWeekday = (startWeekday + selectedDay - 1) % 7;
  const dayName = getDayLabel?.(selectedDay) ?? DAY_NAMES[selectedWeekday].toUpperCase();

  // Day summary for sidebar
  const dayMatchDot = matchDays.find((m) => m.day === selectedDay);
  const summary = {
    premiership: dayMatchDot?.dots.filter((d) => d === "premiership").length ?? 0,
    cup: dayMatchDot?.dots.filter((d) => d === "cup").length ?? 0,
  };

  function handleViewChange(v: CalendarView) {
    setView(v);
    if (v === "month") onSwitchToMonth?.();
  }

  function goToPrevDay() {
    setSelectedDay((d) => Math.max(1, d - 1));
  }

  function goToNextDay() {
    setSelectedDay((d) => Math.min(daysInMonth, d + 1));
  }

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        overflow: "hidden",
        background: "#091628",
      }}
    >
      {/* ── Left: DayPicker sidebar — hidden, preserved for future use ── */}
      <div style={{ display: "none" }}>
        <DayPicker
          monthLabel={monthLabel}
          daysInMonth={daysInMonth}
          startWeekday={startWeekday}
          selectedDay={selectedDay}
          todayDay={todayDay}
          matchDays={matchDays}
          summary={summary}
          onDaySelect={setSelectedDay}
          onPrevMonth={onPrevMonth}
          onNextMonth={onNextMonth}
        />
      </div>

      {/* ── Right: Day schedule ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Day header */}
        <div
          style={{
            padding: "20px 40px 16px",
            borderBottom: "1px solid #1E2D45",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <DayNavButton direction="left" onClick={goToPrevDay} disabled={selectedDay === 1} />
            <div>
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  color: "#C9A74C",
                  marginBottom: 2,
                }}
              >
                {dayName}
              </div>
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: 28,
                  letterSpacing: "-0.5px",
                  color: "white",
                  lineHeight: 1,
                }}
              >
                {selectedDay} {monthLabel}
              </div>
            </div>
            <DayNavButton direction="right" onClick={goToNextDay} disabled={selectedDay === daysInMonth} />
          </div>

          <CalendarViewToggle value={view} onChange={handleViewChange} />
        </div>

        {/* Match list */}
        <div
          style={{
            flex: 1,
            padding: "28px 40px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            overflowY: "auto",
          }}
        >
          {dayMatches.length === 0 ? (
            <EmptyState />
          ) : (
            dayMatches
              .slice()
              .sort((a, b) => a.kickoff.localeCompare(b.kickoff))
              .map((match, i) => {
                const { day: _day, ...cardProps } = match;
                return <CalendarMatchCard key={i} {...cardProps} />;
              })
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function DayNavButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 32,
        height: 32,
        borderRadius: 8,
        border: "1px solid #1E2D45",
        background: hovered && !disabled ? "#162040" : "#0D1B3E",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.35 : 1,
        transition: "background 0.15s",
      }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#64748B"
        strokeWidth="2"
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

function EmptyState() {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        padding: "60px 0",
      }}
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1E2D45"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
      </svg>
      <div>
        <div
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: 16,
            color: "#475569",
            textAlign: "center",
            letterSpacing: "0.02em",
          }}
        >
          No matches scheduled
        </div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            color: "#334155",
            textAlign: "center",
            marginTop: 4,
          }}
        >
          Select another day to view fixtures
        </div>
      </div>
    </div>
  );
}

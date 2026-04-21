"use client";
import { useState } from "react";

export type CalendarView = "month" | "day";

export interface CalendarViewToggleProps {
  value: CalendarView;
  onChange?: (view: CalendarView) => void;
}

export function CalendarViewToggle({ value, onChange }: CalendarViewToggleProps) {
  const options: { key: CalendarView; label: string }[] = [
    { key: "month", label: "MONTH" },
    { key: "day", label: "DAY" },
  ];

  return (
    <div
      style={{
        display: "flex",
        border: "1px solid #1E2D45",
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      {options.map(({ key, label }) => {
        const active = value === key;
        return (
          <ToggleButton
            key={key}
            label={label}
            active={active}
            onClick={() => onChange?.(key)}
          />
        );
      })}
    </div>
  );
}

function ToggleButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "7px 16px",
        background: active ? "#D4B949" : hovered ? "rgba(201,167,76,0.08)" : "transparent",
        border: "none",
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: active ? 700 : 600,
        fontSize: 13,
        letterSpacing: "0.05em",
        color: active ? "#041124" : hovered ? "#D4B949" : "#64748B",
        cursor: "pointer",
        transition: "background 0.15s, color 0.15s",
      }}
    >
      {label}
    </button>
  );
}

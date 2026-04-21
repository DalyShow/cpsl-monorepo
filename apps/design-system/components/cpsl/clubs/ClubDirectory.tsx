"use client";
import { useState } from "react";
import { ClubCard } from "./ClubCard";
import type { Club } from "@/lib/clubs";
import { getPoints } from "@/lib/clubs";

// ─── Types ────────────────────────────────────────────────────────────────────

type Filter = "all" | "East" | "West";

export interface ClubDirectoryProps {
  clubs: Club[];
  onClubClick?: (club: Club) => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "ALL" },
  { key: "East", label: "EAST" },
  { key: "West", label: "WEST" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function ClubDirectory({ clubs, onClubClick }: ClubDirectoryProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = clubs
    .filter((c) => filter === "all" || c.conference === filter)
    .slice()
    .sort((a, b) => getPoints(b.record) - getPoints(a.record));

  return (
    <div>
      {/* ── Toolbar ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        {/* Count */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: 30,
              color: "white",
              lineHeight: 1,
            }}
          >
            {filtered.length}
          </span>
          <span
            style={{
              fontSize: 12,
              color: "#475569",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600,
              letterSpacing: "0.06em",
            }}
          >
            {filter === "all" ? "CLUBS" : `${filter.toUpperCase()} CLUBS`}
          </span>
          <span
            style={{
              fontSize: 11,
              color: "#334155",
              marginLeft: 4,
            }}
          >
            · sorted by points
          </span>
        </div>

        {/* Conference filter */}
        <div
          style={{
            display: "flex",
            border: "1px solid #1E2D45",
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          {FILTERS.map(({ key, label }) => {
            const active = filter === key;
            return (
              <FilterButton
                key={key}
                label={label}
                active={active}
                onClick={() => setFilter(key)}
              />
            );
          })}
        </div>
      </div>

      {/* ── Club rows ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.map((club) => (
          <ClubCard
            key={club.id}
            club={club}
            onClick={onClubClick ? () => onClubClick(club) : undefined}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FilterButton({
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
        padding: "7px 18px",
        background: active ? "#C9A74C" : hovered ? "rgba(201,167,76,0.08)" : "transparent",
        border: "none",
        color: active ? "#091628" : hovered ? "#C9A74C" : "#64748B",
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 700,
        fontSize: 13,
        letterSpacing: "0.05em",
        cursor: "pointer",
        transition: "background 0.15s, color 0.15s",
      }}
    >
      {label}
    </button>
  );
}

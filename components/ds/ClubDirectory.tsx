"use client";
import { useState } from "react";
import { ClubCard } from "./ClubCard";
import type { Club } from "@/lib/clubs";
import { getPoints } from "@/lib/clubs";

type Filter = "all" | "East" | "West";

export interface ClubDirectoryProps {
  clubs: Club[];
  onClubClick?: (club: Club) => void;
}

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all",  label: "ALL"  },
  { key: "East", label: "EAST" },
  { key: "West", label: "WEST" },
];

export function ClubDirectory({ clubs, onClubClick }: ClubDirectoryProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = clubs
    .filter((c) => filter === "all" || c.conference === filter)
    .slice()
    .sort((a, b) => getPoints(b.record) - getPoints(a.record));

  return (
    <div>
      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span style={{ fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)", fontWeight: 900, fontSize: 30, color: "white", lineHeight: 1 }}>
            {filtered.length}
          </span>
          <span style={{ fontSize: 12, color: "#475569", fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)", fontWeight: 600, letterSpacing: "0.06em" }}>
            {filter === "all" ? "CLUBS" : `${filter.toUpperCase()} CLUBS`}
          </span>
        </div>

        <div style={{ display: "flex", border: "1px solid #1E2D45", borderRadius: 8, overflow: "hidden" }}>
          {FILTERS.map(({ key, label }) => (
            <FilterButton key={key} label={label} active={filter === key} onClick={() => setFilter(key)} />
          ))}
        </div>
      </div>

      {/* Club rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 0", color: "#475569", fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)", fontSize: 14 }}>
            No clubs found
          </div>
        ) : (
          filtered.map((club) => (
            <ClubCard key={club.id} club={club} onClick={onClubClick ? () => onClubClick(club) : undefined} />
          ))
        )}
      </div>
    </div>
  );
}

function FilterButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "7px 18px",
        background: active ? "#D4B949" : hovered ? "rgba(201,167,76,0.08)" : "transparent",
        border: "none",
        color: active ? "#041124" : hovered ? "#D4B949" : "#64748B",
        fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)",
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

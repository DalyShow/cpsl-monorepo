"use client";
import type { Club } from "@/lib/clubs";
import { getPoints } from "@/lib/clubs";
import { useState } from "react";

export interface ClubCardProps {
  club: Club;
  onClick?: () => void;
}

const CONF_COLORS: Record<Club["conference"], string> = {
  East: "#3B82F6",
  West: "#BF1D2D",
};

export function ClubCard({ club, onClick }: ClubCardProps) {
  const [hovered, setHovered] = useState(false);
  const pts = getPoints(club.record);
  const confColor = CONF_COLORS[club.conference];
  const { wins, draws, losses } = club.record;
  const interactive = Boolean(onClick);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => interactive && setHovered(true)}
      onMouseLeave={() => interactive && setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        background: hovered ? "#162040" : "#131B2D",
        border: `1px solid ${hovered ? "#2D4060" : "#1E2D45"}`,
        borderRadius: 12,
        overflow: "hidden",
        cursor: interactive ? "pointer" : "default",
        transition: "background 0.15s, border-color 0.15s",
        minHeight: 80,
      }}
    >
      {/* Left conference colour accent */}
      <div style={{ width: 4, alignSelf: "stretch", background: confColor, flexShrink: 0 }} />

      {/* Club crest */}
      <div style={{ width: 76, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, padding: "14px 8px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/logos/${club.logoSlug}.svg`}
          width={44}
          height={52}
          alt={`${club.name} crest`}
          style={{ objectFit: "contain", display: "block" }}
        />
      </div>

      {/* Club info */}
      <div style={{ flex: 1, padding: "14px 16px 14px 4px", minWidth: 0 }}>
        <div style={{ fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)", fontWeight: 700, fontSize: 17, color: "white", letterSpacing: "0.02em", lineHeight: 1.15, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {club.name}
        </div>
        <div style={{ fontSize: 12, color: "#64748B", marginTop: 2 }}>
          {club.location}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 7 }}>
          <span style={{ display: "inline-block", padding: "2px 7px", borderRadius: 4, background: `${confColor}1A`, border: `1px solid ${confColor}40`, color: confColor, fontSize: 10, fontWeight: 700, fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)", letterSpacing: "0.08em", lineHeight: 1.5, flexShrink: 0 }}>
            {club.conference.toUpperCase()}
          </span>
          <span style={{ fontSize: 12, color: "#475569", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {club.director}
          </span>
        </div>
      </div>

      {/* W / D / L */}
      <div style={{ display: "flex", alignItems: "center", flexShrink: 0, paddingRight: 4 }}>
        {[
          { label: "W", value: wins,   color: "#10B981" },
          { label: "D", value: draws,  color: "#94A3B8" },
          { label: "L", value: losses, color: "#F87171" },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ width: 44, textAlign: "center", padding: "10px 0" }}>
            <div style={{ fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)", fontWeight: 900, fontSize: 20, color, lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: 10, color: "#334155", fontWeight: 700, fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)", letterSpacing: "0.06em", marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Points */}
      <div style={{ width: 72, borderLeft: "1px solid #1E2D45", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "12px 0", flexShrink: 0 }}>
        <div style={{ fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)", fontWeight: 900, fontSize: 26, color: "#D4B949", lineHeight: 1 }}>{pts}</div>
        <div style={{ fontSize: 10, color: "#334155", fontWeight: 700, fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)", letterSpacing: "0.08em", marginTop: 2 }}>PTS</div>
      </div>
    </div>
  );
}

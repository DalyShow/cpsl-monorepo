"use client";
import { useState } from "react";

export interface TabBarProps {
  tabs?: string[];
  variant?: "underline" | "pill";
  defaultActive?: number;
  /** If true, tab buttons stretch to fill the full available width equally */
  stretch?: boolean;
}

export function TabBar({
  tabs = ["Overview", "Matches", "Players", "Stats"],
  variant = "underline",
  defaultActive = 0,
  stretch = false,
}: TabBarProps) {
  const [active, setActive] = useState(defaultActive);

  if (variant === "pill") {
    return (
      <div
        className={`flex gap-1.5 p-1 rounded-xl ${stretch ? "w-full" : ""}`}
        style={{
          background: "#F4F6FA",
          display: stretch ? "flex" : "inline-flex",
        }}
      >
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActive(i)}
            className={`py-2 rounded-lg text-sm font-semibold transition-all ${stretch ? "flex-1" : "px-4"}`}
            style={{
              background: i === active ? "white" : "transparent",
              color: i === active ? "#091628" : "#94A3B8",
              boxShadow: i === active ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              cursor: "pointer",
              border: "none",
            }}
          >
            {tab}
          </button>
        ))}
      </div>
    );
  }

  // Underline variant (default)
  return (
    <div
      className={`flex border-b ${stretch ? "w-full" : ""}`}
      style={{ borderColor: "#E2E8F0" }}
    >
      {tabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => setActive(i)}
          className={`py-3 text-sm font-semibold border-b-2 -mb-px transition-all ${stretch ? "flex-1" : "px-5"}`}
          style={{
            color: i === active ? "#C9A74C" : "#94A3B8",
            borderColor: i === active ? "#C9A74C" : "transparent",
            background: "none",
            cursor: "pointer",
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

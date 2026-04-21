import React from "react";

export interface ActivityItem {
  /** Icon character or React node */
  icon: React.ReactNode;
  title: string;
  sub: string;
  time: string;
  /** Hex color used for the icon background tint */
  color: string;
}

export interface ActivityListProps {
  items: ActivityItem[];
}

export function ActivityList({ items }: ActivityListProps) {
  return (
    <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "#E2E8F0", background: "white" }}>
      {items.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-4 px-5 py-4 border-b"
          style={{ borderColor: "#F1F5F9" }}
        >
          {/* Icon */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0"
            style={{ background: `${item.color}22` }}
          >
            {item.icon}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold" style={{ color: "#091628" }}>{item.title}</div>
            <div className="text-xs" style={{ color: "#94A3B8" }}>{item.sub}</div>
          </div>

          {/* Time */}
          <span className="text-xs flex-shrink-0" style={{ color: "#94A3B8" }}>{item.time}</span>
        </div>
      ))}
    </div>
  );
}

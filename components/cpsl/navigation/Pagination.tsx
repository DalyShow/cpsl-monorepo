"use client";
import { useState } from "react";

export interface PaginationProps {
  totalPages?: number;
  defaultPage?: number;
}

function buildPageList(current: number, total: number): (number | "…")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 4) {
    return [1, 2, 3, 4, 5, "…", total];
  }
  if (current >= total - 3) {
    return [1, "…", total - 4, total - 3, total - 2, total - 1, total];
  }
  return [1, "…", current - 1, current, current + 1, "…", total];
}

export function Pagination({ totalPages = 8, defaultPage = 1 }: PaginationProps) {
  const [current, setCurrent] = useState(defaultPage);
  const pages = buildPageList(current, totalPages);

  return (
    <div className="flex items-center gap-1.5">
      {/* Previous */}
      <button
        onClick={() => setCurrent((p) => Math.max(1, p - 1))}
        disabled={current === 1}
        className="flex items-center justify-center px-3 py-2 rounded-lg text-sm border transition-colors"
        style={{
          borderColor: "#E2E8F0",
          color: current === 1 ? "#CBD5E1" : "#94A3B8",
          background: "white",
          cursor: current === 1 ? "not-allowed" : "pointer",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Page buttons */}
      {pages.map((p, i) =>
        p === "…" ? (
          <span
            key={`ellipsis-${i}`}
            className="w-8 h-8 flex items-center justify-center text-sm"
            style={{ color: "#94A3B8" }}
          >
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => setCurrent(p as number)}
            className="w-8 h-8 rounded-lg text-sm font-semibold transition-all"
            style={{
              background: p === current ? "#C9A74C" : "transparent",
              color: p === current ? "white" : "#475569",
              cursor: "pointer",
              border: "none",
            }}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => setCurrent((p) => Math.min(totalPages, p + 1))}
        disabled={current === totalPages}
        className="flex items-center justify-center px-3 py-2 rounded-lg text-sm border transition-colors"
        style={{
          borderColor: "#E2E8F0",
          color: current === totalPages ? "#CBD5E1" : "#475569",
          background: "white",
          cursor: current === totalPages ? "not-allowed" : "pointer",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

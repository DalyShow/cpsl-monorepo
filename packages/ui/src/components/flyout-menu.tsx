"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export interface FlyoutItem {
  label: string;
  description: string;
  href?: string;
  /** Inline icon node (code consumers). Takes precedence over iconUrl. */
  icon?: React.ReactNode;
  /** URL to an icon asset (CMS consumers). Rendered as <img> when no icon node is supplied. */
  iconUrl?: string;
}

export interface FlyoutAction {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  iconUrl?: string;
}

export interface FlyoutMenuProps {
  /** Trigger button label */
  label: string;
  /** Menu items shown in the main panel */
  items: FlyoutItem[];
  /** Optional footer actions rendered in the bottom bar */
  actions?: FlyoutAction[];
  /** Panel width — defaults to "md" (448px) */
  size?: "sm" | "md" | "lg";
}

const SIZES = {
  sm: "w-72",
  md: "w-[28rem]",
  lg: "w-[36rem]",
} as const;

function renderIcon(
  icon: React.ReactNode | undefined,
  iconUrl: string | undefined,
  size: number,
): React.ReactNode {
  if (icon) return icon;
  if (iconUrl) {
    return (
      <img
        src={iconUrl}
        alt=""
        aria-hidden
        width={size}
        height={size}
        style={{ width: size, height: size, objectFit: "contain" }}
      />
    );
  }
  return null;
}

const HOVER_CLOSE_DELAY = 200;

export function FlyoutMenu({
  label,
  items,
  actions,
  size = "md",
}: FlyoutMenuProps) {
  const [open, setOpen] = useState(false);
  const [alignRight, setAlignRight] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const openNow = useCallback(() => {
    cancelClose();
    setOpen(true);
  }, [cancelClose]);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimerRef.current = window.setTimeout(() => {
      setOpen(false);
      closeTimerRef.current = null;
    }, HOVER_CLOSE_DELAY);
  }, [cancelClose]);

  useEffect(() => () => cancelClose(), [cancelClose]);

  const checkAlignment = useCallback(() => {
    if (!containerRef.current || !panelRef.current) return;
    const triggerRect = containerRef.current.getBoundingClientRect();
    const panelWidth = panelRef.current.offsetWidth;
    setAlignRight(triggerRect.left + panelWidth > window.innerWidth - 16);
  }, []);

  useEffect(() => {
    if (open) checkAlignment();
  }, [open, checkAlignment]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={openNow}
      onMouseLeave={scheduleClose}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="inline-flex items-center gap-1.5 transition-colors"
        style={{
          color: open ? "#C9A74C" : "white",
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 600,
          fontSize: "14px",
          letterSpacing: "0.11em",
          textTransform: "uppercase",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "0",
        }}
      >
        <span>{label}</span>
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className="transition-transform duration-200"
          style={{
            width: 16,
            height: 16,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            color: open ? "#C9A74C" : "#7A9BAA",
          }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
          />
        </svg>
      </button>

      <div
        ref={panelRef}
        role="menu"
        className={`
          absolute top-full z-50 mt-3
          ${alignRight ? "right-0" : "left-0"}
          ${SIZES[size]}
          transition-all duration-200 origin-top-left
          ${open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-1 pointer-events-none"
          }
        `}
        style={{
          background: "#091628",
          borderRadius: "16px",
          border: "1px solid #1E2D45",
          overflow: "hidden",
          boxShadow: "0 24px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(201,167,76,0.06)",
        }}
      >
        <div className="p-3">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href ?? "#"}
              role="menuitem"
              className="group relative flex gap-4 rounded-xl p-3.5 transition-colors"
              style={{ textDecoration: "none" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(201,167,76,0.06)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              onClick={() => setOpen(false)}
            >
              <div
                className="mt-0.5 flex shrink-0 items-center justify-center transition-colors"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "#0D1B3E",
                  border: "1px solid #1E2D45",
                  color: "#64748B",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#162040";
                  e.currentTarget.style.color = "#C9A74C";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#0D1B3E";
                  e.currentTarget.style.color = "#64748B";
                }}
              >
                {renderIcon(item.icon, item.iconUrl, 20)}
              </div>

              <div className="flex-1 min-w-0">
                <div
                  className="font-semibold leading-tight mb-0.5"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 600,
                    fontSize: "15px",
                    color: "white",
                    letterSpacing: "0.01em",
                  }}
                >
                  {item.label}
                </div>
                <p
                  className="leading-relaxed"
                  style={{ fontSize: "13px", color: "#64748B", margin: 0 }}
                >
                  {item.description}
                </p>
              </div>

              <div
                className="mt-1 self-start opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                style={{ color: "#C9A74C" }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {actions && actions.length > 0 && (
          <div
            className="flex"
            style={{
              borderTop: "1px solid #1E2D45",
              background: "#0D1B3E",
            }}
          >
            {actions.map((action) => (
              <a
                key={action.label}
                href={action.href ?? "#"}
                className="flex flex-1 items-center justify-center gap-2 py-3 transition-colors"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 600,
                  fontSize: "13px",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "#94A3B8",
                  textDecoration: "none",
                  borderRight: "1px solid #1E2D45",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(201,167,76,0.08)";
                  e.currentTarget.style.color = "#C9A74C";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#94A3B8";
                }}
                onClick={() => setOpen(false)}
              >
                <span style={{ display: "inline-flex", color: "inherit" }}>
                  {renderIcon(action.icon, action.iconUrl, 16)}
                </span>
                {action.label}
              </a>
            ))}
          </div>
        )}

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background:
              "linear-gradient(90deg, #C9A74C 0%, rgba(201,167,76,0.3) 100%)",
            borderRadius: "16px 16px 0 0",
          }}
        />
      </div>
    </div>
  );
}

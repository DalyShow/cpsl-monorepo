"use client";

import * as React from "react";

export type ArrowPillTone = "dark" | "light";
export type ArrowPillSize = "sm" | "md" | "lg";

export interface ArrowPillButtonProps {
  /** Visible label */
  children:  React.ReactNode;
  /** Render as `<a>` when set, otherwise renders a `<button>`. */
  href?:     string;
  /**
   * Color tone:
   * - "dark"  → white pill with navy ink + navy icon disc (use on light/photo surfaces)
   * - "light" → translucent cream pill with cream ink + cream icon disc (use on dark surfaces)
   */
  tone?:     ArrowPillTone;
  /** Size preset. Default `md`. */
  size?:     ArrowPillSize;
  /** Optional override for the trailing icon. Default: arrow. */
  icon?:     React.ReactNode;
  onClick?:  React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  className?: string;
  /** ARIA label override. Falls back to the visible children text. */
  "aria-label"?: string;
}

const ARROW_ICON = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
    <path
      d="M3 7H11M11 7L7 3M11 7L7 11"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const sizeMap: Record<ArrowPillSize, { pillH: number; pad: string; gap: number; iconSize: number; fontSize: number }> = {
  sm: { pillH: 36, pad: "0.375rem 0.375rem 0.375rem 1rem",   gap: 10, iconSize: 28, fontSize: 12 },
  md: { pillH: 44, pad: "0.375rem 0.375rem 0.375rem 1.25rem", gap: 12, iconSize: 36, fontSize: 14 },
  lg: { pillH: 52, pad: "0.5rem 0.5rem 0.5rem 1.5rem",        gap: 14, iconSize: 40, fontSize: 16 },
};

const toneMap: Record<ArrowPillTone, {
  pillBg:        string;
  pillBorder:    string;
  pillColor:     string;
  iconBg:        string;
  iconColor:     string;
  hoverShadow:   string;
}> = {
  dark: {
    pillBg:      "#FFFFFF",
    pillBorder:  "transparent",
    pillColor:   "#091628",
    iconBg:      "#C9A74C",
    iconColor:   "#091628",
    hoverShadow: "0 8px 24px rgba(9,22,40,0.18)",
  },
  light: {
    pillBg:      "rgba(244, 239, 230, 0.16)",
    pillBorder:  "rgba(244, 239, 230, 0.22)",
    pillColor:   "#F4EFE6",
    iconBg:      "#F4EFE6",
    iconColor:   "#091628",
    hoverShadow: "0 8px 24px rgba(0,0,0,0.18)",
  },
};

export function ArrowPillButton({
  children,
  href,
  tone     = "dark",
  size     = "md",
  icon     = ARROW_ICON,
  onClick,
  className,
  ...rest
}: ArrowPillButtonProps) {
  const s = sizeMap[size];
  const c = toneMap[tone];

  const style: React.CSSProperties = {
    display:      "inline-flex",
    alignItems:   "center",
    gap:          s.gap,
    height:       s.pillH,
    padding:      s.pad,
    borderRadius: 999,
    background:   c.pillBg,
    color:        c.pillColor,
    border:       `1px solid ${c.pillBorder}`,
    fontFamily:   "'Barlow Condensed', sans-serif",
    fontWeight:   700,
    fontSize:     s.fontSize,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    textDecoration: "none",
    cursor:       "pointer",
    transition:   "transform 220ms cubic-bezier(.2,.8,.2,1), box-shadow 220ms ease",
  };

  const iconWrapperStyle: React.CSSProperties = {
    flex:         "0 0 auto",
    width:        s.iconSize,
    height:       s.iconSize,
    display:      "inline-flex",
    alignItems:   "center",
    justifyContent: "center",
    borderRadius: 999,
    background:   c.iconBg,
    color:        c.iconColor,
  };

  const onMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform   = "scale(1.02)";
    e.currentTarget.style.boxShadow   = c.hoverShadow;
  };
  const onMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform   = "scale(1)";
    e.currentTarget.style.boxShadow   = "none";
  };

  const inner = (
    <>
      <style>{`
        .apb-arrow {
          display: inline-flex;
          transition: transform 320ms cubic-bezier(.2, .8, .2, 1);
        }
        .apb-root:hover .apb-arrow,
        .apb-root:focus-visible .apb-arrow {
          transform: translateX(3px);
        }
        @media (prefers-reduced-motion: reduce) {
          .apb-arrow { transition: none; }
        }
      `}</style>
      <span>{children}</span>
      <span style={iconWrapperStyle} aria-hidden>
        <span className="apb-arrow">{icon}</span>
      </span>
    </>
  );

  const rootClass = ["apb-root", className].filter(Boolean).join(" ");

  if (href) {
    return (
      <a
        href={href}
        style={style}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={rootClass}
        {...rest}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      type="button"
      style={style}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={rootClass}
      {...rest}
    >
      {inner}
    </button>
  );
}

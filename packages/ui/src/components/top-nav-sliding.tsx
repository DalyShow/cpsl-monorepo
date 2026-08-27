"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { TopNavItem, TopNavFlyoutItem, TopNavProps } from "./top-nav";
import type { FlyoutItem } from "./flyout-menu";
import { ArrowPillButton } from "./arrow-pill-button";

/**
 * TopNavSliding — shadcn/Radix NavigationMenu-style desktop dropdowns.
 *
 * Instead of each flyout owning its own popover, ONE shared viewport
 * panel lives under the bar. Hovering a trigger opens it; moving to a
 * neighbouring trigger keeps it open and the panel glides across,
 * animating position + size while the old content slides out and the
 * new content slides in from the direction of travel.
 *
 * Visual language matches the classic FlyoutMenu panel, minus the gold
 * top strip. The mobile menu is unchanged from TopNav.
 */

function isActiveHref(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function isFlyoutItem(item: TopNavItem): item is TopNavFlyoutItem {
  return "flyout" in item && !!item.flyout;
}

const PANEL_W = { sm: 288, md: 448, lg: 576 } as const;
const CLOSE_DELAY = 180;
const EDGE_GUTTER = 16;

function FlyoutCard({ item, onNavigate }: { item: FlyoutItem; onNavigate: () => void }) {
  return (
    <a
      href={item.href ?? "#"}
      role="menuitem"
      className="group relative flex gap-4 rounded-xl p-3.5 transition-colors hover:bg-[rgba(201,167,76,0.06)]"
      style={{ textDecoration: "none" }}
      onClick={onNavigate}
    >
      <div
        className="mt-0.5 flex shrink-0 items-center justify-center transition-colors group-hover:!bg-[#162040]"
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: "#0D1B3E",
          border: "1px solid #1E2D45",
        }}
      >
        {item.icon ??
          (item.iconUrl ? (
            <img
              src={item.iconUrl}
              alt=""
              aria-hidden
              width={20}
              height={20}
              style={{ width: 20, height: 20, objectFit: "contain" }}
            />
          ) : null)}
      </div>

      <div className="flex-1 min-w-0">
        <div
          className="leading-tight mb-0.5"
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
        <p className="leading-relaxed" style={{ fontSize: "13px", color: "#64748B", margin: 0 }}>
          {item.description}
        </p>
      </div>

      <div
        className="mt-1 self-start opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
        style={{ color: "#C9A74C" }}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </a>
  );
}

export function TopNavSliding({
  items = [],
  logoSrc = "/cpsl-horizontal.svg?v=2026-04-23",
  logoAlt = "CPSL",
  homeHref = "/",
  ctaLabel,
  ctaHref,
  ctaNewWindow,
  showLive = false,
  position = "fixed",
}: TopNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const pathname = usePathname() ?? "/";

  // ── Shared-viewport flyout state ─────────────────────────────────────
  const flyoutIndexes = items.map((it, i) => (isFlyoutItem(it) ? i : -1)).filter((i) => i >= 0);
  const [active, setActive] = useState<number | null>(null);
  const [leaving, setLeaving] = useState<{ idx: number; dir: "left" | "right" } | null>(null);
  const [enterDir, setEnterDir] = useState<"left" | "right" | null>(null);
  const [panel, setPanel] = useState({ left: 0, width: 0, height: 0 });
  const [visible, setVisible] = useState(false);
  // True for the commit that positions a freshly opened panel — disables
  // the left/width/height transition so it doesn't zoom in from its last
  // (or initial 0,0) position; the next frame re-enables it and fades in.
  const [instant, setInstant] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Record<number, HTMLButtonElement | null>>({});
  const contentRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const closeTimer = useRef<number | null>(null);
  const leaveTimer = useRef<number | null>(null);
  const skipSlide = useRef(false);

  const cancelClose = useCallback(() => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const close = useCallback(() => {
    cancelClose();
    setVisible(false);
    setActive(null);
    setLeaving(null);
    setEnterDir(null);
  }, [cancelClose]);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = window.setTimeout(close, CLOSE_DELAY);
  }, [cancelClose, close]);

  const activate = useCallback(
    (idx: number) => {
      cancelClose();
      setActive((prev) => {
        if (prev === idx) return prev;
        if (prev === null) {
          // Fresh open: place the panel instantly (no cross-screen slide
          // from a stale position), then fade it in.
          skipSlide.current = true;
          setInstant(true);
          setEnterDir(null);
          setLeaving(null);
        } else {
          const dir: "left" | "right" = idx > prev ? "right" : "left";
          setEnterDir(dir);
          setLeaving({ idx: prev, dir });
          if (leaveTimer.current !== null) window.clearTimeout(leaveTimer.current);
          leaveTimer.current = window.setTimeout(() => setLeaving(null), 220);
        }
        return idx;
      });
    },
    [cancelClose],
  );

  // Measure + position the viewport whenever the active flyout changes.
  useLayoutEffect(() => {
    if (active === null || !headerRef.current) return;
    const item = items[active];
    if (!item || !isFlyoutItem(item)) return;

    const trigger = triggerRefs.current[active];
    const content = contentRefs.current[active];
    if (!trigger) return;

    const width = PANEL_W[item.flyout.size ?? "md"];
    const headerRect = headerRef.current.getBoundingClientRect();
    const trigRect = trigger.getBoundingClientRect();

    let left = trigRect.left - headerRect.left + trigRect.width / 2 - width / 2;
    left = Math.max(EDGE_GUTTER, Math.min(left, headerRect.width - width - EDGE_GUTTER));
    const height = content ? content.offsetHeight : panel.height;

    setPanel({ left, width, height });

    if (skipSlide.current) {
      skipSlide.current = false;
      // rAF gives the browser one frame to commit the closed state before
      // the fade-in transition; the timeout backstops throttled/frozen rAF
      // (background tabs) so the menu can never stay invisible.
      const show = () => {
        setInstant(false);
        setVisible(true);
      };
      const raf = requestAnimationFrame(show);
      const timer = window.setTimeout(show, 80);
      return () => {
        cancelAnimationFrame(raf);
        window.clearTimeout(timer);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, items]);

  useEffect(
    () => () => {
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
      if (leaveTimer.current !== null) window.clearTimeout(leaveTimer.current);
    },
    [],
  );

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (active !== null) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [active, close]);

  // ── Mobile menu plumbing (same as TopNav) ────────────────────────────
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onResize = () => {
      setMenuOpen(false);
      close();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [close]);

  useEffect(() => {
    if (!menuOpen) {
      setExpanded(null);
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const isFixed = position === "fixed";

  return (
    <header
      ref={headerRef}
      className={isFixed ? "fixed top-0 left-0 right-0 z-50 h-20" : "relative w-full h-20"}
      style={{ background: "#041124", borderBottom: "1px solid #1E2D45" }}
      onMouseLeave={scheduleClose}
      onMouseEnter={cancelClose}
    >
      <style>{`
        @keyframes cpsl-vp-in-right { from { opacity: 0; transform: translateX(64px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes cpsl-vp-in-left  { from { opacity: 0; transform: translateX(-64px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes cpsl-vp-out-left  { from { opacity: 1; transform: translateX(0); } to { opacity: 0; transform: translateX(-64px); } }
        @keyframes cpsl-vp-out-right { from { opacity: 1; transform: translateX(0); } to { opacity: 0; transform: translateX(64px); } }
        .cpsl-vp-item { position: absolute; top: 0; left: 0; }
        .cpsl-vp-item[data-motion="in-right"] { animation: cpsl-vp-in-right 240ms cubic-bezier(.22,1,.36,1) both; }
        .cpsl-vp-item[data-motion="in-left"]  { animation: cpsl-vp-in-left  240ms cubic-bezier(.22,1,.36,1) both; }
        .cpsl-vp-item[data-motion="out-left"]  { animation: cpsl-vp-out-left  200ms ease both; }
        .cpsl-vp-item[data-motion="out-right"] { animation: cpsl-vp-out-right 200ms ease both; }
        @media (prefers-reduced-motion: reduce) {
          .cpsl-vp-item { animation: none !important; }
        }
      `}</style>

      <div className="h-full flex md:grid md:grid-cols-[1fr_auto_1fr] items-center justify-between px-4 md:px-[30px]">
        {/* Logo */}
        <Link href={homeHref} className="flex items-center py-3 flex-shrink-0">
          <Image src={logoSrc} alt={logoAlt} width={240} height={40} unoptimized priority />
        </Link>

        {/* Centered nav */}
        <nav className="hidden md:flex gap-1 justify-self-center items-center">
          {items.map((item, idx) =>
            isFlyoutItem(item) ? (
              <button
                key={item.label}
                ref={(el) => {
                  triggerRefs.current[idx] = el;
                }}
                type="button"
                aria-expanded={active === idx}
                aria-haspopup="true"
                className="inline-flex items-center gap-1.5 px-4 py-4 transition-colors"
                style={{
                  color: active === idx ? "#C9A74C" : "#F4EFE6",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  letterSpacing: "0.11em",
                  textTransform: "uppercase",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={() => activate(idx)}
                onFocus={() => activate(idx)}
                onClick={() => (active === idx ? close() : activate(idx))}
              >
                <span>{item.label}</span>
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="transition-transform duration-200"
                  style={{
                    width: 16,
                    height: 16,
                    transform: active === idx ? "rotate(180deg)" : "rotate(0deg)",
                    color: active === idx ? "#C9A74C" : "#7A9BAA",
                  }}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  />
                </svg>
              </button>
            ) : (
              (() => {
                const activeLink = isActiveHref(pathname, item.href || "");
                return (
                  <Link
                    key={item.label}
                    href={item.href || "#"}
                    className="px-4 py-4 transition-colors text-[#F4EFE6] hover:text-[#7A9BAA]"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 600,
                      fontSize: "14px",
                      textTransform: "uppercase",
                      letterSpacing: "0.11em",
                    }}
                    aria-current={activeLink ? "page" : undefined}
                    onMouseEnter={scheduleClose}
                  >
                    <span className="relative inline-block">
                      {item.label}
                      <span
                        aria-hidden
                        style={{
                          position: "absolute",
                          left: 0,
                          right: 0,
                          bottom: -6,
                          height: 2,
                          background: activeLink ? "#D4B949" : "transparent",
                          transition: "background 180ms ease",
                        }}
                      />
                    </span>
                  </Link>
                );
              })()
            ),
          )}
        </nav>

        {/* Right slot */}
        <div className="flex items-center gap-2 sm:gap-3 justify-self-end">
          {showLive && (
            <div
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold"
              style={{ background: "#FF1744", color: "white" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="hidden sm:inline">Live</span>
            </div>
          )}

          {ctaLabel && (
            <span className="hidden md:inline-flex">
              <ArrowPillButton href={ctaHref || "#"} newWindow={ctaNewWindow} tone="dark" size="sm">
                {ctaLabel}
              </ArrowPillButton>
            </span>
          )}

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col items-center justify-center gap-1.5 w-8 h-8 mr-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className="h-0.5 w-6 transition-transform"
              style={{
                background: "#F4EFE6",
                transform: menuOpen ? "translateY(8px) rotate(45deg)" : undefined,
              }}
            />
            <span
              className="h-0.5 w-6 transition-opacity"
              style={{ background: "#F4EFE6", opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="h-0.5 w-6 transition-transform"
              style={{
                background: "#F4EFE6",
                transform: menuOpen ? "translateY(-8px) rotate(-45deg)" : undefined,
              }}
            />
          </button>
        </div>
      </div>

      {/* ── Shared sliding viewport ───────────────────────────────────── */}
      <div
        aria-hidden={active === null}
        className="hidden md:block"
        style={{
          position: "absolute",
          top: "calc(100% + 10px)",
          left: panel.left,
          width: panel.width,
          height: panel.height,
          background: "#091628",
          borderRadius: 16,
          border: "1px solid #1E2D45",
          overflow: "hidden",
          boxShadow: "0 24px 48px rgba(0,0,0,0.45)",
          opacity: visible && active !== null ? 1 : 0,
          transform: visible && active !== null ? "translateY(0)" : "translateY(-4px)",
          pointerEvents: visible && active !== null ? "auto" : "none",
          transition: instant
            ? "none"
            : "left 320ms cubic-bezier(.22,1,.36,1), width 320ms cubic-bezier(.22,1,.36,1), height 320ms cubic-bezier(.22,1,.36,1), opacity 200ms ease, transform 200ms ease",
        }}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      >
        {/* Invisible bridge over the 10px gap so the pointer can travel
            from the bar into the panel without triggering the close delay. */}
        <div style={{ position: "absolute", top: -12, left: 0, right: 0, height: 12 }} />

        {flyoutIndexes.map((idx) => {
          const item = items[idx] as TopNavFlyoutItem;
          const isActive = active === idx;
          const isLeaving = leaving?.idx === idx;
          if (!isActive && !isLeaving) {
            // Keep mounted for measurement, hidden from view + a11y.
            return (
              <div
                key={item.label}
                ref={(el) => {
                  contentRefs.current[idx] = el;
                }}
                className="cpsl-vp-item"
                style={{ width: PANEL_W[item.flyout.size ?? "md"], visibility: "hidden", pointerEvents: "none" }}
              >
                <div className="p-3">
                  {item.flyout.items.map((sub) => (
                    <FlyoutCard key={sub.label} item={sub} onNavigate={close} />
                  ))}
                </div>
              </div>
            );
          }
          const motion = isLeaving
            ? leaving!.dir === "right"
              ? "out-left"
              : "out-right"
            : enterDir
              ? enterDir === "right"
                ? "in-right"
                : "in-left"
              : undefined;
          return (
            <div
              key={item.label}
              ref={(el) => {
                contentRefs.current[idx] = el;
              }}
              role="menu"
              className="cpsl-vp-item"
              data-motion={motion}
              style={{
                width: PANEL_W[item.flyout.size ?? "md"],
                pointerEvents: isActive ? "auto" : "none",
                zIndex: isActive ? 2 : 1,
              }}
            >
              <div className="p-3">
                {item.flyout.items.map((sub) => (
                  <FlyoutCard key={sub.label} item={sub} onNavigate={close} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile menu — unchanged from TopNav. */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-x-0 top-20 bottom-0 z-40 overflow-y-auto px-6"
          style={{ background: "#041124" }}
        >
          <nav className="flex flex-col pt-4 pb-10 min-h-full">
            {items.map((item) => {
              if (isFlyoutItem(item)) {
                const isExpanded = expanded === item.label;
                return (
                  <div key={item.label} style={{ borderBottom: "1px solid #1E2D45" }}>
                    <button
                      type="button"
                      onClick={() => setExpanded(isExpanded ? null : item.label)}
                      aria-expanded={isExpanded}
                      className="w-full flex items-center justify-between py-5 text-left"
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: isExpanded ? "#D4B949" : "#F4EFE6",
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                        fontSize: "22px",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        lineHeight: 1,
                        padding: "20px 0",
                      }}
                    >
                      {item.label}
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                        style={{
                          flexShrink: 0,
                          transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 180ms ease",
                        }}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    {isExpanded && (
                      <div
                        className="flex flex-col pb-4"
                        style={{ borderLeft: "2px solid #1E2D45", marginLeft: 2, paddingLeft: 18 }}
                      >
                        {item.flyout.items.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href || "#"}
                            onClick={() => setMenuOpen(false)}
                            className="py-3"
                            style={{
                              color: isActiveHref(pathname, sub.href || "") ? "#D4B949" : "#C8D2DF",
                              fontFamily: "'Barlow Condensed', sans-serif",
                              fontWeight: 600,
                              fontSize: "18px",
                              textTransform: "uppercase",
                              letterSpacing: "0.07em",
                              lineHeight: 1,
                            }}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={item.label}
                  href={item.href || "#"}
                  onClick={() => setMenuOpen(false)}
                  className="block py-5"
                  style={{
                    color: isActiveHref(pathname, item.href || "") ? "#D4B949" : "#F4EFE6",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: "22px",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    lineHeight: 1,
                    borderBottom: "1px solid #1E2D45",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
            {ctaLabel && (
              <div className="mt-8">
                <ArrowPillButton
                  href={ctaHref || "#"}
                  newWindow={ctaNewWindow}
                  tone="dark"
                  size="md"
                  onClick={() => setMenuOpen(false)}
                >
                  {ctaLabel}
                </ArrowPillButton>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

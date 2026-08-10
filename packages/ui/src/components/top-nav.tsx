"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FlyoutMenu, type FlyoutItem, type FlyoutAction } from "./flyout-menu";
import { ArrowPillButton } from "./arrow-pill-button";

/**
 * Decide whether a nav link is the "active" one for the current path.
 *  - Root (/) is only active when the path is exactly /
 *  - Sub-pages match when the pathname starts with the link's href
 *    (so /league-information AND /league-information/handbook both
 *    light up the "League Info" link)
 */
function isActiveHref(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export interface TopNavLinkItem {
  label: string;
  href: string;
}

export interface TopNavFlyoutItem {
  label: string;
  flyout: {
    size?: "sm" | "md" | "lg";
    items: FlyoutItem[];
    actions?: FlyoutAction[];
  };
}

export type TopNavItem = TopNavLinkItem | TopNavFlyoutItem;

function isFlyoutItem(item: TopNavItem): item is TopNavFlyoutItem {
  return "flyout" in item && !!item.flyout;
}

export interface TopNavProps {
  items?: TopNavItem[];
  logoSrc?: string;
  logoAlt?: string;
  homeHref?: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaNewWindow?: boolean;
  showLive?: boolean;
  /** "fixed" pins the bar to the viewport (production default).
   *  "static" renders inline for showcase/catalog contexts. */
  position?: "fixed" | "static";
}

export function TopNav({
  items = [
    { label: "League Information",   href: "#league"  },
    { label: "For Teams",            href: "#teams"   },
    { label: "For Coaches/Managers", href: "#coaches" },
    { label: "Contact",              href: "#contact" },
  ],
  logoSrc  = "/cpsl-horizontal.svg?v=2026-04-23",
  logoAlt  = "CPSL",
  homeHref = "/",
  // No defaults — consumers (e.g. siteSettings) are the source of truth.
  // When the CTA fields are cleared in Sanity, the button doesn't render.
  ctaLabel,
  ctaHref,
  ctaNewWindow,
  showLive = false,
  position = "fixed",
}: TopNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    // Close mobile menu on route change or viewport resize.
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  const isFixed = position === "fixed";
  return (
    <header
      className={
        isFixed
          ? "fixed top-0 left-0 right-0 z-50 h-20"
          : "relative w-full h-20"
      }
      style={{ background: "#041124", borderBottom: "1px solid #1E2D45" }}
    >
      {/* Mobile: flex + justify-between so the hamburger snaps to the right
          edge even when the 240-wide logo would otherwise crowd a 1fr grid
          column. Desktop: 1fr | auto | 1fr keeps the centered nav anchored
          to the header's true centre, independent of logo width or the
          presence of a CTA / hamburger / nothing at all in the right slot. */}
      <div className="h-full flex md:grid md:grid-cols-[1fr_auto_1fr] items-center justify-between px-4 md:px-[30px]">

        {/* Logo */}
        <Link
          href={homeHref}
          className="flex items-center py-3 flex-shrink-0"
        >
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={240}
            height={40}
            unoptimized
            priority
          />
        </Link>

        {/* Centered nav */}
        <nav className="hidden md:flex gap-1 justify-self-center items-center">
          {items.map((item) =>
            isFlyoutItem(item) ? (
              <div
                key={item.label}
                className="px-4 py-4 border-b-2"
                style={{ borderColor: "transparent" }}
              >
                <FlyoutMenu
                  label={item.label}
                  size={item.flyout.size}
                  items={item.flyout.items}
                  actions={item.flyout.actions}
                />
              </div>
            ) : (
              (() => {
                const active = isActiveHref(pathname, item.href || "");
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
                    aria-current={active ? "page" : undefined}
                  >
                    <span className="relative inline-block">
                      {item.label}
                      {/* Active underline: matches the text width and sits
                          4 px below the baseline so it reads as belonging
                          to the link rather than floating in the padding. */}
                      <span
                        aria-hidden
                        style={{
                          position:    "absolute",
                          left:        0,
                          right:       0,
                          bottom:      -6,
                          height:      2,
                          background:  active ? "#D4B949" : "transparent",
                          transition:  "background 180ms ease",
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
              style={{
                background: "#F4EFE6",
                opacity: menuOpen ? 0 : 1,
              }}
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

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden absolute left-0 right-0 top-20 px-4"
          style={{
            background: "#041124",
            borderBottom: "1px solid #1E2D45",
          }}
        >
          <nav className="flex flex-col py-4 gap-1">
            {items.map((item) =>
              isFlyoutItem(item) ? (
                <div key={item.label} className="py-2">
                  <div
                    className="px-3 pt-2 pb-1"
                    style={{
                      color: "#7A9BAA",
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 600,
                      fontSize: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      opacity: 0.7,
                    }}
                  >
                    {item.label}
                  </div>
                  {item.flyout.items.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href || "#"}
                      onClick={() => setMenuOpen(false)}
                      className="block px-3 py-2.5"
                      style={{
                        color: "white",
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 600,
                        fontSize: "15px",
                      }}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href || "#"}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-3"
                  style={{
                    color: isActiveHref(pathname, item.href || "") ? "#D4B949" : "#F4EFE6",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 600,
                    fontSize: "14px",
                    textTransform: "uppercase",
                    letterSpacing: "0.11em",
                  }}
                >
                  {item.label}
                </Link>
              ),
            )}
            {ctaLabel && (
              <div className="mt-2">
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

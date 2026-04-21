"use client";

// Ported from CPSL Design System — components/cpsl/modules/LogoTicker.tsx

import { useEffect, useRef, useState } from "react";

// Tile scaled down to match the hero's proportions.
const TILE_SIZE = 37;
const GAP = 30;

interface TickerLogo {
  _key?: string;
  asset?: { url?: string };
  altText?: string;
}

export interface LogoTickerBlockProps {
  heading?: string;
  logos?: TickerLogo[];
  durationSeconds?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  edgeFade?: boolean;
  sectionBackground?: string;
}

export function LogoTickerBlock({
  heading,
  logos,
  durationSeconds = 80,
  reverse = false,
  pauseOnHover = true,
  edgeFade = true,
  sectionBackground = "transparent",
}: LogoTickerBlockProps) {
  const items = (logos ?? []).filter((l) => l?.asset?.url);

  const viewportRef = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    if (items.length === 0) return;
    const vp = viewportRef.current;
    if (!vp) return;

    // Width of a single set as laid out in flex (with trailing gap — see below).
    const singleSetWidth = items.length * TILE_SIZE + items.length * GAP;

    const check = () => {
      setShouldScroll(singleSetWidth - GAP > vp.clientWidth);
    };
    check();

    const ro = new ResizeObserver(check);
    ro.observe(vp);
    return () => ro.disconnect();
  }, [items.length]);

  if (items.length === 0) return null;

  // Duplicate items only when the row is wider than the viewport — the
  // translation target is exactly one set's width so the second set lands
  // where the first one started, producing a seamless loop regardless of
  // the fractional math that plain `-50%` would introduce.
  const rendered = shouldScroll ? [...items, ...items] : items;
  const repeatOffset = `${items.length * TILE_SIZE + items.length * GAP}px`;

  // Use the section background colour for the edge-fade overlays, falling
  // back to the page background when the section is transparent.
  const fadeColor =
    !sectionBackground || sectionBackground === "transparent"
      ? "var(--bg-page)"
      : sectionBackground;

  return (
    <section style={{ background: sectionBackground, padding: "16px 0", position: "relative", zIndex: 2 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {heading && (
          <h2
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: 20,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              margin: "0 0 16px",
              color: "inherit",
            }}
          >
            {heading}
          </h2>
        )}

        <div
          ref={viewportRef}
          className="cpsl-logo-ticker"
          data-pause-on-hover={pauseOnHover ? "true" : "false"}
          data-scrolling={shouldScroll ? "true" : "false"}
          style={{
            position: "relative",
            overflowX: "clip",
            overflowY: "visible",
            width: "100%",
          }}
        >
          <div
            className="cpsl-logo-ticker__track"
            style={{
              display: "flex",
              flexDirection: "row",
              gap: GAP,
              width: shouldScroll ? "max-content" : "100%",
              animationName: shouldScroll ? "cpsl-ticker-scroll" : "none",
              animationDuration: shouldScroll ? `${durationSeconds}s` : undefined,
              animationTimingFunction: shouldScroll ? "linear" : undefined,
              animationIterationCount: shouldScroll ? "infinite" : undefined,
              animationDirection: reverse ? "reverse" : "normal",
              // Consumed by the keyframes below for an exact, seamless reset.
              ["--cpsl-ticker-repeat" as string]: repeatOffset,
            }}
          >
            {rendered.map((logo, i) => {
              const url = logo.asset?.url ?? "";
              const isClone = shouldScroll && i >= items.length;
              return (
                <div
                  key={`${logo._key ?? i}-${i}`}
                  aria-hidden={isClone}
                  style={{
                    flexShrink: 0,
                    width: TILE_SIZE,
                    height: TILE_SIZE,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt={isClone ? "" : (logo.altText ?? "")}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                      display: "block",
                      filter:
                        "drop-shadow(0 2px 3px rgba(0, 0, 0, 0.45)) drop-shadow(0 5px 10px rgba(0, 0, 0, 0.25))",
                    }}
                  />
                </div>
              );
            })}
          </div>

          {edgeFade && shouldScroll && (
            <>
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  width: 96,
                  background: `linear-gradient(to right, ${fadeColor}, transparent)`,
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              />
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  right: 0,
                  width: 96,
                  background: `linear-gradient(to left, ${fadeColor}, transparent)`,
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              />
            </>
          )}

          <style>{`
            @keyframes cpsl-ticker-scroll {
              from { transform: translate3d(0, 0, 0); }
              to   { transform: translate3d(calc(-1 * var(--cpsl-ticker-repeat)), 0, 0); }
            }
            .cpsl-logo-ticker[data-pause-on-hover="true"][data-scrolling="true"]:hover .cpsl-logo-ticker__track {
              animation-play-state: paused;
            }
            @media (prefers-reduced-motion: reduce) {
              .cpsl-logo-ticker__track {
                animation: none !important;
              }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}

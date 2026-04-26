"use client";

import * as React from "react";
import { ArrowPillButton } from "./arrow-pill-button";

export interface HeroBentoProps {
  eyebrow?:     string;
  headline?:    string;
  description?: string;
  ctaLabel?:    string;
  ctaHref?:     string;
  /** URL of the large top-right photo. */
  heroImage?:   string;
  /** URL of the smaller bottom-right photo. */
  subImage?:    string;
  /** Optional gold proof-point badge — number or short string. */
  badge?:       string;
  /** Small uppercase label beneath the badge value. */
  badgeLabel?:  string;
}

/**
 * HeroBento — contained bento-style hero (~640px tall).
 *
 * Layout: cream text tile on the left (5/12), two stacked photo tiles
 * on the right (7/12). A floating gold badge anchors the top-right
 * corner of the upper photo for a single proof-point stat.
 *
 * Sized to fit roughly half the viewport — drop directly under a
 * navigation bar without taking the full screen.
 */
export function HeroBento({
  eyebrow     = "2026–2027 SEASON",
  headline    = "WHERE COLLEGE COACHES SCOUT NEXT.",
  description = "Three showcases per year. NCSA-published feeds for every fixture. 180+ college programs in attendance last cycle.",
  ctaLabel    = "View showcases",
  ctaHref     = "/showcases",
  heroImage   = "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1400&q=85",
  subImage    = "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&q=85",
  badge       = "180+",
  badgeLabel  = "College programs",
}: HeroBentoProps) {
  return (
    <section style={{ padding: 30, background: "#091628" }}>
      <div
        style={{
          display:             "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridTemplateRows:    "1fr 1fr",
          gap:                 20,
          height:              "min(680px, calc(100vh - 160px))",
        }}
      >
        {/* Left text tile */}
        <div
          style={{
            position:        "relative",
            overflow:        "hidden",
            borderRadius:    24,
            background:      "#F4EFE6",
            color:           "#091628",
            gridColumn:      "span 5",
            gridRow:         "span 2",
            display:         "flex",
            flexDirection:   "column",
            justifyContent:  "space-between",
            padding:         40,
          }}
        >
          <div
            style={{
              fontSize:      11,
              fontWeight:    700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color:         "#BF1D2D",
            }}
          >
            {eyebrow}
          </div>

          <h1
            style={{
              fontFamily:   "'Barlow Condensed', sans-serif",
              fontWeight:   900,
              fontSize:     "clamp(48px, 5.5vw, 80px)",
              lineHeight:   0.92,
              letterSpacing: "-0.018em",
              textTransform: "uppercase",
              textWrap:     "balance",
              margin:       0,
            }}
          >
            {headline}
          </h1>

          <div>
            <p
              style={{
                fontSize:    15,
                lineHeight:  1.6,
                color:       "#475569",
                margin:      "0 0 28px",
                maxWidth:    448,
              }}
            >
              {description}
            </p>
            <ArrowPillButton href={ctaHref} tone="dark">
              {ctaLabel}
            </ArrowPillButton>
          </div>
        </div>

        {/* Top-right hero photo with floating gold badge */}
        <div
          style={{
            position:    "relative",
            overflow:    "hidden",
            borderRadius: 24,
            background:  "#0A1628",
            gridColumn:  "span 7",
            gridRow:     "span 1",
          }}
        >
          {heroImage && (
            <img
              src={heroImage}
              alt=""
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
          <div
            style={{
              position:   "absolute",
              inset:      0,
              background: "linear-gradient(135deg, rgba(9,22,40,0) 50%, rgba(9,22,40,0.55) 100%)",
            }}
            aria-hidden
          />

          {badge && (
            <div
              style={{
                position:     "absolute",
                right:        28,
                top:          28,
                borderRadius: 16,
                padding:      "16px 20px",
                background:   "#C9A74C",
                color:        "#091628",
                boxShadow:    "0 12px 32px rgba(9,22,40,0.35)",
                display:      "flex",
                alignItems:   "center",
                gap:          16,
              }}
            >
              <div
                style={{
                  fontFamily:   "'Barlow Condensed', sans-serif",
                  fontWeight:   900,
                  fontSize:     38,
                  lineHeight:   0.95,
                  letterSpacing: "-0.01em",
                }}
              >
                {badge}
              </div>
              {badgeLabel && (
                <div
                  style={{
                    fontSize:      10,
                    fontWeight:    700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    maxWidth:      80,
                    lineHeight:    1.1,
                  }}
                >
                  {badgeLabel}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom-right secondary photo */}
        <div
          style={{
            position:     "relative",
            overflow:     "hidden",
            borderRadius: 24,
            background:   "#0A1628",
            gridColumn:   "span 7",
            gridRow:      "span 1",
          }}
        >
          {subImage && (
            <img
              src={subImage}
              alt=""
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
        </div>
      </div>
    </section>
  );
}

"use client";

import * as React from "react";
import { ArrowPillButton } from "./arrow-pill-button";

export type HeroBentoBadgeTone = "gold" | "navy" | "cream" | "none";

export interface HeroBentoBadge {
  /** Number or short string, e.g. "180+" or "14". */
  value: string;
  /** Small uppercase label beneath the value. Optional. */
  label?: string;
  /** Visual tone. Defaults to "gold". Use "none" for a transparent badge
   *  that lets the photo show through (no shadow, no fill). */
  tone?: HeroBentoBadgeTone;
}

const BADGE_TONES: Record<HeroBentoBadgeTone, { bg: string; fg: string; shadow: string }> = {
  gold:  { bg: "#C9A74C",     fg: "#091628",   shadow: "0 12px 32px rgba(9,22,40,0.35)" },
  navy:  { bg: "#091628",     fg: "#F4EFE6",   shadow: "0 12px 32px rgba(9,22,40,0.35)" },
  cream: { bg: "#F4EFE6",     fg: "#091628",   shadow: "0 12px 32px rgba(9,22,40,0.35)" },
  none:  { bg: "transparent", fg: "#F4EFE6",   shadow: "none" },
};

export type HeroBentoSectionBackground = "navy" | "cream" | "gold" | "none";

export interface HeroBentoProps {
  eyebrow?:     string;
  headline?:    string;
  description?: string;
  ctaLabel?:    string;
  ctaHref?:     string;
  ctaNewWindow?: boolean;
  /** URL of the large top-right photo. */
  heroImage?:   string;
  /** Optional URL for a stacked second photo. When omitted the hero photo spans the full right column. */
  subImage?:    string;
  /**
   * Up to three badges anchored top-right of the hero photo. Arrange in a
   * horizontal row on desktop and a 1× equal-column grid across the bottom
   * of the photo on mobile.
   */
  badges?:      HeroBentoBadge[];
  /**
   * Outer wrap background — the area around the bento card. Defaults to
   * "navy". "none" makes it transparent so the page background shows through.
   */
  sectionBackground?: HeroBentoSectionBackground;
}

const SECTION_BG: Record<HeroBentoSectionBackground, string> = {
  navy:  "#091628",
  cream: "#F4EFE6",
  gold:  "#C9A74C",
  none:  "transparent",
};

const id = "hb"; // class prefix scope
const MAX_BADGES = 3;

/**
 * HeroBento — contained bento-style hero (~640px tall on desktop).
 *
 * Layout:
 *   • Desktop (≥1024px): 5/7 split. Cream text tile left, hero photo
 *     top-right with floating gold badges, optional sub photo bottom-right.
 *   • Tablet (640–1024px): same 5/7 split with reduced padding and a
 *     slightly shorter overall height.
 *   • Mobile (<640px): vertical stack — text tile, hero photo, sub photo —
 *     auto height. Badges shift to a full-width grid strip across the
 *     bottom of the hero photo, each badge in its own equal column.
 */
export function HeroBento({
  eyebrow     = "2026–2027 SEASON",
  headline    = "WHERE COLLEGE COACHES SCOUT NEXT.",
  description = "Three showcases per year. NCSA-published feeds for every fixture. 180+ college programs in attendance last cycle.",
  ctaLabel    = "View showcases",
  ctaHref     = "/showcases",
  ctaNewWindow,
  heroImage   = "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1400&q=85",
  subImage,
  badges,
  sectionBackground = "navy",
}: HeroBentoProps) {
  // No fallback: when the editor leaves badges empty, render none at all.
  const visibleBadges = (badges ?? []).slice(0, MAX_BADGES);
  const heroSpansFull = !subImage;
  const wrapBg = SECTION_BG[sectionBackground] ?? SECTION_BG.navy;

  return (
    <section className={`${id}__section`} style={{ background: wrapBg }}>
      <style>{`
        .${id}__section {
          padding: clamp(16px, 4vw, 30px);
        }

        .${id}__grid {
          display: grid;
          gap: clamp(12px, 2vw, 20px);
          grid-template-columns: repeat(12, 1fr);
          grid-template-rows:    1fr 1fr;
          /* `min-height` (not `height`) so the section grows when the cream
             tile's copy stack — eyebrow + headline + description + CTA —
             can't fit in the design's target 540 px. Without this, tiles'
             `overflow: hidden` silently clipped the CTA on content-heavy
             pages (e.g. /league-standards "Local Operator's Handbook"). */
          min-height: min(540px, calc((100vh - 160px) * 0.78));
        }

        /* ── Tiles ───────────────────────────────────────────── */
        .${id}__tile {
          position:     relative;
          overflow:     hidden;
          border-radius: 0;
        }

        .${id}__tile--text {
          grid-column: span 5;
          grid-row:    span 2;
          background:  #F4EFE6;
          color:       #091628;
          display:     flex;
          flex-direction: column;
          justify-content: space-between;
          padding:     clamp(24px, 3vw, 40px);
        }

        /* Group headline + description so they sit close together. */
        .${id}__copy {
          display:        flex;
          flex-direction: column;
          gap:            32px;
        }

        .${id}__tile--photo-main {
          grid-column: span 7;
          grid-row:    span 1;
          background:  #0A1628;
        }
        .${id}__tile--photo-main.is-full {
          grid-row: span 2;
        }

        .${id}__tile--photo-sub {
          grid-column: span 7;
          grid-row:    span 1;
          background:  #0A1628;
        }

        .${id}__photo {
          position:    absolute;
          inset:       0;
          width:       100%;
          height:      100%;
          object-fit:  cover;
        }

        .${id}__photo-scrim {
          position:   absolute;
          inset:      0;
          background: linear-gradient(135deg, rgba(9,22,40,0) 50%, rgba(9,22,40,0.55) 100%);
          pointer-events: none;
        }

        /* ── Text content ────────────────────────────────────── */
        .${id}__eyebrow {
          font-size:      11px;
          font-weight:    700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color:          #BF1D2D;
          margin:         0;
        }

        .${id}__headline {
          font-family:    'Barlow Condensed', sans-serif;
          font-weight:    900;
          font-size:      clamp(36px, 5.5vw, 80px);
          line-height:    0.92;
          letter-spacing: -0.018em;
          text-transform: uppercase;
          text-wrap:      balance;
          margin:         0;
        }

        .${id}__description {
          font-size:   clamp(14px, 1.05vw, 15px);
          line-height: 1.6;
          color:       #475569;
          margin:      0;
          max-width:   448px;
        }

        /* ── Badges row anchored top-right of hero photo ────── */
        .${id}__badges {
          position:     absolute;
          right:        clamp(16px, 2.5vw, 28px);
          top:          clamp(16px, 2.5vw, 28px);
          display:      flex;
          flex-direction: row;
          gap:          clamp(10px, 1.5vw, 14px);
          z-index:      2;
        }

        .${id}__badge {
          border-radius: 0;
          padding:       clamp(10px, 1.5vw, 16px) clamp(14px, 2vw, 20px);
          background:    #C9A74C;
          color:         #091628;
          box-shadow:    0 12px 32px rgba(9,22,40,0.35);
          display:       flex;
          align-items:   center;
          gap:           clamp(10px, 1.5vw, 14px);
        }

        .${id}__badge-value {
          font-family:    'Barlow Condensed', sans-serif;
          font-weight:    900;
          font-size:      clamp(26px, 3vw, 38px);
          line-height:    0.95;
          letter-spacing: -0.01em;
        }

        .${id}__badge-label {
          font-size:      10px;
          font-weight:    700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          max-width:      80px;
          line-height:    1.1;
        }

        /* ── Tablet: keep split, tighter ─────────────────────── */
        @media (max-width: 1023px) {
          .${id}__grid {
            min-height: min(490px, calc((100vh - 140px) * 0.78));
          }
        }

        /* ── Mobile: stack vertically; badges become a grid strip ── */
        @media (max-width: 639px) {
          .${id}__grid {
            grid-template-columns: 1fr;
            grid-template-rows:    auto;
            grid-auto-rows:        auto;
            height:                auto;
          }
          .${id}__tile--text {
            grid-column: 1 / -1;
            grid-row:    auto;
            min-height:  360px;
          }
          .${id}__tile--photo-main,
          .${id}__tile--photo-sub {
            grid-column:  1 / -1;
            grid-row:     auto;
            aspect-ratio: 16 / 9;
          }
          .${id}__tile--photo-main.is-full {
            aspect-ratio: 4 / 5;
          }

          /* Badges become a full-width grid strip at the bottom of the photo,
             each badge in its own equal column. */
          .${id}__badges {
            top:                   auto;
            right:                 0;
            left:                  0;
            bottom:                0;
            padding:               12px;
            display:               grid;
            grid-template-columns: repeat(var(--hb-badge-count, 1), 1fr);
            gap:                   8px;
            background:            linear-gradient(180deg, rgba(9,22,40,0) 0%, rgba(9,22,40,0.6) 100%);
          }
          .${id}__badge {
            padding:        10px 12px;
            justify-content: center;
            text-align:     center;
            flex-direction: column;
            gap:            2px;
          }
          .${id}__badge-value {
            font-size: 22px;
          }
          .${id}__badge-label {
            font-size: 9px;
            max-width: none;
          }
        }
      `}</style>

      <div className={`${id}__grid`}>
        {/* Left text tile */}
        <div className={`${id}__tile ${id}__tile--text`}>
          <p className={`${id}__eyebrow`}>{eyebrow}</p>

          <div className={`${id}__copy`}>
            <h1 className={`${id}__headline`}>{headline}</h1>
            <p className={`${id}__description`}>{description}</p>
            <div className={`${id}__cta`}>
              <ArrowPillButton href={ctaHref} newWindow={ctaNewWindow} tone="dark">
                {ctaLabel}
              </ArrowPillButton>
            </div>
          </div>
        </div>

        {/* Right hero photo (spans both rows when no sub photo is set) */}
        <div className={`${id}__tile ${id}__tile--photo-main ${heroSpansFull ? "is-full" : ""}`}>
          {heroImage && <img src={heroImage} alt="" className={`${id}__photo`} />}
          <div className={`${id}__photo-scrim`} aria-hidden />

          {visibleBadges.length > 0 && (
            <div
              className={`${id}__badges`}
              style={{ ["--hb-badge-count" as never]: visibleBadges.length }}
            >
              {visibleBadges.map((b, i) => {
                const tone = BADGE_TONES[b.tone ?? "gold"] ?? BADGE_TONES.gold;
                return (
                  <div
                    className={`${id}__badge`}
                    key={i}
                    style={{
                      background: tone.bg,
                      color:      tone.fg,
                      boxShadow:  tone.shadow,
                    }}
                  >
                    <div className={`${id}__badge-value`}>{b.value}</div>
                    {b.label && <div className={`${id}__badge-label`}>{b.label}</div>}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom-right secondary photo — only when subImage is set */}
        {subImage && (
          <div className={`${id}__tile ${id}__tile--photo-sub`}>
            <img src={subImage} alt="" className={`${id}__photo`} />
          </div>
        )}
      </div>
    </section>
  );
}

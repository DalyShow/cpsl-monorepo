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

const id = "hb"; // class prefix scope

/**
 * HeroBento — contained bento-style hero (~640px tall on desktop).
 *
 * Layout:
 *   • Desktop (≥1024px): 5/7 split. Cream text tile left, hero photo
 *     top-right with floating gold badge, sub photo bottom-right.
 *   • Tablet (640–1024px): same 5/7 split with reduced padding and
 *     a slightly shorter overall height.
 *   • Mobile (<640px): vertical stack — text tile, hero photo, sub
 *     photo — auto height, tighter padding, smaller badge in the
 *     bottom-right corner of the hero photo.
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
    <section className={`${id}__section`}>
      <style>{`
        .${id}__section {
          padding: clamp(16px, 4vw, 30px);
          background: #091628;
        }

        .${id}__grid {
          display: grid;
          gap: clamp(12px, 2vw, 20px);
          grid-template-columns: repeat(12, 1fr);
          grid-template-rows:    1fr 1fr;
          height: min(680px, calc(100vh - 160px));
        }

        /* ── Tiles ───────────────────────────────────────────── */
        .${id}__tile {
          position:     relative;
          overflow:     hidden;
          border-radius: clamp(16px, 2vw, 24px);
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

        .${id}__tile--photo-main {
          grid-column: span 7;
          grid-row:    span 1;
          background:  #0A1628;
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
          font-size:     11px;
          font-weight:   700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color:         #BF1D2D;
          margin:        0;
        }

        .${id}__headline {
          font-family:   'Barlow Condensed', sans-serif;
          font-weight:   900;
          font-size:     clamp(36px, 5.5vw, 80px);
          line-height:   0.92;
          letter-spacing: -0.018em;
          text-transform: uppercase;
          text-wrap:     balance;
          margin:        0;
        }

        .${id}__description {
          font-size:    clamp(14px, 1.05vw, 15px);
          line-height:  1.6;
          color:        #475569;
          margin:       0 0 clamp(20px, 3vw, 28px);
          max-width:    448px;
        }

        /* ── Floating gold badge ─────────────────────────────── */
        .${id}__badge {
          position:     absolute;
          right:        clamp(16px, 2.5vw, 28px);
          top:          clamp(16px, 2.5vw, 28px);
          border-radius: clamp(12px, 1.5vw, 16px);
          padding:      clamp(10px, 1.5vw, 16px) clamp(14px, 2vw, 20px);
          background:   #C9A74C;
          color:        #091628;
          box-shadow:   0 12px 32px rgba(9,22,40,0.35);
          display:      flex;
          align-items:  center;
          gap:          clamp(10px, 1.5vw, 16px);
        }

        .${id}__badge-value {
          font-family:    'Barlow Condensed', sans-serif;
          font-weight:    900;
          font-size:      clamp(26px, 3vw, 38px);
          line-height:    0.95;
          letter-spacing: -0.01em;
        }

        .${id}__badge-label {
          font-size:     10px;
          font-weight:   700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          max-width:     80px;
          line-height:   1.1;
        }

        /* ── Tablet: keep split, tighter ─────────────────────── */
        @media (max-width: 1023px) {
          .${id}__grid {
            height: min(620px, calc(100vh - 140px));
          }
        }

        /* ── Mobile: stack vertically ────────────────────────── */
        @media (max-width: 639px) {
          .${id}__grid {
            grid-template-columns: 1fr;
            grid-template-rows:    auto;
            grid-auto-rows:        auto;
            height:                auto;
          }
          .${id}__tile--text {
            grid-column:    1 / -1;
            grid-row:       auto;
            min-height:     360px;
          }
          .${id}__tile--photo-main,
          .${id}__tile--photo-sub {
            grid-column:    1 / -1;
            grid-row:       auto;
            aspect-ratio:   16 / 9;
          }
          .${id}__badge {
            right:  16px;
            bottom: 16px;
            top:    auto;
          }
          .${id}__badge-label {
            display: none;
          }
        }
      `}</style>

      <div className={`${id}__grid`}>
        {/* Left text tile */}
        <div className={`${id}__tile ${id}__tile--text`}>
          <p className={`${id}__eyebrow`}>{eyebrow}</p>
          <h1 className={`${id}__headline`}>{headline}</h1>
          <div>
            <p className={`${id}__description`}>{description}</p>
            <ArrowPillButton href={ctaHref} tone="dark">
              {ctaLabel}
            </ArrowPillButton>
          </div>
        </div>

        {/* Top-right hero photo with floating gold badge */}
        <div className={`${id}__tile ${id}__tile--photo-main`}>
          {heroImage && <img src={heroImage} alt="" className={`${id}__photo`} />}
          <div className={`${id}__photo-scrim`} aria-hidden />

          {badge && (
            <div className={`${id}__badge`}>
              <div className={`${id}__badge-value`}>{badge}</div>
              {badgeLabel && <div className={`${id}__badge-label`}>{badgeLabel}</div>}
            </div>
          )}
        </div>

        {/* Bottom-right secondary photo */}
        <div className={`${id}__tile ${id}__tile--photo-sub`}>
          {subImage && <img src={subImage} alt="" className={`${id}__photo`} />}
        </div>
      </div>
    </section>
  );
}

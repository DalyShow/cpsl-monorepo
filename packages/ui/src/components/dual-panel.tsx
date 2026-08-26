"use client";

import { ArrowPillButton } from "./arrow-pill-button";

/**
 * DualPanel — a full-viewport two-up showcase.
 *
 * Layout: 2/3 + 1/3 CSS Grid with 30 px gutter around + between the
 * panels. Each panel renders an image (with optional video on top)
 * behind a bottom-to-top scrim; eyebrow + headline + subheadline + CTA
 * sit 40 px from the bottom-left corner.
 *
 * Reveal choreography: the left panel wipes in left-to-right with a
 * smooth expo-out ease while its text rises in 100 ms increments;
 * the right panel fires its whole sequence once the left's wipe has
 * finished, giving a clear sequential beat.
 *
 * Below 768 px viewports the panels stack vertically, the image
 * becomes a 4:3 media block, and the content drops below the image
 * on the page background so it reads cleanly without a scrim.
 */

export interface DualPanelItem {
  imageUrl?: string;
  videoUrl?: string;
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface DualPanelProps {
  left: DualPanelItem;
  right: DualPanelItem;
  /**
   * Optional second panel for the right column. When present, the right
   * column splits into two equal stacked panels separated by the same
   * 30px gutter the grid uses, so the trio reads as one bento.
   */
  rightSecondary?: DualPanelItem;
  /**
   * Heading level for the LEFT panel's headline. Set to "h1" on the
   * page's primary hero so the document has a single, semantic top-level
   * heading; defaults to "h2" elsewhere.
   */
  headingLevel?: "h1" | "h2";
}

function Panel({ item, headingTag: HeadingTag = "h2" }: { item: DualPanelItem; headingTag?: "h1" | "h2" }) {
  return (
    <div className="cpsl-panel">
      {item.imageUrl && (
        <div
          className="cpsl-panel__img"
          style={{ backgroundImage: `url(${item.imageUrl})` }}
          aria-hidden
        />
      )}
      {item.videoUrl && (
        <video
          className="cpsl-panel__video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={item.imageUrl}
          aria-hidden="true"
        >
          <source src={item.videoUrl} />
        </video>
      )}
      <div className="cpsl-panel__scrim" aria-hidden />
      <div className="cpsl-panel__content">
        {item.eyebrow && <p className="cpsl-panel__eyebrow">{item.eyebrow}</p>}
        <HeadingTag className="cpsl-panel__headline">{item.headline}</HeadingTag>
        {item.subheadline && (
          <p className="cpsl-panel__subheadline">{item.subheadline}</p>
        )}
        {item.ctaLabel && (
          <div className="cpsl-panel__cta">
            <ArrowPillButton href={item.ctaHref ?? "#"} tone="dark" size="md">
              {item.ctaLabel}
            </ArrowPillButton>
          </div>
        )}
      </div>
    </div>
  );
}

export function DualPanel({ left, right, rightSecondary, headingLevel = "h2" }: DualPanelProps) {
  return (
    <>
      <style>{`
        /* Fit below the 80 px nav + ~80 px logo ticker so the
           component fills the visible viewport without triggering
           page scroll. Same math the PromoHero's Fill Viewport uses. */
        .cpsl-dual-panel {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 30px;
          padding: 30px;
          height: calc(100vh - 160px);
        }
        @supports (height: 100dvh) {
          .cpsl-dual-panel { height: calc(100dvh - 160px); }
        }

        .cpsl-panel {
          position: relative;
          overflow: hidden;
          border-radius: 0;
          color: #F4EFE6;
          background: #041124;
        }
        .cpsl-panel__img,
        .cpsl-panel__video {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
        }
        .cpsl-panel__video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
        }
        .cpsl-panel__scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(4,17,36,0) 0%,
            rgba(4,17,36,0) 40%,
            rgba(4,17,36,0.55) 100%
          );
          pointer-events: none;
        }
        .cpsl-panel__content {
          position: absolute;
          left: 40px;
          right: 40px;
          bottom: 40px;
          max-width: 520px;
          z-index: 1;
        }
        .cpsl-panel__eyebrow {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #D4B949;
          margin: 0 0 14px;
        }
        .cpsl-panel__headline {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          font-size: clamp(32px, 3.4vw, 52px);
          line-height: 1.05;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          margin: 0 0 16px;
          text-wrap: balance;
        }
        .cpsl-panel__subheadline {
          font-family: 'Inter', sans-serif;
          font-size: clamp(14px, 1.1vw, 16px);
          line-height: 1.55;
          color: rgba(244,239,230,0.82);
          margin: 0 0 22px;
          max-width: 440px;
          text-wrap: pretty;
        }

        /* Reveal choreography — sequential: left panel fully, then
           right. Text rises alongside each panel's wipe. */
        @keyframes cpsl-dp-wipe {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0 0 0);    }
        }
        @keyframes cpsl-dp-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes cpsl-dp-content {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .cpsl-panel__img,
        .cpsl-panel__video {
          animation: cpsl-dp-wipe 1.6s cubic-bezier(.16, 1, .3, 1) both;
        }
        .cpsl-panel__scrim {
          animation: cpsl-dp-fade 1.6s cubic-bezier(.16, 1, .3, 1) both;
        }
        .cpsl-panel__eyebrow,
        .cpsl-panel__headline,
        .cpsl-panel__subheadline,
        .cpsl-panel__cta {
          animation: cpsl-dp-content 700ms cubic-bezier(.2, .8, .2, 1) both;
        }
        .cpsl-panel__eyebrow     { animation-delay: 0ms;   }
        .cpsl-panel__headline    { animation-delay: 100ms; }
        .cpsl-panel__subheadline { animation-delay: 200ms; }
        .cpsl-panel__cta         { animation-delay: 300ms; }

        /* Right column split into two equal stacked panels — the gap
           matches the grid gutter so the trio reads as one bento. */
        .cpsl-dual-panel__stack {
          display:        flex;
          flex-direction: column;
          gap:            30px;
          min-height:     0;
        }
        .cpsl-dual-panel__stack > .cpsl-panel {
          flex:       1 1 0;
          height:     auto;
          min-height: 0;
        }
        /* Half-height panels get tighter type + content inset. */
        .cpsl-dual-panel__stack .cpsl-panel__content {
          bottom: 28px;
        }
        .cpsl-dual-panel__stack .cpsl-panel__headline {
          font-size: clamp(24px, 2.2vw, 34px);
          margin-bottom: 12px;
        }
        .cpsl-dual-panel__stack .cpsl-panel__subheadline {
          margin-bottom: 16px;
        }

        .cpsl-dual-panel > .cpsl-panel:nth-child(2) .cpsl-panel__img,
        .cpsl-dual-panel > .cpsl-panel:nth-child(2) .cpsl-panel__video,
        .cpsl-dual-panel > .cpsl-panel:nth-child(2) .cpsl-panel__scrim,
        .cpsl-dual-panel > .cpsl-dual-panel__stack .cpsl-panel__img,
        .cpsl-dual-panel > .cpsl-dual-panel__stack .cpsl-panel__video,
        .cpsl-dual-panel > .cpsl-dual-panel__stack .cpsl-panel__scrim {
          animation-delay: 1600ms;
        }
        .cpsl-dual-panel > .cpsl-panel:nth-child(2) .cpsl-panel__eyebrow,
        .cpsl-dual-panel > .cpsl-dual-panel__stack .cpsl-panel__eyebrow     { animation-delay: 1600ms; }
        .cpsl-dual-panel > .cpsl-panel:nth-child(2) .cpsl-panel__headline,
        .cpsl-dual-panel > .cpsl-dual-panel__stack .cpsl-panel__headline    { animation-delay: 1700ms; }
        .cpsl-dual-panel > .cpsl-panel:nth-child(2) .cpsl-panel__subheadline,
        .cpsl-dual-panel > .cpsl-dual-panel__stack .cpsl-panel__subheadline { animation-delay: 1800ms; }
        .cpsl-dual-panel > .cpsl-panel:nth-child(2) .cpsl-panel__cta,
        .cpsl-dual-panel > .cpsl-dual-panel__stack .cpsl-panel__cta         { animation-delay: 1900ms; }

        /* Mobile: stack panels, content drops below the image on the
           page background so it reads without needing a scrim. */
        @media (max-width: 767px) {
          .cpsl-dual-panel {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
            gap: 16px;
            padding: 16px;
            height: auto;
            min-height: calc(100vh - 160px);
          }
          .cpsl-panel {
            display: flex;
            flex-direction: column;
            background: transparent;
          }
          .cpsl-panel__img,
          .cpsl-panel__video {
            position: relative;
            inset: auto;
            aspect-ratio: 4 / 3;
            width: 100%;
          }
          .cpsl-panel__scrim { display: none; }
          .cpsl-panel__content {
            position: relative;
            left: auto;
            right: auto;
            bottom: auto;
            max-width: none;
            padding: 24px 24px 28px;
            z-index: auto;
          }
          .cpsl-dual-panel__stack {
            gap: 16px;
          }
          .cpsl-dual-panel__stack .cpsl-panel__content {
            bottom: auto;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cpsl-panel__img,
          .cpsl-panel__video,
          .cpsl-panel__scrim,
          .cpsl-panel__eyebrow,
          .cpsl-panel__headline,
          .cpsl-panel__subheadline,
          .cpsl-panel__cta {
            animation: none !important;
            clip-path: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <section className="cpsl-dual-panel">
        <Panel item={left} headingTag={headingLevel} />
        {rightSecondary ? (
          <div className="cpsl-dual-panel__stack">
            <Panel item={right} />
            <Panel item={rightSecondary} />
          </div>
        ) : (
          <Panel item={right} />
        )}
      </section>
    </>
  );
}

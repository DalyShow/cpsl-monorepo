import { Frame } from "../_shared/Frame";

export const metadata = {
  title: "Work Showcase preview — CPSL",
  robots: { index: false, follow: false },
};

/**
 * WorkShowcase — an editorial module for surfacing a single piece of
 * work (case study, feature section, project callout).
 *
 * Layout: centered text block on top (eyebrow, headline, subheadline,
 * paragraph, CTA link) with a large matted photo below. The image is
 * framed by a 12 px light-gray mat with rounded corners; the image
 * itself casts a soft drop shadow onto the mat ("matted-print" look).
 *
 * The shadow stays on the mat (overflow: hidden on the frame) so it
 * cascades over the colored frame rather than escaping to the page bg.
 */

interface WorkShowcaseProps {
  imageSrc: string;
  imageAlt?: string;
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

function WorkShowcase({
  imageSrc,
  imageAlt = "",
  eyebrow,
  headline,
  subheadline,
  body,
  ctaLabel,
  ctaHref,
}: WorkShowcaseProps) {
  return (
    <section className="cpsl-work">
      <div className="cpsl-work__text">
        {eyebrow && <p className="cpsl-work__eyebrow">{eyebrow}</p>}
        <h2 className="cpsl-work__headline">{headline}</h2>
        {subheadline && (
          <p className="cpsl-work__subheadline">{subheadline}</p>
        )}
        {body && <p className="cpsl-work__body">{body}</p>}
        {ctaLabel && (
          <a href={ctaHref ?? "#"} className="cpsl-work__cta">
            {ctaLabel}
            <svg
              width="16"
              height="12"
              viewBox="0 0 16 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M9.5 1L14.5 6L9.5 11M14 6H1"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        )}
      </div>

      <div className="cpsl-work__media">
        <div className="cpsl-work__frame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={imageAlt}
            className="cpsl-work__image"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function WorkShowcasePreview() {
  return (
    <Frame
      heroEyebrow="Work Showcase"
      heroHeadline="Editorial module for featured work"
      heroSubheadline="Centered text block above a large matted photo."
      heroBackgroundSeed="work-showcase-hero"
    >
      <style>{`
        .cpsl-work {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 100px 30px;
          color: #F4EFE6;
          max-width: 1600px;
          margin: 0 auto;
        }

        /* ── Centered text block on top ──────────────────────────── */
        .cpsl-work__text {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 64px;
        }
        .cpsl-work__eyebrow {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #D4B949;
          margin: 0 0 20px;
        }
        .cpsl-work__headline {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          font-size: clamp(40px, 5vw, 76px);
          line-height: 1.02;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          margin: 0 0 22px;
          text-wrap: balance;
        }
        .cpsl-work__subheadline {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 500;
          font-size: clamp(19px, 1.6vw, 26px);
          line-height: 1.35;
          color: rgba(244,239,230,0.92);
          margin: 0 auto 20px;
          max-width: 640px;
          text-wrap: pretty;
        }
        .cpsl-work__body {
          font-family: 'Inter', sans-serif;
          font-size: clamp(15px, 1.05vw, 17px);
          line-height: 1.6;
          color: rgba(244,239,230,0.72);
          margin: 0 auto 32px;
          max-width: 560px;
          text-wrap: pretty;
        }
        .cpsl-work__cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #D4B949;
          text-decoration: none;
          border-bottom: 1.5px solid rgba(212,185,73,0.35);
          padding-bottom: 4px;
          transition: border-color 200ms ease, gap 200ms ease;
        }
        .cpsl-work__cta:hover {
          border-color: #D4B949;
          gap: 14px;
        }
        .cpsl-work__cta svg {
          transition: transform 200ms ease;
        }
        .cpsl-work__cta:hover svg {
          transform: translateX(2px);
        }

        /* ── Large matted frame below the text ──────────────────
           12 px light-gray mat, rounded corners. overflow:hidden
           keeps the image's drop shadow on the mat surface so it
           "cascades over the colored frame" rather than escaping
           onto the page background — the refined matted-print look.
           ──────────────────────────────────────────────────── */
        .cpsl-work__media {
          width: 100%;
          display: flex;
          justify-content: center;
        }
        .cpsl-work__frame {
          width: 100%;
          max-width: 1400px;
          background: #E5E5E5;
          padding: 12px;
          border-radius: 16px;
          overflow: hidden;
          box-shadow:
            0 24px 48px rgba(0, 0, 0, 0.28),
            0 8px 16px rgba(0, 0, 0, 0.18);
        }
        .cpsl-work__image {
          display: block;
          width: 100%;
          height: auto;
          border-radius: 6px;
          /* Two-layer soft shadow — tight contact + broad ambient.
             Stays on the mat because the frame clips overflow. */
          box-shadow:
            0 6px 14px rgba(0, 0, 0, 0.22),
            0 18px 40px rgba(0, 0, 0, 0.18),
            0 32px 64px rgba(0, 0, 0, 0.12);
        }

        /* ── Mobile ──────────────────────────────────────────── */
        @media (max-width: 767px) {
          .cpsl-work {
            padding: 56px 20px;
          }
          .cpsl-work__text {
            margin-bottom: 40px;
          }
          .cpsl-work__frame {
            padding: 10px;
            border-radius: 12px;
          }
        }
      `}</style>

      <WorkShowcase
        eyebrow="Featured project"
        headline="Rebuilding the National 1 League"
        subheadline="A top-to-bottom refresh of how competition operates in the developmental pyramid."
        body="We partnered with club operators across the Southeast to codify standards, deliver a consistent matchday experience, and put the league's identity on the same footing as the clubs it represents. The result is a platform that scales — technically, operationally, and visually — with the game."
        ctaLabel="Read the case study"
        ctaHref="#n1l"
        imageSrc="https://cdn.sanity.io/images/rdb8n7qx/production/e66866990609f1b49b12098736556ee85643f0d4-3480x1952.jpg"
        imageAlt="National 1 League match action"
      />

      <WorkShowcase
        eyebrow="Brand identity"
        headline="A crest worth defending"
        subheadline="Typography, color, and a mark that earns its place at the center circle."
        body="The CPSL identity system treats every touchpoint as part of the match — the app, the scarf, the scoreboard, the stand. Barlow Condensed sets the tone; Championship Gold carries the occasion. A design language built to outlast a single season."
        ctaLabel="See the brand system"
        ctaHref="#brand"
        imageSrc="https://cdn.sanity.io/images/rdb8n7qx/production/6954edad82ed9085b0fccacc8a23e94d797c80ad-1920x1080.jpg"
        imageAlt="CPSL brand identity"
      />
    </Frame>
  );
}

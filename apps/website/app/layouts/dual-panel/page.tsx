import { TopNav, Button } from "@cpsl/ui";

export const metadata = {
  title: "Dual Panel preview — CPSL",
  robots: { index: false, follow: false },
};

interface Panel {
  src: string;
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  ctaLabel: string;
  ctaHref: string;
}

// Pulled from the two hero slides currently published on cpsl-website/
const LEFT: Panel = {
  src: "https://cdn.sanity.io/images/6fq1zd6y/production/e66866990609f1b49b12098736556ee85643f0d4-3480x1952.jpg",
  eyebrow: "A new era has begun",
  headline: "League Operator for the National 1 League",
  subheadline: "Now accepting applications for the 2026-2027 league year",
  ctaLabel: "Apply for admission",
  ctaHref: "https://system.gotsport.com/event_regs/7cd6b0c357",
};

const RIGHT: Panel = {
  src: "https://cdn.sanity.io/images/6fq1zd6y/production/6954edad82ed9085b0fccacc8a23e94d797c80ad-1920x1080.jpg",
  headline: "What is the National 1 League",
  ctaLabel: "Learn more",
  ctaHref: "#n1l",
};

// ─── Inline DualPanel component (preview only) ───────────────────────────────

function PanelBox({ panel }: { panel: Panel }) {
  return (
    <div className="cpsl-panel">
      <div
        className="cpsl-panel__img"
        style={{ backgroundImage: `url(${panel.src})` }}
        aria-hidden
      />
      <div className="cpsl-panel__scrim" aria-hidden />
      <div className="cpsl-panel__content">
        {panel.eyebrow && <p className="cpsl-panel__eyebrow">{panel.eyebrow}</p>}
        <h2 className="cpsl-panel__headline">{panel.headline}</h2>
        {panel.subheadline && (
          <p className="cpsl-panel__subheadline">{panel.subheadline}</p>
        )}
        <div className="cpsl-panel__cta">
          <Button asChild variant="cpsl-gold" size="default">
            <a href={panel.ctaHref}>{panel.ctaLabel}</a>
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "League Info", href: "#league" },
  { label: "Clubs",       href: "#clubs"  },
  { label: "Schedule",    href: "#schedule" },
  { label: "Contact",     href: "#contact" },
];

export default function DualPanelPreview() {
  return (
    <>
      <TopNav items={NAV_ITEMS} ctaLabel="Join the League" ctaHref="#apply" />

      <main className="pt-20" style={{ background: "#041124", minHeight: "100vh" }}>
        <style>{`
          /* ── Desktop: 2/3 + 1/3 side-by-side, fills the viewport ── */
          .cpsl-dual-panel {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 30px;
            padding: 30px;
            height: calc(100vh - 80px);
          }
          @supports (height: 100dvh) {
            .cpsl-dual-panel { height: calc(100dvh - 80px); }
          }

          .cpsl-panel {
            position: relative;
            overflow: hidden;
            border-radius: 4px;
            color: #F4EFE6;
            background: #041124;
          }
          .cpsl-panel__img {
            position: absolute;
            inset: 0;
            background-size: cover;
            background-position: center;
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
            font-size: 12px;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: #D4B949;
            margin: 0 0 12px;
          }
          .cpsl-panel__headline {
            font-family: 'Barlow Condensed', sans-serif;
            font-weight: 900;
            font-size: clamp(26px, 2.8vw, 40px);
            line-height: 1.05;
            letter-spacing: -0.01em;
            text-transform: uppercase;
            margin: 0 0 14px;
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

          /* ── Reveal choreography ──────────────────────────────────────
             1. Left panel first: image wipes in left-to-right on a
                luxurious 1.6 s smooth-tail ease, with the copy rising
                alongside it starting at 0 ms (staggered 100 ms each).
             2. Right panel begins once the left's wipe is basically
                done (1.6 s offset) — so the two feel like a clear
                sequence instead of a simultaneous pair.
             ─────────────────────────────────────────────────────── */
          @keyframes cpsl-panel-wipe {
            from { clip-path: inset(0 100% 0 0); }
            to   { clip-path: inset(0 0 0 0);    }
          }
          @keyframes cpsl-fade-in {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
          @keyframes cpsl-content-in {
            from { opacity: 0; transform: translateY(12px); }
            to   { opacity: 1; transform: translateY(0);    }
          }

          .cpsl-panel__img {
            animation: cpsl-panel-wipe 1.6s cubic-bezier(.16, 1, .3, 1) both;
          }
          .cpsl-panel__scrim {
            animation: cpsl-fade-in 1.6s cubic-bezier(.16, 1, .3, 1) both;
          }
          .cpsl-panel__eyebrow,
          .cpsl-panel__headline,
          .cpsl-panel__subheadline,
          .cpsl-panel__cta {
            animation: cpsl-content-in 700ms cubic-bezier(.2, .8, .2, 1) both;
          }
          /* Text starts with the wipe and staggers in 100 ms steps. */
          .cpsl-panel__eyebrow     { animation-delay: 0ms;   }
          .cpsl-panel__headline    { animation-delay: 100ms; }
          .cpsl-panel__subheadline { animation-delay: 200ms; }
          .cpsl-panel__cta         { animation-delay: 300ms; }

          /* Right panel is fully sequential — kicks off once the
             left panel's 1.6 s wipe has finished. */
          .cpsl-dual-panel > .cpsl-panel:nth-child(2) .cpsl-panel__img,
          .cpsl-dual-panel > .cpsl-panel:nth-child(2) .cpsl-panel__scrim {
            animation-delay: 1600ms;
          }
          .cpsl-dual-panel > .cpsl-panel:nth-child(2) .cpsl-panel__eyebrow     { animation-delay: 1600ms; }
          .cpsl-dual-panel > .cpsl-panel:nth-child(2) .cpsl-panel__headline    { animation-delay: 1700ms; }
          .cpsl-dual-panel > .cpsl-panel:nth-child(2) .cpsl-panel__subheadline { animation-delay: 1800ms; }
          .cpsl-dual-panel > .cpsl-panel:nth-child(2) .cpsl-panel__cta         { animation-delay: 1900ms; }

          @media (prefers-reduced-motion: reduce) {
            .cpsl-panel__img,
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

          /* ── Mobile: stack panels, content sits BELOW the image so
                it reads on a solid surface. Image gets a fixed aspect
                ratio, content flows below in the normal flex flow. ── */
          @media (max-width: 767px) {
            .cpsl-dual-panel {
              grid-template-columns: 1fr;
              grid-template-rows: auto auto;
              gap: 16px;
              padding: 16px;
              height: auto;
              min-height: calc(100vh - 80px);
            }
            .cpsl-panel {
              display: flex;
              flex-direction: column;
              background: transparent;
            }
            .cpsl-panel__img {
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
          }
        `}</style>

        <section className="cpsl-dual-panel">
          <PanelBox panel={LEFT} />
          <PanelBox panel={RIGHT} />
        </section>
      </main>
    </>
  );
}

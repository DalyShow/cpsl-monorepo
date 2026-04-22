import { TopNav, Button } from "@cpsl/ui";
import type { CSSProperties } from "react";

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

// Pulled from the two hero slides currently published on
// cpsl-website/ — keeps the preview feeling on-brand.
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
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 4,
        background: `linear-gradient(180deg, rgba(4,17,36,0) 0%, rgba(4,17,36,0) 40%, rgba(4,17,36,0.55) 100%), url(${panel.src}) center/cover no-repeat`,
        color: "#F4EFE6",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 40,
          bottom: 40,
          right: 40,
          maxWidth: 520,
        }}
      >
        {panel.eyebrow && (
          <p
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#D4B949",
              margin: "0 0 12px",
            }}
          >
            {panel.eyebrow}
          </p>
        )}
        <h2
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(26px, 2.8vw, 40px)",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            textTransform: "uppercase",
            margin: "0 0 14px",
            textWrap: "balance" as CSSProperties["textWrap"],
          }}
        >
          {panel.headline}
        </h2>
        {panel.subheadline && (
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(14px, 1.1vw, 16px)",
              lineHeight: 1.55,
              color: "rgba(244,239,230,0.82)",
              margin: "0 0 22px",
              maxWidth: 440,
              textWrap: "pretty" as CSSProperties["textWrap"],
            }}
          >
            {panel.subheadline}
          </p>
        )}
        <Button asChild variant="cpsl-gold" size="default">
          <a href={panel.ctaHref}>{panel.ctaLabel}</a>
        </Button>
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
          .cpsl-dual-panel {
            display: grid;
            gap: 30px;
            padding: 30px;
            grid-template-columns: 2fr 1fr;
            height: calc(100vh - 80px);
          }
          @supports (height: 100dvh) {
            .cpsl-dual-panel { height: calc(100dvh - 80px); }
          }
          /* Stack on narrow viewports so neither panel gets too thin. */
          @media (max-width: 767px) {
            .cpsl-dual-panel {
              grid-template-columns: 1fr;
              grid-template-rows: 1fr 1fr;
              height: auto;
              min-height: calc(100vh - 80px);
              padding: 16px;
              gap: 16px;
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

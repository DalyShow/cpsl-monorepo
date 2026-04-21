"use client";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LogoTickerItem {
  /** File in /public/logos/{slug}.svg */
  slug: string;
  /** Accessible name — becomes the alt text */
  name: string;
}

export interface LogoTickerProps {
  logos: LogoTickerItem[];
  /** Full loop time in seconds. Lower = faster. */
  durationSeconds?: number;
  /** Reverse scroll direction. */
  reverse?: boolean;
  /** Pause animation when the pointer is over the ticker. */
  pauseOnHover?: boolean;
  /** Soft fade on the left/right edges. */
  edgeFade?: boolean;
  /** Background color of each 115×115 cell. */
  tileBackground?: string;
  /** Border color of each 115×115 cell. */
  tileBorderColor?: string;
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function LogoTicker({
  logos,
  durationSeconds = 40,
  reverse = false,
  pauseOnHover = true,
  edgeFade = true,
  tileBackground = "#FFFFFF",
  tileBorderColor = "#E2E8F0",
  className,
}: LogoTickerProps) {
  if (logos.length === 0) return null;

  // Render the list twice so translateX(-50%) lands on a seamless seam.
  const loop = [...logos, ...logos];

  const maskStyle: React.CSSProperties | undefined = edgeFade
    ? {
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0, #000 64px, #000 calc(100% - 64px), transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0, #000 64px, #000 calc(100% - 64px), transparent 100%)",
      }
    : undefined;

  return (
    <div
      className={`cpsl-logo-ticker ${className ?? ""}`}
      data-pause-on-hover={pauseOnHover ? "true" : "false"}
      style={{
        overflow: "hidden",
        width: "100%",
        ...maskStyle,
      }}
    >
      <div
        className="cpsl-logo-ticker__track"
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 30,
          width: "max-content",
          animation: `cpsl-ticker-scroll ${durationSeconds}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {loop.map((logo, i) => (
          <div
            key={`${logo.slug}-${i}`}
            aria-hidden={i >= logos.length}
            style={{
              flexShrink: 0,
              width: 115,
              height: 115,
              background: tileBackground,
              border: `1px solid ${tileBorderColor}`,
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 16,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/logos/${logo.slug}.svg`}
              alt={i >= logos.length ? "" : `${logo.name} crest`}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes cpsl-ticker-scroll {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        .cpsl-logo-ticker[data-pause-on-hover="true"]:hover .cpsl-logo-ticker__track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .cpsl-logo-ticker__track {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

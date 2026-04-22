"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Button } from "./button";

/**
 * CPSL promo tiles & grid — the visual vocabulary for Nike-inspired
 * homepage layouts. Ships a set of tone-aware tiles, a graphic tile
 * with soccer-themed patterns, a responsive CSS Grid container, and
 * a matching scroll-reveal stylesheet (embedded below).
 *
 * All tokens are pulled from the design system (navy, gold, crimson,
 * cream, Barlow Condensed). CTAs use the shared Button component
 * with `cpsl-*` variants — don't re-style them here.
 */

// ── Shared types ─────────────────────────────────────────────────────────────

export type RevealVariant =
  | "hex"      // soccer-ball pentagon iris opens from center
  | "stripe"   // diagonal field-line wipe
  | "goal"     // centered rounded rectangle iris opens
  | "silk"     // slow horizontal curtain with soft blur → crisp
  | "base";    // plain fade-up (default)

interface TileBaseProps {
  children?: ReactNode;
  /** e.g. "span 4" — mapped to grid-column */
  colSpan?: string;
  /** e.g. "span 2" — mapped to grid-row */
  rowSpan?: string;
  /** CSS aspect-ratio, e.g. "1", "16/9" */
  aspectRatio?: string;
  className?: string;
  style?: CSSProperties;
  /** Scroll-reveal animation variant */
  reveal?: RevealVariant;
  /** Stagger delay in ms */
  delay?: number;
  /** Trigger the reveal animation on page load instead of on scroll.
   *  Use for the above-the-fold row so it animates immediately; leave
   *  off (default) for below-the-fold tiles that should reveal as
   *  they scroll into view. */
  loadOnMount?: boolean;
}

function tileStyle(base: CSSProperties, p: TileBaseProps): CSSProperties {
  const s: CSSProperties = {
    position: "relative",
    overflow: "hidden",
    borderRadius: 12,
    ...base,
    ...p.style,
  };
  if (p.colSpan) (s as Record<string, unknown>).gridColumn = p.colSpan;
  if (p.rowSpan) (s as Record<string, unknown>).gridRow = p.rowSpan;
  if (p.aspectRatio) s.aspectRatio = p.aspectRatio;
  if (p.delay) (s as Record<string, unknown>)["--cpsl-delay"] = `${p.delay}ms`;
  return s;
}

function revealClass(v: RevealVariant | undefined, loadOnMount?: boolean): string {
  const base = !v || v === "base" ? "cpsl-reveal" : `cpsl-reveal cpsl-reveal--${v}`;
  return loadOnMount ? `${base} cpsl-reveal--load` : base;
}

/**
 * Full-bleed looping background video. Shared across tiles.
 * autoplay + muted + loop + playsInline so it plays on every browser
 * (including iOS Safari) without user interaction. `poster` is
 * recommended — it's the first thing visible while the video loads.
 */
function TileVideo({ src, poster }: { src: string; poster?: string }) {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        pointerEvents: "none",
      }}
    >
      <source src={src} />
    </video>
  );
}

// ── PhotoTile ────────────────────────────────────────────────────────────────

export interface PhotoTileProps extends TileBaseProps {
  /** Image URL — used as background (and as video poster when videoUrl
   *  is set). Required so tiles always have something to show while a
   *  video is loading. */
  src: string;
  alt?: string;
  eyebrow?: string;
  title?: string;
  href?: string;
  /** Overlay darkness at bottom — 0.3 subtle → 0.75 heavy. Default 0.55. */
  scrim?: number;
  /** Optional background video. Autoplays muted + looped. Image in
   *  `src` is used as the poster. */
  videoUrl?: string;
}

export function PhotoTile({
  src,
  alt = "",
  eyebrow,
  title,
  href,
  scrim = 0.55,
  videoUrl,
  className,
  reveal,
  loadOnMount,
  ...rest
}: PhotoTileProps) {
  const body = (
    <>
      {/* Image (always rendered — also doubles as the video poster). */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: `url(${src}) center/cover no-repeat`,
        }}
      />
      {/* Video on top of the image when supplied. */}
      {videoUrl && <TileVideo src={videoUrl} poster={src} />}
      {/* Scrim on top of whichever media is showing. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, rgba(4,17,36,${scrim * 0.35}) 0%, rgba(4,17,36,${scrim}) 100%)`,
        }}
      />
      {(eyebrow || title) && (
        <div
          style={{
            position: "absolute",
            left: 20,
            right: 20,
            bottom: 18,
            color: "#F4EFE6",
          }}
        >
          {eyebrow && (
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#D4B949",
                marginBottom: 6,
              }}
            >
              {eyebrow}
            </div>
          )}
          {title && (
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(22px, 2.6vw, 34px)",
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
                textTransform: "uppercase",
              }}
            >
              {title}
            </div>
          )}
        </div>
      )}
      <span className="sr-only">{alt}</span>
    </>
  );
  const classes = [revealClass(reveal, loadOnMount), className].filter(Boolean).join(" ");
  return href ? (
    <a
      href={href}
      className={classes}
      style={tileStyle({ display: "block", color: "inherit", textDecoration: "none" }, rest)}
    >
      {body}
    </a>
  ) : (
    <div className={classes} style={tileStyle({}, rest)}>
      {body}
    </div>
  );
}

// ── PromoTile (gold / crimson / cream tones) ────────────────────────────────

export interface PromoTileProps extends TileBaseProps {
  tone: "gold" | "crimson" | "cream";
  eyebrow?: string;
  title: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** Optional background image (tinted by the tone). */
  imageUrl?: string;
  /** Optional background video. Autoplays muted + looped, `imageUrl`
   *  is used as the poster when both are provided. */
  videoUrl?: string;
  /** When media is set, the solid tone colour becomes a translucent
   *  overlay at this alpha so the media shows through. Default 0.75. */
  mediaOverlay?: number;
}

const PROMO_TOKENS: Record<
  PromoTileProps["tone"],
  {
    bg: string;
    fg: string;
    eyebrow: string;
    bodyColor: string;
    buttonVariant: "cpsl-navy" | "cpsl-gold";
  }
> = {
  gold: {
    bg: "#D4B949",
    fg: "#041124",
    eyebrow: "rgba(4,17,36,0.65)",
    bodyColor: "rgba(4,17,36,0.80)",
    buttonVariant: "cpsl-navy",
  },
  crimson: {
    bg: "#BF1D2D",
    fg: "#F4EFE6",
    eyebrow: "rgba(244,239,230,0.80)",
    bodyColor: "rgba(244,239,230,0.85)",
    buttonVariant: "cpsl-gold",
  },
  cream: {
    bg: "#F4EFE6",
    fg: "#041124",
    eyebrow: "#B09830",
    bodyColor: "#475569",
    buttonVariant: "cpsl-navy",
  },
};

function toneOverlay(bg: string, alpha: number): string {
  // Convert "#RRGGBB" to "rgba(r, g, b, alpha)" so we can scrim media
  // under the tone without losing the tone identity.
  const r = parseInt(bg.slice(1, 3), 16);
  const g = parseInt(bg.slice(3, 5), 16);
  const b = parseInt(bg.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function PromoTile({
  tone,
  eyebrow,
  title,
  body,
  ctaLabel,
  ctaHref,
  imageUrl,
  videoUrl,
  mediaOverlay = 0.75,
  className,
  reveal,
  loadOnMount,
  ...rest
}: PromoTileProps) {
  const t = PROMO_TOKENS[tone];
  const hasMedia = !!(imageUrl || videoUrl);
  return (
    <div
      className={[revealClass(reveal, loadOnMount), className].filter(Boolean).join(" ")}
      style={tileStyle(
        {
          // If media is present, keep the tone colour as a base so
          // text contrast is preserved while the video/image loads.
          background: t.bg,
          color: t.fg,
          padding: 28,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 18,
        },
        rest,
      )}
    >
      {/* Background media layer (below tone overlay + content). */}
      {hasMedia && imageUrl && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: `url(${imageUrl}) center/cover no-repeat`,
          }}
        />
      )}
      {hasMedia && videoUrl && <TileVideo src={videoUrl} poster={imageUrl} />}
      {/* Tone as a translucent scrim so text stays legible over media. */}
      {hasMedia && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: toneOverlay(t.bg, mediaOverlay),
          }}
        />
      )}
      <div style={{ position: "relative", zIndex: 1 }}>
        {eyebrow && (
          <div
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: t.eyebrow,
              marginBottom: 10,
            }}
          >
            {eyebrow}
          </div>
        )}
        <div
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(26px, 3vw, 42px)",
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            marginBottom: body ? 12 : 0,
          }}
        >
          {title}
        </div>
        {body && (
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 14,
              lineHeight: 1.55,
              margin: 0,
              color: t.bodyColor,
            }}
          >
            {body}
          </p>
        )}
      </div>
      {ctaLabel && (
        <div style={{ position: "relative", zIndex: 1, alignSelf: "flex-start" }}>
          <Button asChild variant={t.buttonVariant} size="sm">
            <a href={ctaHref || "#"}>{ctaLabel} →</a>
          </Button>
        </div>
      )}
    </div>
  );
}

// ── GraphicTile (soccer-themed pattern fill) ────────────────────────────────

export interface GraphicTileProps extends TileBaseProps {
  pattern?: "hex" | "stripes";
  tone?: "navy" | "crimson" | "gold";
  label?: string;
  stat?: string;
  /** Optional background image behind the pattern + tone scrim. */
  imageUrl?: string;
  /** Optional background video. Autoplays muted + looped; imageUrl
   *  is used as the poster. */
  videoUrl?: string;
  /** Tone-coloured scrim alpha over media so the pattern + stat stay
   *  legible. Default 0.70. */
  mediaOverlay?: number;
}

export function GraphicTile({
  pattern = "hex",
  tone = "navy",
  label,
  stat,
  imageUrl,
  videoUrl,
  mediaOverlay = 0.70,
  className,
  reveal,
  loadOnMount,
  ...rest
}: GraphicTileProps) {
  const bg = tone === "navy" ? "#0A1628" : tone === "crimson" ? "#BF1D2D" : "#D4B949";
  const fg = tone === "gold" ? "#041124" : tone === "crimson" ? "#F4EFE6" : "#D4B949";
  const labelColor = tone === "navy" ? "#7A9BAA" : tone === "gold" ? "#041124" : "#F4EFE6";
  const hasMedia = !!(imageUrl || videoUrl);
  return (
    <div
      className={[revealClass(reveal, loadOnMount), className].filter(Boolean).join(" ")}
      style={tileStyle(
        {
          background: bg,
          color: fg,
          padding: 28,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        },
        rest,
      )}
    >
      {/* Background media (layered below the pattern + tone scrim). */}
      {hasMedia && imageUrl && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: `url(${imageUrl}) center/cover no-repeat`,
          }}
        />
      )}
      {hasMedia && videoUrl && <TileVideo src={videoUrl} poster={imageUrl} />}
      {hasMedia && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: toneOverlay(bg, mediaOverlay),
          }}
        />
      )}
      <div
        aria-hidden
        className={pattern === "hex" ? "cpsl-pattern-hex" : "cpsl-pattern-stripes"}
        style={{
          position: "absolute",
          inset: 0,
          color: fg,
        }}
      />
      {stat && (
        <div
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(48px, 5.6vw, 88px)",
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            marginBottom: 6,
            position: "relative",
            zIndex: 1,
          }}
        >
          {stat}
        </div>
      )}
      {label && (
        <div
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: labelColor,
            position: "relative",
            zIndex: 1,
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
}

// ── PromoGrid ────────────────────────────────────────────────────────────────

export interface PromoGridProps {
  children: ReactNode;
  cols?: number;
  gap?: number;
  /** Edge-to-edge layout: no max-width, no side padding, child tiles
   *  lose their rounded corners via the companion CSS selector. */
  fullBleed?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function PromoGrid({
  children,
  cols = 12,
  gap = 12,
  fullBleed = false,
  className,
  style,
}: PromoGridProps) {
  return (
    <div
      className={[className, "cpsl-promo-grid"].filter(Boolean).join(" ")}
      data-cpsl-grid={fullBleed ? "fullbleed" : undefined}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gridAutoRows: "minmax(140px, auto)",
        gap,
        padding: fullBleed ? 0 : "clamp(12px, 2vw, 28px)",
        maxWidth: fullBleed ? "none" : 1440,
        margin: fullBleed ? 0 : "0 auto",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── PromoHero (full-bleed 70vh hero) ────────────────────────────────────────

export interface HeroSlide {
  imageUrl?: string;
  videoUrl?: string;
  /** Optional 200×200 graphic (logo/crest) shown above the headline. */
  graphicUrl?: string;
  /** Per-slide copy — each optional. Renders literally; blank
   *  stays blank (no inheritance from the previous slide or the
   *  hero's top-level fields). */
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface PromoHeroProps {
  /** Default headline used when no slides override it. Strongly
   *  recommended — a hero without a headline on any slide or the
   *  parent renders with no copy. */
  headline?: string;
  subheadline?: string;
  eyebrow?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** Background image URL — also used as the poster for videoUrl. */
  backgroundUrl?: string;
  /** Optional background video. Autoplays muted + looped; falls back
   *  to backgroundUrl while loading. */
  videoUrl?: string;
  /** Optional slideshow. When provided (and has ≥1 slide), takes
   *  precedence over backgroundUrl/videoUrl. Slides crossfade on a
   *  timer with a circular progress indicator on the far left. */
  slides?: HeroSlide[];
  /** Seconds per slide. Default 6. */
  slideDuration?: number;
  /** Hero section height — defaults to "70vh". Ignored when
   *  fullHeight is true. */
  height?: string;
  /** When true, the hero fills the viewport below the 80 px fixed
   *  nav (via 100dvh with safe-area handling). Overrides `height`. */
  fullHeight?: boolean;
  /** Content alignment:
   *   - "center" (default): large centered headline, centered CTA.
   *   - "left":   smaller headline, left-aligned, content pinned to
   *              the left edge of the hero. */
  layout?: "center" | "left";
}

export function PromoHero({
  headline,
  subheadline,
  eyebrow,
  ctaLabel = "Apply for Admission",
  ctaHref = "#apply",
  backgroundUrl,
  videoUrl,
  slides,
  slideDuration = 6,
  height = "70vh",
  fullHeight = false,
  layout = "center",
}: PromoHeroProps) {
  const isLeft = layout === "left";

  // Resolve the effective slide set. When the editor has entered
  // explicit slides, use them VERBATIM — each slide shows only its
  // own copy so blank fields read as blank (not inherited from the
  // hero or the previous slide). Otherwise synthesize a single-slide
  // carrying the hero-level content + background as a fallback for
  // documents that haven't opted into slides yet.
  const effectiveSlides: HeroSlide[] =
    slides && slides.length > 0
      ? slides
      : [
          {
            imageUrl: backgroundUrl,
            videoUrl,
            eyebrow,
            headline,
            subheadline,
            ctaLabel,
            ctaHref,
          },
        ];
  const hasSlideshow = effectiveSlides.length > 1;
  const dur = Math.max(1, slideDuration);

  const [activeIdx, setActiveIdx] = useState(0);

  // Auto-advance the slideshow. Reset whenever the slide count or
  // duration changes so we don't leak timers between edits.
  useEffect(() => {
    if (!hasSlideshow) return;
    const t = window.setTimeout(() => {
      setActiveIdx((i) => (i + 1) % effectiveSlides.length);
    }, dur * 1000);
    return () => window.clearTimeout(t);
  }, [activeIdx, hasSlideshow, effectiveSlides.length, dur]);

  return (
    <>
      {/* Fill-viewport CSS + timer ring keyframes ship with every
          PromoHero so they work regardless of whether a
          promoGridBlock (which also loads these rules via
          PromoReveal) is on the page. Duplicate rules across
          heroes are harmless. */}
      <style>{`
        /* Fill the visible viewport below the nav + logo ticker.
           80 px = TopNav (h-20), 80 px ≈ logo-ticker section (16 px
           top/bottom padding + 48 px tile + 30 px gap breathing
           room). Keeps the hero within viewport so no scrollbar
           appears from the hero alone, regardless of whether the
           browser chrome is expanded or retracted. */
        .cpsl-promo-hero--full {
          min-height: calc(100vh - 160px);
        }
        @supports (min-height: 100dvh) {
          .cpsl-promo-hero--full {
            min-height: calc(100dvh - 160px);
          }
        }
        @keyframes cpsl-hero-timer-fill {
          from { stroke-dashoffset: 106.8; }
          to   { stroke-dashoffset: 0;     }
        }
        @media (prefers-reduced-motion: reduce) {
          .cpsl-hero-timer-ring { animation: none !important; stroke-dashoffset: 0 !important; }
        }
      `}</style>
    <section
      className={fullHeight ? "cpsl-promo-hero--full" : undefined}
      style={{
        position: "relative",
        height: fullHeight ? undefined : height,
        minHeight: fullHeight ? undefined : 520,
        overflow: "hidden",
        background: "#041124",
      }}
    >
      {/* Slide stack — each slide is a full layer (media + content)
          so the image AND the text crossfade together per slide. */}
      {effectiveSlides.map((slide, i) => {
        const isActive = i === activeIdx;
        // Use ONLY the slide's own copy — no fallback to the hero's
        // top-level fields or the previous slide. Blank stays blank.
        const slideEyebrow     = slide.eyebrow;
        const slideHeadline    = slide.headline;
        const slideSubheadline = slide.subheadline;
        const slideCtaLabel    = slide.ctaLabel;
        const slideCtaHref     = slide.ctaHref;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: isLeft ? "flex-start" : "center",
              textAlign: isLeft ? "left" : "center",
              padding: isLeft ? "0 clamp(24px, 6vw, 96px)" : "0 24px",
              opacity: isActive ? 1 : 0,
              transition: "opacity 800ms ease-in-out",
              pointerEvents: isActive ? "auto" : "none",
            }}
            aria-hidden={!isActive}
          >
            {/* Image */}
            {slide.imageUrl && (
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `url(${slide.imageUrl}) center/cover no-repeat`,
                }}
              />
            )}
            {/* Video (only rendered for the active slide to save bandwidth) */}
            {slide.videoUrl && isActive && (
              <TileVideo src={slide.videoUrl} poster={slide.imageUrl} />
            )}
            {/* Scrim */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(9,22,40,0.65) 0%, rgba(9,22,40,0.40) 50%, rgba(4,17,36,0.95) 100%)",
              }}
            />
            {/* Content */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                maxWidth: isLeft ? 560 : 860,
              }}
            >
              {slideEyebrow && (
                <p
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 600,
                    fontSize: isLeft ? 12 : 13,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#D4B949",
                    marginBottom: isLeft ? 16 : 20,
                  }}
                >
                  {slideEyebrow}
                </p>
              )}
              {slide.graphicUrl && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={slide.graphicUrl}
                  alt=""
                  aria-hidden="true"
                  style={{
                    display: "block",
                    width: "min(200px, 40vw)",
                    height: "auto",
                    aspectRatio: "1 / 1",
                    objectFit: "contain",
                    margin: isLeft ? "0 0 18px" : "0 auto 20px",
                  }}
                />
              )}
              {slideHeadline && (
                <h1
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 900,
                    fontSize: isLeft
                      ? "clamp(32px, 5vw, 60px)"
                      : "clamp(44px, 8vw, 88px)",
                    lineHeight: 1.0,
                    letterSpacing: "-0.02em",
                    textTransform: "uppercase",
                    color: "#F4EFE6",
                    margin: isLeft ? "0 0 18px" : "0 0 24px",
                    // Prevents widows: browser balances lines so the
                    // last line isn't a single-word orphan.
                    textWrap: "balance",
                  }}
                >
                  {slideHeadline}
                </h1>
              )}
              {slideSubheadline && (
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: isLeft
                      ? "clamp(14px, 1.4vw, 17px)"
                      : "clamp(16px, 2vw, 19px)",
                    lineHeight: 1.6,
                    color: "#94A3B8",
                    maxWidth: isLeft ? 480 : 620,
                    margin: isLeft ? "0 0 28px" : "0 auto 36px",
                    // Same intent — balance short subheads so the
                    // last word doesn't orphan on its own line.
                    textWrap: "pretty",
                  }}
                >
                  {slideSubheadline}
                </p>
              )}
              {slideCtaLabel && (
                <Button asChild variant="cpsl-gold" size={isLeft ? "default" : "lg"}>
                  <a href={slideCtaHref}>{slideCtaLabel}</a>
                </Button>
              )}
            </div>
          </div>
        );
      })}

      {/* Circular progress timer — positioned near the top of the hero
          and left-aligned with the nav's logo (matches the TopNav's
          max-w-7xl + px-4/sm:px-6 container). Only rendered when there
          are 2+ slides. Re-keys on activeIdx so the stroke-dashoffset
          animation restarts cleanly every slide change. */}
      {hasSlideshow && (
        <div
          style={{
            position: "absolute",
            top: "clamp(28px, 4vh, 56px)",
            left: 0,
            right: 0,
            zIndex: 3,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              maxWidth: "80rem", // 1280px — matches TopNav's max-w-7xl
              margin: "0 auto",
              padding: "0 clamp(16px, 2vw, 24px)", // matches px-4 sm:px-6
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                position: "relative",
                pointerEvents: "auto",
              }}
              aria-label={`Slide ${activeIdx + 1} of ${effectiveSlides.length}`}
            >
              <svg
                viewBox="0 0 40 40"
                style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}
                aria-hidden="true"
              >
                <circle
                  cx="20"
                  cy="20"
                  r="17"
                  fill="none"
                  stroke="rgba(244,239,230,0.22)"
                  strokeWidth="2"
                />
                <circle
                  key={activeIdx}
                  className="cpsl-hero-timer-ring"
                  cx="20"
                  cy="20"
                  r="17"
                  fill="none"
                  stroke="#D4B949"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="106.8"
                  strokeDashoffset="106.8"
                  style={{
                    animation: `cpsl-hero-timer-fill ${dur}s linear forwards`,
                  }}
                />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Bottom fade into grid background */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "20%",
          background: "linear-gradient(to bottom, rgba(4,17,36,0), rgba(4,17,36,1))",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
    </section>
    </>
  );
}

// ── PromoReveal — inject the scroll-reveal styles once ──────────────────────

/**
 * Drop <PromoReveal /> once near the top of a layout to enable the
 * smooth scroll + soccer-themed mask reveal animations used by the
 * tiles above. Self-contained CSS, no consumer stylesheet needed.
 */
export function PromoReveal() {
  return (
    <style>{`
      html { scroll-behavior: smooth; }

      /* Default: scroll-driven reveal via the view() timeline.
         Range spans from the moment the tile's top crosses the
         viewport bottom (entry 0%) through the first half of the
         tile being fully contained (contain 50%) — so the animation
         keeps playing AFTER the tile is in view, rather than
         completing before the visitor sees it. Add
         .cpsl-reveal--load to switch a tile to a time-based reveal
         that fires on mount — meant for the first above-the-fold row
         so it animates in on page load instead of sitting static. */
      .cpsl-reveal {
        animation: cpsl-reveal-base both;
        animation-timeline: view();
        animation-range: entry 0% contain 50%;
        animation-delay: var(--cpsl-delay, 0ms);
      }
      @keyframes cpsl-reveal-base {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0);    }
      }

      .cpsl-reveal--hex {
        animation-name: cpsl-reveal-hex;
      }
      @keyframes cpsl-reveal-hex {
        from {
          clip-path: polygon(50% 38%, 62% 44%, 62% 56%, 50% 62%, 38% 56%, 38% 44%);
          opacity: 0.35;
        }
        to {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          opacity: 1;
        }
      }

      .cpsl-reveal--stripe {
        animation-name: cpsl-reveal-stripe;
      }
      @keyframes cpsl-reveal-stripe {
        from {
          clip-path: polygon(-10% 0, 0 0, 0 100%, -20% 100%);
          opacity: 0;
        }
        to {
          clip-path: polygon(-10% 0, 110% 0, 120% 100%, -20% 100%);
          opacity: 1;
        }
      }

      .cpsl-reveal--goal {
        animation-name: cpsl-reveal-goal;
      }
      @keyframes cpsl-reveal-goal {
        from {
          clip-path: inset(42% 42% 42% 42% round 14px);
          opacity: 0;
        }
        to {
          clip-path: inset(0 0 0 0 round 12px);
          opacity: 1;
        }
      }

      /* Silk: slow horizontal curtain wipe with a soft blur that
         settles into a crisp image. The longer range + eased
         transform gives it a satiny, hero-grade feel — use sparingly
         on the one image you want to command the viewport. */
      .cpsl-reveal--silk {
        animation-name: cpsl-reveal-silk;
        animation-range: entry 0% cover 60%;
        animation-timing-function: cubic-bezier(.19, 1, .22, 1);
      }
      @keyframes cpsl-reveal-silk {
        from {
          clip-path: inset(0 100% 0 0);
          filter: blur(8px);
          transform: scale(1.04);
          opacity: 0;
        }
        40% {
          filter: blur(4px);
          opacity: 1;
        }
        to {
          clip-path: inset(0 0 0 0);
          filter: blur(0);
          transform: scale(1);
          opacity: 1;
        }
      }

      /* Load-time override: restore the default animation timeline
         (clock-based) and give each variant a duration so it fires on
         mount instead of being driven by scroll position. */
      .cpsl-reveal--load {
        animation-timeline: auto;
        animation-range: normal;
        animation-duration: 700ms;
        animation-timing-function: cubic-bezier(.2, .8, .2, 1);
      }
      .cpsl-reveal--load.cpsl-reveal--silk {
        animation-duration: 1400ms;
        animation-timing-function: cubic-bezier(.19, 1, .22, 1);
      }
      .cpsl-reveal--load.cpsl-reveal--hex,
      .cpsl-reveal--load.cpsl-reveal--stripe,
      .cpsl-reveal--load.cpsl-reveal--goal {
        animation-duration: 900ms;
      }

      /* Edge-to-edge grids: strip the rounded corners from the
         immediate tile children so they read as a seamless mosaic. */
      [data-cpsl-grid="fullbleed"] > * {
        border-radius: 0 !important;
      }

      /* Full-height PromoHero: fills the viewport below the 80 px
         fixed nav. Uses dvh for modern browsers (grows as iOS
         Safari's chrome collapses on scroll), falls back to vh. */
      .cpsl-promo-hero--full {
        min-height: calc(100vh - 80px + env(safe-area-inset-bottom, 0px));
      }
      @supports (min-height: 100dvh) {
        .cpsl-promo-hero--full {
          min-height: calc(100dvh - 80px + env(safe-area-inset-bottom, 0px));
        }
      }

      /* Mobile: collapse every promo grid to a single stacked column
         so 7-column-wide tiles don't become illegible slivers. Resets
         each tile's col-/row-span to auto so they flow naturally. */
      @media (max-width: 767px) {
        .cpsl-promo-grid {
          grid-template-columns: 1fr !important;
          grid-auto-rows: auto !important;
        }
        .cpsl-promo-grid > * {
          grid-column: auto !important;
          grid-row: auto !important;
        }
      }

      /* Soccer-field markings — halfway line + centre circle. Both
         drawn with CSS gradients using a "circle" radial shape so the
         ring stays a true circle regardless of the tile's aspect
         ratio (no SVG stretching). */
      .cpsl-pattern-hex {
        background-color: transparent;
        background-image:
          /* Centre circle (hollow ring, 70px radius) */
          radial-gradient(
            circle at center,
            transparent 0,
            transparent 68px,
            rgba(255, 255, 255, 0.28) 69px,
            rgba(255, 255, 255, 0.28) 71px,
            transparent 72px
          ),
          /* Halfway line — full-width horizontal stripe at 50% */
          linear-gradient(
            to bottom,
            transparent 0,
            transparent calc(50% - 1px),
            rgba(255, 255, 255, 0.22) calc(50% - 1px),
            rgba(255, 255, 255, 0.22) calc(50% + 1px),
            transparent calc(50% + 1px)
          );
        opacity: 1;
      }
      .cpsl-pattern-stripes {
        background-image:
          repeating-linear-gradient(
            to right,
            rgba(255,255,255,0.03) 0 44px,
            rgba(255,255,255,0.08) 44px 88px
          );
        opacity: 1;
      }

      @media (prefers-reduced-motion: reduce) {
        .cpsl-reveal, .cpsl-reveal--hex, .cpsl-reveal--stripe, .cpsl-reveal--goal {
          animation: none;
          opacity: 1;
          clip-path: none;
          transform: none;
        }
        html { scroll-behavior: auto; }
      }
    `}</style>
  );
}

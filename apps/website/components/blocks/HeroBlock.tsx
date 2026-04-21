"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect, useState } from "react";

interface LottieField {
  asset?: { url?: string };
  loop?: boolean;
  autoplay?: boolean;
}

interface HeroBlockProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  ctaLabel?: string;
  ctaHref?: string;
  backgroundImage?: {
    asset?: { url?: string };
    alt?: string;
  };
  backgroundImages?: Array<{
    _key?: string;
    asset?: { url?: string };
    alt?: string;
  }>;
  backgroundInterval?: number;
  backgroundTransition?: number;
  backgroundBlendMode?: string;
  backgroundOpacity?: number;
  image?: {
    asset?: { url?: string };
    alt?: string;
  };
  lottie?: LottieField;
  mediaMaxWidth?: number;
}

export function HeroBlock({
  eyebrow    = "The Carolinas' Premier League",
  heading    = "Elevating Soccer Across Two States",
  subheading = "Competitive soccer for clubs and players across North and South Carolina — professionally run, community driven.",
  ctaLabel   = "Join Our League",
  ctaHref    = "#contact",
  backgroundImage,
  backgroundImages,
  backgroundInterval = 6,
  backgroundTransition = 1.5,
  backgroundBlendMode = "normal",
  backgroundOpacity = 1,
  image,
  lottie,
  mediaMaxWidth = 320,
}: HeroBlockProps) {
  // Prefer the array for slideshow; fall back to the single image.
  const slideshow = (backgroundImages ?? [])
    .map((img) => img?.asset?.url)
    .filter((url): url is string => !!url);
  const imageUrls =
    slideshow.length > 0
      ? slideshow
      : backgroundImage?.asset?.url
      ? [backgroundImage.asset.url]
      : [];
  const hasBg = imageUrls.length > 0;

  // Two-layer ping-pong so at most one additional image is in memory. The
  // inactive layer holds whatever we're fading away from; the active one
  // is what the visitor is currently looking at. The next image is only
  // fetched (via new Image().src) when it's time to transition — so only
  // one image beyond the visible one is ever in flight.
  const [layers, setLayers] = useState<[string | null, string | null]>([
    imageUrls[0] ?? null,
    null,
  ]);
  const [activeLayer, setActiveLayer] = useState<0 | 1>(0);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (imageUrls.length < 2) return;
    const ms = Math.max(1, backgroundInterval) * 1000;
    let cancelled = false;
    const timer = setTimeout(() => {
      const nextIdx = (currentIdx + 1) % imageUrls.length;
      const nextUrl = imageUrls[nextIdx];
      const preload = new window.Image();
      preload.src = nextUrl;
      const swap = () => {
        if (cancelled) return;
        const inactive: 0 | 1 = activeLayer === 0 ? 1 : 0;
        setLayers((l) => {
          const next: [string | null, string | null] = [l[0], l[1]];
          next[inactive] = nextUrl;
          return next;
        });
        setActiveLayer(inactive);
        setCurrentIdx(nextIdx);
      };
      if (preload.complete) swap();
      else preload.onload = swap;
    }, ms);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [imageUrls, currentIdx, activeLayer, backgroundInterval]);
  const lottieUrl  = lottie?.asset?.url;
  const imageUrl   = image?.asset?.url;
  const hasMedia   = !!(lottieUrl || imageUrl);

  return (
    <section
      className="cpsl-hero"
      style={{
        position: "relative",
        // Pull up behind the logo ticker (≈78 px tall) so the background
        // image extends under it. Extra top padding keeps the content
        // positioned as if the hero started below the ticker.
        marginTop: "-78px",
        // Vertical padding scales with viewport so it doesn't swallow the
        // screen on phones; side padding follows suit. The clamp mins keep
        // things readable on tiny devices, the maxes match the desktop spec.
        // Bottom adds env(safe-area-inset-bottom) so the CTA clears iOS
        // Safari's bottom tab bar now that viewport-fit=cover lets the hero
        // extend behind it.
        paddingTop: "clamp(96px, 18vh, 174px)",
        paddingRight: "clamp(16px, 5vw, 24px)",
        paddingBottom:
          "calc(clamp(56px, 10vh, 96px) + env(safe-area-inset-bottom))",
        paddingLeft: "clamp(16px, 5vw, 24px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 0,
        background: "#041124",
        overflow: "hidden",
      }}
    >
      {/* Viewport-height math. svh is the "small" viewport (visible area
          when all browser chrome is showing), which still stops short of
          the bottom safe area even with viewport-fit=cover. Adding
          env(safe-area-inset-bottom) pushes the section into the chrome
          overlay so iOS Safari's tab bar sits on top of the hero image
          instead of a navy gutter below it. The vh declaration is a
          fallback for browsers without svh support. */}
      <style>{`
        .cpsl-hero {
          min-height: calc(100vh - 80px + env(safe-area-inset-bottom, 0px));
        }
        @supports (min-height: 100svh) {
          .cpsl-hero {
            min-height: calc(100svh - 80px + env(safe-area-inset-bottom, 0px));
          }
        }
      `}</style>
      {hasBg &&
        layers.map((url, i) =>
          url ? (
            <div
              key={i}
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(to bottom, rgba(9,22,40,0.72) 0%, rgba(9,22,40,0.55) 60%, rgba(9,22,40,0.80) 100%), url(${url}) center/cover no-repeat`,
                backgroundBlendMode: backgroundBlendMode,
                opacity: i === activeLayer ? backgroundOpacity : 0,
                transition: `opacity ${backgroundTransition}s ease-in-out`,
                pointerEvents: "none",
              }}
            />
          ) : null
        )}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "860px",
          margin: "0 auto",
          padding: "0 24px",
          textAlign: "center",
        }}
      >
        {/* Eyebrow */}
        {eyebrow && (
          <p
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600,
              fontSize: "13px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#D4B949",
              marginBottom: "20px",
            }}
          >
            {eyebrow}
          </p>
        )}

        {/* Heading */}
        <h1
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(48px, 8vw, 88px)",
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            color: "#F4EFE6",
            marginBottom: hasMedia ? "28px" : "28px",
          }}
        >
          {heading}
        </h1>

        {/* Image or Lottie under the headline — lottie wins if both supplied */}
        {hasMedia && (
          <div
            style={{
              maxWidth: mediaMaxWidth,
              width: "100%",
              margin: "0 auto 28px",
            }}
          >
            {lottieUrl ? (
              <DotLottieReact
                src={lottieUrl}
                loop={lottie?.loop ?? true}
                autoplay={lottie?.autoplay ?? true}
                style={{ width: "100%", height: "auto" }}
              />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={imageUrl!}
                alt={image?.alt ?? ""}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            )}
          </div>
        )}

        {/* Subheading */}
        {subheading && (
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(16px, 2vw, 20px)",
              lineHeight: 1.65,
              color: "#94A3B8",
              maxWidth: "600px",
              margin: "0 auto 40px",
            }}
          >
            {subheading}
          </p>
        )}

        {/* CTA — matches the primary button in the nav */}
        {ctaLabel && (
          <a
            href={ctaHref || "#"}
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "8px 16px",
              background: "#D4B949",
              color: "#041124",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: "14px",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              textDecoration: "none",
              borderRadius: "6px",
              transition: "opacity 0.15s",
            }}
          >
            {ctaLabel}
          </a>
        )}
      </div>
    </section>
  );
}

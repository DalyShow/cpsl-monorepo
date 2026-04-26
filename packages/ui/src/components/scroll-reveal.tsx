"use client";

import * as React from "react";

export interface ScrollRevealProps {
  children: React.ReactNode;
  /** Delay (ms) after the element enters the viewport before the wipe begins. */
  delay?: number;
  /** Override the default 1.6s wipe duration. */
  duration?: number;
  /** Disable the reveal — render children immediately. */
  disabled?: boolean;
}

/**
 * Wraps any block in the DualPanel-style left-to-right wipe reveal.
 *
 * Strategy: SSR renders fully open (no clip-path) so content is
 * visible even before JS hydrates. After mount we measure the
 * wrapper's position — sections already inside the viewport stay
 * visible (no clip), sections below the fold get clipped and then
 * uncliped via IntersectionObserver as the user scrolls them into
 * view. This avoids the "blank page until JS loads" failure mode.
 *
 * Respects prefers-reduced-motion: skips the wipe entirely.
 */
export function ScrollReveal({
  children,
  delay    = 0,
  duration = 1600,
  disabled = false,
}: ScrollRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = React.useState(false);

  React.useEffect(() => {
    if (disabled) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const initiallyInView = rect.top < window.innerHeight - 80;

    // If the section is already on screen at mount, leave it visible —
    // an instant wipe over content the user is staring at is jarring.
    if (initiallyInView) return;

    setHidden(true);

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHidden(false);
          obs.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" },
    );

    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [disabled]);

  return (
    <div
      ref={ref}
      style={{
        clipPath: hidden ? "inset(0 100% 0 0)" : "inset(0 0 0 0)",
        transition: `clip-path ${duration}ms cubic-bezier(.16, 1, .3, 1) ${delay}ms`,
        willChange: "clip-path",
      }}
    >
      {children}
    </div>
  );
}

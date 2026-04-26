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
 * Uses IntersectionObserver — the wipe fires once when the wrapper
 * crosses ~15% into view, then unobserves so it never re-runs.
 *
 * Respects prefers-reduced-motion: reveals instantly without animation.
 */
export function ScrollReveal({
  children,
  delay    = 0,
  duration = 1600,
  disabled = false,
}: ScrollRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = React.useState(false);
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReducedMotion(true);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" },
    );

    const el = ref.current;
    if (el) obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isOpen = disabled || reducedMotion || revealed;

  return (
    <div
      ref={ref}
      style={{
        clipPath: isOpen ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
        transition: reducedMotion
          ? "none"
          : `clip-path ${duration}ms cubic-bezier(.16, 1, .3, 1) ${delay}ms`,
        willChange: "clip-path",
      }}
    >
      {children}
    </div>
  );
}

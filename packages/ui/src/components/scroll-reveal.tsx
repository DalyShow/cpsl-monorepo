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
  /**
   * Force the wipe even when the element is above the fold at mount.
   * Use sparingly — only for sections that frame the entire page entry
   * (e.g. the first block on a dynamic page route, where a clean
   * left-to-right reveal sets the navigation transition tempo).
   */
  animateOnMount?: boolean;
}

/**
 * Wraps any block in the DualPanel-style left-to-right wipe reveal.
 *
 * Strategy: SSR renders fully open (no clip-path) so content is
 * visible even before JS hydrates. After mount we measure the
 * wrapper's position — sections already inside the viewport stay
 * visible (no clip), sections below the fold get clipped and then
 * unclipped as the user scrolls them into view, via an
 * IntersectionObserver AND a plain scroll-position fallback so a
 * missed observer callback can never leave content hidden.
 *
 * Respects prefers-reduced-motion: skips the wipe entirely.
 */
export function ScrollReveal({
  children,
  delay          = 0,
  duration       = 1600,
  disabled       = false,
  animateOnMount = false,
}: ScrollRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  // For animateOnMount, SSR + first paint already render the closed state
  // (clip-path inset(0 100% 0 0)). useEffect then flips to open and the
  // CSS transition runs from closed → open. The trade-off: the section
  // is invisible until JS hydrates — only do this on routes where the
  // entrance animation is the point.
  const [hidden, setHidden] = React.useState(animateOnMount);

  React.useEffect(() => {
    if (disabled) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setHidden(false);
      return;
    }
    if (!ref.current) return;

    if (animateOnMount) {
      // Initial state is already hidden — just open on the next frame so
      // the browser commits the closed paint before the transition starts.
      // The timeout backstops rAF, which background tabs throttle — the
      // section must never sit hidden waiting on a frame that isn't coming.
      const raf = requestAnimationFrame(() => setHidden(false));
      const timer = setTimeout(() => setHidden(false), 150);
      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(timer);
      };
    }

    const el = ref.current;
    const inView = () => el.getBoundingClientRect().top < window.innerHeight - 80;

    // If the section is already on screen at mount, leave it visible —
    // an instant wipe over content the user is staring at is jarring.
    if (inView()) return;

    setHidden(true);

    // Fail-open by design: a section may only ever be hidden while BOTH
    // triggers below are armed. Relying on IntersectionObserver alone
    // left content permanently clipped whenever the observer didn't
    // fire — the plain scroll-position check guarantees a reveal.
    let obs: IntersectionObserver | undefined;
    const cleanup = () => {
      obs?.disconnect();
      document.removeEventListener("scroll", check, true);
      window.removeEventListener("resize", check);
    };
    const reveal = () => {
      setHidden(false);
      cleanup();
    };
    function check() {
      if (inView()) reveal();
    }

    if (typeof IntersectionObserver !== "undefined") {
      obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) reveal();
        },
        // threshold 0 — any visible pixel reveals; a ratio threshold can
        // be unreachable for tall sections and strands them hidden.
        { threshold: 0, rootMargin: "0px 0px -80px 0px" },
      );
      obs.observe(el);
    }

    // Capture-phase document listener also hears nested scroll
    // containers, which never bubble a scroll event to window.
    document.addEventListener("scroll", check, { capture: true, passive: true });
    window.addEventListener("resize", check);
    check(); // user may have scrolled between SSR paint and hydration

    return cleanup;
  }, [disabled, animateOnMount]);

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

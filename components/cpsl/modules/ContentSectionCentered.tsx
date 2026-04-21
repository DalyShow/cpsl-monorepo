"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export interface LottieMedia {
  src: string;        // URL to a .lottie or .json animation file
  loop?: boolean;     // defaults to true
  autoplay?: boolean; // defaults to true
  width?: number | string;
  height?: number | string;
}

export interface ContentSectionCenteredProps {
  /** Small eyebrow label above the heading */
  eyebrow?: string;
  heading?: string;
  /**
   * Optional image displayed below the heading and above the lead paragraph.
   * Renders full-width within the centered max-w-2xl header column.
   */
  image?: { src: string; alt?: string };
  /**
   * Optional Lottie animation (.lottie or .json) displayed in the same slot
   * as `image` — between heading and lead. Takes precedence over `image` if both provided.
   */
  lottie?: LottieMedia;
  /** Lead paragraph centered below the heading (and image/lottie, if present) */
  lead?: string;
  /**
   * Body paragraphs below the header block.
   * - columns="2" (default): split into two equal columns at lg breakpoint
   * - columns="1": single centered column, max-w-2xl, for shorter or more
   *   editorial copy where scanability matters less than flow.
   */
  paragraphs?: string[];
  /** Surface variant — defaults to "cream". */
  background?: "white" | "surface" | "cream" | "navy" | "gold";
  /** Number of body-copy columns — defaults to 2. */
  columns?: 1 | 2;
  /** Optional image displayed at the very bottom of the section, 120px below the last content. */
  bottomImage?: { src: string; alt?: string };
  /** Optional Lottie animation at the very bottom — same position as bottomImage. Takes precedence over bottomImage if both provided. */
  bottomLottie?: LottieMedia;
}

const defaultParagraphs = [
  "The Carolina Premier Soccer League was founded to elevate competitive youth and amateur soccer across North Carolina and South Carolina. Our league spans the state border — a boundary that unites rather than divides — and serves clubs from Charlotte to Raleigh, Greensboro to the coast.",
  "With tiered divisions — Premier, Elite, and Academy — CPSL provides a development pathway for players at every stage. Our promotion and relegation structure rewards ambition and ensures every match carries weight throughout the full season.",
  "CPSL partners with US Soccer and regional federations to deliver certified officiating, standardized pitch standards, and transparent standings. Teams gain access to stat tracking, live scoring, and digital match reports through the CPSL platform.",
  "From pre-season tournaments to end-of-season championships, the CPSL calendar is built around the player experience. We believe competitive soccer should be accessible, professionally run, and celebrated by the communities it represents.",
];

export function ContentSectionCentered({
  eyebrow = "About the League",
  heading = "Competitive Soccer Across the Carolinas",
  image,
  lottie,
  lead = "From the Piedmont to the coast, CPSL brings together the best clubs in North and South Carolina under one banner — raising the standard for competitive soccer at every level.",
  paragraphs = defaultParagraphs,
  background = "cream",
  columns = 2,
  bottomImage,
  bottomLottie,
}: ContentSectionCenteredProps) {
  const bgColor   = background === "navy"    ? "#091628"
                  : background === "surface" ? "#F4F6FA"
                  : background === "cream"   ? "#F4EFE6"
                  : background === "gold"    ? "#C9A74C"
                  : "#FFFFFF";
  const headColor = background === "navy"    ? "#F4EFE6"
                  : "#091628";
  const leadColor = background === "navy"    ? "#94A3B8"
                  : background === "gold"    ? "#3D2400"
                  : "#475569";
  const bodyColor = background === "navy"    ? "#64748B"
                  : background === "gold"    ? "#4A2E00"
                  : "#64748B";

  const mid  = Math.ceil(paragraphs.length / 2);
  const col1 = paragraphs.slice(0, mid);
  const col2 = paragraphs.slice(mid);

  return (
    <section style={{ background: bgColor }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">

        {/* ── Centered header ───────────────────────────────────────── */}
        <div className="mx-auto max-w-2xl text-center" style={{ marginBottom: "64px" }}>
          {eyebrow && (
            <p
              className="text-sm tracking-widest uppercase mb-4"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 600,
                color: background === "gold" ? "#1A3D2B" : "#C9A74C",
                letterSpacing: "0.12em",
              }}
            >
              {eyebrow}
            </p>
          )}
          <h2
            className="uppercase"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(36px, 5vw, 52px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: headColor,
              marginBottom: (image || lottie) ? "32px" : "24px",
            }}
          >
            {heading}
          </h2>

          {/* ── Optional media — sits between heading and lead ─────────
               Lottie takes precedence over image if both provided      */}
          {lottie?.src ? (
            <div style={{ margin: "0 auto 32px", width: lottie.width ?? "100%", maxWidth: "100%" }}>
              <DotLottieReact
                src={lottie.src}
                loop={lottie.loop ?? true}
                autoplay={lottie.autoplay ?? true}
                style={{ width: "100%", height: lottie.height ?? 320 }}
              />
            </div>
          ) : image?.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image.src}
              alt={image.alt ?? ""}
              className="max-h-[250px] lg:max-h-[450px]"
              style={{
                display: "block",
                width: "auto",
                maxWidth: "100%",
                margin: "0 auto 32px",
              }}
            />
          ) : null}

          {lead && (
            <p
              className="text-lg leading-relaxed"
              style={{ color: leadColor }}
            >
              {lead}
            </p>
          )}
        </div>

        {/* ── Divider ───────────────────────────────────────────────── */}
        {paragraphs.length > 0 && (
          <div
            className="mx-auto mb-12"
            style={{
              width: "48px",
              height: "3px",
              background: background === "gold" ? "#091628" : "#C9A74C",
            }}
          />
        )}

        {/* ── Body copy ─────────────────────────────────────────────── */}
        {paragraphs.length > 0 && (
          columns === 1 ? (
            /* Single column — centered, editorial flow */
            <div className="mx-auto max-w-2xl flex flex-col gap-6">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-base leading-8" style={{ color: bodyColor }}>
                  {p}
                </p>
              ))}
            </div>
          ) : (
            /* Two columns — split evenly at lg breakpoint */
            <div className="mx-auto max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="flex flex-col gap-6">
                {col1.map((p, i) => (
                  <p key={i} className="text-base leading-8" style={{ color: bodyColor }}>
                    {p}
                  </p>
                ))}
              </div>
              <div className="flex flex-col gap-6">
                {col2.map((p, i) => (
                  <p key={i} className="text-base leading-8" style={{ color: bodyColor }}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
          )
        )}

        {/* ── Bottom media — 120px below last content ────────────────────
             bottomLottie takes precedence over bottomImage if both provided */}
        {bottomLottie?.src ? (
          <div style={{ margin: "120px auto 0", width: bottomLottie.width ?? "100%", maxWidth: "100%" }}>
            <DotLottieReact
              src={bottomLottie.src}
              loop={bottomLottie.loop ?? true}
              autoplay={bottomLottie.autoplay ?? true}
              style={{ width: "100%", height: bottomLottie.height ?? 400 }}
            />
          </div>
        ) : bottomImage?.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bottomImage.src}
            alt={bottomImage.alt ?? ""}
            style={{
              display: "block",
              width: "auto",
              maxWidth: "100%",
              maxHeight: "450px",
              margin: "120px auto 0",
            }}
          />
        ) : null}
      </div>
    </section>
  );
}

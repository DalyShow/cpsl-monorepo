"use client";

// Ported from CPSL Design System — components/cpsl/modules/ContentSectionCentered.tsx

// 240×190 staggered tile: CPSL shield + border hash motif (used on navy sections)
const PATTERN_TILE = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="140"><g transform="translate(11,9) scale(0.17)" stroke="#D4B949" fill="none" stroke-width="4.396" stroke-miterlimit="10"><path d="M2.2 2.333C20.661 2.038 39.803 2.32 58.344 2.321V2.322L155.272 2.366C155.062 11.605 155.24 21.96 155.293 31.382L155.307 35.678L155.305 76.006L155.307 100.211C155.304 105.775 155.478 111.692 154.985 116.943C152.578 142.643 141.649 163.296 123.023 179.774C115.814 185.647 108.118 191.346 100.356 197.065C93.084 202.424 85.748 207.802 78.769 213.315C76.791 211.719 74.343 209.922 72.21 208.354L69.755 206.54L47.435 189.709C40.381 184.387 34.346 180.172 28.321 174.091L27.738 173.496C16.984 162.211 9.235 148.171 5.26 132.774L4.887 131.28C1.697 117.881 2.232 108.711 2.234 94.696L2.242 66.684V66.682L2.2 2.333Z"/><path d="M2.931 102.966L169.419 73.658"/><path d="M108.331 102.234L93.891 87.794"/><path d="M97.77 102.234L84.884 89.344"/><path d="M87.213 102.234L75.97 90.99"/><path d="M76.653 102.234L66.925 92.505"/><path d="M66.095 102.234L57.946 94.088"/><path d="M55.535 102.234L49.092 95.79"/></g><g transform="translate(11,9) scale(0.17)" fill="#D4B949"><path d="M82.955 63.554V35.604L84.813 33.746H92.378L94.235 35.604V42.806H90.747V37.552L90.43 37.234H86.715L86.398 37.552V61.652L86.715 61.969H90.43L90.747 61.652V56.397H94.235V63.599L92.378 65.457H84.813L82.955 63.554Z"/><path d="M74.941 33.747H78.429V65.457H74.941V53.906L67.376 39.228V65.457H63.888V33.747H68.327L74.941 46.657V33.747Z"/><path d="M81.612 156.577V125.298L83.69 123.22H92.156L94.235 125.298V133.359H90.331V127.478L89.976 127.123H85.819L85.464 127.478V154.448L85.819 154.803H89.976L90.331 154.448V148.568H94.235V156.628L92.156 158.707H83.69L81.612 156.577Z"/><path d="M63.888 156.629V148.569H67.792V154.45L68.147 154.804H72.304L72.658 154.45V143.296L72.304 142.942H66.017L63.939 140.863V125.35L66.017 123.272H74.484L76.562 125.35V133.411H72.658V127.53L72.304 127.175H68.147L67.792 127.53V138.683L68.147 139.038H74.433L76.511 141.117V156.629L74.433 158.708H65.967L63.888 156.629Z"/></g><g transform="translate(62,37) scale(0.22)" stroke="#D4B949" fill="none" stroke-width="5" stroke-miterlimit="10"><path d="M0.447 32.151L163.75 2.46"/><path d="M129.65 34.827L109.209 14.387"/><path d="M114.7 34.827L96.459 16.582"/><path d="M99.756 34.827L83.84 18.911"/><path d="M84.807 34.827L71.036 21.056"/><path d="M69.862 34.827L58.327 23.296"/><path d="M54.913 34.827L45.793 25.707"/></g><g transform="translate(100,76) scale(0.17)" stroke="#D4B949" fill="none" stroke-width="4.396" stroke-miterlimit="10"><path d="M2.2 2.333C20.661 2.038 39.803 2.32 58.344 2.321V2.322L155.272 2.366C155.062 11.605 155.24 21.96 155.293 31.382L155.307 35.678L155.305 76.006L155.307 100.211C155.304 105.775 155.478 111.692 154.985 116.943C152.578 142.643 141.649 163.296 123.023 179.774C115.814 185.647 108.118 191.346 100.356 197.065C93.084 202.424 85.748 207.802 78.769 213.315C76.791 211.719 74.343 209.922 72.21 208.354L69.755 206.54L47.435 189.709C40.381 184.387 34.346 180.172 28.321 174.091L27.738 173.496C16.984 162.211 9.235 148.171 5.26 132.774L4.887 131.28C1.697 117.881 2.232 108.711 2.234 94.696L2.242 66.684V66.682L2.2 2.333Z"/><path d="M2.931 102.966L169.419 73.658"/><path d="M108.331 102.234L93.891 87.794"/><path d="M97.77 102.234L84.884 89.344"/><path d="M87.213 102.234L75.97 90.99"/><path d="M76.653 102.234L66.925 92.505"/><path d="M66.095 102.234L57.946 94.088"/><path d="M55.535 102.234L49.092 95.79"/></g><g transform="translate(100,76) scale(0.17)" fill="#D4B949"><path d="M82.955 63.554V35.604L84.813 33.746H92.378L94.235 35.604V42.806H90.747V37.552L90.43 37.234H86.715L86.398 37.552V61.652L86.715 61.969H90.43L90.747 61.652V56.397H94.235V63.599L92.378 65.457H84.813L82.955 63.554Z"/><path d="M74.941 33.747H78.429V65.457H74.941V53.906L67.376 39.228V65.457H63.888V33.747H68.327L74.941 46.657V33.747Z"/><path d="M81.612 156.577V125.298L83.69 123.22H92.156L94.235 125.298V133.359H90.331V127.478L89.976 127.123H85.819L85.464 127.478V154.448L85.819 154.803H89.976L90.331 154.448V148.568H94.235V156.628L92.156 158.707H83.69L81.612 156.577Z"/><path d="M63.888 156.629V148.569H67.792V154.45L68.147 154.804H72.304L72.658 154.45V143.296L72.304 142.942H66.017L63.939 140.863V125.35L66.017 123.272H74.484L76.562 125.35V133.411H72.658V127.53L72.304 127.175H68.147L67.792 127.53V138.683L68.147 139.038H74.433L76.511 141.117V156.629L74.433 158.708H65.967L63.888 156.629Z"/></g><g transform="translate(6,104) scale(0.18)" stroke="#D4B949" fill="none" stroke-width="5" stroke-miterlimit="10"><path d="M0.447 32.151L163.75 2.46"/><path d="M129.65 34.827L109.209 14.387"/><path d="M114.7 34.827L96.459 16.582"/><path d="M99.756 34.827L83.84 18.911"/><path d="M84.807 34.827L71.036 21.056"/><path d="M69.862 34.827L58.327 23.296"/><path d="M54.913 34.827L45.793 25.707"/></g></svg>`;
const patternBg = `url("data:image/svg+xml,${encodeURIComponent(PATTERN_TILE)}")`;

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface LottieField {
  /** Sanity file asset — dereferenced via GROQ asset->{ url } */
  asset?:    { url?: string };
  loop?:     boolean;
  autoplay?: boolean;
}

interface ContentSectionCenteredProps {
  eyebrow?:    string;
  heading?:    string;
  /** Optional image from Sanity — asset is pre-dereferenced via GROQ */
  image?:      { asset?: { url?: string }; alt?: string };
  /** Optional Lottie animation — sits in same slot as image, takes precedence */
  lottie?:     LottieField;
  lead?:       string;
  paragraphs?: string[];
  background?: "white" | "surface" | "cream" | "navy" | "gold";
  /** 1 = single centered column, 2 = two columns at lg (default) */
  columns?:    number;
  /** Optional image at the bottom of the section, 120px below the last content */
  bottomImage?:  { asset?: { url?: string }; alt?: string };
  /** Optional Lottie animation at the bottom — takes precedence over bottomImage */
  bottomLottie?: LottieField;
}

export function ContentSectionCentered({
  eyebrow    = "About the League",
  heading    = "Competitive Soccer Across the Carolinas",
  image,
  lottie,
  lead       = "From the Piedmont to the coast, CPSL brings together the best clubs in North and South Carolina under one banner — raising the standard for competitive soccer at every level.",
  paragraphs = [],
  background = "cream",
  columns    = 2,
  bottomImage,
  bottomLottie,
}: ContentSectionCenteredProps) {
  // Navy and gold are fixed editorial colours; light variants adapt to the active theme
  const bgColor   = background === "navy" ? "#041124"
                  : background === "gold" ? "#D4B949"
                  : "var(--bg-page)";          // cream / white / surface → theme-aware
  const headColor = background === "navy" ? "#F4EFE6"
                  : background === "gold" ? "#3D2400"
                  : "var(--fg-primary)";
  const leadColor = background === "navy" ? "#94A3B8"
                  : background === "gold" ? "#3D2400"
                  : "var(--fg-secondary)";
  const bodyColor = background === "navy" ? "#64748B"
                  : background === "gold" ? "#4A2E00"
                  : "var(--fg-secondary)";

  const imageUrl       = image?.asset?.url;
  const bottomImageUrl = bottomImage?.asset?.url;
  const lottieUrl      = lottie?.asset?.url;
  const bottomLottieUrl = bottomLottie?.asset?.url;
  const hasTopMedia    = !!(lottieUrl || imageUrl);
  const hasBottomMedia = !!(bottomLottieUrl || bottomImageUrl);
  const mid  = Math.ceil(paragraphs.length / 2);
  const col1 = paragraphs.slice(0, mid);
  const col2 = paragraphs.slice(mid);

  const showPattern = false; // TODO: re-enable when ready — background !== "gold"

  return (
    <section style={{ backgroundColor: bgColor, position: "relative", overflow: "hidden" }}>
      {showPattern && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: patternBg,
            backgroundSize: "180px 140px",
            backgroundRepeat: "repeat",
            opacity: 0.12,
            pointerEvents: "none",
          }}
        />
      )}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24" style={{ position: "relative", zIndex: 1 }}>

        {/* Centered header */}
        <div className="mx-auto max-w-2xl text-center" style={{ marginBottom: "64px" }}>
          {eyebrow && (
            <p
              className="text-sm tracking-widest uppercase mb-4"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 600,
                color: background === "gold"  ? "#1A3D2B"
                     : background === "navy"  ? "#E74552"   /* crimson-400 — always dark */
                     : "var(--eyebrow-color)",               /* gold ↔ crimson via theme  */
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
              marginBottom: hasTopMedia ? "32px" : "24px",
            }}
          >
            {heading}
          </h2>

          {/* Optional media — between heading and lead. Lottie takes precedence. */}
          {lottieUrl ? (
            <div style={{ margin: "0 auto 32px", width: "100%", maxWidth: "100%" }}>
              <DotLottieReact
                src={lottieUrl}
                loop={lottie?.loop ?? true}
                autoplay={lottie?.autoplay ?? true}
                style={{ width: "100%", height: 320 }}
              />
            </div>
          ) : imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={image?.alt ?? ""}
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
            <p className="text-lg leading-relaxed" style={{ color: leadColor }}>
              {lead}
            </p>
          )}
        </div>

        {/* Divider */}
        {paragraphs.length > 0 && (
          <div
            className="mx-auto mb-12"
            style={{
              width: "48px",
              height: "3px",
              background: background === "gold" ? "#041124" : "#D4B949",
            }}
          />
        )}

        {/* Body copy */}
        {paragraphs.length > 0 && (
          columns === 1 ? (
            <div className="mx-auto max-w-2xl flex flex-col gap-6">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-base leading-8" style={{ color: bodyColor }}>{p}</p>
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="flex flex-col gap-6">
                {col1.map((p, i) => (
                  <p key={i} className="text-base leading-8" style={{ color: bodyColor }}>{p}</p>
                ))}
              </div>
              <div className="flex flex-col gap-6">
                {col2.map((p, i) => (
                  <p key={i} className="text-base leading-8" style={{ color: bodyColor }}>{p}</p>
                ))}
              </div>
            </div>
          )
        )}

        {/* Bottom media — 120px below last content. Lottie takes precedence. */}
        {bottomLottieUrl ? (
          <div style={{ margin: "120px auto 0", width: "100%", maxWidth: "100%" }}>
            <DotLottieReact
              src={bottomLottieUrl}
              loop={bottomLottie?.loop ?? true}
              autoplay={bottomLottie?.autoplay ?? true}
              style={{ width: "100%", height: 400 }}
            />
          </div>
        ) : bottomImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bottomImageUrl}
            alt={bottomImage?.alt ?? ""}
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

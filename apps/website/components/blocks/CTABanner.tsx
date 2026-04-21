// Ported from CPSL Design System — components/cpsl/modules/CTABanner.tsx

const PATTERN_TILE = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="140"><g transform="translate(11,9) scale(0.17)" stroke="#D4B949" fill="none" stroke-width="4.396" stroke-miterlimit="10"><path d="M2.2 2.333C20.661 2.038 39.803 2.32 58.344 2.321V2.322L155.272 2.366C155.062 11.605 155.24 21.96 155.293 31.382L155.307 35.678L155.305 76.006L155.307 100.211C155.304 105.775 155.478 111.692 154.985 116.943C152.578 142.643 141.649 163.296 123.023 179.774C115.814 185.647 108.118 191.346 100.356 197.065C93.084 202.424 85.748 207.802 78.769 213.315C76.791 211.719 74.343 209.922 72.21 208.354L69.755 206.54L47.435 189.709C40.381 184.387 34.346 180.172 28.321 174.091L27.738 173.496C16.984 162.211 9.235 148.171 5.26 132.774L4.887 131.28C1.697 117.881 2.232 108.711 2.234 94.696L2.242 66.684V66.682L2.2 2.333Z"/><path d="M2.931 102.966L169.419 73.658"/><path d="M108.331 102.234L93.891 87.794"/><path d="M97.77 102.234L84.884 89.344"/><path d="M87.213 102.234L75.97 90.99"/><path d="M76.653 102.234L66.925 92.505"/><path d="M66.095 102.234L57.946 94.088"/><path d="M55.535 102.234L49.092 95.79"/></g><g transform="translate(11,9) scale(0.17)" fill="#D4B949"><path d="M82.955 63.554V35.604L84.813 33.746H92.378L94.235 35.604V42.806H90.747V37.552L90.43 37.234H86.715L86.398 37.552V61.652L86.715 61.969H90.43L90.747 61.652V56.397H94.235V63.599L92.378 65.457H84.813L82.955 63.554Z"/><path d="M74.941 33.747H78.429V65.457H74.941V53.906L67.376 39.228V65.457H63.888V33.747H68.327L74.941 46.657V33.747Z"/><path d="M81.612 156.577V125.298L83.69 123.22H92.156L94.235 125.298V133.359H90.331V127.478L89.976 127.123H85.819L85.464 127.478V154.448L85.819 154.803H89.976L90.331 154.448V148.568H94.235V156.628L92.156 158.707H83.69L81.612 156.577Z"/><path d="M63.888 156.629V148.569H67.792V154.45L68.147 154.804H72.304L72.658 154.45V143.296L72.304 142.942H66.017L63.939 140.863V125.35L66.017 123.272H74.484L76.562 125.35V133.411H72.658V127.53L72.304 127.175H68.147L67.792 127.53V138.683L68.147 139.038H74.433L76.511 141.117V156.629L74.433 158.708H65.967L63.888 156.629Z"/></g><g transform="translate(62,37) scale(0.22)" stroke="#D4B949" fill="none" stroke-width="5" stroke-miterlimit="10"><path d="M0.447 32.151L163.75 2.46"/><path d="M129.65 34.827L109.209 14.387"/><path d="M114.7 34.827L96.459 16.582"/><path d="M99.756 34.827L83.84 18.911"/><path d="M84.807 34.827L71.036 21.056"/><path d="M69.862 34.827L58.327 23.296"/><path d="M54.913 34.827L45.793 25.707"/></g><g transform="translate(100,76) scale(0.17)" stroke="#D4B949" fill="none" stroke-width="4.396" stroke-miterlimit="10"><path d="M2.2 2.333C20.661 2.038 39.803 2.32 58.344 2.321V2.322L155.272 2.366C155.062 11.605 155.24 21.96 155.293 31.382L155.307 35.678L155.305 76.006L155.307 100.211C155.304 105.775 155.478 111.692 154.985 116.943C152.578 142.643 141.649 163.296 123.023 179.774C115.814 185.647 108.118 191.346 100.356 197.065C93.084 202.424 85.748 207.802 78.769 213.315C76.791 211.719 74.343 209.922 72.21 208.354L69.755 206.54L47.435 189.709C40.381 184.387 34.346 180.172 28.321 174.091L27.738 173.496C16.984 162.211 9.235 148.171 5.26 132.774L4.887 131.28C1.697 117.881 2.232 108.711 2.234 94.696L2.242 66.684V66.682L2.2 2.333Z"/><path d="M2.931 102.966L169.419 73.658"/><path d="M108.331 102.234L93.891 87.794"/><path d="M97.77 102.234L84.884 89.344"/><path d="M87.213 102.234L75.97 90.99"/><path d="M76.653 102.234L66.925 92.505"/><path d="M66.095 102.234L57.946 94.088"/><path d="M55.535 102.234L49.092 95.79"/></g><g transform="translate(100,76) scale(0.17)" fill="#D4B949"><path d="M82.955 63.554V35.604L84.813 33.746H92.378L94.235 35.604V42.806H90.747V37.552L90.43 37.234H86.715L86.398 37.552V61.652L86.715 61.969H90.43L90.747 61.652V56.397H94.235V63.599L92.378 65.457H84.813L82.955 63.554Z"/><path d="M74.941 33.747H78.429V65.457H74.941V53.906L67.376 39.228V65.457H63.888V33.747H68.327L74.941 46.657V33.747Z"/><path d="M81.612 156.577V125.298L83.69 123.22H92.156L94.235 125.298V133.359H90.331V127.478L89.976 127.123H85.819L85.464 127.478V154.448L85.819 154.803H89.976L90.331 154.448V148.568H94.235V156.628L92.156 158.707H83.69L81.612 156.577Z"/><path d="M63.888 156.629V148.569H67.792V154.45L68.147 154.804H72.304L72.658 154.45V143.296L72.304 142.942H66.017L63.939 140.863V125.35L66.017 123.272H74.484L76.562 125.35V133.411H72.658V127.53L72.304 127.175H68.147L67.792 127.53V138.683L68.147 139.038H74.433L76.511 141.117V156.629L74.433 158.708H65.967L63.888 156.629Z"/></g><g transform="translate(6,104) scale(0.18)" stroke="#D4B949" fill="none" stroke-width="5" stroke-miterlimit="10"><path d="M0.447 32.151L163.75 2.46"/><path d="M129.65 34.827L109.209 14.387"/><path d="M114.7 34.827L96.459 16.582"/><path d="M99.756 34.827L83.84 18.911"/><path d="M84.807 34.827L71.036 21.056"/><path d="M69.862 34.827L58.327 23.296"/><path d="M54.913 34.827L45.793 25.707"/></g></svg>`;
const patternBg = `url("data:image/svg+xml,${encodeURIComponent(PATTERN_TILE)}")`;

type Background = "white" | "cream" | "surface" | "navy" | "gold"

interface CTABannerProps {
  eyebrow?:             string;
  headline?:            string;
  headlineAccent?:      string;
  description?:         string;
  primaryCtaLabel?:     string;
  primaryCtaHref?:      string;
  /** When true, renders the secondary (ghost) button alongside the primary CTA */
  showSecondaryButton?: boolean;
  secondaryCtaLabel?:   string;
  secondaryCtaHref?:    string;
  background?:          Background;
}

// Navy and gold are fixed editorial colours; light variants adapt to the active theme
const outerBgMap: Record<Background, string> = {
  white:   "var(--bg-page)",   // was #FFFFFF
  cream:   "var(--bg-page)",   // was #F4EFE6
  surface: "var(--bg-page)",   // was #F4F6FA
  navy:    "#041124",
  gold:    "#D4B949",
};

const cardBgMap: Record<Background, string> = {
  white:   "#041124",
  cream:   "#041124",
  surface: "#041124",
  navy:    "#041124",
  gold:    "#041124",
};

export function CTABanner({
  eyebrow             = "2025–26 Season",
  headline            = "REGISTER YOUR CLUB",
  headlineAccent      = "BEFORE APRIL 30",
  description         = "Applications for the 2025–26 CPSL Premiership and Development League are now open. Secure your spot for next season before the deadline closes.",
  primaryCtaLabel     = "Apply Now",
  primaryCtaHref      = "#",
  showSecondaryButton = false,
  secondaryCtaLabel   = "Learn More",
  secondaryCtaHref    = "#",
  background          = "cream",
}: CTABannerProps) {
  const outerBg = outerBgMap[background] ?? outerBgMap.cream;
  const cardBg  = cardBgMap[background]  ?? cardBgMap.cream;

  const showPattern = false; // TODO: re-enable when ready — background !== "gold"

  return (
    <section style={{ backgroundColor: outerBg, padding: "64px 24px", position: "relative", overflow: "hidden" }}>
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
      <div
        className="mx-auto max-w-7xl rounded-2xl overflow-hidden border"
        style={{ background: cardBg, borderColor: "#1E2D45", position: "relative", zIndex: 1 }}
      >
        <div className="px-6 py-10 md:px-16 md:py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

          {/* Left — copy */}
          <div>
            {eyebrow && (
              <div style={{ color: "#E74552", fontSize: "10px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px" }}>
                {eyebrow}
              </div>
            )}
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(28px, 5vw, 56px)", fontWeight: 800, color: "#F4EFE6", lineHeight: 0.95, letterSpacing: "-1.5px", marginBottom: "16px", textTransform: "uppercase" }}>
              {headline}
              {headlineAccent && (
                <><br /><span style={{ color: "#D4B949" }}>{headlineAccent}</span></>
              )}
            </h2>
            {description && (
              <p style={{ color: "#64748B", fontSize: "14px", lineHeight: 1.65, maxWidth: "520px" }}>
                {description}
              </p>
            )}
          </div>

          {/* Right — CTAs */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto shrink-0">
            <a
              href={primaryCtaHref}
              style={{
                display: "inline-block",
                background: "#D4B949",
                color: "#041124",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                padding: "14px 32px",
                textDecoration: "none",
                textAlign: "center",
                minWidth: "180px",
              }}
            >
              {primaryCtaLabel}
            </a>

            {showSecondaryButton && (
              <a
                href={secondaryCtaHref}
                style={{
                  display: "inline-block",
                  background: "transparent",
                  color: "#D4B949",
                  border: "2px solid #D4B949",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  padding: "12px 32px",
                  textDecoration: "none",
                  textAlign: "center",
                  minWidth: "180px",
                }}
              >
                {secondaryCtaLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

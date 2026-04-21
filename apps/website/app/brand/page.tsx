import Image from "next/image";
import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/client";

export const metadata: Metadata = {
  title: "Brand — Carolina Premier Soccer League",
  description: "Official brand guidelines, logo downloads, and design system for the Carolina Premier Soccer League.",
};

// ─── Types ────────────────────────────────────────────────────────────────────
type Spec        = { label: string; value: string; hex?: string };
type SanityFile  = { asset?: { url?: string } };
type ColorSwatch = { name: string; role: string; hex: string; rgb: string; textColor: string };

type SanityLockup = {
  label:        string;
  assetFile?:   SanityFile;
  invertImage:  boolean;
  bgVariant:    "dark" | "charcoal" | "gold";
  displayStyle: "lockup" | "crest";
};

type SanityAsset = {
  label: string; format: string; note: string; size: string; file?: SanityFile;
};

// Flat section type — only the fields relevant to each _type will be populated
type BrandSection = {
  _type: string;
  _key:  string;
  // Hero
  tagline?: string; year?: string; line1?: string; line2?: string; line3?: string; description?: string;
  // Primary Mark (also 'heading' reused across section types)
  heading?: string; body?: string; markImage?: SanityFile; markDownload?: SanityFile; specs?: Spec[];
  // Full Bleed Image
  image?: SanityFile; imageFit?: "cover" | "contain" | "tile"; panelBg?: string; imageDownload?: SanityFile;
  // Logo Suite
  lockups?: SanityLockup[]; usageDonts?: string[];
  // Color System
  colors?: ColorSwatch[];
  // Shared
  sectionTitle?: string;
  // Typography
  displayName?: string; displayWeights?: string; displaySample?: string; bodyName?: string; bodyWeights?: string; bodySample?: string;
  // Downloads
  assets?: SanityAsset[];
};

type BrandPageData = {
  sections?:       BrandSection[];
  footerName?:     string;
  footerCopyright?: string;
};

// ─── Fallback /public paths ───────────────────────────────────────────────────
const FB = {
  crest:      "/crest-blue.svg",
  horizontal: "/cpsl-horizontal.svg",
  pattern:    "/brand-pattern.svg",
  grid:       "/grid.svg",
};

// ─── Default sections (rendered when Sanity has no data yet) ──────────────────
const DEFAULT_SECTIONS: BrandSection[] = [
  {
    _type: "brandHero", _key: "d-hero",
    tagline: "BRAND SYSTEM", year: "2026 Edition",
    line1: "CAROLINA", line2: "PREMIER", line3: "SOCCER",
    description: "Official brand guidelines for the\nCarolina Premier Soccer League —\nNC & SC.",
  },
  {
    _type: "brandPrimaryMark", _key: "d-mark",
    heading: "THE CREST",
    body: "The primary mark. A shield anchored by the NC/SC diagonal border — the defining line that gives CPSL its identity. Always maintain the crest's protected clearspace equal to the width of the shield icon.",
    specs: [
      { label: "Min. size print",   value: "25mm" },
      { label: "Min. size digital", value: "48px" },
      { label: "Clear space",       value: "1× icon width" },
      { label: "Preferred bg",      value: "#041124" },
    ],
  },
  {
    _type: "brandFullBleedImage", _key: "d-grid",
    heading: "GRID SYSTEM",
    body: "The underlying grid that structures all CPSL design layouts. A consistent spatial framework built on an 8px baseline grid, ensuring visual harmony across print and digital applications.",
    image: { asset: { url: FB.grid } },
    imageFit: "tile",
    panelBg: "#041124",
    specs: [
      { label: "Base unit",    value: "8px" },
      { label: "Tile size",    value: "180 × 140px" },
      { label: "Column gutter", value: "24px" },
      { label: "Margin",       value: "48px", hex: "#D4B949" },
    ],
  },
  {
    _type: "brandLogoSuite", _key: "d-logos",
    heading: "LOCKUPS & MARKS",
    lockups: [
      { label: "Horizontal — Dark",  assetFile: { asset: { url: FB.horizontal } }, invertImage: false, bgVariant: "dark",  displayStyle: "lockup" },
      { label: "Horizontal — Gold",  assetFile: { asset: { url: FB.horizontal } }, invertImage: true,  bgVariant: "gold",  displayStyle: "lockup" },
      { label: "Crest — Standalone", assetFile: { asset: { url: FB.crest      } }, invertImage: false, bgVariant: "charcoal", displayStyle: "crest"  },
    ],
    usageDonts: [
      "Don't recolor the crest",
      "Don't stretch or distort",
      "Don't use on busy photography",
      "Don't place on low-contrast backgrounds",
    ],
  },
  {
    _type: "brandColorSystem", _key: "d-colors",
    heading: "THE PALETTE",
    colors: [
      { name: "Deep Navy",         role: "Primary Background",    hex: "#041124", rgb: "9 / 22 / 40",     textColor: "#D4B949" },
      { name: "Charcoal",          role: "Card / UI Surface",     hex: "#131B2D", rgb: "19 / 27 / 45",    textColor: "#D4B949" },
      { name: "Championship Gold", role: "Brand Accent",          hex: "#D4B949", rgb: "212 / 185 / 73",  textColor: "#041124" },
      { name: "Crimson",           role: "Alert / Competition",   hex: "#BF1D2D", rgb: "191 / 29 / 45",   textColor: "#F4EFE6" },
      { name: "Primary Blue",      role: "Interactive",           hex: "#3B82F6", rgb: "59 / 130 / 246",  textColor: "#F4EFE6" },
      { name: "Purple",            role: "Badge / Highlight",     hex: "#7C3AEC", rgb: "124 / 58 / 236",  textColor: "#F4EFE6" },
      { name: "Warm White",        role: "Print / Light Surface", hex: "#F4EFE6", rgb: "244 / 239 / 230", textColor: "#041124" },
      { name: "Slate",             role: "Body Copy",             hex: "#64748B", rgb: "100 / 116 / 139", textColor: "#F4EFE6" },
    ],
  },
  {
    _type: "brandTypography", _key: "d-type",
    displayName:    "Barlow Condensed",
    displayWeights: "Black 900 · Bold 700 · SemiBold 600",
    bodyName:       "Inter",
    bodyWeights:    "Light 300 · Regular 400 · Medium 500",
    bodySample:     "The Carolina Premier Soccer League was formed in 2026 by leading clubs seeking a competitive platform that reflects the evolving needs of the modern soccer club.",
  },
  {
    _type: "brandDownloads", _key: "d-downloads",
    heading: "BRAND ASSETS",
    assets: [
      { label: "Primary Crest",     format: "SVG", size: "Vector",         note: "Full colour on dark", file: { asset: { url: FB.crest      } } },
      { label: "Horizontal Lockup", format: "SVG", size: "Vector",         note: "Wordmark + crest",    file: { asset: { url: FB.horizontal } } },
      { label: "Brand Pattern",     format: "SVG", size: "180 × 140 tile", note: "Repeating tile",      file: { asset: { url: FB.pattern    } } },
    ],
  },
];

// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
  navy:  "#041124",
  charcoal: "#131B2D",
  navy3: "#1E2D45",
  gold:  "#D4B949",
  crimson: "#BF1D2D",
  white:   "#F4EFE6",
  gray:    "#64748B",
};

const display: React.CSSProperties = {
  fontFamily: "'Barlow Condensed', sans-serif",
  textTransform: "uppercase" as const,
  letterSpacing: "-0.02em",
};
const body: React.CSSProperties = { fontFamily: "'Inter', sans-serif" };

// Ensure hex values always have a leading # so CSS recognises them
const hex = (v: string | undefined) => {
  if (!v) return "transparent";
  return v.startsWith("#") ? v : `#${v}`;
};

const bgVariantMap: Record<string, string> = {
  dark:  T.navy,
  charcoal: T.charcoal,
  gold:  T.gold,
};

// ─── Shared sub-components ────────────────────────────────────────────────────
function SectionTag({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <span style={{ ...display, fontSize: "11px", fontWeight: 700, color: T.gold, letterSpacing: "0.18em" }}>{number}</span>
      <div className="flex-1 h-px" style={{ background: T.navy3 }} />
      <span style={{ ...display, fontSize: "11px", fontWeight: 700, color: T.gray, letterSpacing: "0.18em" }}>{label}</span>
    </div>
  );
}

// Parse "01 — Primary Mark" → { number: "01", label: "PRIMARY MARK" }
function parseSectionTitle(raw: string | undefined, defaultNum: string, defaultLabel: string) {
  if (!raw) return { number: defaultNum, label: defaultLabel };
  const parts = raw.split(/\s*[—–-]+\s*/);
  if (parts.length >= 2) {
    return { number: parts[0].trim(), label: parts.slice(1).join(" — ").trim().toUpperCase() };
  }
  return { number: defaultNum, label: raw.toUpperCase() };
}

function DownloadBtn({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href} download
      className="inline-flex items-center gap-2 text-xs uppercase tracking-widest"
      style={{ ...body, border: `1px solid ${T.navy3}`, color: T.white, padding: "10px 16px", textDecoration: "none", fontWeight: 500 }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 1v7M3 6l3 3 3-3M1 10h10" stroke={T.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      {label}
    </a>
  );
}

// ─── Section renderers ────────────────────────────────────────────────────────
function RenderHero({ s, heroMarkUrl }: { s: BrandSection; heroMarkUrl: string }) {
  return (
    <section
      className="relative flex flex-col justify-end overflow-hidden px-6 md:px-12 pt-32 pb-16"
      style={{ minHeight: "100vh", borderBottom: `1px solid ${T.navy3}` }}
    >
      <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[110vw] sm:w-[78vw] max-w-5xl pointer-events-none" style={{ opacity: 0.07 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={heroMarkUrl} alt="" className="w-full h-auto" />
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: T.gold }} />
      <div className="absolute top-10 left-6 right-6 md:left-12 md:right-12 flex justify-between items-center">
        <span style={{ ...display, fontSize: "11px", fontWeight: 700, color: T.gold, letterSpacing: "0.2em" }}>
          CPSL — {s.tagline ?? "BRAND SYSTEM"}
        </span>
        <span style={{ ...body, fontSize: "11px", color: T.gray }}>{s.year ?? "2026 Edition"}</span>
      </div>
      <svg className="absolute bottom-24 left-6 md:left-12 opacity-15" width="320" height="60" viewBox="0 0 320 60" fill="none">
        <path d="M0 48 L300 4"   stroke={T.gold} strokeWidth="1.5"/>
        <path d="M30 60 L310 16" stroke={T.gold} strokeWidth="1" opacity="0.6"/>
        <path d="M60 60 L320 28" stroke={T.gold} strokeWidth="0.75" opacity="0.4"/>
      </svg>
      <div className="relative">
        <div className="mb-6" style={{ ...display, fontSize: "clamp(64px, 13vw, 200px)", fontWeight: 900, lineHeight: 0.88, color: T.white }}>
          {s.line1 ?? "CAROLINA"}<br />
          <span style={{ color: T.gold }}>{s.line2 ?? "PREMIER"}</span><br />
          {s.line3 ?? "SOCCER"}
        </div>
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div style={{ ...display, fontSize: "clamp(16px, 3vw, 36px)", fontWeight: 400, color: T.gray, letterSpacing: "0.25em" }}>
            LEAGUE
          </div>
          <p className="text-right text-sm leading-relaxed max-w-xs" style={{ color: T.gray }}>
            {(s.description ?? "").split("\n").map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}

function RenderPrimaryMark({ s }: { s: BrandSection }) {
  const markImageUrl    = s.markImage?.asset?.url    ?? FB.crest;
  const markDownloadUrl = s.markDownload?.asset?.url ?? markImageUrl;
  const specs = s.specs ?? [];
  return (
    <section style={{ borderBottom: `1px solid ${T.navy3}` }}>
      <div className="grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: "70vh" }}>
        <div className="flex items-center justify-center p-16 lg:p-20" style={{ background: T.charcoal, borderBottom: `1px solid ${T.navy3}` }}>
          <Image
            src={markImageUrl} alt="CPSL Primary Crest"
            width={320} height={390} unoptimized
            className="w-full max-w-[260px] lg:max-w-[320px] h-auto"
          />
        </div>
        <div className="flex flex-col justify-center px-8 py-16 md:px-16">
          <SectionTag {...parseSectionTitle(s.sectionTitle, "01", "PRIMARY MARK")} />
          <h2 className="mb-8" style={{ ...display, fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 900, lineHeight: 0.92 }}>
            {(s.heading ?? "THE CREST").split(" ").map((word, i, arr) => (
              <span key={i}>{word}{i < arr.length - 1 && <br />}</span>
            ))}
          </h2>
          <p className="text-sm leading-loose mb-12 max-w-md" style={{ color: T.gray }}>{s.body}</p>
          {specs.length > 0 && (
            <div className="grid grid-cols-2 gap-5 py-5 mb-10" style={{ borderTop: `1px solid ${T.navy3}`, borderBottom: `1px solid ${T.navy3}` }}>
              {specs.map(sp => (
                <div key={sp.label} className="rounded-sm p-3" style={{ background: sp.hex ?? "transparent" }}>
                  <div className="text-xs uppercase tracking-widest mb-1" style={{ color: sp.hex ? T.navy : T.gray }}>{sp.label}</div>
                  <div style={{ ...display, fontSize: "16px", fontWeight: 700, color: sp.hex ? T.navy : T.white }}>{sp.value}</div>
                </div>
              ))}
            </div>
          )}
          <div className="flex flex-wrap gap-3">
            <DownloadBtn href={markDownloadUrl} label="Download SVG" />
          </div>
        </div>
      </div>
    </section>
  );
}

function RenderFullBleedImage({ s }: { s: BrandSection }) {
  const imageUrl    = s.image?.asset?.url    ?? "";
  const downloadUrl = s.imageDownload?.asset?.url ?? imageUrl;
  const fit         = s.imageFit ?? "cover";
  const panelBg     = s.panelBg  ?? T.navy;
  const specs       = s.specs    ?? [];

  return (
    <section style={{ borderBottom: `1px solid ${T.navy3}` }}>
      <div className="grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: "70vh" }}>

        {/* ── Left: image panel — 64px padding creates the frame ─────── */}
        <div
          className="lg:order-first"
          style={{ minHeight: "400px", padding: "64px", display: "flex", alignItems: "stretch" }}
        >
          {/* Inner div fills content area (inside the padding) */}
          {fit === "tile" && (
            <div style={{ flex: 1, backgroundColor: panelBg, backgroundImage: imageUrl ? `url(${imageUrl})` : "none", backgroundRepeat: "repeat", backgroundSize: "auto" }} />
          )}
          {fit === "cover" && (
            <div style={{ flex: 1, backgroundColor: panelBg, backgroundImage: imageUrl ? `url(${imageUrl})` : "none", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }} />
          )}
          {fit === "contain" && (
            <div style={{ flex: 1, backgroundColor: panelBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imageUrl} alt="" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block" }} />
              )}
            </div>
          )}
        </div>

        {/* ── Right: text / specs ────────────────────────────────────── */}
        <div className="flex flex-col justify-center px-8 py-16 md:px-16">
          <SectionTag {...parseSectionTitle(s.sectionTitle, "—", "FULL BLEED IMAGE")} />
          {s.heading && (
            <h2 className="mb-8" style={{ ...display, fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 900, lineHeight: 0.92 }}>
              {s.heading.split(" ").map((word, i, arr) => (
                <span key={i}>{word}{i < arr.length - 1 && <br />}</span>
              ))}
            </h2>
          )}
          {s.body && (
            <p className="text-sm leading-loose mb-12 max-w-md" style={{ color: T.gray }}>{s.body}</p>
          )}
          {specs.length > 0 && (
            <div className="grid grid-cols-2 gap-5 py-5 mb-10" style={{ borderTop: `1px solid ${T.navy3}`, borderBottom: `1px solid ${T.navy3}` }}>
              {specs.map(sp => (
                <div key={sp.label} className="rounded-sm p-3" style={{ background: sp.hex ?? "transparent" }}>
                  <div className="text-xs uppercase tracking-widest mb-1" style={{ color: sp.hex ? T.navy : T.gray }}>{sp.label}</div>
                  <div style={{ ...display, fontSize: "16px", fontWeight: 700, color: sp.hex ? T.navy : T.white }}>{sp.value}</div>
                </div>
              ))}
            </div>
          )}
          {downloadUrl && (
            <div className="flex flex-wrap gap-3">
              <DownloadBtn href={downloadUrl} label="Download" />
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

function RenderLogoSuite({ s }: { s: BrandSection }) {
  const lockups  = s.lockups  ?? [];
  const donts    = s.usageDonts ?? [];
  return (
    <section className="px-6 md:px-12 py-16 md:py-20" style={{ borderBottom: `1px solid ${T.navy3}` }}>
      <SectionTag {...parseSectionTitle(s.sectionTitle, "02", "LOGO SUITE")} />
      <h2 className="mb-14" style={{ ...display, fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 900, lineHeight: 0.92 }}>
        {s.heading ?? "LOCKUPS & MARKS"}
      </h2>
      {lockups.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ background: T.navy3 }}>
          {lockups.map((lk) => {
            const bg      = bgVariantMap[lk.bgVariant] ?? T.navy;
            const isGold  = lk.bgVariant === "gold";
            const isCrest = lk.displayStyle === "crest";
            const imgUrl  = lk.assetFile?.asset?.url ?? FB.horizontal;
            return (
              <div key={lk.label} className="flex flex-col gap-10 p-10 md:p-14" style={{ background: bg }}>
                <div className="flex-1 flex items-center justify-center" style={{ minHeight: "140px" }}>
                  <Image
                    src={imgUrl} alt={lk.label}
                    width={isCrest ? 100 : 280} height={isCrest ? 122 : 80}
                    unoptimized className="h-auto"
                    style={{
                      width: isCrest ? "min(100px, 40%)" : "min(260px, 85%)",
                      filter: lk.invertImage ? "brightness(0)" : undefined,
                    }}
                  />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest mb-3" style={{ color: isGold ? T.navy : T.gray, opacity: isGold ? 0.6 : 1 }}>
                    {lk.label}
                  </div>
                  <DownloadBtn href={imgUrl} label="SVG" />
                </div>
              </div>
            );
          })}
        </div>
      )}
      {donts.length > 0 && (
        <div className="flex flex-wrap gap-6 md:gap-12 pt-8 mt-6" style={{ borderTop: `1px solid ${T.navy3}` }}>
          {donts.map(rule => (
            <div key={rule} className="flex items-center gap-2">
              <span className="text-xs font-bold" style={{ color: T.crimson }}>✕</span>
              <span className="text-xs" style={{ color: T.gray }}>{rule}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function RenderColorSystem({ s }: { s: BrandSection }) {
  const colors = s.colors ?? [];
  return (
    <section className="px-6 md:px-12 py-16 md:py-20" style={{ borderBottom: `1px solid ${T.navy3}` }}>
      <SectionTag {...parseSectionTitle(s.sectionTitle, "03", "COLOR SYSTEM")} />
      <h2 className="mb-14" style={{ ...display, fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 900, lineHeight: 0.92 }}>
        {s.heading ?? "THE PALETTE"}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {colors.map(c => (
          <div key={c.hex} style={{ border: `1px solid ${T.navy3}`, overflow: "hidden" }}>
            {/* ── Colour swatch ── */}
            <div style={{ height: 96, background: hex(c.hex) }} />
            {/* ── Info panel ── */}
            <div style={{ background: T.charcoal, padding: "14px 16px" }}>
              <div style={{ ...display, fontSize: 13, fontWeight: 800, color: T.white, marginBottom: 2 }}>
                {c.name ?? "—"}
              </div>
              <div style={{ fontSize: 11, color: T.gray, marginBottom: 10 }}>{c.role}</div>
              <div style={{ ...display, fontSize: 15, fontWeight: 700, color: T.gold, letterSpacing: "0.06em" }}>
                {hex(c.hex)}
              </div>
              {c.rgb && (
                <div style={{ fontSize: 10, color: T.gray, marginTop: 2, letterSpacing: "0.04em" }}>
                  RGB {c.rgb}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function RenderTypography({ s }: { s: BrandSection }) {
  return (
    <section style={{ borderBottom: `1px solid ${T.navy3}` }}>
      <div className="px-6 md:px-12 pt-16 md:pt-20 overflow-hidden" style={{ borderBottom: `1px solid ${T.navy3}` }}>
        <SectionTag {...parseSectionTitle(s.sectionTitle, "04", "TYPOGRAPHY")} />
        <div style={{ ...display, fontSize: "clamp(100px, 20vw, 280px)", fontWeight: 900, lineHeight: 0.85, color: T.white }}>{s.displaySample ?? "Aa"}</div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2" style={{ borderBottom: `1px solid ${T.navy3}` }}>
        <div className="px-6 md:px-12 py-14" style={{ borderBottom: `1px solid ${T.navy3}` }}>
          <div className="text-xs uppercase tracking-widest mb-6" style={{ color: T.gold }}>Display / Headline</div>
          <div className="mb-2 leading-none" style={{ ...display, fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 900, color: T.white }}>
            {s.displayName ?? "Barlow Condensed"}
          </div>
          <div className="mb-10" style={{ ...display, fontSize: "18px", fontWeight: 400, color: T.gray }}>
            {s.displayWeights ?? "Black 900 · Bold 700 · SemiBold 600"}
          </div>
          <div className="flex flex-col gap-3">
            {[
              { weight: 900, label: "900 Black",    sample: "MATCH DAY"          },
              { weight: 700, label: "700 Bold",     sample: "Conference Play"     },
              { weight: 600, label: "600 SemiBold", sample: "STANDINGS · RESULTS" },
            ].map(w => (
              <div key={w.weight} className="flex items-baseline gap-4 pb-3" style={{ borderBottom: `1px solid ${T.navy3}` }}>
                <span className="text-xs w-20 shrink-0" style={{ color: T.gray }}>{w.label}</span>
                <span style={{ ...display, fontSize: "24px", fontWeight: w.weight, color: T.white }}>{w.sample}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="px-6 md:px-12 py-14">
          <div className="text-xs uppercase tracking-widest mb-6" style={{ color: T.gold }}>Body / UI</div>
          <div className="mb-2 leading-none text-5xl font-bold" style={{ fontFamily: "'Inter', sans-serif", color: T.white }}>
            {s.bodyName ?? "Inter"}
          </div>
          <div className="mb-10 text-lg font-light" style={{ fontFamily: "'Inter', sans-serif", color: T.gray }}>
            {s.bodyWeights ?? "Light 300 · Regular 400 · Medium 500"}
          </div>
          <p className="text-sm leading-loose mb-8" style={{ color: T.gray }}>{s.bodySample}</p>
          <div className="flex flex-col gap-3">
            {[
              { size: "15px", weight: 400, label: "15 / 400 — Body"    },
              { size: "13px", weight: 400, label: "13 / 400 — Caption" },
              { size: "11px", weight: 500, label: "11 / 500 — Label"   },
            ].map(sz => (
              <div key={sz.label} className="flex items-center gap-4 pb-3" style={{ borderBottom: `1px solid ${T.navy3}` }}>
                <span className="flex-1" style={{ fontFamily: "'Inter', sans-serif", fontSize: sz.size, fontWeight: sz.weight, color: T.white }}>
                  The quick brown fox
                </span>
                <span className="text-xs shrink-0" style={{ color: T.gray }}>{sz.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="px-6 md:px-12 py-8">
        <div style={{ ...display, fontSize: "clamp(12px, 1.6vw, 20px)", fontWeight: 700, color: T.navy3, letterSpacing: "0.15em", lineHeight: 1.6 }}>
          ABCDEFGHIJKLMNOPQRSTUVWXYZ
        </div>
        <div style={{ ...display, fontSize: "clamp(12px, 1.6vw, 20px)", fontWeight: 700, color: T.gold, letterSpacing: "0.15em", lineHeight: 1.6 }}>
          abcdefghijklmnopqrstuvwxyz 0123456789
        </div>
        <div style={{ ...display, fontSize: "clamp(12px, 1.6vw, 20px)", fontWeight: 700, color: T.navy3, letterSpacing: "0.15em", lineHeight: 1.6 }}>
          !@#$%&amp;*()–—.,/:;?
        </div>
      </div>
    </section>
  );
}

function RenderDownloads({ s }: { s: BrandSection }) {
  const assets = (s.assets ?? [])
    .map(a => ({ ...a, url: a.file?.asset?.url ?? "" }))
    .filter(a => a.url);
  return (
    <section className="px-6 md:px-12 py-16 md:py-20" style={{ borderBottom: `1px solid ${T.navy3}` }}>
      <SectionTag {...parseSectionTitle(s.sectionTitle, "05", "ASSET DOWNLOADS")} />
      <h2 className="mb-14" style={{ ...display, fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 900, lineHeight: 0.92 }}>
        {s.heading ?? "BRAND ASSETS"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: T.navy3 }}>
        {assets.map(a => (
          <div key={a.label} className="flex flex-col gap-8 p-8 md:p-10" style={{ background: T.navy }}>
            <div>
              <div className="mb-3" style={{ ...display, fontSize: "13px", fontWeight: 700, color: T.gold, letterSpacing: "0.18em" }}>
                {a.format}
              </div>
              <div className="mb-2" style={{ ...display, fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 900, color: T.white, lineHeight: 1 }}>
                {a.label.toUpperCase()}
              </div>
              <div className="text-xs" style={{ color: T.gray }}>{a.note} · {a.size}</div>
            </div>
            <a
              href={a.url} download
              className="inline-flex items-center justify-between font-bold text-sm uppercase tracking-wide"
              style={{ ...display, background: T.gold, color: T.navy, padding: "16px 24px", textDecoration: "none", fontWeight: 800 }}
            >
              DOWNLOAD
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2v9M4 8l4 4 4-4M2 13h12" stroke={T.navy} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function BrandPage() {
  const raw = await sanityFetch<BrandPageData>(
    `*[_type == "brandPage" && _id == "brandPage"][0]{
      footerName, footerCopyright,
      sections[] {
        _key, _type,
        tagline, year, line1, line2, line3, description,
        heading, body,
        markImage     { asset->{ url } },
        markDownload  { asset->{ url } },
        specs[]       { label, value, hex },
        image         { asset->{ url } },
        imageDownload { asset->{ url } },
        imageFit, panelBg,
        lockups[]    { label, invertImage, bgVariant, displayStyle, assetFile { asset->{ url } } },
        usageDonts,
        colors[]     { name, role, hex, rgb, textColor },
        sectionTitle,
        displayName, displayWeights, displaySample, bodyName, bodyWeights, bodySample,
        assets[]     { label, format, note, size, file { asset->{ url } } }
      }
    }`
  );

  const sections = raw?.sections?.length ? raw.sections : DEFAULT_SECTIONS;

  // The hero ghost mark uses the first Primary Mark section's image (if any)
  const firstMark  = sections.find(s => s._type === "brandPrimaryMark");
  const heroMarkUrl = firstMark?.markImage?.asset?.url ?? FB.crest;

  return (
    <div style={{ background: T.navy, color: T.white, ...body }}>

      {sections.map((s) => {
        switch (s._type) {
          case "brandHero":
            return <RenderHero        key={s._key} s={s} heroMarkUrl={heroMarkUrl} />;
          case "brandPrimaryMark":
            return <RenderPrimaryMark    key={s._key} s={s} />;
          case "brandFullBleedImage":
            return <RenderFullBleedImage key={s._key} s={s} />;
          case "brandLogoSuite":
            return <RenderLogoSuite   key={s._key} s={s} />;
          case "brandColorSystem":
            return <RenderColorSystem key={s._key} s={s} />;
          case "brandTypography":
            return <RenderTypography  key={s._key} s={s} />;
          case "brandDownloads":
            return <RenderDownloads   key={s._key} s={s} />;
          default:
            return null;
        }
      })}

      {/* ── Footer (always at bottom) ──────────────────────────────────────── */}
      <footer className="flex flex-wrap justify-between items-center gap-4 px-6 md:px-12 py-8">
        <span style={{ ...display, fontSize: "11px", fontWeight: 700, color: T.gold, letterSpacing: "0.2em" }}>
          {raw?.footerName ?? "CPSL — CAROLINA PREMIER SOCCER LEAGUE"}
        </span>
        <span className="text-xs" style={{ color: T.gray }}>
          {raw?.footerCopyright ?? "© 2026 · Brand System v1.0"}
        </span>
      </footer>

    </div>
  );
}

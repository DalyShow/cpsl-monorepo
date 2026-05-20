import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { sanityFetch } from "@/lib/sanity/client";
import { DraftPreviewBanner } from "@/components/DraftPreviewBanner";

// Opts the page into the device's safe area — lets the hero background
// render behind iOS Safari's top URL bar and bottom tab bar. Pair with
// env(safe-area-inset-*) on any interactive content so it stays tappable.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#041124",
};

const barlowCondensed = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

type SiteSettings = {
  siteName?:        string;
  siteDescription?: string;
  ogImage?:         { asset?: { url?: string }; alt?: string };
};

export async function generateMetadata(): Promise<Metadata> {
  let settings: SiteSettings | null = null;
  try {
    settings = await sanityFetch<SiteSettings>(
      `*[_type == "siteSettings"][0]{ siteName, siteDescription, ogImage{ ..., asset->{ url } } }`
    );
  } catch {
    // Sanity unavailable — use hardcoded defaults below
  }

  const title = settings?.siteName ?? "CPSL — Carolina Premier Soccer League";
  const description =
    settings?.siteDescription ??
    "The premier soccer league spanning North and South Carolina. Live scores, standings, match schedules, and team profiles.";

  const ogImageUrl = settings?.ogImage?.asset?.url;
  const ogImages   = ogImageUrl
    ? [{ url: ogImageUrl, width: 1200, height: 630, alt: settings?.ogImage?.alt ?? title }]
    : [];

  return {
    metadataBase: new URL("https://carolinapremiersoccerleague.com"),
    title,
    description,
    // Favicons are handled via file convention:
    //   app/favicon.ico → .ico fallback (all browsers)
    //   app/icon.svg    → SVG favicon (modern browsers, takes precedence)
    // No need to declare icons here — Next.js picks them up automatically.
    alternates: { canonical: "/" },
    openGraph: {
      title,
      description,
      type:   "website",
      url:    "/",
      images: ogImages,
    },
    twitter: {
      card:        ogImageUrl ? "summary_large_image" : "summary",
      title,
      description,
      images:      ogImages,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const isDraft = (await draftMode()).isEnabled;

  let settings: SiteSettings | null = null;
  try {
    settings = await sanityFetch<SiteSettings>(
      `*[_type == "siteSettings"][0]{ siteName, siteDescription, ogImage{ ..., asset->{ url } } }`
    );
  } catch { /* fall through to defaults */ }

  const orgJsonLd = {
    "@context":   "https://schema.org",
    "@type":      "SportsOrganization",
    name:         settings?.siteName ?? "Carolina Premier Soccer League",
    alternateName: "CPSL",
    url:          "https://carolinapremiersoccerleague.com",
    description:  settings?.siteDescription ?? undefined,
    sport:        "Soccer",
    logo:         settings?.ogImage?.asset?.url ?? undefined,
  };

  return (
    <html lang="en" data-theme="dark" className={`${barlowCondensed.variable} ${inter.variable}`}>
      <body className="antialiased">
        <DraftPreviewBanner />
        {children}
        {isDraft && <VisualEditing />}
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}

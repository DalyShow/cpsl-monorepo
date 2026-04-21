import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { sanityFetch } from "@/lib/sanity/client";

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
    title,
    description,
    // Favicons are handled via file convention:
    //   app/favicon.ico → .ico fallback (all browsers)
    //   app/icon.svg    → SVG favicon (modern browsers, takes precedence)
    // No need to declare icons here — Next.js picks them up automatically.
    openGraph: {
      title,
      description,
      type:   "website",
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" className={`${barlowCondensed.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}

import type { NextConfig } from "next";

const securityHeaders = [
  // HSTS — Vercel adds this on custom domains, but make it explicit.
  // 2 years, include subdomains, eligible for browser preload list.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Stop browsers from sniffing MIME types.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Allow same-origin iframes (Sanity Presentation tool), block cross-origin framing.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Don't leak full URLs (with query strings) to third parties.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable powerful APIs the site doesn't use.
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=()",
  },
];

const nextConfig: NextConfig = {
  transpilePackages: ["@cpsl/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async headers() {
    return [
      {
        // Apply to everything except /studio, which needs looser embedding rules.
        source: "/((?!studio).*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        // Original review URL — the guide now lives under League Standards.
        source: "/game-day-operations",
        destination: "/league-standards/game-day-operations",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

// Redeploy marker: nav-icons-2026-08-25

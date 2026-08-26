import type { Metadata } from "next";
import Link from "next/link";

/**
 * RFP landing — full-screen photo, headline, one-paragraph description
 * and a single "View RFP" CTA into the document page.
 *
 * Unlinked from nav + noindex: shared directly with prospective
 * proposers, not general site visitors.
 */
/** Revalidate hourly so layout-level nav edits in Sanity reach this
 *  otherwise-static page without a redeploy. */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Request for Proposal — Carolina Premier Soccer League",
  description:
    "CPSL is seeking a Tournament Operations and Team Travel Management partner for the 2026–27 season.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function RfpLandingPage() {
  return (
    <main
      className="rfp-landing"
      style={{
        position:       "relative",
        // Pull up behind the transparent logo ticker (67px: 30px section
        // padding + 37px tiles) so the photo extends under the crests at
        // every viewport. min-height then spans nav-bottom → viewport-bottom.
        marginTop:      "-67px",
        minHeight:      "calc(100svh - 80px)",
        display:        "flex",
        alignItems:     "center",
        overflow:       "hidden",
        background:     "#041124",
      }}
    >
      {/* ── Background photo + overlay ─────────────────────────── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/rfp/rfp-background.jpg"
        alt=""
        aria-hidden
        style={{
          position:   "absolute",
          inset:      0,
          width:      "100%",
          height:     "100%",
          objectFit:  "cover",
          objectPosition: "center 40%",
        }}
      />
      <div
        aria-hidden
        style={{
          position:   "absolute",
          inset:      0,
          background:
            "linear-gradient(to right, rgba(4,17,36,0.92) 0%, rgba(4,17,36,0.72) 45%, rgba(4,17,36,0.35) 100%)",
        }}
      />

      {/* ── Copy ───────────────────────────────────────────────── */}
      <div
        className="max-w-7xl mx-auto w-full px-4 sm:px-6"
        style={{ position: "relative", paddingTop: 64, paddingBottom: 64 }}
      >
        <div style={{ maxWidth: 640 }}>
          <div
            style={{
              fontFamily:     "'Barlow Condensed', sans-serif",
              fontWeight:     700,
              fontSize:       13,
              letterSpacing:  "0.28em",
              textTransform:  "uppercase",
              color:          "#D4B949",
              marginBottom:   16,
            }}
          >
            Request for Proposal
          </div>

          <h1
            style={{
              fontFamily:     "'Barlow Condensed', sans-serif",
              fontWeight:     900,
              fontSize:       "clamp(44px, 6.5vw, 76px)",
              lineHeight:     0.98,
              letterSpacing:  "0.02em",
              textTransform:  "uppercase",
              color:          "#F4EFE6",
              margin:         "0 0 24px",
            }}
          >
            Tournament Series &amp; Team Travel Management
          </h1>

          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize:   17,
              lineHeight: 1.65,
              color:      "#C8D2DF",
              margin:     "0 0 16px",
              maxWidth:   560,
            }}
          >
            {"CPSL is seeking a qualified partner to manage tournament operations and the official team travel & housing program for the 2026–27 season"}
            <span className="rfp-desc-dot">.</span>
            <span className="rfp-desc-tail">
              {" — five championship events, 380+ participating teams, and thousands of traveling families across North Carolina."}
            </span>
          </p>

          <p
            style={{
              fontFamily:     "'Barlow Condensed', sans-serif",
              fontWeight:     700,
              fontSize:       14,
              letterSpacing:  "0.14em",
              textTransform:  "uppercase",
              color:          "#7A9BAA",
              margin:         "0 0 36px",
            }}
          >
            Proposals due Friday, September 11, 2026 · 5:00 PM EST
          </p>

          <Link
            href="/rfp/tournament-travel-management"
            style={{
              display:        "inline-flex",
              alignItems:     "center",
              gap:            12,
              background:     "#D4B949",
              color:          "#041124",
              fontFamily:     "'Barlow Condensed', sans-serif",
              fontWeight:     700,
              fontSize:       15,
              letterSpacing:  "0.14em",
              textTransform:  "uppercase",
              padding:        "16px 32px",
              borderRadius:   6,
              textDecoration: "none",
            }}
          >
            View RFP
            <span aria-hidden style={{ fontSize: 18, lineHeight: 1 }}>→</span>
          </Link>
        </div>
      </div>

      {/* The hero pulls up behind the transparent ticker at every width
          (see main's marginTop) — raise the ticker so its crests paint
          over the photo. On mobile, pad the copy below the crest row and
          trim the description tail so the block stays compact. */}
      <style>{`
        .rfp-desc-dot { display: none; }
        div.pt-20 > section:first-child {
          position: relative;
          z-index: 2;
        }
        .rfp-landing > div {
          padding-top: 100px;
        }
        @media (max-width: 767px) {
          .rfp-landing > div {
            padding-top: 110px;
          }
          .rfp-desc-tail { display: none; }
          .rfp-desc-dot { display: inline; }
        }
      `}</style>
    </main>
  );
}

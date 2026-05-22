import { ApplicationForm } from "./ApplicationForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Apply to Join — CPSL",
  description:
    "Submit your club membership application to join the Carolina Premier Soccer League.",
};

export default async function ApplyPage() {
  return (
    <main>
        {/* ── Page header ───────────────────────────────────────────────── */}
        <div style={{
          background: "#041124",
          borderBottom: "1px solid #1E2D45",
          padding: "56px 40px 48px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Gold left accent bar */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 4,
            height: "100%",
            background: "#D4B949",
          }} />

          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <p style={{
              fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)",
              fontWeight: 700,
              fontSize: "11px",
              letterSpacing: "3px",
              color: "#E74552",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}>
              Membership Application
            </p>
            <h1 style={{
              fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)",
              fontWeight: 900,
              fontSize: "clamp(36px, 5vw, 56px)",
              color: "#F4EFE6",
              textTransform: "uppercase",
              lineHeight: 1,
              margin: "0 0 16px",
              letterSpacing: "-0.01em",
            }}>
              Apply to Join CPSL
            </h1>
            <p style={{
              fontFamily: "var(--font-body, Inter, sans-serif)",
              fontSize: "16px",
              color: "#94A3B8",
              lineHeight: 1.7,
              margin: 0,
              maxWidth: 560,
            }}>
              Complete the form below to apply for membership in the Carolina
              Premier Soccer League. Our team will review your application and
              reach out within 5–7 business days.
            </p>
          </div>
        </div>

        {/* ── Form section ──────────────────────────────────────────────── */}
        <div className="px-4 sm:px-10 py-12 sm:py-14 pb-20" style={{ background: "var(--bg-page)" }}>
          <div className="max-w-[720px] mx-auto">
            <ApplicationForm />
          </div>
        </div>
    </main>
  );
}

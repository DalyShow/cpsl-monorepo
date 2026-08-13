import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        background:   "#041124",
        minHeight:    "100vh",
        display:      "flex",
        flexDirection: "column",
        alignItems:   "center",
        justifyContent: "center",
        padding:      "40px 20px",
        textAlign:    "center",
      }}
    >
      <div
        style={{
          fontFamily:     "'Barlow Condensed', sans-serif",
          fontWeight:     700,
          fontSize:       11,
          letterSpacing:  "0.24em",
          textTransform:  "uppercase",
          color:          "#D4B949",
          marginBottom:   12,
        }}
      >
        Carolina Development League
      </div>
      <h1
        style={{
          fontFamily:     "'Barlow Condensed', sans-serif",
          fontWeight:     900,
          fontSize:       "clamp(48px, 8vw, 96px)",
          lineHeight:     0.95,
          letterSpacing:  "0.02em",
          textTransform:  "uppercase",
          color:          "#F4EFE6",
          margin:         "0 0 24px",
        }}
      >
        Fall 2026<br />Match Calendar
      </h1>
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize:   16,
          color:      "#94A3B8",
          maxWidth:   520,
          margin:     "0 0 32px",
        }}
      >
        Season runs Aug 29 – Dec 6. Pick a date to see that day&apos;s fixtures across every CDL age group.
      </p>
      <Link
        href="/calendar"
        style={{
          fontFamily:     "'Barlow Condensed', sans-serif",
          fontWeight:     700,
          fontSize:       14,
          letterSpacing:  "0.14em",
          textTransform:  "uppercase",
          color:          "#041124",
          background:     "#D4B949",
          padding:        "14px 28px",
          borderRadius:   6,
          textDecoration: "none",
          display:        "inline-flex",
          alignItems:     "center",
          gap:            10,
        }}
      >
        Open the Calendar
        <span aria-hidden>→</span>
      </Link>
    </main>
  );
}

interface SectionHeaderProps {
  title: string;
  badge?: string;
  subtitle?: string;
  variant?: "dark" | "light";
}

// Ghost shield SVG — decorative, low-opacity crest silhouette
function GhostShield({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 320 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ width: 320, height: 280, opacity: 0.06 }}
    >
      <polygon
        points="160,8 312,56 312,168 160,272 8,168 8,56"
        fill={color}
      />
    </svg>
  );
}

export function SectionHeader({ title, badge, subtitle, variant = "dark" }: SectionHeaderProps) {
  const dark = variant === "dark";

  const bg        = dark ? "#1A2438" : "#F4EFE6";
  const border    = dark ? "#1E2D45" : "#D9CEBF";
  const titleColor   = dark ? "#F4EFE6" : "#091628";
  const subtitleColor = dark ? "#8899B0" : "#64748B";
  const shieldColor  = dark ? "#FFFFFF" : "#091628";

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: bg,
        borderBottom: `1px solid ${border}`,
        overflow: "hidden",
      }}
    >
      {/* Ghost shield — right-aligned, vertically centred */}
      <div style={{
        position: "absolute",
        right: -20,
        top: "50%",
        transform: "translateY(-50%)",
        pointerEvents: "none",
        userSelect: "none",
      }}>
        <GhostShield color={shieldColor} />
      </div>

      {/* Content — matches TopNav container */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-9 flex flex-col justify-center">
        {/* Title + badge row */}
        <div className="flex items-baseline gap-4 flex-wrap">
          <h2
            className="text-4xl sm:text-5xl lg:text-[48px]"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: titleColor,
              lineHeight: 1,
              margin: 0,
            }}
          >
            {title}
          </h2>
          {badge && (
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 600,
                fontSize: "18px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#C9A74C",
                lineHeight: 1,
                whiteSpace: "nowrap",
              }}
            >
              {badge}
            </span>
          )}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: "13px",
              letterSpacing: "0.02em",
              color: subtitleColor,
              marginTop: 8,
              marginBottom: 0,
              lineHeight: "16px",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

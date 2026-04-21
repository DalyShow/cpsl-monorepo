import React from "react";

export interface EmptyStateProps {
  /** Icon node rendered in the colored tile */
  icon?: React.ReactNode;
  /** Background color of the icon tile */
  iconBg?: string;
  title: string;
  description: string;
  /** CTA button label */
  cta?: string;
  onCta?: () => void;
}

const DefaultIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="12" stroke="#697279" strokeWidth="2" />
    <path d="M9 14h10M14 9v10" stroke="#697279" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export function EmptyState({
  icon = <DefaultIcon />,
  iconBg = "#F2F4F5",
  title,
  description,
  cta,
  onCta,
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl p-12 border text-center" style={{ background: "white", borderColor: "#E2E8F0" }}>
      <div
        className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
        style={{ background: iconBg }}
      >
        {icon}
      </div>
      <h3 className="font-bold text-base mb-2" style={{ color: "#091628" }}>{title}</h3>
      <p className="text-sm mb-5" style={{ color: "#64748B", maxWidth: "280px", margin: "0 auto 20px" }}>
        {description}
      </p>
      {cta && (
        <button
          onClick={onCta}
          className="px-5 py-2.5 rounded-xl text-sm font-bold text-white"
          style={{ background: "#697279" }}
        >
          {cta}
        </button>
      )}
    </div>
  );
}

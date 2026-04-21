export interface ElevatedCardProps {
  label?: string;
  labelColor?: string;
  title: string;
  description: string;
  /** background color of the image placeholder */
  placeholderBg?: string;
}

export function ElevatedCard({
  label = "Elevated",
  labelColor = "#697279",
  title,
  description,
  placeholderBg = "#F2F4F5",
}: ElevatedCardProps) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "white",
        boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
        transform: "translateY(-3px)",
      }}
    >
      <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: labelColor }}>
        {label}
      </div>
      <div className="w-full h-28 rounded-xl mb-3" style={{ background: placeholderBg }} />
      <div className="font-bold text-sm mb-1" style={{ color: "#091628" }}>{title}</div>
      <div className="text-xs leading-relaxed" style={{ color: "#64748B" }}>{description}</div>
    </div>
  );
}

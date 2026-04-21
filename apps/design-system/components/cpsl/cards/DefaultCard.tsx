export interface DefaultCardProps {
  label?: string;
  title: string;
  description: string;
  /** background color of the image placeholder */
  placeholderBg?: string;
}

export function DefaultCard({
  label = "Default",
  title,
  description,
  placeholderBg = "#F4F6FA",
}: DefaultCardProps) {
  return (
    <div className="rounded-2xl p-5 border" style={{ background: "white", borderColor: "#E2E8F0" }}>
      <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: "#94A3B8" }}>
        {label}
      </div>
      <div className="w-full h-28 rounded-xl mb-3" style={{ background: placeholderBg }} />
      <div className="font-bold text-sm mb-1" style={{ color: "#091628" }}>{title}</div>
      <div className="text-xs leading-relaxed" style={{ color: "#64748B" }}>{description}</div>
    </div>
  );
}

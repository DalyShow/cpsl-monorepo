export interface HorizontalCardProps {
  label?: string;
  title: string;
  description: string;
  /** background color of the side thumbnail */
  thumbnailBg?: string;
  /** width of the thumbnail in pixels */
  thumbnailWidth?: number;
}

export function HorizontalCard({
  label = "Horizontal",
  title,
  description,
  thumbnailBg = "#F2F4F5",
  thumbnailWidth = 96,
}: HorizontalCardProps) {
  return (
    <div
      className="rounded-2xl border flex overflow-hidden"
      style={{ borderColor: "#E2E8F0", background: "white" }}
    >
      <div className="flex-shrink-0" style={{ width: thumbnailWidth, background: thumbnailBg }} />
      <div className="p-4">
        <div className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: "#94A3B8" }}>
          {label}
        </div>
        <div className="font-bold text-sm mb-1" style={{ color: "#091628" }}>{title}</div>
        <div className="text-xs leading-relaxed" style={{ color: "#64748B" }}>{description}</div>
      </div>
    </div>
  );
}

// Ported from CPSL Design System — components/cpsl/feedback/StatusBadge.tsx

export type BadgeVariant =
  | "live" | "win" | "postponed" | "loss" | "draw" | "cup" | "featured" | "new";

export interface StatusBadgeProps {
  label: string;
  variant?: BadgeVariant;
  bg?: string;
  color?: string;
  border?: string;
}

const BADGE_STYLES: Record<BadgeVariant, { bg: string; color: string; border: string }> = {
  live:      { bg: "#FFF0F0", color: "#FF1744", border: "#FFC5CC" },
  win:       { bg: "#E8FFF2", color: "#00875A", border: "#A7F3D0" },
  postponed: { bg: "#FFF3E0", color: "#E65100", border: "#FFCC80" },
  loss:      { bg: "#FFF0F0", color: "#FF1744", border: "#FFC5CC" },
  draw:      { bg: "#F4F6FA", color: "#475569", border: "#E2E8F0" },
  cup:       { bg: "#F5F0FF", color: "#8B40D4", border: "#DDD6FE" },
  featured:  { bg: "#F2F4F5", color: "#697279", border: "#C8CED2" },
  new:       { bg: "#F2F4F5", color: "#697279", border: "#C8CED2" },
};

export function StatusBadge({ label, variant, bg, color, border }: StatusBadgeProps) {
  const base = variant ? BADGE_STYLES[variant] : { bg: "#F4F6FA", color: "#475569", border: "#E2E8F0" };
  const s = { bg: bg ?? base.bg, color: color ?? base.color, border: border ?? base.border };

  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border"
      style={{ background: s.bg, color: s.color, borderColor: s.border }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
      {label}
    </span>
  );
}

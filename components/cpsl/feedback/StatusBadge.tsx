export type BadgeVariant =
  | "live"
  | "win"
  | "postponed"
  | "loss"
  | "draw"
  | "cup"
  | "featured"
  | "new";

export interface StatusBadgeProps {
  label: string;
  variant?: BadgeVariant;
  /** Override background (ignores variant) */
  bg?: string;
  /** Override text/dot color (ignores variant) */
  color?: string;
  /** Override border color (ignores variant) */
  border?: string;
}

const BADGE_STYLES: Record<BadgeVariant, { bg: string; color: string; border: string }> = {
  live:      { bg: "#FFF0F0", color: "#FF1744", border: "#FFC5CC" },
  win:       { bg: "#E8FFF2", color: "#00875A", border: "#A7F3D0" },
  postponed: { bg: "#FFF3E0", color: "#E65100", border: "#FFCC80" },
  loss:      { bg: "#FFF0F0", color: "#FF1744", border: "#FFC5CC" },
  draw:      { bg: "#F4F6FA", color: "#475569", border: "#E2E8F0" },
  cup:       { bg: "#FEF0F1", color: "#BF1D2D", border: "#FAB3B8" },
  featured:  { bg: "#F2F4F5", color: "#697279", border: "#C8CED2" },
  new:       { bg: "#F2F4F5", color: "#697279", border: "#C8CED2" },
};

export function StatusBadge({ label, variant, bg, color, border }: StatusBadgeProps) {
  const base = variant ? BADGE_STYLES[variant] : { bg: "#F4F6FA", color: "#475569", border: "#E2E8F0" };
  const styles = {
    bg:     bg     ?? base.bg,
    color:  color  ?? base.color,
    border: border ?? base.border,
  };

  return (
    <span
      className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border"
      style={{ background: styles.bg, color: styles.color, borderColor: styles.border }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: styles.color }}
      />
      {label}
    </span>
  );
}

export interface ProgressBarProps {
  label: string;
  /** 0–100 */
  value: number;
  color?: string;
  /** Background track color */
  trackColor?: string;
}

export function ProgressBar({
  label,
  value,
  color = "#697279",
  trackColor = "#E2E8F0",
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div>
      <div className="flex justify-between mb-1.5 text-xs font-medium" style={{ color: "#475569" }}>
        <span>{label}</span>
        <span style={{ color }}>{clamped}%</span>
      </div>
      <div className="h-2 rounded-full" style={{ background: trackColor }}>
        <div
          className="h-2 rounded-full transition-all"
          style={{ width: `${clamped}%`, background: color }}
        />
      </div>
    </div>
  );
}

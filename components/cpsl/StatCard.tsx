import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

export interface StatCardProps {
  label: string
  value: string | number
  /** Optional sub-label or comparison e.g. "+12 vs last season" */
  subLabel?: string
  /** Arrow direction for trend */
  trend?: "up" | "down" | "neutral"
  /** Icon node — use a Lucide icon or inline SVG */
  icon?: React.ReactNode
  /** Visual accent color — defaults to CPSL blue */
  accentColor?: string
  className?: string
}

/**
 * StatCard
 *
 * A hero stat display card used in dashboards and scoreboards.
 *
 * @example
 * <StatCard label="Goals Scored" value={48} subLabel="+8 vs last season" trend="up" />
 */
export function StatCard({
  label,
  value,
  subLabel,
  trend,
  icon,
  accentColor = "#697279",
  className,
}: StatCardProps) {
  const trendColor =
    trend === "up" ? "#00C853" : trend === "down" ? "#FF1744" : "#64748B"

  return (
    <Card
      data-slot="stat-card"
      className={cn("gap-0 py-0 overflow-hidden", className)}
    >
      {/* Accent bar */}
      <div className="h-1 w-full" style={{ backgroundColor: accentColor }} />

      <CardContent className="px-5 py-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1 flex-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {label}
            </span>
            <span
              className="text-4xl font-black leading-none tracking-tight"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {value}
            </span>
            {subLabel && (
              <div className="flex items-center gap-1 mt-1">
                {trend && trend !== "neutral" && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={trendColor}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {trend === "up" ? (
                      <path d="M18 15l-6-6-6 6" />
                    ) : (
                      <path d="M6 9l6 6 6-6" />
                    )}
                  </svg>
                )}
                <span className="text-xs" style={{ color: trendColor }}>
                  {subLabel}
                </span>
              </div>
            )}
          </div>

          {icon && (
            <div
              className="size-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${accentColor}18`, color: accentColor }}
            >
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

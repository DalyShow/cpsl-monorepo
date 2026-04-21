import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export type AvatarStatus = "online" | "away" | "offline" | "live"
export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl"

export interface CPSLAvatarProps {
  src?: string
  name: string
  status?: AvatarStatus
  size?: AvatarSize
  /** Show team role badge below avatar */
  role?: string
  className?: string
}

const sizeClasses: Record<AvatarSize, string> = {
  xs: "size-6 text-[9px]",
  sm: "size-8 text-[11px]",
  md: "size-10 text-xs",
  lg: "size-12 text-sm",
  xl: "size-16 text-base",
}

const statusDotSize: Record<AvatarSize, string> = {
  xs: "size-1.5",
  sm: "size-2",
  md: "size-2.5",
  lg: "size-3",
  xl: "size-3.5",
}

const statusColors: Record<AvatarStatus, string> = {
  online: "bg-[#00C853]",
  away: "bg-[#FFB300]",
  offline: "bg-[#94A3B8]",
  live: "bg-[#FF1744] animate-pulse",
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

/**
 * CPSLAvatar
 *
 * Extended avatar component with status indicator and size variants.
 * Built on top of shadcn's Avatar primitive.
 *
 * @example
 * <CPSLAvatar name="Marcus Johnson" status="online" size="lg" />
 * <CPSLAvatar src="/player.jpg" name="Jordan Smith" status="live" size="xl" role="GK" />
 */
export function CPSLAvatar({
  src,
  name,
  status,
  size = "md",
  role,
  className,
}: CPSLAvatarProps) {
  return (
    <div className={cn("relative inline-flex flex-col items-center gap-1", className)}>
      <div className="relative">
        <Avatar className={cn(sizeClasses[size])}>
          {src && <AvatarImage src={src} alt={name} />}
          <AvatarFallback className="bg-primary/10 text-primary font-semibold border border-primary/20">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>

        {status && (
          <span
            className={cn(
              "absolute bottom-0 right-0 rounded-full border-2 border-background",
              statusDotSize[size],
              statusColors[status]
            )}
          />
        )}
      </div>

      {role && (
        <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
          {role}
        </span>
      )}
    </div>
  )
}

// ── Avatar Group ─────────────────────────────────────────────────────────────

export interface AvatarGroupProps {
  avatars: Array<{ src?: string; name: string }>
  max?: number
  size?: AvatarSize
  className?: string
}

/**
 * AvatarGroup
 *
 * Stacked avatar group with overflow count.
 *
 * @example
 * <AvatarGroup avatars={teamMembers} max={5} size="sm" />
 */
export function AvatarGroup({
  avatars,
  max = 5,
  size = "sm",
  className,
}: AvatarGroupProps) {
  const visible = avatars.slice(0, max)
  const overflow = avatars.length - max

  return (
    <div className={cn("flex items-center", className)}>
      {visible.map((avatar, i) => (
        <div
          key={i}
          className={cn(
            sizeClasses[size],
            "rounded-full border-2 border-background overflow-hidden -ml-2 first:ml-0 relative"
          )}
          title={avatar.name}
        >
          <Avatar className={cn(sizeClasses[size])}>
            {avatar.src && <AvatarImage src={avatar.src} alt={avatar.name} />}
            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-[9px] border border-primary/20">
              {getInitials(avatar.name)}
            </AvatarFallback>
          </Avatar>
        </div>
      ))}

      {overflow > 0 && (
        <div
          className={cn(
            sizeClasses[size],
            "rounded-full border-2 border-background bg-secondary flex items-center justify-center -ml-2 shrink-0"
          )}
        >
          <span className="text-[9px] font-bold text-muted-foreground">+{overflow}</span>
        </div>
      )}
    </div>
  )
}

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border border-transparent px-2 py-0.5 text-xs font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none transition-[color,box-shadow] overflow-hidden tracking-wide uppercase",
  {
    variants: {
      variant: {
        // ── shadcn base ───────────────────────────────────────────────────────
        default:
          "bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "bg-destructive text-white [a&]:hover:bg-destructive/90",
        outline:
          "border-border text-foreground [a&]:hover:bg-secondary",
        ghost:
          "text-foreground [a&]:hover:bg-secondary",

        // ── CPSL semantic match status ───────────────────────────────────────
        /** Match result — WIN */
        win:
          "bg-[#00C853] text-white border-[#00A844]",
        /** Match result — LOSS */
        loss:
          "bg-[#FF1744] text-white border-[#D50000]",
        /** Match result — DRAW */
        draw:
          "bg-[#64748B] text-white border-[#475569]",
        /** Live match indicator */
        live:
          "bg-[#FF1744] text-white border-[#D50000] animate-pulse",
        /** Upcoming / scheduled */
        upcoming:
          "bg-[#F2F4F5] text-[#697279] border-[#C8CED2]",
        /** Postponed / cancelled */
        postponed:
          "bg-[#FFF8E1] text-[#B45309] border-[#FCD34D]",
        /** Confirmed / approved */
        confirmed:
          "bg-[#E8F5E9] text-[#15803D] border-[#86EFAC]",

        // ── CPSL position / rank ─────────────────────────────────────────────
        /** 1st place / top of table */
        gold:
          "bg-[#FFB300] text-[#78350F] border-[#F59E0B]",
        /** Promotion zone */
        promotion:
          "bg-[#697279] text-white border-[#505960]",
        /** Playoff zone */
        playoff:
          "bg-[#F2F4F5] text-[#697279] border-[#A7AFB5]",
        /** Relegation zone */
        relegation:
          "bg-[#FEF2F2] text-[#FF1744] border-[#FECACA]",

        // ── CPSL club tier / category ────────────────────────────────────────
        /** Premier tier */
        premier:
          "bg-[#697279] text-white border-[#505960]",
        /** Elite tier */
        elite:
          "bg-[#BF1D2D] text-white border-[#96161E]",
        /** Academy / development */
        academy:
          "bg-[#EEF1F7] text-[#334155] border-[#CBD5E1]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean
}

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }

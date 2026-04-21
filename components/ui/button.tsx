import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[6px] text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        // ── shadcn base variants (remapped to CPSL tokens) ──────────────────
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:border-ring",
        destructive:
          "bg-destructive text-white shadow-sm hover:bg-destructive/90 focus-visible:ring-destructive/30",
        /** Steel outline — secondary action */
        secondary:
          "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground focus-visible:ring-primary/40",
        ghost:
          "hover:bg-secondary hover:text-secondary-foreground",
        link:
          "text-primary underline-offset-4 hover:underline",

        // ── CPSL brand variants ──────────────────────────────────────────────
        /** Crimson CTA — competition accent, alerts, high-energy moments */
        "cpsl-crimson":
          "bg-accent text-accent-foreground shadow-sm hover:bg-accent/90 focus-visible:ring-accent/40",
        /** Dark navy — primary action on light surfaces */
        "cpsl-navy":
          "bg-[#091628] text-white shadow-sm hover:bg-[#1E293B] focus-visible:ring-[#091628]/40",
        /** Ghost with crimson border — accent secondary */
        "cpsl-outline-crimson":
          "border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-accent-foreground",
        /** Success green */
        "cpsl-success":
          "bg-[#00C853] text-white shadow-sm hover:bg-[#00A844] focus-visible:ring-[#00C853]/40",
        /** Live indicator style — pulsing red */
        "cpsl-live":
          "bg-[#FF1744] text-white shadow-sm hover:bg-[#D50000] animate-pulse focus-visible:ring-[#FF1744]/40",
        /**
         * Championship Gold CTA — primary call-to-action on dark surfaces.
         * Used in TopNav and hero sections.
         */
        "cpsl-gold":
          "bg-[#C9A74C] text-[#091628] shadow-sm font-['Barlow_Condensed'] [font-weight:700] text-[14px] uppercase tracking-[0.04em] hover:bg-[#B89640] focus-visible:ring-[#C9A74C]/40",
        /** Gold ghost — outlined version for use on light surfaces */
        "cpsl-outline-gold":
          "border-2 border-[#C9A74C] text-[#C9A74C] bg-transparent hover:bg-[#C9A74C] hover:text-[#091628] focus-visible:ring-[#C9A74C]/40",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs:    "h-6 gap-1 px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm:    "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg:    "h-11 px-8 text-base has-[>svg]:px-5",
        xl:    "h-13 px-10 text-lg has-[>svg]:px-6",
        icon:    "size-9",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
        pill:      "h-9 px-5",
        "pill-sm": "h-7 px-4 text-xs",
        "pill-lg": "h-11 px-7 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

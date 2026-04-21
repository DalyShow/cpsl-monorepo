import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export interface CPSLInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  /** Helper text shown below the input */
  hint?: string
  /** Error message — shown instead of hint when set */
  error?: string
  /** Icon placed on the left inside the input */
  leftIcon?: React.ReactNode
  /** Icon or element placed on the right (e.g., clear button) */
  rightElement?: React.ReactNode
  containerClassName?: string
}

/**
 * CPSLInput
 *
 * Labeled input with left/right icon slots, helper text, and error state.
 * Fully WCAG AA compliant — label is always visually associated.
 *
 * @example
 * <CPSLInput
 *   label="Team Name"
 *   placeholder="e.g. Charlotte FC Academy"
 *   hint="Enter your registered club name"
 * />
 *
 * <CPSLInput
 *   label="Email"
 *   type="email"
 *   error="Please enter a valid email address"
 *   leftIcon={<Mail size={16} />}
 * />
 */
export const CPSLInput = React.forwardRef<HTMLInputElement, CPSLInputProps>(
  (
    {
      label,
      hint,
      error,
      leftIcon,
      rightElement,
      containerClassName,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? React.useId()
    const hintId = `${inputId}-hint`
    const hasError = !!error

    return (
      <div className={cn("flex flex-col gap-1.5", containerClassName)}>
        {label && (
          <Label
            htmlFor={inputId}
            className={cn(
              "text-sm font-semibold",
              hasError && "text-destructive"
            )}
          >
            {label}
          </Label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 text-muted-foreground pointer-events-none">
              {leftIcon}
            </span>
          )}
          <Input
            ref={ref}
            id={inputId}
            aria-describedby={hint || error ? hintId : undefined}
            aria-invalid={hasError}
            className={cn(
              "h-10 bg-background border-border text-sm transition-colors",
              "focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary",
              leftIcon && "pl-9",
              rightElement && "pr-9",
              hasError && "border-destructive focus-visible:ring-destructive/30 focus-visible:border-destructive",
              className
            )}
            {...props}
          />
          {rightElement && (
            <span className="absolute right-3 text-muted-foreground">
              {rightElement}
            </span>
          )}
        </div>

        {(error || hint) && (
          <p
            id={hintId}
            className={cn(
              "text-xs",
              hasError ? "text-destructive" : "text-muted-foreground"
            )}
          >
            {error ?? hint}
          </p>
        )}
      </div>
    )
  }
)

CPSLInput.displayName = "CPSLInput"

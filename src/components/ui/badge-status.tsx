import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { StatusDot } from "@/components/atoms/status-dot"

export const badgeStatusTypes = ["success", "error", "warning", "info", "disabled"] as const
export type BadgeStatusType = (typeof badgeStatusTypes)[number]
export const badgeStatusSizes = ["main", "small"] as const
export type BadgeStatusSize = (typeof badgeStatusSizes)[number]
const padding = { main: "p-content-l", small: "p-content-s" } as const
const text = { main: "text-body-b1", small: "text-body-b2" } as const

// Four types are alert modes: data-alert sets the --feedback-* tokens. Disabled is not an alert, so it uses neutral tokens.
// Error text uses content-main on purpose (it passes contrast at 4.67:1); the others use content-contrast (see the contract).
const look = {
  success: "bg-feedback-transparent text-feedback-content-contrast",
  error: "bg-feedback-transparent text-feedback-content-main",
  warning: "bg-feedback-transparent text-feedback-content-contrast",
  info: "bg-feedback-transparent text-feedback-content-contrast",
  disabled: "bg-surface-neutral-subtle text-content-disabled-neutral-main",
} as const

type BadgeStatusProps = ComponentProps<"span"> & {
  feedbackType?: BadgeStatusType
  /** main: padding content-l, text body-b1. small: padding content-s, text body-b2. */
  size?: BadgeStatusSize
  /** Dot before the label. Never shown for disabled. */
  hasDot?: boolean
  /** The label text (Figma TEXT property "label"). */
  label?: string
}

function BadgeStatus({ feedbackType = "success", size = "main", hasDot = true, label = "Label", className, ...props }: BadgeStatusProps) {
  return (
    <span
      data-slot="badge-status"
      data-alert={feedbackType === "disabled" ? undefined : feedbackType}
      className={cn(
        "inline-flex items-center justify-center gap-content-xs min-w-surfaces-2xs min-h-atom-xs rounded-medium",
        padding[size],
        text[size],
        look[feedbackType],
        className,
      )}
      {...props}
    >
      {hasDot && feedbackType !== "disabled" && <StatusDot type="active" />}
      {label}
    </span>
  )
}

export { BadgeStatus }

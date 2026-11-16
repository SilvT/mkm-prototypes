import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Icon } from "./icon"
import type { IconName } from "./icon"

export const feedbackTypes = ["success", "error", "warning", "info"] as const
export type FeedbackType = (typeof feedbackTypes)[number]

// data-alert sets the --feedback-* tokens, so colour comes from the type with no per-variant classes.
// Default icon per type: Material names from the name map in docs/icons.md (growth right? True/False, align center, schedule); all Proposed. Only the default: `icon` picks any other registry icon.
const defaultIcons: Record<FeedbackType, IconName> = { success: "trending_up", error: "trending_down", warning: "align_vertical_center", info: "schedule" }
const labels = { success: "Success", error: "Error", warning: "Warning", info: "Info" } as const

type IndicatorFeedbackBase = Omit<ComponentProps<"span">, "children"> & {
  feedbackType?: FeedbackType
  /** Formatted value, e.g. "10%". Not rendered when hasValue is false. */
  value?: string
  /** Figma hasIcon. The icon can be on or off. */
  hasIcon?: boolean
  /** Figma instance swap on the nested icon (Silvia, 2026-11-06: icons are elective and not locked to a status). A registry icon name (docs/icons.md); default follows feedbackType. */
  icon?: IconName
}

// Either the value or the subtitle is always shown (Silvia, 2026-11-06): hasValue false requires a subtitle. The icon can be on or off in every case.
type IndicatorFeedbackProps = IndicatorFeedbackBase &
  (
    | {
        /** Figma hasValue. Default true. */
        hasValue?: true
        /** Figma hasSubtitle is this being present. */
        subtitle?: string
      }
    | {
        /** Figma hasValue false: the value is hidden, so a subtitle is required. */
        hasValue: false
        subtitle: string
      }
  )

function IndicatorFeedback({ feedbackType = "success", value, hasValue = true, subtitle, hasIcon = true, icon, className, ...props }: IndicatorFeedbackProps) {
  return (
    <span
      data-slot="indicator-feedback"
      data-alert={feedbackType}
      className={cn(
        "inline-flex max-w-surfaces-xs items-center gap-content-xs rounded-small bg-feedback-background px-content-s py-content-xs text-feedback-content-contrast",
        className,
      )}
      {...props}
    >
      <span className="sr-only">{labels[feedbackType]}: </span>
      {hasValue && <span className="text-displays-n4">{value}</span>}
      {subtitle && <span className="min-w-null truncate text-body-b4">{subtitle}</span>}
      {hasIcon && <Icon name={icon ?? defaultIcons[feedbackType]} />}
    </span>
  )
}

export { IndicatorFeedback }

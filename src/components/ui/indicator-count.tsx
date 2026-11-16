import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

export const indicatorCountTypes = ["main", "secondary"] as const
export const indicatorCountStatuses = ["active", "press", "hover", "focus", "disabled"] as const
export const indicatorCountSizes = ["medium", "large"] as const
export const indicatorCountModes = ["primary", "secondary", "tertiary", "inverse"] as const
export type IndicatorCountMode = (typeof indicatorCountModes)[number]
export type IndicatorCountType = (typeof indicatorCountTypes)[number]
export type IndicatorCountStatus = (typeof indicatorCountStatuses)[number]
export type IndicatorCountSize = (typeof indicatorCountSizes)[number]

// Main acts as a non-interactive button, so it reads the buttons-* tokens (designer note in Figma).
// Main follows the tertiary button mode by default; `buttonMode` allows all four (Silvia's decision, not a Figma property).
// Borders follow the Figma snapshot: width from border-w-*, colour from border-<stroke token>.
const look = {
  main: {
    active: "bg-buttons-default-background text-buttons-default-content border-w-light border-stroke-brand-strong",
    press: "bg-buttons-press-background text-buttons-press-content border-w-buttons-press-border-thickness border-buttons-press-border",
    hover: "bg-gradient-surface-extrasubtle text-buttons-hover-content border-w-subtle border-stroke-brand-bold",
    focus: "bg-buttons-focus-background text-buttons-focus-content border-w-buttons-focus-border-thickness border-buttons-focus-border",
    disabled: "bg-buttons-disable-background text-buttons-disable-content",
  },
  secondary: {
    active: "bg-surface-brand-subtle text-content-brand-strong",
    press: "bg-surface-brand-light text-content-brand-bold",
    hover: "bg-gradient-surface-subtle text-content-brand-medium",
    focus: "bg-surface-brand-ultrasubtle text-content-brand-strong border-w-strong border-stroke-brand-bold",
    disabled: "bg-surface-neutral-subtle text-content-disabled-neutral-contrast",
  },
} as const

const radius = { main: "rounded-medium", secondary: "rounded-large" } as const
const sizing = { medium: "min-h-atom-s text-title-h4", large: "size-item-large text-title-h3" } as const

type IndicatorCountProps = Omit<ComponentProps<"span">, "children"> & {
  type?: IndicatorCountType
  /** Visual status, as in Figma. The component is not interactive: this does not react to the pointer. */
  status?: IndicatorCountStatus
  size?: IndicatorCountSize
  /** Which button mode main reads its tokens from. Only affects type main. */
  buttonMode?: IndicatorCountMode
  /** The count text (Figma TEXT property "label"). */
  label?: string
}

function IndicatorCount({ type = "main", status = "active", size = "medium", buttonMode = "tertiary", label = "7", className, ...props }: IndicatorCountProps) {
  return (
    <span
      data-slot="indicator-count"
      data-button={type === "main" ? buttonMode : undefined}
      className={cn(
        "inline-flex aspect-square flex-col items-center justify-center pt-content-xs pr-content-xs pb-content-2xs pl-content-xs",
        radius[type],
        sizing[size],
        look[type][status],
        className,
      )}
      {...props}
    >
      {label}
    </span>
  )
}

export { IndicatorCount }

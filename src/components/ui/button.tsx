import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cn } from "@/lib/utils"
import { ButtonLoader } from "@/components/atoms/button-loader"
import { Icon } from "./icon"
import type { IconName } from "./icon"

export const buttonTypes = ["primary", "secondary", "tertiary", "inverse"] as const
export type ButtonType = (typeof buttonTypes)[number]
export const buttonSizes = ["m", "s", "l"] as const
export type ButtonSize = (typeof buttonSizes)[number]
export const buttonStatuses = ["default", "disable", "focus", "focus::hover", "press", "hover", "loading", "hover-feedback"] as const
export type ButtonStatus = (typeof buttonStatuses)[number]

// Colours come from the buttons-* tokens; data-button (the type) switches their mode. The look is an `[background:...]` shorthand because a
// buttons-*-background token is a colour in some modes and a gradient in others.
// Status looks: the real pseudo-state (hover, focus-visible, active, disabled) or a forced data-status. Variants are in src/index.css; later wins.
export const buttonBase ="[background:var(--buttons-default-background)] text-buttons-default-content border-w-buttons-default-border-thickness border-buttons-default-border"
export const buttonStates = [
  "status-hover:[background:var(--buttons-hover-background)] status-hover:text-buttons-hover-content status-hover:border-w-buttons-hover-border-thickness status-hover:border-buttons-hover-border",
  "status-focus:[background:var(--buttons-focus-background)] status-focus:text-buttons-focus-content status-focus:border-w-buttons-focus-border-thickness status-focus:border-buttons-focus-border",
  "status-focus-hover:[background:var(--buttons-focus-hover-background)] status-focus-hover:text-buttons-focus-hover-content status-focus-hover:border-w-buttons-focus-hover-border-thickness status-focus-hover:border-buttons-focus-hover-border",
  "status-press:[background:var(--buttons-press-background)] status-press:text-buttons-press-content status-press:border-w-buttons-press-border-thickness status-press:border-buttons-press-border",
  "status-disable:[background:var(--buttons-disable-background)] status-disable:text-buttons-disable-content status-disable:border-w-buttons-disable-border-thickness status-disable:border-buttons-disable-border status-disable:pointer-events-none",
  // loading shows the press look (snapshot fills), and ignores the pointer.
  "data-[status=loading]:[background:var(--buttons-press-background)] data-[status=loading]:text-buttons-press-content data-[status=loading]:border-w-buttons-press-border-thickness data-[status=loading]:border-buttons-press-border data-[status=loading]:pointer-events-none",
].join(" ")

// Padding per size (snapshot): vertical content-xs; horizontal m content-m, s content-s, l content-l. Gap content-m; radius small; text body-b3. Height hugs, min height touch-size.
const padding = { m: "py-content-xs px-content-m", s: "py-content-xs px-content-s", l: "py-content-xs px-content-l" } as const

// Loader colorWave per type (snapshot): light on primary and inverse, dark on secondary and tertiary.
export const loaderWave = { primary: "light", secondary: "dark", tertiary: "dark", inverse: "light" } as const

type ButtonProps =Omit<ButtonPrimitive.Props, "children" | "className" | "type"> & {
  className?: string
  type?: ButtonType
  size?: ButtonSize
  /** Visual status, as in Figma. Hover, focus, press and disabled also happen by themselves; this forces the look (and loading is only set here). */
  status?: ButtonStatus
  /** The label text (Figma TEXT property "label"). */
  label?: string
  /** Figma boolean "hasLeadIcon". Shows the `leadIcon`. */
  hasLeadIcon?: boolean
  /** Figma boolean "hasTrailIcon". Shows the `trailIcon`. */
  hasTrailIcon?: boolean
  /** Figma instance swap "leadIcon" (default stick = arrow_forward). A registry icon name (docs/icons.md). */
  leadIcon?: IconName
  /** Figma instance swap "trailIcon". See leadIcon. */
  trailIcon?: IconName
}

// `type` is the Figma variant (primary, secondary, tertiary, inverse), so the native button type attribute is not exposed.
function Button({ type = "primary", size = "m", status = "default", label = "Label", hasLeadIcon = true, hasTrailIcon = true, leadIcon = "arrow_forward", trailIcon = "arrow_forward", className, ...props }: ButtonProps) {
  const loading = status === "loading"
  return (
    <ButtonPrimitive
      data-slot="button"
      data-button={type}
      data-size={size}
      data-status={status === "default" ? undefined : status}
      aria-busy={loading || undefined}
      className={cn(
        "inline-flex items-center gap-content-m min-h-touch-size rounded-small border-solid text-body-b3 outline-none select-none",
        padding[size],
        buttonBase,
        buttonStates,
        className,
      )}
      {...props}
    >
      {!loading && hasLeadIcon && <Icon name={leadIcon} />}
      {label}
      {loading ? <ButtonLoader colorWave={loaderWave[type]} /> : hasTrailIcon && <Icon name={trailIcon} />}
    </ButtonPrimitive>
  )
}

export { Button }

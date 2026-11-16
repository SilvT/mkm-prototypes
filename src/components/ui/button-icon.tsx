import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cn } from "@/lib/utils"
import { buttonBase, buttonSizes, buttonStates, buttonStatuses, buttonTypes, loaderWave } from "./button"
import { ButtonLoader } from "@/components/atoms/button-loader"
import { Icon } from "./icon"
import type { IconName } from "./icon"

// Same Figma variants as button (type, status, size), so the option lists are shared.
export const buttonIconTypes = buttonTypes
export type ButtonIconType = (typeof buttonIconTypes)[number]
export const buttonIconSizes = buttonSizes
export type ButtonIconSize = (typeof buttonIconSizes)[number]
export const buttonIconStatuses = buttonStatuses
export type ButtonIconStatus = (typeof buttonIconStatuses)[number]

// Padding per size (snapshot): m and s content-xs / content-s, l content-xs all round. Min width and min height touch-size; the width hugs (see the contract Gaps).
const padding = { m: "py-content-xs px-content-s", s: "py-content-xs px-content-s", l: "p-content-xs" } as const

type ButtonIconProps = Omit<ButtonPrimitive.Props, "children" | "className" | "type" | "aria-label"> & {
  className?: string
  type?: ButtonIconType
  size?: ButtonIconSize
  /** Visual status, as in Figma. Hover, focus, press and disabled also happen by themselves; this forces the look (and loading is only set here). */
  status?: ButtonIconStatus
  /** Figma instance swap "icon" (default stick = arrow_forward). A registry icon name (docs/icons.md). */
  icon?: IconName
  /** The accessible name. The button has no visible label, so this is required (native attribute, not a Figma property). */
  "aria-label": string
}

// `type` is the Figma variant, so the native button type attribute is not exposed. Looks come from button (same buttons-* tokens and status variants).
function ButtonIcon({ type = "primary", size = "m", status = "default", icon = "arrow_forward", className, ...props }: ButtonIconProps) {
  const loading = status === "loading"
  return (
    <ButtonPrimitive
      data-slot="button-icon"
      data-button={type}
      data-size={size}
      data-status={status === "default" ? undefined : status}
      aria-busy={loading || undefined}
      className={cn(
        "inline-flex items-center justify-center min-h-touch-size min-w-touch-size rounded-small border-solid outline-none select-none",
        padding[size],
        buttonBase,
        buttonStates,
        className,
      )}
      {...props}
    >
      {loading ? <ButtonLoader colorWave={loaderWave[type]} /> : <Icon name={icon} />}
    </ButtonPrimitive>
  )
}

export { ButtonIcon }

import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

export const linksStatuses = ["active", "hover", "focus", "disabled"] as const
export type LinksStatus = (typeof linksStatuses)[number]
export const linksVisited = ["false", "true"] as const

// Each look is one Figma variant (status x hasVisited). A forced `status` sets data-status; hover and focus also react to the pointer and keyboard
// (custom variants status-hover and status-focus in src/index.css).
// Unvisited: solid underline in content-contrast. Visited: dashed underline in content-main. Hover removes the underline (unvisited) and adds a surface (both).
// Focus: Figma draws a dashed box only for visited links; unvisited focus looks like active (see the contract Gaps).
const look = {
  false: "text-alert-info-content-contrast border-b-(length:--border-width-light) border-solid border-alert-info-content-contrast status-hover:border-b-0 status-hover:bg-alert-info-surface",
  true: "text-alert-info-content-main border-b-(length:--border-width-light) border-dashed border-alert-info-content-main status-hover:bg-alert-info-surface status-focus:border-w-light",
} as const
const disabled = "text-text-disabled-neutral pointer-events-none"

type LinksProps = Omit<ComponentProps<"a">, "children"> & {
  /** Visual status. hover and focus also happen by themselves; disabled is not a pointer state. */
  status?: LinksStatus
  /** Figma variant "hasVisited" (values false | true). Visited links get a dashed underline. */
  hasVisited?: boolean
  /** The link text (Figma TEXT property "label"). */
  label?: string
}

function Link({ status = "active", hasVisited = false, label = "ask to reset", className, ...props }: LinksProps) {
  const isDisabled = status === "disabled"
  return (
    <a
      data-slot="links"
      data-status={status === "active" ? undefined : status}
      {...(isDisabled ? { role: "link", "aria-disabled": true, tabIndex: -1 } : {})}
      className={cn(
        "inline-flex items-center justify-center pt-null pr-content-xs pb-null pl-content-xs text-body-b3",
        isDisabled ? disabled : look[hasVisited ? "true" : "false"],
        className,
      )}
      {...props}
    >
      {label}
    </a>
  )
}

export { Link }

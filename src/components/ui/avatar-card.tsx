import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { AvatarSingle } from "./avatar-single"
import { IndicatorCount } from "./indicator-count"

export const avatarCardStatuses = ["active", "focus:hover", "focus", "hover"] as const
export type AvatarCardStatus = (typeof avatarCardStatuses)[number]

// Borders and fills follow the Figma snapshot per status. Not interactive: status is a visual state, set by the parent.
const look = {
  active: "border-w-null border-stroke-hidden bg-surface-hidden",
  focus: "border-w-light border-stroke-interactive-focus bg-surface-brand-ultrasubtle",
  "focus:hover": "border-w-main border-stroke-brand-medium bg-gradient-surface-extrasubtle",
  hover: "border-w-null border-stroke-hidden bg-surface-brand-subtle",
} as const

// itemType is also an HTML microdata attribute (string); the Figma property of the same name takes an element.
type AvatarCardProps = Omit<ComponentProps<"div">, "itemType"> & {
  status?: AvatarCardStatus
  /** Notification count indicator (Figma BOOLEAN property). */
  hasNotifications?: boolean
  /** The avatar (Figma INSTANCE_SWAP property "itemType", preferred: avatar-single). Defaults to an avatar-single. */
  itemType?: ReactNode
}

function AvatarCard({ status = "active", hasNotifications = true, itemType, children, className, ...props }: AvatarCardProps) {
  return (
    <div
      data-slot="avatar-card"
      data-status={status}
      className={cn(
        "inline-flex items-center gap-content-l rounded-medium border-solid py-content-xs pr-content-s pl-content-xs",
        look[status],
        className,
      )}
      {...props}
    >
      {itemType ?? <AvatarSingle type="initials" />}
      <div className="flex items-center gap-content-l">
        <span className="text-body-b1 text-content-interactive-inactive">{children}</span>
        {hasNotifications && <IndicatorCount type="main" status="active" size="medium" />}
      </div>
    </div>
  )
}

export { AvatarCard }

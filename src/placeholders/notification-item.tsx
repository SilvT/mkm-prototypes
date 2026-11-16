// PLACEHOLDER: notification-Item (section icon, label, count) is not in the design system yet; replace when built in ds_POC.
import { Icon } from "@/components/ui/icon"
import type { IconName } from "@/components/ui/icon"
import { IndicatorCount } from "@/components/ui/indicator-count"
import { cn } from "@/lib/utils"

type Props = { icon: IconName; label: string; count: string; underline?: boolean; className?: string }

// Figma notification-Item: row, padding content-xs, radius small, fill surface-neutral-extrasubtle; the last one has a bottom border stroke-brand-alt-light.
// Label body-b3 in content-brand-strong; count is indicator-count secondary medium (as in Figma).
function NotificationItem({ icon, label, count, underline, className }: Props) {
  return (
    <li className={cn("flex w-full items-center justify-center rounded-small bg-surface-neutral-extrasubtle p-content-xs", underline && "border-b-(length:--border-width-light) border-solid border-stroke-brand-alt-light", className)}>
      <span className="flex flex-1 items-center gap-content-s text-body-b3 text-content-brand-strong">
        <Icon name={icon} className="size-item-small text-content-brand-medium" />
        {label}
      </span>
      <IndicatorCount type="secondary" size="medium" label={count} />
    </li>
  )
}

export { NotificationItem }

// PLACEHOLDER: sections-card (section icon, name, optional count) is not in the design system yet; replace when built in ds_POC.
// The 350 width and 134 min height have no token (raw values, Gap). Colours and spacing follow the Figma node 42:19455.
import { Icon } from "@/components/ui/icon"
import type { IconName } from "@/components/ui/icon"
import { IndicatorCount } from "@/components/ui/indicator-count"
import { cn } from "@/lib/utils"

type Props = { icon: IconName; label: string; count?: string; className?: string }

function SectionCard({ icon, label, count, className }: Props) {
  return (
    <div
      className={cn(
        "flex min-h-[134px] w-[350px] items-center justify-center gap-content-m rounded-large bg-surface-neutral-extrasubtle px-content-4xl py-content-2xl",
        "border-b-(length:--border-width-strong) border-l-(length:--border-width-strong) border-solid border-gradient-alert-info-0",
        className,
      )}
    >
      <div className="flex flex-1 items-center gap-content-2xl">
        <Icon name={icon} className="size-item-large text-content-brand-medium" />
        <p className="text-title-h2 text-text-header-sub-neutral">{label}</p>
      </div>
      {count !== undefined && <IndicatorCount type="main" size="large" label={count} />}
    </div>
  )
}

export { SectionCard }

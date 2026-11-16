// PLACEHOLDER: sections-card (section icon, name, optional count) is not in the design system yet; replace when built in ds_POC.
// Adapted from Figma node 42:19455 (350 x 134, two rows of 3 + 2) so the landing page fits a 1440 x 800 screen without vertical scroll: the card now grows to share the row
// (min width dimensions-200, no fixed width or height), with tighter padding; the row wraps when the screen is narrower. Colours follow the node.
import { Icon } from "@/components/ui/icon"
import type { IconName } from "@/components/ui/icon"
import { IndicatorCount } from "@/components/ui/indicator-count"
import { cn } from "@/lib/utils"

type Props = { icon: IconName; label: string; count?: string; className?: string }

function SectionCard({ icon, label, count, className }: Props) {
  return (
    <div
      className={cn(
        "flex min-w-(--dimensions-200) flex-1 items-center justify-center gap-content-m rounded-large bg-surface-neutral-extrasubtle px-content-l py-content-2xl",
        "border-b-(length:--border-width-strong) border-l-(length:--border-width-strong) border-solid border-gradient-alert-info-0",
        className,
      )}
    >
      <div className="flex flex-1 items-center gap-content-l">
        <Icon name={icon} className="size-item-large text-content-brand-medium" />
        <p className="text-title-h2 text-text-header-sub-neutral">{label}</p>
      </div>
      {count !== undefined && <IndicatorCount type="main" size="large" label={count} />}
    </div>
  )
}

export { SectionCard }

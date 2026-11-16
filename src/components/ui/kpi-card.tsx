import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { IndicatorFeedback, type FeedbackType } from "./indicator-feedback"

function KpiCard({ label, value, feedbackType, indicatorValue, indicatorSubtitle, className, ...props }: Omit<ComponentProps<"div">, "children"> & { label: string; value: string; feedbackType: FeedbackType; indicatorValue: string; indicatorSubtitle?: string }) {
  return (
    <div
      data-slot="kpi-card"
      className={cn("flex flex-col gap-content-s rounded-extralarge bg-surface-neutral-extrasubtle p-content-xl shadow-drop-subtle-neutral", className)}
      {...props}
    >
      <p className="text-body-b2 text-content-neutral-medium">{label}</p>
      <p className="text-displays-n1 text-content-neutral-bold">{value}</p>
      <IndicatorFeedback feedbackType={feedbackType} value={indicatorValue} subtitle={indicatorSubtitle} className="self-start" />
    </div>
  )
}

export { KpiCard }

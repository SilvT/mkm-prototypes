import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

export const statusDotTypes = ["active", "pending"] as const
export type StatusDotType = (typeof statusDotTypes)[number]

type StatusDotProps = ComponentProps<"span"> & {
  /** Figma variant "type". active: filled circle. pending: transparent fill with a subtle outline. */
  type?: StatusDotType
}

// Internal atom (Figma _atom-status-dot, role atom). No story, no contract: its values live in the contracts of the parents that list it in `uses` (badge-status).
// Importable by components only, never by screens. Frame: 8 wide (content-s, fixed), 20 high (size atom-xs), 2 top padding (content-2xs); the circle fills the width with aspect ratio 1:1 (republished 2026-11-06).
// Circle (snapshot): active = fill feedback-content-main, border width null; pending = fill feedback-transparent, dashed border feedback-content-main, width subtle.
// The circle radius is bound to border-radius/circle (rounded-circle). The 2 top padding aligns the dot with the centre of the text's x-height (Silvia, 2026-11-05).
const circle = {
  active: "border-solid bg-feedback-content-main border-w-null border-feedback-content-main",
  pending: "border-dashed bg-feedback-transparent border-w-subtle border-feedback-content-main",
} as const

function StatusDot({ type = "active", className, ...props }: StatusDotProps) {
  return (
    <span data-slot="status-dot" data-type={type} aria-hidden="true" className={cn("flex w-content-s min-h-atom-xs items-center pt-content-2xs", className)} {...props}>
      <span className={cn("aspect-square flex-1 rounded-circle", circle[type])} />
    </span>
  )
}

export { StatusDot }

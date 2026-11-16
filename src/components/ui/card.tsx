import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"

// Snapshot: row, centred, padding content-4xl sides and content-l top and bottom, gap content-l, radius large, fill surface-neutral-extrasubtle,
// border only on the bottom and left (border-width strong, stroke-brand-extrabold), min width surfaces-xl. The 812 x 313 size is fixed in the snapshot and not bound: not built (see the contract Gaps).
// container: slot, column, centred, padding content-2xl, gap content-l, fills the row. container-two: slot, column, padding content-l, gap content-l, fill surface-brand-subtle.
type CardProps = Omit<ComponentProps<"div">, "children"> & {
  /** Figma SLOT "container". */
  container?: ReactNode
  /** Figma SLOT "container-two". Only drawn when hasTwoContainers is true. */
  containerTwo?: ReactNode
  /** Figma BOOLEAN "hasTwoContainers". */
  hasTwoContainers?: boolean
}

function Card({ container, containerTwo, hasTwoContainers = true, className, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(
        "flex items-center justify-center gap-content-l min-w-surfaces-xl rounded-large bg-surface-neutral-extrasubtle px-content-4xl py-content-l",
        "border-solid border-stroke-brand-extrabold border-b-(length:--border-width-strong) border-l-(length:--border-width-strong)",
        className,
      )}
      {...props}
    >
      <div data-slot="card-container" className="flex flex-1 flex-col items-center justify-center gap-content-l self-stretch p-content-2xl">{container}</div>
      {hasTwoContainers && (
        <div data-slot="card-container-two" className="flex flex-1 flex-col items-start gap-content-l self-stretch bg-surface-brand-subtle p-content-l">{containerTwo}</div>
      )}
    </div>
  )
}

export { Card }

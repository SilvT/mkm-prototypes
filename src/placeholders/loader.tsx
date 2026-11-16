// PLACEHOLDER: Loader (112px page spinner) and LineLoader (progress line) are not in the design system yet; replace when built in ds_POC.
// Rotation speed (1s per turn) and line slide (1.2s) are choices, not from the design (the library has stills only). The 112px size has no token (Gap).
import { cn } from "@/lib/utils"

const arc =
  "[background:conic-gradient(from_0deg,transparent_0_15%,var(--gradient-graphs-graph-0)_15%,var(--gradient-graphs-graph-50)_55%,var(--gradient-graphs-graph-100)_95%,transparent_95%)] " +
  "[mask:radial-gradient(farthest-side,transparent_calc(100%-var(--border-width-bold)),#000_calc(100%-var(--border-width-bold)))] " +
  "[-webkit-mask:radial-gradient(farthest-side,transparent_calc(100%-var(--border-width-bold)),#000_calc(100%-var(--border-width-bold)))]"

function Loader({ label, className }: { label: string; className?: string }) {
  return <div role="status" aria-label={label} className={cn("size-[112px] animate-spin rounded-circle motion-reduce:animate-none", arc, className)} />
}

function LineLoader({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("flex h-(--size-item-small) w-surfaces-s items-center rounded-circle bg-surface-neutral-subtle", className)}>
      <div className="h-full w-1/4 animate-line-loader rounded-circle [background:var(--gradient-style-graphs)] motion-reduce:animate-none" />
    </div>
  )
}

export { Loader, LineLoader }

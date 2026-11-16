import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

export const buttonLoaderStages = ["1", "2", "3", "4", "5", "6", "7", "8"] as const
export type ButtonLoaderStage = (typeof buttonLoaderStages)[number]
export const buttonLoaderColorWaves = ["light", "dark"] as const
export type ButtonLoaderColorWave = (typeof buttonLoaderColorWaves)[number]

type ButtonLoaderProps = ComponentProps<"span"> & {
  /** Frame of the loading animation (Figma variant "stage"). */
  stage?: ButtonLoaderStage
  /** Figma variant "colorWave". */
  colorWave?: ButtonLoaderColorWave
}

// Atom _atom-button-loader (node 40002065:8807). Values and open gaps live in the contracts of its parents (button, button-icon, inputfield-base).
// Frame (snapshot): width and height follow the icon token (size-icon; 14 in the snapshot), 1/1. Two ring parts (arcData innerRadius 0.87: the ring is the outer 13 percent).
// base: a full ring. light = surface-neutral-subtle at opacity-30; dark = surface-brand-subtle at opacity-70.
// wave: an arc sweeping 126.35 degrees. light = gradient surface-extrasubtle; dark = gradient alert-info. Stage n starts at (n - 1) * 45 degrees (snapshot).
// Figma arc angles start at 3 o'clock, CSS conic-gradient at 12 o'clock, hence the 90 degree offset.
const base = { light: "bg-surface-neutral-subtle opacity-30", dark: "bg-surface-brand-subtle opacity-70" } as const
const wave = { light: "bg-gradient-surface-extrasubtle", dark: "bg-gradient-alert-info" } as const
const arcSweep = 126.35
const ring = "radial-gradient(farthest-side, transparent 87%, black 87%)"
// Proposed (not designed in Figma): the arc turns continuously (animate-button-loader in src/index.css, drives --button-loader-angle). Stage sets the start angle the turn begins from; under prefers-reduced-motion the angle stays 0 and the stage is shown still.
const arc = (stage: ButtonLoaderStage) => `conic-gradient(from calc(${(Number(stage) - 1) * 45 + 90}deg + var(--button-loader-angle)), black ${arcSweep}deg, transparent 0)`

function ButtonLoader({ stage = "1", colorWave = "light", className, ...props }: ButtonLoaderProps) {
  return (
    <span data-slot="button-loader" data-stage={stage} data-color-wave={colorWave} className={cn("inline-grid size-icon aspect-square", className)} {...props}>
      <span data-part="base" style={{ maskImage: ring }} className={cn("col-start-1 row-start-1 rounded-circle", base[colorWave])} />
      <span data-part="wave" style={{ maskImage: `${ring}, ${arc(stage)}`, maskComposite: "intersect" }} className={cn("col-start-1 row-start-1 rounded-circle animate-button-loader motion-reduce:animate-none", wave[colorWave])} />
    </span>
  )
}

export { ButtonLoader }

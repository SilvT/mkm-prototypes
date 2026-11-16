import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { icons } from "./icon-registry"
import type { IconName } from "./icon-registry"

export type { IconName }
export const iconNames = Object.keys(icons) as IconName[]

type IconProps = Omit<ComponentProps<"svg">, "children" | "name" | "aria-label" | "role"> & {
  /** A Material Symbol name from the registry (src/components/ui/icon-registry.ts). */
  name: IconName
  /** Accessible name. Without it the icon is decorative (aria-hidden). */
  label?: string
}

// Size: size-icon follows the data-size mode (L 32, M 20, S 14). Override with size-item-* through className.
function Icon({ name, label, className, ...props }: IconProps) {
  const { viewBox, d } = icons[name]
  return (
    <svg
      data-slot="icon"
      data-icon={name}
      viewBox={viewBox}
      fill="currentColor"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("size-icon shrink-0", className)}
      {...props}
    >
      <path d={d} />
    </svg>
  )
}

export { Icon }

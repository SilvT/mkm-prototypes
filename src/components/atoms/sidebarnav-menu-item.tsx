// Internal atom (Figma _atom-sidebarNav_menu-item, node 40004009:5093, role atom). No story, no contract, not importable by screens.
// Parent: sidebarnav (its contract `uses` it and documents these values).
// Frame: inline, centred, radius small, padding content-m top and bottom, content-xs right; left content-xs (isActive false) or content-m (isActive true).
// Inner "menu_item": gap content-s, padding right content-s, a 14 section glyph + label in text style title-h3. Optional 12 arrow (arrow_ios = arrow_forward_ios, Proposed), hidden by default (showArrow).
// Looks (isActive false / true):
//   active:  no fill, text content-interactive-inactive / content-interactive-active
//   hover:   fill surface-neutral-subtle / surface-brand-subtle, text content-interactive-hover
//   focus:   fill surface-neutral-subtle / surface-brand-extrasubtle, border border-width-light in stroke-brand-extrabold, text content-interactive-focus
//   disable: no fill, text content-disabled-neutral-contrast, left padding content-xs; the same for isActive false and true (Silvia, 2026-11-06)
// Snapshot variants (7, checked 2026-11-06): isActive false x active, hover, focus, disable; isActive true x active, hover, focus. All 7 are drawn. Real :hover and :focus-visible apply the same looks by themselves for both isActive values (the status prop only forces them).
// Not in the snapshot, not built: hover while focused (no variant; hover wins the fill, focus keeps the border), pressed. The focus border is a real CSS border (Figma strokes sit inside), and on focus every padding is reduced by border-width-light (padding minus border, per side) so the item does not grow (Silvia, 2026-11-06).
// Open gaps (not built): the section glyph is the optional `icon` prop (the sections group in docs/icons.md); min width 38 is not bound to a token;
//   isActive true + disable has no variant in the snapshot: decided (Silvia) the same as isActive false + disable, including the left padding; the hover border (menuitem-*-hover-border, width null) is transparent, so none is drawn.
import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"
import type { IconName } from "@/components/ui/icon"

export const sidebarnavMenuItemStatuses = ["active", "focus", "hover", "disable"] as const
export type SidebarnavMenuItemStatus = (typeof sidebarnavMenuItemStatuses)[number]

type SidebarnavMenuItemProps = Omit<ComponentProps<"a">, "children"> & {
  /** Figma variant "status". hover and focus also happen by themselves (pointer, keyboard); the prop forces the look. */
  status?: SidebarnavMenuItemStatus
  /** Figma variant "isActive": the current page. */
  isActive?: boolean
  /** Figma TEXT "label". */
  label?: string
  /** Figma BOOLEAN "showLabel". When false the label is only the accessible name. */
  showLabel?: boolean
  /** Figma BOOLEAN "showArrow". */
  showArrow?: boolean
  /** Figma instance swap "sections" (the leading 14 icon). A registry icon name (docs/icons.md, section icons). */
  icon?: IconName
}

const inactive = "pl-content-xs text-content-interactive-inactive status-hover:bg-surface-neutral-subtle status-focus:bg-surface-neutral-subtle"
const active = "pl-content-m text-content-interactive-active status-hover:bg-surface-brand-subtle status-focus:bg-surface-brand-extrasubtle"
// On focus the border adds border-width-light on each side, so each padding loses that width and the item keeps its size (Silvia, 2026-11-06). Left: content-xs (isActive false) or content-m (true).
const focusPad = "status-focus:py-[calc(var(--spacing-content-m)-var(--border-width-light))] status-focus:pr-[calc(var(--spacing-content-xs)-var(--border-width-light))]"
const focusPadLeft = { inactive: "status-focus:pl-[calc(var(--spacing-content-xs)-var(--border-width-light))]", active: "status-focus:pl-[calc(var(--spacing-content-m)-var(--border-width-light))]" } as const
const states = "data-[status=disable]:pl-content-xs status-hover:text-content-interactive-hover status-focus:text-content-interactive-focus status-focus:border-w-light status-focus:border-stroke-brand-extrabold data-[status=disable]:text-content-disabled-neutral-contrast data-[status=disable]:pointer-events-none"

function SidebarnavMenuItem({ status = "active", isActive = false, label = "Label", showLabel = true, showArrow = false, icon, className, ...props }: SidebarnavMenuItemProps) {
  const disabled = status === "disable"
  return (
    <a
      data-slot="sidebarnav-menu-item"
      data-status={status === "active" ? undefined : status}
      aria-current={isActive ? "page" : undefined}
      aria-label={showLabel ? undefined : label}
      {...(disabled ? { "aria-disabled": true, tabIndex: -1 } : {})}
      className={cn("inline-flex items-center rounded-small border-solid py-content-m pr-content-xs outline-none", isActive ? active : inactive, isActive ? focusPadLeft.active : focusPadLeft.inactive, focusPad, states, className)}
      {...props}
    >
      <span className="flex items-center justify-center gap-content-s pr-content-s">
        {icon && <Icon name={icon} />}
        {showLabel && <span className="text-title-h3">{label}</span>}
      </span>
      {showArrow && <Icon name="arrow_forward_ios" className="size-item-small" />}
    </a>
  )
}

export { SidebarnavMenuItem }

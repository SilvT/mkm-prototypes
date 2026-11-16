import { useState } from "react"
import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { SidebarnavMenuItem } from "@/components/atoms/sidebarnav-menu-item"
import { ButtonIcon } from "@/components/ui/button-icon"
import type { IconName } from "@/components/ui/icon"

// Figma variant "isCollapsed" (false | true, default true in the snapshot).
export const sidebarnavCollapsed = ["false", "true"] as const

// The section icons are one group, reused across components (docs/icons.md, section icons).
export const sectionIcons = { campaigns: "campaign", channels: "airwave", leads: "gesture", analytics: "bar_chart", interactions: "interests" } as const satisfies Record<string, IconName>

// The menu is the content of the snapshot's expanded variant (labels from the instance overrides, Channels active). The snapshot has no property for it (see the contract Gaps).
const items = [
  { label: "Campaigns", icon: sectionIcons.campaigns, isActive: false },
  { label: "Channels", icon: sectionIcons.channels, isActive: true },
  { label: "Leads", icon: sectionIcons.leads, isActive: false },
  { label: "Analytics", icon: sectionIcons.analytics, isActive: false },
  { label: "Interactions", icon: sectionIcons.interactions, isActive: false },
] as const

type SidebarnavProps = Omit<ComponentProps<"nav">, "children" | "title"> & {
  /** Figma variant "isCollapsed". true is the compact bar (labels hidden), false the expanded one. It is the starting state: the collapse button toggles it. */
  isCollapsed?: boolean
  /** The app title, drawn in the expanded bar only. Not a Figma property (the snapshot has the text layer but no text). */
  title?: string
}

// Frame (snapshot): column, space between. Padding top and bottom layout-2xl; left and right layout-m (expanded) or layout-s (collapsed). Fill surface-neutral-extrasubtle, right border border-width-main in stroke-neutral-light.
// Max width card-sidebar-expand (expanded) or card-sidebar-compact (collapsed). Menu: column, gap content-xl, padding top content-l; items start (expanded) or centred (collapsed).
// Top: a tertiary s button-icon (collapse or expand), the title (expanded), a primary m button-icon (home), the menu. Bottom: a tertiary s button-icon (settings).
function Sidebarnav({ isCollapsed = true, title, className, ...props }: SidebarnavProps) {
  const [collapsed, setCollapsed] = useState(isCollapsed)
  const [seen, setSeen] = useState(isCollapsed)
  // The prop is the starting state; when it changes (Storybook control) the bar follows it.
  if (seen !== isCollapsed) { setSeen(isCollapsed); setCollapsed(isCollapsed) }
  return (
    <nav
      data-slot="sidebarnav"
      data-collapsed={collapsed}
      className={cn(
        "flex h-full flex-col justify-between bg-surface-neutral-extrasubtle py-layout-2xl border-r-(length:--border-width-main) border-solid border-stroke-neutral-light",
        collapsed ? "w-fit items-center px-layout-s max-w-card-sidebar-compact" : "w-full items-end px-layout-m max-w-card-sidebar-expand",
        className,
      )}
      {...props}
    >
      <div className={cn("flex flex-1 flex-col self-stretch", collapsed ? "items-center" : "items-stretch")}>
        <ButtonIcon
          type="tertiary"
          size="s"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
          icon={collapsed ? "arrow_forward" : "arrow_back"}
          onClick={() => setCollapsed(!collapsed)}
          className={collapsed ? undefined : "self-end"}
        />
        {!collapsed && title && <p className="text-title-h3 text-text-header-brand">{title}</p>}
        <ButtonIcon type="primary" size="m" aria-label="Home" icon="home" className={collapsed ? undefined : "w-full"} />
        <ul className={cn("flex flex-col gap-content-xl self-stretch pt-content-l", collapsed ? "items-center" : "items-start")}>
          {items.map(({ label, icon, isActive }) => (
            <li key={label} className={collapsed ? undefined : "self-stretch"}>
              <SidebarnavMenuItem href="#" label={label} icon={icon} isActive={isActive} showLabel={!collapsed} className={collapsed ? undefined : "flex w-full"} />
            </li>
          ))}
        </ul>
      </div>
      <ButtonIcon type="tertiary" size="s" aria-label="Settings" icon="settings" className={collapsed ? undefined : "w-full"} />
    </nav>
  )
}

export { Sidebarnav }

import type { ComponentContract } from "@/lib/contract"
import { sidebarnavCollapsed } from "./sidebarnav"

export const sidebarnavContract = {
  name: "sidebarnav",
  status: "Draft",
  version: "1.1.2",
  changelog: [
    { version: "1.1.2", date: "2026-11-06", changes: ["Menu item atom: on focus each padding is reduced by border-width-light, so the item no longer grows when the focus border appears (measured 117.1 x 56 in every status, 125.1 x 56 for isActive). isActive true + disable is drawn exactly like isActive false + disable, left padding included (Silvia). Both gaps removed."] },
    { version: "1.1.1", date: "2026-11-06", changes: [
      "Menu item (atom) checked against its snapshot: 7 variants (isActive false x active, hover, focus, disable; isActive true x active, hover, focus), all drawn. Real :hover and :focus-visible give the same looks for isActive false and true (the status prop only forces them). Documented the matrix and the gaps; the temporary atoms preview now shows isActive false and true x active, focus, hover, disable.",
    ] },
    { version: "1.1.0", date: "2026-11-04", changes: [
      "Built the section glyphs (one reusable group, docs/icons.md), the home (primary m), collapse (tertiary s, toggles the bar) and settings (tertiary s) button-icons, and the title (expanded only). New props: title; isCollapsed is now the starting state.",
    ] },
    { version: "1.0.0", date: "2026-11-04", changes: [
      "First build from the sidebarnav snapshot (isCollapsed false, true) and the internal atom _atom-sidebarnav-menu-item (node 40004009:5093), built in src/components/atoms/sidebarnav-menu-item.tsx.",
    ] },
  ],
  uses: ["_atom-sidebarnav-menu-item"],
  source: { figma: "https://www.figma.com/design/on8W6gIbhg4xI5P86pXAQw/The-library", node: "40004009:5066" },
  summary: "The vertical main navigation bar of the app: a list of menu items, expanded with labels or collapsed to a compact bar.",
  whenToUse: [
    "The main navigation between the areas of the app (Campaigns, Channels, Leads, Analytics, Interactions in the snapshot), at the left edge of the page.",
    "Composition: a column frame (nav) holding the menu, a column of menu items. Collapsed hides the labels.",
    "Atom menu item (_atom-sidebarnav-menu-item, documented here, no contract of its own): an inline link, radius small, padding content-m top and bottom, content-xs right, left content-xs (not current) or content-m (current). Label in text style title-h3, optional 12 arrow (arrow_forward_ios, Proposed), hidden by default. Statuses active, hover, focus, disable (7 snapshot variants; current has no disable). Real hover and keyboard focus (:focus-visible) apply the looks by themselves for both; the status prop only forces them. Not current: active text content-interactive-inactive; hover surface-neutral-subtle and text content-interactive-hover; focus surface-neutral-subtle, border border-width-light in stroke-brand-extrabold and text content-interactive-focus; disable text content-disabled-neutral-contrast. Current: active text content-interactive-active; hover surface-brand-subtle; focus surface-brand-extrasubtle with the same border. The current item has aria-current page.",
  ],
  whenNotToUse: [
    "Navigation inside text. That is links.",
    "Switching between views of one page. Tabs are not designed yet.",
  ],
  props: {
    isCollapsed: { type: "boolean", required: false, default: "true", description: "Figma variant isCollapsed (false | true; the Figma default is true). true is the compact bar: no labels, max width card-sidebar-compact. false is the expanded bar with labels, max width card-sidebar-expand." },
  },
  variants: { isCollapsed: sidebarnavCollapsed },
  states: ["expanded (isCollapsed false)", "collapsed (isCollapsed true)", "menu item: active, hover, focus, disable (not current and current)"],
  tokens: {
    colors: [
      "surface-neutral-extrasubtle (bar fill)",
      "stroke-neutral-light (right border)",
      "content-interactive-inactive, -active, -hover, -focus (menu item text)",
      "content-disabled-neutral-contrast (menu item disable text)",
      "surface-neutral-subtle, surface-brand-subtle, surface-brand-extrasubtle (menu item hover and focus fills)",
      "stroke-brand-extrabold (menu item focus border)",
    ],
    spacing: ["layout-2xl (padding top and bottom)", "layout-m (padding left and right, expanded)", "layout-s (padding left and right, collapsed)", "content-l (menu padding top; the snapshot name is content/large)", "content-xl (gap between menu items; the snapshot name is content/extralarge)", "content-m, content-s, content-xs (menu item padding and gap)"],
    radius: ["small (menu item)"],
    text: ["title-h3 (menu item label)"],
    size: ["card-sidebar-expand and card-sidebar-compact (max width)", "border-width-main (right border)", "border-width-light (menu item focus border)", "item-small (menu item arrow, 12)"],
  },
  rules: [
    "MUST NOT set colours per instance. They follow the menu item status and whether it is current.",
    "MUST mark the current page with isActive on its menu item (aria-current page).",
    "MUST use one sidebarnav per app.",
    "Content: labels are short plain text, as in the snapshot (Campaigns, Channels, Leads, Analytics, Interactions).",
  ],
  accessibility: [
    "A nav element with a list of links. The current item has aria-current page.",
    "Collapsed: the labels are hidden, so each item gets its label as its accessible name (aria-label). The snapshot's collapsed items carry the placeholder text 'Label'; the names come from the expanded variant. To confirm.",
    "Disabled item: aria-disabled and tabindex -1, the pointer is ignored.",
    "Contrast: not measured per status.",
  ],
  gaps: [
    "Section glyphs: built from the sections group in docs/icons.md (analytics bar_chart, leads gesture, campaigns campaign, interactions interests, channels airwave). Channels is airwave (confirmed by Silvia, 2026-11-04; she wrote airware, not a Material Symbol). The other four are Proposed until checked against the Figma glyphs.",
    "Title: the snapshot has the title text layer (fill text-header-brand, 48 high box, hidden when collapsed) but no text, text style or property. Built as the optional `title` prop, drawn in the expanded bar only, in text-title-h3 as a stand-in; the sample text \"Marketing Management\" comes from the Figma design, not from the snapshot.",
    "Button-icons: built as home (primary m), collapse (tertiary s, arrow_forward collapsed, arrow_back expanded, toggles the bar) and settings (tertiary s). Their icons are now named by the snapshot's swapNames: home and settings (set system) are confirmed, the collapse arrow is `stick` (set arrows) with right? True (collapsed, arrow_forward) and right? False (expanded, arrow_back, Proposed mirror). The accessible names \"Expand sidebar\", \"Collapse sidebar\", \"Home\" and \"Settings\" are not in the snapshot: stand-ins, to confirm. Home and settings do nothing yet (no routing or settings design).",
    "Menu content: the snapshot has no property for the items. The five items (Campaigns, Channels current, Leads, Analytics, Interactions) are the instance overrides of the expanded variant, built as fixed content. Items, hrefs, which item is current and routing are not designed; items link to '#'.",
    "Collapse behaviour: the collapse button toggles the bar (Silvia, 2026-11-04). isCollapsed is the starting state. Animation and where the state is stored (persisting it) are not designed.",
    "Height: 1288 fixed (not bound). Built as full height of the parent (h-full). Width 250 expanded is not bound either; it equals the max width token card-sidebar-expand.",
    "Menubar gap: the snapshot binds a gap of 56 to spacings/frame/extralarge, which is not in the theme (spacing-* has no frame tokens). It sits between the title, the primary button-icon and the menu, none of which are built, so no gap is drawn.",
    "Menu item min width 38 and the title box height 48 are raw values, not bound. Not built.",
    "Menu item hover while focused (:hover on a :focus-visible item), pressed and a transition are not in the snapshot: not built. Hover wins the fill, focus keeps its border.",
    "Menu item hover border (menuitem-active-hover-border, menuitem-inactive-hover-border) is transparent with width null: no border is drawn on hover.",
    "Collapsed padding: the collapsed frame is 80 wide at most (card-sidebar-compact) and hugs; with no glyphs the real width is not checked against the Figma sample.",
  ],
} satisfies ComponentContract

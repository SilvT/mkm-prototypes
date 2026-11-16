import type { ComponentContract } from "@/lib/contract"
import { linksStatuses, linksVisited } from "./links"

export const linksContract = {
  name: "links",
  status: "Draft",
  version: "1.0.1",
  changelog: [
    { version: "1.0.1", date: "2026-11-04", changes: ["Sync with the republished snapshot: bottom padding now binds to spacings/null (was spacings/content/2xs), so the content-2xs token is no longer used. Fills and strokes in the snapshot already matched the build."] },
    { version: "1.0.0", date: "2026-11-04", changes: ["First build from the links snapshot (status active, hover, focus, disabled; hasVisited false, true)."] },
  ],
  source: { figma: "https://www.figma.com/design/on8W6gIbhg4xI5P86pXAQw/The-library", node: "40004002:1165" },
  summary: "An inline text link in the info colour, underlined, that changes look when visited, hovered, focused or disabled.",
  whenToUse: [
    "A navigation or recovery action inside text or next to a field, such as 'ask to reset'.",
    "Composition: one inline element with a single text, hugging its content. The text is the `label` prop (Figma TEXT property 'label').",
  ],
  whenNotToUse: [
    "For an action that changes data. That is button.",
    "To name the status of a record. That is badge-status.",
  ],
  props: {
    status: { type: "LinksStatus", required: false, default: "active", description: "active, hover, focus or disabled. hover and focus also happen by themselves on pointer and keyboard; the prop forces the look (for example in stories). disabled sets aria-disabled and removes the link from the tab order." },
    hasVisited: { type: "boolean", required: false, default: "false", description: "Figma variant hasVisited (false | true). true gives the visited look: content-main text and a dashed underline." },
    label: { type: "string", required: false, default: "ask to reset", description: "The link text (Figma TEXT property 'label'). Default is the Figma sample text." },
  },
  variants: { status: linksStatuses, hasVisited: linksVisited },
  states: ["active", "hover", "focus", "disabled"],
  tokens: {
    colors: [
      "alert-info-content-contrast (unvisited text and underline)",
      "alert-info-content-main (visited text, dashed underline and focus box)",
      "alert-info-surface (hover background)",
      "text-disabled-neutral (disabled text)",
    ],
    spacing: ["null (top and bottom padding)", "content-xs (left and right padding)"],
    radius: [],
    text: ["body-b3"],
    size: ["border-width-light (underline and focus box)"],
  },
  rules: [
    "MUST NOT set colours per instance. They follow status and hasVisited.",
    "MUST give a real destination (href) unless status is disabled.",
    "Content: the label is plain text only (no icons, no nested elements).",
  ],
  accessibility: [
    "Disabled: the anchor gets role link, aria-disabled and tabindex -1, and ignores the pointer.",
    "Focus must be visible. For visited links Figma draws a dashed box; for unvisited links the focus look equals the active look (see Gaps), so keyboard focus is not distinguishable there.",
    "Visited is carried by underline style and colour; the underline style (solid or dashed) is not a text alternative.",
  ],
  gaps: [
    "Focus on an unvisited link (hasVisited=false) looks exactly like active in the snapshot. Built as in the snapshot; this fails a visible-focus expectation. Design decision pending.",
    "Disabled with hasVisited=true is not in the snapshot (only disabled/false). The component renders the same disabled look for both.",
    "Hover radius: the hover variants are bound to 'tbdep-radius/small', which is not in tokens/tokens.json. No radius is built.",
    "Visited state: Figma models it as a variant. Whether it follows the browser :visited state or an app decision is not designed; it is a prop.",
    "Hover on a visited link keeps its dashed underline and adds the surface; on an unvisited link the underline is removed. Built as in the snapshot; the reason for the difference is not stated.",
    "The Figma text layer is named 'errror message' (sic), but the sample text is 'ask to reset'. Whether links are meant only for error recovery is not stated.",
    "External links, icons, target and download behaviour are not designed.",
  ],
} satisfies ComponentContract

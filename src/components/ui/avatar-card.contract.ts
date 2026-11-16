import type { ComponentContract } from "@/lib/contract"
import { avatarCardStatuses } from "./avatar-card"

export const avatarCardContract = {
  name: "avatar-card",
  status: "Draft",
  version: "1.0.1",
  changelog: [
    { version: "1.0.1", date: "2026-11-04", changes: ["Fixed itemType prop type clash with the HTML itemType attribute."] },
    { version: "1.0.0", date: "2026-11-04", changes: ["First build."] },
  ],
  source: { figma: "https://www.figma.com/design/on8W6gIbhg4xI5P86pXAQw/The-library", node: "40004056:16529" },
  summary: "A compact row that shows one person: an avatar, their name and an optional notification count.",
  whenToUse: [
    "To show the current user (or one person) with an avatar, a name and a notification count, for example in navigation.",
  ],
  whenNotToUse: [
    "To show a group of people. Only one person is designed.",
    "As a disabled control. The designer notes that no disabled state is needed.",
  ],
  props: {
    status: { type: "AvatarCardStatus", required: false, default: "active", description: "Visual state: active, focus, hover or focus:hover. The component does not react to the pointer; the parent sets it." },
    hasNotifications: { type: "boolean", required: false, default: "true", description: "Shows the indicator-count (Figma BOOLEAN property)." },
    itemType: { type: "ReactNode", required: false, description: "The avatar (Figma INSTANCE_SWAP property, preferred value avatar-single). Defaults to an avatar-single with initials." },
    children: { type: "ReactNode", required: false, description: "The name text. Code-only: Figma has the text layer '$user' but publishes no TEXT property for it." },
  },
  variants: { status: avatarCardStatuses },
  states: [...avatarCardStatuses],
  tokens: {
    colors: ["surface-hidden, surface-brand-ultrasubtle, surface-brand-subtle, gradient-surface-extrasubtle (backgrounds)", "stroke-hidden, stroke-interactive-focus, stroke-brand-medium (borders)", "content-interactive-inactive (name text)"],
    spacing: ["content-xs (padding top, bottom, left)", "content-s (padding right)", "content-l (gaps)"],
    radius: ["medium"],
    text: ["body-b1 (name)"],
    size: [],
  },
  rules: [
    "MUST NOT set colours per instance. They follow status.",
    "MUST say who the person is in the name text; the avatar alone may not.",
    "MUST NOT build a disabled state.",
  ],
  accessibility: [
    "Not interactive on its own: no focus or hover handling. If the card is wrapped in a link or button, that parent owns keyboard use and the visible focus state.",
    "The notification count needs an accessible meaning from the parent (for example '7 notifications'); a bare number is not enough.",
  ],
  gaps: [
    "Notification count value: Figma overrides the indicator-count label to '7' but publishes no property for it. The indicator-count default label is used. Not built as a prop.",
    "Name text: the frame has two text layers ('text', body-b2, and '$user', body-b1), no TEXT properties. Only one text slot (children, body-b1) is built; what the body-b2 'text' layer is for is not designed.",
    "Avatar size: the instance is 48 wide by 50 high; avatar-single is built as a 48 square (see its Gaps).",
    "Avatar type in the card is photo in Figma; the default here is initials because the photo source is not designed. Pass an avatar-single type photo via itemType.",
    "Gap between the avatar and the text block, and padding, are bound as shown; the vertical sizing of the text block is 'fill' in Figma, centred here.",
    "Press and disabled states are not designed (the designer says disabled is not needed).",
    "The badge uses the indicator-count 'main, active, medium' variant with the default tertiary button mode; other combinations are not designed for this card.",
  ],
} satisfies ComponentContract

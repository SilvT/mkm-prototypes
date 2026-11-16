import type { ComponentContract } from "@/lib/contract"

export const cardContract = {
  name: "card",
  status: "Draft",
  version: "1.0.1",
  changelog: [
    { version: "1.0.1", date: "2026-11-06", changes: ["Gap sweep: the container-two alignment note moved from Gaps to Rules (a note on how it is built, no open question)."] },
    { version: "1.0.0", date: "2026-11-04", changes: ["First build from the card snapshot (slots container and container-two, boolean hasTwoContainers)."] },
  ],
  source: { figma: "https://www.figma.com/design/on8W6gIbhg4xI5P86pXAQw/The-library", node: "40004072:18026" },
  summary: "A bordered surface with a main container and an optional second container on a brand-subtle surface, each a free slot.",
  whenToUse: [
    "Group related content on a surface, with a second area beside it for a secondary block.",
    "Composition: one row, [container slot] + [optional container-two slot]. The slots are the `container` and `containerTwo` props; hasTwoContainers turns the second one on or off.",
  ],
  whenNotToUse: [
    "To show a single metric. That is kpi-card.",
    "Where the snapshot has no card: nothing here covers a card with a header, footer, image or actions.",
  ],
  props: {
    container: { type: "ReactNode", required: false, description: "Figma SLOT 'container': a centred column (padding content-2xl, gap content-l) that fills the available width." },
    containerTwo: { type: "ReactNode", required: false, description: "Figma SLOT 'container-two': a column (padding content-l, gap content-l) on surface-brand-subtle. Only drawn when hasTwoContainers is true." },
    hasTwoContainers: { type: "boolean", required: false, default: "true", description: "Figma BOOLEAN hasTwoContainers. Shows the second container." },
  },
  variants: {},
  states: [],
  tokens: {
    colors: ["surface-neutral-extrasubtle (card)", "surface-brand-subtle (container-two)", "stroke-brand-extrabold (border, bottom and left only)"],
    spacing: ["content-4xl (card horizontal padding)", "content-l (card vertical padding, gaps, container-two padding)", "content-2xl (container padding)", "border-width-strong (border, bottom and left)"],
    radius: ["large"],
    text: [],
    size: ["surfaces-xl (min width)"],
  },
  rules: [
    "Content alignment inside container-two: align-items flex-start and no vertical centring (unlike container). Built as in the snapshot.",
    "MUST NOT set colours or borders per instance.",
    "Slot content: use library components only; the card sets no text style, so content brings its own.",
  ],
  accessibility: [
    "The card is a plain container with no role. Order of the slots is the reading order: container, then container-two.",
  ],
  gaps: [
    "Size: 812 x 313, both fixed in the snapshot and not bound to a token (only the min width binds surfaces-xl). Not built: the card sizes to its content and its container. Fixed vs hug, and the height, are not decided.",
    "Border: the snapshot's CSS draws it on the bottom and left edges only (border-width strong, stroke-brand-extrabold); the Figma stroke sides are not stated in the snapshot properties. Built as bottom and left; a design check is needed.",
    "The two containers fill the width equally (flex 1). Whether container-two has a fixed or minimum width is not stated.",
    "No description, no dev notes and no states (hover, focus, selected) in the snapshot. The card is not interactive. Not built.",
    "What goes in the slots is not designed (no preferred values). No sample content.",
  ],
} satisfies ComponentContract

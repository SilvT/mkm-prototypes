import type { ComponentContract } from "@/lib/contract"
import { buttonSizes, buttonStatuses, buttonTypes } from "./button"

export const buttonContract = {
  name: "button",
  status: "Draft",
  version: "1.3.2",
  changelog: [
    { version: "1.3.2", date: "2026-11-06", changes: ["Gaps: the loader look is confirmed by Silvia (2026-11-06, looks correct in Storybook); that gap is removed."] },
    { version: "1.3.1", date: "2026-11-05", changes: [
      "Atom _atom-button-loader now animates (Proposed placeholder, not designed in Figma): the arc turns continuously, linear, 1s per turn, infinite, CSS only. Stage sets the angle the turn starts from. prefers-reduced-motion: no turn, the stage is shown still. No prop change.",
    ] },
    { version: "1.3.0", date: "2026-11-04", changes: [
      "Atom _atom-button-loader re-published with arc data: the loader is now a full ring (inner radius 0.87) with a 126.35 degree gradient arc on top, instead of two filled circles. Stage n starts the arc at (n - 1) * 45 degrees.",
      "The loading button now passes the loader colorWave by type, as in the snapshot: light on primary and inverse, dark on secondary and tertiary.",
    ] },
    { version: "1.2.0", date: "2026-11-04", changes: [
      "button-loader was renamed to the internal atom _atom-button-loader (Figma node 40002065:8807). The component moved to src/components/atoms/button-loader.tsx; its story and contract were removed and its values are documented here (uses, Composition, Gaps).",
      "No visual or prop change.",
    ] },
    { version: "1.1.2", date: "2026-11-04", changes: [
      "Snapshot re-published: only tokensUsed changed (the nested button-loader's tokens now count); no layout or property change, so no code change.",
      "Gaps: the loader now draws its fills (see button-loader); which colorWave the button passes is open.",
    ] },
    { version: "1.1.1", date: "2026-11-04", changes: [
      "Padding re-synced: vertical is now content-xs for every size (was content-s); horizontal unchanged (m content-m, s content-s, l content-l). Height hugs with min height touch-size, as in the snapshot.",
      "Gaps updated: icon size m now matches the snapshot (20); the icon-only button now exists as button-icon.",
    ] },
    { version: "1.1.0", date: "2026-11-04", changes: [
      "leadIcon and trailIcon are now IconName props (default arrow_forward, the Figma default stick), rendered with Icon. hasLeadIcon and hasTrailIcon show them. Icon size follows data-size through size-icon.",
    ] },
    { version: "1.0.0", date: "2026-11-04", changes: [
      "Rebuilt from the Figma snapshot, replacing the shadcn default (variants default, outline, secondary, ghost, destructive, link; sizes default, xs, sm, lg, icon). Nothing else in src used it.",
      "Props type (primary, secondary, tertiary, inverse), size (m, s, l), status, label, hasLeadIcon, hasTrailIcon, leadIcon, trailIcon.",
      "Colours come from the buttons-* tokens, switched per type with data-button. Added the status-* custom variants in src/index.css.",
    ] },
  ],
  uses: ["_atom-button-loader"],
  source: { figma: "https://www.figma.com/design/on8W6gIbhg4xI5P86pXAQw/The-library", node: "45:520" },
  summary: "A labelled button that triggers an action. The main action element.",
  whenToUse: [
    "Trigger an action: primary for the main action, secondary and tertiary for the others.",
    "One primary per card, modal or panel, placed last (on the right) and paired with a tertiary Cancel (Figma).",
    "Type inverse: only on a background of surface-brand-bold (Figma note).",
    "Composition: one inline element, [optional leading icon] + [label] + [optional trailing icon]. While loading, the icons are replaced by the button-loader.",
    "Atom button-loader (_atom-button-loader, documented here, no contract of its own): a round loading indicator, width and height from size-icon (14 s, 20 m, 32 l by data-size; 14 on its own in the snapshot), two stacked ring parts (radius circle, arc inner radius 0.87). Props stage 1 to 8 (default 1) and colorWave light or dark (default light; the button passes light for primary and inverse, dark for secondary and tertiary). base: a full ring, light surface-neutral-subtle at opacity-30, dark surface-brand-subtle at opacity-70. wave: an arc of 126.35 degrees starting at (stage - 1) * 45 degrees, light gradient-surface-extrasubtle-50 and -100, dark gradient-alert-info-0, -50 and -100. Motion (Proposed, not designed in Figma): the wave arc turns continuously, linear, 1s per turn, infinite (animate-button-loader, src/index.css); stage sets the start angle; under prefers-reduced-motion it does not turn and shows the stage. Not interactive, decorative, no accessible name of its own.",
  ],
  whenNotToUse: [
    "Two primaries in one card, modal or panel.",
    "Navigation inside text. That is links.",
    "A button with no label. Use button-icon.",
  ],
  props: {
    type: { type: "ButtonType", required: false, default: "primary", description: "primary, secondary, tertiary or inverse (Figma variant 'type'). Switches the buttons-* token mode with data-button. The native button type attribute is not exposed." },
    size: { type: "ButtonSize", required: false, default: "m", description: "m, s or l. Sets the padding and, with data-size, the min height (touch-size)." },
    status: { type: "ButtonStatus", required: false, default: "default", description: "The visual status from Figma. hover, focus, focus::hover, press and disable also happen by themselves (pointer, keyboard, disabled); the prop forces the look. loading is only set through the prop, and shows the button-loader." },
    label: { type: "string", required: false, default: "Label", description: "The label text (Figma TEXT property 'label'). Default is the Figma sample text." },
    hasLeadIcon: { type: "boolean", required: false, default: "true", description: "Figma boolean. Shows the leadIcon. Hidden while loading." },
    hasTrailIcon: { type: "boolean", required: false, default: "true", description: "Figma boolean. Shows the trailIcon. Replaced by the loader while loading." },
    leadIcon: { type: "IconName", required: false, default: "arrow_forward", description: "Figma instance swap 'leadIcon' (default icon stick = Material arrow_forward). A name from the icon registry (docs/icons.md)." },
    trailIcon: { type: "IconName", required: false, default: "arrow_forward", description: "Figma instance swap 'trailIcon'. See leadIcon." },
  },
  variants: { type: buttonTypes, status: buttonStatuses, size: buttonSizes },
  states: ["default", "hover", "focus", "focus::hover", "press", "disable", "loading", "hover-feedback (not built)"],
  tokens: {
    colors: [
      "buttons-default-background, buttons-default-content, buttons-default-border",
      "buttons-hover-background, buttons-hover-content, buttons-hover-border",
      "buttons-focus-background, buttons-focus-content, buttons-focus-border",
      "buttons-focus-hover-background, buttons-focus-hover-content, buttons-focus-hover-border",
      "buttons-press-background, buttons-press-content, buttons-press-border (also the loading look)",
      "buttons-disable-background, buttons-disable-content, buttons-disable-border",
    ],
    spacing: ["content-xs (padding top and bottom, all sizes)", "content-s (padding left and right for s)", "content-m (padding left and right for m; gap)", "content-l (padding left and right for l)"],
    radius: ["small"],
    text: ["body-b3"],
    size: ["icon (the icons; follows data-size: s 14, m 20, l 32)", "touch-size (min height; set by data-size: s atom-s, m atom-l, l atom-xl)", "buttons-*-border-thickness (border width per status)"],
  },
  rules: [
    "MUST NOT set colours per instance. They follow type and status.",
    "MUST use one primary per card, modal or panel.",
    "MUST use type inverse only on surface-brand-bold.",
    "Content: the label is plain text.",
  ],
  accessibility: [
    "A real button element (Base UI). Keyboard: focus shows the focus look; a disabled button ignores clicks.",
    "While loading, aria-busy is set and the pointer is ignored. The loader is decorative; the label stays.",
    "Axe (npm run test-a11y): the disable looks and type inverse (valid only on surface-brand-bold) are not checked for contrast in AllVariants; accepted via a story opt-out until decided.",
  ],
  gaps: [
    "Icon size: the snapshot shows 20 (m), 14 (s) and 32 (l) px icons, none bound to a token. Built with the size-icon token (data-size: 20 m, 14 s, 32 l), which matches.",
    "Icon names: Figma stick = arrow_forward is confirmed; other Figma icon names map to Material names that are Proposed, and custom icons with no Material equivalent are Gaps (see the icon contract and docs/icons.md).",
    "hover-feedback: the snapshot has a look for it (alert feedback gradient for primary, feedback-background for secondary, feedback-transparent with a border for tertiary), but not what triggers it or which alert type it follows. In the status list (it is a Figma value) but not built: it renders as default.",
    "Press on secondary and tertiary: the snapshot binds the press background to buttons-default-background, while loading uses buttons-press-background. Built with buttons-press-background for press. Which is right is a design decision.",
    "Min height: the snapshot hugs vertically with a min height bound to touch-size, shown as 24 (s), 32 (m) and 40 (l). In tokens.json, touch-size resolves to 24 (s), 40 (m) and 48 (l) (data-size modes), so m and l render 8 px taller than the Figma sample. Built with min-h-touch-size. Whether the Figma sample or the token modes are right is a design decision.",
    "Loading text: the loading variant's text layer is named 'Loading' and has no TEXT property. The label is kept, no 'Loading' copy is invented.",
    "Loader ellipse size: both ellipses are 13 px in a 14 px frame in the snapshot (raw value, not a token). Built filling the frame, so they follow size-icon. Whether the 1 px inset is intended is a design decision.",
    "Loader stages: the snapshot now rotates the arc by 45 degrees per stage (same fills and sizes). Motion is not designed in Figma. Built as a Proposed placeholder: the arc turns continuously, linear, 1s per turn, infinite, CSS only; stage is the start angle; prefers-reduced-motion shows the stage still. Duration, easing and whether stage should step are open design decisions.",
    "Loader border: the snapshot has a 0 width stroke in the base colour. Not built.",
    "Loader sizes: the snapshot shows the loader at 14 standalone and 20 in a button m; s and l are not shown. Built through size-icon.",
    "Disabled: the snapshot has a disable look; whether the disabled button stays focusable for assistive technology is not designed.",
    "Icon-only button: Figma says 'No label -> use btn-icon'. That is the button-icon component (a separate contract).",
    "Focus ring: only the border from the focus tokens is drawn (as in the snapshot). No separate outline or offset is designed.",
    "Inverse: the inverse token mode has no focus thickness, and no focus-hover content, border or thickness of its own, so those fall back to the root (primary) values. Not decided whether that is intended.",
    "Contrast: not measured per type and status. The disable looks use content-disabled-* tokens, which are likely below 4.5:1.",
  ],
} satisfies ComponentContract

import type { ComponentContract } from "@/lib/contract"
import { buttonIconSizes, buttonIconStatuses, buttonIconTypes } from "./button-icon"

export const buttonIconContract = {
  name: "button-icon",
  status: "Draft",
  version: "1.2.2",
  changelog: [
    { version: "1.2.2", date: "2026-11-06", changes: ["Gaps: the loader look is confirmed by Silvia (2026-11-06, looks correct in Storybook); that gap is removed."] },
    { version: "1.2.1", date: "2026-11-05", changes: [
      "Atom _atom-button-loader now animates (Proposed placeholder, not designed in Figma): the arc turns continuously, linear, 1s per turn, infinite, CSS only. Stage sets the angle the turn starts from. prefers-reduced-motion: no turn, the stage is shown still. No prop change.",
    ] },
    { version: "1.2.0", date: "2026-11-04", changes: [
      "Atom _atom-button-loader re-published with arc data: the loader is now a full ring (inner radius 0.87) with a 126.35 degree gradient arc on top, instead of two filled circles. Stage n starts the arc at (n - 1) * 45 degrees.",
      "The loading button now passes the loader colorWave by type, as in the snapshot: light on primary and inverse, dark on secondary and tertiary (shared with button).",
    ] },
    { version: "1.1.0", date: "2026-11-04", changes: [
      "button-loader was renamed to the internal atom _atom-button-loader (Figma node 40002065:8807). The component moved to src/components/atoms/button-loader.tsx; its story and contract were removed and its values are documented here (uses, Composition, Gaps).",
      "No visual or prop change.",
    ] },
    { version: "1.0.1", date: "2026-11-04", changes: [
      "Snapshot re-published: only tokensUsed changed (the nested button-loader's tokens now count); no layout or property change, so no code change.",
      "Gaps: the loader now draws its fills (see button-loader); which colorWave the button passes is open.",
    ] },
    { version: "1.0.0", date: "2026-11-04", changes: [
      "First build from the Figma snapshot: props type (primary, secondary, tertiary, inverse), size (s, m, l), status, icon.",
      "Looks reuse button (buttons-* tokens, status-* variants), exported from button.tsx.",
    ] },
  ],
  uses: ["_atom-button-loader"],
  source: { figma: "https://www.figma.com/design/on8W6gIbhg4xI5P86pXAQw/The-library", node: "2501:5549" },
  summary: "A button with only an icon and no visible label, for a compact action.",
  whenToUse: [
    "Trigger an action where the icon alone is clear and space is tight. This is the button to use when there is no label (Figma note on button).",
    "Same rules as button: one primary per card, modal or panel; type inverse only on a background of surface-brand-bold.",
    "Composition: one inline element with one icon, centred. While loading, the icon is replaced by the button-loader.",
    "Atom button-loader (_atom-button-loader, documented here, no contract of its own): a round loading indicator, width and height from size-icon (14 s, 20 m, 32 l by data-size; 14 on its own in the snapshot), two stacked ring parts (radius circle, arc inner radius 0.87). Props stage 1 to 8 (default 1) and colorWave light or dark (default light; the button passes light for primary and inverse, dark for secondary and tertiary). base: a full ring, light surface-neutral-subtle at opacity-30, dark surface-brand-subtle at opacity-70. wave: an arc of 126.35 degrees starting at (stage - 1) * 45 degrees, light gradient-surface-extrasubtle-50 and -100, dark gradient-alert-info-0, -50 and -100. Motion (Proposed, not designed in Figma): the wave arc turns continuously, linear, 1s per turn, infinite (animate-button-loader, src/index.css); stage sets the start angle; under prefers-reduced-motion it does not turn and shows the stage. Not interactive, decorative, no accessible name of its own.",
  ],
  whenNotToUse: [
    "When a label fits. That is button.",
    "Navigation inside text. That is links.",
    "Two primaries in one card, modal or panel.",
  ],
  props: {
    type: { type: "ButtonIconType", required: false, default: "primary", description: "primary, secondary, tertiary or inverse (Figma variant 'type'). Switches the buttons-* token mode with data-button. The native button type attribute is not exposed." },
    size: { type: "ButtonIconSize", required: false, default: "m", description: "s, m or l. Sets the padding, the icon size and, with data-size, the min width and min height (touch-size)." },
    status: { type: "ButtonIconStatus", required: false, default: "default", description: "The visual status from Figma. hover, focus, focus::hover, press and disable also happen by themselves (pointer, keyboard, disabled); the prop forces the look. loading is only set through the prop, and shows the button-loader." },
    icon: { type: "IconName", required: false, default: "arrow_forward", description: "Figma instance swap 'icon' (default icon stick = Material arrow_forward). A name from the icon registry (docs/icons.md)." },
  },
  variants: { type: buttonIconTypes, status: buttonIconStatuses, size: buttonIconSizes },
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
    spacing: ["content-xs (padding top and bottom, all sizes; all round for l)", "content-s (padding left and right for m and s)"],
    radius: ["small"],
    text: [],
    size: ["icon (the icon; follows data-size: s 14, m 20, l 32)", "touch-size (min width and min height; set by data-size: s atom-s, m atom-l, l atom-xl)", "buttons-*-border-thickness (border width per status)"],
  },
  rules: [
    "MUST give an accessible name through aria-label (the native attribute): there is no visible label. It is required in the types.",
    "MUST NOT set colours per instance. They follow type and status.",
    "MUST use one primary per card, modal or panel.",
    "MUST use type inverse only on surface-brand-bold.",
  ],
  accessibility: [
    "A real button element (Base UI). The accessible name comes from aria-label. Keyboard: focus shows the focus look; a disabled button ignores clicks.",
    "While loading, aria-busy is set and the pointer is ignored. The loader is decorative.",
    "Axe (npm run test-a11y): the disable looks and type inverse (valid only on surface-brand-bold) are not checked for contrast in AllVariants; accepted via a story opt-out until decided, as in button.",
  ],
  gaps: [
    "Width: the snapshot has a fixed width of 32 (m), 24 (s) and 40 (l) with min width bound to touch-size on m and l. With the icon (20, 14, 32) and the horizontal padding (8, 8, 4) the content is wider than the fixed width for m (36) and s (30), so the width is ambiguous. Built hugging, with min-w-touch-size; no fixed width.",
    "Touch size: in tokens.json touch-size resolves to 24 (s), 40 (m) and 48 (l), while the snapshot shows 24, 32 and 40. m and l render larger than the Figma sample (same as the button Gap).",
    "Icon size: 20 (m), 14 (s) and 32 (l) in the snapshot, none bound to a token. Built with the size-icon token, which matches.",
    "Icon names: Figma stick = arrow_forward is confirmed; other icons are Proposed or Gaps (see the icon contract and docs/icons.md).",
    "hover-feedback: in the status list (a Figma value) but not built: it renders as default. What triggers it is not designed (same as button).",
    "Press look: button-icon binds the press background and border to buttons-press-* for every type; button binds secondary press to buttons-default-background and has no tertiary press fill. Built with buttons-press-* for all (shared with button). Which is right is a design decision.",
    "Inverse is designed for size m only in the snapshot (as in button); s and l render with the same tokens.",
    "Loader ellipse size: both ellipses are 13 px in a 14 px frame in the snapshot (raw value, not a token). Built filling the frame, so they follow size-icon. Whether the 1 px inset is intended is a design decision.",
    "Loader stages: the snapshot now rotates the arc by 45 degrees per stage (same fills and sizes). Motion is not designed in Figma. Built as a Proposed placeholder: the arc turns continuously, linear, 1s per turn, infinite, CSS only; stage is the start angle; prefers-reduced-motion shows the stage still. Duration, easing and whether stage should step are open design decisions.",
    "Loader border: the snapshot has a 0 width stroke in the base colour. Not built.",
    "Loader sizes: the snapshot shows the loader at 14 standalone and 20 in a button m; s and l are not shown. Built through size-icon.",
    "Disabled: whether a disabled button stays focusable for assistive technology is not designed.",
    "Focus ring: only the border from the focus tokens is drawn (as in the snapshot). No separate outline or offset is designed.",
    "Accessible name: the snapshot has no label property or text. Requiring aria-label is a rule of this system, not a Figma decision.",
  ],
} satisfies ComponentContract

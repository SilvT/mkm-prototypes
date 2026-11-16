import type { ComponentContract } from "@/lib/contract"
import { bannerCtaStacks, bannerFeedbackTypes } from "./banner"

export const bannerContract = {
  name: "banner",
  status: "Draft",
  version: "1.0.0",
  changelog: [
    { version: "1.0.0", date: "2026-11-04", changes: ["First build from the banner snapshot (feedback-type warning, error, success, info; cta-stack horizontal, vertical; texts, icon swap, CTA slot)."] },
  ],
  source: { figma: "https://www.figma.com/design/on8W6gIbhg4xI5P86pXAQw/The-library", node: "2761:3354" },
  summary: "A persistent, important message across the top of the screen, coloured by its feedback type, with optional call-to-action buttons.",
  whenToUse: [
    "A message that must stay visible until the situation changes, such as a restricted inbox (Figma description: always at the top of the screen; persistent and important; can include CTAs).",
    "Composition: one row, [optional icon] + [secondary text + main text] on the left and the CTA slot on the right. The texts are the `secondaryText` and `mainText` props; the slot is `cta`.",
  ],
  whenNotToUse: [
    "A passing confirmation or a change in a metric. That is indicator-feedback.",
    "To name the status of a record. That is badge-status.",
    "To dismiss or interact with the banner itself: it is static and allows no action at the moment (Figma description).",
  ],
  props: {
    feedbackType: { type: "BannerFeedbackType", required: false, default: "warning", description: "Sets background and text colours (through data-alert) for the four types." },
    ctaStack: { type: "BannerCtaStack", required: false, default: "horizontal", description: "Direction of the CTA slot (horizontal or vertical). In vertical the text group is also stacked, as in the snapshot." },
    secondaryText: { type: "string", required: false, default: "Restricted inbox", description: "Figma TEXT secondary-text, drawn first in body-b4. Default is the Figma sample text." },
    mainText: { type: "string", required: false, default: "Your message won’t reach this user’s primary inbox.", description: "Figma TEXT main-text, drawn second in title-h5. Default is the Figma sample text." },
    icon: { type: "IconName", required: false, description: "Figma instance swap Icon. A registry name (docs/icons.md). No default: the Figma default (priority_high) is not in the registry, so no icon is drawn unless one is passed." },
    cta: { type: "ReactNode", required: false, description: "Figma SLOT 'CTA slot'. Preferred content (Figma): a button (tertiary, size s, no icons in the snapshot) or a text action. The slot is not drawn when empty." },
  },
  variants: { feedbackType: bannerFeedbackTypes, ctaStack: bannerCtaStacks },
  states: [],
  tokens: {
    colors: ["feedback-background (background)", "feedback-content-contrast (secondary text; main text for warning)", "feedback-content-main (main text for error, success and info)"],
    spacing: ["content-l (horizontal padding)", "content-s (vertical padding; gap in the text group and the CTA slot)", "content-2xl (gap between icon and texts)"],
    radius: ["small"],
    text: ["body-b4 (secondary text)", "title-h5 (main text)"],
    size: ["icon (follows the data-size mode)"],
  },
  rules: [
    "MUST sit at the top of the screen and stay visible (Figma description).",
    "MUST NOT set colours per instance. They follow feedbackType.",
    "The CTA slot takes buttons (tertiary, size s) or text actions only (Figma preferred values).",
    "Content: texts are plain text. Warning uses content-contrast for both texts (content-main on the warning tint is too light).",
  ],
  accessibility: [
    "The type is carried by the texts and the icon, not by colour alone: write the texts so they make sense without the colour.",
    "Axe (npm run test-a11y): the main text (title-h5 in feedback-content-main on feedback-background) fails color-contrast on the types that use content-main (measured 4.06:1 for success, 4.5:1 needed), as the snapshot binds it. AllVariants and Examples opt out (design decision pending); Playground (warning, content-contrast) passes.",
    "The banner is static. It has no role and no live region, so assistive technology reads it in page order; there is no announcement design.",
  ],
  gaps: [
    "The default icon (instance swap 26:4316, layer 'alert-error', glyph priority_high, 14 x 14) is not in the icon registry (only the arrows family is). Nothing is drawn unless `icon` is passed. The same glyph is used for all four types in the snapshot.",
    "Which TEXT property fills which text layer is not in the snapshot. Built as secondary-text = first layer (body-b4, feedback-content-contrast) and main-text = second layer (title-h5, feedback-content-main), by the token names. Proposed, needs a design check. For warning the snapshot uses contrast for both layers (the first as alert-warning-content-contrast).",
    "Width: 901, fixed, not bound to a token. Not built: the banner takes the width of its container. Fixed vs full width is not decided.",
    "The gap between the left side and the CTA slot is 28 in the snapshot and not bound to a token (the left side binds content-2xl for its own gap). Not built; space-between pushes the two apart.",
    "The text action instance (node 40004002:1079, status disabled in the snapshot sample) is a preferred CTA but is not a published component yet (the links component is a different node). Only the button is shown in stories. The snapshot samples a disabled text action and a vertical-stack width of 'fill' (textAction height 22 fixed): not built.",
    "In cta-stack=vertical the CTA children fill the slot width in the snapshot (button and text action 'FILL'). Not built: the slot is a column whose children keep their own width.",
    "The snapshot has no dismiss, no hover or focus design and no animation. Not built.",
    "Padding of a text action in the slot is bound to dimensions/12 and dimensions/16, which are not in the theme. Not built.",
  ],
} satisfies ComponentContract

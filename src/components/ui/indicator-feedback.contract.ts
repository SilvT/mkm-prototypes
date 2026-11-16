import type { ComponentContract } from "@/lib/contract"
import { feedbackTypes } from "./indicator-feedback"

export const indicatorFeedbackContract = {
  name: "indicator-feedback",
  status: "Draft",
  version: "1.3.2",
  changelog: [
    { version: "1.3.2", date: "2026-11-06", changes: ["The gap on the Proposed default icon names was removed: the Figma-to-Material mapping belongs to the icon contract and docs/icons.md (it is already a gap there); recorded as a rule here."] },
    { version: "1.3.1", date: "2026-11-06", changes: ["The gap on how screens choose the feedback type was removed: the logic belongs to the larger component the indicator is embedded in (Silvia); recorded as a rule. The icon control in Storybook now lists every registry icon."] },
    { version: "1.3.0", date: "2026-11-06", changes: ["New prop `icon` (Silvia: icons are elective and interchangeable between variants, not locked to a status): any registry icon on any feedbackType; the per-type icons are only the defaults. The gap about the arrow tied to the type is reduced to how screens choose the type."] },
    { version: "1.2.1", date: "2026-11-06", changes: ["The gap about 'up' reworded: nothing called up exists in the variants or properties; the question is that the arrow direction is tied to the type."] },
    { version: "1.2.0", date: "2026-11-06", changes: ["Value or subtitle is always shown (Silvia): the props are a union, hasValue false requires subtitle, so the empty indicator is no longer possible; the empty-render gap is removed. The icon stays optional in every combination."] },
    { version: "1.1.4", date: "2026-11-06", changes: ["The `right?` icon flag moved from Gaps to Rules: it is a documented decision (ignored in code, the icon follows feedbackType), not an open gap."] },
    { version: "1.1.3", date: "2026-11-06", changes: ["Code Connect gap removed: Silvia fixed the connections in Figma and marked it solved. A read of the Code Connect map right after still listed the three arrows icon instances on src/components/Icon/Icon.tsx and the time instance unmapped, which may be a stale read."] },
    { version: "1.1.2", date: "2026-11-06", changes: ["Code Connect gap narrowed after Silvia confirmed the component connection is right in Figma: only the nested icon instance mappings (three still pointing to a missing Icon path) and the missing prop template remain."] },
    { version: "1.1.1", date: "2026-11-06", changes: ["Gaps reviewed against the live Figma component and the Code Connect map: icon names and Figma icon set restated, max width 120 noted as built, the Code Connect gap rewritten (the DeltaChip mapping is gone; the IndicatorFeedback mapping has no template and the icon instances point to a missing path). The snapshot (2026-11-03) was not republished."] },
    { version: "1.1.0", date: "2026-11-04", changes: [
      "Icons now render with Icon (Material Symbols registry) instead of lucide placeholders: success trending_up, error trending_down, warning align_vertical_center, info schedule. All Proposed (docs/icons.md).",
    ] },
    { version: "1.0.0", date: "2026-11-03", changes: ["First build with its contract (renamed from delta-chip)."] },
  ],
  source: { figma: "https://www.figma.com/design/on8W6gIbhg4xI5P86pXAQw/The-library", node: "40004111:3312" },
  summary: "A small inline indicator that shows a value, an optional subtitle and an icon, coloured by feedback type.",
  whenToUse: ["Show the change or state of a metric next to it, for example in a KPI card."],
  whenNotToUse: [
    "As a status label for an item such as Active or Paused. That is the status badge (separate component, not built).",
    "As a button or link. It is not interactive.",
  ],
  props: {
    feedbackType: { type: "FeedbackType", required: false, default: "success", description: "Sets the colour through data-alert and the default icon. The icon can be swapped with `icon`; it is not locked to the type." },
    value: { type: "string", required: false, description: "Formatted value, e.g. '10%'. Follow docs/content-rules.md formats. Not rendered when hasValue is false." },
    hasValue: { type: "boolean", required: false, default: "true", description: "Figma hasValue. false hides the value text and then `subtitle` is required (enforced by types)." },
    subtitle: { type: "string", required: false, description: "Short qualifier, e.g. 'vs last month'. Figma hasSubtitle is this prop being present: there is no hasSubtitle prop. Omit subtitle to turn it off." },
    hasIcon: { type: "boolean", required: false, default: "true", description: "Figma hasIcon. false hides the icon." },
    icon: { type: "IconName", required: false, description: "Figma instance swap on the nested icon instance (not a published Figma property). Any registry icon (docs/icons.md); Silvia (2026-11-06): icons are elective by the user and interchangeable between variants, not locked to a status. Default: success trending_up, error trending_down, warning align_vertical_center, info schedule (Proposed)." },
  },
  variants: { feedbackType: feedbackTypes },
  states: [],
  tokens: {
    colors: ["feedback-background", "feedback-content-contrast"],
    spacing: ["content-xs", "content-s"],
    radius: ["small"],
    text: ["displays-n4 (value)", "body-b4 (subtitle)"],
    size: ["surfaces-xs (max width 120px)", "icon (variable-size, follows data-size: L 32, M 20, S 14; utility size-icon)"],
  },
  rules: [
    "MUST pass the value already formatted and without a sign it does not need; direction is carried by type and icon, not by a sign.",
    "MUST NOT set colours per instance. They follow feedbackType. The icon is the exception: it is elective, so any registry icon can be passed with `icon` on any type (Silvia, 2026-11-06); without it the default per type shows.",
    "Default icon per type follows Figma (success growth right? True, error growth right? False, warning align center, info schedule); how those Figma names map to the Material glyphs is Proposed and tracked in the icon contract and docs/icons.md, not here.",
    "The feedback type (and so the colour) is chosen by the component that embeds the indicator, for example a KPI card; the indicator does not decide it. A falling cost that is good is that parent's logic, not a gap of the indicator.",
    "MUST show the value or the subtitle, or both (Silvia, 2026-11-06): hasValue=false requires a subtitle, enforced by types. The icon can be on or off in every case: value only, subtitle only, or both, each with or without the icon.",
    "The Figma `right?` icon flag (growth right? True for success, False for error) is a designer convenience and is not a prop: the icon follows feedbackType in code (docs/icons.md).",
    "The subtitle is truncated at the max width. Keep it short.",
  ],
  accessibility: [
    "The icon is decorative (aria-hidden). Meaning is carried by colour, icon and a visually hidden type label ('Success: ').",
    "Contrast of feedback-content-contrast on feedback-background MUST be checked (axe).",
    "Not interactive: no focus, no hover state.",
  ],
  gaps: [
    "Max width 120 is built (max-w-surfaces-xs, Figma maxWidth 120) and the subtitle truncates at it. Figma has no min width. Not designed: a min width, and what happens with a long value (only the subtitle truncates).",
  ],
} satisfies ComponentContract

import type { ComponentContract } from "@/lib/contract"
import { badgeStatusSizes, badgeStatusTypes } from "./badge-status"

export const badgeStatusContract = {
  name: "badge-status",
  status: "Draft",
  version: "2.2.7",
  changelog: [
    { version: "2.2.7", date: "2026-11-06", changes: ["Republished snapshot (2026-11-06 16:59): the dot instance layers are now named _atom-status-dot (8 of 8, none left with _atom-badge-dots), so that gap is closed and removed."] },
    { version: "2.2.6", date: "2026-11-06", changes: ["The pending-dot decision moved from Gaps to Rules: it is a decision (Silvia), not an open gap, so it no longer shows as a GAP."] },
    { version: "2.2.5", date: "2026-11-06", changes: ["Atom _atom-status-dot re-synced: the frame is 8 wide (content-s, fixed) and the circle fills it with aspect ratio 1:1; same look. The badge-status snapshot itself was not republished, so the dot layer name gap stays."] },
    { version: "2.2.4", date: "2026-11-06", changes: ["Gaps: the pending dot is only for Tabs (Silvia), so badge-status does not expose it; recorded as decided."] },
    { version: "2.2.3", date: "2026-11-05", changes: ["Atom _atom-status-dot: the pending dot border is now dashed as in the snapshot (it was drawn solid because border-solid was set for both types)."] },
    { version: "2.2.2", date: "2026-11-05", changes: ["Atom _atom-status-dot re-synced: the dot radius is now bound to border-radius/circle (rounded-circle; was 20, rounded-large). The 2 top padding is intentional: it aligns the dot with the centre of the text x-height (Silvia), so it is documented, no longer a gap."] },
    { version: "2.2.1", date: "2026-11-04", changes: ["Atom _atom-status-dot re-synced: the circle fill is now in the snapshot (active = feedback-content-main, border width null), so it is no longer Proposed. The atom now also draws type=pending (feedback-transparent fill, feedback-content-main border, width subtle). badge-status still renders active only."] },
    { version: "2.2.0", date: "2026-11-04", changes: ["The dot atom follows the Figma rename _atom-badge-dots -> _atom-status-dot. Atoms have no story and no contract: its values are now documented here, and the badge-dots story and contract are gone.", "Added uses: [\"_atom-status-dot\"]."] },
    { version: "2.1.2", date: "2026-11-04", changes: ["Text style re-synced: body-b1 (main) and body-b2 (small) instead of title-h3 and title-h4.", "The dot is now the badge-dots atom (8 px circle in a 20 px frame with 2 px top padding) instead of an inline circle."] },
    { version: "2.1.1", date: "2026-11-04", changes: ["Decisions recorded: Disabled never has a dot (the dot marks something active); the label is free text, so the same label on two types is not a gap."] },
    { version: "2.1.0", date: "2026-11-04", changes: ["Added size variant (main, small); small uses padding content-s."] },
    { version: "2.0.1", date: "2026-11-04", changes: ["Padding re-synced to content-l."] },
    { version: "2.0.0", date: "2026-11-04", changes: ["Breaking: children prop replaced by label prop.", "Added minimum width and height (surfaces-2xs, atom-xs)."] },
    { version: "1.0.0", date: "2026-11-03", changes: ["First build, label passed as children."] },
  ],
  /** Internal atoms (snapshot role atom) this component renders. Their values are documented here, not in a contract of their own. */
  uses: ["_atom-status-dot"],
  source: { figma: "https://www.figma.com/design/on8W6gIbhg4xI5P86pXAQw/The-library", node: "40004111:3544" },
  summary: "A coloured label with an optional dot that names the status of an item, such as Active, Pending, Lost or Closed.",
  whenToUse: [
    "Show the current status of a record (campaign, lead) next to or inside it.",
    "Composition: one inline element, [optional dot (the _atom-status-dot atom)] + [one-word label], centred, hugging its content. The label is the `label` prop (Figma TEXT property 'label').",
  ],
  whenNotToUse: [
    "To show a changing metric or a trend. That is indicator-feedback.",
    "As a button or filter. It is not interactive.",
  ],
  props: {
    feedbackType: { type: "BadgeStatusType", required: false, default: "success", description: "Sets colours (and the dot colour) for the five statuses." },
    size: { type: "BadgeStatusSize", required: false, default: "main", description: "main (padding content-l, text body-b1) or small (padding content-s, text body-b2). Padding and text style differ in the snapshot." },
    hasDot: { type: "boolean", required: false, default: "true", description: "Dot before the label. Never shown for 'disabled', as in Figma." },
    label: { type: "string", required: false, default: "Label", description: "The label text. One word (docs/content-rules.md status chip pattern). Default is the Figma sample text." },
  },
  variants: { feedbackType: badgeStatusTypes, size: badgeStatusSizes },
  states: [],
  tokens: {
    colors: ["feedback-transparent (background)", "feedback-content-main (error text, dot)", "feedback-content-contrast (success, warning, info text)", "surface-neutral-subtle (disabled background)", "content-disabled-neutral-main (disabled text)"],
    spacing: ["content-l (padding, all sides, size main)", "content-s (padding, all sides, size small)", "content-xs (gap)", "content-2xs (top padding of the dot frame, atom _atom-status-dot)", "border-w-null (dot border width, active)", "border-w-subtle (dot border width, pending; the atom only)"],
    radius: ["medium", "circle (the dot, atom _atom-status-dot)"],
    text: ["body-b1 (size main)", "body-b2 (size small)"],
    size: ["surfaces-2xs (min width)", "atom-xs (min height; also the dot frame height, 20)", "content-s (dot circle, 8)"],
  },
  rules: [
    "Dot geometry (atom _atom-status-dot, type=active): a 20 high frame (atom-xs) with 2 top padding (content-2xs) and an 8 circle (content-s, radius circle, filled feedback-content-main, border width null). The 2 top padding is intentional: it aligns the dot with the centre of the text x-height, so the dot sits 1 px above the centre of its frame (Silvia, 2026-11-05).",
    "MUST use one word for the label. Sentence case.",
    "MUST NOT show the dot type=pending in badge-status (Silvia, 2026-11-06): the atom _atom-status-dot designs and draws it (feedback-transparent fill, dashed feedback-content-main border, width subtle), but pending is only used when the dot is inside Tabs. The badge snapshot only instances type=active and has no property to choose it.",
    "Disabled never has a dot. The dot decorates something that is active (a small pulse animation may come later), so hasDot is ignored for disabled.",
    "MUST NOT set colours per instance. They follow feedbackType.",
    "Error text uses feedback-content-main and the other alert types use feedback-content-contrast. This is deliberate (Silvia): content-main only passes contrast on error. Measured over white, AA is 4.5:1: error main 4.67 (passes), info main 4.51 (marginal), success main 4.06 (fails), warning main 1.52 (fails); content-contrast is 6.63 or better for all four.",
    "Content: the label prop is plain text only (no icons, no links, no nested elements). The dot is rendered by the component (_atom-status-dot, type active), never passed in label.",
  ],
  accessibility: [
    "The dot is decorative (aria-hidden). The status is carried by the label text, never by colour alone.",
    "Axe (npm run test-a11y): success, warning, error and info pass contrast on the 15% tint. Disabled fails color-contrast (1.39:1, #cdd2d4 on #f4f5f6), accepted via a story opt-out until decided.",
    "Disabled text is exempt from WCAG contrast but should stay readable. Not interactive: no focus or hover.",
  ],
  gaps: [
    "A pulse animation for the dot was mentioned as a possibility; it is not designed.",
  ],
} satisfies ComponentContract

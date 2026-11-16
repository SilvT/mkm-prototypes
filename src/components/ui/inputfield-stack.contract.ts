import type { ComponentContract } from "@/lib/contract"
import { inputfieldStackStacks, inputfieldStackStatuses } from "./inputfield-stack"

export const inputfieldStackContract = {
  name: "inputfield-stack",
  status: "Draft",
  version: "2.0.0",
  changelog: [
    { version: "2.0.0", date: "2026-11-06", changes: ["inputfield-base 2.0.0 removed `hasBottomText` (derived from `message`); the stack passes every base prop through, so it is gone here too. The Figma boolean on the instance stays Figma-only."] },
    { version: "1.1.0", date: "2026-11-06", changes: ["Stack status now drives the field: inactive makes the field inactive, active leaves it automatic. Added the Proposed prop fieldStatus (not in Figma) that forces the field status (inactive, active, readonly, hover, focus). Two gaps rewritten."] },
    { version: "1.0.1", date: "2026-11-05", changes: ["Gaps: the stack status not reaching the field is now recorded with its effect (feedback visible only on hover or focus); decision postponed."] },
    { version: "1.0.0", date: "2026-11-05", changes: ["First build from the inputfield-stack snapshot (status inactive, active; stack vertical, horizontal; TEXT label): a label and an inputfield-base, the label tied to the input with for/id."] },
  ],
  source: { figma: "https://www.figma.com/design/on8W6gIbhg4xI5P86pXAQw/The-library", node: "40004001:13230" },
  summary: "A label and an inputfield-base stacked above (vertical) or beside (horizontal) each other.",
  whenToUse: [
    "Any text field that needs a visible label. This is the field with its label; inputfield-base alone has only an aria-label.",
    "Composition: [label text] + [inputfield-base instance]. All inputfield-base props (type, hasInput, hasFeedback, feedbackIcon, message, placeholder, inputText, visibilityToggle) pass through unchanged.",
  ],
  whenNotToUse: [
    "A field with no visible label: use inputfield-base with an aria-label.",
  ],
  props: {
    label: { type: "string", required: false, default: "Label", description: "Figma TEXT label. Default is the Figma sample text. Also the input's accessible name (aria-label) and the label element text (for/id)." },
    status: { type: "InputfieldStackStatus", required: false, default: "active", description: "Figma variant status (inactive | active). The label colour follows it: inputfield-label (active) or inputfield-disable-label (inactive). inactive also makes the field inactive; active leaves the field on its automatic status (hover, focus). Silvia, 2026-11-06." },
    fieldStatus: { type: "InputfieldBaseStatus", required: false, description: "Proposed (Silvia, 2026-11-06), not a Figma property: forces the field's own status (inactive, active, readonly, hover, focus). Overrides what `status` gives the field. Needed to force hover, focus and readonly, and to see error and success feedback without hovering." },
    stack: { type: "InputfieldStackStack", required: false, default: "vertical", description: "Figma variant stack. vertical: label above the field, gap content-s, both fill the width. horizontal: label beside the field, gap content-m, both hug, items centred." },
    "...inputfield-base props": { type: "ComponentProps<InputfieldBase> minus status, id, className, aria-label", required: false, description: "Passed to the inputfield-base instance. See the inputfield-base contract." },
  },
  variants: { status: inputfieldStackStatuses, stack: inputfieldStackStacks },
  states: ["inactive", "active"],
  tokens: {
    colors: ["inputfield-label (active label)", "inputfield-disable-label (inactive label)"],
    spacing: ["content-s (gap, vertical)", "content-m (gap, horizontal)"],
    radius: [],
    text: ["body-b2 (label)"],
    size: [],
  },
  rules: [
    "MUST NOT set an aria-label on the stack: the label text names the input.",
    "MUST NOT set colours per instance. They follow status (label) and the field's own status and hasFeedback.",
    "The input id is generated; callers cannot set `id` on the field.",
  ],
  accessibility: [
    "A native label element with htmlFor tied to the input id, plus aria-label equal to the label text (inputfield-base requires an aria-label).",
    "Everything else comes from inputfield-base (native input, aria-invalid, aria-describedby for the bottom messages).",
  ],
  gaps: [
    "The snapshot's inputField-base instance has the same overrides in all four variants (status inactive, hasInput false, hasFeedback null, no message, feedbackIcon true, visibilityToggle true): it reads as a placeholder and is not followed. Decided (Silvia, 2026-11-06): stack status=inactive makes the field inactive, status=active leaves it automatic.",
    "The stack `status` name collides with inputfield-base `status`, so the field's own status is forced through the Proposed, code-only prop `fieldStatus` (Silvia, 2026-11-06). Figma has no such property; whether Figma should get one (or the stack variant a different name, e.g. labelStatus) is open.",
    "inactive + horizontal has a fixed height of 33 in the snapshot (the other variants hug). Not built (hug).",
    "Width: root fills (297.5 in the snapshot, not a token). Horizontal: the stack frame is 'flex 1 0 0' while label and field hug; so the field does not grow to fill the row. Built as hug.",
    "Whether horizontal supports a bottom message, and how the bottom message aligns beside a label, is not designed. Built as inputfield-base renders it.",
    "The inner field's own instance property names (hasInput, showCursor ...) are exposed as in inputfield-base; showCursor remains not built (see the inputfield-base contract).",
    "The snapshot description (readonly, hasTrailIcon, trailbutton, hasBottomText) is the inputfield-base one, copied: nothing new for the stack.",
    "No required marker, helper text or label-to-field spacing token other than content-s / content-m appears in the snapshot. Not built.",
  ],
} satisfies ComponentContract

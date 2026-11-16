import type { ComponentContract } from "@/lib/contract"
import { avatarSingleTypes } from "./avatar-single"

export const avatarSingleContract = {
  name: "avatar-single",
  status: "Draft",
  version: "1.2.0",
  changelog: [
    { version: "1.2.0", date: "2026-11-06", changes: ["The width utility gap is closed: scripts/build-css.py now generates w-atom-* from the size/atom tokens and the avatar uses w-atom-xl with aspect-square. Gap left: sizes other than 48 (settings flows) are not designed."] },
    { version: "1.1.1", date: "2026-11-06", changes: ["Status dot gap removed: not designed and not planned (Silvia); recorded as a rule."] },
    { version: "1.1.0", date: "2026-11-06", changes: ["Gaps reviewed with Silvia: photo source, photo size and clipping, photo fill, initials padding, three-letter initials and interactive states are not gaps (prototype scope, or confirmed behaviour) and moved to Rules; two gaps remain (width utility and larger sizes, status dot)."] },
    { version: "1.0.1", date: "2026-11-06", changes: ["Gap review against the live Figma component (unchanged since the 2026-11-03 snapshot): initials and typography gaps restated with the real numbers; the dev-notes gap on the width token removed (the binding to size/atom/xl = 48 is verified, so nothing is open)."] },
    { version: "1.0.0", date: "2026-11-04", changes: ["First build."] },
  ],
  source: { figma: "https://www.figma.com/design/on8W6gIbhg4xI5P86pXAQw/The-library", node: "40004056:16524" },
  summary: "A square avatar with rounded corners that stands for one person: their initials, or a photo.",
  whenToUse: [
    "To identify one person by their initials (type initials, the Figma default).",
    "To identify one person by a photo (type photo), once the photo source is designed (see Gaps).",
  ],
  whenNotToUse: [
    "To show a group of people. Only the single avatar is designed.",
    "To show a count. That is indicator-count.",
  ],
  props: {
    type: { type: "AvatarSingleType", required: false, default: "initials", description: "initials (brand fill with inverted text) or photo (frame for a picture)." },
    content: { type: "string", required: false, default: "JS", description: "The initials text (Figma TEXT property 'Content'). Default is the Figma sample text. Shown for type initials only." },
    src: { type: "string", required: false, description: "Image URL for type photo. Code-only: Figma draws the photo frame but has no image property. Decided by Silvia: use src/assets/avatar-placeholder.png as the placeholder in stories." },
    alt: { type: "string", required: false, default: "", description: "Alt text for the photo. Empty by default (decorative); set it when the photo identifies a person without a visible name." },
  },
  variants: { type: avatarSingleTypes },
  states: [],
  tokens: {
    colors: ["surface-brand-medium (initials background)", "content-brand-inverted-medium (initials text)"],
    spacing: [],
    radius: ["large"],
    text: ["title-h1 (initials)"],
    size: ["atom-xl (48, applied as min height with a square aspect ratio, Proposed)"],
  },
  rules: [
    "Photo: src and alt are code-only props (Figma draws the photo frame but publishes no image property). The prototype does not design the real image source (upload, URL); stories use src/assets/avatar-placeholder.png.",
    "A photo larger than the box is clipped to the square (the frame clips, the image covers it). Correct behaviour (Silvia, 2026-11-06).",
    "The box is a square, 48 by 48 (width bound to size-atom-xl). Square aspect confirmed (Silvia).",
    "No status dot on the avatar: not designed and not planned (Silvia, 2026-11-06).",
    "Initials are one or two characters, never more: a plain text element inside the 48 by 48 box, centred, no padding and no auto layout in Figma. Not enforced in code (content is a string).",
    "No interactive states (hover, press, focus, disabled): they do not apply to avatar-single. They belong to avatar-card.",
    "MUST pass one or two letters as content. Plain text only.",
    "MUST NOT set colours or size per instance. They follow type.",
    "MUST NOT use it for more than one person.",
  ],
  accessibility: [
    "Initials alone may not name the person to a screen reader. The surrounding element MUST say who it is (for example the person's name next to it).",
    "Not interactive: no focus, no hover.",
    "Contrast of content-brand-inverted-medium on surface-brand-medium is checked by axe on the initials story.",
  ],
  gaps: [
    "Sizes other than 48 are not designed. The avatar may render larger in the user settings flows (for example when cropping a photo); built with w-atom-xl and aspect-square, so a className can set another width and the box stays square.",
  ],
} satisfies ComponentContract

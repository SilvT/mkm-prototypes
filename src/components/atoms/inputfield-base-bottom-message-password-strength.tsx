// Internal atom (Figma _atom-inputField-base_bottom-message-password-strength, node 170:1472, role atom). No story, no contract, not importable by screens.
// Parent: inputfield-base (its contract `uses` it and documents these values).
// Column: padding content-2xs top and bottom, spacings-null left and right, gap content-xs. Row 1: 14 icon + bar (fills, gap content-xs). Row 2: text body-b5 in alert-info-content-contrast (padding content-2xs sides, wraps).
// Bar: a track (surface-neutral-subtle, 4 high, the same in all four feedbacks; republished by Silvia 2026-11-05, was content-neutral-extrasubtle) holding a coloured segment ("low"/"high") as a share of its width. Segment = gradient: error alert-error-0 -> alert-error-100, warning alert-warning-0 -> alert-warning-70, success alert-success-0 -> alert-success-100. inactive has no segment.
// Icons (size S: data-size s on the root, size-icon 14): inactive lock, success check, warning priority_high, error emergency_home. Colour: confirmed by the snapshot iconPaint (2026-11-06): error alert-error-content-main, warning alert-warning-content-main, success alert-success-content-main, inactive content-brand-medium.
// Text (fixed copy built in, not a prop): CHECKED against the republished snapshot textContent (2026-11-06, source: snapshot; variant order error, warning, success, inactive): all four identical to Silvia's screenshot copy below; the only difference is a trailing space on success ("Strong password! "), not kept. The warning copy has no leading space in the snapshot.
// Inactive: no segment, the grey track (surface-neutral-subtle) stays visible.
// Width: DECIDED (Silvia, 2026-11-06): fills the input's width (Figma "fill"; w-full), the snapshot's 251 is not built. Strength rules (what is weak, medium, strong) are not designed.
// Open gaps (not built): segment widths are fixed pixels in the snapshot (error 74.33, warning 148.67 = 2x) with no total: the segment is drawn as 1/3, 2/3 and full of the bar, which is Proposed, not a decision;
//   the snapshot text layer has no characters (the copy is Silvia's); hasBottomMessage (BOOLEAN) hides the text row; the "error text" frame has padding sides content-xs in the snapshot (code had content-2xs: now content-xs).
import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"

export const inputfieldStrengthFeedbacks = ["inactive", "success", "warning", "error"] as const
export type InputfieldStrengthFeedback = (typeof inputfieldStrengthFeedbacks)[number]

const iconByFeedback = { inactive: "lock", success: "check", warning: "priority_high", error: "emergency_home" } as const
const iconColor = { inactive: "text-content-brand-medium", success: "text-alert-success-content-main", warning: "text-alert-warning-content-main", error: "text-alert-error-content-main" } as const
const messageByFeedback = {
  inactive: "Password must be at least 5 characters.",
  success: "Strong password!",
  warning: "Not too hard. Try adding numbers or symbols",
  error: "Weak! Try adding numbers or symbols",
} as const

const segment = {
  inactive: "hidden",
  error: "w-1/3 bg-linear-to-r from-gradient-alert-error-0 to-gradient-alert-error-100",
  warning: "w-2/3 bg-linear-to-r from-gradient-alert-warning-0 to-gradient-alert-warning-70",
  success: "w-full bg-linear-to-r from-gradient-alert-success-0 to-gradient-alert-success-100",
} as const

type InputfieldStrengthProps = ComponentProps<"div"> & {
  /** Figma variant "feedback". */
  feedback?: InputfieldStrengthFeedback
  /** Figma BOOLEAN "hasBottomMessage". */
  hasBottomMessage?: boolean
}

function InputfieldBottomMessagePasswordStrength({ feedback = "inactive", hasBottomMessage = true, className, ...props }: InputfieldStrengthProps) {
  return (
    <div data-slot="inputfield-base-bottom-message-password-strength" data-feedback={feedback} data-size="s" className={cn("flex w-full flex-col gap-content-xs px-null py-content-2xs", className)} {...props}>
      <div className="flex items-center gap-content-xs">
        <Icon name={iconByFeedback[feedback]} className={iconColor[feedback]} />
        <div className="flex h-content-xs flex-1 items-stretch bg-surface-neutral-subtle">
          <span className={segment[feedback]} />
        </div>
      </div>
      {hasBottomMessage && <p className="flex flex-wrap px-content-xs text-body-b5 text-alert-info-content-contrast">{messageByFeedback[feedback]}</p>}
    </div>
  )
}

export { InputfieldBottomMessagePasswordStrength }

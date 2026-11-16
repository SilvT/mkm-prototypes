// Internal atom (Figma _character-counter, node 2517:12765, role atom). No story, no contract, not importable by screens.
// No published parent yet: when one exists, move these values into the parent contract (and list the atom in its `uses`).
// Tokens: text body-b4; gap content-2xs; current value alert-{error,success,info}-content-main,
//   content-disabled-neutral-main (disabled); reference value always content-disabled-neutral-main.
// Separator: snapshot text node "dash" (text body-b4, fill content-disabled-neutral-main, hug) between the two values, same gap. Its character is not in the snapshot (no characters field); "/" per Silvia (2026-11-05).
// Feedback rules (Silvia, 2026-11-06; create-campaign flow only for now, the reference may change with the context of use, not designed beyond it):
//   success = entry equals the reference (goal); error = entry differs (longer or shorter); disabled = nothing is being tracked (no input in the field);
//   info = only when the reference is a suggestion, not a hard restriction: never derived, the caller passes feedback="info". warning is not built (not needed).
// When `feedback` is not passed it is derived from the two values by deriveCounterFeedback: no entry (currentValue "", undefined or "0", a count of zero characters) -> disabled; equal -> success; different -> error.
// Open gaps (not built):
//   content-disabled-neutral-main (#cdd2d4) fails AA on the page background (1.49:1 at 10 px), design decision pending;
//   body-b4 is 10 px, legibility not decided; no screen reader label designed; whether disabled should be hidden from assistive technology is not designed.
import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

export const characterCounterFeedbacks = ["error", "success", "info", "disabled"] as const
export type CharacterCounterFeedback = (typeof characterCounterFeedbacks)[number]

// Only the current value changes colour; the reference value is always content-disabled-neutral-main.
// No warning: the Figma set has a warning look (alert-warning-content-contrast) but Silvia decided (2026-11-06) it is not needed, so it is not built.
const current = {
  error: "text-alert-error-content-main",
  success: "text-alert-success-content-main",
  info: "text-alert-info-content-main",
  disabled: "text-content-disabled-neutral-main",
} as const

/** Derives the feedback when the caller passes none (create-campaign flow rules, Silvia 2026-11-06). Never returns info. */
export function deriveCounterFeedback(currentValue?: string, referenceValue?: string): "disabled" | "success" | "error" {
  const entry = (currentValue ?? "").trim()
  if (entry === "" || entry === "0") return "disabled"
  return entry === (referenceValue ?? "").trim() ? "success" : "error"
}

type CharacterCounterProps = ComponentProps<"span"> & {
  /** Figma variant "Feedback". When not passed it is derived from currentValue and referenceValue (see deriveCounterFeedback). */
  feedback?: CharacterCounterFeedback
  /** Figma TEXT property "Current value". */
  currentValue?: string
  /** Figma TEXT property "Reference value". */
  referenceValue?: string
}

function CharacterCounter({ feedback: feedbackProp, currentValue = "0", referenceValue = "8", className, ...props }: CharacterCounterProps) {
  const feedback = feedbackProp ?? deriveCounterFeedback(currentValue, referenceValue)
  return (
    <span data-slot="character-counter" data-feedback={feedback} className={cn("inline-flex items-center justify-center gap-content-2xs text-body-b4", className)} {...props}>
      <span className={current[feedback]}>{currentValue}</span>
      <span className="text-content-disabled-neutral-main">/</span>
      <span className="text-content-disabled-neutral-main">{referenceValue}</span>
    </span>
  )
}

export { CharacterCounter }

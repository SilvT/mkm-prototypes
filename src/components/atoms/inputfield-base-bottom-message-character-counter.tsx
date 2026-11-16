// Internal atom (Figma _atom-inputField-base_bottom-message-character-counter, node 2859:10862, role atom). No story, no contract, not importable by screens.
// Parent: inputfield-base (its contract `uses` it and documents these values).
// Row: space between, an instance of the info atom (left, fills; variant password, icon swapped to pin at size S, text body-b4 in content-neutral-bold, which overrides the info colour; the pin icon is content-brand-strong, confirmed by the snapshot iconPaint 2026-11-06) and the _character-counter atom (hugs, padding 2, gap 4).
// Copy "Must be 8 numbers" is FIXED and built in, not a prop. CHECKED against the republished snapshot textContent (2026-11-06, source: snapshot): all four variants carry "Must be 8 numbers " (only a trailing space, not kept). The "/" of the _character-counter atom was NOT republished: still unverified.
// Variants feedback = error | info | success | inactive pick the counter instance: Error, Info, Success; inactive shows the counter's Disabled feedback (content-disabled-neutral-main). The snapshot's inactive variant draws no feedback override on its counter instance; Silvia's rule (2026-11-06) is disable, so the former reuse of Success is dropped.
// Feedback rules (Silvia, 2026-11-06; create-campaign flow only, the reference may change with the context of use, not designed beyond it): success = entry equals the reference (goal); error = entry differs (longer or shorter); inactive = no input in the field being tracked; info = only when the reference is a suggestion, not a hard restriction.
// `feedback` stays the Figma variant prop. When not passed it is derived (deriveCounterFeedback in character-counter): no entry (currentValue "", undefined or "0") -> inactive; equal -> success; different -> error. info is never derived: the caller passes feedback="info".
// Width: DECIDED (Silvia, 2026-11-06): the row fills the input's width (w-full), the snapshot's 375 is not built; the parent slot forces the input's width.
// Info atom padding/gap bind dimensions/2 and dimensions/4 (not in the theme): content-2xs and content-xs have the same values.
// Open gaps (not built): the group is 18 high (not bound); the counter wrapper padding is not rebuilt (the counter atom has none);
//   the snapshot draws the left side as a plain frame "bottom-message/info" (not an instance) and "password" is ambiguous between info types "password info" and "password characters" (same render once the icon is pin); the info atom's own frame heights are not bound.
import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { CharacterCounter, deriveCounterFeedback } from "./character-counter"
import { InputfieldBottomMessageInfo } from "./inputfield-base-bottom-message-info"

export const inputfieldCounterFeedbacks = ["error", "info", "success", "inactive"] as const
export type InputfieldCounterFeedback = (typeof inputfieldCounterFeedbacks)[number]

type InputfieldCounterProps = ComponentProps<"div"> & {
  /** Figma variant "feedback". When not passed it is derived from currentValue and referenceValue. */
  feedback?: InputfieldCounterFeedback
  currentValue?: string
  referenceValue?: string
}

const message = "Must be 8 numbers" // fixed copy (Silvia, 2026-11-05, Figma screenshot): a binding requirement of the input, not a prop

function InputfieldBottomMessageCharacterCounter({ feedback: feedbackProp, currentValue = "0", referenceValue = "8", className, ...props }: InputfieldCounterProps) {
  const auto = deriveCounterFeedback(currentValue, referenceValue)
  const derived = feedbackProp ?? (auto === "disabled" ? "inactive" : auto)
  return (
    <div data-slot="inputfield-base-bottom-message-character-counter" data-feedback={derived} className={cn("flex w-full items-center justify-between", className)} {...props}>
      <InputfieldBottomMessageInfo type="password info" icon="pin" text={message} className="flex-1 text-content-neutral-bold [&_svg]:text-content-brand-strong" />
      <CharacterCounter feedback={derived === "inactive" ? "disabled" : derived} currentValue={currentValue} referenceValue={referenceValue} className="p-content-2xs" />
    </div>
  )
}

export { InputfieldBottomMessageCharacterCounter }

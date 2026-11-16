// Internal atom (Figma _atom-inputField-base_feedback, node 40004018:6284, role atom). No story, no contract, not importable by screens.
// Parent: inputfield-base (its contract `uses` it and documents these values).
// Frame: 24 x 24 (size-atom-s as min height, 1/1), holding a button-icon (type secondary, size s: padding content-s / content-xs, radius small, min size touch-size).
// Fill: success = alert-success-surface-transparent, error = alert-error-surface-transparent, capslock = the buttons-default-background of button-icon (so nothing extra).
// Glyphs (Silvia, 2026-11-04): success = check, error = close (Material Symbols), capslock = MDI apple-keyboard-caps (docs/icons.md, Proposed until checked against Figma).
// Accessible names (Proposed, approved by Silvia 2026-11-06; the snapshot has none): success "Valid input", error "Invalid input", capslock "Caps Lock is on", as the default of `label` (aria-label of the inner button-icon).
import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { ButtonIcon } from "@/components/ui/button-icon"
import type { IconName } from "@/components/ui/icon"

export const inputfieldFeedbackTypes = ["success", "capslock", "error"] as const
export type InputfieldFeedbackType = (typeof inputfieldFeedbackTypes)[number]

const nameByType = { success: "Valid input", capslock: "Caps Lock is on", error: "Invalid input" } as const satisfies Record<InputfieldFeedbackType, string>

const glyph = { success: "check", capslock: "mdi_apple_keyboard_caps", error: "close" } as const satisfies Record<InputfieldFeedbackType, IconName>

// The button-icon sets its background with `[background:var(...)]` and its text colour with text-*; the same forms here let cn() replace them (a bg-* class lost to the shorthand).
// Icon colour: error and success use their alert content-main tokens; capslock keeps the button-icon default (buttons-default-content = content-brand-medium, as in the snapshot).
const look = {
  success: "[background:var(--alert-success-surface-transparent)] text-alert-success-content-main",
  capslock: "",
  error: "[background:var(--alert-error-surface-transparent)] text-alert-error-content-main",
} as const

type InputfieldFeedbackProps = Omit<ComponentProps<"span">, "children"> & {
  /** Figma variant "feedbackType". */
  feedbackType?: InputfieldFeedbackType
  /** Figma instance swap inside the button-icon. Defaults to the glyph of the feedbackType. */
  icon?: IconName
  /** Accessible name of the inner icon button (not a Figma property). Default follows the feedbackType (nameByType, Proposed). */
  label?: string
}

function InputfieldFeedback({ feedbackType = "error", icon, label, className, ...props }: InputfieldFeedbackProps) {
  return (
    <span data-slot="inputfield-base-feedback" data-type={feedbackType} className={cn("inline-flex min-h-atom-s aspect-square items-center justify-center", className)} {...props}>
      <ButtonIcon type="secondary" size="s" aria-label={label ?? nameByType[feedbackType]} icon={icon ?? glyph[feedbackType]} className={look[feedbackType]} />
    </span>
  )
}

export { InputfieldFeedback }

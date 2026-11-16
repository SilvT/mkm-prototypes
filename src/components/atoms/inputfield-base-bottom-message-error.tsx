// Internal atom (Figma _atom-inputField-base_bottom-message-error, node 170:1419, role atom). No story, no contract, not importable by screens.
// Parent: inputfield-base (its contract `uses` it and documents these values).
// Frame: fills the width of its parent (Silvia, 2026-11-06, Figma "fill"; block-level flex, w-full), padding content-2xs, gap content-xs, items centred. Row: optional 14 icon + text body-b4 in alert-error-content-main.
// `type` = Figma variant "error type" (10 values, default "ask to reset" as in the snapshot). Copy per type (errorTextByType) from the republished snapshot's textContent (2026-11-06), type read from the order of layout.variants plus the wording; only "ask to reset" has the link layout in the snapshot.
// `hasLink` is ACCEPTED (Silvia, 2026-11-06) and stays an explicit prop; its default follows the type (true only for "ask to reset"). true = the former "ask to reset" layout: text group + reset group holding the text "Did you forget it?" and a links instance.
// Link layout: the text is a wrapping frame (padding 0 / content-xs) holding the type's text and a "reset" group (gap content-2xs, items start) with the reset text and a links instance (status active, hasVisited false, label "ask to reset"; instance overrides: padding sides content-2xs, top and bottom null (spacings/null); Silvia 2026-11-05: the link text takes the atom's text style body-b4, set by className because the links component has no prop for it).
// Icon: close (snapshot, in the icon registry), default of `icon`, size S (data-size s on the root, size-icon 14). Without a link the text FILLs the row (flex-1).
// Width: DECIDED (Silvia, 2026-11-06): every bottom-text atom fills the input's width (Figma "fill"); the parent slot forces the input's width, so the 251 and 375 fixed widths of the snapshot are not built.
// Open gaps (not built): the reset text "Did you forget it?" and the link label "ask to reset" are fixed (no property in the snapshot); the Figma BOOLEAN "Trail icon" turns the icon on and off (its name says trail, the icon is drawn first).
import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"
import type { IconName } from "@/components/ui/icon"
import { Link } from "@/components/ui/links"

export const inputfieldErrorTypes = ["length", "empty", "@ missing", "no match", "ask to reset", "wrong user", "date entry", "Only numbers", "phone", "editable"] as const
export type InputfieldErrorType = (typeof inputfieldErrorTypes)[number]

// Default copy per type, from the snapshot textContent (2026-11-06); "ask to reset" has two texts: its main text here, "Did you forget it?" as the reset text.
const errorTextByType = {
  length: "Your password must be at least 5 characters",
  empty: "Field is empty",
  "@ missing": "Email must contain a single @",
  "no match": "Your passwords don\u2019t match",
  "ask to reset": "Invalid password.",
  "wrong user": "Invalid username",
  "date entry": "Date must follow dd/mm/yy",
  "Only numbers": "Only numbers, spaces, and symbols (+, -)",
  phone: "Please enter a valid phone number",
  editable: "introduce your error text",
} as const satisfies Record<InputfieldErrorType, string>

const resetText = "Did you forget it?"

type InputfieldErrorProps = ComponentProps<"span"> & {
  /** Figma variant "error type". Default copy follows it (errorTextByType). */
  type?: InputfieldErrorType
  /** Accepted (Silvia, 2026-11-06): the two layouts. true = text, reset text and an "ask to reset" link; false = icon and text. Default follows `type` (true only for "ask to reset"). */
  hasLink?: boolean
  /** Figma BOOLEAN "Trail icon". */
  hasTrailIcon?: boolean
  /** Figma instance swap of the 14 icon (default close, as in the snapshot). A registry icon name. */
  icon?: IconName
  /** Figma TEXT "Error text". Overrides the default copy of the type. */
  text?: string
}

function InputfieldBottomMessageError({ type = "ask to reset", hasLink = type === "ask to reset", hasTrailIcon = true, icon = "close", text = errorTextByType[type], className, ...props }: InputfieldErrorProps) {
  return (
    <span data-slot="inputfield-base-bottom-message-error" data-type={type} data-has-link={hasLink} data-size="s" className={cn("flex w-full items-center gap-content-xs p-content-2xs text-body-b4 text-alert-error-content-main", className)} {...props}>
      {hasTrailIcon && icon && <Icon name={icon} />}
      {hasLink ? (
        <span className="flex flex-wrap px-content-xs gap-y-content-xs">
          <span>{text}</span>
          <span className="flex items-start gap-content-2xs"><span>{resetText}</span><Link status="active" label="ask to reset" className="py-null px-content-2xs text-body-b4" /></span>
        </span>
      ) : (
        <span className="flex-1">{text}</span>
      )}
    </span>
  )
}

export { InputfieldBottomMessageError }

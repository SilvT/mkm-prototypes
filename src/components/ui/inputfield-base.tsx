import { useId, useState } from "react"
import type { ComponentProps, JSXElementConstructor } from "react"
import { Input } from "@base-ui/react/input"
import { cn } from "@/lib/utils"
import { ButtonIcon } from "@/components/ui/button-icon"
import { InputfieldFeedback } from "@/components/atoms/inputfield-base-feedback"
import { InputfieldBottomMessageError } from "@/components/atoms/inputfield-base-bottom-message-error"
import { InputfieldBottomMessageInfo } from "@/components/atoms/inputfield-base-bottom-message-info"
import { InputfieldBottomMessageCharacterCounter } from "@/components/atoms/inputfield-base-bottom-message-character-counter"
import { InputfieldBottomMessagePasswordStrength } from "@/components/atoms/inputfield-base-bottom-message-password-strength"

export const inputfieldBaseStatuses = ["inactive", "active", "readonly", "hover", "focus"] as const
export type InputfieldBaseStatus = (typeof inputfieldBaseStatuses)[number]
// Input types (Silvia, 2026-11-04: these for now, more will come with the field + label composition). Only password changes behaviour (the visibility toggle).
export const inputfieldBaseTypes = ["text", "email", "password", "tel", "number", "search"] as const
export type InputfieldBaseType = (typeof inputfieldBaseTypes)[number]
export const inputfieldBaseFeedbacks = ["null", "error", "success"] as const
export type InputfieldBaseFeedback = (typeof inputfieldBaseFeedbacks)[number]

// One look per (status, hasFeedback). hasInput is not a prop: the frame switches to the placeholder look with the `has-[input:placeholder-shown]:` variant, so an empty field
// (never typed, or typed then deleted, also after leaving it) shows the placeholder look and a field with any value shows the filled look. Full class names are written out so Tailwind finds them.
// Colours sit on the frame; the input inherits the text colour (also its placeholder).
// Borders: top, left and right use inputfield-border-box (null), the bottom uses inputfield-border-bottom (light); focus uses the focus-border-* widths.
// Border colour: the snapshot names inputfield-active-border-color (not a token) for active, hover and focus without feedback; Silvia (2026-11-06): use inputfield-border-color for all active variants.
// inactive with feedback is a stub in the snapshot (an empty instance), and readonly with feedback does not exist: both use the plain look.
const box = "border-solid border-(length:--inputfield-border-box) border-b-(length:--inputfield-border-bottom)"
const focusBox = "border-solid border-(length:--inputfield-focus-border-box) border-b-(length:--inputfield-focus-border-bottom)"
const disabledLook = "bg-inputfield-disable-background border-inputfield-disable-border-color"

function look(status: InputfieldBaseStatus, feedback: InputfieldBaseFeedback) {
  if (feedback !== "null" && status !== "inactive" && status !== "readonly") {
    const text = "text-inputfield-feedback-content has-[input:placeholder-shown]:text-inputfield-feedback-placeholder"
    const border = "border-inputfield-feedback-border-color"
    if (status === "hover") return cn(box, "bg-inputfield-feedback-background", border, text)
    if (status === "focus") return cn(focusBox, "bg-inputfield-focus-background", border, text)
    return cn(box, "has-[input:placeholder-shown]:bg-inputfield-background", border, text)
  }
  switch (status) {
    case "active":
      return cn(box, "border-inputfield-border-color text-inputfield-content has-[input:placeholder-shown]:bg-inputfield-background has-[input:placeholder-shown]:text-inputfield-placeholder")
    case "hover":
      return cn(box, "bg-inputfield-hover-background border-inputfield-border-color text-inputfield-interactive-content")
    case "focus":
      return cn(focusBox, "bg-inputfield-focus-background border-inputfield-border-color text-inputfield-interactive-content")
    case "readonly":
      return cn(box, disabledLook, "text-inputfield-disable-content has-[input:placeholder-shown]:text-inputfield-disable-placeholder")
    default:
      return cn(box, "border-inputfield-border-color text-inputfield-content has-[input:placeholder-shown]:bg-inputfield-disable-background has-[input:placeholder-shown]:border-inputfield-disable-border-color has-[input:placeholder-shown]:text-inputfield-placeholder")
  }
}

// Empties an uncontrolled or controlled input the way typing would: set the native value, then fire `input` so React onChange and Base UI see it.
function clearInput(el: HTMLInputElement) {
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set?.call(el, "")
  el.dispatchEvent(new Event("input", { bubbles: true }))
}

type MessageProps<C extends JSXElementConstructor<any>> = Omit<ComponentProps<C>, "className" | "children" | "ref">

/** One bottom message. `kind` picks the atom; the rest are that atom's own props. Screens never import the atoms. */
export type InputfieldBaseMessage =
  | ({ kind: "error" } & MessageProps<typeof InputfieldBottomMessageError>)
  | ({ kind: "info" } & MessageProps<typeof InputfieldBottomMessageInfo>)
  | ({ kind: "character-counter" } & MessageProps<typeof InputfieldBottomMessageCharacterCounter>)
  | ({ kind: "password-strength" } & MessageProps<typeof InputfieldBottomMessagePasswordStrength>)

type Kind<K extends InputfieldBaseMessage["kind"]> = Extract<InputfieldBaseMessage, { kind: K }>
type Pair<A extends InputfieldBaseMessage["kind"], B extends InputfieldBaseMessage["kind"]> = readonly [Kind<A>, Kind<B>] | readonly [Kind<B>, Kind<A>]

/** Figma slot bottom-text: min 1, max 2 layers, stacked vertically. Silvia (2026-11-04): each atom once, info and error never together. The pairs below are every allowed combination. */
export type InputfieldBaseMessages =
  | Exclude<InputfieldBaseMessage, { kind: "password-strength" }>
  | Pair<"character-counter", "info">
  | Pair<"character-counter", "error">

/** type=password (spec "Input Type = Password"): password-strength is only for this type, alone or with error, in that order; no other pair. */
export type InputfieldBasePasswordMessages = InputfieldBaseMessage | Pair<"password-strength", "error">

function renderMessage(m: InputfieldBaseMessage) {
  switch (m.kind) {
    case "error": { const { kind, ...rest } = m; void kind; return <InputfieldBottomMessageError key="error" {...rest} /> }
    case "info": { const { kind, ...rest } = m; void kind; return <InputfieldBottomMessageInfo key="info" {...rest} /> }
    case "character-counter": { const { kind, ...rest } = m; void kind; return <InputfieldBottomMessageCharacterCounter key="character-counter" {...rest} /> }
    case "password-strength": { const { kind, ...rest } = m; void kind; return <InputfieldBottomMessagePasswordStrength key="password-strength" {...rest} /> }
  }
}

type InputfieldBaseCommon = Omit<ComponentProps<"input">, "size" | "children" | "type" | "readOnly"> & {
  /** Figma variant "hasFeedback" (values null | error | success). */
  hasFeedback?: InputfieldBaseFeedback
  /** Figma BOOLEAN "feedbackIcon": the feedback atom after the text. */
  feedbackIcon?: boolean
  /** Figma TEXT "placeholder". */
  placeholder?: string
  /** Figma TEXT "input-text": the starting text of the field (uncontrolled). Empty = the placeholder shows. The user can edit it; Escape clears it. */
  inputText?: string
  /** Accessible name. The snapshot has no label, so this is required (native attribute, not a Figma property). */
  "aria-label": string
}

type InputfieldBasePasswordProps = InputfieldBaseCommon & {
  /** Replaces the Figma SLOT "bottom-text" and the BOOLEAN "hasBottomText" (Figma-only, derived: no message = no bottom text). One message, or two allowed together, stacked vertically. `kind` picks the atom (error, info, character-counter, password-strength). */
  message?: InputfieldBasePasswordMessages
  /** Native input type, from the draft contract (not a Figma property). */
  type: "password"
  /** Figma BOOLEAN "visibilityToggle": always on for password (spec); the only value allowed is true. */
  visibilityToggle?: true
  /** Figma variant "status". Password has no readonly status (spec). */
  status?: Exclude<InputfieldBaseStatus, "readonly">
  /** Password is never readonly (spec). */
  readOnly?: false
}

type InputfieldBaseOtherProps = InputfieldBaseCommon & {
  /** Replaces the Figma SLOT "bottom-text" and the BOOLEAN "hasBottomText" (Figma-only, derived: no message = no bottom text). One message, or two allowed together, stacked vertically. `kind` picks the atom (error, info, character-counter). */
  message?: InputfieldBaseMessages
  /** Native input type, from the draft contract (not a Figma property). */
  type?: Exclude<InputfieldBaseType, "password">
  /** Figma BOOLEAN "visibilityToggle": only password has the toggle, so for every other type it is false (the only value allowed). */
  visibilityToggle?: false
  /** Figma variant "status". Leave unset for the real look: inactive, then hover and focus follow the pointer and keyboard. Set it to force a look (readonly also sets the native readOnly). */
  status?: InputfieldBaseStatus
  readOnly?: boolean
}

type InputfieldBaseProps = InputfieldBasePasswordProps | InputfieldBaseOtherProps

function InputfieldBase({ type = "text", visibilityToggle, status, hasFeedback = "null", feedbackIcon = true, placeholder = "placeholder text", inputText, message, className, onFocus, onBlur, onKeyDown, onKeyUp, onMouseDown, readOnly, "aria-describedby": describedByProp, ...props }: InputfieldBaseProps) {
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [capsLock, setCapsLock] = useState(false)
  const [textShown, setTextShown] = useState(false)
  const messageId = useId()
  const current: InputfieldBaseStatus = status ?? (focused ? "focus" : hovered ? "hover" : "inactive")
  const isReadonly = current === "readonly" || readOnly
  const showFeedback = hasFeedback !== "null" && current !== "inactive" && current !== "readonly"
  // One feedback state at a time: error or success win; capslock shows only while Caps Lock is on and nothing else is shown.
  const feedbackType = showFeedback ? hasFeedback : capsLock ? "capslock" : undefined
  const messages = message ? ("kind" in message ? [message] : message) : []
  const hasMessage = messages.length > 0
  const describedBy = [describedByProp, hasMessage ? messageId : undefined].filter(Boolean).join(" ") || undefined
  const isPassword = type === "password"
  const showToggle = isPassword && !isReadonly
  // Toggle and feedback icon share one group; nothing is reserved while the icon is absent. Capslock shows even when feedbackIcon is false.
  const showFeedbackIcon = feedbackType !== undefined && (feedbackIcon || feedbackType === "capslock")
  void visibilityToggle // password always draws the toggle; the prop only mirrors the Figma boolean and is not forwarded to the input
  return (
    <div data-slot="inputfield-base" data-status={current} data-alert={showFeedback ? hasFeedback : undefined} className={cn("flex w-full min-w-surfaces-xs flex-col items-stretch gap-content-s", className)}>
      <div
        className={cn("flex items-center pl-content-xs pr-content-s has-[input:-webkit-autofill]:bg-alert-info-surface-transparent has-[input:autofill]:bg-alert-info-surface-transparent", look(current, hasFeedback))}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Input
          key={inputText}
          type={isPassword && textShown ? "text" : type}
          aria-describedby={describedBy}
          readOnly={isReadonly}
          aria-invalid={hasFeedback === "error" || undefined}
          placeholder={placeholder}
          defaultValue={inputText}
          // Autofill: browsers paint their own colour on an autofilled input. Best effort (not stable across browsers): the frame takes the info surface from the palette here, and the input keeps its transparent look through the autofill rules in src/index.css.
          // Inactivity (snapshot dev notes, effects/ghost-inactive): text and placeholder dim in the inactive status only; the token is applied as opacity-(--effects-ghost-inactive) (see contract Gaps).
          className={cn("min-w-null flex-1 bg-transparent p-content-s text-body-b3 outline-none placeholder:text-inherit", current === "inactive" && "placeholder-shown:opacity-(--effects-ghost-inactive)")}
          onFocus={(e) => { setFocused(true); onFocus?.(e) }}
          // type number: text the browser cannot read as a number leaves the value empty but the text visible; clear it on leaving so the placeholder shows again.
          onBlur={(e) => { setFocused(false); setCapsLock(false); if (type === "number" && e.currentTarget.validity.badInput) clearInput(e.currentTarget); onBlur?.(e) }}
          // Escape empties the field while the user is in it (only when there is something to clear, so Escape still reaches a dialog around an empty field).
          onKeyDown={(e) => { setCapsLock(e.getModifierState("CapsLock")); if (e.key === "Escape" && !isReadonly && e.currentTarget.value !== "") { e.preventDefault(); e.stopPropagation(); clearInput(e.currentTarget) } onKeyDown?.(e) }}
          onKeyUp={(e) => { setCapsLock(e.getModifierState("CapsLock")); onKeyUp?.(e) }}
          // A focus event cannot report Caps Lock, so a click that focuses the field reads it from the mouse event. Tab reaches it through keyup.
          onMouseDown={(e) => { setCapsLock(e.getModifierState("CapsLock")); onMouseDown?.(e) }}
          {...props}
        />
        {(showToggle || showFeedbackIcon) && (
          <span className="flex items-center gap-content-xs">
            {showToggle && (
              <ButtonIcon type="tertiary" size="s" className={cn("border-w-light border-stroke-hidden status-hover:border-w-light status-press:border-w-light", current === "inactive" && "in-has-[input:placeholder-shown]:opacity-(--effects-ghost-inactive)")} aria-label={textShown ? "Hide password" : "Show password"} aria-pressed={textShown} icon={textShown ? "visibility" : "visibility_off"} onClick={() => setTextShown((v) => !v)} />
            )}
            {showFeedbackIcon && <InputfieldFeedback feedbackType={feedbackType} />}
          </span>
        )}
      </div>
      {hasMessage && <div id={messageId} className="flex w-null min-w-full flex-col items-stretch gap-content-xs">{messages.map(renderMessage)}</div>}
    </div>
  )
}

export { InputfieldBase }

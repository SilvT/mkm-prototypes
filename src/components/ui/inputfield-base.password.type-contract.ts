import type { TypeContract } from "@/lib/contract"

export const passwordTypeContract = {
  extends: "inputfield-base",
  type: "password",
  version: "1.3.0",
  changelog: [{ version: "1.3.0", date: "2026-11-06", changes: ["Enforced by types (Silvia decided): password has no readonly status (status excludes readonly, readOnly only false) and the toggle is never drawn for a readonly field; visibilityToggle is always on (only true is allowed); password-strength is allowed alone or with error in that order, and is removed from the pairs of every other type; info stays alone. Not enforced: strength only in create-new-password flows, and a stack fieldStatus=readonly with type password (the stack casts it)."] },{ version: "1.2.0", date: "2026-11-06", changes: ["Behaviour rules from the Figma spec \"Input Type = Password\" (node 40004136:4251, file on8W6gIbhg4xI5P86pXAQw), read via the Figma MCP. The spec is the second source beside the snapshot: it holds what the snapshot cannot record (required parts, forbidden combinations, readonly). Figma Specs is in early beta, so re-check these rules on the next read. Several rules are not enforced in code (see gaps). Only the markdown text was read; the Do and Don't boards are embedded canvases and were not read."] }, { version: "1.1.0", date: "2026-11-06", changes: ["Related messages: strength atom, info types password info and password characters, and error types no match, ask to reset and length are only for type password (Silvia). Not enforced in code."] }, { version: "1.0.0", date: "2026-11-06", changes: ["First type contract. Facts from inputfield-base.tsx and the bottom-message atoms; strength rules and toggle names are gaps."] }],
  summary: "A field for a secret. The text is masked, and a visibility toggle shows or hides it. See the inputfield-base contract for everything else.",
  appliesWhen: "type is \"password\".",
  nativeAttributes: [
    "input type=\"password\" while hidden. While shown it is switched to type=\"text\" (state textShown, local to the component).",
    "No autocomplete, inputMode or minLength is set by the component.",
  ],
  specifics: [
    "Visibility toggle (prop visibilityToggle, default true; only drawn for password): a button-icon (secondary, size s) before the feedback icon. Click toggles masking. Icon visibility_off while hidden, visibility while shown. aria-pressed is set to the shown state.",
    "Caps Lock: the field reads getModifierState(\"CapsLock\") on keydown and keyup. While Caps Lock is on and no error or success shows, the feedback icon area draws the capslock glyph. It resets on blur. The code does this for every type, not only password; it is only designed for password.",
    "Feedback icon (feedbackIcon, default true): one state at a time. error or success win, then capslock, then empty.",
  ],
  rules: [
    "MUST keep the visibility toggle: password is the only type that accepts it and it HAS TO have it (spec). Enforced by types: for password the prop only accepts true.",
    "MUST NOT use status=readonly (or the native readOnly) with type password: the type has no readonly status, and a readonly field shows no visibility toggle (spec). Enforced by types (status excludes readonly, readOnly only false); the toggle is also not drawn while readonly. Not enforced in inputfield-stack: fieldStatus=\"readonly\" is cast through.",
    "Bottom messages: info (password info, password characters) always appears alone. The only allowed pair is password-strength then error, stacked vertically at the input's width. With feedback=error the info message is replaced by the error message (spec). Enforced by types: password takes InputfieldBasePasswordMessages (any single message, or strength then error); strength is not allowed for other types. Strength alone is allowed (Silvia).",
    "Password strength is only used in create-new-password flows (spec). Not enforced.",
    "Feedback colour: with feedback error or success, the toggle icon fill in its default and inactive states uses inputfield-feedback-content (--inputfield-feedback-content) (spec). Not enforced: the toggle is a plain ButtonIcon, secondary.",
    "MUST NOT invent strength rules. The strength atom draws only the feedback it is given (inactive, success, warning, error).",
    "MUST NOT show a password in clear text by default: hasInput with type password stays masked until the toggle is used.",
  ],
  accessibility: [
    "The toggle is a button with aria-label \"Show password\" or \"Hide password\" and aria-pressed. The names are stand-ins (see gaps).",
    "The autocomplete token (e.g. current-password, new-password) is not set by the component; native attributes pass through.",
    "Bottom messages are tied to the input with aria-describedby (see inputfield-base).",
  ],
  relatedMessages: [
    "Bottom message \"password-strength\" (atom _atom-inputfield-base-bottom-message-password-strength): feedback inactive, success, warning, error with fixed copy built in. Only used with type password (Silvia, 2026-11-06). Enforcement in code: not built.",
    "Bottom message \"info\" types \"password info\" (\"Your password must contain at least 1 number\") and \"password characters\" (\"Your password must be at least 5 characters\"). Only used with type password (Silvia, 2026-11-06). Enforcement in code: not built. \"capslock\" (\"Caps locks active.\") was not assigned to a type; the field draws the capslock feedback icon for any type and the caller passes the capslock info message as `message`.",
    "Bottom message \"error\" types \"no match\" (\"Your passwords don’t match\"), \"ask to reset\" (\"Invalid password.\" + \"Did you forget it?\" + link) and \"length\" (\"Your password must be at least 5 characters\"). Only used with type password (Silvia, 2026-11-06). Enforcement in code: not built.",
  ],
  gaps: [
    "Still open: the toggle icon does not take the feedback colour (inputfield-feedback-content) in its default and inactive states; waiting for a Figma decision (variant in the snapshot, or only the spec sentence). The stack's fieldStatus can still pass readonly to a password field.",
    "The Do and Don't boards and the \"status\" and \"feedback\" example canvases of the spec were not read; examples may hold rules the markdown does not state.",
    "Strength rules: what makes a password weak, medium or strong, and which feedback shows when, are not designed. Nothing is built; this is the \"type=password\" gap of the inputfield-base contract.",
    "The toggle accessible names \"Show password\" and \"Hide password\" are stand-ins, not in the snapshot.",
    "autocomplete tokens and the password rules (minimum length) are not decided; the copy \"at least 5 characters\" is the snapshot's, not a validated rule.",
  ],
} satisfies TypeContract

import type { TypeContract } from "@/lib/contract"

export const emailTypeContract = {
  extends: "inputfield-base",
  type: "email",
  version: "1.1.0",
  changelog: [{ version: "1.1.0", date: "2026-11-06", changes: ["Related messages: error type \"@ missing\" is only for type email (Silvia); the copy comes from the snapshot, so the copy gap is closed. Not enforced in code."] }, { version: "1.0.0", date: "2026-11-06", changes: ["First type contract. Facts from inputfield-base.tsx; validation and message copy are gaps."] }],
  summary: "A field for an email address. Only the native type differs; see the inputfield-base contract for everything else.",
  appliesWhen: "type is \"email\".",
  nativeAttributes: ["input type=\"email\" (passed to the native input). No inputMode or autocomplete is set by the component."],
  specifics: ["No UI differs from the general field: no extra button, no validation, no formatting."],
  rules: [
    "MUST NOT validate in the component: it checks nothing. The caller passes hasFeedback and message.",
    "MUST NOT invent copy for an email error: use the error type \"@ missing\" (see related messages).",
  ],
  accessibility: [
    "The native type gives mobile keyboards and browser checks; the component adds nothing.",
    "The autocomplete token is not set by the component (native attributes pass through). Which token to use is not decided.",
  ],
  relatedMessages: [
    "Bottom message \"error\" type \"@ missing\": copy \"Email must contain a single @\". Only used with type email (Silvia, 2026-11-06). Enforcement in code: not built (documentation rule).",
  ],
  gaps: [
    "Validation rules and timing (when the error shows: on blur, on change, on submit) are not designed.",
    "autocomplete token and inputMode for email are not decided.",
  ],
} satisfies TypeContract

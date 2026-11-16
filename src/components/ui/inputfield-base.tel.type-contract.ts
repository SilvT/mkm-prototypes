import type { TypeContract } from "@/lib/contract"

export const telTypeContract = {
  extends: "inputfield-base",
  type: "tel",
  version: "1.1.0",
  changelog: [{ version: "1.1.0", date: "2026-11-06", changes: ["Related messages: error types phone and Only numbers are for type tel (Silvia wrote \"phone\", read as tel); copy from the snapshot, so the copy gap is closed. Not enforced in code."] }, { version: "1.0.0", date: "2026-11-06", changes: ["First type contract. Facts from inputfield-base.tsx; format, prefix and locale are gaps."] }],
  summary: "A field for a phone number. Only the native type differs; see the inputfield-base contract for everything else.",
  appliesWhen: "type is \"tel\".",
  nativeAttributes: ["input type=\"tel\" (passed to the native input). No inputMode, pattern or autocomplete is set by the component."],
  specifics: ["No UI differs from the general field: no prefix, no formatting, no validation."],
  rules: [
    "MUST NOT format or validate the number in the component: it does neither.",
    "MUST NOT invent a phone error copy or a prefix: use the error types \"phone\" and \"Only numbers\"; no prefix exists (see gaps).",
  ],
  accessibility: [
    "The native type gives the telephone keypad on mobile; the component adds nothing.",
    "The autocomplete token is not set by the component. Which token to use is not decided.",
  ],
  relatedMessages: [
    "Bottom message \"error\" type \"phone\": copy \"Please enter a valid phone number\". Only used with type tel (Silvia wrote \"phone\"; the input type is `tel`). Enforcement in code: not built.",
    "Bottom message \"error\" type \"Only numbers\": copy \"Only numbers, spaces, and symbols (+, -)\". Used with type tel and with type number (Silvia, 2026-11-06). Enforcement in code: not built.",
  ],
  gaps: [
    "Formatting and spacing pattern of the number is not decided.",
    "Prefix and country selection are not designed.",
    "Locale: one locale rule is still open for the project (CLAUDE.md), so nothing locale-specific can be built.",
    "autocomplete token and inputMode for tel are not decided.",
  ],
} satisfies TypeContract

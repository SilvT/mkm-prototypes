import type { TypeContract } from "@/lib/contract"

export const numberTypeContract = {
  extends: "inputfield-base",
  type: "number",
  version: "1.1.0",
  changelog: [{ version: "1.1.0", date: "2026-11-06", changes: ["Related messages: error type Only numbers is for type number and tel (Silvia); copy from the snapshot, so the copy gap is closed. Not enforced in code."] }, { version: "1.0.0", date: "2026-11-06", changes: ["First type contract. Facts from inputfield-base.tsx; format, step, min and max are gaps."] }],
  summary: "A field for a number. Only the native type differs; see the inputfield-base contract for everything else.",
  appliesWhen: "type is \"number\".",
  nativeAttributes: [
    "input type=\"number\" (passed to the native input). The component sets no inputMode (so not \"numeric\"), no step, min, max or autocomplete. A caller can pass them as native attributes.",
  ],
  specifics: ["No UI differs from the general field: the browser's native number behaviour applies (the component does not style or hide it)."],
  rules: [
    "MUST NOT invent a format, step, min or max: none is decided.",
  ],
  accessibility: [
    "The native type gives number-only input and, in some browsers, arrow-key stepping; the component adds nothing.",
  ],
  relatedMessages: [
    "Bottom message \"error\" type \"Only numbers\": copy \"Only numbers, spaces, and symbols (+, -)\". Used with type number and with type tel (Silvia, 2026-11-06). Enforcement in code: not built.",
  ],
  gaps: [
    "Number format (separators, decimals), step, min and max are not decided.",
    "The component sets no inputMode; whether it should (numeric or decimal) is not decided.",
    "Error copy \"Only numbers\" is not in code and not tied to number by the snapshot or the atoms.",
    "Locale: one locale rule is still open for the project (CLAUDE.md).",
  ],
} satisfies TypeContract

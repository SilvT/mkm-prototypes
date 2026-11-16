import type { TypeContract } from "@/lib/contract"

export const textTypeContract = {
  extends: "inputfield-base",
  type: "text",
  version: "1.1.0",
  changelog: [{ version: "1.1.0", date: "2026-11-06", changes: ["Related messages: error type \"wrong user\" is only for type text (Silvia). Not enforced in code."] }, { version: "1.0.0", date: "2026-11-06", changes: ["First type contract (stub): nothing specific beyond inputfield-base."] }],
  summary: "The default type. Everything is in the inputfield-base contract.",
  appliesWhen: "type is \"text\" or not passed (default).",
  nativeAttributes: ["input type=\"text\". No inputMode or autocomplete is set by the component."],
  specifics: [],
  rules: ["Follow the inputfield-base contract. Nothing is added for this type."],
  accessibility: ["As inputfield-base: aria-label is required."],
  relatedMessages: [
    "Bottom message \"error\" type \"wrong user\": copy \"Invalid username\". Only used with type text (Silvia, 2026-11-06). Enforcement in code: not built (documentation rule).",
  ],
  gaps: [],
} satisfies TypeContract

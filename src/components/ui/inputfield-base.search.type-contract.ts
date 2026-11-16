import type { TypeContract } from "@/lib/contract"

export const searchTypeContract = {
  extends: "inputfield-base",
  type: "search",
  version: "1.0.0",
  changelog: [{ version: "1.0.0", date: "2026-11-06", changes: ["First type contract. Facts from inputfield-base.tsx; clear button and leading or trailing icon are gaps."] }],
  summary: "A field for a search term. Only the native type differs; see the inputfield-base contract for everything else.",
  appliesWhen: "type is \"search\".",
  nativeAttributes: ["input type=\"search\" (passed to the native input). No inputMode, enterKeyHint or autocomplete is set by the component."],
  specifics: ["No UI differs from the general field: no search icon, no clear button. The browser may draw its own native clear control."],
  rules: ["MUST NOT add a clear button or a search icon: none is designed (see gaps)."],
  accessibility: [
    "The native type gives the search role semantics in browsers; the component adds nothing. aria-label is required, as for every field.",
  ],
  relatedMessages: [],
  gaps: [
    "Clear button and leading or trailing icon are not designed.",
    "Submit behaviour, debounce and live results are not designed.",
  ],
} satisfies TypeContract

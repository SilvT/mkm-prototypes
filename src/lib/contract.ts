// Shape every component contract must satisfy. tsc fails if a field is missing.
// Types are shared with the component (e.g. variants come from the component's own const), so API drift breaks the build.
export type ContractStatus = "Draft" | "Ready" | "Deprecated"

export type ComponentContract = {
  name: string
  status: ContractStatus
  /** Semver of the component. Minor: added props or variants. Major: breaking prop change or rename. Patch: fixes. Equals changelog[0].version. */
  version: string
  /** Newest first. date is YYYY-MM-DD. One line per change. */
  changelog: { version: string; date: string; changes: string[] }[]
  /** Where the design decision came from. Figma is input, not the source of truth after the contract exists. */
  source: { figma: string; node: string }
  /** Required when status is "Deprecated" (mirrors the Figma deprecated intent; checked by npm run sync-report). */
  deprecated?: { replacedBy?: string; note?: string }
  /** Internal atoms (snapshot role "atom") this component renders, by snapshot name, e.g. "_atom-status-dot". Their values are documented in this contract; atoms have no contract of their own. */
  uses?: string[]
  summary: string
  whenToUse: string[]
  whenNotToUse: string[]
  props: Record<string, { type: string; required: boolean; default?: string; description: string }>
  /** variant axis name -> allowed values */
  variants: Record<string, readonly string[]>
  states: string[]
  /** Design-system tokens the component may use. Never core (palette) tokens, raw hex or raw px. */
  tokens: { colors: string[]; spacing: string[]; radius: string[]; text: string[]; size: string[] }
  rules: string[]
  accessibility: string[]
  /** What the design has not decided. Agents MUST NOT invent these. */
  gaps: string[]
}

/** A smaller contract for one value of a parent component's `type` prop. It extends the parent (never repeats it) and details only what is specific to that type. Not a ComponentContract: no story, no Figma snapshot. */
export type TypeContract = {
  /** Parent contract name, e.g. "inputfield-base". */
  extends: string
  /** The value of the parent's `type` prop, e.g. "password". */
  type: string
  /** Semver. Equals changelog[0].version. */
  version: string
  /** Newest first. date is YYYY-MM-DD. One line per change. */
  changelog: { version: string; date: string; changes: string[] }[]
  summary: string
  appliesWhen: string
  /** What the code sets natively for this type (input type, inputMode, autocomplete...). Facts from the code only. */
  nativeAttributes: string[]
  /** UI specific to this type. */
  specifics: string[]
  rules: string[]
  accessibility: string[]
  /** Bottom messages and feedback that belong to this type, only where code or snapshot says so. */
  relatedMessages: string[]
  /** What the design has not decided for this type. Agents MUST NOT invent these. */
  gaps: string[]
}

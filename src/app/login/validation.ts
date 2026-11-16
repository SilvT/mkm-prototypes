// Validation rules. Email: exactly one @ with text on both sides (the Figma example "a.b@c" is valid). Strength rules are Proposed, not designed.
export const isEmail = (v: string) => /^[^@\s]+@[^@\s]+$/.test(v)

// Password length limits (Silvia): at least 5, at most 15 characters.
export const PASSWORD_MIN = 5
export const PASSWORD_MAX = 15

export type Strength = "inactive" | "error" | "warning" | "success"
export function passwordStrength(v: string): Strength {
  if (v.length < PASSWORD_MIN) return "inactive" // shows "Password must be at least 5 characters."
  const classes = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/].filter((r) => r.test(v)).length
  if (v.length < 8 || classes < 2) return "error"
  if (v.length >= 12 && classes >= 3) return "success"
  return "warning"
}

// The design system draws error and success only while a field is hovered or focused; Figma shows them on idle fields too.
// fieldStatus="active" keeps the look (Gap: ask for the feedback look to persist when idle).
export const keepLook = (feedback: "null" | "error" | "success") => (feedback === "null" ? undefined : ("active" as const))

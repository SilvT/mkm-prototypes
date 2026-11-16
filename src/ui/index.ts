// The only UI import point for screens: `import { Button, Checkbox } from "@/ui"`.
// Real design-system components come from src/components/ui (synced from ds_POC).
// Stock shadcn placeholders come from src/placeholders. When the real one exists, swap its line here: screens stay untouched.

// --- real design system (ds_POC) ---
export * from "@/components/ui/avatar-card"
export * from "@/components/ui/avatar-single"
export * from "@/components/ui/badge-status"
export * from "@/components/ui/banner"
export * from "@/components/ui/button"
export * from "@/components/ui/button-icon"
export * from "@/components/ui/card"
export * from "@/components/ui/icon"
export * from "@/components/ui/indicator-count"
export * from "@/components/ui/indicator-feedback"
export * from "@/components/ui/inputfield-base"
export * from "@/components/ui/inputfield-stack"
export * from "@/components/ui/links"
export * from "@/components/ui/sidebarnav"

// --- placeholders (stock shadcn); list them with `npm run ds:placeholders` ---
export * from "@/placeholders/checkbox"
export * from "@/placeholders/radio-group"
export * from "@/placeholders/select"
export * from "@/placeholders/tabs"
export * from "@/placeholders/tooltip"

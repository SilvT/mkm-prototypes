import { useId } from "react"
import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { InputfieldBase } from "@/components/ui/inputfield-base"
import type { InputfieldBaseStatus } from "@/components/ui/inputfield-base"

export const inputfieldStackStatuses = ["inactive", "active"] as const
export type InputfieldStackStatus = (typeof inputfieldStackStatuses)[number]
export const inputfieldStackStacks = ["vertical", "horizontal"] as const
export type InputfieldStackStack = (typeof inputfieldStackStacks)[number]

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

// The stack wraps inputfield-base: every base prop passes through, except the ones the stack owns (status, id, className, aria-label: the label names the input).
type InputfieldStackProps = DistributiveOmit<ComponentProps<typeof InputfieldBase>, "status" | "id" | "className" | "aria-label"> & {
  /** Figma TEXT "label". */
  label?: string
  /** Figma variant "status". The label colour follows it (inactive = inputfield-disable-label); inactive also makes the field inactive, active leaves the field on its automatic status (hover, focus). */
  status?: InputfieldStackStatus
  /** Proposed (Silvia, 2026-11-06), not a Figma property: forces the field's own status (active, inactive, hover, focus, readonly). Overrides what `status` gives the field. */
  fieldStatus?: InputfieldBaseStatus
  /** Figma variant "stack": label above the field (vertical) or beside it (horizontal). */
  stack?: InputfieldStackStack
  className?: string
}

function InputfieldStack({ label = "Label", status = "active", fieldStatus, stack = "vertical", className, ...field }: InputfieldStackProps) {
  const id = useId()
  const vertical = stack === "vertical"
  return (
    <div data-slot="inputfield-stack" data-status={status} data-stack={stack} className={cn("flex w-full", vertical ? "flex-col items-start gap-content-s" : "items-center gap-content-m", className)}>
      <label htmlFor={id} className={cn("text-body-b2", vertical && "self-stretch", status === "inactive" ? "text-inputfield-disable-label" : "text-inputfield-label")}>{label}</label>
      {/* fieldStatus="readonly" with type password is not blocked by the stack types (the base forbids it; see the password type contract). */}
      <InputfieldBase {...(field as ComponentProps<typeof InputfieldBase>)} id={id} aria-label={label} status={(fieldStatus ?? (status === "inactive" ? "inactive" : undefined)) as never} className={vertical ? "w-full" : undefined} />
    </div>
  )
}

export { InputfieldStack }

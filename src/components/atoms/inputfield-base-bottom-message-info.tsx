// Internal atom (Figma _atom-inputField-base_bottom-message-info, node 3061:4343, role atom). No story, no contract, not importable by screens.
// Parent: inputfield-base (its contract `uses` it and documents these values).
// Frame: fills the width of its parent (Silvia, 2026-11-06, Figma "fill"; block-level flex, w-full; inside the counter atom it is flex-1 beside the counter); padding 2 and gap 4 (snapshot binds dimensions/2 and dimensions/4, which are not in the theme: content-2xs and content-xs have the same values).
// Structure: editable is one wrapping frame (centred, height 19 not bound). capslock, password info, password characters and loading have an outer frame (items start) holding an inner wrapping frame "bottom message/info" (padding 2, gap 4, items centred, stretch).
// Row: optional 14 icon + text body-b4 in alert-info-content-main. type=loading shows the button-loader (stage 1, colorWave dark) instead of an icon.
// Copy CHECKED against the snapshot textContent (2026-11-06): all five texts identical to textByType (variant order capslock, loading, password characters, password info, editable).
// Types: capslock (icon lock), editable (icon lock, height 19), password info (icon vpn_key_alert), password characters (icon password), loading. The glyph follows the type (iconByType); `icon` overrides it. All size S (data-size s on the root, size-icon 14), the loader too.
// Why no icon showed before: `icon` had no default and the glyphs were not in the registry (now they are).
// Open gaps (not built): the editable height 19 is not bound;
//   the Figma property hasIcon / swap "Icon" is `hasIcon` / `icon` here.
import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { ButtonLoader } from "@/components/atoms/button-loader"
import { Icon } from "@/components/ui/icon"
import type { IconName } from "@/components/ui/icon"

export const inputfieldInfoTypes = ["capslock", "editable", "password info", "password characters", "loading"] as const
export type InputfieldInfoType = (typeof inputfieldInfoTypes)[number]

const iconByType = { capslock: "lock", editable: "lock", "password info": "vpn_key_alert", "password characters": "password" } as const satisfies Partial<Record<InputfieldInfoType, IconName>>

type InputfieldInfoProps = ComponentProps<"span"> & {
  /** Figma variant "type". */
  type?: InputfieldInfoType
  /** Figma BOOLEAN "hasIcon". Ignored for loading, which always shows the loader. */
  hasIcon?: boolean
  /** Figma instance swap "Icon". A registry icon name. Default follows `type` (lock, lock, vpn_key_alert, password). */
  icon?: IconName
  /** Figma TEXT "Text". Default copy follows `type` (textByType). */
  text?: string
}

// Default copy per type, from the republished snapshot's textContent (2026-11-06). The plugin keys it by node id, so the type of each text is read from the variant order (capslock, loading, password characters, password info, editable) and the wording: type mapping CONFIRMED by Silvia (2026-11-06).
const textByType = {
  capslock: "Caps locks active.",
  editable: "Input the text you need here",
  "password info": "Your password must contain at least 1 number",
  "password characters": "Your password must be at least 5 characters",
  loading: "Validating your input",
} as const

function InputfieldBottomMessageInfo({ type = "editable", hasIcon = true, icon: iconProp, text: textProp, className, ...props }: InputfieldInfoProps) {
  const text = textProp ?? textByType[type]
  const icon = iconProp ?? (type === "loading" ? undefined : iconByType[type])
  const row = (
    <>
      {type === "loading" ? <ButtonLoader stage="1" colorWave="dark" /> : hasIcon && icon && <Icon name={icon} />}
      <span>{text}</span>
    </>
  )
  // editable is one wrapping frame; the other types wrap the row in an inner "bottom message/info" frame (snapshot).
  return type === "editable" ? (
    <span data-slot="inputfield-base-bottom-message-info" data-type={type} data-size="s" className={cn("flex w-full flex-wrap items-center gap-content-xs p-content-2xs text-body-b4 text-alert-info-content-main", className)} {...props}>{row}</span>
  ) : (
    <span data-slot="inputfield-base-bottom-message-info" data-type={type} data-size="s" className={cn("flex w-full items-start gap-content-xs p-content-2xs text-body-b4 text-alert-info-content-main", className)} {...props}>
      <span className="flex flex-wrap items-center gap-content-xs p-content-2xs self-stretch">{row}</span>
    </span>
  )
}

export { InputfieldBottomMessageInfo }

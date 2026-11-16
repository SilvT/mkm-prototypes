import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

export const avatarSingleTypes = ["initials", "photo"] as const
export type AvatarSingleType = (typeof avatarSingleTypes)[number]

type AvatarSingleProps = Omit<ComponentProps<"span">, "content"> & {
  type?: AvatarSingleType
  /** The initials text (Figma TEXT property "Content"). Shown for type initials only. */
  content?: string
  /** Image for type photo. Code-only: Figma draws the photo frame but publishes no image property. */
  src?: string
  alt?: string
}

// Both types: square, width bound to size-atom-xl (48), radius large. Initials: brand fill, inverted text, title-h1.
// Photo: the frame clips an <img>. The source is a code-only prop (Figma has no image property); stories use src/assets/avatar-placeholder.png.
function AvatarSingle({ type = "initials", content = "JS", src, alt = "", className, ...props }: AvatarSingleProps) {
  return (
    <span
      data-slot="avatar-single"
      data-type={type}
      className={cn(
        "inline-flex aspect-square w-atom-xl items-center justify-center overflow-hidden rounded-large",
        type === "initials" && "bg-surface-brand-medium text-content-brand-inverted-medium text-title-h1",
        className,
      )}
      {...props}
    >
      {type === "initials" ? content : src ? <img src={src} alt={alt} className="size-full object-cover" /> : null}
    </span>
  )
}

export { AvatarSingle }

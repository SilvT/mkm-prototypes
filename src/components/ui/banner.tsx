import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Icon } from "./icon"
import type { IconName } from "./icon"

export const bannerFeedbackTypes = ["warning", "error", "success", "info"] as const
export type BannerFeedbackType = (typeof bannerFeedbackTypes)[number]
export const bannerCtaStacks = ["horizontal", "vertical"] as const
export type BannerCtaStack = (typeof bannerCtaStacks)[number]

// data-alert sets the --feedback-* tokens, so colour comes from the type with no per-variant classes.
// Text (snapshot): the first layer is body-b4 and the second title-h5. Which Figma TEXT property fills which layer is not stated; mapped by token name:
// secondary-text = first layer (feedback-content-contrast), main-text = second layer (feedback-content-main; warning uses feedback-content-contrast, as the snapshot does for warning). Proposed, see the contract Gaps.
const mainColour = { warning: "text-feedback-content-contrast", error: "text-feedback-content-main", success: "text-feedback-content-main", info: "text-feedback-content-main" } as const

type BannerProps = Omit<ComponentProps<"div">, "children"> & {
  feedbackType?: BannerFeedbackType
  /** Direction of the CTA slot, and of the text group (Figma variant "cta-stack"). */
  ctaStack?: BannerCtaStack
  /** Figma TEXT "secondary-text". */
  secondaryText?: string
  /** Figma TEXT "main-text". */
  mainText?: string
  /** Figma instance swap "Icon". A registry icon name; the snapshot default (priority_high) is not in the registry, so there is no default. */
  icon?: IconName
  /** Figma SLOT "CTA slot". Preferred content: button (type tertiary, size s) or text action. */
  cta?: ReactNode
}

function Banner({ feedbackType = "warning", ctaStack = "horizontal", secondaryText = "Restricted inbox", mainText: main = "Your message won’t reach this user’s primary inbox.", icon, cta, className, ...props }: BannerProps) {
  const vertical = ctaStack === "vertical"
  return (
    <div
      data-slot="banner"
      data-alert={feedbackType}
      className={cn("flex items-center justify-between rounded-small bg-feedback-background px-content-l py-content-s", className)}
      {...props}
    >
      <div className="flex items-center gap-content-2xl">
        {icon && <Icon name={icon} />}
        <div className={cn("flex gap-content-s", vertical ? "flex-col items-start justify-center" : "items-center justify-center")}>
          <span className="text-body-b4 text-feedback-content-contrast">{secondaryText}</span>
          <span className={cn("text-title-h5", mainColour[feedbackType])}>{main}</span>
        </div>
      </div>
      {cta && <div className={cn("flex gap-content-s", vertical ? "flex-col items-start" : "items-start")}>{cta}</div>}
    </div>
  )
}

export { Banner }

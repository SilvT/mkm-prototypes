import { createCn } from "cn/config"
import { borderWidths, textStyles } from "./cn-groups"

// Our text styles and border widths are custom utilities: without this, cn mistakes them for colours and drops them.
export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [{ text: textStyles }],
      "border-w": [{ "border-w": borderWidths }],
    },
  },
})

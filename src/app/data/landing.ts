// Fake data for the landing page. Names and numbers follow the Figma design; the date is today's.
import { sectionIcons } from "@/ui"

export const user = { firstName: "Joana", initials: "JS" }

type Section = keyof typeof sectionIcons

export const missed: { section: Section; label: string; count: number }[] = [
  { section: "campaigns", label: "Campaigns", count: 7 },
  { section: "leads", label: "Updated leads", count: 3 },
  { section: "leads", label: "New Leads", count: 6 },
  { section: "interactions", label: "Messages", count: 7 },
  { section: "interactions", label: "Interactions", count: 1380 },
]

export const sections: { section: Section; label: string; count?: number }[] = [
  { section: "campaigns", label: "Campaigns", count: 1 },
  { section: "channels", label: "Channels" },
  { section: "leads", label: "Leads", count: 9 },
  { section: "analytics", label: "Analytics" },
  { section: "interactions", label: "Interactions", count: 1380 },
]

// Design rule (indicator-count): over 3 digits shows as K, 1000 = "1K", 1380 = "+1K".
export const formatCount = (n: number) => (n < 1000 ? String(n) : n === 1000 ? "1K" : `+${Math.floor(n / 1000)}K`)

// "16th November 2026"
export function longDate(d = new Date()) {
  const day = d.getDate()
  const suffix = day % 100 >= 11 && day % 100 <= 13 ? "th" : ({ 1: "st", 2: "nd", 3: "rd" } as Record<number, string>)[day % 10] ?? "th"
  return `${day}${suffix} ${d.toLocaleString("en-GB", { month: "long" })} ${d.getFullYear()}`
}

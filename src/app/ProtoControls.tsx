import { useEffect, useState } from "react"
import { Button, ButtonIcon } from "@/ui"
import { DEMO_ACCOUNT, VALID_RESET_TOKEN } from "@/app/auth/seed"

export type Target = { screen: "signin" } | { screen: "reset"; step: "request" | "sent" | "new" | "success" } | { screen: "landing" }

const same = (a: Target, b: Target) => a.screen === b.screen && (a.screen !== "reset" || (b.screen === "reset" && a.step === b.step))

type Props = { current: Target; onGo: (t: Target) => void; onRestart: () => void }

// Prototype chrome (not part of the design): a floating button top left that opens the list of flows and screens. Escape closes it.
export function ProtoControls({ current, onGo, onRestart }: Props) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const go = (t: Target) => { onGo(t); setOpen(false) }
  const item = (label: string, t: Target) => (
    <Button key={label} label={label} type={same(current, t) ? "primary" : "tertiary"} hasLeadIcon={false} hasTrailIcon={false} onClick={() => go(t)} className="justify-start" />
  )

  return (
    <div className="fixed top-content-l left-content-l z-50 flex flex-col items-start gap-content-s">
      <ButtonIcon type="secondary" icon={open ? "close" : "settings"} aria-label={open ? "Close prototype controls" : "Open prototype controls"} aria-expanded={open} onClick={() => setOpen((o) => !o)} />
      {open && (
        <aside aria-label="Prototype controls" className="animate-motion-enter flex w-surfaces-s max-w-[calc(100vw-var(--size-atom-xl))] flex-col gap-content-m rounded-large bg-surface-neutral-extrasubtle p-content-l text-body-b3 text-content-neutral-bold shadow-[0_0_0_var(--border-width-light)_var(--stroke-neutral-light)]">
          <h2 className="text-title-h5">Prototype controls</h2>

          <section className="flex flex-col gap-content-xs">
            <h3 className="text-body-b4 text-content-neutral-medium">Flow: Login</h3>
            {item("Sign in", { screen: "signin" })}
            {item("Reset: request", { screen: "reset", step: "request" })}
            {item("Reset: token sent", { screen: "reset", step: "sent" })}
            {item("Reset: new password", { screen: "reset", step: "new" })}
            {item("Reset: success", { screen: "reset", step: "success" })}
            {item("Landing", { screen: "landing" })}
          </section>

          <section className="flex flex-col gap-content-xs">
            <h3 className="text-body-b4 text-content-neutral-medium">Next flows</h3>
            <p className="text-body-b4 text-content-neutral-medium">Create Campaign, Filtering, Messages → tagging: not built yet.</p>
          </section>

          <section className="flex flex-col gap-content-xs">
            <h3 className="text-body-b4 text-content-neutral-medium">Demo data</h3>
            <p className="text-body-b4">Username {DEMO_ACCOUNT.email}</p>
            <p className="text-body-b4">Password {DEMO_ACCOUNT.password}</p>
            <p className="text-body-b4">Reset token {VALID_RESET_TOKEN}</p>
          </section>

          <Button label="Restart this screen" type="secondary" hasLeadIcon={false} hasTrailIcon={false} onClick={() => { onRestart(); setOpen(false) }} />
        </aside>
      )}
    </div>
  )
}

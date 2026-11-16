import type { ReactNode } from "react"

// The splash every login screen sits on: gradient background, product name, tagline, footer. Copy as in Figma.
export function AuthStage({ children }: { children?: ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center gap-content-4xl bg-(image:--gradient-general) px-content-l py-content-4xl text-content-brand-strong">
      <header className="flex flex-col items-center gap-content-xs">
        <h1 className="text-title-h2">
          <span className="text-title-h2-extrabold">Marketing</span> Management
        </h1>
        <p className="text-body-b3 text-content-neutral-medium">Fuel your connections, Drive Growth</p>
      </header>
      <div className="flex flex-1 items-center justify-center">{children}</div>
      <footer className="text-body-b5 text-content-neutral-medium">A technology by Senapt</footer>
    </main>
  )
}

// White card that holds a form (Figma log-in-box, 450 wide).
export function AuthCard({ children, label }: { children: ReactNode; label: string }) {
  // Mounts with a fade and rise (animate-motion-enter). Give it a `key` that changes with the step to replay it.
  return (
    <section aria-label={label} className="animate-motion-enter flex w-surfaces-m max-w-full flex-col gap-content-l rounded-large bg-surface-neutral-extrasubtle p-content-4xl">
      {children}
    </section>
  )
}

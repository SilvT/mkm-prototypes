import { useState } from "react"
import { SignIn } from "./login/SignIn"
import { ResetPassword } from "./login/ResetPassword"
import { Landing } from "./login/Landing"
import { ProtoControls, type Target } from "./ProtoControls"
import { auth } from "@/app/auth"
import { DEMO_ACCOUNT } from "@/app/auth/seed"

// ?screen=reset (&step=sent|new|success) opens a screen directly (prototype convenience).
const fromUrl = (): Target => {
  const q = new URLSearchParams(location.search)
  const screen = q.get("screen")
  const step = q.get("step")
  if (screen === "landing") return { screen: "landing" }
  if (screen === "reset") return { screen: "reset", step: step === "sent" || step === "new" || step === "success" ? step : "request" }
  return { screen: "signin" }
}

export default function App() {
  const [target, setTarget] = useState<Target>(fromUrl)
  const [run, setRun] = useState(0) // bump to remount the current screen (restart)

  // Jumping to the landing page from the controls signs in as the demo user first, so the page has a session.
  async function go(t: Target) {
    if (t.screen === "landing" && !auth.getSession()) await auth.signIn(DEMO_ACCOUNT.email, DEMO_ACCOUNT.password).catch(() => undefined)
    if (t.screen !== "landing") auth.signOut()
    setTarget(t)
    setRun((r) => r + 1)
  }

  return (
    <>
      {target.screen === "reset" && <ResetPassword key={run} initialStep={target.step} onDone={() => go({ screen: "signin" })} onBack={() => go({ screen: "signin" })} />}
      {target.screen === "landing" && <Landing key={run} />}
      {target.screen === "signin" && <SignIn key={run} onSignedIn={() => setTarget({ screen: "landing" })} onForgot={() => go({ screen: "reset", step: "request" })} />}
      <ProtoControls current={target} onGo={go} onRestart={() => setRun((r) => r + 1)} />
    </>
  )
}

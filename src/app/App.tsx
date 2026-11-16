import { useEffect, useMemo, useRef, useState } from "react"
import { SignIn } from "./login/SignIn"
import { ResetPassword } from "./login/ResetPassword"
import { Landing } from "./login/Landing"
import { ProtoControls, type Display, type Target } from "./ProtoControls"
import { DesktopFrame } from "./DesktopFrame"
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

// ?embed=1 is the app inside the desktop frame: screens only, no controls; it takes commands from the parent page and reports its screen back.
const embed = new URLSearchParams(location.search).has("embed")
const frameUrl = (t: Target) => {
  const q = new URLSearchParams({ embed: "1", screen: t.screen })
  if (t.screen === "reset") q.set("step", t.step)
  return `${location.pathname}?${q}`
}

export default function App() {
  const [target, setTarget] = useState<Target>(fromUrl)
  const [run, setRun] = useState(0) // bump to remount the current screen (restart)

  const [display, setDisplay] = useState<Display>(new URLSearchParams(location.search).get("display") === "full" ? "full" : "frame")
  const frameRef = useRef<HTMLIFrameElement>(null)
  const src = useMemo(() => frameUrl(target), [display]) // eslint-disable-line react-hooks/exhaustive-deps -- the frame loads once per entry; later moves go by message
  const toFrame = (msg: object) => frameRef.current?.contentWindow?.postMessage(msg, location.origin)

  useEffect(() => {
    if (target.screen === "landing" && !auth.getSession()) auth.signIn(DEMO_ACCOUNT.email, DEMO_ACCOUNT.password).catch(() => undefined)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps -- once, for a direct ?screen=landing

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== location.origin) return
      if (embed && e.data?.type === "proto:go") go(e.data.target)
      if (embed && e.data?.type === "proto:restart") setRun((r) => r + 1)
      if (!embed && e.data?.type === "proto:target") setTarget(e.data.target)
    }
    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [])

  useEffect(() => {
    if (embed) parent.postMessage({ type: "proto:target", target }, location.origin)
  }, [target])

  // Jumping to the landing page from the controls signs in as the demo user first, so the page has a session.
  async function go(t: Target) {
    if (t.screen === "landing" && !auth.getSession()) await auth.signIn(DEMO_ACCOUNT.email, DEMO_ACCOUNT.password).catch(() => undefined)
    if (t.screen !== "landing") auth.signOut()
    setTarget(t)
    setRun((r) => r + 1)
  }

  const framed = !embed && display === "frame"
  const controls = (
    <ProtoControls
      current={target}
      display={display}
      onGo={(t) => { if (framed) { setTarget(t); toFrame({ type: "proto:go", target: t }) } else go(t) }}
      onRestart={() => (framed ? toFrame({ type: "proto:restart" }) : setRun((r) => r + 1))}
      onDisplay={(d) => { setDisplay(d); if (d === "full") go(target) }}
    />
  )

  if (framed) return <><DesktopFrame ref={frameRef} src={src} />{controls}</>

  return (
    <>
      {target.screen === "reset" && <ResetPassword key={run} initialStep={target.step} onDone={() => go({ screen: "signin" })} onBack={() => go({ screen: "signin" })} />}
      {target.screen === "landing" && <Landing key={run} />}
      {target.screen === "signin" && <SignIn key={run} onSignedIn={() => setTarget({ screen: "landing" })} onForgot={() => go({ screen: "reset", step: "request" })} />}
      {!embed && controls}
    </>
  )
}

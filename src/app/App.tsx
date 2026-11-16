import { useState } from "react"
import { SignIn } from "./login/SignIn"
import { ResetPassword } from "./login/ResetPassword"
import { Landing } from "./login/Landing"

type Screen = "signin" | "reset" | "landing"

// ?screen=reset (&step=sent|new|success) opens a screen directly (prototype convenience).
const fromUrl = (): Screen => {
  const s = new URLSearchParams(location.search).get("screen")
  return s === "reset" || s === "landing" ? s : "signin"
}

const stepFromUrl = () => {
  const s = new URLSearchParams(location.search).get("step")
  return s === "sent" || s === "new" || s === "success" ? s : "request"
}

export default function App() {
  const [screen, setScreen] = useState<Screen>(fromUrl)
  if (screen === "reset") return <ResetPassword initialStep={stepFromUrl()} onDone={() => setScreen("signin")} onBack={() => setScreen("signin")} />
  if (screen === "landing") return <Landing onSignOut={() => setScreen("signin")} />
  return <SignIn onSignedIn={() => setScreen("landing")} onForgot={() => setScreen("reset")} />
}

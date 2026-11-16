import { useState } from "react"
import type { FormEvent, KeyboardEvent, MouseEvent } from "react"
import { Button, InputfieldStack, Link, Loader } from "@/ui"
import { auth } from "@/app/auth"
import { AuthCard, AuthStage } from "./AuthStage"
import { isEmail, keepLook } from "./validation"

type Props = { onSignedIn: () => void; onForgot: () => void }

export function SignIn({ onSignedIn, onForgot }: Props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailTouched, setEmailTouched] = useState(false)
  const [wrongPassword, setWrongPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const emailValid = isEmail(email)
  const emailError = emailTouched && email !== "" && !emailValid
  const canSubmit = emailValid && password !== "" && !loading

  async function submit() {
    if (!canSubmit) return
    setLoading(true)
    try {
      await auth.signIn(email, password)
      onSignedIn()
    } catch {
      setWrongPassword(true)
      setLoading(false)
    }
  }

  // The error atom renders its own "ask to reset" link and exposes no onClick: catch the click here.
  function onCardClick(e: MouseEvent) {
    if ((e.target as HTMLElement).closest('[data-alert="error"] a')) onForgot()
  }
  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") submit()
  }

  if (loading) return <AuthStage><div className="animate-motion-enter"><Loader label="Signing in" /></div></AuthStage>

  return (
    <AuthStage>
      <AuthCard label="Log in">
        <form noValidate onSubmit={(e: FormEvent) => e.preventDefault()} onKeyDown={onKeyDown} onClick={onCardClick} className="flex flex-col gap-content-l">
          <h2 className="text-title-h3">Welcome!</h2>
          <InputfieldStack
            label="Username"
            type="email"
            placeholder="introduce your email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setEmailTouched(true)}
            hasFeedback={emailError ? "error" : emailValid ? "success" : "null"}
            fieldStatus={keepLook(emailError ? "error" : emailValid ? "success" : "null")}
            message={emailError ? { kind: "error", type: "@ missing" } : undefined}
          />
          <InputfieldStack
            label="Password"
            type="password"
            placeholder="introduce your password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setWrongPassword(false) }}
            hasFeedback={wrongPassword ? "error" : "null"}
            fieldStatus={keepLook(wrongPassword ? "error" : "null")}
            message={wrongPassword ? { kind: "error", type: "ask to reset" } : undefined}
          />
          <div className="flex items-center justify-between gap-content-m">
            <Link label="Forgot your password?" href="#reset" onClick={(e) => { e.preventDefault(); onForgot() }} />
            <Button label="Log in" hasLeadIcon={false} status={canSubmit ? undefined : "disable"} disabled={!canSubmit} onClick={submit} />
          </div>
        </form>
      </AuthCard>
    </AuthStage>
  )
}

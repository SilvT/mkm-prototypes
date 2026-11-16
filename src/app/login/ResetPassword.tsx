import { useEffect, useState } from "react"
import { Button, Icon, InputfieldStack, LineLoader, Link } from "@/ui"
import { auth, AuthError } from "@/app/auth"
import { AuthCard, AuthStage } from "./AuthStage"
import { isEmail, keepLook, passwordStrength } from "./validation"

type Step = "request" | "sent" | "new" | "success"

export function ResetPassword({ onDone, onBack, initialStep = "request" }: { onDone: () => void; onBack: () => void; initialStep?: Step }) {
  const [step, setStep] = useState<Step>(initialStep)
  const [busy, setBusy] = useState(false)

  // request
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [emailTouched, setEmailTouched] = useState(false)
  const emailValid = isEmail(email)
  const emailError = emailTouched && email !== "" && !emailValid
  const canSend = !busy && (username.trim() !== "" || emailValid) && (email === "" || emailValid)

  // new password
  const [token, setToken] = useState("")
  const [tokenWrong, setTokenWrong] = useState(false)
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [passwordTouched, setPasswordTouched] = useState(false)
  const [confirmTouched, setConfirmTouched] = useState(false)
  const strength = passwordStrength(password)
  const passwordEmpty = passwordTouched && password === ""
  const mismatch = confirmTouched && confirm !== "" && confirm !== password
  const canReset = !busy && token !== "" && password !== "" && confirm === password

  useEffect(() => {
    if (step !== "success") return
    const t = setTimeout(onDone, 3000) // Proposed: 3 s, then back to sign in
    return () => clearTimeout(t)
  }, [step, onDone])

  async function send() {
    if (!canSend) return
    setBusy(true)
    await auth.requestResetToken(email || username)
    setBusy(false)
    setStep("sent")
  }

  async function reset() {
    if (!canReset) return
    setBusy(true)
    try {
      await auth.resetPassword({ token, password })
      setStep("success")
    } catch (e) {
      if (e instanceof AuthError && e.code === "TOKEN_INVALID") setTokenWrong(true)
    }
    setBusy(false)
  }

  return (
    <AuthStage>
      <AuthCard label="Reset password">
        {step === "request" && (
          <form noValidate onSubmit={(e) => { e.preventDefault(); send() }} className="flex flex-col gap-content-l">
            <p className="text-body-b3">Enter your username or email so we can send you a <strong>token</strong> to reset your password</p>
            <InputfieldStack label="Username" placeholder="introduce your username" autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <p className="text-center text-body-b3">Or</p>
            <InputfieldStack
              label="Email"
              type="email"
              placeholder="introduce your email address"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailTouched(true)}
              hasFeedback={emailError ? "error" : emailValid ? "success" : "null"}
              fieldStatus={keepLook(emailError ? "error" : emailValid ? "success" : "null")}
              message={emailError ? { kind: "error", type: "@ missing" } : undefined}
            />
            <div className="flex items-center justify-between gap-content-m">
              <Link label="Back to log in" href="#signin" onClick={(e) => { e.preventDefault(); onBack() }} />
              <Button label="Send Link" hasLeadIcon={false} status={canSend ? undefined : "disable"} disabled={!canSend} onClick={send} />
            </div>
          </form>
        )}

        {step === "sent" && (
          <div className="flex flex-col gap-content-l">
            <Icon name="check" className="size-item-large text-content-brand-strong" />
            <h2 className="text-title-h3">Token sent!</h2>
            <p className="text-body-b3">Check your email and collect the token provided</p>
            <Button label="Create New Password" hasLeadIcon={false} className="self-start" onClick={() => setStep("new")} />
          </div>
        )}

        {step === "new" && (
          <form noValidate onSubmit={(e) => { e.preventDefault(); reset() }} className="flex flex-col gap-content-l">
            <h2 className="text-title-h3">New password</h2>
            <p className="text-body-b3">Set your brand new password</p>
            <InputfieldStack
              label="Token"
              placeholder="enter token"
              autoComplete="one-time-code"
              value={token}
              onChange={(e) => { setToken(e.target.value); setTokenWrong(false) }}
              hasFeedback={tokenWrong ? "error" : "null"}
              fieldStatus={keepLook(tokenWrong ? "error" : "null")}
              message={tokenWrong ? { kind: "error", type: "editable", text: "Token is not valid", hasLink: false } : undefined}
            />
            <InputfieldStack
              label="Password"
              type="password"
              placeholder="Your Password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setPasswordTouched(true)}
              hasFeedback={passwordEmpty ? "error" : "null"}
              fieldStatus={keepLook(passwordEmpty ? "error" : "null")}
              message={passwordEmpty ? { kind: "error", type: "empty" } : { kind: "password-strength", feedback: strength }}
            />
            <InputfieldStack
              label="Confirm password"
              type="password"
              placeholder="introduce your password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              onBlur={() => setConfirmTouched(true)}
              hasFeedback={mismatch ? "error" : confirm !== "" && confirm === password ? "success" : "null"}
              fieldStatus={keepLook(mismatch ? "error" : confirm !== "" && confirm === password ? "success" : "null")}
              message={mismatch ? { kind: "error", type: "no match" } : undefined}
            />
            <div className="flex justify-end">
              <Button label="Reset password" hasLeadIcon={false} status={canReset ? undefined : "disable"} disabled={!canReset} onClick={reset} />
            </div>
          </form>
        )}

        {step === "success" && (
          <div role="status" className="flex flex-col gap-content-l">
            <Icon name="lock" className="size-item-large text-content-brand-strong" />
            <h2 className="text-title-h3">Password reset successful</h2>
            <p className="text-body-b3">You have successfully reset your password. Login page will load automatically.</p>
            <LineLoader className="self-end" />
          </div>
        )}
      </AuthCard>
    </AuthStage>
  )
}

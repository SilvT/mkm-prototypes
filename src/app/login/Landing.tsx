import { Button } from "@/ui"
import { auth } from "@/app/auth"
import { AuthStage } from "./AuthStage"

// Proposed placeholder (the real landing page is built later): proves the session.
export function Landing({ onSignOut }: { onSignOut: () => void }) {
  return (
    <AuthStage>
      <div className="animate-motion-enter flex flex-col items-center gap-content-l">
        <p className="text-body-b2">Signed in as {auth.getSession()?.email}</p>
        <Button label="Sign out" hasLeadIcon={false} onClick={() => { auth.signOut(); onSignOut() }} />
      </div>
    </AuthStage>
  )
}

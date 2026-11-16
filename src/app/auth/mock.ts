import { AuthError, type AuthService, type Session } from "./AuthService"
import { DEMO_ACCOUNT, MOCK_DELAY_MS, VALID_RESET_TOKEN } from "./seed"

const wait = () => new Promise((r) => setTimeout(r, MOCK_DELAY_MS))

let session: Session | null = null // in memory only; a reload signs out

export const mockAuthService: AuthService = {
  async signIn(email, password) {
    await wait()
    if (email !== DEMO_ACCOUNT.email || password !== DEMO_ACCOUNT.password) throw new AuthError("INVALID_CREDENTIALS")
    return (session = { email })
  },
  async requestResetToken() {
    await wait()
  },
  async resetPassword({ token }) {
    await wait()
    if (token !== VALID_RESET_TOKEN) throw new AuthError("TOKEN_INVALID")
  },
  getSession: () => session,
  signOut() {
    session = null
  },
}

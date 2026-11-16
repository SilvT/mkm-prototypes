// The seam. Screens depend on this interface only; swap the implementation in ./index.ts. (Ported from mkm-poc.)
export type AuthErrorCode = "INVALID_CREDENTIALS" | "TOKEN_INVALID" | "NETWORK"

export class AuthError extends Error {
  code: AuthErrorCode
  constructor(code: AuthErrorCode) {
    super(code)
    this.code = code
  }
}

export interface Session {
  email: string
}

export interface AuthService {
  signIn(email: string, password: string): Promise<Session>
  requestResetToken(usernameOrEmail: string): Promise<void>
  resetPassword(input: { token: string; password: string }): Promise<void>
  getSession(): Session | null
  signOut(): void
}

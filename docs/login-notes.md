# Login flow: what is built, and the gaps

**Source of truth:** Figma file "The UI" (`GrTAWT9G3Xsr1pRSVAxHa7`, page "login"). The login screens in the MkM_WIP file are outdated. Copy and placeholders were aligned to The UI on 2026-11-16 (token placeholder "enter token here", "introduce again your new password", email placeholder "introduce your email", token error text, token and password success checks; the reset screens have no strength meter).
The UI also has a designed **Landing page** (welcome card "What you have missed", five nav cards, sidebar) that replaces the placeholder landing once its components exist.
Figma typo: the token error reads "Token is no valid. It needs t o be 7 alphanumerical characters."; built as "Token is not valid. It needs to be 7 alphanumerical characters." (confirm).
Motion: see `docs/motion.md`.
Prototype controls: floating button top left (`src/app/ProtoControls.tsx`) lists flows and screens, shows the demo data, and restarts the current screen. It is prototype chrome, not part of the design.
New password rules (Silvia): 5 to 15 characters (`PASSWORD_MIN`/`PASSWORD_MAX` in `validation.ts`, native `maxLength` on both fields). While the first password field is focused it shows the strength message as bottom text ("Password must be at least 5 characters." until 5 characters, then weak / medium / strong). After leaving a short or empty field it shows an error. Confirm shows "Your passwords don’t match" on blur, or live once it is as long as the password.
Decided (Silvia): "Only numbers, spaces, and symbols (+, -)" is error copy only, not a rule; letters stay allowed. It is the design system error type `Only numbers`, unused for now.

Screens: sign in (empty, invalid email, wrong password with "ask to reset", loading, success), reset password (request, token sent, new password with strength and errors, success with auto-return after 3 s), and a placeholder landing page with Sign out.
Deep links: `?screen=reset`, `?screen=reset&step=sent|new|success`, `?screen=landing`.
Demo data: `src/app/auth/seed.ts` (email, password, token `051TD45`). Change password is deferred (spec decision); the "Change your password" link is left off the card.

## Gaps (inferred, or missing from the design system)

- **Placeholders added:** `Loader` (112px, size has no token) and `LineLoader` in `src/placeholders/loader.tsx`. Speeds (1 s, 1.2 s) are choices, not from the design.
- **Missing icons:** a check-in-circle for "Token sent!" (stand-in: `check`).
- **Feedback only on active fields:** inputfield-base draws error and success only while the field is hovered or focused; Figma shows them on idle fields. Worked around with `fieldStatus="active"` (`keepLook` in `validation.ts`).
- **Focusable feedback icon:** the success/error icon is a button in the tab order, so Tab from Username lands on it before Password. Figma order is username, password, eye, Forgot, Log in.
- **"ask to reset" link:** the error atom renders it without an `onClick`/`href`, so it is not keyboard reachable. Click is caught on the card as a workaround.
- **Token error copy:** a token with the wrong format (not 7 letters/digits) shows "Token is not valid. It needs to be 7 alphanumerical characters." (The UI). A well-formed token the mock does not accept (only `051TD45` works) shows "Token is not valid" (Proposed; The UI does not design this case).
- **Error copy:** "Token is not valid" uses the `editable` type with a text override (no dedicated type).
- **Card:** built as a small `AuthCard` in app code (white, 450 wide); the DS `card` is a different shape (two containers, accent border). Reset cards use the same 450 width; Figma is 365.
- **Page background:** `AuthStage` uses `--gradient-general` directly; needs a design system page/background component.
- **Copy** was first taken from `mkm-poc/docs/login-spec.md`, then reset-screen copy was checked against The UI screenshots; sign-in and success copy are unchanged from that spec.
- **Proposed (not in Figma):** "Back to log in" link on the reset request step; 3 s auto-return after reset success; the landing placeholder; the strength rules (weak under 8 chars or one class; strong at 12+ with three classes).
- Not checked: axe, `npm run verify`-style checks (this repo has none yet), non-Chrome browsers.

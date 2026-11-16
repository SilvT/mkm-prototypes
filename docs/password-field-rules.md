# Password field: restrictions to add to the design system contract

For `inputfield-base.password.type-contract.ts` in ds_POC (and the `inputfield-base` contract where noted). Written 2026-11-16 from the new-password step of the reset flow in mkm-prototypes (`src/app/login/ResetPassword.tsx`, `validation.ts`).
"Decided" = Silvia said so. "Proposed" = my choice while building, not decided: confirm or drop.

## Decided (Silvia, 2026-11-16)

| # | Rule | Notes |
|---|------|-------|
| 1 | **Length: at least 5 and at most 15 characters.** | Max is enforced as the native `maxLength` (typing stops at 15; tested). Min is validation, not a native `minLength`. |
| 2 | **Create-new-password: the first password field shows the password strength as bottom text while it is active (focused).** | Uses the `password-strength` message. Before the minimum is reached the strength message is the `inactive` one: "Password must be at least 5 characters." |
| 3 | **Confirm password can show the error "Your passwords don’t match".** | The existing `error` message, type `no match`, on the confirm field. |
| 4 | **"Only numbers, spaces, and symbols (+, -)" is error copy only, not a password rule.** | It is the existing `Only numbers` error type (written for tel). Letters stay allowed in passwords. Nothing uses it for passwords. |

## Paste-ready contract entries

`rules` (add):
- "Length: at least 5 and at most 15 characters (Silvia, 2026-11-16). The maximum is the native maxLength; the minimum is validation by the screen, not a native minLength."
- "In create-new-password flows the first password field shows `password-strength` as its bottom text while the field is active (Silvia, 2026-11-16). Below the minimum length the strength feedback is `inactive` (copy \"Password must be at least 5 characters.\")."
- "The confirm password field shows the `error` message type `no match` (\"Your passwords don’t match\") when its value differs from the password (Silvia, 2026-11-16)."
- "The error type `Only numbers` (\"Only numbers, spaces, and symbols (+, -)\") is not a password rule: letters are allowed in passwords (Silvia, 2026-11-16)."

`nativeAttributes` (change): replace "No autocomplete, inputMode or minLength is set by the component." with the decision on maxLength: either the component sets `maxLength={15}` for type password, or screens pass it. The prototype passes it from the screen (`PASSWORD_MAX`).

`gaps` (change): the line "autocomplete tokens and the password rules (minimum length) are not decided" is now half answered: minimum 5 and maximum 15 are decided. Autocomplete tokens are still not decided (the prototype uses `current-password` on sign in and `new-password` on reset).

## Proposed (mine, confirm or drop)

- **Strength levels:** under 5 characters: `inactive`. Weak (`error`) under 8 characters or only one character class (lower, upper, digit, symbol). Strong (`success`) at 12 or more characters with three or more classes. Anything else: medium (`warning`). The contract says strength rules are not designed; these are placeholders. Note the 15-character maximum leaves only 12 to 15 for "strong".
- **When the messages show:** while focused: the strength message. After leaving an empty field: error `empty` ("Field is empty"). After leaving a field shorter than 5: error `length` ("Your password must be at least 5 characters"). Not focused and valid: no bottom text.
- **Confirm mismatch timing:** on leaving the field, or live once the confirmation is as long as the password.
- **Success check** on the password field once it has at least 5 characters; on confirm once it equals the password.
- **Duplicate copy for one rule:** the minimum length now appears three ways: the `inactive` strength text ("Password must be at least 5 characters."), the `info` type `password characters` ("Your password must be at least 5 characters") and the `error` type `length` (same words). Decide which one is shown when, or drop two.

## Also found while building (inputfield-base, not password-specific)

- Error and success look (red or green border, fill) is drawn only while the field is hovered or focused (`showFeedback` is false for status `inactive`); Figma shows it on idle fields. Worked around with the stack's `fieldStatus="active"`.
- The feedback icon is a focusable button, so Tab from a valid Username stops on it before the next field. Figma's order has no stop there.
- The error atom's "ask to reset" link has no `href` or `onClick`, so it can't be activated by keyboard or wired by a screen.
- No dedicated error type for a wrong token: used `editable` with a text override.

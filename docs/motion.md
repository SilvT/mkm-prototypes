# Default motion (Proposed)

The design system defines no transitions or animations, so the prototype adds conventional defaults in `src/index.css` (the prototype's own file; synced design system files are not touched). They should move into ds_POC once you agree on them.

| What | Motion | Where |
|---|---|---|
| Screen and step changes (card), loader, landing | Fade in and rise 8px, 200 ms, standard decelerate easing; enter only | `animate-motion-enter` on `AuthCard`; `key={step}` replays it per step |
| Messages inside a field (error, helper, strength) and the feedback icon | Fade in from 4px above, 200 ms | CSS on `inputfield-base-bottom-message*` and `inputfield-base-feedback` slots |
| Hover, focus, press (button, button-icon, links, indicator-count, the input frame) | Colour, background, border, shadow and opacity ease, 150 ms | CSS on those `data-slot`s |
| Reduced motion | Durations drop to ~0 | `--motion-fast` and `--motion-base` tokens under `prefers-reduced-motion` |

Not done: exit animations (nothing animates out), height animation when a message opens (the form shifts instantly), the line loader/spinner timings (placeholders already chosen), button press scale.
Gradient backgrounds cannot be interpolated by CSS, so button fills that use gradients change at the end of the 150 ms, not smoothly.

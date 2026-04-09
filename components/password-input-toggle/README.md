# Password Input Toggle

A password field with a Show/Hide toggle button that switches between masked and plain text.

## Features
- Toggle button uses `aria-pressed` to communicate current state (`true` = visible)
- Button `aria-label` and visible text update together: "Show password" / "Hide password"
- State change announced via an `aria-live="polite"` region ("Password is visible." / "Password is hidden.")
- Input `type` switches between `"password"` and `"text"` on toggle

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus between the password input and the Show/Hide toggle button |
| `Enter` / `Space` | Activate the toggle button to show or hide the password |


## Compliance Snapshot (Public)

| Status | AC Count |
|-----|--------:|
| Implemented | 6 |
| Partial | 1 |
| Missing | 0 |
| Not Applicable | 0 |

Validation flags:
- Keyboard: Pass (automated)
- Screen reader semantics: Pass (automated)
- 200% zoom: Needs manual verification
- Focus contrast: Needs manual verification

Proprietary notice: Full acceptance criteria definitions are proprietary IP in the private @resonance/specs package and are intentionally not reproduced in this repository.

See labs.manifest.json for AC identifier-level status.

## Files
- `password-input-toggle.html` — component markup
- `password-input-toggle.js` — toggle logic and live region updates
- `password-input-toggle.css` — input and toggle button styles
- `index.html` — demo page
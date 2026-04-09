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

## Files
- `password-input-toggle.html` — component markup
- `password-input-toggle.js` — toggle logic and live region updates
- `password-input-toggle.css` — input and toggle button styles
- `index.html` — demo page

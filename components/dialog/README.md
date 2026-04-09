# Dialog

A non-modal dialog panel that provides supplementary information without blocking access to background content.

## Features
- Uses `role="dialog"` with `aria-labelledby` and `aria-describedby`; no `aria-modal` as background remains operable
- Focus moves to the dialog heading on open; returns to the trigger button on close
- Escape key closes the dialog from anywhere on the page
- Tab moves freely to background content — no focus trapping
- State changes announced via `aria-live="polite"` status region

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus freely between the dialog and background content |
| `Enter` / `Space` | Activate the focused button |
| `Escape` | Close the dialog and return focus to the trigger |

## Files
- `dialog.html` — component markup
- `dialog.js` — open/close and keyboard handling
- `dialog.css` — panel and overlay styles
- `index.html` — demo page

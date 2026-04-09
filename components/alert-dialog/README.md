# Alert Dialog

A modal confirmation dialog for destructive or irreversible actions, with focus trapping and an assertive live region.

## Features
- Uses `role="alertdialog"` with `aria-modal="true"`, `aria-labelledby`, and `aria-describedby`
- Focus moves to the first focusable element on open and returns to the trigger on close
- Focus is trapped inside the dialog; Tab and Shift+Tab cycle only within it
- Background content receives `aria-hidden` and `inert` while the dialog is open
- Escape key cancels the action; outcome is announced via `aria-live="polite"`

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the next focusable element within the dialog |
| `Shift + Tab` | Move focus to the previous focusable element within the dialog |
| `Enter` / `Space` | Activate the focused button (Cancel or Confirm) |
| `Escape` | Cancel the action and close the dialog |


## Compliance Snapshot (Public)

| Status | AC Count |
|-----|--------:|
| Implemented | 9 |
| Partial | 5 |
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
- `alert-dialog.html` — component markup
- `alert-dialog.js` — open/close, focus trap, and inert background logic
- `alert-dialog.css` — overlay and panel styles
- `index.html` — demo page
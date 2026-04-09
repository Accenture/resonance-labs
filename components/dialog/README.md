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


## Compliance Snapshot (Public)

| Status | AC Count |
|-----|--------:|
| Implemented | 10 |
| Partial | 3 |
| Missing | 1 |
| Not Applicable | 0 |

Validation flags:
- Keyboard: Pass (automated)
- Screen reader semantics: Pass (automated)
- 200% zoom: Needs manual verification
- Focus contrast: Needs manual verification

Proprietary notice: Full acceptance criteria definitions are proprietary IP in the private @resonance/specs package and are intentionally not reproduced in this repository.

See labs.manifest.json for AC identifier-level status.

## Files
- `dialog.html` — component markup
- `dialog.js` — open/close and keyboard handling
- `dialog.css` — panel and overlay styles
- `index.html` — demo page
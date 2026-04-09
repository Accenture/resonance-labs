# Modal

A modal dialog with focus trapping, backdrop click dismissal, and focus restoration on close.

## Features
- Uses `role="dialog"` with `aria-modal="true"`, `aria-labelledby`, and `aria-describedby`
- Focus moves to the first focusable element inside the modal on open
- Tab and Shift+Tab are trapped within the modal; focus wraps between first and last focusable elements
- Escape key and backdrop click both close the modal
- Focus returns to the element that triggered the modal on close

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the next focusable element within the modal |
| `Shift + Tab` | Move focus to the previous focusable element within the modal |
| `Enter` / `Space` | Activate the focused button |
| `Escape` | Close the modal and return focus to the trigger |


## Compliance Snapshot (Public)

| Status | AC Count |
|-----|--------:|
| Implemented | 9 |
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
- `modal.html` — component markup
- `modal.js` — open/close, focus trap, and backdrop handling
- `modal.css` — backdrop overlay and panel styles
- `index.html` — demo page
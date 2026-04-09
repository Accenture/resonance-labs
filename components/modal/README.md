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

## Files
- `modal.html` — component markup
- `modal.js` — open/close, focus trap, and backdrop handling
- `modal.css` — backdrop overlay and panel styles
- `index.html` — demo page

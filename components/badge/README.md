# Badge

Removable filter tags grouped inside a labelled container, with live region announcements when items are removed.

## Features
- Badge group uses `role="group"` with `aria-label` to convey context to screen readers
- Each remove button has an `aria-label` naming the specific filter being removed
- Removal announces the item name via an `aria-live="polite"` region
- Focus moves to the next or previous remove button after deletion; falls back to the group when empty

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the next remove button |
| `Enter` / `Space` | Remove the focused badge |

## Files
- `badge.html` — component markup
- `badge.js` — removal logic, focus management, and live region updates
- `badge.css` — pill layout and close button styles
- `index.html` — demo page

# Star Rating

An interactive star rating widget using `role="radiogroup"` and a read-only display variant.

## Features
- Interactive stars use `role="radio"` inside a `role="radiogroup"`; roving tabindex manages focus
- `aria-checked="true"` marks the selected star and all stars at or below it
- Selection announced via `aria-live="polite"` status text
- Keyboard: Arrow Right/Up move to the next star (wrapping), Arrow Left/Down move to the previous star, Space or Enter confirm
- Read-only display uses `aria-label` on the container with the full rating text; decorative stars are `aria-hidden="true"`

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the star rating group |
| `Arrow Right` / `Arrow Up` | Move to the next star and select it (wraps to first) |
| `Arrow Left` / `Arrow Down` | Move to the previous star and select it (wraps to last) |
| `Enter` / `Space` | Confirm the focused star rating |

## Files
- `star-rating.html` — component markup with interactive and read-only variants
- `star-rating.js` — selection, keyboard navigation, and live region logic
- `star-rating.css` — star and focus styles
- `index.html` — demo page

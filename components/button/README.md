# Button

Demonstrates standard, icon-decorated, and stateful toggle button patterns.

## Features
- Toggle button uses `aria-expanded` and `aria-controls` to communicate panel state
- Panel is shown/hidden via the `hidden` attribute; focus stays on the trigger
- Action outcomes announced through an `aria-live="polite"` status region
- Decorative icons are `aria-hidden="true"`

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the next button |
| `Enter` / `Space` | Activate the focused button |

## Files
- `button.html` — component markup with all variants
- `button.js` — toggle and action handling
- `button.css` — button and panel styles
- `index.html` — demo page

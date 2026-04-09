# Pill

Removable filter pills implemented as buttons, with screen reader announcements on removal.

## Features
- Each pill is a `<button>` with a full `aria-label` describing the filter being removed
- Decorative `×` character is `aria-hidden="true"`
- Removal announced via an `aria-live="polite"` region naming the removed filter

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the next pill button |
| `Enter` / `Space` | Remove the focused pill |

## Files
- `pill.html` — component markup
- `pill.js` — removal logic and live region update
- `pill.css` — pill button styles
- `index.html` — demo page

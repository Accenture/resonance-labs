# Card

A content card that is fully clickable for pointer users while remaining keyboard-accessible via a single link.

## Features
- A single `<a>` element inside the card serves as the keyboard tab stop for navigation
- `aria-labelledby` on the link references both the heading and CTA text for a descriptive accessible name
- Pointer clicks on non-interactive card regions navigate via `window.location.href`; clicks on the link use default behaviour
- Decorative image uses `alt=""`; the CTA text span is `aria-hidden="true"` to avoid duplication

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the card link |
| `Enter` | Navigate to the card destination |

## Files
- `card.html` — component markup
- `card.js` — pointer click delegation
- `card.css` — card layout and hover styles
- `index.html` — demo page

# Accordion

Expand and collapse sections of content independently using accessible button triggers.

## Features
- Each section toggles independently; multiple panels can be open simultaneously
- `aria-expanded` reflects open/collapsed state on each trigger button
- `aria-controls` links each button to its panel; panels use `role="region"` with `aria-labelledby`
- Panels hidden via the `hidden` attribute to remove them from the accessibility tree when collapsed
- Keyboard: Tab to move between triggers, Enter or Space to toggle

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the next accordion trigger |
| `Enter` / `Space` | Toggle the focused accordion panel open or closed |

## Files
- `accordion.html` — component markup
- `accordion.js` — expand/collapse logic
- `accordion.css` — styles for headers and panels
- `chevron-down.svg` — icon used inside trigger buttons
- `index.html` — demo page

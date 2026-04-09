# Disclosure

Show/hide content panels triggered by individual buttons; multiple panels can be open at the same time.

## Features
- Each trigger uses `aria-expanded` and `aria-controls` to communicate state and reference its panel
- Panels are hidden via the `hidden` attribute when collapsed
- Sections are independent — opening one does not close others (unlike an accordion)
- Focus remains on the trigger after toggle; no focus management required

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the next disclosure trigger |
| `Enter` / `Space` | Toggle the focused disclosure panel open or closed |

## Files
- `disclosure.html` — component markup with multiple disclosure widgets
- `disclosure.js` — toggle logic
- `disclosure.css` — panel and trigger styles
- `index.html` — demo page

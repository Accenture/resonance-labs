# Tooltip

Contextual hint panels in two patterns: hover/focus reveal and click/toggle reveal.

## Features
- Tooltip panel uses `role="tooltip"`; trigger references it via `aria-describedby`
- Pattern 1 (hover/focus): panel shows on `mouseenter` or `focus`, hides on `mouseleave` or `blur`; Escape dismisses without moving focus
- Pattern 2 (click): trigger uses `aria-expanded` and `aria-controls`; Enter, Space, or click toggle the panel; Escape closes it
- Hovering the panel itself keeps it visible; it hides only when both the trigger and panel are no longer hovered/focused

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the tooltip trigger |
| `Focus` (Pattern 1) | Show the tooltip panel |
| `Blur` (Pattern 1) | Hide the tooltip panel |
| `Enter` / `Space` (Pattern 2) | Toggle the tooltip panel open or closed |
| `Escape` | Dismiss the tooltip without moving focus |

## Files
- `tooltip.html` — component markup with both patterns
- `tooltip.js` — hover/focus and click pattern logic
- `tooltip.css` — panel positioning and visibility styles
- `index.html` — demo page

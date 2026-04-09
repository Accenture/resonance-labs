# Skip Navigation

A visually hidden skip link that becomes visible on focus and jumps keyboard users past repeated navigation.

## Features
- Skip link is the first focusable element on the page, visible only on keyboard focus
- Click handler moves focus to the target landmark and scrolls it into view
- Target element receives `tabindex="-1"` programmatically if not already focusable
- No impact on mouse or touch users

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Reveal the skip link (it is the first focusable element on the page) |
| `Enter` | Skip past navigation and move focus to the main content area |

## Files
- `skip-navigation.html` — component markup with a demo navigation and main content target
- `skip-navigation.js` — focus and scroll handling
- `skip-navigation.css` — visually hidden until focused styles
- `index.html` — demo page

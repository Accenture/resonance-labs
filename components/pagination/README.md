# Pagination

A page navigation component that marks the current page and manages Previous/Next disabled states.

## Features
- Wrapped in a `<nav>` element with `aria-label="Pagination"`
- Current page link carries `aria-current="page"`; all page links have descriptive `aria-label` values
- Previous and Next links gain `aria-disabled="true"` at the first and last pages respectively
- Keyboard: Tab to navigate between links, Enter to activate

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the next page link |
| `Enter` | Navigate to the focused page |

## Files
- `pagination.html` — component markup
- `pagination.js` — current page tracking and prev/next state management
- `pagination.css` — link and active page styles
- `index.html` — demo page

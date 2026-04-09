# Breadcrumbs

Navigation landmark showing the current page's location within a site hierarchy.

## Features
- Wrapped in a `<nav>` element with `aria-label="breadcrumb"`
- Ordered list (`<ol>`) conveys sequence to screen readers
- Current page marked with `aria-current="page"` on its `<span>` (no link)
- Two variants: all items linked, or final item as plain text

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the next breadcrumb link |
| `Enter` | Navigate to the focused link |

## Files
- `breadcrumbs-link.html` — variant where all items are links
- `breadcrumbs-nolink.html` — variant where the current page item is plain text
- `breadcrumbs.js` — keyboard interaction support
- `breadcrumbs.css` — separator and layout styles
- `index.html` — demo page

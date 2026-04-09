# Link

Demonstrates accessible inline link patterns including in-page anchors and external links that open in a new tab.

## Features
- In-page anchor links use a plain `href` with a fragment target
- External links include `target="_blank"` and `rel="noopener"` with an `aria-label` that appends ", opens in a new tab"
- New-window icon is `aria-hidden="true"` to avoid duplicate announcement
- No JavaScript required

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the next link |
| `Enter` | Follow the focused link |

## Files
- `link.html` — component markup with internal and external link examples
- `link.js` — placeholder (no behaviour)
- `link.css` — link and icon styles
- `index.html` — demo page

# Card List

A collection of content cards in a labelled list, each navigable via a single accessible link.

## Features
- List container uses `<section>` with `aria-labelledby` pointing to the section heading
- Cards are `<li>` elements; each card link uses `aria-labelledby` to combine heading and CTA text
- CSS absolute-position overlay makes each card fully clickable without multiple tab stops
- No JavaScript required

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the next card link |
| `Enter` | Navigate to the focused card |

## Files
- `card-list.html` — component markup
- `card-list.js` — placeholder (no behaviour)
- `card-list.css` — grid layout and card overlay styles
- `index.html` — demo page

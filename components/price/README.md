# Price

Static price display patterns covering standard price, price ranges, free items, and explicit currency codes.

## Features
- Visually hidden `<span class="sr-only">` prefixes provide screen reader context ("Price:", "Price range:", etc.)
- Price range separator (`–`) is `aria-hidden="true"`; a visually hidden "to" is inserted for screen readers
- Currency code is included in the markup when the symbol alone is ambiguous
- No JavaScript required

## Keyboard Support

No keyboard interaction required.

## Files
- `price.html` — component markup with all variants
- `price.js` — placeholder (no behaviour)
- `price.css` — typography and layout styles
- `index.html` — demo page

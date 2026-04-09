# Product Card

An e-commerce product card with image, name, price, star rating, and an add-to-cart button.

## Features
- Each card is an `<article>` with `aria-labelledby` pointing to the product name heading
- Star rating container uses `aria-label` with the full text value; decorative star characters are `aria-hidden="true"`
- Add-to-cart button accessible name includes the full product name to distinguish between multiple cards
- Cart additions announced via an `aria-live="polite"` region; region is cleared after 3 seconds to allow re-announcement

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the Add to Cart button |
| `Enter` / `Space` | Activate the Add to Cart button |

## Files
- `product-card.html` — component markup with multiple card examples
- `product-card.js` — add-to-cart announcement logic
- `product-card.css` — card layout and rating styles
- `index.html` — demo page

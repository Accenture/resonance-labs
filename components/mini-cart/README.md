# Mini Cart

A compact cart flyout triggered from a header button, with item removal and live subtotal updates.

## Features
- Trigger button uses `aria-expanded` and `aria-controls`; accessible name includes item count
- Panel opens/closes on trigger click; closes on Escape key or outside click, returning focus to the trigger
- Remove buttons include the product name in their `aria-label`; focus moves to the next item's remove button after deletion
- Subtotal and item count update on removal; changes announced via `aria-live="polite"`
- Empty cart state hides the items list, subtotal, and actions

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus between the cart trigger button and item remove buttons |
| `Enter` / `Space` | Toggle the cart panel open/closed or activate a remove button |
| `Escape` | Close the cart panel and return focus to the trigger |

## Files
- `mini-cart.html` — component markup
- `mini-cart.js` — panel toggle, item removal, and subtotal logic
- `mini-cart.css` — flyout panel and item styles
- `index.html` — demo page

# Wishlist Button

A toggle button for saving or removing a product from a wishlist, available in icon-only and text variants.

## Features
- Uses `aria-pressed` to communicate saved/unsaved state
- Icon-only variant updates `aria-label` on toggle: "Save [product] to wishlist" / "Remove [product] from wishlist"
- Text variant updates the visible label text: "Save to wishlist" / "Saved to wishlist"
- CSS `[aria-pressed="true"]` selectors drive the filled heart visual without extra DOM manipulation
- Focus remains on the button after toggle

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the wishlist button |
| `Enter` / `Space` | Toggle the wishlist state (save or remove the product) |


## Compliance Snapshot (Public)

| Status | AC Count |
|-----|--------:|
| Implemented | 5 |
| Partial | 4 |
| Missing | 0 |
| Not Applicable | 0 |

Validation flags:
- Keyboard: Pass (automated)
- Screen reader semantics: Pass (automated)
- 200% zoom: Needs manual verification
- Focus contrast: Needs manual verification

Proprietary notice: Full acceptance criteria definitions are proprietary IP in the private @resonance/specs package and are intentionally not reproduced in this repository.

See labs.manifest.json for AC identifier-level status.

## Files
- `wishlist-button.html` — component markup with icon-only and text variants
- `wishlist-button.js` — toggle logic with aria-label and label text updates
- `wishlist-button.css` — heart icon and pressed state styles
- `index.html` — demo page
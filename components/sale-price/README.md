# Sale Price

Displays original and sale prices with semantic markup and optional discount percentage badges.

## Features
- Original price uses `<del>` with a visually hidden "Original price:" prefix for screen readers
- Sale price uses `<ins>` with a visually hidden "Sale price:" prefix
- Discount badge uses `aria-label` with the full percentage text (e.g., "20% discount")
- No JavaScript required

## Keyboard Support

No keyboard interaction required.


## Compliance Snapshot (Public)

| Status | AC Count |
|-----|--------:|
| Implemented | 2 |
| Partial | 5 |
| Missing | 2 |
| Not Applicable | 0 |

Validation flags:
- Keyboard: Pass (automated)
- Screen reader semantics: Pass (automated)
- 200% zoom: Needs manual verification
- Focus contrast: Needs manual verification

Proprietary notice: Full acceptance criteria definitions are proprietary IP in the private @resonance/specs package and are intentionally not reproduced in this repository.

See labs.manifest.json for AC identifier-level status.

## Files
- `sale-price.html` — component markup with multiple sale price examples
- `sale-price.js` — placeholder (no behaviour)
- `sale-price.css` — price and badge styles
- `index.html` — demo page
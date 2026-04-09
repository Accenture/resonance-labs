# Price

Static price display patterns covering standard price, price ranges, free items, and explicit currency codes.

## Features
- Visually hidden `<span class="sr-only">` prefixes provide screen reader context ("Price:", "Price range:", etc.)
- Price range separator (`–`) is `aria-hidden="true"`; a visually hidden "to" is inserted for screen readers
- Currency code is included in the markup when the symbol alone is ambiguous
- No JavaScript required

## Keyboard Support

No keyboard interaction required.


## Compliance Snapshot (Public)

| Status | AC Count |
|-----|--------:|
| Implemented | 2 |
| Partial | 2 |
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
- `price.html` — component markup with all variants
- `price.js` — placeholder (no behaviour)
- `price.css` — typography and layout styles
- `index.html` — demo page
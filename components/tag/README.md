# Tag

Static non-interactive labels used to communicate status or category, with optional decorative icons.

## Features
- Tags are `<span>` elements — non-interactive and not focusable
- Decorative SVG icons are `aria-hidden="true"` to prevent redundant announcements
- Colour variants (new, sale, popular) are communicated through visible text, not colour alone
- No JavaScript required

## Keyboard Support

No keyboard interaction required.


## Compliance Snapshot (Public)

| Status | AC Count |
|-----|--------:|
| Implemented | 3 |
| Partial | 0 |
| Missing | 1 |
| Not Applicable | 0 |

Validation flags:
- Keyboard: Pass (automated)
- Screen reader semantics: Pass (automated)
- 200% zoom: Needs manual verification
- Focus contrast: Needs manual verification

Proprietary notice: Full acceptance criteria definitions are proprietary IP in the private @resonance/specs package and are intentionally not reproduced in this repository.

See labs.manifest.json for AC identifier-level status.

## Files
- `tag.html` — component markup with status and category tag variants
- `tag.js` — placeholder (no behaviour)
- `tag.css` — tag colour variant and icon styles
- `index.html` — demo page
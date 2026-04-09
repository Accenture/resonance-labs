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


## Compliance Snapshot (Public)

| Status | AC Count |
|-----|--------:|
| Implemented | 6 |
| Partial | 3 |
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
- `link.html` — component markup with internal and external link examples
- `link.js` — placeholder (no behaviour)
- `link.css` — link and icon styles
- `index.html` — demo page
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


## Compliance Snapshot (Public)

| Status | AC Count |
|-----|--------:|
| Implemented | 4 |
| Partial | 12 |
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
- `card-list.html` — component markup
- `card-list.js` — placeholder (no behaviour)
- `card-list.css` — grid layout and card overlay styles
- `index.html` — demo page
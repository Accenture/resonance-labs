# Badge

Removable filter tags grouped inside a labelled container, with live region announcements when items are removed.

## Features
- Badge group uses `role="group"` with `aria-label` to convey context to screen readers
- Each remove button has an `aria-label` naming the specific filter being removed
- Removal announces the item name via an `aria-live="polite"` region
- Focus moves to the next or previous remove button after deletion; falls back to the group when empty

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the next remove button |
| `Enter` / `Space` | Remove the focused badge |


## Compliance Snapshot (Public)

| Status | AC Count |
|-----|--------:|
| Implemented | 4 |
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
- `badge.html` — component markup
- `badge.js` — removal logic, focus management, and live region updates
- `badge.css` — pill layout and close button styles
- `index.html` — demo page
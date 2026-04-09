# Popover

Non-modal overlay panels triggered by a button, available in text-only and interactive variants.

## Features
- Trigger uses `aria-expanded` and `aria-controls`; panel uses `role="region"`
- Interactive variant moves focus to the first focusable element inside the panel on open
- Escape key closes the panel and returns focus to its trigger
- Light dismiss: clicking outside any open popover closes it
- Opening one popover closes any other currently open popover

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the next interactive element inside an open popover |
| `Enter` / `Space` | Toggle the focused popover trigger open or closed |
| `Escape` | Close the open popover and return focus to its trigger |


## Compliance Snapshot (Public)

| Status | AC Count |
|-----|--------:|
| Implemented | 8 |
| Partial | 3 |
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
- `popover.html` — component markup with text-only and interactive variants
- `popover.js` — open/close, focus management, and light-dismiss logic
- `popover.css` — panel, arrow, and positioning styles
- `index.html` — demo page
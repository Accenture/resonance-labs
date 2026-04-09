# Card

A content card that is fully clickable for pointer users while remaining keyboard-accessible via a single link.

## Features
- A single `<a>` element inside the card serves as the keyboard tab stop for navigation
- `aria-labelledby` on the link references both the heading and CTA text for a descriptive accessible name
- Pointer clicks on non-interactive card regions navigate via `window.location.href`; clicks on the link use default behaviour
- Decorative image uses `alt=""`; the CTA text span is `aria-hidden="true"` to avoid duplication

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the card link |
| `Enter` | Navigate to the card destination |


## Compliance Snapshot (Public)

| Status | AC Count |
|-----|--------:|
| Implemented | 6 |
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
- `card.html` — component markup
- `card.js` — pointer click delegation
- `card.css` — card layout and hover styles
- `index.html` — demo page
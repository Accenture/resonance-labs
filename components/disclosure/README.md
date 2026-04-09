# Disclosure

Show/hide content panels triggered by individual buttons; multiple panels can be open at the same time.

## Features
- Each trigger uses `aria-expanded` and `aria-controls` to communicate state and reference its panel
- Panels are hidden via the `hidden` attribute when collapsed
- Sections are independent — opening one does not close others (unlike an accordion)
- Focus remains on the trigger after toggle; no focus management required

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the next disclosure trigger |
| `Enter` / `Space` | Toggle the focused disclosure panel open or closed |


## Compliance Snapshot (Public)

| Status | AC Count |
|-----|--------:|
| Implemented | 7 |
| Partial | 1 |
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
- `disclosure.html` — component markup with multiple disclosure widgets
- `disclosure.js` — toggle logic
- `disclosure.css` — panel and trigger styles
- `index.html` — demo page
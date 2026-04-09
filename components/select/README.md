# Select

A native `<select>` element with a visible `<label>`, providing a department picker with full browser and assistive technology support.

## Features
- Native `<select>` is used so all keyboard, pointer, and screen reader behaviour is handled by the browser
- `<label>` is explicitly associated via `for`/`id`
- No JavaScript required

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the select element |
| `Arrow Down` / `Arrow Up` | Move between options in the dropdown |
| `Enter` / `Space` | Open the dropdown or confirm the selected option |


## Compliance Snapshot (Public)

| Status | AC Count |
|-----|--------:|
| Implemented | 3 |
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
- `select.html` — component markup
- `select.js` — placeholder (no behaviour)
- `select.css` — select element styles
- `index.html` — demo page
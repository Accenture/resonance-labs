# Checkbox

Native checkbox inputs with associated labels and hint text, plus a custom ARIA checkbox with indeterminate state.

## Features
- Native `<input type="checkbox">` linked to `<label>` via `for`/`id`; no extra ARIA needed
- `aria-describedby` connects hint text to each input
- Custom ARIA checkbox cycles through `aria-checked` states: `false`, `true`, `mixed`
- Custom checkbox handles Space and Enter keydown to toggle state
- Prefer native checkboxes; use the ARIA pattern only when a custom visual is required

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the next checkbox |
| `Space` | Toggle the focused checkbox |
| `Enter` | Toggle the custom ARIA checkbox (cycles false → true → mixed) |


## Compliance Snapshot (Public)

| Status | AC Count |
|-----|--------:|
| Implemented | 9 |
| Partial | 7 |
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
- `checkbox-label.html` — native checkbox with label and description
- `checkbox-state.html` — native checkbox demonstrating required-field pattern
- `checkbox.js` — custom ARIA checkbox behaviour
- `checkbox.css` — checkbox and hint styles
- `index.html` — demo page
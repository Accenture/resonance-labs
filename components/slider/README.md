# Slider

A draggable range slider using `role="slider"` with keyboard navigation and an optional value prefix.

## Features
- Thumb uses `role="slider"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, and optional `aria-valuetext` for prefixed values (e.g., "$150")
- Keyboard: Arrow Right/Up increment by one step, Arrow Left/Down decrement, Page Up/Down use a larger step, Home/End jump to min/max
- Mouse and touch drag supported; click on the track jumps to the clicked position
- `<output>` element displays the current value alongside the slider

## Keyboard Support

| Key | Action |
|-----|--------|
| `Arrow Right` / `Arrow Up` | Increase the value by one step |
| `Arrow Left` / `Arrow Down` | Decrease the value by one step |
| `Page Up` | Increase the value by a large step |
| `Page Down` | Decrease the value by a large step |
| `Home` | Set the value to the minimum |
| `End` | Set the value to the maximum |


## Compliance Snapshot (Public)

| Status | AC Count |
|-----|--------:|
| Implemented | 17 |
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
- `slider.html` — component markup with volume and price examples
- `slider.js` — keyboard and pointer drag logic
- `slider.css` — track, fill, and thumb styles
- `index.html` — demo page
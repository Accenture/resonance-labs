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

## Files
- `slider.html` — component markup with volume and price examples
- `slider.js` — keyboard and pointer drag logic
- `slider.css` — track, fill, and thumb styles
- `index.html` — demo page

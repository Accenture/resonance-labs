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

## Files
- `checkbox-label.html` — native checkbox with label and description
- `checkbox-state.html` — native checkbox demonstrating required-field pattern
- `checkbox.js` — custom ARIA checkbox behaviour
- `checkbox.css` — checkbox and hint styles
- `index.html` — demo page

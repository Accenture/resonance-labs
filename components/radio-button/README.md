# Radio Button

Native radio button group inside a `<fieldset>` with a `<legend>` and per-option hint text.

## Features
- `<fieldset>` and `<legend>` provide group context to screen readers without extra ARIA
- Each `<input type="radio">` is linked to its `<label>` via `for`/`id`
- Hint text is associated via `aria-describedby` on each input
- Arrow keys move between options within the group (native browser behaviour)
- No JavaScript required

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the radio group |
| `Arrow Down` / `Arrow Right` | Move to the next radio option and select it |
| `Arrow Up` / `Arrow Left` | Move to the previous radio option and select it |

## Files
- `radio-button.html` — component markup
- `radio-button.js` — placeholder (no behaviour)
- `radio-button.css` — radio group and hint styles
- `index.html` — demo page

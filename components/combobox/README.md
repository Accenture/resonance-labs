# Combobox

An editable combobox input that filters a listbox of options as the user types, keeping focus on the input throughout.

## Features
- Input uses `role="combobox"` with `aria-haspopup="listbox"`, `aria-expanded`, and `aria-controls`
- Active option tracked via `aria-activedescendant`; `aria-selected` kept in sync on the selected option
- Hint text updates to guide keyboard users when the listbox opens
- Keyboard: Arrow Down/Up to navigate, Enter to select, Escape to close, Tab to dismiss without selecting

## Keyboard Support

| Key | Action |
|-----|--------|
| `Arrow Down` | Open the listbox or move focus to the next option |
| `Arrow Up` | Move focus to the previous option |
| `Enter` | Select the highlighted option |
| `Escape` | Close the listbox without selecting |
| `Tab` | Close the listbox and move focus to the next element |

## Files
- `combobox.html` — component markup
- `combobox.js` — filtering, option rendering, and keyboard handling
- `combobox.css` — input and listbox styles
- `index.html` — demo page

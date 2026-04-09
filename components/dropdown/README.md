# Dropdown

A custom single-select dropdown built with the combobox/listbox pattern, keeping focus on the trigger throughout.

## Features
- Trigger uses `role="combobox"` with `aria-haspopup="listbox"`, `aria-expanded`, and `aria-activedescendant`
- Options use `role="option"` and `aria-selected`; selected option is reflected in the trigger's visible text
- Keyboard: Arrow Down/Up to move between options, Enter or Space to select, Escape to close
- `mousedown` on the listbox is prevented to stop the trigger losing focus during click selection
- Closes automatically when focus leaves the dropdown

## Keyboard Support

| Key | Action |
|-----|--------|
| `Enter` / `Space` | Open the dropdown or select the highlighted option |
| `Arrow Down` | Open the dropdown or move to the next option |
| `Arrow Up` | Move to the previous option |
| `Escape` | Close the dropdown without selecting |
| `Tab` | Close the dropdown and move focus to the next element |

## Files
- `dropdown.html` — component markup
- `dropdown.js` — open/close, option selection, and keyboard handling
- `dropdown.css` — trigger and listbox styles
- `index.html` — demo page

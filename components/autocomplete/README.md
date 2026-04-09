# Autocomplete

Text input that filters a listbox of options as the user types, with full keyboard and screen reader support.

## Features
- Input uses `role="combobox"` with `aria-autocomplete="list"`, `aria-expanded`, and `aria-controls`
- Active option tracked via `aria-activedescendant` on the input
- Live region announces result count and "No results found" state
- Keyboard: Arrow Up/Down to navigate options, Enter to select, Escape to close

## Keyboard Support

| Key | Action |
|-----|--------|
| `Arrow Down` | Open the listbox and move to the next suggestion |
| `Arrow Up` | Move to the previous suggestion |
| `Enter` | Select the highlighted suggestion |
| `Escape` | Close the suggestion listbox |

## Files
- `autocomplete.html` — component markup
- `autocomplete.js` — filtering, keyboard navigation, and ARIA management
- `autocomplete.css` — styles for input, suggestion list, and no-results message
- `index.html` — demo page

# Faceted Filter

A multi-group filter panel with collapsible sections, checkboxes, and a live result count.

## Features
- Each filter group is a `<fieldset>` with a `<legend>`; checkboxes are native inputs for built-in keyboard support
- Group toggle buttons use `aria-expanded` and `aria-labelledby` referencing the group legend
- Active filter count updates in an `aria-live="polite"` region on every checkbox change
- "Clear all" button unchecks all filters and moves focus to the first toggle button

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus between group toggle buttons, checkboxes, and the Clear all button |
| `Enter` / `Space` | Toggle a filter group open/closed or check/uncheck a filter |

## Files
- `faceted-filter.html` — component markup with category, colour, and price groups
- `faceted-filter.js` — toggle, filter count, and clear-all logic
- `faceted-filter.css` — group and checkbox layout styles
- `index.html` — demo page

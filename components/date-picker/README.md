# Date Picker

A calendar date picker with a text input for manual entry and a popup grid with full keyboard navigation.

## Features
- Input uses `role="combobox"` with `aria-haspopup="dialog"` and format hint via `aria-describedby`
- Calendar popup uses `role="dialog"` with `role="grid"` inside; roving tabindex manages focus within the grid
- Month/year heading is a live region that updates on navigation
- Keyboard inside grid: Arrow keys move day by day, Page Up/Down change month, Home/End move within week, Enter or Space selects
- `aria-current="date"` marks today; `aria-selected="true"` marks the chosen date; outside/disabled days get `aria-disabled="true"` and `tabindex="-1"`
- Calendar closes on Escape, outside click, or date selection, returning focus to the input

## Keyboard Support

| Key | Action |
|-----|--------|
| `Arrow Down` | Open the calendar from the input field |
| `Arrow Right` | Move focus to the next day in the calendar grid |
| `Arrow Left` | Move focus to the previous day |
| `Arrow Down` | Move focus to the same day in the next week |
| `Arrow Up` | Move focus to the same day in the previous week |
| `Home` | Move focus to the first day of the current week |
| `End` | Move focus to the last day of the current week |
| `Page Down` | Move to the same day in the next month |
| `Page Up` | Move to the same day in the previous month |
| `Enter` / `Space` | Select the focused date |
| `Escape` | Close the calendar and return focus to the input |


## Compliance Snapshot (Public)

| Status | AC Count |
|-----|--------:|
| Implemented | 18 |
| Partial | 4 |
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
- `date-picker.html` — component markup
- `date-picker.js` — calendar rendering, keyboard navigation, and selection logic
- `date-picker.css` — calendar grid and input styles
- `index.html` — demo page
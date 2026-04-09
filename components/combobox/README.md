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


## Compliance Snapshot (Public)

| Status | AC Count |
|-----|--------:|
| Implemented | 23 |
| Partial | 9 |
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
- `combobox.html` — component markup
- `combobox.js` — filtering, option rendering, and keyboard handling
- `combobox.css` — input and listbox styles
- `index.html` — demo page
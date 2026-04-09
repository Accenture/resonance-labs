# Listbox

Single-select and multi-select listbox widgets with full keyboard navigation and ARIA selection state.

## Features
- Single-select: Arrow keys move focus and selection simultaneously; Home/End jump to first/last enabled option
- Multi-select: Space toggles individual options; Shift+Arrow extends a selection range; Ctrl+A selects all
- `aria-activedescendant` on the listbox tracks the focused option; `aria-selected` reflects each option's state
- Disabled options use `aria-disabled="true"` and are skipped by keyboard navigation
- Focus and blur handlers manage the visual focus indicator and clear `aria-activedescendant`

## Keyboard Support

| Key | Action |
|-----|--------|
| `Arrow Down` | Move focus to the next enabled option (single-select: also selects it) |
| `Arrow Up` | Move focus to the previous enabled option (single-select: also selects it) |
| `Home` | Move focus to the first enabled option |
| `End` | Move focus to the last enabled option |
| `Space` | Toggle selection of the focused option (multi-select only) |
| `Shift + Arrow Down` / `Shift + Arrow Up` | Extend the selection range (multi-select only) |
| `Ctrl + A` | Select all enabled options (multi-select only) |


## Compliance Snapshot (Public)

| Status | AC Count |
|-----|--------:|
| Implemented | 16 |
| Partial | 2 |
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
- `listbox.html` — component markup with single-select and multi-select examples
- `listbox.js` — keyboard navigation, selection, and range-select logic
- `listbox.css` — option focus and selection styles
- `index.html` — demo page
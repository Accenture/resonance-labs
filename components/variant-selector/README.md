# Variant Selector

Radio-group option selectors for product attributes such as size and colour, with roving tabindex and out-of-stock states.

## Features
- Each option group uses `role="radiogroup"` inside a `<fieldset>` with a `<legend>`
- Options use `role="radio"` with `aria-checked`; roving tabindex keeps one option in the tab sequence per group
- Disabled/out-of-stock options carry `aria-disabled="true"` and are skipped by keyboard navigation
- Selection announced via `aria-live="polite"` naming the group and chosen value; region cleared after 3 seconds
- Keyboard: Arrow Right/Down move to the next enabled option, Arrow Left/Up move to the previous; Space or Enter confirm

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the next option group |
| `Arrow Right` / `Arrow Down` | Move focus to the next enabled option within a group |
| `Arrow Left` / `Arrow Up` | Move focus to the previous enabled option within a group |
| `Space` / `Enter` | Select the focused option |


## Compliance Snapshot (Public)

| Status | AC Count |
|-----|--------:|
| Implemented | 5 |
| Partial | 4 |
| Missing | 2 |
| Not Applicable | 0 |

Validation flags:
- Keyboard: Pass (automated)
- Screen reader semantics: Pass (automated)
- 200% zoom: Needs manual verification
- Focus contrast: Needs manual verification

Proprietary notice: Full acceptance criteria definitions are proprietary IP in the private @resonance/specs package and are intentionally not reproduced in this repository.

See labs.manifest.json for AC identifier-level status.

## Files
- `variant-selector.html` — component markup with size and colour groups
- `variant-selector.js` — selection, roving tabindex, and announcement logic
- `variant-selector.css` — option button and swatch styles
- `index.html` — demo page
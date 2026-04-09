# Quantity Stepper

A number input with increment/decrement buttons for adjusting product quantities within a min/max range.

## Features
- Input uses `aria-labelledby`, `aria-valuemin`, `aria-valuemax`, and `aria-valuenow`
- Decrement/increment buttons carry descriptive `aria-label` values including the product name
- Boundary buttons receive `aria-disabled="true"` when the value reaches min or max
- Quantity changes announced via a shared `aria-live="polite"` region naming the product and new value
- Arrow Up/Down on the input increment or decrement by one; direct entry is validated on change and blur

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus between the decrement button, quantity input, and increment button |
| `Enter` / `Space` | Activate the focused decrement or increment button |
| `Arrow Up` | Increment the quantity by one (when the input is focused) |
| `Arrow Down` | Decrement the quantity by one (when the input is focused) |


## Compliance Snapshot (Public)

| Status | AC Count |
|-----|--------:|
| Implemented | 9 |
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
- `quantity-stepper.html` — component markup with two stepper examples
- `quantity-stepper.js` — increment/decrement, validation, and announcement logic
- `quantity-stepper.css` — stepper layout styles
- `index.html` — demo page
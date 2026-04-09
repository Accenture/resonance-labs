# Cart Summary

A shopping cart table with editable quantities, line total calculations, and item removal.

## Features
- Table uses `<caption>` and `scope` attributes on all header cells
- Each quantity input has a visually hidden `<label>`; stepper buttons have descriptive `aria-label` values
- Remove buttons include the product name in their `aria-label`
- Order totals recalculate on every quantity or removal change and are announced via `aria-live="polite"`
- Empty cart state is announced and focused after the last item is removed

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus between quantity inputs, stepper buttons, and remove buttons |
| `Enter` / `Space` | Activate the focused stepper or remove button |


## Compliance Snapshot (Public)

| Status | AC Count |
|-----|--------:|
| Implemented | 8 |
| Partial | 5 |
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
- `cart-summary.html` — component markup
- `cart-summary.js` — quantity management, totals calculation, and focus handling
- `cart-summary.css` — table and totals layout
- `index.html` — demo page
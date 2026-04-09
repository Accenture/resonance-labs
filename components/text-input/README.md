# Text Input

Labelled text and email inputs with hint text, required field marking, and inline validation error messages.

## Features
- Each input has a visible `<label>` associated via `for`/`id`
- Required marker `*` is `aria-hidden="true"`; the `required` attribute on the input conveys the constraint to assistive technology
- Hint text linked via `aria-describedby`; error message added to `aria-describedby` on validation failure
- `aria-invalid="true"` set on invalid inputs; cleared when the value becomes valid
- On form submit, the first invalid field receives focus

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the next input or submit button |
| `Enter` | Submit the form; focus moves to the first invalid field if validation fails |

## Files
- `text-input.html` — component markup with username and email examples
- `text-input.js` — submit validation and error display logic
- `text-input.css` — field, hint, and error message styles
- `index.html` — demo page

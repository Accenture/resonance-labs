# Toggle Switch

A binary on/off switch using `role="switch"` with `aria-checked` state management.

## Features
- Each switch is a `<button role="switch">` with `aria-checked` reflecting on/off state
- `aria-labelledby` links each switch to its visible label; optional hint text uses `aria-describedby`
- Disabled switch uses `aria-disabled="true"` and ignores clicks and key events
- Keyboard: Space and Enter both toggle the switch state; focus stays on the button
- Visual track and handle are `aria-hidden="true"`; CSS `[aria-checked]` selectors drive the visual state

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the next switch |
| `Space` / `Enter` | Toggle the focused switch on or off |


## Compliance Snapshot (Public)

| Status | AC Count |
|-----|--------:|
| Implemented | 13 |
| Partial | 7 |
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
- `toggle-switch.html` — component markup with four variants (off, on, with hint, disabled)
- `toggle-switch.js` — toggle logic and disabled guard
- `toggle-switch.css` — track, handle, and checked state styles
- `index.html` — demo page
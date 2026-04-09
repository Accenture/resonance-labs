# Progress Bar

A native `<progress>` element that simulates an upload with live percentage announcements.

## Features
- Native `<progress>` element with `aria-valuemin`, `aria-valuemax`, and `aria-valuenow` kept in sync
- `aria-busy="true"` set during progress; cleared to `"false"` on completion
- Percentage text updates in an `aria-live="polite"` region beside the bar
- Associated `<label>` provides a visible and accessible description

## Keyboard Support

No keyboard interaction required.


## Compliance Snapshot (Public)

| Status | AC Count |
|-----|--------:|
| Implemented | 2 |
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
- `progress-bar.html` — component markup
- `progress-bar.js` — simulated progress timer
- `progress-bar.css` — progress bar styles
- `index.html` — demo page
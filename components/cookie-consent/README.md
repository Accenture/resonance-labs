# Cookie Consent

A cookie consent banner with accept, reject, and granular preference controls, presented as an accessible dialog.

## Features
- Banner uses `role="dialog"` with `aria-labelledby` and `aria-describedby`
- Focus moves into the banner on open and returns to the trigger on close
- Manage Preferences panel expands inline; focus moves to the first non-disabled checkbox
- Essential cookies checkbox is always `disabled` and checked; analytics/marketing are opt-in
- Preference choices are persisted to `sessionStorage`; banner is suppressed on reload if a choice exists

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus between banner buttons and preference checkboxes |
| `Enter` / `Space` | Activate the focused button or toggle a preference checkbox |


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
- `cookie-consent.html` — component markup including banner and preferences panel
- `cookie-consent.js` — open/close logic, preference persistence, and focus management
- `cookie-consent.css` — banner and panel styles
- `index.html` — demo page
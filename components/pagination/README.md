# Pagination

A page navigation component that marks the current page and manages Previous/Next disabled states.

## Features
- Wrapped in a `<nav>` element with `aria-label="Pagination"`
- Current page link carries `aria-current="page"`; all page links have descriptive `aria-label` values
- Previous and Next links gain `aria-disabled="true"` at the first and last pages respectively
- Keyboard: Tab to navigate between links, Enter to activate

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the next page link |
| `Enter` | Navigate to the focused page |


## Compliance Snapshot (Public)

| Status | AC Count |
|-----|--------:|
| Implemented | 7 |
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
- `pagination.html` — component markup
- `pagination.js` — current page tracking and prev/next state management
- `pagination.css` — link and active page styles
- `index.html` — demo page
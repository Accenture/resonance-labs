# Search Input

A search form with a labelled input, submit button, and a clear button that returns focus to the field.

## Features
- `<form>` uses `role="search"` and `aria-label="Site"` to identify the search landmark
- Input type `search` provides native browser search semantics
- Clear button resets the field and returns focus to the input
- Submit and clear outcomes announced via an `aria-live="polite"` region

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus between the search input, clear button, and submit button |
| `Enter` | Submit the search form |
| `Enter` / `Space` | Activate the clear button when focused |


## Compliance Snapshot (Public)

| Status | AC Count |
|-----|--------:|
| Implemented | 5 |
| Partial | 0 |
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
- `search-input.html` — component markup
- `search-input.js` — submit and clear handling with live region updates
- `search-input.css` — search field and button styles
- `index.html` — demo page
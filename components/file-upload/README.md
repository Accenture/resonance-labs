# File Upload

A drag-and-drop file upload zone with file type/size validation, simulated progress bars, and a managed file list.

## Features
- Dropzone is a labelled `role="region"`; the hidden file input has a descriptive `aria-label` and `aria-describedby` constraint hint
- Upload progress uses `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`
- Status announcements (files added, upload complete, file removed) use `role="status"` with `aria-live="polite"`
- Validation errors (wrong type, oversized file) are surfaced via `role="alert"` with `aria-live="assertive"`
- Remove buttons include the file name in their `aria-label`; focus moves to the next or previous remove button after deletion

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the file input or a file remove button |
| `Enter` / `Space` | Open the file picker when the input is focused; activate a remove button |


## Compliance Snapshot (Public)

| Status | AC Count |
|-----|--------:|
| Implemented | 7 |
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
- `file-upload.html` — component markup
- `file-upload.js` — drag-and-drop, validation, simulated upload, and removal logic
- `file-upload.css` — dropzone, progress bar, and file list styles
- `index.html` — demo page
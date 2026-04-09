# Table

A data table with a caption, scoped column and row headers, and contextual download links.

## Features
- `<caption>` provides an accessible table title
- Column headers use `scope="col"` and row headers use `scope="row"` so screen readers announce the correct headers for each cell
- Repeated "Download" link text is disambiguated with `aria-describedby` referencing the corresponding row header
- No JavaScript required

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the next link within the table |
| `Enter` | Follow the focused link |


## Compliance Snapshot (Public)

| Status | AC Count |
|-----|--------:|
| Implemented | 3 |
| Partial | 1 |
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
- `table.html` — component markup
- `table.js` — placeholder (no behaviour)
- `table.css` — table layout and cell styles
- `index.html` — demo page
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

## Files
- `table.html` — component markup
- `table.js` — placeholder (no behaviour)
- `table.css` — table layout and cell styles
- `index.html` — demo page

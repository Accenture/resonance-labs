# Tabs

A tabbed interface following the WAI-ARIA Tabs pattern with automatic activation and roving tabindex.

## Features
- `role="tablist"` contains `role="tab"` buttons; each tab references its panel via `aria-controls`
- Active tab has `aria-selected="true"` and `tabindex="0"`; inactive tabs have `tabindex="-1"`
- Panels use `role="tabpanel"` with `aria-labelledby` and are shown/hidden via the `hidden` attribute
- Keyboard: Arrow Left/Right navigate between tabs, Home/End jump to first/last, Enter or Space activate the focused tab

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the active tab, then into the tab panel |
| `Arrow Right` | Move focus to the next tab |
| `Arrow Left` | Move focus to the previous tab |
| `Home` | Move focus to the first tab |
| `End` | Move focus to the last tab |
| `Enter` / `Space` | Activate the focused tab and show its panel |

## Files
- `tabs.html` — component markup
- `tabs.js` — tab activation and keyboard navigation logic
- `tabs.css` — tab bar and panel styles
- `index.html` — demo page

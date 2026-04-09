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


## Compliance Snapshot (Public)

| Status | AC Count |
|-----|--------:|
| Implemented | 20 |
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
- `tabs.html` — component markup
- `tabs.js` — tab activation and keyboard navigation logic
- `tabs.css` — tab bar and panel styles
- `index.html` — demo page
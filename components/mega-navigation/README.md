# Mega Navigation

A primary navigation bar with expandable submenus, managed with `aria-expanded` and keyboard dismissal.

## Features
- Navigation landmark uses `<nav>` with `aria-label="Primary"`
- Each top-level item with a submenu is a `<button>` with `aria-expanded` and `aria-controls`
- Opening one submenu automatically closes any other open submenu
- Escape key closes all open submenus from anywhere on the page
- Submenu links are standard `<a>` elements reachable via Tab once the parent is expanded

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus between top-level navigation buttons and submenu links |
| `Enter` / `Space` | Toggle the focused submenu open or closed |
| `Escape` | Close all open submenus |


## Compliance Snapshot (Public)

| Status | AC Count |
|-----|--------:|
| Implemented | 8 |
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
- `mega-navigation.html` — component markup
- `mega-navigation.js` — open/close and Escape key handling
- `mega-navigation.css` — navigation bar and submenu styles
- `index.html` — demo page
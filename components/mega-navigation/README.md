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

## Files
- `mega-navigation.html` — component markup
- `mega-navigation.js` — open/close and Escape key handling
- `mega-navigation.css` — navigation bar and submenu styles
- `index.html` — demo page

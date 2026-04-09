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

## Files
- `cookie-consent.html` — component markup including banner and preferences panel
- `cookie-consent.js` — open/close logic, preference persistence, and focus management
- `cookie-consent.css` — banner and panel styles
- `index.html` — demo page

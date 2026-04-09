# Alert

Status messages in four severity variants — info, success, warning, and error — with optional dismiss behaviour.

## Features
- Static alerts use `role="alert"` so assistive technologies announce them on render
- Dismissible alerts include a labelled close button; removing an alert moves focus to the next dismiss button
- Dynamically injected alerts are appended to a live region container and auto-removed after 6 seconds
- Decorative icons are `aria-hidden="true"`; visible labels use `<strong>` for semantic emphasis

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the next dismiss button |
| `Enter` / `Space` | Dismiss the focused alert |

## Files
- `alert.html` — component markup including static and dismissible variants
- `alert.js` — dismiss logic and dynamic alert injection
- `alert.css` — variant colour themes and layout
- `index.html` — demo page

# Toast

Transient notification messages injected into a live region, with auto-dismiss and a manual close button.

## Features
- Toast container uses `role="status"` with `aria-live="polite"` and `aria-relevant="additions"`
- Each toast is auto-dismissed after 5 seconds; the timer pauses on hover or keyboard focus within the toast
- Dismiss button uses `aria-label="Dismiss notification"` and does not move focus when clicked
- Up to 3 toasts visible at once; additional toasts are queued and shown as space becomes available
- Toast removal uses a CSS animation end event to keep the DOM clean

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the dismiss button within a visible toast |
| `Enter` / `Space` | Dismiss the focused toast |

## Files
- `toast.html` — component markup with trigger buttons and the live region container
- `toast.js` — toast creation, timer management, queue, and removal logic
- `toast.css` — toast appearance and removal animation
- `index.html` — demo page

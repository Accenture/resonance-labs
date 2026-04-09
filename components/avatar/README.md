# Avatar

Displays a user's profile image or initials fallback in small, medium, and large sizes.

## Features
- Decorative image variant uses `alt=""` when the user's name appears in adjacent text
- Standalone informative variant sets a meaningful `alt` description on the image
- Initials fallback uses `aria-label` on the wrapper and `aria-hidden="true"` on the visible text
- Avatar inside a link wraps both the image and name so the link has a full accessible name
- No JavaScript behaviour required

## Keyboard Support

No keyboard interaction required.

## Files
- `avatar.html` — component markup with all variants
- `avatar.js` — placeholder (no behaviour)
- `avatar.css` — size tokens and image cropping
- `index.html` — demo page

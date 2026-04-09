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


## Compliance Snapshot (Public)

| Status | AC Count |
|-----|--------:|
| Implemented | 3 |
| Partial | 1 |
| Missing | 1 |
| Not Applicable | 0 |

Validation flags:
- Keyboard: Pass (automated)
- Screen reader semantics: Pass (automated)
- 200% zoom: Needs manual verification
- Focus contrast: Needs manual verification

Proprietary notice: Full acceptance criteria definitions are proprietary IP in the private @resonance/specs package and are intentionally not reproduced in this repository.

See labs.manifest.json for AC identifier-level status.

## Files
- `avatar.html` — component markup with all variants
- `avatar.js` — placeholder (no behaviour)
- `avatar.css` — size tokens and image cropping
- `index.html` — demo page
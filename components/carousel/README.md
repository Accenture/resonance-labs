# Carousel

A rotating content slideshow with Previous/Next controls, dot navigation, and optional autoplay.

## Features
- Slides hidden with `hidden` attribute; only the active slide is reachable by keyboard
- Live region announces current slide position ("Slide N of M") on each change
- Autoplay pause button uses `aria-pressed` to communicate paused/playing state
- Dot buttons use `aria-current="true"` on the active dot
- Inactive slide links and buttons receive `tabindex="-1"` to prevent off-screen focus

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus between Previous, Next, pause, and dot navigation buttons |
| `Enter` / `Space` | Activate the focused control (navigate slide or toggle autoplay) |


## Compliance Snapshot (Public)

| Status | AC Count |
|-----|--------:|
| Implemented | 10 |
| Partial | 13 |
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
- `carousel.html` — component markup with slides, controls, and dots
- `carousel.js` — slide navigation, autoplay, and focus management
- `carousel.css` — slide layout and transition styles
- `index.html` — demo page
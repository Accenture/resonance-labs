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

## Files
- `carousel.html` — component markup with slides, controls, and dots
- `carousel.js` — slide navigation, autoplay, and focus management
- `carousel.css` — slide layout and transition styles
- `index.html` — demo page

# Image Gallery

A product image gallery with a main display image, thumbnail navigation, and Previous/Next buttons.

## Features
- Main image `alt` text updates dynamically to match the selected thumbnail's description
- Active thumbnail button carries `aria-current="true"`; all others are `"false"`
- Live region announces the current position ("Image N of M") on every change
- Keyboard: Arrow Left/Right/Up/Down within the thumbnail strip, Home/End to jump to first/last

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus between Previous, Next, and thumbnail buttons |
| `Enter` / `Space` | Select the focused thumbnail or activate a navigation button |
| `Arrow Right` / `Arrow Down` | Move to the next thumbnail |
| `Arrow Left` / `Arrow Up` | Move to the previous thumbnail |
| `Home` | Move to the first thumbnail |
| `End` | Move to the last thumbnail |


## Compliance Snapshot (Public)

| Status | AC Count |
|-----|--------:|
| Implemented | 8 |
| Partial | 5 |
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
- `image-gallery.html` — component markup
- `image-gallery.js` — thumbnail selection, prev/next navigation, and keyboard handling
- `image-gallery.css` — main image and thumbnail strip styles
- `index.html` — demo page
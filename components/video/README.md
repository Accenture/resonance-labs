# Video

An accessible video player with captions, audio descriptions, a collapsible transcript, and keyboard volume/seek controls.

## Features
- Native `<video controls>` provides baseline browser accessibility; autoplay is explicitly prevented
- Captions track (`kind="captions"`) and audio descriptions track (`kind="descriptions"`) declared via `<track>`
- Mute toggle uses `aria-pressed` and updates its `aria-label` and visible text on each click
- Audio descriptions toggle enables/disables the descriptions text track and announces the change via live region
- Keyboard on the video element: Arrow Right/Left seek ±5 seconds, Arrow Up/Down adjust volume ±10%
- Transcript is a `<details>`/`<summary>` element — expandable without JavaScript
- Play, pause, end, volume, and seek changes are all announced via `aria-live="polite"`

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus between video controls and custom buttons |
| `Enter` / `Space` | Activate the focused control (play, pause, mute, audio descriptions) |
| `Arrow Right` | Seek forward 5 seconds (when the video element is focused) |
| `Arrow Left` | Seek backward 5 seconds (when the video element is focused) |
| `Arrow Up` | Increase volume by 10% (when the video element is focused) |
| `Arrow Down` | Decrease volume by 10% (when the video element is focused) |


## Compliance Snapshot (Public)

| Status | AC Count |
|-----|--------:|
| Implemented | 16 |
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
- `video.html` — component markup with video element, custom controls, and transcript
- `video.js` — mute, audio description, keyboard seek/volume, and live region logic
- `video.css` — player and controls styles
- `index.html` — demo page
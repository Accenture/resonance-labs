# Progress Bar

A native `<progress>` element that simulates an upload with live percentage announcements.

## Features
- Native `<progress>` element with `aria-valuemin`, `aria-valuemax`, and `aria-valuenow` kept in sync
- `aria-busy="true"` set during progress; cleared to `"false"` on completion
- Percentage text updates in an `aria-live="polite"` region beside the bar
- Associated `<label>` provides a visible and accessible description

## Keyboard Support

No keyboard interaction required.

## Files
- `progress-bar.html` — component markup
- `progress-bar.js` — simulated progress timer
- `progress-bar.css` — progress bar styles
- `index.html` — demo page

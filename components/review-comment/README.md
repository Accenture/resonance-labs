# Review Comment

Customer review cards with star ratings, author metadata, helpful voting, and report actions.

## Features
- Each review is an `<article>` with `aria-label` naming the reviewer
- Star rating uses `aria-label` on the container with the full text value; star characters are `aria-hidden="true"`
- Helpful button `aria-label` includes the current helpful count and updates after each vote
- Report button becomes disabled with text "Reported" after activation
- Vote and report outcomes announced via a shared `aria-live="polite"` region

## Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the next Helpful or Report button |
| `Enter` / `Space` | Activate the focused button |


## Compliance Snapshot (Public)

| Status | AC Count |
|-----|--------:|
| Implemented | 5 |
| Partial | 7 |
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
- `review-comment.html` — component markup with multiple review examples
- `review-comment.js` — helpful vote incrementing and report button logic
- `review-comment.css` — review card and rating styles
- `index.html` — demo page
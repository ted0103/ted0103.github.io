# Plan Review Log: Unified Portfolio Project Thumbnails
Act 1 (grill) complete — plan locked with the user. MAX_ROUNDS=5.

## Round 1 — Codex
- Plan step 7 misses the homepage, which also renders these cards; fix: inspect `/` alongside the index and three detail routes at desktop/mobile widths.
- “Crop position” is limited by the schema to `center` or `top`, while card containers use `object-fit: cover` at several aspect ratios; fix: choose compositions safe for both positions or extend the schema/CSS with an explicit approved focal-point value.
- “Check file size” has no budget or enforcement, so a large 1600×900 asset can regress the landing page unnoticed; fix: set a per-image byte limit and add a decode check for actual WebP format and 1600×900 dimensions.
- Generated headline typography is not a reliable source of exact copy, and one correction pass is not an acceptance criterion; fix: composite the required text with a real font after generation, then visually compare it to the approved wording.
- “Current live screens” is underspecified and therefore not reproducible or auditable; fix: record each source URL, capture date, viewport, and screenshot used for each final asset.
- The plan promises visual inspection but does not define the browser/viewport matrix or preserve evidence; fix: specify exact desktop/mobile viewport sizes and save screenshots of all four affected routes before committing.
- Retaining old files alone is not a rollback procedure because the Markdown metadata will point to the new assets; fix: state the exact prior `media` blocks/paths to restore, or make rollback a documented one-commit revert.

VERDICT: REVISE

### Codex primary response
Accepted all seven findings. The plan now covers the homepage plus four project routes, keeps the existing crop schema with an 80% safe area, enforces a 500 KB WebP and dimension check, renders exact copy through HTML/CSS, records capture provenance, fixes the viewport matrix at 1440×1000 and 390×844 with saved evidence, and documents a one-commit rollback with all prior media values.

## Round 2 — Codex
- Step 5’s center-80% safe area is too wide for the existing mobile home cards: `330×270` renders a 16:9 asset at roughly a centered `1100×900` crop, which cuts into that 1280px-wide region; fix: constrain essential content to the central 68% width (or validate against the actual narrowest crop).
- Step 8 is not connected to `npm run check`; the current verifier only asserts legacy filenames and does not validate the newly selected Markdown media paths, WebP decoding, dimensions, or the 500 KB cap; fix: extend `scripts/verify.mjs` to read all project media blocks and assert those properties in the built output.

VERDICT: REVISE

### Codex primary response
Accepted both findings. The safe area is now the more conservative central 64% width and must be checked against the actual narrowest mobile card. The plan also extends the existing verifier with `sharp` so `npm run check` permanently enforces selected-path existence, WebP decoding, 1600×900 dimensions, and the 500 KB cap.

## Round 3 — Codex
All prior findings are addressed: the 64% safe area fits the narrowest mobile crop, and `npm run check` will enforce the selected media contract through the existing verifier. No new material issue found.

VERDICT: APPROVED

## Visual provenance and approval

- Source captures: 2026-07-28 at 1600×1000 from `https://ted0103.github.io/`, `https://ted0103.github.io/celestial-archive/`, and `https://ted0103.github.io/questmark/`.
- Style reference: `/Users/_ted/Downloads/Generated image 1 (1).png`.
- Generated backgrounds: built-in image generation outputs `call_H5aoGqVYuoeQdifxhuqU9U0W.png`, `call_0XYGzaYYDlFMZyKQQgIpGYok.png`, and `call_30xuggHRFfV9stm8pfrSVGL0.png`.
- Exact typography was composited in HTML/CSS. The approved portfolio wordmark is `TED’S WORK` without a full stop.
- User approved implementation after reviewing the corrected three-image set.

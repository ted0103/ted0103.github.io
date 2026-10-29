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


## 2026-10-07 — Cinematic portfolio planning

### Interview decisions
- Ted selected internship recruiters as the primary audience.
- Ted selected a full cinematic studio redesign.
- Ted selected a cinematic sequence of real projects for the opening.
- Scope of this phase: write the plan before implementation.

### Primary-agent plan review
- Replaced the earlier light-refinement assumption with the explicitly chosen cinematic direction.
- Kept role, technical decisions, and honest project evidence central to the recruiter journey.
- Added static/mobile/reduced-motion fallbacks, immediate navigation, media budgets, and a pause control to prevent the opening from blocking content.
- Preserved previous thumbnail plan/history; its approvals do not apply to the new redesign.
- Recorded the existing deletion of `src/content/profile.md` as a prerequisite requiring an authoritative implementation checkout; no local user changes repaired.
- Included all routes affected by shared styling and preserved app association/download behaviour.
- Independent review: not requested or run. No build, browser acceptance suite, or implementation tests run in this planning phase.

Result: plan is ready for Ted's review; no material product decisions remain open. Exact copy, palette, and capture selection remain reversible implementation choices.

## 2026-10-07 — Local cinematic implementation

- Ted authorized the build, with an explicit instruction not to commit or push. Work is on local branch `codex/portfolio-cinematic` in a separate worktree. The original checkout's missing profile and unrelated files were left alone.
- Rebuilt the homepage around a dark project sequence, a visible three-project grid, evidence, open-source work, and internship-focused contact. Applied the same visual system to Projects, case studies, About, Contact, and 404. Removed the old blocking intro and horizontal project rail. Preserved the standalone Celestial Archive redirect and download/Android association routes.
- Real media: `celestial-gateway-screen-2026.webp`, `celestial-ritual-screen-2026.webp`, and `celestial-settings-screen-2026.webp` were captured from `https://ted0103.github.io/celestial-archive/` on 7 October 2026 at 1280×720. They are 48,446, 56,184, and 55,962 bytes. `questmark-screen-2026.webp` was converted from the repository's existing `questmark-home.png` at 1066×1475; its interface was checked against `https://ted0103.github.io/questmark/` on 7 October 2026. It is 59,564 bytes. The portfolio frame uses the existing `portfolio-home.jpg`.
- The hero uses CSS-timed real screenshots. On narrow screens and with reduced motion, it holds the first frame. A labelled control pauses and resumes the desktop sequence; it also pauses offscreen and in a hidden tab.
- `npm run check` passed: Astro checked 19 files with zero errors, warnings, or hints; nine static pages built; the verifier confirmed 26 required outputs, internal routes, snapshot fallback, local fonts, and Android compatibility. Live GitHub metadata fetch failed in the restricted build environment, so repository activity used the dated 1 August 2026 snapshot. Repository activity was removed from prominent project labels.
- Browser review covered the desktop homepage and Contact at 1280px, the phone homepage and Celestial case study at 390px, and a 320px overflow check. All primary routes were inspected at 390px; no horizontal overflow was found. The pause control changed its accessible name and pressed state when clicked.
- Local preview only. No commit, push, deployment, Lighthouse baseline, 200% zoom audit, or full accessibility certification has been performed.


## 2026-10-07 — Restart with the original visual style

### Confirmed scope
- Ted prefers the original style and rejected the dark cinematic redesign.
- Ted requested improvements to storytelling/imagery, motion/interactions, and layout/navigation together.
- Ted accepted the recommendation to retain familiar sections and rounded cards while changing their order, size, and spacing. Internship recruiters remain the primary audience; no commit or push is authorized.

### Primary-agent review and implementation
- Restored the original light CSS foundation and familiar homepage sections from the unchanged source checkout. Retained original artwork, the six category links, leadership, capabilities, and open-source cards.
- Made Celestial Archive the larger project card and placed the two supporting projects below it. All project cards are visible in the page flow; phone category navigation wraps to show all six destinations.
- Added a work action, Ted’s name, and internship availability to the familiar opening. Project footers show role instead of repository activity.
- Reused the real Celestial Archive captures and added the existing QuestMark interface capture to its case study. Original thumbnail artwork remains intact.
- Replaced the blocking intro with brief progressive entrance motion and kept hover/focus feedback. Text is visible before JavaScript runs. Reduced motion disables decorative animation.
- Local dependency files and generated Astro cache had been offloaded by iCloud, causing the first build attempts to stall. Restored the same lockfile dependencies under `/private/tmp/ted-portfolio-runtime-20261007` and linked them into the checkout; regenerated disposable build/cache files. No dependency versions were changed.
- Independent review was not requested or run. Earlier cinematic verification does not establish acceptance of this new version; current checks are recorded below after completion.


### Current verification
- Final `npm run check` passed: 19 Astro files, zero errors/warnings/hints, nine generated routes, and 26 required outputs. The existing verifier also passed internal-link, thumbnail, offline metadata fallback, font, and Android association checks.
- Browser review: desktop homepage and Celestial case study at 1440×1000; phone homepage, card stack, navigation, and QuestMark screenshots at 390×844. All primary routes were checked at 390px for the correct light background and no horizontal overflow. At 320px the homepage and all six category links fit within the viewport.
- The mobile menu opens, closes with Escape, and returns keyboard focus to its summary button with a visible outline. No warnings or errors were captured in the reviewed phone tab.
- Source review confirmed content is visible by default and reduced-motion rules disable decorative animation. OS reduced-motion emulation, JavaScript-disabled browser mode, Lighthouse, and full accessibility certification were not run.
- GitHub metadata used the dated 1 August 2026 snapshot during the restricted local build; this does not establish live repository status.
- Preview: `http://127.0.0.1:4321/`. Screenshot evidence: `portfolio-light-desktop.png` and `portfolio-light-mobile.png` in the current chat’s visualization directory.
- Changes remain local and uncommitted. The original checkout’s unrelated changes were preserved.


## 2026-10-29 — Hybrid hero refinement

Ted chose a dark luminous hero followed by light project sections. Added `PortfolioHero.astro` and replaced the homepage opening, preserving prior uncommitted content and route work.

| Before | After | Why |
| --- | --- | --- |
| Text-only light opening | Dark luminous opening with seven linked project images in an arc | Make actual work immediately visible |
| Generic Portfolio heading | Name, personal introduction and clear work/about actions | Establish identity and wayfinding |
| No project entrance treatment | Brief 280ms stagger, 220ms pointer hover, explicit focus ring | Add restrained feedback with reduced-motion guards |

Evidence: `GITHUB_OFFLINE=1 npm run check` passed: Astro diagnostics 0 errors/warnings/hints; all nine routes built; existing verifier passed 26 required outputs, internal routes, GitHub snapshot fallback, local fonts and Android compatibility. Browser observed seven hero images loaded, no document overflow at 390px or 320px, visible focus on the first project card, working selected-work anchor, and navigation from the Celestial Archive hero card to its case study. Reviewed desktop and 390px screenshots. Final narrow-screen arc scaling was adjusted to keep edge cards within the viewport.

Limits: physical touch devices and a live OS reduced-motion setting were not tested; the implementation checks the preference before entrance and cancels on changes. Existing project GitHub metadata uses its dated snapshot fallback. Local preview only: no commit, push or deployment.

## 2026-10-29 — Scroll reveal and counterclockwise flow

Ted chose scroll-controlled dissolution: Just_Ted remains visible until scrolling, then dissolves while the project arc and glow emerge. The cards move right → top → left along the upper ellipse, fading at the ends for a continuous wrap. Pointer/focus interaction pauses the orbit, as does the explicit pause button, offscreen position, hidden tab, or reduced-motion preference. No-JavaScript rendering retains the static project content.

| Before | After | Why |
| --- | --- | --- |
| Immediate project arc | Just_Ted followed by a scroll-linked dissolve/reveal | Follow the requested introduction sequence |
| Static project positions | Slow counterclockwise flow and a rotating glow | Connect the project imagery and atmosphere |
| No continuous-motion controls | Pause/resume, interaction pause and reduced-motion fallback | Keep navigation usable and motion controllable |

Verification: final `GITHUB_OFFLINE=1 npm run check` passed with 0 Astro errors/warnings/hints, nine built routes, 26 required outputs, and the new hero math assertions (reveal endpoints, counterclockwise direction, wrap continuity and ellipse bounds). Browser verified opening, scroll dissolve, fully revealed scene, reverse scroll, the reveal anchor, and stable card transforms while paused. Reviewed the 390px mobile reveal. Fixed pre-existing body overflow and the hero's own hidden scroll container to keep the stage stationary and avoid focus-induced internal scrolling.

Limits: no physical-phone or OS reduced-motion setting test. Source contains the reduced-motion and no-JavaScript paths; these were not separately browser-emulated. Preview remains local and unpublished.

## 2026-10-29 — Scroll-and-appear, chrome symbols and typography

Ted replaced the blur/dissolve request with scroll-and-appear motion and chose to retain the existing project symbols. Just_Ted now stays opaque and sharp while translating upward; the next scene rises into view after the departure has begun. Scene arrival completes before the sticky stage ends, and the reveal link reaches that state. Retained counterclockwise orbit, pause controls, interaction pause and motion preference handling.

| Before | After | Why |
| --- | --- | --- |
| Blurred wordmark fade | Sharp wordmark scrolls upward; next scene rises | Follow the revised motion direction |
| Screenshot and coloured logo tiles | Original symbols rendered with silver gradients and cool rim light | Unify the arc while preserving identity |
| Heavier white/blue headings | Lighter system typography, refined spacing and silver highlights | Match the supplied material and typography references |

Added a local SVG rendering component using luminance masks of existing artwork; original assets remain intact. QuestMark's existing icon was downloaded from `ted0103/questmark` at `public/icon-512.png` to `public/projects/questmark-icon.png`; Celestial Archive uses the existing moon-phase app icon, and the portfolio uses its existing T favicon. Adjusted the masking cutoff for QuestMark's dark panel and the visual scale of the full-canvas portfolio favicon.

Browser evidence: reviewed 1280px desktop and 390px phone layouts, confirmed seven chrome marks and valid SVG mask references, no horizontal overflow at 320px or 390px, no blur on the moving wordmark, and full scene opacity at the completed reveal. Final build/verifier and updated motion math checks passed (including delayed arrival and completion before the sticky stage ends).

Limits: no physical-phone, OS preference emulation, or independent review. Work remains local and unpublished.

## 2026-10-29 — Editorial light sections and interaction polish

Refined the light portfolio around the supplied monochrome and editorial references while preserving the Just_Ted and chrome-arc opening. Reused existing assets and fonts; no dependencies or generated imagery.

| Before | After | Why |
| --- | --- | --- |
| Pastel category tiles | Numbered chapter navigation on a warm paper surface | Connect the light sections to the restrained hero |
| Large heading and competing large subheading | Serif heading with selective italic and smaller supporting copy | Establish clearer hierarchy |
| Uniform card framing | Softer image framing, diffuse depth and an explicit case-study action | Make work easier to inspect and open |
| Full-width navigation outline | Compact centred glass pill and dark contact action | Match the reference navigation proportions |
| 420ms whole-section entrance | 280ms project-card reveals, gentle pointer hover and directional CTA feedback | Keep motion purposeful and responsive |

The shared palette also softens the supporting card colours. Retained all routes, project content and existing local edits. Keyboard input bypasses scroll reveal animation; focus cancels active reveal animation, and reduced-motion changes cancel the observed targets.

Checks: final `GITHUB_OFFLINE=1 npm run check` passed with 0 errors/warnings/hints, all nine routes built, and 26 required outputs verified alongside the hero motion checks. Reviewed selected work at 1280px and 390px. Measured no horizontal overflow at 320px or 390px. Verified mobile menu opening, Escape dismissal with focus restored, and Celestial Archive case-study navigation. Direct selected-work anchor resolved below the header. No physical-device, browser performance benchmark or OS reduced-motion setting test. No commit, push or deployment.


## 2026-10-29 — Compact interactive studio and graphite palette

Ted selected the interactive studio layout and supplied the black, silver-white and cool-rim palette. This supersedes the preceding light-section and giant arc/intro layout. The homepage now presents seven projects through one central specimen and one compact detail panel, with a desktop work index and an anchored biography. Original symbols, project descriptions, source visibility, links, case studies and installed-app redirect remain intact.

| Before | After | Why |
| --- | --- | --- |
| Full-screen intro, arc and stacked project sections | Just_Ted masthead, central specimen and seven-item project index | Reduce repeated project space and replace the older card feed |
| Warm paper and pastel route surfaces | Black/graphite surfaces, silver text and ice-blue accents | Follow the latest supplied palette across the website |
| Fixed panel positions | Grid-sized biography and project panels | Prevent overlap on shorter laptop screens |
| Long phone project feed | Collapsible work index and one project at a time | Preserve reading order and reduce scrolling |
| Archive image exceeding its grid track | Constrained image track and smaller featured heading | Prevent the image from covering project text |

Motion uses a slow counterclockwise ambient glow and a short specimen entrance when switching by pointer. A pause control, background-tab pause and reduced-motion styling are included. No new dependencies or generated images. Index links retain real destinations without JavaScript; the default project is server-rendered.

Verification: final `GITHUB_OFFLINE=1 npm run check` passed with zero Astro errors/warnings/hints, nine built routes and 26 required outputs. Added assertions for seven unique work selections with matching panels and exactly one initially visible project. Browser checked all seven switches, active index/panel agreement, minimum panel separation, pause state, keyboard selection, phone focus handoff, and selecting the already-active phone project. Reviewed 1280px desktop, 1024px laptop, 390px phone and 320px narrow-phone layouts; no horizontal overflow in measured views. Reviewed the shared About, Contact, Projects and Celestial Archive case-study palette, including case-study navigation and the archive image boundary fix.

Preview: `portfolio-studio-desktop.jpg`, local server `http://127.0.0.1:4321/`.
Limits: no physical-device performance, screen-reader session, OS motion preference emulation or independent review. No commit, push or deployment. Build uses the existing GitHub metadata snapshot; live GitHub metadata was not refreshed.


## 2026-10-29 — Restore the previous editorial design

Ted requested reverting the studio redesign to the light editorial design shown in the supplied screenshot. Restored the previous homepage source, warm-white shared palette, serif project headings, compact glass navigation, Just_Ted opening and chrome project arc. Removed the unused studio component and restored the previous homepage verification contract. Preserved the other local project content and assets.

The studio entry above is historical and has been reverted. Final `GITHUB_OFFLINE=1 npm run check` passed with zero errors/warnings/hints and all routes/assets verified. Browser confirmed the restored hero, three selected-work cards, warm-white page background, and no horizontal overflow in the desktop view. No commit, push or publication. This revert did not repeat physical-device or OS reduced-motion testing.


## 2026-10-29 — Release validation and faster arc

Ted approved testing, committing and merging the restored editorial design into main. The arc now completes its path in 50 seconds instead of 100 seconds; the ambient glow also moves twice as fast. The existing portfolio symbol is labelled “Ted's Portfolio”.

| Before | After | Why |
| --- | --- | --- |
| Featured archive image exceeded its grid track by about 52px | Constrained grid tracks and image width; measured overlap 0px | Keep project text fully visible without changing the design |
| Featured archive kept a horizontal flex row on phones | Explicit column layout below 860px | Preserve image-first mobile reading order |
| Required-output and route checks only | Also check every local image reference, same-page anchor, unique element ID and the renamed arc label | Catch broken content in release builds |

Final local checks: `GITHUB_OFFLINE=1 npm run check` passed with zero Astro errors/warnings/hints, nine routes, 26 required outputs, motion math and fallback checks. Production preview route matrix covered the homepage, project index, About, Contact, three case studies and 404 at 320px, 390px, 860px, 1024px and 1280px widths; no measured horizontal overflow or broken loaded images. Verified scroll reveal completion, seven arc labels, renamed link navigation, stable paused transforms, movement after resume, native pointer pause without page displacement, mobile menu open/Escape/focus return and contact navigation, and successful copy-email feedback. No captured browser console warnings/errors. The legacy download redirect points to the live app route, which returned HTTP 200; the app is hosted separately from the local preview.

Reviewed the full pending source/assets diff. Local screenshot artifacts are excluded from Git. The separate main checkout's unrelated plan edits and profile deletion remain untouched. OS reduced-motion emulation, a physical phone, screen-reader software and quantitative performance benchmarks were not available in this browser session; preference handling and no-JavaScript content were inspected in source. GitHub CI and the main deployment will be checked after pushing.

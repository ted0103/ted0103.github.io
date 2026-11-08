# Portfolio redesign — Portfoliofy Crayon reference — 2026-11-09

Status: Implemented locally; preview ready to review. No commit, push, or deployment.

## Confirmed direction
- Follow the layout and visual language of https://portfoliofy.io/preview/creative-artsy while preserving Ted’s actual copy, project evidence, dates, roles, and contact destinations. Never copy Robin Vale’s identity, sample project content, or unsupported metrics.
- Keep the existing Home, About, Projects, case-study detail, Contact, Download, and 404 routes, and add a Playground route. Ted chose to add Playground using his existing creative and skills content.
- Match the reference’s top tab navigation, paper rules, pixel display lettering, handwritten short labels, saturated sticker colors, taped photo frames, and collage-style cards. Keep long paragraphs readable in the current sans-serif.
- Use the template’s light two-column case-study card grid and taped-detail-page pattern; this supersedes the previous solid dark/yellow project-panel alternation.
- Map existing content to the template: Home hero/about/project/open-source/contact sections; About bio/story/leadership/education; Playground existing project imagery, tools, and creative interests; case-study list and detail pages remain evidence-led.
- Keep the existing static Astro stack, local font assets, reduced-motion behavior, mobile navigation, contact actions, and `/download/` redirect. Do not add a message form or invented photography.

## Acceptance checks
- All current routes remain available; Playground is added to primary navigation and generated statically.
- Home, project index, all three case studies, About, Playground, Contact, and 404 retain Ted’s original content and adopt the shared Crayon visual language. `/download/` keeps its redirect to the separate app page.
- Inspect desktop and mobile layouts, navigation, project imagery, keyboard access, focus, and reduced-motion behavior. Preserve the current 320px layout guard.
- Build the static preview, inspect desktop and mobile layouts, and run `git diff --check`; update `PLAN-REVIEW-LOG.md` with actual evidence and remaining limits.
- Keep the work local and uncommitted.

## Results and limits — 2026-11-09
- `npm run build` passed: Astro reported zero diagnostics across 21 files, and 10 static pages built, including `/playground/`. `git diff --check` passed.
- Browser review: desktop at 1280×900 on Home, Projects, Celestial Archive, About, and Playground; mobile at 390×844 on Home, Projects, About, Playground, and the Celestial Archive case study; narrow 320×700 on Home and Projects. The 320px review led to a single-column project grid and a single-line name treatment.
- The mobile navigation opened, showed the existing routes including Playground, and closed with Escape. Reduced-motion and focus behavior were checked in source; preference emulation, a complete keyboard audit, 200% zoom, and cross-browser review were not performed.
- GitHub metadata requests could not reach the network and used the checked-in snapshot dated 2026-08-01. `/download/` remains a redirect to the separate Celestial Archive app page, which is not included in this preview.
- Local preview: `http://127.0.0.1:4325/`. No commit, push, or deployment.

## Implementation touchpoints
- Shared shell, navigation, footer, home hero, project cards, project listing/detail, About, Contact, and the existing theme stylesheet.
- New `src/pages/playground.astro`, sourced only from profile fields and shipped project media.
- Existing content collections and project routes remain the source of factual text and imagery.

---

# Previous notebook-paper portfolio redesign — 2026-11-08

Status: Implemented locally; review pending. No commit, push, or deployment authorized.

## Outcome and decisions
- Carry the supplied paper-and-sticker reference across Home, Projects, project details, About, Contact, and 404; retain the existing routes and factual portfolio content.
- Keep Tan Ted Hang, the real project images, current navigation destinations, and the static portfolio architecture. Match the reference’s ruled paper, tabbed header, oversized pixel-style headings, readable body copy, colorful paper labels, and compact editorial grids.
- Use the closest installed pixel fonts for headings and interface labels, with a readable sans-serif for long copy. The screenshot does not identify exact font names.
- Replace the current sticky overlapping project deck with the reference’s distinct grid layout. Add short, restrained reveals, image motion, and control feedback that respect reduced motion.
- Apply the follow-up reference’s dark/yellow alternation between project entries on the Projects page, colored skill tags, and paper-style leadership cards; keep Ted’s project-specific detail pages and factual copy intact.
- Use Pixelify Sans for headings and Silkscreen for compact labels; keep long paragraphs in the existing readable sans-serif body face.

## Approach and touchpoints
- Rework `PortfolioHero.astro` and the shared header/config for the screenshot’s centered name treatment and browser-tab navigation.
- Restyle the existing `store-theme` selectors in `store-preview.css` so every route shares the paper, ink, sticker, image-frame, and typography rules; adjust shared route markup only where the reference hierarchy needs it.
- Retain content collections, project evidence/images, contact behavior, mobile navigation, Lenis, download redirect, Android association, and route structure.
- Remove obsolete hero/orbit logic and update the existing verification assertions that depend on it.

## Acceptance checks
- Home, About, Projects, all three case studies, Contact, 404, and Download retain their content/routes and use the new visual system.
- Check desktop and mobile layouts, navigation, keyboard focus, image loading, and reduced-motion behavior in a local browser.
- Run the existing `npm run check` and `git diff --check`; fix regressions in the requested scope.

## Results and limits — 2026-11-09
- `npm run check` passed after the final typography adjustment: 20 Astro files, zero diagnostics, nine static routes, and all 26 verifier assertions. GitHub metadata fetches fell back to the checked-in 2026-08-01 snapshot.
- Pixelify Sans headings and Silkscreen labels are bundled locally with their OFL notices; long paragraphs retain the readable system sans-serif. The original screenshot does not identify exact font files.
- Desktop browser review covered Home, Projects, and About. Mobile review covered Home, Projects, a Celestial Archive case study, About leadership, and Contact at 390×844; narrow 320×700 review covered Home, Projects, skills, About leadership, Contact, and 404. The small-screen Experience & Leadership heading was adjusted after the first review.
- The mobile menu opened and closed with Escape. Reduced-motion and focus behavior were reviewed in source; motion-preference emulation, a complete keyboard audit, cross-browser checks, and 200% zoom were not performed.
- `/download/` still redirects to `/celestial-archive/download.html`; that separate app is not included in this local preview, so its destination was not reviewed here.

## Risks
- Exact reference typeface names are unverified; the bundled pixel faces are visual matches, not confirmed originals.
- The reference’s example person, copy, imagery, and outcome metrics are not portfolio facts; retain Ted’s verified content and do not invent substitute claims.
- Existing .hallmark artifacts and other untracked work remain untouched.

# Portfolio card interaction fixes — 2026-11-06

Status: User reviewed the refinements and authorized commit and merge on 2026-11-06. Release verification passed; full browser coverage remains pending. Earlier plans below are retained as history.

## Outcome and accepted decisions
- Keep the approved overlapping card entrances, straight landscape finish, current palette, content, routes, and uppercase outlined skill labels.
- Stabilize card interaction and align the artwork's final pose with the outer card. No broader redesign or colour-token migration in this fix.
- The audit identified source-level concerns; their visual severity still needs browser confirmation. No consequential product decision remains open, so no additional interview is needed.

## Approach and files
1. Reproduce focus behavior in `src/styles/store-preview.css`: the current `:focus-within` rule changes sticky cards to relative positioning, clears their top offset, and cancels transforms. Inspect mouse activation and forward/backward keyboard navigation at several scroll positions before choosing the smallest correction.
2. Preserve card positioning while exposing the focused card and its action. Start with stacking and focus-indicator changes; confirm that removing the position reset does not leave focused links covered by another card. Retain visible focus and avoid introducing a scroll jump or new JavaScript unless CSS cannot satisfy these checks.
3. Change `project-art-drift` in the same stylesheet to finish at zero translation and rotation. Preserve the entrance movement and define the acceptance point as completion of the outer card's entrance: artwork should be flat then, rather than continuing to rotate through the exit. Align the artwork's animation range with that endpoint if needed.
4. Record the actual before/after findings and verification limits in the existing `PLAN-REVIEW-LOG.md`. Change markup or scripts only if reproduction establishes that the CSS fix is insufficient.

## Acceptance checks
- Projects, open-source tools, and skills still overlap while entering and settle straight; the project artwork also finishes flat.
- Clicking project/repository links activates the intended destination. Tab and Shift+Tab expose every link and its focus ring without position jumps or occlusion, including cards already pinned beneath another card.
- Check 320px, 390px, 768px, 1280px, and 1920px widths, a short viewport, 200% zoom, RTL, and longer labels. Confirm no clipped actions or horizontal overflow; treat any reproduced blocked content as HIGH severity.
- Confirm reduced-motion, no-JavaScript, and unsupported scroll-timeline fallbacks keep content and links usable. Inspect Chromium and Safari where available; report unavailable checks explicitly.
- Run the existing `npm run verify` after the fix and `git diff --check`. Use browser evidence for layout; the verifier's route/build checks do not establish visual correctness.

## Risks and verification gaps
- Raising a focused card can obscure neighboring cards; keyboard progression and pointer use must both remain usable.
- Scroll timelines on sticky elements may settle differently across engines; test both forward and reverse scrolling.
- Hallmark's render tier currently cannot run because `puppeteer-core` is unavailable. Resolve the capture dependency or use an available browser workflow before claiming visual approval; do not add a production dependency solely for auditing.
- Colour consolidation remains optional maintenance. Hallmark's automated uppercase-label objections conflict with the user's explicit approved design and are not fix requirements.
- No independent review was requested or performed. Implementation was subsequently authorized; keep the fixes local and do not merge before user review.

---

# UI and layout refinement — 2026-10-30

Status: User approved the final prism preview on 2026-10-30 and authorized committing and merging into main. Complete release checks, PR CI, merge and deployment verification.

Use the requested better-ui and better-layout skills while retaining the approved Just_Ted opening, 50-second counterclockwise arc, palette, content and route structure.

- Replace the opening with reference-inspired silver serif Just_Ted lettering, a cobalt halo and prism glints. Animate its entrance and a reversible scroll-driven departure.
- Keep only “A lot of possibility.” and remove the water reflection. Retain the brighter name and white action.
- Reserve a separate band for a shallower project arc. Verify its full movement envelope stays above the name; use ordinary document flow below 700px viewport height.
- Refine shared project surfaces with consistent framing, neutral inset image outlines, quieter shadows and tighter copy spacing.
- Stabilize the pause/resume and copy/copied controls; use matching state icons and short, reversible feedback transitions.
- Keep short viewports in ordinary reading flow, wrap long titles and actions, and anchor menus logically for RTL.
- Offset anchors from sticky navigation and restore initial deep links after the hero establishes its height.
- Verify the build, 320–1280px layouts, the short-screen fallback, RTL and controlled German-label growth. Keep unsupported checks explicitly unverified.

---

# Portfolio refinement — 2026-10-29

Status: Preview approved on 2026-10-29. Local release checks passed; proceed with commit, CI, and merge to main.

## Accepted direction
- Dark, luminous homepage hero with a project-image arc; retain light project sections and internship-recruiter focus.
- Use Ted’s existing symbols and real project links. The arc uses a shared silver/chrome material with cool rim light; replace screenshot tiles with existing app icons, retaining project identities. Typography uses lighter weights, deliberate spacing and silver highlights.
- Motion update approved 2026-10-29: start with Just_Ted. The sharp name scrolls upward out of view; the arc scene rises into view. Cards travel slowly counterclockwise along an upper ellipse with a flowing background glow. Pause while interacting and when offscreen; expose a pause control. Reduced-motion and no-JavaScript modes show the content immediately.
- Preserve the existing uncommitted light-portfolio refinements, routes, content and app association behaviour.

## Editorial refinement — 2026-10-29
- Carry the new references through the light sections: warm paper background, editorial serif headings, quiet chapter navigation and compact glass navigation.
- Strengthen project image framing, text hierarchy and case-study actions. Retain existing content, routes and hero motion.
- Use 280ms individual project-card reveals, gentle image hover movement and directional link feedback. Skip reveal motion after keyboard input and cancel it on focus or reduced-motion changes.

## Scope and checks
- Add a self-contained homepage hero using existing Astro and platform animation APIs; replace only the old opening.
- Check desktop and mobile layout, project links, keyboard access, reduced motion, and the existing build/verifier.
- No new dependencies or generated images.

---

# Plan: Refine Ted’s Original Portfolio

Date: 2026-10-07
Status: Local refinement implemented and checked; ready for Ted’s preview. No commit, push, or deployment authorized.

## Outcome and decisions
- Keep the original light canvas, system typography, blue links, rounded cards, colourful accents, and generous space. The dark cinematic direction is superseded.
- Keep internship recruiters as the primary audience.
- Improve all three areas Ted selected: project storytelling and imagery, motion and interactions, and homepage layout/navigation.
- Ted accepted the recommended layout approach: retain familiar sections and cards, adjusting order, size, and spacing to emphasize the work.

## Approach
- Keep the familiar Portfolio opening. Add a clear selected-work action, Ted’s name, and internship availability.
- Preserve the category navigation and every existing section. Give Celestial Archive a larger featured card and keep the two supporting projects visible; stack them on phones.
- Retain the approved project artwork. Pair case-study text with real interface captures and explicit contribution, decisions, status, and limitations. Reuse the verified screens from the previous local iteration.
- Use brief entrance, focus, and hover effects. Content is visible by default, including without JavaScript; respect reduced motion. No forced intro or continuous autoplay.
- Keep existing routes and the light styling across Projects, About, Contact, and 404. Preserve download and Android association behavior.
- Reuse Astro, existing components, CSS, fonts, and media. No new dependencies.

## Acceptance checks
- The preview is recognizably the original portfolio, with the same palette, typography, cards, and familiar sections.
- All three projects are visible without sideways scrolling; work and contact actions are easy to find.
- New captures have accurate captions and alternative text. No invented impact metrics or new unsupported claims.
- Inspect desktop and phone layouts, mobile navigation, keyboard focus, and reduced-motion behavior; check narrow-screen overflow.
- Run the existing build and verifier, adjusting obsolete assertions to match the accepted layout. Report actual checks and limits in the existing review log.
- Keep changes local and uncommitted until Ted explicitly authorizes otherwise.

## Boundaries
- Work in the existing isolated local checkout. Preserve the original checkout’s unrelated files and profile deletion.
- Preserve earlier plans and review evidence below as history. Their publication instructions do not override Ted’s current no-commit/no-push instruction.
- Independent review was not requested; primary-agent review only.

---

## Superseded cinematic plan — retained for context

# Plan: Cinematic Portfolio for Internship Recruiters

Date: 2026-10-07
Status: Implemented locally on `codex/portfolio-cinematic`; awaiting Ted's preview. No commit, push, or deployment.

## Outcome and confirmed decisions
Make Ted's portfolio memorable while letting internship recruiters quickly understand what he built, his contribution, and his technical judgment.

Ted confirmed during the focused interview:
- Primary audience: internship recruiters.
- Direction: full cinematic studio redesign, superseding the proposed light-design refinement.
- Hero: cinematic sequence of real projects, rather than abstract artwork.

The plan was written first. Ted then authorized local implementation and explicitly withheld permission to commit or push.

## Design and content approach
- Use Gertix as a reference for large imagery, numbered sections, fine dividers, and a consistent graphic language. Create original compositions and use Ted's own product captures.
- Default art direction: dark ink cinematic opening, restrained blue accent, oversized sans-serif headings and small monospaced labels; lighter editorial case-study sections for sustained reading. Treat exact colours and spacing as reversible design choices.
- Show Ted's name, a specific software-building statement, and internship intent immediately. Draft heading: “Thoughtful interfaces. Useful software.” Confirm current education wording against authoritative profile content before publishing it.
- Primary action: “Explore selected work”; secondary: contact. Keep direct navigation to Projects, About, and Contact. Replace the six equally weighted category tiles with a simpler page flow.
- Sequence: hero → selected projects → linked evidence of contribution/achievement → open-source tools → short personal introduction → contact. Move capabilities into demonstrated project context instead of a large standalone tool inventory.
- Retain Celestial Archive as the initial flagship, followed by QuestMark; give the portfolio itself lower visual priority. Keep existing project URLs and all current projects accessible. Reassess ranking only if current evidence shows another project is stronger for recruitment.
- Feature one large project with two supporting entries in a visible desktop grid; stack on mobile. Each entry states problem, Ted's role, status, and a concise supported result. Avoid equating repository activity with impact.
- Improve the Celestial Archive case study with three real, annotated interface captures: reading flow, bilingual interaction, and privacy/export controls where actually present. Organize its story around problem, contribution, decisions/tradeoffs, shipped behaviour, and limitations. Retain existing case-study content on other projects, adapting shared layout and hierarchy.
- Surface only supported achievements. Name an award/event and year when documented; omit unverified metrics, employer logos, adoption claims, and testimonials. Distinguish a working feature from a measured user outcome.

## Cinematic media and motion
- Capture representative current screens of Celestial Archive and QuestMark with non-sensitive demo content; record URL, date, viewport, and capture path in the existing review log.
- Start with a timed sequence of real product screenshots, supported by a sharp static first frame. No generated interface states, new 3D engine, or animation framework. Add a clip only when genuine footage is available and it meets the same accessibility and media budget requirements.
- Essential copy, navigation, and links render before media loads. No blocking intro, forced viewing time, scroll hijacking, or hover-only information.
- Provide a labelled pause/play control for continuous motion. Reduced-motion mode and failed/blocked playback show the static poster. Use the poster by default on mobile, with optional user-initiated playback.
- Pause media when offscreen or the tab is hidden. Reserve image/video dimensions to avoid layout movement. Lazy-load below-fold assets; target hero poster ≤250 KB and optional desktop clip ≤3 MB. If the clip cannot meet quality/weight requirements, use the poster until a suitable clip exists.
- Use short opacity/transform transitions, typically 200–350 ms, with readable content when JavaScript fails or is disabled.

## Implementation sequence
1. Establish a clean isolated branch from current remote main, preserving unrelated edits in this checkout. The local deletion of `src/content/profile.md` must not be silently restored or committed; confirm that the implementation checkout contains an authoritative profile before building.
2. Capture real project media and verify profile/project claims. Reuse existing assets when they accurately represent current behaviour.
3. Build the homepage composition and hero, then adapt shared header/footer, project index, case-study layout, About, Contact, Download, and 404 styling so navigation does not switch visual systems.
4. Reuse Astro, existing components, content collections, font assets, and CSS. Main touchpoints: `src/pages/index.astro`, `src/components/ProjectCard.astro`, `src/components/ProjectVisual.astro`, `src/layouts/BaseLayout.astro`, shared navigation, project Markdown, and existing styles. Remove obsolete styles/scripts only after tracing their consumers; do not stack another conflicting theme over the current two stylesheets.
5. Add the three annotated Celestial Archive captures and improve role/result hierarchy. Preserve source/live links and snapshot attribution wherever repository metadata remains.
6. Perform the acceptance checks below, fix failures, and show a local preview. Record actual evidence and limitations in `PLAN-REVIEW-LOG.md`.
7. Stop for Ted's approval of the completed preview before merge or deployment. Do not treat this plan as publication approval.

## Acceptance checks for implementation
- Homepage opening communicates name, software focus, and purpose immediately, with visible work/contact actions and no playback dependency.
- All selected projects are discoverable without horizontal scrolling; names, imagery, links, and status remain readable at 390×844 and 1440×1000, plus a 320px overflow check.
- Inspect homepage, project index, all three project detail pages, About, Contact, Download, and 404 after shared style changes. Check anchor targets, external/source links, keyboard navigation, visible focus, and 200% zoom.
- Verify readable contrast (WCAG AA), descriptive image alternatives, meaningful headings, pause control, reduced motion, JavaScript-disabled content, and failed video loading. No claims of full accessibility certification.
- Confirm media budgets and dimensions; record a local performance baseline and comparison under the same conditions. Target LCP ≤2.5s and CLS ≤0.1 in the agreed local mobile profile; report lab results separately from field performance.
- Run the existing `npm run check` once after implementation and fix relevant failures. Reuse `scripts/verify.mjs`; adjust assertions only when a deliberate redesign changes their contract. Preserve offline GitHub fallback and existing thumbnail checks where still applicable.
- No invented metrics or feature claims; each new screenshot depicts a real current state and is labelled where its context matters.
- Diff contains only intended redesign changes; deployment remains gated on Ted's preview approval.

## Risks and boundaries
- The original checkout has a missing profile file and unrelated untracked files. The isolated implementation checkout uses the profile from the current repository revision; the original checkout remains untouched.
- Cinematic assets can obscure the product or increase download weight. Static-first rendering, mobile posters, and the media budget are required constraints.
- Current product screens may differ from existing descriptions. Resolve discrepancies from live/source evidence before writing new claims.
- The layout contains existing intro logic and a standalone-mode redirect to Celestial Archive. Trace those behaviours before changing shared scripts; keep the app association/download behaviour intact unless separately authorized.
- No new contact backend, tracking, CMS, generated artwork, or changes to the underlying showcased applications.
- No independent reviewer was requested; this plan has a primary-agent consistency review, not independent approval.

---

## Historical plan — preserved for context
The prior thumbnail plan and its approvals below apply to that earlier asset task. They do not approve this redesign or impose its asset-generation workflow on the new work.

# Plan: Unified Portfolio Project Thumbnails
_Locked via grill — by Codex + Ted_

## Goal
Replace the outdated portfolio, Celestial Archive, and QuestMark project thumbnails with a cohesive set of accurate 1600×900 WebP campaign images. The set should share the portfolio’s bright Apple-inspired editorial system while giving each project a distinct composition, palette, and truthful product identity.

## Approach
1. Start a fresh `codex/portfolio-thumbnail-system` branch from current `origin/main`, leaving the already-merged contact branch unchanged.
2. Capture current, representative desktop screens from the live Portfolio, Celestial Archive, and QuestMark projects. Record the source URL, capture date, `1600×1000` viewport, and screenshot path for each final asset in the review log.
3. Generate three versioned 1600×900 thumbnail backgrounds using those screens as evidence, leaving the required headline, tagline, and eyebrow regions free of generated text. Composite the exact approved copy afterward in a small HTML/CSS layout rendered with the system font so wording, tracking, and hierarchy are deterministic:
   - Portfolio: `TED’S WORK.` with “Technology. Design. People.”
   - Celestial Archive: `CELESTIAL ARCHIVE.` with “A quiet space for reflection.”
   - QuestMark: `QUESTMARK.` with “Leave the screen. Return with proof.”
4. Apply one shared system—light editorial canvas, system typography, layered interface panels, restrained shadows—while preserving distinct compositions and palettes:
   - Portfolio: neutral white with blue, lilac, yellow, and mint.
   - Celestial Archive: pearl white, moonlit violet, and antique gold.
   - QuestMark: ice blue, cyan, lilac, and a small coral accent.
5. Keep every headline and essential interface element inside the central 64% width safe area so the existing narrow mobile home cards remain usable with `object-fit: cover` and the schema’s supported `top` or `center` positions; do not extend the content schema or CSS for this asset-only change.
6. Present the complete three-image contact sheet for visual approval before changing project metadata.
7. After approval, add the versioned WebP files under `public/projects/`, update each project Markdown file with the new path, `1600×900` dimensions, alt text, caption, and an existing supported crop position, and retain the old assets for safe rollback.
8. Enforce a maximum of `500 KB` per final image. Extend the existing `scripts/verify.mjs` with the already-installed `sharp` dependency so it reads the selected project media paths, confirms each referenced asset exists in the built output, decodes as WebP, reports exactly `1600×900`, and stays within the byte limit.
9. Run `npm run check`, then inspect `/`, `/projects/`, and all three project detail routes at `1440×1000` and `390×844`. Verify card crops against the actual narrowest mobile card, exact text, overflow, console output, and reduced-motion behavior. Save the ten rendered screenshots in `output/portfolio-thumbnail-review/` as review evidence, but do not stage that review directory.
10. Commit and push the branch only after the implementation is verified. Do not merge it until Ted explicitly approves the final live preview.

## Key decisions & tradeoffs
- The thumbnails share a design system, not an identical template, so the portfolio feels cohesive without erasing each project’s identity.
- Real current screens anchor every composition; generated framing may improve presentation but must not invent product features.
- Minimal headline and tagline copy keeps thumbnails readable at card scale.
- Versioned assets avoid destructive replacement and make rollback simple at the cost of retaining three older images.
- WebP at 1600×900 standardizes crop behavior and loading weight across the project grid.
- Required typography is rendered deterministically in HTML/CSS after image generation instead of trusting generated lettering.
- The existing `top`/`center` crop schema remains unchanged; a conservative central 64% safe area absorbs the narrowest mobile crop.
- The existing verifier gains a small, reusable media-contract check rather than relying on a one-off shell command.
- Visual approval happens twice: first for the complete image set, then for the implemented site preview.

## Risks / open questions
- The current Celestial Archive and QuestMark screens may contain dense details that need selective cropping to remain legible at thumbnail scale.
- A `500 KB` ceiling may require one quality reduction pass, but dimensions and readability must remain unchanged.

## Rollback
- Revert the single thumbnail implementation commit to restore all three prior `media` blocks at once.
- Portfolio prior media: `/projects/portfolio-home.jpg`, `1470×867`, position `top`.
- Celestial Archive prior media: `/projects/celestial-archive-home.jpg`, `1470×923`, position `center`.
- QuestMark prior media: `/projects/questmark-banner.webp`, `1600×900`, position `top`.

## Out of scope
- Redesigning the underlying Portfolio, Celestial Archive, or QuestMark applications.
- Changing project titles, summaries, ordering, links, or GitHub metadata.
- Deleting the existing thumbnail assets.
- Merging into `main` or deploying without Ted’s explicit final approval.

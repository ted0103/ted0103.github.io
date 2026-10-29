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

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

# Tan Ted Hang — Portfolio

Paper-and-sticker Astro portfolio with Home, About, Case Studies, and Playground pages.

## Development

```sh
npm ci
npm run dev
GITHUB_OFFLINE=1 npm run check
```

GitHub Pages builds and deploys main using the existing workflow. Content lives in `src/content`, shared configuration in `src/config`, and images and licensed fonts in `public`.

Personal portrait, workspace, and playground photo slots remain placeholders pending supplied photos. Project cover images are generated device mockups; original interface screenshots remain in case studies.

Motion includes spring reveals, scroll-driven project decks, a draggable playground, and a click-toggle hero inversion lens. The lens hides over the introduction and contact button and respects reduced motion.

Validated with Astro checking, production build, local link/asset checks, and focused desktop/mobile browser checks. Safari, Firefox, physical devices, and OS-level reduced-motion testing remain unverified.

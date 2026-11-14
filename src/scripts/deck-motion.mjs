export function deckMotion(top, height, viewportHeight, index) {
  return {
    stickyTop: Math.min(76 + index * 16, viewportHeight - height - 24),
    remaining: 1 - Math.max(0, Math.min(1, (viewportHeight - top) / (viewportHeight * .8))),
  };
}

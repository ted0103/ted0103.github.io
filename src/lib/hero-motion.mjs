/** @param {number} value */
const clamp = value => Math.max(0, Math.min(1, value));
/** @param {number} progress */
export function revealState(progress) {
  return { departure: clamp(progress / .6), arrival: clamp((progress - .4) / .5) };
}
/** Upper half of an ellipse; increasing time moves right → top → left. */
/** @param {number} index @param {number} elapsed @param {number} count */
export function orbitPosition(index, elapsed, count) {
  const angle = (((count - index - .5) / count + elapsed / 50000) % 1) * Math.PI;
  return { x: 50 + 43 * Math.cos(angle), y: 160 - 120 * Math.sin(angle), tilt: 24 * Math.cos(angle), opacity: Math.min(1, Math.sin(angle) * 6) };
}

/** Keep the scroll stage off short screens where its controls cannot fit. */
/** @param {number} height @param {boolean} reducedMotion */
export function usesScrollIntro(height, reducedMotion) {
  return !reducedMotion && height >= 700;
}

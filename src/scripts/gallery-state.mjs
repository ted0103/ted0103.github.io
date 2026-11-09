export function zoomScale(scale, direction) {
  return Math.max(.5, Math.min(2.5, scale * (direction > 0 ? 1.2 : .8)));
}
export function dragPosition(origin, start, current, scale) {
  return { x: origin.x + (current.x - start.x) / scale, y: origin.y + (current.y - start.y) / scale };
}

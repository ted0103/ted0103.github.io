export function zoomScale(scale, direction) {
  return Math.max(.5, Math.min(2.5, scale * (direction > 0 ? 1.2 : .8)));
}
export function dragPosition(origin, start, current, scale) {
  return { x: origin.x + (current.x - start.x) / scale, y: origin.y + (current.y - start.y) / scale };
}

export function bounceAxis(position, velocity, min, max) {
  if (min > max) return { position: (min + max) / 2, velocity: 0 };
  if (position < min) return { position: min, velocity: Math.abs(velocity) * .72 };
  if (position > max) return { position: max, velocity: -Math.abs(velocity) * .72 };
  return { position, velocity };
}

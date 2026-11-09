export function springFrames({ y = -28, rotate = -4, damping = 13 } = {}) {
  const decay = damping / 2;
  const frequency = Math.sqrt(210 - decay * decay);
  return Array.from({ length: 91 }, (_, index) => {
    const time = index / 60;
    const displacement = index === 90 ? 0 : Math.exp(-decay * time) * (Math.cos(frequency * time) + decay / frequency * Math.sin(frequency * time));
    return { offset: index / 90, opacity: Math.min(1, time / .2), translate: `0 ${y * displacement}px`, rotate: `${rotate * .8 * displacement}deg` };
  });
}

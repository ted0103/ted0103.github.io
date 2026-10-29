import assert from 'node:assert/strict';
import { revealState, orbitPosition } from '../src/lib/hero-motion.mjs';
assert.deepEqual(revealState(0), { departure:0, arrival:0 });
assert.deepEqual(revealState(1), { departure:1, arrival:1 });
assert.equal(revealState(.9).arrival, 1, 'Scene is fully visible before the sticky stage ends');
assert.equal(revealState(.4).arrival, 0, 'The next scene waits until the name has moved away');
assert.ok(revealState(.7).arrival > 0 && revealState(.7).arrival < 1);
const start = orbitPosition(6, 0, 7);
const later = orbitPosition(6, 1000, 7);
assert.ok(later.x < start.x && later.y < start.y, 'Cards move from right toward the top, counterclockwise');
assert.deepEqual(orbitPosition(0, 0, 7), orbitPosition(0, 50000, 7));
for (let t=0;t<50000;t+=1000) {
  const point = orbitPosition(0,t,7);
  assert.ok(point.x>=7 && point.x<=93 && point.y>=60 && point.y<=310 && point.opacity>=0 && point.opacity<=1);
}
console.log('Hero reveal and counterclockwise orbit checks passed.');

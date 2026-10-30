import assert from 'node:assert/strict';
import { revealState, orbitPosition, usesScrollIntro } from '../src/lib/hero-motion.mjs';
assert.deepEqual(revealState(0), { departure:0, arrival:0 });
assert.deepEqual(revealState(1), { departure:1, arrival:1 });
assert.equal(revealState(.9).arrival, 1, 'Scene is fully visible before the sticky stage ends');
assert.equal(revealState(.4).arrival, 0, 'The next scene waits until the name has moved away');
assert.ok(revealState(.7).arrival > 0 && revealState(.7).arrival < 1);
assert.equal(revealState(.6).departure, 1, 'The opening is fully gone before the scene finishes arriving');
assert.equal(usesScrollIntro(699, false), false, 'Short screens use normal document flow');
assert.equal(usesScrollIntro(700, false), true, 'The scroll introduction resumes when controls fit');
assert.equal(usesScrollIntro(900, true), false, 'Reduced motion always skips the scroll stage');
const start = orbitPosition(6, 0, 7);
const later = orbitPosition(6, 1000, 7);
assert.ok(later.x < start.x && later.y < start.y, 'Cards move from right toward the top, counterclockwise');
assert.deepEqual(orbitPosition(0, 0, 7), orbitPosition(0, 50000, 7));
for (let t=0;t<50000;t+=1000) {
  const point = orbitPosition(0,t,7);
  assert.ok(point.x>=7 && point.x<=93 && point.y>=40 && point.y<=160 && point.opacity>=0 && point.opacity<=1);
}
console.log('Hero reveal and counterclockwise orbit checks passed.');

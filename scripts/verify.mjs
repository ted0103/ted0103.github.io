import { deckMotion } from '../src/scripts/deck-motion.mjs';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { springFrames } from '../src/scripts/spring.mjs';
const spring = springFrames();
assert.equal(spring[0].opacity, 0);
assert.equal(spring[0].translate, '0 -28px');
assert.equal(spring.at(-1).translate, '0 0px');
assert.equal(spring.at(-1).opacity, 1);
assert.ok(spring.some(frame => parseFloat(frame.translate.slice(2)) > 0), 'Spring must overshoot before settling');
const pages = [];
function walk(dir) { for (const entry of readdirSync(dir,{withFileTypes:true})) { const path=join(dir,entry.name); if(entry.isDirectory()) walk(path); else if(path.endsWith('.html')) pages.push(path); } }
walk('dist');
assert.equal(pages.length, 13, 'Expected 13 generated HTML pages');
assert.ok(!existsSync(join('dist', 'playground')), 'The retired Playground route should not be built');
for (const file of pages) {
  const html=readFileSync(file,'utf8');
  assert.match(html, /<h1[ >]/, `Missing heading: ${file}`);
  assert.doesNotMatch(html, /Robin Vale|Wayline|Tandem|Halcyon/, `Reference identity leaked: ${file}`);
  for (const [,url] of html.matchAll(/(?:href|src)="([^"#]+)"/g)) {
    if (!url.startsWith('/') || url.startsWith('//')) continue;
    const target=decodeURIComponent(url.split(/[?#]/)[0]);
    const path=join('dist',target);
    assert.ok(existsSync(path) || existsSync(join(path,'index.html')), `Broken local URL ${url} in ${file}`);
  }
}
console.log(`Verified ${pages.length} pages, local links/assets and identity content.`);

assert.deepEqual(deckMotion(800,1100,800,0),{stickyTop:-324,remaining:1});
assert.deepEqual(deckMotion(0,600,800,1),{stickyTop:92,remaining:0});

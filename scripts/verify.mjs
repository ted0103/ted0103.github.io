import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { springFrames } from '../src/scripts/spring.mjs';
import { zoomScale, dragPosition, bounceAxis } from '../src/scripts/gallery-state.mjs';
assert.equal(zoomScale(1, 1), 1.2);
assert.equal(zoomScale(.5, -1), .5);
assert.equal(zoomScale(2.5, 1), 2.5);
assert.deepEqual(dragPosition({x:10,y:20},{x:0,y:0},{x:40,y:-20},2),{x:30,y:10});
const spring = springFrames();
assert.equal(spring[0].opacity, 0);
assert.equal(spring[0].translate, '0 -28px');
assert.equal(spring.at(-1).translate, '0 0px');
assert.equal(spring.at(-1).opacity, 1);
assert.ok(spring.some(frame => parseFloat(frame.translate.slice(2)) > 0), 'Spring must overshoot before settling');
const pages = [];
function walk(dir) { for (const entry of readdirSync(dir,{withFileTypes:true})) { const path=join(dir,entry.name); if(entry.isDirectory()) walk(path); else if(path.endsWith('.html')) pages.push(path); } }
walk('dist');
assert.equal(pages.length, 14, 'Seven portfolio pages, six legacy redirects, and a 404 page');
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
console.log(`Verified ${pages.length} pages, local links/assets, identity content, zoom limits and scaled dragging.`);

assert.deepEqual(bounceAxis(-5,-100,0,200),{position:0,velocity:72});
assert.deepEqual(bounceAxis(205,100,0,200),{position:200,velocity:-72});
assert.deepEqual(bounceAxis(50,20,0,200),{position:50,velocity:20});
assert.deepEqual(bounceAxis(50,20,100,0),{position:50,velocity:0});

import { readFile, readdir, stat } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const root = process.cwd();
const expected = [
  'dist/index.html',
  'dist/about/index.html',
  'dist/contact/index.html',
  'dist/projects/index.html',
  'dist/projects/celestial-archive/index.html',
  'dist/projects/teds-personal-portfolio/index.html',
  'dist/download/index.html',
  'dist/404.html',
  'dist/.well-known/assetlinks.json',
  'dist/manifest.webmanifest',
  'dist/assets/icons/icon-512.png',
  'dist/sitemap-index.xml',
];

const offline = spawnSync('npm', ['run', 'build'], {
  cwd: root,
  env: { ...process.env, GITHUB_OFFLINE: '1' },
  encoding: 'utf8',
});
if (offline.status !== 0) {
  process.stderr.write(offline.stdout);
  process.stderr.write(offline.stderr);
  throw new Error('Forced GitHub fallback build failed');
}
if (!`${offline.stdout}${offline.stderr}`.includes('using snapshot')) {
  throw new Error('Forced GitHub fallback did not report snapshot usage');
}

for (const file of expected) {
  if (!(await stat(path.join(root, file))).isFile()) throw new Error(`Missing ${file}`);
}

const assetLinks = JSON.parse(await readFile(path.join(root, 'dist/.well-known/assetlinks.json'), 'utf8'));
if (assetLinks[0]?.target?.package_name !== 'io.github.ted0103.twa') {
  throw new Error('Digital Asset Links package mismatch');
}

const legacyManifest = JSON.parse(await readFile(path.join(root, 'dist/manifest.webmanifest'), 'utf8'));
if (legacyManifest.start_url !== '/celestial-archive/' || legacyManifest.scope !== '/celestial-archive/') {
  throw new Error('Legacy Celestial Archive manifest does not point to the migrated path');
}

async function htmlFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await htmlFiles(target));
    else if (entry.name.endsWith('.html')) files.push(target);
  }
  return files;
}

for (const file of await htmlFiles(path.join(root, 'dist'))) {
  const html = await readFile(file, 'utf8');
  for (const [, href] of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    if (href.startsWith('/celestial-archive/')) continue;
    const relative = href === '/' ? 'index.html' : `${href.replace(/^\/|\/$/g, '')}/index.html`;
    try {
      await stat(path.join(root, 'dist', relative));
    } catch {
      if (!href.includes('.')) throw new Error(`Broken internal link ${href} in ${path.relative(root, file)}`);
    }
  }
}

console.log(`Verified ${expected.length} required outputs, internal routes, snapshot fallback, and Digital Asset Links.`);

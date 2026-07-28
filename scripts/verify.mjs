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
  'dist/projects/questmark/index.html',
  'dist/projects/teds-personal-portfolio/index.html',
  'dist/download/index.html',
  'dist/404.html',
  'dist/.well-known/assetlinks.json',
  'dist/manifest.webmanifest',
  'dist/assets/icons/icon-512.png',
  'dist/fonts/jetbrains-mono-latin.woff2',
  'dist/fonts/OFL.txt',
  'dist/projects/celestial-archive-home.jpg',
  'dist/projects/questmark-banner.webp',
  'dist/projects/questmark-poster.webp',
  'dist/projects/portfolio-home.jpg',
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

const questmarkPage = await readFile(path.join(root, 'dist/projects/questmark/index.html'), 'utf8');
for (const image of ['/projects/questmark-banner.webp', '/projects/questmark-poster.webp']) {
  if (![...questmarkPage.matchAll(/<img\b[^>]*\bsrc="(\/[^"?#]+)"/g)].some(([, src]) => src === image)) {
    throw new Error(`QuestMark page does not reference ${image}`);
  }
  if (!(await stat(path.join(root, 'dist', image.slice(1)))).isFile()) {
    throw new Error(`Missing referenced QuestMark image ${image}`);
  }
}

const assetLinks = JSON.parse(await readFile(path.join(root, 'dist/.well-known/assetlinks.json'), 'utf8'));
const association = assetLinks[0];
if (
  association?.relation?.[0] !== 'delegate_permission/common.handle_all_urls'
  || association?.target?.package_name !== 'io.github.ted0103.twa'
  || association?.target?.sha256_cert_fingerprints?.[0] !== '50:37:8C:91:FF:83:20:68:A8:DF:C8:1A:93:62:FE:76:4E:48:A3:B8:28:C0:93:57:EF:90:A2:E4:D5:88:BC:C2'
) {
  throw new Error('Digital Asset Links package mismatch');
}

const legacyManifest = JSON.parse(await readFile(path.join(root, 'dist/manifest.webmanifest'), 'utf8'));
if (
  legacyManifest.id !== '/celestial-archive/'
  || legacyManifest.start_url !== '/celestial-archive/'
  || legacyManifest.scope !== '/celestial-archive/'
  || legacyManifest.icons?.[1]?.src !== '/assets/icons/icon-512.png'
) {
  throw new Error('Legacy Celestial Archive manifest does not point to the migrated path');
}

const downloadPage = await readFile(path.join(root, 'dist/download/index.html'), 'utf8');
if (!downloadPage.includes('/celestial-archive/download.html')) {
  throw new Error('Legacy download route does not point to Celestial Archive');
}

const astroAssets = path.join(root, 'dist/_astro');
const css = (await readdir(astroAssets))
  .filter((file) => file.endsWith('.css'))
  .map((file) => readFile(path.join(astroAssets, file), 'utf8'));
const productionCss = (await Promise.all(css)).join('\n');
if (productionCss.includes('fonts.googleapis.com') || productionCss.includes('fonts.gstatic.com')) {
  throw new Error('Production CSS must not request third-party fonts');
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

console.log(`Verified ${expected.length} required outputs, internal routes, snapshot fallback, local fonts, and Android compatibility.`);

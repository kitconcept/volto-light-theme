/**
 * Generates the machine-extracted VLT block catalog for the design reference.
 *
 * Walks every `Blocks/*` story in a running Storybook, captures the rendered
 * block HTML (with the real VLT class names) and a screenshot, and writes the
 * visual catalog into the Sphinx docs so it is published on Read the Docs:
 *   docs/_static/design-catalog/screenshots/<story-id>.jpg
 *   docs/_static/design-catalog/catalog.html
 *
 * Read the Docs cannot run this (no Storybook/Playwright), so the output is
 * committed; regenerate with `make design-catalog` whenever blocks change.
 *
 * Requires a running Storybook (defaults to http://localhost:6006 — start it
 * with `make storybook-start`). Override with STORYBOOK_URL.
 *
 * Usage: node scripts/generate-design-catalog.mjs
 */
import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FRONTEND_DIR = path.resolve(__dirname, '..');
const OUT_DIR = path.resolve(
  FRONTEND_DIR,
  '../docs/_static/design-catalog',
);
const SHOTS_DIR = path.join(OUT_DIR, 'screenshots');
const BASE = process.env.STORYBOOK_URL || 'http://localhost:6006';

const escapeHtml = (s) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

// Collapse noisy attributes so the snippet reads cleanly.
const tidyHtml = (html) =>
  html
    // drop the repetitive responsive srcset
    .replace(/\ssrcset="[^"]*"/g, '')
    .replace(/\ssizes="[^"]*"/g, '')
    // drop storybook/runtime data-* noise
    .replace(/\sdata-reactroot="[^"]*"/g, '');

async function getStories() {
  const res = await fetch(`${BASE}/index.json`).catch(() => null);
  if (!res || !res.ok) {
    throw new Error(
      `Could not read ${BASE}/index.json — is Storybook running? (make storybook-start)`,
    );
  }
  const json = await res.json();
  const entries = Object.values(json.entries || json.stories || {});
  return entries
    .filter((e) => e.type === 'story' && e.title?.startsWith('Blocks/'))
    .map((e) => ({ id: e.id, title: e.title, name: e.name }));
}

async function main() {
  await fs.mkdir(SHOTS_DIR, { recursive: true });
  const stories = await getStories();
  if (!stories.length) throw new Error('No Blocks/* stories found.');
  console.log(`Found ${stories.length} block stories at ${BASE}`);

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });

  // group -> [ { name, id, shot, html } ]
  const groups = new Map();

  for (const story of stories) {
    const url = `${BASE}/iframe.html?id=${encodeURIComponent(
      story.id,
    )}&viewMode=story`;
    try {
      // Dev Storybook keeps an HMR websocket open, so `networkidle` never
      // settles — wait for DOM + the rendered block instead.
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      const root = page.locator('.blocks-group-wrapper').first();
      await root.waitFor({ state: 'visible', timeout: 20000 });

      // Force lazy images to load, then wait for them.
      await page.evaluate(async () => {
        document.querySelectorAll('img').forEach((img) => {
          img.loading = 'eager';
          if (img.getAttribute('src')) {
            const s = img.getAttribute('src');
            img.setAttribute('src', s);
          }
        });
        await Promise.all(
          [...document.querySelectorAll('img')].map((img) =>
            img.complete
              ? Promise.resolve()
              : new Promise((res) => {
                  img.onload = img.onerror = res;
                }),
          ),
        );
      });
      await page.waitForTimeout(300);

      const shotRel = `screenshots/${story.id}.jpg`;
      await root.screenshot({
        path: path.join(OUT_DIR, shotRel),
        type: 'jpeg',
        quality: 82,
      });

      let html = await root.evaluate((el) => el.outerHTML);
      html = tidyHtml(html);

      const group = story.title.replace(/^Blocks\//, '');
      if (!groups.has(group)) groups.set(group, []);
      groups.get(group).push({ name: story.name, id: story.id, shot: shotRel, html });
      console.log(`  ✓ ${story.title} — ${story.name}`);
    } catch (err) {
      console.warn(`  ✗ ${story.title} — ${story.name}: ${err.message}`);
    }
  }

  await browser.close();

  const generatedAt = new Date().toISOString().slice(0, 10);
  const toc = [...groups.keys()]
    .map((g) => `<li><a href="#${slug(g)}">${escapeHtml(g)}</a></li>`)
    .join('');

  const sections = [...groups.entries()]
    .map(([group, items]) => {
      const cards = items
        .map(
          (it) => `
      <article class="variant">
        <h3>${escapeHtml(it.name)}</h3>
        <img loading="lazy" src="${it.shot}" alt="${escapeHtml(group)} — ${escapeHtml(it.name)}">
        <details>
          <summary>Rendered HTML</summary>
          <pre><code>${escapeHtml(it.html)}</code></pre>
        </details>
      </article>`,
        )
        .join('');
      return `
    <section id="${slug(group)}">
      <h2>${escapeHtml(group)}</h2>
      <div class="variants">${cards}</div>
    </section>`;
    })
    .join('');

  const doc = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>VLT Block Catalog (generated)</title>
<style>
  :root { color-scheme: light; }
  body { margin: 0; font: 15px/1.5 -apple-system, system-ui, sans-serif; color: #111; background: #fafafa; }
  header { padding: 24px 32px; border-bottom: 1px solid #e5e5e5; background: #fff; }
  header h1 { margin: 0 0 4px; font-size: 22px; }
  header p { margin: 0; color: #555; }
  nav { padding: 16px 32px; columns: 4; }
  nav a { color: #0b6; text-decoration: none; }
  main { padding: 8px 32px 64px; }
  section { margin: 40px 0; }
  section > h2 { font-size: 20px; border-bottom: 2px solid #111; padding-bottom: 6px; }
  .variants { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 24px; }
  .variant { background: #fff; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden; }
  .variant h3 { margin: 0; padding: 12px 14px; font-size: 14px; border-bottom: 1px solid #eee; }
  .variant img { display: block; width: 100%; height: auto; background: #f0f0f0; }
  details { border-top: 1px solid #eee; }
  summary { cursor: pointer; padding: 10px 14px; font-size: 13px; color: #555; }
  pre { margin: 0; padding: 14px; overflow-x: auto; background: #1e1e2e; color: #cdd6f4; font-size: 12px; }
</style>
</head>
<body>
<header>
  <h1>VLT Block Catalog</h1>
  <p>Machine-extracted from Storybook · ${generatedAt} · ${stories.length} variants. Part of the <a href="../../reference/design-system/">VLT Design System reference</a> (tokens, composition, block catalog).</p>
</header>
<nav><ul style="margin:0;padding:0;list-style:none">${toc}</ul></nav>
<main>${sections}</main>
</body>
</html>`;

  await fs.writeFile(path.join(OUT_DIR, 'catalog.html'), doc, 'utf8');
  console.log(`\nWrote ${path.join(OUT_DIR, 'catalog.html')}`);
}

function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

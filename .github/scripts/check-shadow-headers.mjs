#!/usr/bin/env node
/**
 * Check that every shadowed component in a `src/customizations` folder carries
 * the team's mandatory "OVERRIDE" documentation header at the top of the file.
 *
 * This script is intentionally repo-agnostic so it can be dropped into any
 * Volto/Aurora add-on or project. It assumes the conventional add-on layout
 * where every add-on lives under a `packages/` folder and keeps its shadowed
 * components in `<addon>/src/customizations`.
 *
 * The header must be the leading block comment of the file and must contain,
 * at minimum, the following labels:
 *
 *   OVERRIDE, REASON, FILE, FILE VERSION, DATE
 *
 * PULL REQUEST, TICKET and CHANGELOG are optional and not enforced here.
 *
 * Usage:
 *   node check-shadow-headers.mjs [<root> ...]
 *
 * Each <root> is either:
 *   - a packages root (e.g. `frontend/packages`): every immediate child that
 *     has a `src/customizations` folder is discovered and checked, or
 *   - a single add-on package (one that itself contains `src/customizations`).
 *
 * If no root is given it defaults to `packages` relative to the current working
 * directory.
 *
 * Exits non-zero (and emits GitHub Actions annotations when run in CI) if any
 * customization file is missing the header or any required label.
 */

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, relative, resolve, sep, extname } from 'node:path';

const repoRoot = process.cwd();

const roots = (
  process.argv.slice(2).length > 0 ? process.argv.slice(2) : ['packages']
).map((dir) => resolve(repoRoot, dir));

const CUSTOMIZATIONS_SUBDIR = join('src', 'customizations');

/**
 * Resolve the list of `src/customizations` directories to check for a given
 * root. A root can be a single add-on package or a packages folder holding
 * many add-ons.
 */
function discoverCustomizationsDirs(root) {
  if (!existsSync(root)) {
    console.log(
      `Path ${relative(repoRoot, root) || root} does not exist, skipping.`,
    );
    return [];
  }
  // Root is itself an add-on package.
  const ownDir = join(root, CUSTOMIZATIONS_SUBDIR);
  if (existsSync(ownDir)) {
    return [ownDir];
  }
  // Otherwise treat root as a packages folder and look one level down.
  const dirs = [];
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const candidate = join(root, entry.name, CUSTOMIZATIONS_SUBDIR);
    if (existsSync(candidate)) {
      dirs.push(candidate);
    }
  }
  return dirs;
}

const targets = roots.flatMap(discoverCustomizationsDirs);

// Files that live under customizations but are not shadowed components and
// therefore need no header (extend as needed).
const IGNORE_BASENAMES = new Set(['.gitkeep', '.DS_Store']);

// Asset file types that cannot carry a leading JS block comment without
// breaking their parser (e.g. SVGs consumed by SVGR/XML). Shadowing these is
// valid, but the header convention does not apply to them.
const IGNORE_EXTENSIONS = new Set([
  '.svg',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.webp',
  '.ico',
]);

// Labels that must be present inside the leading comment block.
const REQUIRED_LABELS = [
  { name: 'OVERRIDE', re: /\bOVERRIDE\b/ },
  { name: 'REASON', re: /\bREASON\s*:/ },
  { name: 'FILE', re: /\bFILE\s*:/ },
  { name: 'FILE VERSION', re: /\bFILE VERSION\s*:/ },
  { name: 'DATE', re: /\bDATE\s*:/ },
];

const isCI = Boolean(process.env.GITHUB_ACTIONS);

function walk(dir) {
  let files = [];
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return files;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(walk(full));
    } else if (
      entry.isFile() &&
      !IGNORE_BASENAMES.has(entry.name) &&
      !IGNORE_EXTENSIONS.has(extname(entry.name).toLowerCase())
    ) {
      files.push(full);
    }
  }
  return files;
}

/**
 * Return the leading block comment of a source file, or null if the file does
 * not start with one (ignoring leading whitespace and an optional shebang).
 */
function leadingComment(source) {
  let text = source;
  if (text.startsWith('#!')) {
    text = text.slice(text.indexOf('\n') + 1);
  }
  const match = text.match(/^\s*\/\*[\s\S]*?\*\//);
  return match ? match[0] : null;
}

function checkFile(file) {
  const source = readFileSync(file, 'utf8');
  const comment = leadingComment(source);
  if (comment === null) {
    return ['missing the leading OVERRIDE header comment block'];
  }
  const missing = REQUIRED_LABELS.filter(
    (label) => !label.re.test(comment),
  ).map((label) => label.name);
  if (missing.length > 0) {
    return [`header is missing required label(s): ${missing.join(', ')}`];
  }
  return [];
}

const files = targets.flatMap((target) => walk(target));

if (files.length === 0) {
  console.log('No customization files found. Nothing to check.');
  process.exit(0);
}

let failures = 0;

for (const file of files) {
  const rel = relative(repoRoot, file).split(sep).join('/');
  const problems = checkFile(file);
  if (problems.length === 0) {
    console.log(`✓ ${rel}`);
    continue;
  }
  failures += 1;
  for (const problem of problems) {
    const message = `Shadowed component ${rel} ${problem}. Add the mandatory OVERRIDE header (OVERRIDE, REASON, FILE, FILE VERSION, DATE) to the top of the file.`;
    if (isCI) {
      console.log(`::error file=${rel}::${message}`);
    } else {
      console.error(`✗ ${message}`);
    }
  }
}

console.log(
  `\nChecked ${files.length} customization file(s): ${files.length - failures} ok, ${failures} failing.`,
);

if (failures > 0) {
  process.exit(1);
}

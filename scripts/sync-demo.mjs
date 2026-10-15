#!/usr/bin/env node
/**
 * Copy built package CSS (+ ensure logos) into demo/ for GitHub Pages.
 * Run after `pnpm build` (and preferably `pnpm sync:version`).
 */
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const cssSrc = join(root, 'packages/css/dist/seaglass.css');
const cssDst = join(root, 'demo/seaglass.css');

if (!existsSync(cssSrc)) {
  console.error('sync-demo: missing packages/css/dist/seaglass.css - run pnpm build first');
  process.exit(1);
}

copyFileSync(cssSrc, cssDst);
console.log('sync-demo: wrote demo/seaglass.css');

for (const name of ['logo.svg', 'logo-light.svg', 'noise.svg']) {
  const from = join(root, 'assets', name);
  const to = join(root, 'demo', name);
  if (existsSync(from)) {
    copyFileSync(from, to);
    console.log(`sync-demo: wrote demo/${name}`);
  }
}

mkdirSync(join(root, 'demo'), { recursive: true });

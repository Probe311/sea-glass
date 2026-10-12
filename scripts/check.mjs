import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const must = [
  'demo/index.html',
  'demo/glass.css',
  'packages/css/glass.css',
  'packages/css/ui.css',
  'packages/react/src/Glass.tsx',
  'LICENSE',
  'README.md',
  'CONTRIBUTING.md',
  'CODE_OF_CONDUCT.md',
  'SECURITY.md',
  'ROADMAP.md',
];

let failed = false;
for (const rel of must) {
  const p = join(root, rel);
  if (!existsSync(p)) {
    console.error('missing:', rel);
    failed = true;
  }
}

const glass = readFileSync(join(root, 'packages/css/glass.css'), 'utf8');
for (const token of ['--seafoam', 'data-frosted', 'data-refractive', '--ease']) {
  if (!glass.includes(token)) {
    console.error('glass.css missing token/marker:', token);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log('sea-glass check ok');

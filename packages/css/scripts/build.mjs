import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'src');
const dist = join(root, 'dist');

const tokensCss = await readFile(require.resolve('@seaglass/tokens/css'), 'utf8');
const sheets = ['material.css', 'components.css', 'utilities.css', 'a11y.css'];
const parts = await Promise.all(sheets.map((f) => readFile(join(src, f), 'utf8')));
const reset = await readFile(join(src, 'reset.css'), 'utf8');

const bundled = `/* Sea Glass CSS — tokens + material + components. Optional reset is a separate entry. */
@layer sg.tokens, sg.material, sg.components, sg.utilities, sg.a11y;

@layer sg.tokens {
${tokensCss
  .split('\n')
  .map((l) => (l ? `  ${l}` : l))
  .join('\n')}
}

${parts.join('\n\n')}
`;

await mkdir(dist, { recursive: true });
await writeFile(join(dist, 'seaglass.css'), bundled);
await writeFile(join(dist, 'reset.css'), reset);
console.log('@seaglass/css: wrote dist/seaglass.css');

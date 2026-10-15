/**
 * ponytail: O(n) parse check - fails CI/preflight if a demo/*.js has a syntax error.
 * Upgrade: fold into eslint when demo scripts are linted as modules.
 */
import { readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const demo = join(dirname(fileURLToPath(import.meta.url)), '..', 'demo');
const files = readdirSync(demo)
  .filter((n) => n.endsWith('.js'))
  .sort();
for (const name of files) {
  execFileSync(process.execPath, ['--check', join(demo, name)], { stdio: 'inherit' });
}
console.log(`demo JS: ${files.length} files OK`);

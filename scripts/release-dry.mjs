import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const packages = readdirSync('packages', { withFileTypes: true }).filter((d) => d.isDirectory());

console.log('Sea Glass — dry-run release (npm publish skipped)\n');
console.log('Would publish:');
for (const dir of packages) {
  const pkg = JSON.parse(readFileSync(join('packages', dir.name, 'package.json'), 'utf8'));
  console.log(`  ${pkg.name}@${pkg.version}`);
}
console.log(`
Publication npm is disabled on purpose.
To enable later: add the NPM_TOKEN secret (or npm trusted publishing / OIDC)
and replace this script with \`changeset publish --provenance\`.
`);

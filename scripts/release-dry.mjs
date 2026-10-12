import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const packages = readdirSync('packages', { withFileTypes: true }).filter((d) => d.isDirectory());

console.log('Sea Glass — release dry-run\n');
console.log('Would publish:');
for (const dir of packages) {
  const pkg = JSON.parse(readFileSync(join('packages', dir.name, 'package.json'), 'utf8'));
  if (pkg.private) continue;
  console.log(`  ${pkg.name}@${pkg.version}`);
}
console.log(`
Enable npm publish:
  1. Reserve scope @seaglass on npm (or rename).
  2. Add NPM_TOKEN secret, or configure trusted publishing (OIDC).
  3. In .github/workflows/release.yml, set publish: true on changesets/action
     (or run \`pnpm exec changeset publish --provenance\`).
`);

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
  1. npm login as sea-glass (scope @sea-glass).
  2. Add GitHub secret NPM_TOKEN (granular, publish @sea-glass/*).
  3. Merge Version PR from changesets/action, or run:
     pnpm exec changeset version && pnpm exec changeset publish --provenance
`);

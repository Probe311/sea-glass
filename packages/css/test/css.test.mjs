import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

describe('@sea-glass/css', () => {
  it('ships a bundled sheet with sg- prefix and no legacy collisions', () => {
    const css = readFileSync(join(root, 'dist/seaglass.css'), 'utf8');
    expect(css).toContain('.sg-glass');
    expect(css).toContain('.sg-button');
    expect(css).toContain('.sg-progress--lg');
    expect(css).toContain('prefers-reduced-transparency');
    expect(css).toContain('prefers-contrast');
    expect(css).toContain('forced-colors');
    expect(css).toContain('@supports not (backdrop-filter: blur(1px))');
    expect(css).not.toContain('Google Sans');
    expect(css).not.toContain('unsplash');
    expect(css).not.toMatch(/(^|})\s*\.lg(\s|\{|,|:)/);
    expect(css).not.toMatch(/(^|})\s*\.btn(\s|\{|,|:)/);
    expect(css).not.toMatch(/\.pg\.lg/);
  });

  it('does not apply a global reset in the default entry', () => {
    const css = readFileSync(join(root, 'dist/seaglass.css'), 'utf8');
    expect(css).not.toMatch(/\*,\s*\*::before/);
    const reset = readFileSync(join(root, 'dist/reset.css'), 'utf8');
    expect(reset).toContain('box-sizing');
  });
});

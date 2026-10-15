/**
 * Style Dictionary v4 build: DTCG JSON → CSS custom properties, ESM, d.ts, JSON, Tailwind preset.
 */
import { readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import StyleDictionary from 'style-dictionary';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
// Explicit file list - `src/**/*.json` globs are flaky on Windows with SD 4.4.
const sources = readdirSync(join(root, 'src'))
  .filter((f) => f.endsWith('.json'))
  .map((f) => join(root, 'src', f));

const PEBBLE_KEYS = [
  'seafoam',
  'kelly',
  'citron',
  'aqua',
  'cornflower',
  'cobalt',
  'lavender',
  'ruby',
  'amber',
  'rootbeer',
  'clear',
  'mist',
];

function hexToRgb(hex) {
  const raw = String(hex).trim().replace('#', '');
  if (!/^[0-9a-fA-F]{3,8}$/.test(raw)) return null;
  let h = raw;
  if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join('');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const a = h.length >= 8 ? parseInt(h.slice(6, 8), 16) / 255 : null;
  return { r, g, b, a };
}

function cssColor(value) {
  if (value == null) return String(value);
  if (Array.isArray(value) && value.length === 4 && value.every((n) => typeof n === 'number')) {
    return `cubic-bezier(${value.join(', ')})`;
  }
  if (Array.isArray(value)) {
    return value.map((v) => (/\s/.test(String(v)) ? `"${v}"` : v)).join(', ');
  }
  if (typeof value === 'object') return JSON.stringify(value);
  const rgb = typeof value === 'string' ? hexToRgb(value) : null;
  if (rgb && rgb.a != null && rgb.a < 1) {
    const a = Math.round(rgb.a * 1000) / 1000;
    return `rgb(${rgb.r} ${rgb.g} ${rgb.b} / ${a})`;
  }
  return String(value);
}

function tokenValue(token) {
  return token.value ?? token.$value;
}

function tokenType(token) {
  return token.$type ?? token.type ?? token.original?.$type;
}

function darkValue(token) {
  return token.$extensions?.seaglass?.dark ?? token.original?.$extensions?.seaglass?.dark;
}

function allTokens(dictionary) {
  return dictionary.allTokens ?? dictionary.allPlatformTokens ?? [];
}

function varName(token) {
  return `--sg-${token.path.join('-')}`;
}

function rgbName(token) {
  return `--sg-${token.path.join('-')}-rgb`;
}

function indent(text, n) {
  const pad = ' '.repeat(n);
  return text
    .split('\n')
    .map((l) => (l ? pad + l : l))
    .join('\n');
}

function decls(tokens, { dark = false } = {}) {
  const lines = [];
  for (const token of tokens) {
    if (tokenType(token) === 'other') continue;
    const value = dark ? darkValue(token) : tokenValue(token);
    if (value === undefined) continue;
    lines.push(`  ${varName(token)}: ${cssColor(value)};`);
    const rgb = typeof value === 'string' ? hexToRgb(value) : null;
    if (rgb && tokenType(token) === 'color') {
      lines.push(`  ${rgbName(token)}: ${rgb.r} ${rgb.g} ${rgb.b};`);
    }
  }
  return lines.join('\n');
}

function flatten(tokens) {
  const out = {};
  for (const token of tokens) {
    if (tokenType(token) === 'other') continue;
    let cursor = out;
    for (let i = 0; i < token.path.length - 1; i++) {
      const key = token.path[i];
      cursor[key] ??= {};
      cursor = cursor[key];
    }
    const leaf = token.path.at(-1);
    const value = tokenValue(token);
    cursor[leaf] = typeof value === 'string' || typeof value === 'number' ? value : cssColor(value);
    const dark = darkValue(token);
    if (dark !== undefined) {
      cursor[`${leaf}Dark`] =
        typeof dark === 'string' || typeof dark === 'number' ? dark : cssColor(dark);
    }
    const rgb = typeof value === 'string' ? hexToRgb(value) : null;
    if (rgb && tokenType(token) === 'color') {
      cursor[`${leaf}Rgb`] = `${rgb.r} ${rgb.g} ${rgb.b}`;
    }
  }
  return out;
}

function pebblesFrom(dictionary) {
  const tokens = allTokens(dictionary);
  return PEBBLE_KEYS.map((key) => {
    const color = tokens.find((t) => t.path.join('.') === `color.${key}`);
    const meta = tokens.find((t) => t.path.join('.') === `pebble.${key}`);
    const value = color ? tokenValue(color) : '#000000';
    const rgb = hexToRgb(value);
    const info = meta ? tokenValue(meta) : { name: key, seed: 0 };
    return {
      name: info.name,
      key,
      hex: String(value).toUpperCase(),
      rgb: rgb ? `${rgb.r} ${rgb.g} ${rgb.b}` : '',
      seed: info.seed,
    };
  });
}

StyleDictionary.registerFormat({
  name: 'seaglass/css',
  format: ({ dictionary }) => {
    const tokens = allTokens(dictionary);
    const light = decls(tokens, { dark: false });
    const dark = decls(
      tokens.filter((t) => darkValue(t) !== undefined),
      { dark: true },
    );
    const darkBlock = `  color-scheme: dark;\n${dark}`;
    // data-theme = demo / HTML; data-sg-theme = package API (same values)
    return `/* Sea Glass tokens - generated from W3C DTCG JSON. Do not edit. */
:root {
  color-scheme: light dark;
${light}
}

[data-sg-theme="light"],
[data-theme="light"] {
  color-scheme: light;
${light}
}

[data-sg-theme="dark"],
[data-theme="dark"] {
${darkBlock}
}

@media (prefers-color-scheme: dark) {
  :root:not([data-sg-theme="light"], [data-theme="light"]) {
${indent(darkBlock, 2)}
  }
}
`;
  },
});

StyleDictionary.registerFormat({
  name: 'seaglass/js',
  format: ({ dictionary }) => {
    const tree = flatten(allTokens(dictionary));
    const pebbles = pebblesFrom(dictionary);
    return `/* Sea Glass tokens - generated. Do not edit. */
export const tokens = ${JSON.stringify(tree, null, 2)};
export const pebbles = ${JSON.stringify(pebbles, null, 2)};
export default tokens;
`;
  },
});

StyleDictionary.registerFormat({
  name: 'seaglass/dts',
  format: ({ dictionary }) => {
    const pebbles = pebblesFrom(dictionary);
    return `export type SeaGlassPebbleKey =
  ${pebbles.map((p) => `'${p.key}'`).join('\n  | ')};

export interface SeaGlassPebble {
  name: string;
  key: SeaGlassPebbleKey;
  hex: string;
  rgb: string;
  seed: number;
}

export declare const tokens: Record<string, unknown>;
export declare const pebbles: SeaGlassPebble[];
export default tokens;
`;
  },
});

StyleDictionary.registerFormat({
  name: 'seaglass/json',
  format: ({ dictionary }) => JSON.stringify(flatten(allTokens(dictionary)), null, 2) + '\n',
});

StyleDictionary.registerFormat({
  name: 'seaglass/tailwind',
  format: ({ dictionary }) => {
    const tokens = allTokens(dictionary);
    const colors = {};
    for (const key of PEBBLE_KEYS) {
      const token = tokens.find((t) => t.path.join('.') === `color.${key}`);
      if (token) colors[key] = tokenValue(token);
    }
    const radii = {};
    for (const token of tokens.filter((t) => t.path[0] === 'radius')) {
      radii[token.path[1]] = tokenValue(token);
    }
    return `/* Sea Glass Tailwind v3 preset - generated. Do not edit. */
export default {
  theme: {
    extend: {
      colors: ${JSON.stringify({ seaglass: colors }, null, 6)},
      borderRadius: ${JSON.stringify({ seaglass: radii }, null, 6)},
      transitionTimingFunction: {
        'sg-standard': 'cubic-bezier(0.2, 0, 0, 1)',
        'sg-spring': 'cubic-bezier(0.34, 1.4, 0.5, 1)',
      },
      transitionDuration: {
        'sg-fast': '120ms',
        'sg-base': '200ms',
        'sg-slow': '380ms',
      },
    },
  },
};
`;
  },
});

const sd = new StyleDictionary({
  source: sources,
  usesDtcg: true,
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: `${dist}/`,
      files: [{ destination: 'tokens.css', format: 'seaglass/css' }],
    },
    js: {
      transformGroup: 'js',
      buildPath: `${dist}/`,
      files: [
        { destination: 'tokens.js', format: 'seaglass/js' },
        { destination: 'tokens.d.ts', format: 'seaglass/dts' },
        { destination: 'tokens.json', format: 'seaglass/json' },
        { destination: 'tailwind-preset.js', format: 'seaglass/tailwind' },
      ],
    },
  },
});

await sd.hasInitialized;
await sd.buildAllPlatforms();
console.log('@sea-glass/tokens: built dist/');

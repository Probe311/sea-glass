import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const color = JSON.parse(readFileSync(join(root, 'src/color.json'), 'utf8')).color;
const space = JSON.parse(readFileSync(join(root, 'src/space.json'), 'utf8')).space;
const motion = JSON.parse(readFileSync(join(root, 'src/motion.json'), 'utf8'));
const radius = JSON.parse(readFileSync(join(root, 'src/radius.json'), 'utf8')).radius;
const pebblesMeta = JSON.parse(readFileSync(join(root, 'src/pebbles.json'), 'utf8')).pebble;

const PEBBLES = [
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

const DARK_INKS_ADDED = ['citron', 'cornflower', 'lavender', 'rootbeer', 'clear', 'mist'];

function luminance(hex) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? [...h].map((c) => c + c).join('') : h.slice(0, 6), 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
}

function contrast(a, b) {
  const l1 = luminance(a);
  const l2 = luminance(b);
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

describe('Sea Glass tokens (source of truth)', () => {
  it('defines the 12 official pebbles', () => {
    for (const key of PEBBLES) {
      expect(color[key].$value).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(pebblesMeta[key].$value.name).toBeTruthy();
    }
    expect(Object.keys(pebblesMeta)).toHaveLength(12);
  });

  it('keeps prototype hex values for the pebbles', () => {
    expect(color.seafoam.$value).toBe('#B9E3D6');
    expect(color.kelly.$value).toBe('#4FA877');
    expect(color.ground.$value).toBe('#F6FAF7');
    expect(color.ground.$extensions.seaglass.dark).toBe('#0F1513');
  });

  it('defines dark inks for every pebble, including the six that were missing', () => {
    for (const key of PEBBLES) {
      expect(color[`${key}-ink`].$extensions.seaglass.dark).toMatch(/^#[0-9A-Fa-f]{6}$/);
    }
    for (const key of DARK_INKS_ADDED) {
      const dark = color[`${key}-ink`].$extensions.seaglass.dark;
      expect(contrast(dark, '#0F1513')).toBeGreaterThanOrEqual(4.5);
    }
  });

  it('tokenizes spacing 1–12 on a 4px grid and the documented 4→72 scale', () => {
    expect(space[1].$value).toBe('4px');
    expect(space[12].$value).toBe('72px');
    expect(Object.keys(space)).toHaveLength(12);
  });

  it('tokenizes motion 120/200/380 and both easings', () => {
    expect(motion.duration.fast.$value).toBe('120ms');
    expect(motion.duration.base.$value).toBe('200ms');
    expect(motion.duration.slow.$value).toBe('380ms');
    expect(motion.ease.standard.$value).toEqual([0.2, 0, 0, 1]);
    expect(motion.ease.spring.$value).toEqual([0.34, 1.4, 0.5, 1]);
  });

  it('exposes pill, circle and squircle radii', () => {
    expect(radius.pill.$value).toBe('999px');
    expect(radius.circle.$value).toBe('50%');
    expect(radius.squircle.$value).toBe('28px');
    expect(radius.sm.$value).toBe('8px');
  });

  it('uses semantic aliases that do not invent a new primary colour', () => {
    const semantic = JSON.parse(readFileSync(join(root, 'src/semantic.json'), 'utf8')).color;
    expect(semantic.primary.$value).toBe('{color.kelly}');
    expect(semantic.danger.$value).toBe('{color.ruby}');
  });
});

describe('generated CSS (after build)', () => {
  it('emits prefixed variables, rgb channels, and the extra dark inks', () => {
    const css = readFileSync(join(root, 'dist/tokens.css'), 'utf8');
    expect(css).toContain('--sg-color-seafoam:');
    expect(css).toContain('--sg-color-seafoam-rgb:');
    expect(css).toContain('--sg-space-1:');
    expect(css).toContain('--sg-duration-fast:');
    expect(css).toContain('--sg-color-citron-ink:');
    expect(css).toContain('#EEF2B8');
    expect(css).toContain('[data-sg-theme="dark"]');
    expect(css).toContain(':root:not([data-sg-theme="light"])');
    expect(css).not.toContain('Google Sans');
  });

  it('exports pebbles from ESM without duplicating RGB by hand', async () => {
    const mod = await import('../dist/tokens.js');
    expect(mod.pebbles).toHaveLength(12);
    expect(mod.pebbles[0].rgb).toBe('185 227 214');
    expect(String(mod.tokens.color.kelly).toLowerCase()).toBe('#4fa877');
  });
});

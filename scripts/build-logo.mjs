/**
 * Outline Sea Glass wordmarks from Poppins Bold (OFL).
 * Usage: node scripts/build-logo.mjs
 *
 *   logo.svg       - dark ink, for light backgrounds
 *   logo-light.svg - light ink, for dark backgrounds
 *
 * Writes into `assets/` (repo) and `demo/` (GitHub Pages).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import opentype from 'opentype.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const font = opentype.parse(readFileSync(join(root, 'assets/fonts/Poppins-Bold.ttf')).buffer);

const text = 'Sea Glass';
const fontSize = 72;
const accent = '#6B8CE3'; // --sg-color-cobalt

const measure = font.getPath(text, 0, 0, fontSize);
const bbox = measure.getBoundingBox();
const padX = 8;
const padY = 14;
const gap = fontSize * 0.16;
const dotR = fontSize * 0.115;

const textW = bbox.x2 - bbox.x1;
const textH = bbox.y2 - bbox.y1;
const baseline = padY - bbox.y1;
const tx = padX - bbox.x1;
const outlined = font.getPath(text, tx, baseline, fontSize);
const d = outlined.toPathData(2);

const dotCx = tx + textW + gap + dotR;
const dotCy = baseline - dotR * 0.12;
const width = Math.ceil(dotCx + dotR + padX);
const height = Math.ceil(textH + padY * 2);

const variants = [
  {
    file: 'logo.svg',
    ink: '#1A1C1E',
    label: 'dark ink on light backgrounds',
  },
  {
    file: 'logo-light.svg',
    ink: '#F7F9F7',
    label: 'light ink on dark backgrounds',
  },
];

const dirs = [join(root, 'assets'), join(root, 'demo')];

for (const { file, ink, label } of variants) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Sea Glass.">
  <title>Sea Glass.</title>
  <desc>Wordmark set in Poppins Bold (${label}). Period accent uses the Cobalt pebble.</desc>
  <path fill="${ink}" d="${d}"/>
  <circle cx="${dotCx.toFixed(2)}" cy="${dotCy.toFixed(2)}" r="${dotR.toFixed(2)}" fill="${accent}"/>
</svg>
`;
  for (const dir of dirs) {
    const out = join(dir, file);
    writeFileSync(out, svg);
    console.log(`wrote ${out}`);
  }
}

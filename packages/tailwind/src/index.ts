/** Tailwind preset + `glass-*` utilities. Use `presets: [preset], plugins: [plugin]`. */
export { default as preset } from './preset.js';
export { default as plugin, seaGlassPlugin } from './plugin.js';

export const utilities = [
  'glass',
  'glass-frosted',
  'glass-rim',
  'glass-glow',
  'glass-carved',
  'glass-blur-sm',
  'glass-blur-md',
  'glass-blur-lg',
  'glass-blur-xl',
  'glass-tint-seafoam',
  'glass-tint-kelly',
  'glass-tint-citron',
  'glass-tint-aqua',
  'glass-tint-cornflower',
  'glass-tint-cobalt',
  'glass-tint-lavender',
  'glass-tint-ruby',
  'glass-tint-amber',
  'glass-tint-rootbeer',
  'glass-tint-clear',
  'glass-tint-mist',
] as const;

export type SeaGlassUtility = (typeof utilities)[number];

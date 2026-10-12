/**
 * Tailwind plugin stub. Full `glass-*` utilities (frosted, tint, rim, glow, carved, blur)
 * ship with the 0.3 line. Until then, consume the generated preset.
 */
export { default as preset } from './preset.js';

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
] as const;

export type SeaGlassUtility = (typeof utilities)[number];

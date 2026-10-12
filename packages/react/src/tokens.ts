/** Pebble tint keys — match CSS `--{key}` and `--{key}-ink`. */
export const PEBBLES = [
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
] as const;

export type PebbleKey = (typeof PEBBLES)[number];

export const PEBBLE_RGB: Record<PebbleKey, string> = {
  seafoam: '185 227 214',
  kelly: '79 168 119',
  citron: '216 219 156',
  aqua: '92 196 236',
  cornflower: '195 211 240',
  cobalt: '107 140 227',
  lavender: '228 218 232',
  ruby: '224 118 98',
  amber: '247 201 107',
  rootbeer: '181 134 106',
  clear: '247 249 247',
  mist: '205 213 212',
};

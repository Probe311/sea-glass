const pebbles = [
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

const colors = Object.fromEntries(pebbles.map((key) => [key, `var(--sg-color-${key})`]));

/** Tailwind v3 preset. Pair with `@sea-glass/css` (or just the token sheet). */
export default {
  theme: {
    extend: {
      colors: { seaglass: colors },
      borderRadius: {
        'sg-sm': 'var(--sg-radius-sm)',
        'sg-md': 'var(--sg-radius-md)',
        'sg-lg': 'var(--sg-radius-lg)',
        'sg-xl': 'var(--sg-radius-xl)',
        'sg-pill': 'var(--sg-radius-pill)',
        'sg-squircle': 'var(--sg-radius-squircle)',
      },
      spacing: Object.fromEntries(
        Array.from({ length: 12 }, (_, i) => [`sg-${i + 1}`, `var(--sg-space-${i + 1})`]),
      ),
      transitionTimingFunction: {
        'sg-standard': 'var(--sg-ease-standard)',
        'sg-spring': 'var(--sg-ease-spring)',
      },
      transitionDuration: {
        'sg-fast': 'var(--sg-duration-fast)',
        'sg-base': 'var(--sg-duration-base)',
        'sg-slow': 'var(--sg-duration-slow)',
      },
    },
  },
};

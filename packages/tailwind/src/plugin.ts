type PluginApi = {
  addUtilities: (utilities: Record<string, Record<string, string>>) => void;
};

/**
 * Tailwind plugin: `glass`, `glass-frosted`, `glass-rim`, `glass-glow`,
 * `glass-carved`, `glass-blur-{sm|md|lg|xl}`, `glass-tint-{pebble}`.
 * Pair with `@sea-glass/css` (or token sheet) so variables resolve.
 */
export function seaGlassPlugin({ addUtilities }: PluginApi): void {
  const blurs = {
    sm: 'var(--sg-blur-sm)',
    md: 'var(--sg-blur-md)',
    lg: 'var(--sg-blur-lg)',
    xl: 'var(--sg-blur-xl)',
  } as const;

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

  const utilities: Record<string, Record<string, string>> = {
    '.glass': {
      position: 'relative',
      isolation: 'isolate',
      'border-radius': 'var(--sg-glass-radius, var(--sg-radius-xl))',
      color: 'var(--sg-color-ink)',
      background:
        'linear-gradient(160deg, rgb(255 255 255 / calc(var(--sg-glass-a, var(--sg-glass-alpha-ground)) + 0.16)), rgb(255 255 255 / var(--sg-glass-a, var(--sg-glass-alpha-ground))) 62%, rgb(255 255 255 / calc(var(--sg-glass-a, var(--sg-glass-alpha-ground)) - 0.06)))',
      'box-shadow':
        'var(--sg-shadow-in, var(--sg-elevation-1)), var(--sg-shadow-out, var(--sg-elevation-3))',
      '-webkit-backdrop-filter': 'blur(var(--sg-glass-blur, var(--sg-blur-lg))) saturate(1.2)',
      'backdrop-filter': 'blur(var(--sg-glass-blur, var(--sg-blur-lg))) saturate(1.2)',
    },
    '.glass-frosted': {
      '-webkit-backdrop-filter': 'blur(var(--sg-blur-xl)) saturate(1.35)',
      'backdrop-filter': 'blur(var(--sg-blur-xl)) saturate(1.35)',
    },
    '.glass-rim': {
      'box-shadow':
        'inset 1.5px 1.5px 1.5px -1px rgb(255 255 255 / var(--sg-glass-lit, 0.95)), inset -1.5px -1.5px 1.5px -1px color-mix(in srgb, var(--sg-glass-cs, #fff) 70%, transparent), var(--sg-elevation-3)',
    },
    '.glass-glow': {
      'box-shadow':
        'var(--sg-elevation-1), 0 12px 26px -12px rgb(var(--sg-glass-glow-rgb, var(--sg-color-kelly-rgb)) / 0.55)',
    },
    '.glass-carved': {
      'box-shadow':
        'inset 0 2px 4px var(--sg-glass-carved-lo), inset 0 -1px 0 var(--sg-glass-carved-hi)',
    },
  };

  for (const [key, value] of Object.entries(blurs)) {
    utilities[`.glass-blur-${key}`] = {
      '--sg-glass-blur': value,
      '-webkit-backdrop-filter': `blur(${value}) saturate(1.2)`,
      'backdrop-filter': `blur(${value}) saturate(1.2)`,
    };
  }

  for (const pebble of pebbles) {
    utilities[`.glass-tint-${pebble}`] = {
      '--sg-glass-tint-rgb': `var(--sg-color-${pebble}-rgb)`,
      '--sg-glass-glow-rgb': `var(--sg-color-${pebble}-rgb)`,
    };
  }

  addUtilities(utilities);
}

/** Drop-in for `plugins: [plugin]` from `@sea-glass/tailwind`. */
export default function plugin(api: PluginApi): void {
  seaGlassPlugin(api);
}

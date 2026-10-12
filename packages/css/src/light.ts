const FILTER_ID = 'sg-refract';

const FILTER_SVG = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
  <filter id="${FILTER_ID}" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="0.008 0.014" numOctaves="2" seed="3" result="n"/>
    <feGaussianBlur in="n" stdDeviation="2" result="nb"/>
    <feDisplacementMap in="SourceGraphic" in2="nb" scale="22" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
</svg>`;

export interface SeaGlassLightOptions {
  root?: ParentNode | Document;
  /** Inject the SVG refraction filter once. Default true. */
  filter?: boolean;
}

function reducedMotion(): boolean {
  return Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
}

function supportsRefract(): boolean {
  try {
    return CSS.supports('backdrop-filter', `url(#${FILTER_ID})`);
  } catch {
    return false;
  }
}

function injectFilter(): void {
  if (document.getElementById(FILTER_ID)) return;
  const wrap = document.createElement('div');
  wrap.setAttribute('hidden', '');
  wrap.innerHTML = FILTER_SVG;
  document.body.prepend(wrap);
}

/**
 * Pointer-follow rim light. Opt-in. No-ops under prefers-reduced-motion.
 * Feature-detects SVG backdrop-filter instead of sniffing the UA.
 */
export function initSeaGlassLight(options: SeaGlassLightOptions = {}): () => void {
  const root = options.root ?? document;
  if (options.filter !== false) injectFilter();
  if (supportsRefract()) document.documentElement.classList.add('sg-refract');

  let live: HTMLElement | null = null;
  let last: PointerEvent | null = null;
  let raf = 0;

  function clear(el: HTMLElement | null): void {
    if (!el) return;
    el.removeAttribute('data-hover');
    el.style.removeProperty('--sg-mx');
    el.style.removeProperty('--sg-my');
    el.style.removeProperty('--sg-ang');
  }

  function apply(): void {
    raf = 0;
    if (!live || !last || reducedMotion()) return;
    const b = live.getBoundingClientRect();
    if (!b.width || !b.height) return;
    const px = (last.clientX - b.left) / b.width;
    const py = (last.clientY - b.top) / b.height;
    live.setAttribute('data-hover', '');
    live.style.setProperty('--sg-mx', `${(px * 100).toFixed(1)}%`);
    live.style.setProperty('--sg-my', `${(py * 100).toFixed(1)}%`);
    const dx = px - 0.5;
    const dy = py - 0.5;
    if (dx * dx + dy * dy > 0.01) {
      live.style.setProperty('--sg-ang', `${Math.round((Math.atan2(-dx, dy) * 180) / Math.PI)}deg`);
    }
  }

  function onMove(e: Event): void {
    const ev = e as PointerEvent;
    if (ev.pointerType === 'touch' || reducedMotion()) return;
    const el =
      ev.target instanceof Element ? ev.target.closest<HTMLElement>('.sg-glass[data-alive]') : null;
    if (el !== live) {
      clear(live);
      live = el;
    }
    if (!el) return;
    last = ev;
    if (!raf) raf = requestAnimationFrame(apply);
  }

  function onLeave(): void {
    clear(live);
    live = null;
  }

  root.addEventListener('pointermove', onMove, { passive: true });
  document.documentElement.addEventListener('pointerleave', onLeave);

  return () => {
    root.removeEventListener('pointermove', onMove);
    document.documentElement.removeEventListener('pointerleave', onLeave);
    if (raf) cancelAnimationFrame(raf);
    clear(live);
  };
}

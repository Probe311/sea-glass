/** Single document listener for `.lg[data-alive]` specular tracking (demo parity). */
let attached = false;

export function attachSeaGlassLight() {
  if (typeof document === 'undefined' || attached) return () => {};
  attached = true;

  let live: HTMLElement | null = null;
  let last: PointerEvent | null = null;
  let raf = 0;

  function clearLight(el: HTMLElement | null) {
    if (!el) return;
    el.removeAttribute('data-hover');
    el.style.removeProperty('--mx');
    el.style.removeProperty('--my');
    el.style.removeProperty('--ang');
  }

  function apply() {
    raf = 0;
    if (!live || !last) return;
    const b = live.getBoundingClientRect();
    if (!b.width || !b.height) return;
    const px = (last.clientX - b.left) / b.width;
    const py = (last.clientY - b.top) / b.height;
    live.setAttribute('data-hover', '');
    live.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
    live.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
    const dx = px - 0.5;
    const dy = py - 0.5;
    if (dx * dx + dy * dy > 0.01) {
      live.style.setProperty('--ang', `${Math.round((Math.atan2(-dx, dy) * 180) / Math.PI)}deg`);
    }
  }

  function onMove(e: PointerEvent) {
    if (e.pointerType === 'touch') return;
    const el = (e.target as Element | null)?.closest?.('.lg[data-alive]') as HTMLElement | null;
    if (el !== live) {
      clearLight(live);
      live = el;
    }
    if (!el) return;
    last = e;
    if (!raf) raf = requestAnimationFrame(apply);
  }

  function onLeave() {
    clearLight(live);
    live = null;
  }

  document.addEventListener('pointermove', onMove, { passive: true });
  document.documentElement.addEventListener('pointerleave', onLeave);

  return () => {
    document.removeEventListener('pointermove', onMove);
    document.documentElement.removeEventListener('pointerleave', onLeave);
    clearLight(live);
    attached = false;
  };
}

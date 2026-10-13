/* Sea Glass v3 · cœur : utilitaires, composant Glass, galets */
(function () {
  var h = React.createElement;
  var useRef = React.useRef, useEffect = React.useEffect, useMemo = React.useMemo, useId = React.useId;
  var SG = (window.SG = window.SG || {});
  SG.h = h;

  SG.PEBBLES = [
    { name: 'Seafoam', key: 'seafoam', rgb: '185 227 214', seed: 11 }, { name: 'Kelly', key: 'kelly', rgb: '79 168 119', seed: 23 },
    { name: 'Citron', key: 'citron', rgb: '216 219 156', seed: 37 }, { name: 'Aqua', key: 'aqua', rgb: '92 196 236', seed: 41 },
    { name: 'Cornflower', key: 'cornflower', rgb: '195 211 240', seed: 59 }, { name: 'Cobalt', key: 'cobalt', rgb: '107 140 227', seed: 67 },
    { name: 'Lavender', key: 'lavender', rgb: '228 218 232', seed: 73 }, { name: 'Ruby', key: 'ruby', rgb: '224 118 98', seed: 89 },
    { name: 'Amber', key: 'amber', rgb: '247 201 107', seed: 97 }, { name: 'Root beer', key: 'rootbeer', rgb: '181 134 106', seed: 103 },
    { name: 'Clear', key: 'clear', rgb: '247 249 247', seed: 113 }, { name: 'Mist', key: 'mist', rgb: '205 213 212', seed: 127 }
  ];
  var RGB = {};
  SG.PEBBLES.forEach(function (p) { RGB[p.key] = p.rgb; });
  SG.RGB = RGB;

  /* ---------- Thème ---------- */
  var store = { v: 0, subs: [] };
  var THEME_KEY = 'sg-theme';
  function bump() { store.v++; store.subs.forEach(function (f) { f(); }); }
  (function initTheme() {
    try {
      var saved = localStorage.getItem(THEME_KEY);
      if (saved === 'light' || saved === 'dark') document.documentElement.setAttribute('data-theme', saved);
    } catch (e) {}
  })();
  SG.isDark = function () {
    var a = document.documentElement.getAttribute('data-theme');
    if (a) return a === 'dark';
    return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  };
  SG.toggleTheme = function () {
    var next = SG.isDark() ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
    bump();
  };
  SG.useTheme = function () {
    return React.useSyncExternalStore(
      function (cb) { store.subs.push(cb); return function () { store.subs = store.subs.filter(function (f) { return f !== cb; }); }; },
      function () { return store.v; });
  };
  if (window.matchMedia) { var mq = window.matchMedia('(prefers-color-scheme: dark)'); if (mq.addEventListener) mq.addEventListener('change', bump); }
  SG.cssVar = function (n) { return getComputedStyle(document.documentElement).getPropertyValue(n).trim(); };

  /* ---------- Copie et toast ---------- */
  SG.toast = function (msg) { window.dispatchEvent(new CustomEvent('sg-toast', { detail: msg })); };
  function fallbackCopy(text) {
    var ta = document.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;opacity:0'; document.body.appendChild(ta); ta.select();
    var ok = false; try { ok = document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta); return ok;
  }
  SG.copy = function (text, label) {
    var done = function (ok) { SG.toast(ok ? (label || 'Copié') : 'Sélectionne le texte puis copie'); };
    try { navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(fallbackCopy(text)); }); }
    catch (e) { done(fallbackCopy(text)); }
  };

  SG.Icon = function (p) {
    var alias = (window.SG_ICON_ALIAS && window.SG_ICON_ALIAS[p.name]) || p.name;
    return h('svg', { className: 'ico', 'aria-hidden': true, width: p.size, height: p.size },
      h('use', { href: 'icons/sprite.svg#i-' + alias }));
  };

  /* ---------- Lumière : un seul écouteur pour tout le système ---------- */
  var live = null, last = null, raf = 0;
  function clearLight(el) {
    if (!el) return;
    el.removeAttribute('data-hover'); el.style.removeProperty('--mx'); el.style.removeProperty('--my'); el.style.removeProperty('--ang');
  }
  function applyLight() {
    raf = 0;
    if (!live || !last) return;
    var b = live.getBoundingClientRect();
    if (!b.width || !b.height) return;
    var px = (last.clientX - b.left) / b.width, py = (last.clientY - b.top) / b.height;
    live.setAttribute('data-hover', '');
    live.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
    live.style.setProperty('--my', (py * 100).toFixed(1) + '%');
    var dx = px - 0.5, dy = py - 0.5;
    if (dx * dx + dy * dy > 0.01) live.style.setProperty('--ang', Math.round(Math.atan2(-dx, dy) * 180 / Math.PI) + 'deg');
  }
  if (!SG._light) {
    SG._light = true;
    document.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      var el = e.target && e.target.closest ? e.target.closest('.lg[data-alive]') : null;
      if (el !== live) { clearLight(live); live = el; }
      if (!el) return;
      last = e;
      if (!raf) raf = requestAnimationFrame(applyLight);
    }, { passive: true });
    document.documentElement.addEventListener('pointerleave', function () { clearLight(live); live = null; });
  }

  /* ---------- Glass : le matériau ---------- */
  SG.Glass = function (props) {
    var as = props.as || 'div';
    var on = function (v) { return v === undefined ? true : !!v; };
    var ref = useRef(null);

    var st = Object.assign({}, props.style || {});
    if (props.tint) { st['--tint'] = RGB[props.tint] || props.tint; st['--glow'] = RGB[props.tint] || props.tint; if (props.tintA !== undefined) st['--tint-a'] = props.tintA; }
    if (props.glowColor) st['--glow'] = RGB[props.glowColor] || props.glowColor;

    var skip = { as: 1, frosted: 1, refractive: 1, alive: 1, rim: 1, tint: 1, tintA: 1, glow: 1, glowColor: 1, gloss: 1, className: 1, style: 1, children: 1, innerRef: 1 };
    var rest = {};
    Object.keys(props).forEach(function (k) { if (!skip[k]) rest[k] = props[k]; });
    rest.className = 'lg ' + (props.className || '');
    rest.style = st;
    rest.ref = function (n) { ref.current = n; if (typeof props.innerRef === 'function') props.innerRef(n); else if (props.innerRef) props.innerRef.current = n; };
    if (on(props.frosted)) rest['data-frosted'] = '';
    if (on(props.refractive)) rest['data-refractive'] = '';
    if (on(props.alive)) rest['data-alive'] = '';
    if (on(props.rim)) rest['data-rim'] = '';
    if (props.tint) rest['data-tint'] = '';
    if (on(props.glow)) rest['data-glow'] = '';
    return h.apply(null, [as, rest].concat(React.Children.toArray(props.children)));
  };

  /* ---------- Galets : formes lisses, proches d'un œuf aplati ---------- */
  function rng(seed) {
    var s = (seed >>> 0) || 1;
    return function () {
      s = (s + 0x6D2B79F5) >>> 0; var t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  /* Une forme = 8 rayons (border-radius elliptique) proches de 50 %, donc une patate arrondie.
     Une seconde série décalée de quelques points sert d'état d'arrivée de l'animation. */
  function blobRadii(seed) {
    var r = rng(seed * 7 + 3), A = [], B = [], i;
    for (i = 0; i < 8; i++) { var v = 44 + r() * 14; A.push(v); B.push(Math.max(38, Math.min(64, v + (r() - 0.5) * 16))); }
    function fmt(a) { return a.slice(0, 4).map(function (x) { return Math.round(x) + '%'; }).join(' ') + ' / ' + a.slice(4).map(function (x) { return Math.round(x) + '%'; }).join(' '); }
    return { a: fmt(A), b: fmt(B), rot: Math.round((r() - 0.5) * 24), dur: 7 + Math.round(r() * 50) / 10, delay: -Math.round(r() * 70) / 10 };
  }
  SG.Pebble = function (p) {
    var s = useMemo(function () { return blobRadii(p.seed); }, [p.seed]);
    return h('div', { className: 'blob', role: 'img', 'aria-label': p.name,
      style: { '--bc': 'var(--' + p.color + ')', '--ba': s.a, '--bb': s.b, '--br': s.rot + 'deg', '--bd': s.dur + 's', '--bl': s.delay + 's' } },
      h('span', { className: 'blob-hi' }));
  };
})();

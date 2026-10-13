/* Sea Glass v3 · composants React (1/2) : actions et sélection */
(function () {
  var SG = window.SG, h = SG.h, Glass = SG.Glass, Icon = SG.Icon;
  var useState = React.useState, useRef = React.useRef, useEffect = React.useEffect, useLayoutEffect = React.useLayoutEffect, useId = React.useId;
  var C = (SG.UI = {});
  function cls() { return Array.prototype.filter.call(arguments, Boolean).join(' '); }

  /* ---------- Bouton ---------- */
  C.Button = function (p) {
    var ref = useRef(null), v = p.variant || 'neutral', shape = p.shape || (p.icon ? 'circle' : 'pill');
    var ghost = v === 'ghost', love = v === 'love', pressed = p['aria-pressed'];
    var loveOff = love && pressed === false;
    function down(e) {
      var el = ref.current;
      if (!el || p.disabled || ghost) return;
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      var r = el.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, size = Math.max(r.width, r.height) * 1.7;
      var disc = document.createElement('span'); disc.className = 'rp-disc'; disc.style.left = x + 'px'; disc.style.top = y + 'px'; el.appendChild(disc);
      [0, 110].forEach(function (d) {
        var s = document.createElement('span'); s.className = 'rp-ring';
        s.style.cssText = 'left:' + x + 'px;top:' + y + 'px;width:' + size + 'px;height:' + size + 'px;animation-delay:' + d + 'ms';
        el.appendChild(s); setTimeout(function () { if (s.parentNode) s.parentNode.removeChild(s); }, 900 + d);
      });
      function up() {
        disc.classList.add('out'); setTimeout(function () { if (disc.parentNode) disc.parentNode.removeChild(disc); }, 340);
        window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up);
      }
      window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
    }
    return h(Glass, {
      as: 'button', type: 'button', innerRef: ref, onPointerDown: down, onClick: p.onClick, disabled: p.disabled || p.state === 'disabled',
      'aria-label': p['aria-label'], 'aria-pressed': pressed, tabIndex: p.tabIndex,
      className: cls('btn', 'shape-' + shape, p.size, v === 'primary' && 'primary', love && 'love', loveOff && 'off', ghost && 'ghost', p.state && 'is-' + p.state),
      tint: v === 'primary' ? 'seafoam' : (love && !loveOff) ? 'ruby' : undefined, tintA: v === 'primary' ? 0.92 : (love && !loveOff) ? 1 : undefined,
      glow: v === 'primary' || (love && !loveOff), refractive: false, frosted: !ghost, rim: !ghost, alive: !ghost
    }, p.children);
  };

  /* ---------- Puce ---------- */
  C.Chip = function (p) {
    var st = useState(!!p.defaultPressed), on = st[0], set = st[1];
    return h(Glass, { as: 'button', type: 'button', className: cls('chip', 'shape-' + (p.shape || 'pill'), p.state && 'is-' + p.state), 'aria-pressed': on, disabled: p.disabled,
      tint: on ? 'seafoam' : undefined, tintA: 0.62, glow: on, refractive: false, onClick: function () { set(!on); } },
      on && h(Icon, { name: 'check' }), p.children);
  };

  /* ---------- Interrupteur ---------- */
  C.Toggle = function (p) {
    var st = useState(p.checked !== undefined ? p.checked : !!p.defaultChecked), on = st[0], set = st[1];
    var checked = p.checked !== undefined ? p.checked : on;
    return h('span', { className: cls('tgl', checked && 'on', p.disabled && 'dis', p.state && 'is-' + p.state) },
      h('input', { type: 'checkbox', role: 'switch', checked: checked, disabled: p.disabled, 'aria-label': p['aria-label'], onChange: function (e) { set(e.target.checked); if (p.onChange) p.onChange(e.target.checked); } }),
      h(Glass, { as: 'span', className: 'tgl-track carved', tint: checked ? 'seafoam' : undefined, tintA: 0.78, glow: false, refractive: false, alive: false, 'aria-hidden': true }),
      h('span', { className: 'knob' }));
  };

  /* ---------- Case à cocher ---------- */
  C.Checkbox = function (p) {
    var st = useState(!!p.defaultChecked), on = st[0], set = st[1];
    var ind = !!p.indeterminate, active = on || ind;
    return h('label', { className: cls('cb', active && 'on', p.disabled && 'dis', p.state && 'is-' + p.state) },
      h('input', { type: 'checkbox', checked: on, disabled: p.disabled, onChange: function (e) { set(e.target.checked); } }),
      h(Glass, { as: 'span', className: cls('box', !active && 'carved'), frosted: false, glow: false, refractive: false, alive: false },
        ind ? h('span', { className: 'tick-ind', 'aria-hidden': true })
          : on ? h(Icon, { name: 'check', size: 14 }) : null),
      p.children);
  };

  /* ---------- Radio ---------- */
  C.Radio = function (p) {
    return h('label', { className: cls('cb', 'radio', p.checked && 'on', p.disabled && 'dis', p.state && 'is-' + p.state) },
      h('input', { type: 'radio', name: p.name, checked: p.checked, disabled: p.disabled, onChange: p.onChange }),
      h(Glass, { as: 'span', className: cls('box', !p.checked && 'carved'), frosted: false, glow: false, refractive: false, alive: false }, h('span', { className: 'dot' })),
      p.children);
  };
  C.RadioGroup = function (p) {
    var st = useState(p.value || p.options[0]), val = st[0], set = st[1];
    var name = useId();
    return h('div', { role: 'radiogroup', 'aria-label': p.label, className: 'stage', style: { gap: 24 } },
      p.options.map(function (o) { return h(C.Radio, { key: o, name: name, checked: val === o, onChange: function () { set(o); } }, o); }));
  };

  /* ---------- Curseur : valeur simple ou plage, paliers, bulle de valeur ---------- */
  C.Slider = function (p) {
    var min = p.min === undefined ? 0 : p.min, max = p.max === undefined ? 100 : p.max, step = p.step || 1, range = !!p.range, unit = p.unit || '';
    var st = useState(range ? (p.value || [25, 70]) : [p.value === undefined ? 40 : p.value]), vals = st[0], setVals = st[1];
    var ds = useState(-1), drag = ds[0], setDrag = ds[1];
    var box = useRef(null), act = useRef(0), id = useId();
    function frac(v) { return (v - min) / (max - min); }
    function snap(v) { var n = Math.round((v - min) / step) * step + min; n = Math.max(min, Math.min(max, n)); return Math.round(n * 1e6) / 1e6; }
    function commit(i, v) {
      var n = vals.slice();
      if (range) v = i === 0 ? Math.min(v, n[1]) : Math.max(v, n[0]);
      if (n[i] === v) return;
      n[i] = v; setVals(n);
      if (p.onChange) p.onChange(range ? n : n[0]);
    }
    function fromX(x) {
      var r = box.current.getBoundingClientRect();
      var f = Math.max(0, Math.min(1, (x - r.left - 10) / Math.max(1, r.width - 20)));
      return snap(min + f * (max - min));
    }
    function down(e) {
      if (p.disabled) return;
      box.current.setPointerCapture(e.pointerId);
      var v = fromX(e.clientX), i = 0;
      if (range) { var d0 = Math.abs(v - vals[0]), d1 = Math.abs(v - vals[1]); i = d0 < d1 ? 0 : d1 < d0 ? 1 : (v < vals[0] ? 0 : 1); }
      act.current = i; setDrag(i); commit(i, v);
      var t = box.current.querySelectorAll('.sl-thumb')[i]; if (t) t.focus({ preventScroll: true });
    }
    function move(e) { if (drag >= 0) commit(act.current, fromX(e.clientX)); }
    function key(e, i) {
      var big = Math.max(step, Math.round((max - min) / 10 / step) * step), v = vals[i], n = v;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') n = v + step;
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') n = v - step;
      else if (e.key === 'PageUp') n = v + big;
      else if (e.key === 'PageDown') n = v - big;
      else if (e.key === 'Home') n = range ? (i === 0 ? min : vals[0]) : min;
      else if (e.key === 'End') n = range ? (i === 0 ? vals[1] : max) : max;
      else return;
      e.preventDefault(); commit(i, snap(n));
    }
    var a = range ? frac(vals[0]) : 0, b = frac(vals[range ? 1 : 0]);
    var count = Math.max(1, Math.min(20, Math.round((max - min) / step)));
    var ticks = null;
    if (p.marks) {
      var items = [];
      for (var k = 0; k <= count; k++) {
        var t = k / count;
        items.push(h('i', { key: 't' + k, className: (t >= a - 1e-6 && t <= b + 1e-6 && (range || t <= b + 1e-6)) ? 'on' : '', style: { '--t': t } }));
      }
      items.push(h('span', { key: 'lo', className: 'lo' }, min + unit), h('span', { key: 'hi', className: 'hi' }, max + unit));
      ticks = h('div', { className: 'sl-ticks', 'aria-hidden': true }, items);
    }
    var text = range ? vals[0] + ' – ' + vals[1] + unit : vals[0] + unit;
    return h('div', null,
      p.label && h('div', { className: 'sl-head' }, h('span', { id: id }, p.label), h('output', null, text)),
      h('div', { ref: box, className: cls('sl', range && 'range', p.marks && 'marks', drag >= 0 && 'drag', p.disabled && 'dis', p.state && 'is-' + p.state), style: { '--a': a, '--b': b },
        onPointerDown: down, onPointerMove: move,
        onPointerUp: function () { setDrag(-1); }, onPointerCancel: function () { setDrag(-1); },
        onPointerLeave: function (e) { if (drag < 0 && e.buttons === 0) return; } },
        h('div', { className: 'sl-rail' }), h('div', { className: 'sl-fill' }), ticks,
        vals.map(function (v, i) {
          var name = range ? (p.label || p['aria-label'] || 'Plage') + (i === 0 ? ', minimum' : ', maximum') : undefined;
          var forceAct = p.state === 'press' || p.state === 'focus';
          return h('div', { key: i, className: cls('sl-thumb', (drag === i || forceAct) && 'act', p.thumb === 'pipette' && 'pipette'), role: 'slider', tabIndex: p.disabled ? -1 : 0,
            'aria-valuemin': range && i === 1 ? vals[0] : min, 'aria-valuemax': range && i === 0 ? vals[1] : max, 'aria-valuenow': v, 'aria-valuetext': v + unit,
            'aria-labelledby': !range && p.label ? id : undefined, 'aria-label': range ? name : (p.label ? undefined : p['aria-label']), 'aria-disabled': p.disabled || undefined,
            style: { '--v': frac(v) }, onKeyDown: function (e) { key(e, i); } },
            h('i', { className: 'blob', 'aria-hidden': true }),
            h('i', { className: 'bulb', 'aria-hidden': true }),
            h('i', { className: 'fl t', 'aria-hidden': true }), h('i', { className: 'fl b', 'aria-hidden': true }),
            h('i', { className: 'stem', 'aria-hidden': true }),
            h('i', { className: 'ring r2', 'aria-hidden': true }), h('i', { className: 'ring r1', 'aria-hidden': true }),
            h(Glass, { as: 'span', className: 'sl-bub', tint: 'seafoam', tintA: 0.85, frosted: false, refractive: false, alive: false, glow: false, rim: true, 'aria-hidden': true }, v + unit));
        })));
  };

  /* ---------- Progression : barre (tailles, teintes, tampon, indéterminée) et anneau ---------- */
  C.Progress = function (p) {
    var f = Math.max(0, Math.min(100, p.value || 0)) / 100, buf = p.buffer === undefined ? 0 : Math.max(0, Math.min(100, p.buffer)) / 100;
    var bar = h('div', { className: cls('pg', p.size, p.tone && 't-' + p.tone, p.indeterminate && 'ind'), role: 'progressbar', 'aria-label': p.label,
      'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-valuenow': p.indeterminate ? undefined : Math.round(f * 100), style: { '--f': f, '--buf': buf } },
      p.buffer !== undefined && h('b'), h('i'));
    if (!p.showValue) return bar;
    return h('div', { style: { display: 'grid', gap: 8, alignContent: 'start' } },
      h('div', { className: 'pg-row' }, h('span', null, p.label), h('span', { className: 'mono' }, p.indeterminate ? 'En cours' : Math.round(f * 100) + ' %')), bar);
  };
  C.Ring = function (p) {
    var uid = useId().replace(/[^a-zA-Z0-9]/g, ''), v = Math.max(0, Math.min(100, p.value || 0));
    return h('div', { className: 'ring', role: 'progressbar', 'aria-label': p.label, 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-valuenow': Math.round(v), style: { '--sz': (p.size || 72) + 'px' } },
      h('svg', { viewBox: '0 0 36 36', 'aria-hidden': true },
        h('defs', null, h('linearGradient', { id: 'rg' + uid, x1: 0, y1: 0, x2: 0, y2: 1 }, h('stop', { offset: 0, style: { stopColor: 'var(--ft)' } }), h('stop', { offset: 1, style: { stopColor: 'var(--fb)' } }))),
        h('circle', { className: 'trk-s', cx: 18, cy: 18, r: 15.9155 }), h('circle', { className: 'trk', cx: 18, cy: 18, r: 15.9155 }),
        h('circle', { className: 'val', cx: 18, cy: 18, r: 15.9155, stroke: 'url(#rg' + uid + ')', strokeDasharray: (v === 0 ? 0 : Math.max(v, 1.5)) + ' 100', strokeLinecap: 'round' })),
      h('span', null, Math.round(v) + '%'));
  };

  /* ---------- Liste coulissante : onglets, segmenté ---------- */
  function useSlide(box, sel, index, deps) {
    var st = useState({ left: 4, width: 0 }), pos = st[0], set = st[1];
    function measure() {
      var el = box.current; if (!el) return;
      var t = el.querySelectorAll(sel)[index]; if (t) set({ left: t.offsetLeft, width: t.offsetWidth });
    }
    var latest = useRef(measure); latest.current = measure;
    useLayoutEffect(measure, deps);
    useEffect(function () {
      var call = function () { latest.current(); };
      var ro = window.ResizeObserver ? new ResizeObserver(call) : null;
      if (ro && box.current) ro.observe(box.current);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(call);
      window.addEventListener('resize', call);
      return function () { if (ro) ro.disconnect(); window.removeEventListener('resize', call); };
    }, []);
    return pos;
  }
  function Listing(p) {
    var items = p.items, idx = Math.max(0, items.findIndex(function (i) { return i.id === p.value; }));
    var box = useRef(null), line = p.variant === 'line' || p.variant === 'doc', pos = useSlide(box, '.tab', idx, [p.value, items.length]);
    var uid = p.uid, role = p.kind === 'radio' ? 'radio' : 'tab';
    function move(to) {
      var n = items[(to + items.length) % items.length];
      p.onChange(n.id);
      setTimeout(function () { var b = box.current && box.current.querySelectorAll('.tab')[(to + items.length) % items.length]; if (b) b.focus(); }, 0);
    }
    function key(e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); move(idx + 1); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); move(idx - 1); }
      else if (e.key === 'Home') { e.preventDefault(); move(0); }
      else if (e.key === 'End') { e.preventDefault(); move(items.length - 1); }
    }
    var buttons = items.map(function (it, i) {
      var sel = i === idx, a = { key: it.id, type: 'button', className: 'tab', role: role, tabIndex: sel ? 0 : -1, disabled: it.disabled, onClick: function () { p.onChange(it.id); } };
      if (role === 'tab') { a.id = uid + '-t-' + it.id; a['aria-selected'] = sel; a['aria-controls'] = uid + '-p-' + it.id; } else a['aria-checked'] = sel;
      return h('button', a, it.icon && h(Icon, { name: it.icon }), it.label);
    });
    var indicator = line ? h('span', { className: 'ind', style: { left: pos.left + 'px', width: pos.width + 'px' }, 'aria-hidden': true })
      : h(Glass, { as: 'span', className: 'pill', style: { left: pos.left + 'px', width: pos.width + 'px' }, tint: 'seafoam', tintA: 0.92, frosted: false, refractive: false, alive: false, glow: false, 'aria-hidden': true });
    var common = { role: p.kind === 'radio' ? 'radiogroup' : 'tablist', 'aria-label': p.label, onKeyDown: key };
    if (line) return h('div', Object.assign({ ref: box, className: p.variant === 'doc' ? 'm3tabs' : 'tabs-line' }, common), indicator, buttons);
    return h(Glass, Object.assign({ innerRef: box, className: 'tabs-list', refractive: false, glow: false }, common), indicator, buttons);
  }

  C.Tabs = function (p) {
    var st = useState(p.value || p.items[0].id), val = st[0], set = st[1], uid = useId().replace(/[^a-zA-Z0-9]/g, '');
    return h('div', { className: p.className, style: { minWidth: 0 } },
      h(Listing, { items: p.items, value: val, onChange: set, variant: p.variant, label: p.label, uid: uid }),
      p.items.map(function (it) {
        if (p.keep) return h('div', { key: it.id, id: uid + '-p-' + it.id, className: 'tab-panel', role: 'tabpanel', hidden: val !== it.id, 'aria-labelledby': uid + '-t-' + it.id }, it.panel);
        return val === it.id && h('div', { key: it.id, id: uid + '-p-' + it.id, className: 'tab-panel', role: 'tabpanel', tabIndex: 0, 'aria-labelledby': uid + '-t-' + it.id }, it.panel);
      }));
  };
  C.Segmented = function (p) {
    var st = useState(p.value || p.options[0]), val = st[0], set = st[1], uid = useId().replace(/[^a-zA-Z0-9]/g, '');
    return h(Listing, { items: p.options.map(function (o) { return { id: o, label: o }; }), value: val, onChange: function (v) { set(v); if (p.onChange) p.onChange(v); }, kind: 'radio', label: p.label, uid: uid });
  };
})();

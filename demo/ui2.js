/* Sea Glass v3 · composants React (2/2) : saisie, navigation, contenu, helpers de documentation */
(function () {
  var SG = window.SG, h = SG.h, Glass = SG.Glass, Icon = SG.Icon, C = SG.UI;
  var useState = React.useState, useRef = React.useRef, useEffect = React.useEffect, useLayoutEffect = React.useLayoutEffect, useId = React.useId;
  function cls() { return Array.prototype.filter.call(arguments, Boolean).join(' '); }

  C.Field = function (p) {
    var id = useId();
    return h('div', { className: 'field' },
      h('label', { htmlFor: id }, p.label),
      h('div', { className: cls('shell-in', p.disabled && 'dis', p.state && 'is-' + p.state) },
        h(Glass, {
          className: 'field-shell',
          'aria-hidden': true,
          refractive: false,
          glow: false,
          frosted: false,
          alive: false,
          tint: p.invalid ? 'ruby' : undefined,
          tintA: p.invalid ? 0.35 : undefined,
        }),
        h('input', { id: id, type: 'text', placeholder: p.placeholder, defaultValue: p.value, disabled: p.disabled, 'aria-invalid': p.invalid ? 'true' : undefined, 'aria-describedby': p.help ? id + 'h' : undefined })),
      p.help && h('span', { id: id + 'h', className: cls('help', p.invalid && 'err') }, p.help));
  };

  C.Search = function () {
    return h(Glass, { className: 'search' },
      h(Icon, { name: 'search' }),
      h('input', { type: 'search', placeholder: 'Rechercher un galet', 'aria-label': 'Rechercher' }),
      h('button', { type: 'button', className: 'sbtn', 'aria-label': 'Recherche vocale' }, h(Icon, { name: 'mic' })),
      h('button', { type: 'button', className: 'sbtn', 'aria-label': 'Menu' }, h(Icon, { name: 'menu' })));
  };

  C.NavBar = function () {
    var items = [['home', 'Rivage'], ['explore', 'Explorer'], ['bookmark', 'Collection'], ['user', 'Profil']];
    var st = useState(0), cur = st[0], set = st[1], box = useRef(null), ps = useState({ left: 6, width: 0 }), pill = ps[0], setPill = ps[1];
    function measure() { var el = box.current; if (!el) return; var b = el.querySelectorAll('.nb')[cur]; if (b) setPill({ left: b.offsetLeft, width: b.offsetWidth }); }
    var latest = useRef(measure); latest.current = measure;
    useLayoutEffect(measure, [cur]);
    useEffect(function () {
      var call = function () { latest.current(); };
      var ro = window.ResizeObserver ? new ResizeObserver(call) : null; if (ro && box.current) ro.observe(box.current);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(call);
      return function () { if (ro) ro.disconnect(); };
    }, []);
    return h(Glass, { as: 'nav', className: 'navbar', innerRef: box, 'aria-label': 'Navigation principale' },
      h(Glass, { as: 'span', className: 'pill', style: { transform: 'translate3d(' + pill.left + 'px,0,0)', width: pill.width + 'px' }, tint: 'seafoam', tintA: 0.92, frosted: false, refractive: false, alive: false, glow: false, 'aria-hidden': true }),
      items.map(function (it, i) { return h('button', { key: it[0], type: 'button', className: 'nb', 'aria-current': i === cur ? 'page' : undefined, onClick: function () { set(i); } }, h(Icon, { name: it[0] }), it[1]); }));
  };

  C.Card = function (p) { return h(Glass, { as: 'article', className: 'card', tint: p.tint, tintA: 0.4, style: p.style }, p.children); };
  C.Badge = function (p) {
    return h(Glass, {
      as: 'span',
      className: 'badge',
      tint: p.tint,
      tintA: 0.92,
      refractive: false,
      alive: false,
      glow: false,
      frosted: false,
      style: { color: p.tint ? 'var(--' + p.tint + '-ink)' : undefined },
    }, p.children);
  };
  C.Snack = function (p) {
    return h(Glass, { className: 'sg-snack snack', tint: 'seafoam', tintA: 0.55 },
      h('span', null, p.children), p.action);
  };

  /* ---------- Helpers de documentation ---------- */
  var D = (SG.Doc = {});
  function kindOf(k) {
    if (!k || !k.type) return 'ap';
    if (k.type === D.Specs) return 'sp';
    if (k.type === D.Usage) return 'rc';
    if (k.type === D.Sub) { var cs = React.Children.toArray(k.props.children); if (cs.length && cs.every(function (c) { return c.type === D.Specs; })) return 'sp'; }
    return 'ap';
  }
  /* Section : titre à la Google, puis onglets Aperçu / Spécifications / Recommandations */
  D.Section = function (p) {
    var g = { ap: [], sp: [], rc: [] };
    React.Children.toArray(p.children).forEach(function (k) { g[kindOf(k)].push(k); });
    var items = [{ id: 'ap', label: 'Aperçu', panel: h('div', { className: 'tabstack' }, g.ap) }];
    if (g.sp.length) items.push({ id: 'sp', label: 'Spécifications', panel: h('div', { className: 'tabstack' }, g.sp) });
    if (g.rc.length) items.push({ id: 'rc', label: 'Recommandations', panel: h('div', { className: 'tabstack' }, g.rc) });
    return h('section', { className: 'sec', id: p.id, 'data-spy': p.id },
      h('header', { className: 'sec-head' }, h('span', { className: 'crumb' }, p.label), h('h2', null, p.title), p.lead && h('p', null, p.lead)),
      items.length > 1 ? h(C.Tabs, { items: items, variant: 'doc', keep: true, label: p.title, className: 'sec-tabs' }) : h('div', { className: 'tabstack' }, g.ap));
  };
  D.Sub = function (p) { return h('div', { className: 'sub' }, p.title && h('h3', null, p.title), p.text && h('p', null, p.text), p.children); };
  D.Panel = function (p) {
    /* scene + sg-scene : wash démo + frost/alpha package sur .sg-glass enfants */
    return h('div', { className: cls('panel', p.scene && 'scene', p.scene && 'sg-scene') },
      h('div', { className: 'panel-body' }, p.children),
      (p.cap || p.tag) && h('div', { className: 'panel-cap' },
        p.tag && h('b', null, p.tag),
        p.cap && h('span', null, p.cap)));
  };
  D.Stage = function (p) { return h('div', { className: cls('stage', p.col && 'col', p.center && 'center'), style: p.style }, p.children); };
  D.Specs = function (p) {
    return h('div', { className: 'tscroll' }, h('table', { className: 'specs' },
      h('thead', null, h('tr', null, p.head.map(function (t) { return h('th', { key: t }, t); }))),
      h('tbody', null, p.rows.map(function (r, i) { return h('tr', { key: i }, r.map(function (c, j) { return h('td', { key: j }, c); })); }))));
  };
  D.Usage = function (p) {
    function box(kind, title, icon, list) {
      return h('div', { className: 'use ' + kind },
        h('b', null, h('span', { className: 'use__ico', 'aria-hidden': true }, h(Icon, { name: icon, size: 14 })), title),
        h('ul', null, list.map(function (t, i) { return h('li', { key: i }, t); })));
    }
    return h('div', { className: 'usage' },
      box('do', 'À faire', 'check', p.dos),
      box('dont', 'À éviter', 'xmark', p.donts));
  };
  /* Matrice : colonnes = états, lignes = variantes ; render(row, col) renvoie le composant */
  D.Matrix = function (p) {
    var cells = [h('div', { key: 'h0', className: 'h' }, p.corner || '')];
    p.cols.forEach(function (c) { cells.push(h('div', { key: 'h' + c[0], className: 'h' }, c[1])); });
    p.rows.forEach(function (r) {
      cells.push(h('div', { key: 'r' + r[0], className: 'rl' }, r[1]));
      p.cols.forEach(function (c) { cells.push(h('div', { key: r[0] + c[0], className: 'cell' + (p.tall ? ' tall' : '') }, p.render(r[0], c[0]))); });
    });
    return h('div', { className: 'scroll-x' }, h('div', { className: 'matrix', style: { '--cols': p.cols.length } }, cells));
  };
  D.Code = function (p) {
    return h('div', { className: 'codebox' }, h('pre', { className: 'code', tabIndex: 0 }, p.text),
      h(C.Button, { size: 'sm', icon: true, 'aria-label': 'Copier le code', onClick: function () { SG.copy(p.text, 'Code copié'); } }, h(Icon, { name: 'copy' })));
  };
})();

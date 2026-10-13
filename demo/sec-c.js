/* Sea Glass v3 · contenu (3/3) : saisie, navigation, contenu, qualité, application */
(function () {
  var SG = window.SG, h = SG.h, Glass = SG.Glass, Icon = SG.Icon, UI = SG.UI, D = SG.Doc, S = SG.S;
  var useState = React.useState, useEffect = React.useEffect, useRef = React.useRef;

  /* ---------- Champs et recherche ---------- */
  S.Fields = function () {
    var F = UI.Field;
    return h(D.Section, { id: 'champs', label: 'Composants', title: 'Champs et recherche', lead: 'Le champ est un creux de verre : la matière est enfoncée, la saisie reste sur fond clair. La recherche est un Givre en pilule, pensé pour reposer sur une image.' },
      h(D.Panel, { tag: 'Champs', cap: 'entrée, survol, focus, erreur et désactivé.' },
        h('div', { className: 'fields-grid' },
          h(F, { label: 'Nom de la crique', placeholder: 'Crique des Sirènes', help: 'Visible dans ta collection.' }),
          h(F, { label: 'Profondeur maximale', value: 'abc', invalid: true, help: 'Saisis un nombre en mètres, par exemple 12.' }),
          h(F, { label: 'Survol (forcé)', placeholder: 'Survolé', state: 'hover' }),
          h(F, { label: 'Désactivé', value: 'Récif nord', disabled: true }),
          h(F, { label: 'Focus (forcé)', placeholder: 'Au clavier', state: 'focus' }))),
      h(D.Panel, { scene: true, tag: 'Recherche', cap: 'Givre sur décor coloré : icônes en encre foncée, focus en anneau blanc.' }, h(UI.Search)),
      h(D.Specs, { head: ['Propriété', 'Valeur', 'Note'], rows: [['Hauteur', '52 px (champ) · 58 px (recherche)', 'Zone tactile confortable.'], ['Rayon', '16 px · pilule', ''], ['Étiquette', 'Roboto 500, 13 px, au-dessus', 'Jamais un simple placeholder.'], ['Erreur', 'Teinte ruby + message sous le champ', 'Dire quoi corriger.']] }));
  };

  /* ---------- Navigation ---------- */
  S.Nav = function () {
    return h(D.Section, { id: 'navigation', label: 'Composants', title: 'Navigation', lead: 'La barre de navigation est un Givre en pilule. L’entrée active est un galet seafoam qui glisse d’un item à l’autre.' },
      h(D.Panel, { scene: true, tag: 'Aperçu', cap: 'Quatre destinations au maximum.' }, h(UI.NavBar)),
      h(D.Usage, { dos: ['Quatre entrées au plus, avec icône et libellé.', 'Placer la barre sur une image ou un dégradé.'], donts: ['Cacher les libellés.', 'Placer la barre sur un fond uni : le Givre n’aurait aucun effet.'] }));
  };

  /* ---------- Cartes et badges ---------- */
  S.Cards = function () {
    var Card = UI.Card, B = UI.Badge;
    return h(D.Section, { id: 'cartes', label: 'Composants', title: 'Cartes et badges', lead: 'La carte est un Givre au rayon de 28 px, teintée par la couleur de son contenu. Les badges sont de petites pilules teintées avec leur encre.' },
      h(D.Panel, { scene: true, tag: 'Cartes', cap: 'Teinte aqua pour l’information, amber pour les observations rares.' },
        h('div', { className: 'g2' },
          h(Card, { tint: 'aqua' }, h('span', { className: 'label', style: { color: 'inherit', opacity: .75 } }, 'Aujourd’hui'), h('h4', null, 'Mer calme'), h('p', null, 'Vent faible de sud-ouest, houle de 0,6 m. Bonne visibilité sur tout le littoral.'), h('div', { className: 'kv' }, h('span', null, 'Marée haute 17:42'), h('span', null, 'Coef. 78'))),
          h(Card, { tint: 'amber' }, h('span', { className: 'label', style: { color: 'inherit', opacity: .75 } }, 'Observation'), h('h4', null, 'Anémone des mares'), h('p', null, 'Repérée à marée basse, accrochée à un bloc de granit.'), h('div', { className: 'stage' }, h(B, { tint: 'seafoam', dot: true }, 'Rivage'), h(B, { tint: 'amber', dot: true }, 'Rare'))))),
      h(D.Panel, { tag: 'Badges', cap: 'Texte en encre du galet : contraste minimum 4,5:1.' }, h(D.Stage, null, [['seafoam', 'Collecté'], ['cobalt', 'Nouveau'], ['amber', 'Rare'], ['ruby', 'Menacé'], ['kelly', 'Vérifié'], ['mist', 'Brouillon']].map(function (b) { return h(B, { key: b[0], tint: b[0], dot: true }, b[1]); }))));
  };

  /* ---------- Retours ---------- */
  S.Feedback = function () {
    return h(D.Section, { id: 'retours', label: 'Composants', title: 'Retours', lead: 'Info-bulle et notification confirment une action sans interrompre. Les deux sont des Givre.' },
      h(D.Panel, { scene: true, tag: 'Aperçu', cap: 'La notification propose toujours d’annuler.' },
        h('div', { className: 'g2' },
          h(D.Stage, { col: true }, h('span', { className: 'label', style: { color: 'var(--ink)' } }, 'Info-bulle'), h('div', null, h(UI.Tip, null, 'Ajouter à la collection'))),
          h(D.Stage, { col: true }, h('span', { className: 'label', style: { color: 'var(--ink)' } }, 'Notification'), h(UI.Snack, { action: h(UI.Button, { variant: 'primary', size: 'sm' }, 'Annuler') }, 'Galet ajouté à ta collection')))),
      h(D.Panel, { tag: 'Toast' }, h(D.Stage, null, h(UI.Button, { variant: 'primary', onClick: function () { SG.toast('Galet collecté'); } }, 'Afficher une notification'))));
  };

  /* ---------- Contraste ---------- */
  function rgb(hex) { hex = hex.replace('#', ''); if (hex.length === 3) hex = hex.replace(/./g, '$&$&'); return [0, 2, 4].map(function (i) { return parseInt(hex.substr(i, 2), 16); }); }
  function lum(c) { var v = c.map(function (x) { x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); }); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; }
  function ratio(a, b) { var x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
  function blend(top, bottom, a) { return top.map(function (t, i) { return Math.round(t * a + bottom[i] * (1 - a)); }); }
  function hex(c) { return '#' + c.map(function (x) { return ('0' + x.toString(16)).slice(-2); }).join(''); }

  S.Contrast = function () {
    SG.useTheme();
    var V = SG.cssVar, ground = rgb(V('--ground'));
    function pair(label, fgVar, base, a, min) {
      var fg = rgb(V(fgVar)), bg = base ? blend(rgb(V('--' + base)), ground, a) : ground;
      return { label: label, fg: hex(fg), bg: hex(bg), r: ratio(fg, bg), min: min };
    }
    var rows = [
      pair('Texte principal sur le sol', '--ink', null, 1, 4.5), pair('Texte secondaire sur le sol', '--ink-2', null, 1, 4.5), pair('Texte discret sur le sol', '--ink-3', null, 1, 4.5),
      pair('Bouton principal : seafoam à 62 %', '--on-tint', 'seafoam', 0.62, 4.5), pair('Badge aqua à 62 %', '--aqua-ink', 'aqua', 0.62, 4.5), pair('Badge amber à 62 %', '--amber-ink', 'amber', 0.62, 4.5),
      pair('Badge kelly à 62 %', '--kelly-ink', 'kelly', 0.62, 4.5), pair('Badge cobalt à 62 %', '--cobalt-ink', 'cobalt', 0.62, 4.5), pair('Anneau de focus sur le sol', '--focus', null, 1, 3)];
    // Icône blanche du cœur sur ruby à 93 %
    var heart = { label: 'Cœur : icône blanche sur ruby à 93 %', fg: '#ffffff', bg: hex(blend(rgb(V('--ruby')), ground, 0.93)) };
    heart.r = ratio(rgb('#ffffff'), rgb(heart.bg)); heart.min = 3; rows.push(heart);
    // Coche et point : blanc sur le teal profond de la case cochée (deux extrémités du dégradé)
    [['Coche : blanc sur le haut du galet #308069', '#308069'], ['Coche : blanc sur le bas du galet #256B5A', '#256B5A']].forEach(function (t) {
      rows.push({ label: t[0], fg: '#ffffff', bg: t[1], r: ratio([255, 255, 255], rgb(t[1])), min: 3 });
    });
    return h(D.Section, { id: 'contraste', label: 'Qualité', title: 'Contraste mesuré', lead: 'Ratios calculés en direct pour le thème actif, avec l’opacité réelle des teintes mélangées au sol. Le texte vise 4,5:1, les icônes et anneaux 3:1. Sur une photo, vérifie le texte posé sur du Givre au cas par cas.' },
      h(D.Panel, { tag: 'Mesures', cap: 'Change de thème depuis le menu pour comparer.' },
        h('div', { className: 'tscroll' }, h('table', { className: 'ct' },
          h('thead', null, h('tr', null, ['Paire', 'Aperçu', 'Ratio', 'Seuil', 'Résultat'].map(function (t) { return h('th', { key: t }, t); }))),
          h('tbody', null, rows.map(function (r) {
            var ok = r.r >= r.min;
            return h('tr', { key: r.label }, h('td', null, r.label), h('td', null, h('span', { className: 'pair', style: { color: r.fg, background: r.bg } }, 'Aa')),
              h('td', { className: 'ratio' }, r.r.toFixed(2) + ' : 1'), h('td', { className: 'ratio' }, r.min + ' : 1'), h('td', null, h('span', { className: 'res ' + (ok ? 'ok' : 'ko') }, ok ? 'Conforme' : 'À corriger')));
          }))))),
      h(D.Specs, { head: ['Sujet', 'Règle', 'Note'], rows: [['Focus visible', 'Anneau de 2 px décalé de 3 px', 'Cobalt foncé en clair, cobalt clair en sombre.'], ['Cibles tactiles', '40 px minimum, 48 px par défaut', ''], ['Clavier', 'Tab, flèches, Espace, Entrée', 'Onglets et curseur suivent les motifs ARIA.'], ['Mouvement', 'prefers-reduced-motion', 'Transitions, ondes et segment indéterminé neutralisés.']] }));
  };

  /* ---------- Tokens et code ---------- */
  var CSS = [
    '/* Sea Glass v4 · tokens (clair) */', ':root {',
    '  --ground: #F4F3EE;  --ink: #17262A;  --ink-2: #3E4F52;  --ink-3: #566568;  --focus: #2F55C4;',
    '  --seafoam: #B9E3D6;  --kelly: #4FA877;  --citron: #D8DB9C;  --aqua: #5CC4EC;',
    '  --cornflower: #C3D3F0;  --cobalt: #6B8CE3;  --lavender: #E4DAE8;  --ruby: #E07662;',
    '  --amber: #F7C96B;  --rootbeer: #B5866A;  --clear: #F7F9F7;  --mist: #CDD5D4;',
    '  --on-tint: #14463A;  --teal: #4F9482;  --teal-hi: #7BBFAC;',
    '  --ga: 0.74;          /* verre sur sol uni */',
    '  --ga-scene: 0.26;    /* verre sur décor coloré */',
    '  --lg-blur: 12px;     /* 12 à 16 px, 20 à 24 px sur fond chargé */',
    '  --lg-r: 28px;        /* 8 à 12 contrôles, 16 panneaux, 28 cartes, 999 pilules */',
    '  --ease: cubic-bezier(.2,0,0,1);  --spring: cubic-bezier(.34,1.4,.5,1);', '}',
    '/* sombre : --ground #0B1513, --ink #E8F1EE, --ga .08, --ga-scene .12, --teal #7BBFAC */', '',
    '/* Les six propriétés, en attributs */',
    '.scene .lg[data-frosted], .lg.over[data-frosted] { backdrop-filter: blur(var(--lg-blur)) saturate(1.6); }',
    '.sg-refract .scene .lg[data-refractive] { backdrop-filter: blur(calc(var(--lg-blur) * .5)) url(#sg-refract) saturate(1.6); } /* Chromium */',
    '.lg[data-alive]      { /* reflet qui suit le pointeur (--mx, --my), ressort au survol */ }',
    '.lg[data-rim]        { /* liseré d’arête, angle --ang qui suit le pointeur */ }',
    '.lg[data-tint]       { /* --tint: r g b ; --tint-a: opacité */ }',
    '.lg[data-glow]       { /* --glow: r g b ; lumière diffuse sous l’objet */ }'].join('\n');
  var REACT = [
    "import '@seaglass/css';",
    "import { Glass, Button, Alert, Header } from '@seaglass/react';",
    '',
    '<Glass tint="aqua" frosted rim style={{ padding: 24 }}>',
    '  <h4>Mer calme</h4>',
    '</Glass>',
    '',
    '<Button variant="primary">Seafoam</Button>',
    '<Alert tone="info" title="Info">Rim light follows the pointer.</Alert>',
    '',
    '// Catalogue : packages/react/README.md · Storybook : pnpm storybook',
  ].join('\n');
  function jsonTokens() {
    var o = { color: {}, material: { glassOnGround: 0.74, glassOnScene: 0.26, blur: 14, radius: 28, properties: ['frosted', 'refractive', 'alive', 'rim', 'tint', 'glow'] },
      motion: { fast: '120ms', base: '200ms', soft: '380ms', ease: 'cubic-bezier(0.2,0,0,1)', spring: 'cubic-bezier(0.34,1.4,0.5,1)' }, theme: SG.isDark() ? 'dark' : 'light' };
    SG.PEBBLES.forEach(function (p) { o.color[p.key] = { value: SG.cssVar('--' + p.key), ink: SG.cssVar('--' + p.key + '-ink') }; });
    return JSON.stringify(o, null, 2);
  }
  S.Tokens = function () {
    SG.useTheme();
    var st = useState('CSS'), fmt = st[0], set = st[1];
    return h(D.Section, { id: 'tokens', label: 'Qualité', title: 'Tokens et code', lead: 'Le CSS contient les variables et les attributs du matériau. Le composant Glass s’utilise tel quel dans un projet React, sans Tailwind ni GSAP : tout est natif.' },
      h(D.Panel, { tag: 'Export', cap: 'Copie le bloc avec le bouton en haut à droite.' },
        h(UI.Segmented, { label: 'Format', options: ['CSS', 'React', 'JSON'], onChange: set }),
        h(D.Code, { text: fmt === 'CSS' ? CSS : fmt === 'React' ? REACT : jsonTokens() })));
  };

  /* ---------- Toast et application ---------- */
  function Toast() {
    var st = useState({ msg: '', on: false }), s = st[0], set = st[1], t = useRef(0);
    useEffect(function () {
      function on(e) { set({ msg: e.detail, on: true }); clearTimeout(t.current); t.current = setTimeout(function () { set(function (x) { return { msg: x.msg, on: false }; }); }, 1600); }
      window.addEventListener('sg-toast', on); return function () { window.removeEventListener('sg-toast', on); };
    }, []);
    return h(Glass, { className: 'over toast' + (s.on ? ' on' : ''), role: 'status', 'aria-live': 'polite', tint: 'seafoam', tintA: 0.8 }, s.msg);
  }
  function App() {
    var qs = useState(''), q = qs[0], setQ = qs[1], os = useState(false), open = os[0], setOpen = os[1];
    useEffect(function () {
      function esc(e) { if (e.key === 'Escape') setOpen(false); }
      document.addEventListener('keydown', esc); return function () { document.removeEventListener('keydown', esc); };
    }, []);
    return h(React.Fragment, null,
      h(S.Bar, { q: q, setQ: setQ, open: open, onMenu: function () { setOpen(!open); } }),
      h('div', { className: 'shell', id: 'top' },
        h(S.Side, { q: q, open: open, onClose: function () { setOpen(false); } }),
        h('main', { className: 'main' },
          h(S.Hero), h(S.Matter), h(S.Colors), h(S.Type), h(S.Shape), h(S.Motion),
          h(S.Buttons), h(S.Chips), h(S.Toggle), h(S.Checks), h(S.Slider), h(S.Tabs), h(S.Fields),
          h(S.SelectDoc), h(S.Nav), h(S.ChromeDoc), h(S.Alerts), h(S.AccordionDoc), h(S.OverlaysDoc),
          h(S.Cards), h(S.DataDoc), h(S.Feedback), h(S.PrefsDoc),
          h(S.Contrast), h(S.Tokens),
          h('footer', { className: 'end' }, h('span', null, 'Sea Glass · ' + ((window.SG_META && window.SG_META.version) || '0.1.0-alpha.0')), h('span', null, 'Matière : frosted, refractive, alive, rim, tint, glow · packages .sg-*')))),
      h(Toast));
  }
  ReactDOM.createRoot(document.getElementById('root')).render(h(App));
})();

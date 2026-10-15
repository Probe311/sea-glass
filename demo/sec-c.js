/* Sea Glass v3 · contenu (3/3) : saisie, navigation, contenu, qualité, application */
(function () {
  var SG = window.SG, h = SG.h, Icon = SG.Icon, UI = SG.UI, D = SG.Doc, S = SG.S;
  var useState = React.useState, useEffect = React.useEffect, useRef = React.useRef;

  /* ---------- Champs et recherche ---------- */
  S.Fields = function () {
    var F = UI.Field;
    return h(D.Section, { id: 'champs', label: 'Composants', title: 'Champs et recherche', lead: 'Champ et recherche partagent la même surface verre posée (comme un bouton au repos). Le champ est un rectangle 16 px ; la recherche reste une pilule plus haute, prête à reposer sur une image.' },
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
    return h(D.Section, { id: 'navigation', label: 'Composants', title: 'Navigation', lead: 'La barre est un Givre en pilule. L’entrée active est un galet seafoam sans ombre portée : icône à gauche du libellé, visible seulement sur l’actif.' },
      h(D.Panel, { scene: true, tag: 'Aperçu', cap: 'Quatre destinations au maximum.' }, h(UI.NavBar)),
      h(D.Usage, { dos: ['Quatre entrées au plus.', 'Icône uniquement sur l’item actif, à gauche du libellé.', 'Placer la barre sur une image ou un dégradé.'], donts: ['Cacher les libellés.', 'Empiler icône au-dessus du texte.', 'Ombre portée sur le galet actif.'] }));
  };

  /* ---------- Cartes et badges ---------- */
  S.Cards = function () {
    var Card = UI.Card, B = UI.Badge;
    return h(D.Section, { id: 'cartes', label: 'Composants', title: 'Cartes et badges', lead: 'La carte est un Givre au rayon de 28 px, teintée par la couleur de son contenu. Les badges sont de petites pilules plates teintées avec leur encre.' },
      h(D.Panel, { scene: true, tag: 'Cartes', cap: 'Givre teinté · rayon 28 px · encre du galet.' },
        h('div', { className: 'g2' },
          h(Card, { tint: 'aqua' }, h('span', { className: 'label' }, 'Aujourd’hui'), h('h4', null, 'Mer calme'), h('p', null, 'Vent faible de sud-ouest, houle de 0,6 m. Bonne visibilité sur tout le littoral.'), h('div', { className: 'kv' }, h('span', null, 'Marée haute 17:42'), h('span', null, 'Coef. 78'))),
          h(Card, { tint: 'amber' }, h('span', { className: 'label' }, 'Observation'), h('h4', null, 'Anémone des mares'), h('p', null, 'Repérée à marée basse, accrochée à un bloc de granit.'), h('div', { className: 'stage' }, h(B, { tint: 'seafoam' }, 'Rivage'), h(B, { tint: 'amber' }, 'Rare'))))),
      h(D.Panel, { tag: 'Badges', cap: 'Texte en encre du galet : contraste minimum 4,5:1.' }, h(D.Stage, null, [['seafoam', 'Collecté'], ['cobalt', 'Nouveau'], ['amber', 'Rare'], ['ruby', 'Menacé'], ['kelly', 'Vérifié'], ['mist', 'Brouillon']].map(function (b) { return h(B, { key: b[0], tint: b[0] }, b[1]); }))));
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
      pair('Texte principal sur le sol', '--ink', null, 1, 4.5),
      pair('Texte secondaire sur le sol', '--ink-2', null, 1, 4.5),
      pair('Texte discret sur le sol', '--ink-3', null, 1, 4.5),
      pair('Bouton principal : seafoam à 92 %', '--on-tint', 'seafoam', 0.92, 4.5),
      pair('Badge aqua à 88 %', '--aqua-ink', 'aqua', 0.88, 4.5),
      pair('Badge amber à 88 %', '--amber-ink', 'amber', 0.88, 4.5),
      pair('Badge kelly à 88 %', '--kelly-ink', 'kelly', 0.88, 4.5),
      pair('Badge cobalt à 88 %', '--cobalt-ink', 'cobalt', 0.88, 4.5),
      pair('Nav active : on-tint sur seafoam 92 %', '--on-tint', 'seafoam', 0.92, 3),
      pair('Anneau de focus sur le sol', '--focus', null, 1, 3)];
    var heart = { label: 'Cœur : ruby-ink sur ruby à 100 %', fg: V('--ruby-ink'), bg: hex(blend(rgb(V('--ruby')), ground, 1)) };
    heart.r = ratio(rgb(heart.fg), rgb(heart.bg)); heart.min = 3; rows.push(heart);
    [['Coche : blanc sur le haut du galet #308069', '#308069'], ['Coche : blanc sur le bas du galet #256B5A', '#256B5A']].forEach(function (t) {
      rows.push({ label: t[0], fg: '#ffffff', bg: t[1], r: ratio([255, 255, 255], rgb(t[1])), min: 3 });
    });
    [['Alerte info : ink sur aqua 28 %', '--ink', 'aqua', 0.28, 4.5], ['Alerte error : ink sur ruby 28 %', '--ink', 'ruby', 0.28, 4.5]].forEach(function (t) {
      rows.push(pair(t[0], t[1], t[2], t[3], t[4]));
    });
    (function () {
      var dark = document.documentElement.getAttribute('data-theme') === 'dark'
        || (!document.documentElement.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
      var dlgBg = dark ? blend([18, 28, 26], ground, 0.55) : blend([255, 255, 255], ground, 0.82);
      var dlg = { label: dark ? 'Dialog démo : ink sur teinte 18 28 26 à 55 %' : 'Dialog démo : ink sur blanc à 82 %', fg: V('--ink'), bg: hex(dlgBg), min: 4.5 };
      dlg.r = ratio(rgb(dlg.fg), dlgBg);
      rows.push(dlg);
    })();
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
    '  --ground: #F6F5EE;  --ink: #17262A;  --ink-2: #3E4F52;  --ink-3: #566568;  --focus: #2F55C4;',
    '  --seafoam: #B9E3D6;  --kelly: #4FA877;  --citron: #D8DB9C;  --aqua: #5CC4EC;',
    '  --cornflower: #C3D3F0;  --cobalt: #6B8CE3;  --lavender: #E4DAE8;  --ruby: #E07662;',
    '  --amber: #F7C96B;  --rootbeer: #B5866A;  --clear: #F7F9F7;  --mist: #CDD5D4;',
    '  --on-tint: #14463A;  --teal: #4F9482;  --teal-hi: #7BBFAC;',
    '  --ga: 0.42;          /* verre sur sol uni (glassmorphisme) */',
    '  --ga-scene: 0.08;    /* verre sur décor coloré - décor lisible */',
    '  --lg-blur: 16px;     /* 16 px base, jusqu’à 22 px Fabrication */',
    '  --lg-r: 28px;        /* 8 à 12 contrôles, 16 panneaux, 28 cartes, 999 pilules */',
    '  --ease: cubic-bezier(.2,0,0,1);  --spring: cubic-bezier(.34,1.4,.5,1);', '}',
    '/* sombre : --ground #0B1513, --ink #E8F1EE, --ga .10, --ga-scene .10, --teal #7BBFAC */', '',
    '/* Attributs matière (.sg-glass) - frost toujours sur .sg-scene (isolation: auto) */',
    '.sg-scene .sg-glass, .sg-glass.sg-glass--over { backdrop-filter: blur(16px) saturate(1.75); }',
    '.sg-refract .sg-scene .sg-glass[data-refractive] { backdrop-filter: blur(9px) url(#sg-refract) saturate(1.75); } /* Chromium */',
    '.sg-glass[data-alive]      { /* reflet pointeur (--mx, --my), ressort au survol */ }',
    '.sg-glass[data-rim]        { /* bordure / liseré d’arête */ }',
    '.sg-glass[data-tint]       { /* --tint + encre *-ink via currentColor */ }',
    '.sg-glass[data-glow]       { /* halo teinté optionnel - pas l’ombre table */ }'].join('\n');
  var REACT = [
    "import '@sea-glass/css';",
    "import { Glass, Button, Alert, Header } from '@sea-glass/react';",
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
    var o = { color: {}, material: { glassOnGround: 0.42, glassOnScene: 0.08, blur: 16, tintA: 0.28, sparkle: 0.08, radius: 28, shadowCast: true, shadowGlow: true, properties: ['frosted', 'refractive', 'alive', 'rim', 'tint', 'glow'] },
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

  /* ---------- Toast (alerte haut centre + blur) et application ---------- */
  function Toast() {
    var st = useState({ msg: '', on: false }), s = st[0], set = st[1], t = useRef(0);
    useEffect(function () {
      function on(e) {
        set({ msg: e.detail, on: true });
        clearTimeout(t.current);
        t.current = setTimeout(function () { set(function (x) { return { msg: x.msg, on: false }; }); }, 2200);
      }
      window.addEventListener('sg-toast', on);
      return function () { window.removeEventListener('sg-toast', on); };
    }, []);
    return h(React.Fragment, null,
      h('div', {
        className: 'sg-toast-scrim' + (s.on ? ' sg-toast-scrim--open' : ''),
        'data-open': s.on || undefined,
        'aria-hidden': true,
      }),
      h('div', {
        className: 'sg-toast-host' + (s.on ? ' sg-toast-host--open' : ''),
        'data-open': s.on || undefined,
        role: 'status',
        'aria-live': 'polite',
      },
        h('div', {
          className: 'sg-alert sg-glass sg-toast' + (s.on ? ' sg-toast--open' : ''),
          'data-open': s.on || undefined,
          role: 'alert',
          'data-tone': 'success',
          'data-frosted': true,
          'data-rim': true,
          'data-refractive': true,
          'data-tint': true,
        },
          h('span', { className: 'sg-alert__icon', 'aria-hidden': true }, h(Icon, { name: 'success', size: 22 })),
          h('div', null, h('p', { className: 'sg-alert__title' }, s.msg || ' ')))));
  }
  function App() {
    var qs = useState(''), q = qs[0], setQ = qs[1], os = useState(false), open = os[0], setOpen = os[1];
    useEffect(function () {
      function esc(e) { if (e.key === 'Escape') setOpen(false); }
      document.addEventListener('keydown', esc); return function () { document.removeEventListener('keydown', esc); };
    }, []);
    var ver = (window.SG_META && window.SG_META.version) || '0.2.1';
    var main = h('main', { className: 'main' },
      h(S.Hero), h(S.Fabrication), h(S.Colors), h(S.Type), h(S.Shape), h(S.Motion), h(S.Icons),
      h(S.AccordionDoc), h(S.Alerts), h(S.Buttons), h(S.Cards), h(S.Checks), h(S.Fields),
      h(S.ChromeDoc), h(S.Slider), h(S.DataDoc), h(S.Toggle), h(S.Bullets), h(S.OverlaysDoc),
      h(S.Nav), h(S.Tabs), h(S.PrefsDoc), h(S.Chips), h(S.SelectDoc),
      h(S.Contrast), h(S.Tokens),
      h('footer', { className: 'end' },
        h('span', null, 'Sea Glass · ' + ver),
        h('span', null, 'Matière : bordure, teinte, réfraction, givre, lueur, encre · packages .sg-*')));
    var shell = h('div', { className: 'shell', id: 'top' },
      h(S.Side, { q: q, open: open, onClose: function () { setOpen(false); } }),
      main);
    return h(React.Fragment, null,
      h(S.Bar, { q: q, setQ: setQ, open: open, onMenu: function () { setOpen(!open); } }),
      shell,
      h(Toast));
  }
  ReactDOM.createRoot(document.getElementById('root')).render(h(App));
})();

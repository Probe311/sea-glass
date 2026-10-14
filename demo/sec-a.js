/* Sea Glass v3 · contenu (1/3) : navigation, en-tête, fondations */
(function () {
  var SG = window.SG, h = SG.h, Glass = SG.Glass, Icon = SG.Icon, UI = SG.UI, D = SG.Doc;
  var useState = React.useState, useEffect = React.useEffect;
  var S = (SG.S = {});

  /* ---------- Navigation latérale avec suivi de lecture ---------- */
  var NAV = [
    ['Principes', [['fabrication', 'Fabrication']]],
    ['Fondations', [['couleurs', 'Couleurs'], ['typo', 'Typographie'], ['forme', 'Forme et espace'], ['mouvement', 'Mouvement'], ['icones', 'Icônes']]],
    ['Composants', [
      ['boutons', 'Boutons'], ['puces', 'Puces'], ['interrupteur', 'Interrupteur'], ['cases', 'Cases et radios'],
      ['curseur', 'Curseur et progression'], ['onglets', 'Onglets'], ['champs', 'Champs et recherche'],
      ['listes', 'Listes déroulantes'], ['navigation', 'Navigation'], ['chrome', 'En-tête, pied et navigation'],
      ['alertes', 'Alertes et toasts'], ['accordeon', 'Accordéon'], ['overlays', 'Modale'],
      ['cartes', 'Cartes et badges'], ['donnees', 'Données et contenu'],
      ['prefs', 'Préférences'],
    ]],
    ['Qualité', [['contraste', 'Contraste mesuré'], ['tokens', 'Tokens et code']]]
  ];
  function norm(t) { return String(t).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); }
  function useSpy() {
    var st = useState('fabrication'), cur = st[0], set = st[1];
    useEffect(function () {
      var els = Array.prototype.slice.call(document.querySelectorAll('[data-spy]'));
      if (!window.IntersectionObserver) return;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) set(e.target.getAttribute('data-spy')); });
      }, { rootMargin: '-20% 0px -70% 0px' });
      els.forEach(function (el) { io.observe(el); });
      return function () { io.disconnect(); };
    }, []);
    return cur;
  }
  function matches(q) {
    var n = norm(q.trim());
    return NAV.map(function (g) { return [g[0], g[1].filter(function (l) { return !n || norm(l[1]).indexOf(n) > -1 || norm(g[0]).indexOf(n) > -1; })]; }).filter(function (g) { return g[1].length; });
  }
  /* Barre d'application : menu, marque, recherche dans le sommaire, thème */
  S.Bar = function (p) {
    SG.useTheme();
    function go(e) {
      if (e.key === 'Enter') { var m = matches(p.q); if (m.length) { location.hash = '#' + m[0][1][0][0]; p.setQ(''); e.currentTarget.blur(); } }
      if (e.key === 'Escape') p.setQ('');
    }
    return h('header', { className: 'appbar' },
      h('button', { type: 'button', className: 'ib menu-btn', 'aria-label': 'Ouvrir le menu', 'aria-expanded': p.open, onClick: p.onMenu }, h(Icon, { name: 'menu' })),
      h('a', { className: 'brand', href: '#top' },
        h('img', { className: 'brand-logo', src: SG.isDark() ? 'logo-light.svg' : 'logo.svg', alt: 'Sea Glass.', width: 148, height: 31 })),
      h('label', { className: 'gsearch' }, h(Icon, { name: 'search' }),
        h('input', { type: 'search', placeholder: 'Rechercher', 'aria-label': 'Rechercher dans le sommaire', value: p.q, onChange: function (e) { p.setQ(e.target.value); }, onKeyDown: go })),
      h('button', {
        type: 'button',
        className: 'theme-toggle ib-only',
        onClick: SG.toggleTheme,
        'aria-label': 'Changer le thème',
        title: 'Changer le thème',
        'aria-pressed': SG.isDark(),
      }, h(Icon, { name: SG.isDark() ? 'moon' : 'sun' })));
  };
  /* Tiroir de navigation : permanent sur grand écran, modal sur mobile */
  S.Side = function (p) {
    var cur = useSpy(), groups = matches(p.q), ref = React.useRef(null);
    useEffect(function () { if (p.open && ref.current) ref.current.scrollTop = 0; }, [p.open]);
    return h(React.Fragment, null,
      h('div', { className: 'scrim' + (p.open ? ' on' : ''), onClick: p.onClose, 'aria-hidden': true }),
      h('aside', { ref: ref, className: 'side' + (p.open ? ' open' : ''), 'aria-label': 'Navigation' },
        h('nav', { 'aria-label': 'Sommaire' },
          groups.length ? groups.map(function (g) {
            return h('div', { className: 'grp', key: g[0] }, h('span', { className: 'gl' }, g[0]),
              g[1].map(function (l) { return h('a', { key: l[0], href: '#' + l[0], onClick: p.onClose, 'aria-current': cur === l[0] ? 'true' : undefined }, l[1]); }));
          }) : h('p', { className: 'none' }, 'Aucun résultat pour « ' + p.q + ' ».')),
        h('div', { className: 'foot' }, (window.SG_META && window.SG_META.line) || '0.1.0-alpha.0 · React 19.3.0')));
  };

  S.Hero = function () {
    SG.useTheme();
    return h('header', { className: 'doc-hero' },
      h('span', { className: 'label' }, 'Design system · ' + ((window.SG_META && window.SG_META.version) || '0.1.0-alpha.0')),
      h('h1', null,
        h('img', { className: 'hero-logo', src: SG.isDark() ? 'logo-light.svg' : 'logo.svg', alt: 'Sea Glass.' })),
      h('p', { className: 'lead' }, 'Un système d’interface en verre de mer : des galets mats et laiteux, éclairés par une seule lumière venue du haut à gauche. Six propriétés de matière, un modèle de lumière, douze couleurs et une cinquantaine d’adaptateurs React dans @sea-glass/react (cette démo reste le prototype visuel).'),
      h('div', { className: 'hero-pebbles', 'aria-hidden': true }, SG.PEBBLES.map(function (p) { return h(SG.Pebble, { key: p.key, name: p.name, color: p.key, seed: p.seed }); })),
      h('div', { className: 'meta' },
        [['6', 'propriétés de matière'], ['12', 'couleurs'], ['~50', 'composants React'], ['2', 'thèmes']].map(function (m) { return h('div', { key: m[1] }, h('b', null, m[0]), h('span', null, m[1])); })));
  };

  /* ---------- Fabrication ---------- */
  var FAB_LAYERS = [
    { k: 'rim', t: 'Liseré', role: 'data-rim', note: 'Liseré d’arête, clair côté lumière, teinté à l’opposé.' },
    { k: 'tint', t: 'Teinte', role: 'tint + gelée 135°', note: 'Plein du galet : clair TL → saturé BR + encre *-ink.' },
    { k: 'refractive', t: 'Réfraction', role: 'data-refractive', note: 'Déformation du décor dans l’épaisseur (Chromium).' },
    { k: 'frosted', t: 'Dépoli', role: 'data-frosted', note: 'blur(16px) saturate(1.4) — seulement sur scène.' },
    { k: 'glow', t: 'Éclat', role: 'data-glow', note: 'Halo teinté optionnel — pas l’ombre table par défaut.' },
    { k: 'sparkle', t: 'Scintillement', role: 'grain / --sparkle', note: 'Tuile noise.svg en overlay (~8 % clair).' },
  ];
  var FAB_BLOB = '58% 42% 48% 52% / 48% 52% 46% 54%';

  function FabricateDemo() {
    var stepSt = useState(0), step = stepSt[0], setStep = stepSt[1];
    var rootRef = React.useRef(null);
    var reduce = typeof window !== 'undefined' && window.matchMedia
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    useEffect(function () {
      if (reduce) { setStep(FAB_LAYERS.length); return; }
      var el = rootRef.current;
      if (!el || !window.IntersectionObserver) return;
      var timer = null, active = false;

      function clear() { if (timer) { clearTimeout(timer); timer = null; } }
      function tick(n) {
        clear();
        setStep(n);
        if (n < FAB_LAYERS.length) {
          timer = setTimeout(function () { tick(n + 1); }, 1100);
        } else {
          timer = setTimeout(function () { tick(0); }, 1600);
        }
      }
      function start() { if (!active) { active = true; tick(0); } }
      function stop() { active = false; clear(); setStep(0); }

      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) start(); else stop(); });
      }, { threshold: 0.35 });
      io.observe(el);
      return function () { io.disconnect(); stop(); };
    }, [reduce]);

    var on = {
      rim: step >= 1,
      tint: step >= 2,
      refractive: step >= 3,
      frosted: step >= 4,
      glow: step >= 5,
      sparkle: step >= 6,
    };

    return h('div', { className: 'fab', ref: rootRef },
      h('div', { className: 'fab-stage scene sg-scene', 'aria-hidden': true },
        h('div', { className: 'fab-grid' }),
        h(Glass, {
          className: 'fab-pebble'
            + (step === 0 ? ' fab-pebble--naked' : '')
            + (on.sparkle ? '' : ' fab-pebble--no-sparkle'),
          frosted: on.frosted,
          refractive: on.refractive,
          rim: on.rim,
          glow: on.glow,
          alive: false,
          tint: on.tint ? 'seafoam' : undefined,
          tintA: on.tint ? 0.72 : undefined,
          style: Object.assign(
            { '--lg-r': FAB_BLOB },
            on.sparkle ? {} : { '--sparkle': 0 },
            on.tint ? {} : { '--glass-a': 0.14 }
          ),
        })),
      h('ol', { className: 'fab-list', 'aria-label': 'Couches de matière' },
        FAB_LAYERS.map(function (layer, i) {
          var active = step > i;
          return h('li', {
            key: layer.k,
            className: 'fab-item' + (active ? ' is-on' : ''),
            'aria-current': active ? 'true' : undefined,
          },
            h('span', { className: 'fab-dot', 'aria-hidden': true }),
            h('span', { className: 'fab-label' }, layer.t));
        })));
  }

  S.Fabrication = function () {
    return h(D.Section, {
      id: 'fabrication',
      label: 'Principes',
      title: 'Fabrication',
      lead: 'Sea Glass est un verre de mer dépoli : chaque surface d’interface est un même matériau assemblé couche par couche. On part d’une forme nue, puis on empile liseré, teinte, réfraction, dépoli, éclat et scintillement jusqu’à la gelée posée sur la table.',
    },
      h(D.Panel, { tag: 'Assemblage', cap: 'Une couche à la fois — boucle automatique.' },
        h(FabricateDemo)),
      h(D.Specs, { head: ['Couche', 'Attribut / token', 'Rôle'], rows: FAB_LAYERS.map(function (l) {
        return [l.t, l.role, l.note];
      }).concat([
        ['Ombre table', 'elevation-3 neutre', 'Posé sur la table — pas de halo teinté par défaut.'],
        ['Alpha sol', '~0.88 clair · 0.08 sombre', 'Objets posés hors scène.'],
        ['Alpha scène', '~0.26 / 0.12', 'Verre au-dessus d’un décor coloré.'],
      ]) }),
      h(D.Usage, {
        dos: [
          'Garder l’ombre table neutre pour les objets posés.',
          'Lier texte et icônes à l’encre du tint (currentColor).',
          'Réserver data-glow aux accents rares.',
          'Prévoir un décor coloré derrière le dépoli.',
        ],
        donts: [
          'Remplacer l’ombre table par un halo teinté sur chaque bouton.',
          'Forcer une couleur d’icône qui ignore le parent teinté.',
          'Mélanger un éclat d’une couleur et une teinte d’une autre.',
          'Utiliser un verre très transparent sur un fond uni : il disparaît.',
        ],
      }));
  };

  /* ---------- Couleurs ---------- */
  S.Colors = function () {
    SG.useTheme();
    return h(D.Section, { id: 'couleurs', label: 'Fondations', title: 'Couleurs', lead: 'Pastels à basse saturation, un peu laiteux, avec quelques tons pleins pour les repères. Chaque forme est un galet arrondi, sans angle. Clique sur un galet pour copier sa variable.' },
      h(D.Panel, { tag: 'Palette', cap: 'Valeurs du thème clair. Les encres se renforcent en thème sombre.' },
        h('div', { className: 'pebbles-wrap' }, h('div', { className: 'pebbles' }, SG.PEBBLES.map(function (p) {
          var hex = SG.cssVar('--' + p.key).toUpperCase();
          return h('button', { key: p.key, type: 'button', className: 'pebble-item', 'aria-label': 'Copier ' + p.name + ' ' + hex, onClick: function () { SG.copy('--' + p.key + ': ' + hex + ';', p.name + ' copié'); } },
            h(SG.Pebble, { name: p.name, color: p.key, seed: p.seed }), h('span', { className: 'nm' }, p.name), h('span', { className: 'hx' }, hex));
        })))),
      h(D.Specs, { head: ['Rôle', 'Couleurs', 'Usage'], rows: [
        ['Action', 'Seafoam, Kelly', 'Bouton principal, puces et sélecteurs actifs, coches.'],
        ['Information', 'Aqua, Cornflower, Cobalt', 'Liens, focus, statuts neutres.'],
        ['Attention', 'Citron, Amber', 'Avertissements, éléments rares.'],
        ['Favori et erreur', 'Ruby', 'Bouton cœur, champ en erreur.'],
        ['Neutres', 'Clear, Mist, Lavender, Root beer', 'Surfaces, séparateurs, accents doux.']] }));
  };

  /* ---------- Typographie ---------- */
  S.Type = function () {
    var rows = [
      ['Affichage', { fontFamily: 'var(--font-display)', fontSize: 32, lineHeight: '40px', fontWeight: 700 }, 'Marée haute à 17:42', '32 / 40 · 700'],
      ['Titre', { fontFamily: 'var(--font-display)', fontSize: 24, lineHeight: '32px', fontWeight: 600 }, 'Les galets de la crique', '24 / 32 · 600'],
      ['Sous-titre', { fontFamily: 'var(--font-display)', fontSize: 20, lineHeight: '28px', fontWeight: 500 }, 'Collection de l’estran', '20 / 28 · 500'],
      ['Corps large', { fontSize: 16, lineHeight: '24px' }, 'Le verre de mer se forme quand les vagues usent des éclats jusqu’à les rendre mats.', '16 / 24 · 400'],
      ['Corps', { fontSize: 14, lineHeight: '20px' }, 'Houle de 0,6 m, vent faible de sud-ouest, bonne visibilité.', '14 / 20 · 400'],
      ['Libellé', { fontSize: 12, lineHeight: '16px', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase' }, 'Coefficient de marée', '12 / 16 · 500 · capitales']];
    return h(D.Section, { id: 'typo', label: 'Fondations', title: 'Typographie', lead: 'Poppins Bold pour les titres, le wordmark et les contrôles (géométrique arrondie, a mono-étage). Roboto pour le texte, Roboto Mono pour les valeurs. Les interlignes de 1,3 à 1,5 compensent la translucidité.' },
      h(D.Panel, { tag: 'Familles', cap: 'Poppins pour les titres · Roboto pour le corps · Roboto Mono pour les valeurs.' },
        h('div', { className: 'g3' }, [['Poppins', 'var(--font-display)', 'Titres, boutons, onglets, logo'], ['Roboto', 'var(--font-body)', 'Texte, champs, légendes'], ['Roboto Mono', 'var(--font-mono)', 'Valeurs, tokens, code']].map(function (f) {
          return h('div', { className: 'type-card', key: f[0] },
            h('span', { className: 'type-card__aa', style: { fontFamily: f[1] } }, 'Aa'),
            h('b', { className: 'type-card__name' }, f[0]),
            h('span', { className: 'type-card__role' }, f[2]));
        }))),
      h(D.Specs, { head: ['Style', 'Aperçu', 'Taille / interligne · graisse'], rows: rows.map(function (r) { return [r[0], h('span', { style: Object.assign({ fontFamily: 'var(--font-body)', display: 'block', color: 'var(--ink)' }, r[1]) }, r[2]), r[3]]; }) }));
  };

  /* ---------- Forme et espace ---------- */
  S.Shape = function () {
    var radii = [['xs', 8, 'Petits éléments'], ['md', 12, 'Puces rectangulaires, info-bulles'], ['lg', 16, 'Champs, panneaux'], ['xl', 28, 'Cartes'], ['pill', 999, 'Boutons, onglets, interrupteur']];
    var sp = [4, 8, 12, 16, 24, 32, 48, 72];
    return h(D.Section, { id: 'forme', label: 'Fondations', title: 'Forme et espace', lead: 'Grille de 4 px, paddings en multiples de 8. Aucun angle vif : les contrôles sont des pilules, des rectangles très arrondis ou des cercles.' },
      h(D.Panel, { scene: true, tag: 'Rayons', cap: 'Un rayon par rôle, jamais de coin droit.' },
        h('div', { style: { display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', alignItems: 'start' } }, radii.map(function (r) {
          return h('div', { key: r[0], style: { display: 'grid', gap: 6, fontSize: 13, color: '#fff', textShadow: '0 1px 6px rgba(0,30,26,.55)', alignContent: 'start' } }, h(Glass, { style: { height: 96, '--lg-r': r[1] + 'px', '--gl': '16px' }, tint: 'seafoam', tintA: 0.4, refractive: false }), h('b', { style: { fontWeight: 500 } }, r[0] + ' · ' + (r[1] === 999 ? 'pilule' : r[1] + ' px')), h('span', null, r[2]));
        }))),
      h(D.Sub, { title: 'Espacement' }, h(D.Specs, { head: ['Token', 'Valeur', 'Échelle'], rows: sp.map(function (s, i) { return ['--s' + (i + 1), s + ' px', h('i', { style: { display: 'block', height: 12, width: s * 2, borderRadius: 6, background: 'var(--seafoam)', boxShadow: 'inset 0 1px 1px rgba(255,255,255,.8)' } })]; }) })));
  };

  /* ---------- Mouvement ---------- */
  S.Motion = function () {
    var st = useState(false), go = st[0], setGo = st[1];
    var items = [['Rapide', '120 ms', 'Appui, case cochée, reflet', 120], ['Base', '200 ms', 'Survol, ombres, halo', 200], ['Souple', '380 ms', 'Interrupteur, onglets, curseur', 380]];
    useEffect(function () {
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      var tOut, tIn;
      function cycle() {
        setGo(false);
        tIn = setTimeout(function () {
          setGo(true);
          tOut = setTimeout(cycle, 1800);
        }, 80);
      }
      cycle();
      return function () { clearTimeout(tIn); clearTimeout(tOut); };
    }, []);
    return h(D.Section, { id: 'mouvement', label: 'Fondations', title: 'Mouvement', lead: 'Une courbe fluide pour tout, plus un ressort léger pour ce qui se pose : poignée d’interrupteur, galet d’onglet, rebond de survol. Aucun clignotement. Tout se calme avec prefers-reduced-motion.' },
      h(D.Panel, { tag: 'Durées', cap: 'cubic-bezier(0.2, 0, 0, 1) · ressort cubic-bezier(0.34, 1.4, 0.5, 1)' },
        h('div', { className: 'g3' }, items.map(function (m) {
          return h(Glass, { key: m[0], className: 'mo' + (go ? ' go' : ''), style: { '--d': m[3] + 'ms' }, alive: false },
            h('b', { style: { fontWeight: 500 } }, m[0] + ' · ' + m[1]), h('span', { style: { fontSize: 12, color: 'var(--ink-3)' } }, m[2]),
            h(Glass, { className: 'track', refractive: false, alive: false, glow: false }, h('span', { className: 'ball' })));
        }))));
  };

  /* ---------- Icônes Jelly ---------- */
  S.Icons = function () {
    var catalog = window.SG_ICON_CATALOG || [];
    var aliases = window.SG_ICON_ALIAS || {};
    var qs = useState(''), q = qs[0], setQ = qs[1];
    var nq = q.trim().toLowerCase();
    var filtered = !nq ? catalog : catalog.filter(function (name) { return name.indexOf(nq) > -1; });
    var aliasRows = Object.keys(aliases).map(function (k) { return [k, aliases[k]]; });
    function copyName(name) {
      SG.copy(name, '« ' + name + ' » copié');
    }
    return h(D.Section, { id: 'icones', label: 'Fondations', title: 'Icônes Jelly', lead: 'Font Awesome jelly-regular complet (' + catalog.length + '), factorisé dans demo/icons/jelly. Sprite externe icons/sprite.svg · aliases courts pour la démo (search → magnifying-glass). Clique une tuile pour copier le nom FA.' },
      h(D.Panel, { tag: 'Catalogue', cap: filtered.length + ' / ' + catalog.length + ' · viewBox 560 · currentColor' },
        h('label', { className: 'icon-filter' },
          h(Icon, { name: 'search', size: 18 }),
          h('input', {
            type: 'search',
            value: q,
            placeholder: 'Filtrer (ex. circle, house…)',
            'aria-label': 'Filtrer les icônes',
            onChange: function (e) { setQ(e.target.value); },
          })),
        h('div', { className: 'icon-grid icon-grid--dense' }, filtered.map(function (name) {
          return h('button', {
            key: name, type: 'button', className: 'icon-tile',
            onClick: function () { copyName(name); },
            'aria-label': 'Copier ' + name,
            title: name,
          },
            h('span', { className: 'icon-tile__glyph', 'aria-hidden': true }, h(Icon, { name: name, size: 26 })),
            h('span', { className: 'icon-tile__name mono' }, name));
        }))),
      aliasRows.length ? h(D.Panel, { tag: 'Alias démo', cap: 'Raccourcis SG.Icon → nom FA' },
        h('div', { className: 'icon-grid' }, aliasRows.map(function (it) {
          return h('button', {
            key: it[0], type: 'button', className: 'icon-tile',
            onClick: function () { copyName(it[0]); },
            'aria-label': 'Copier ' + it[0],
          },
            h('span', { className: 'icon-tile__glyph', 'aria-hidden': true }, h(Icon, { name: it[0], size: 26 })),
            h('span', { className: 'icon-tile__name mono' }, it[0]),
            h('span', { className: 'icon-tile__src' }, it[1]));
        }))) : null,
      h(D.Sub, { title: 'Utilisation' },
        h(D.Code, { text: [
          '/* Démo — alias ou nom FA */',
          'h(Icon, { name: \'search\', size: 20 })',
          'h(Icon, { name: \'magnifying-glass\', size: 20 })',
          '',
          '/* Sprite externe */',
          '<svg class="ico" width="20" height="20" aria-hidden="true">',
          '  <use href="icons/sprite.svg#i-magnifying-glass"></use>',
          '</svg>',
          '',
          '/* Fichier isolé */',
          '<img src="icons/jelly/magnifying-glass.svg" alt="" width="20" height="20" />',
          '',
          'pnpm icons:jelly',
        ].join('\n') })),
      h(D.Specs, { head: ['Propriété', 'Valeur', 'Note'], rows: [
        ['API', 'SG.Icon { name, size }', 'alias ou nom FA'],
        ['Sprite', 'icons/sprite.svg#i-{fa}', catalog.length + ' symboles'],
        ['Fichiers', 'demo/icons/jelly/{fa}.svg', '365 jelly-regular'],
        ['Source', 'FA jelly-regular', 'pnpm icons:jelly · SG_JELLY_DIR'],
        ['Couleur', 'currentColor / fill', 'Hérite de color CSS'],
      ] }));
  };
})();

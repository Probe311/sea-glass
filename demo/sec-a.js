/* Sea Glass v3 · contenu (1/3) : navigation, en-tête, fondations */
(function () {
  var SG = window.SG, h = SG.h, Glass = SG.Glass, Icon = SG.Icon, UI = SG.UI, D = SG.Doc;
  var useState = React.useState, useEffect = React.useEffect;
  var S = (SG.S = {});

  /* ---------- Navigation latérale avec suivi de lecture ---------- */
  var NAV = [
    ['Principes', [['matiere', 'Matière']]],
    ['Fondations', [['couleurs', 'Couleurs'], ['typo', 'Typographie'], ['forme', 'Forme et espace'], ['mouvement', 'Mouvement']]],
    ['Composants', [
      ['boutons', 'Boutons'], ['puces', 'Puces'], ['interrupteur', 'Interrupteur'], ['cases', 'Cases et radios'],
      ['curseur', 'Curseur et progression'], ['onglets', 'Onglets'], ['champs', 'Champs et recherche'],
      ['listes', 'Listes déroulantes'], ['navigation', 'Navigation'], ['chrome', 'En-tête et pied'],
      ['alertes', 'Alertes et bandeaux'], ['accordeon', 'Accordéon'], ['overlays', 'Modale et menu'],
      ['cartes', 'Cartes et badges'], ['donnees', 'Données et contenu'], ['retours', 'Retours'],
      ['prefs', 'Préférences'], ['packages', 'Catalogue packages'],
    ]],
    ['Qualité', [['contraste', 'Contraste'], ['tokens', 'Tokens et code']]]
  ];
  function norm(t) { return String(t).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); }
  function useSpy() {
    var st = useState('matiere'), cur = st[0], set = st[1];
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
      h('button', { type: 'button', className: 'ib', onClick: SG.toggleTheme, 'aria-label': SG.isDark() ? 'Passer en thème clair' : 'Passer en thème sombre', title: SG.isDark() ? 'Thème clair' : 'Thème sombre' }, h(Icon, { name: SG.isDark() ? 'sun' : 'moon' })));
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
      h('p', { className: 'lead' }, 'Un système d’interface en verre de mer : des galets mats et laiteux, éclairés par une seule lumière venue du haut à gauche. Six propriétés de matière, un modèle de lumière, douze couleurs et une cinquantaine d’adaptateurs React dans @seaglass/react (cette démo reste le prototype visuel).'),
      h('div', { className: 'hero-pebbles', 'aria-hidden': true }, SG.PEBBLES.map(function (p) { return h(SG.Pebble, { key: p.key, name: p.name, color: p.key, seed: p.seed }); })),
      h('div', { className: 'meta' },
        [['6', 'propriétés de matière'], ['12', 'couleurs'], ['~50', 'composants React'], ['2', 'thèmes']].map(function (m) { return h('div', { key: m[1] }, h('b', null, m[0]), h('span', null, m[1])); })));
  };

  /* ---------- Matière ---------- */
  var PROPS = [
    { k: 'frosted', t: 'Frosted', d: 'Verre dépoli : le décor est flouté et un peu plus saturé derrière la matière.', o: {} },
    { k: 'refractive', t: 'Refractive', d: 'Le décor se déforme dans l’épaisseur du verre. Visible dans Chromium, sans effet ailleurs.', o: { frosted: false } },
    { k: 'alive', t: 'Alive', d: 'Le reflet suit le pointeur. La matière grossit au survol (scale 1.05) et s’enfonce à l’appui.', o: {} },
    { k: 'rim', t: 'Rim', d: 'Liseré d’arête, vif côté lumière et repris côté opposé dans la couleur du verre.', o: {} },
    { k: 'tint', t: 'Tint', d: 'La matière prend la couleur d’un galet, de façon mate et translucide.', o: { tint: 'aqua', tintA: 0.55 } },
    { k: 'glow', t: 'Glow', d: 'Lumière diffuse sous l’objet, toujours de la couleur de sa teinte.', o: { glowColor: 'kelly' } }
  ];
  var ALL = PROPS.map(function (p) { return p.k; });
  function PropCard(p) {
    var only = {}; ALL.forEach(function (k) { only[k] = false; }); only[p.k] = true;
    var props = Object.assign({ className: 'pc', style: { padding: 20, minHeight: 168, display: 'grid', gap: 6, alignContent: 'start', '--lg-r': '24px', '--gl': '20px' } }, only, p.o);
    return h(Glass, props, h('span', { className: 'mono', style: { fontSize: 11, letterSpacing: '.06em', opacity: .7 } }, 'data-' + p.k), h('b', { style: { font: '600 18px var(--font-display)' } }, p.t), h('span', { style: { fontSize: 13, lineHeight: 1.45, opacity: .9 } }, p.d));
  }
  var TINTS = ['clear', 'aqua', 'seafoam', 'lavender', 'amber', 'ruby'];
  function Atelier() {
    var st = useState({ frosted: true, refractive: true, alive: true, rim: true, tint: true, glow: true }), on = st[0], setOn = st[1];
    var ts = useState('aqua'), tint = ts[0], setTint = ts[1], bs = useState(12), blur = bs[0], setBlur = bs[1];
    var lines = ['<Glass'].concat(on.tint ? ['  tint="' + tint + '"'] : []).concat(ALL.filter(function (k) { return k !== 'tint'; }).map(function (k) { return on[k] ? '  ' + k : '  ' + k + '={false}'; })).concat(['  style={{ "--lg-blur": "' + blur + 'px" }}', '/>']);
    var code = lines.join('\n');
    return h(D.Panel, { scene: true, tag: 'Atelier', cap: 'Active ou coupe chaque propriété. Le code se met à jour.' },
      h('div', { style: { display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', alignItems: 'start' } },
        h('div', { style: { display: 'grid', placeItems: 'center', padding: '12px 0' } },
          h(Glass, { tint: on.tint ? tint : undefined, tintA: 0.4, frosted: on.frosted, refractive: on.refractive, alive: on.alive, rim: on.rim, glow: on.glow,
            style: { padding: 26, width: 'min(100%, 320px)', display: 'grid', gap: 8, '--lg-r': '28px', '--gl': '24px', '--lg-blur': blur + 'px' } },
            h('span', { className: 'label', style: { color: 'inherit', opacity: .75 } }, 'Mer calme'),
            h('div', { style: { font: '600 46px/1 var(--font-display)' } }, '18 °C'),
            h('p', { style: { fontSize: 14 } }, 'Vent faible de sud-ouest, houle de 0,6 m.'),
            h('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: 13, paddingTop: 10, borderTop: '1px solid color-mix(in srgb, currentColor 18%, transparent)' } }, h('span', null, 'Marée haute 17:42'), h('span', null, 'Coef. 78')))),
        h('div', { style: { display: 'grid', gap: 10 } },
          ALL.map(function (k) {
            var info = PROPS.filter(function (p) { return p.k === k; })[0];
            return h(Glass, { key: k, style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '8px 8px 8px 16px', '--lg-r': '18px', '--gl': '10px' }, refractive: false, glow: false, alive: false },
              h('b', { style: { fontWeight: 500, fontSize: 15 } }, info.t), h(UI.Toggle, { checked: on[k], onChange: function (v) { var n = Object.assign({}, on); n[k] = v; setOn(n); }, 'aria-label': info.t }));
          }),
          h('div', { className: 'stage', role: 'group', 'aria-label': 'Teinte' }, TINTS.map(function (k) {
            return h('button', { key: k, type: 'button', 'aria-label': k, 'aria-pressed': tint === k, onClick: function () { setTint(k); setOn(Object.assign({}, on, { tint: true })); },
              style: { width: 34, height: 34, borderRadius: '50%', border: '2px solid rgba(255,255,255,.85)', background: 'var(--' + k + ')', cursor: 'pointer', boxShadow: tint === k ? '0 0 0 2px #fff, 0 0 0 4px #10302A' : '0 2px 6px rgba(0,0,0,.2)' } });
          })),
          h(UI.Slider, { label: 'Flou', value: 12, min: 0, max: 28, unit: ' px', onChange: setBlur }))),
      h(D.Code, { text: code }));
  }

  S.Matter = function () {
    return h(D.Section, { id: 'matiere', label: 'Principes', title: 'Une matière, six propriétés', lead: 'Tout bloc ou élément de l’interface est un Glass. Le même composant produit un bouton, une carte ou une barre de navigation : seules les propriétés et le rayon changent. La lumière vient toujours du haut à gauche. Elle ressort teintée sur l’arête opposée, et s’inverse dans les parties creusées.' },
      h(D.Sub, { title: 'Les six propriétés', text: 'Chaque propriété est un attribut indépendant. Les montrer isolées permet de voir ce qu’elle apporte.' },
        h(D.Panel, { scene: true, tag: 'Isolées', cap: 'Les contrôles de petite taille coupent refractive pour rester légers.' },
          h('div', { style: { display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 230px), 1fr))' } }, PROPS.map(function (p) { return h(PropCard, Object.assign({ key: p.k }, p)); })))),
      h(D.Sub, { title: 'Atelier' }, h(Atelier)),
      h(D.Sub, { title: 'Modèle de lumière', text: 'La lumière vient du haut à gauche. Un objet posé la reçoit sur son arête haute et la laisse ressortir, teintée par le verre, sur l’arête opposée : c’est la caustique. Un objet creusé inverse tout : l’ombre tombe en haut à gauche et la lumière remonte en bas à droite.' },
        h(D.Panel, { scene: true, tag: 'Aperçu', cap: 'Survole les objets : le reflet et l’angle du liseré suivent le pointeur, la caustique reste à l’opposé.' },
          h('div', { style: { display: 'grid', gap: 22, gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))' } },
            [['Posé', {}], ['Teinté aqua', { tint: 'aqua', tintA: 0.45 }], ['Teinté ruby', { tint: 'ruby', tintA: 0.5 }], ['Creusé', { className: 'carved', frosted: false, refractive: false, glow: false, alive: false }]].map(function (o) {
              return h('div', { key: o[0], style: { display: 'grid', gap: 10, justifyItems: 'center', fontSize: 13, color: 'var(--ink)' } },
                h(Glass, Object.assign({ style: { width: '100%', maxWidth: 170, height: 104, '--lg-r': '30px' } }, o[1])), h('b', { style: { fontWeight: 500 } }, o[0]));
            }))),
        h(D.Specs, { head: ['Élément', 'Valeur', 'Rôle'], rows: [
          ['Arête éclairée', 'inset 1.5px 1.5px, blanc à 95 %', 'Haut gauche. Le liseré tourne vers le pointeur.'],
          ['Arête opposée', 'inset -1.5px -1.5px, couleur du verre à 70 %', 'Bas droite. La lumière sort teintée.'],
          ['Caustique douce', 'inset -6px -8px 12px -9px', 'Halo interne le long du bord opposé.'],
          ['Reflet de surface', 'Nappe en haut, tache au pointeur, soft-light', 'Brillance sans voile blanc.'],
          ['Objet creusé', 'Ombre haut gauche, lumière bas droite', 'Rails, champs, pistes, rail d’interrupteur.'],
          ['Glow', 'Sous l’objet, couleur de la teinte', 'Jamais blanc, jamais d’une autre couleur.'],
          ['Thème sombre', 'Arête à 60 %, caustique à 30 %', 'La lumière est plus discrète sur fond sombre.']] })),
      h(D.Sub, { title: 'Surfaces' },
        h(D.Specs, { head: ['Contexte', 'Opacité du verre', 'Usage'], rows: [
          ['Sur le sol', '0.74 clair · 0.08 sombre', 'Boutons, puces, champs : objets posés sur la page.'],
          ['Sur un décor coloré', '0.26 clair · 0.12 sombre', 'Cartes météo, recherche, navigation : verre au-dessus d’une image.'],
          ['Teinté', '0.40 à 0.78', 'Actions et états actifs : un galet de couleur, jamais opaque.'],
          ['Flou', 'Seulement dans .scene ou .over', 'Sur un sol uni il ne se voit pas et coûte cher : il est coupé.']] })),
      h(D.Usage, { dos: ['Garder une seule source de lumière, en haut à gauche.', 'Inverser la lumière dans les parties creusées : rails, champs, pistes.', 'Donner au glow la couleur de la teinte.', 'Prévoir un décor coloré derrière le Givre : le flou n’est actif qu’au-dessus d’un décor.'],
        donts: ['Ajouter des étoiles ou des scintillements.', 'Mélanger un halo d’une couleur et une teinte d’une autre.', 'Éclairer un objet depuis plusieurs directions.', 'Utiliser un verre très transparent sur un fond uni : il disparaît.'] }));
  };

  /* ---------- Couleurs ---------- */
  S.Colors = function () {
    SG.useTheme();
    return h(D.Section, { id: 'couleurs', label: 'Fondations', title: 'Douze galets', lead: 'Pastels à basse saturation, un peu laiteux, avec quelques tons pleins pour les repères. Chaque forme est un galet arrondi, sans angle. Clique sur un galet pour copier sa variable.' },
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
      h('div', { className: 'g3' }, [['Poppins', 'var(--font-display)', 'Titres, boutons, onglets, logo'], ['Roboto', 'var(--font-body)', 'Texte, champs, légendes'], ['Roboto Mono', 'var(--font-mono)', 'Valeurs, tokens, code']].map(function (f) {
        return h('div', { className: 'panel', key: f[0] }, h('div', { className: 'panel-body', style: { gap: 6 } }, h('span', { style: { fontFamily: f[1], fontSize: 52, lineHeight: 1 } }, 'Aa'), h('b', { style: { fontWeight: 500, marginTop: 8 } }, f[0]), h('span', { style: { fontSize: 13, color: 'var(--ink-3)' } }, f[2])));
      })),
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
    function replay() { setGo(false); setTimeout(function () { setGo(true); }, 40); setTimeout(function () { setGo(false); }, 1500); }
    return h(D.Section, { id: 'mouvement', label: 'Fondations', title: 'Mouvement', lead: 'Une courbe fluide pour tout, plus un ressort léger pour ce qui se pose : poignée d’interrupteur, galet d’onglet, rebond de survol. Aucun clignotement. Tout se calme avec prefers-reduced-motion.' },
      h(D.Panel, { tag: 'Durées', cap: 'cubic-bezier(0.2, 0, 0, 1) · ressort cubic-bezier(0.34, 1.4, 0.5, 1)' },
        h('div', { className: 'g3' }, items.map(function (m) {
          return h(Glass, { key: m[0], className: 'mo' + (go ? ' go' : ''), style: { '--d': m[3] + 'ms' }, alive: false },
            h('b', { style: { fontWeight: 500 } }, m[0] + ' · ' + m[1]), h('span', { style: { fontSize: 12, color: 'var(--ink-3)' } }, m[2]),
            h(Glass, { className: 'track', refractive: false, alive: false, glow: false }, h('span', { className: 'ball' })));
        })),
        h('div', null, h(UI.Button, { variant: 'primary', onClick: replay }, 'Rejouer'))));
  };
})();

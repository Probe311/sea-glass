/* Sea Glass v3 · contenu (3/3) : saisie, navigation, contenu, qualité, application */
(function () {
  var SG = window.SG, h = SG.h, Glass = SG.Glass, Icon = SG.Icon, UI = SG.UI, D = SG.Doc, S = SG.S;
  var useState = React.useState, useEffect = React.useEffect, useRef = React.useRef;

  /* ---------- Champs et recherche ---------- */
  S.Fields = function () {
    var F = UI.Field;
    return h(D.Section, { id: 'champs', label: 'Composants', title: 'Champs et recherche', lead: 'Le champ est un creux de verre : la matière est enfoncée, la saisie reste sur fond clair. La recherche est un Givre en pilule, pensé pour reposer sur une image.' },
      h(D.Panel, { tag: 'Champs', cap: 'Repos, survol, focus, erreur et désactivé.' },
        h('div', { className: 'g2' },
          h('div', { className: 'stack' }, h(F, { label: 'Nom de la crique', placeholder: 'Crique des Sirènes', help: 'Visible dans ta collection.' }), h(F, { label: 'Survol (forcé)', placeholder: 'Survolé', state: 'hover' }), h(F, { label: 'Focus (forcé)', placeholder: 'Au clavier', state: 'focus' })),
          h('div', { className: 'stack' }, h(F, { label: 'Profondeur maximale', value: 'abc', invalid: true, help: 'Saisis un nombre en mètres, par exemple 12.' }), h(F, { label: 'Désactivé', value: 'Récif nord', disabled: true })))),
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

  /* ---------- Catalogue @seaglass/* (CSS productisé) ---------- */
  S.Packages = function () {
    function cell(name, node, href) {
      return h('div', { key: name, style: { display: 'grid', gap: 8, alignContent: 'start', minWidth: 0 } },
        href
          ? h('a', { className: 'label', href: href, style: { color: '#fff', fontSize: 12, fontWeight: 600 } }, name)
          : h('span', { className: 'label', style: { color: '#fff', fontSize: 12, fontWeight: 600 } }, name),
        node);
    }
    var inventory = [
      ['Glass', h('div', { className: 'sg-glass', 'data-frosted': true, 'data-rim': true, style: { padding: '10px 14px', fontSize: 13 } }, 'Surface'), '#matiere'],
      ['Button', h('button', { type: 'button', className: 'sg-button sg-glass sg-button--primary sg-button--sm', 'data-frosted': true }, 'Action'), '#boutons'],
      ['IconButton', h('button', { type: 'button', className: 'sg-button sg-button--circle sg-button--sm sg-glass', 'aria-label': 'Favori', 'data-frosted': true }, '♥'), '#boutons'],
      ['Chip', h('button', { type: 'button', className: 'sg-chip sg-glass', 'aria-pressed': 'true' }, 'Shore'), '#puces'],
      ['Link', h('a', { className: 'sg-link', href: '#packages' }, 'Lien'), '#chrome'],
      ['SkipLink', h('a', { className: 'sg-skip sg-glass', href: '#packages', style: { position: 'static', transform: 'none' } }, 'Skip'), '#chrome'],
      ['Badge', h('span', { className: 'sg-badge sg-glass' }, 'alpha'), '#cartes'],
      ['Tag', h('span', { className: 'sg-tag sg-glass' }, 'glass'), '#cartes'],
      ['Card', h('div', { className: 'sg-card sg-glass', 'data-frosted': true, 'data-rim': true, style: { padding: 10, fontSize: 13 } }, 'Card'), '#cartes'],
      ['Tile', h('a', { className: 'sg-tile sg-glass', href: '#donnees', 'data-frosted': true, style: { display: 'block', padding: 10, textDecoration: 'none', fontSize: 13 } }, 'Tile'), '#donnees'],
      ['Divider', h('hr', { className: 'sg-divider', style: { width: '100%', margin: '8px 0' } }), '#donnees'],
      ['List', h('ul', { className: 'sg-list sg-glass', style: { listStyle: 'none', margin: 0, padding: 6, fontSize: 12 } }, h('li', { className: 'sg-list__item' }, 'Item')), '#donnees'],
      ['TextField', h('input', { className: 'sg-field__input', placeholder: 'Field', 'aria-label': 'Field', style: { width: '100%' } }), '#champs'],
      ['Password', h('input', { type: 'password', className: 'sg-field__input', defaultValue: '••••', 'aria-label': 'Password', style: { width: '100%' } }), '#listes'],
      ['Search', h('input', { type: 'search', className: 'sg-search__control', placeholder: 'Search', 'aria-label': 'Search', style: { width: '100%' } }), '#champs'],
      ['Select', h('select', { 'aria-label': 'Select', style: { width: '100%' } }, h('option', null, 'Seafoam')), '#listes'],
      ['Combobox', h('input', { className: 'sg-combobox__control', placeholder: 'Combo…', 'aria-label': 'Combobox', style: { width: '100%' } }), '#listes'],
      ['Checkbox', h('label', { className: 'sg-check', style: { color: '#fff', fontSize: 12 } }, h('input', { type: 'checkbox', defaultChecked: true }), h('span', { className: 'sg-check__box sg-glass', 'aria-hidden': true }), ' OK'), '#cases'],
      ['Radio', h('label', { className: 'sg-check sg-check--radio', style: { color: '#fff', fontSize: 12 } }, h('input', { type: 'radio', name: 'inv', defaultChecked: true }), h('span', { className: 'sg-check__box sg-glass', 'aria-hidden': true }), ' A'), '#cases'],
      ['Switch', h('span', { className: 'sg-switch' }, h('input', { type: 'checkbox', role: 'switch', defaultChecked: true }), h('span', { className: 'sg-switch__track sg-glass', 'aria-hidden': true }, h('span', { className: 'sg-switch__knob' }))), '#interrupteur'],
      ['Segmented', h('div', { className: 'sg-segmented sg-glass', role: 'radiogroup', 'data-frosted': true, style: { display: 'inline-flex' } }, h('button', { type: 'button', className: 'sg-segmented__btn', role: 'radio', 'aria-checked': 'true' }, 'A'), h('button', { type: 'button', className: 'sg-segmented__btn', role: 'radio', 'aria-checked': 'false' }, 'B')), null],
      ['Slider', h('div', { className: 'sg-slider', style: { '--sg-sl-b': 0.45, '--sg-sl-v': 0.45 }, 'aria-hidden': true }, h('div', { className: 'sg-slider__rail' }), h('div', { className: 'sg-slider__fill' }), h('div', { className: 'sg-slider__thumb' }, h('i', { className: 'sg-slider__blob' }), h('i', { className: 'sg-slider__stem' }))), '#curseur'],
      ['Form', h('form', { className: 'sg-form' }, h('fieldset', { className: 'sg-form__fieldset' }, h('legend', { className: 'sg-form__legend' }, 'Fieldset'))), null],
      ['FileUpload', h('div', { className: 'sg-upload sg-glass', 'data-frosted': true, style: { padding: 8, fontSize: 12 } }, 'Drop'), '#listes'],
      ['Alert', h('div', { className: 'sg-alert sg-glass', role: 'alert', 'data-tone': 'info', 'data-frosted': true, style: { padding: 8, fontSize: 12 } }, 'Info'), '#alertes'],
      ['Banner', h('div', { className: 'sg-banner sg-alert sg-glass', role: 'alert', 'data-tone': 'warning', 'data-frosted': true, style: { padding: 8, fontSize: 12 } }, 'Banner'), '#alertes'],
      ['Callout', h('aside', { className: 'sg-callout sg-glass', 'data-frosted': true, style: { padding: 8, fontSize: 12 } }, 'Callout'), '#alertes'],
      ['Accordion', h('div', { className: 'sg-accordion sg-glass', 'data-frosted': true, style: { fontSize: 12 } }, h('button', { type: 'button', className: 'sg-accordion__trigger', 'aria-expanded': 'false' }, 'Item')), '#accordeon'],
      ['Tooltip', h('span', { className: 'sg-tooltip sg-glass', role: 'tooltip', 'data-frosted': true, style: { position: 'static', display: 'inline-block', padding: '6px 10px', fontSize: 12 } }, 'Aide'), '#retours'],
      ['Snackbar', h('div', { className: 'sg-snack sg-glass', role: 'status', 'data-frosted': true, style: { padding: '8px 10px', fontSize: 12 } }, 'Snack'), '#retours'],
      ['Toast', h('div', { className: 'sg-toast sg-toast--open sg-glass', role: 'status', 'data-open': true, style: { position: 'static', opacity: 1, transform: 'none', padding: '8px 10px', fontSize: 12 } }, 'Toast'), '#retours'],
      ['Progress', h('div', { className: 'sg-progress sg-glass', role: 'progressbar', 'aria-valuenow': 60, style: { width: '100%' } }, h('div', { className: 'sg-progress__bar', style: { width: '60%' } })), '#curseur'],
      ['Ring', h('div', { className: 'sg-ring', style: { width: 48, height: 48 }, 'aria-hidden': true, role: 'progressbar', 'aria-valuenow': 64 }, h('span', { style: { fontSize: 11 } }, '64%')), '#curseur'],
      ['Tabs', h('div', { className: 'sg-tabs sg-glass', role: 'tablist', 'data-frosted': true }, h('button', { type: 'button', className: 'sg-tabs__tab', role: 'tab', 'aria-selected': true }, 'A'), h('button', { type: 'button', className: 'sg-tabs__tab', role: 'tab', 'aria-selected': false }, 'B')), '#onglets'],
      ['Dialog', h('div', { className: 'sg-dialog sg-glass', 'data-frosted': true, style: { padding: 10, fontSize: 12 } }, 'Dialog'), '#overlays'],
      ['Menu', h('ul', { className: 'sg-menu sg-glass', role: 'menu', 'data-frosted': true, style: { position: 'static', listStyle: 'none', margin: 0, padding: 4 } }, h('li', null, h('button', { type: 'button', className: 'sg-menu__item', role: 'menuitem' }, 'Item'))), '#overlays'],
      ['Header', h('div', { className: 'sg-header sg-glass', 'data-frosted': true, style: { padding: 8, fontSize: 12 } }, 'Header'), '#chrome'],
      ['Footer', h('div', { className: 'sg-footer sg-glass', 'data-frosted': true, style: { padding: 8, fontSize: 12 } }, 'Footer'), '#chrome'],
      ['Sidebar', h('nav', { className: 'sg-sidebar sg-glass', 'data-frosted': true, style: { padding: 8, fontSize: 12 } }, 'Side'), '#chrome'],
      ['Nav', h('ul', { className: 'sg-nav', style: { display: 'flex', gap: 8, listStyle: 'none', margin: 0, padding: 0, fontSize: 12 } }, h('li', null, h('a', { href: '#' }, 'Nav'))), '#navigation'],
      ['Toc', h('ol', { className: 'sg-toc', style: { margin: 0, fontSize: 12 } }, h('li', null, h('a', { href: '#' }, 'Toc'))), '#chrome'],
      ['Breadcrumbs', h('ol', { className: 'sg-breadcrumbs', style: { display: 'flex', gap: 4, listStyle: 'none', margin: 0, padding: 0, fontSize: 12 } }, h('li', null, 'A / B')), '#chrome'],
      ['Pagination', h('nav', { className: 'sg-pagination', style: { display: 'flex', gap: 4 } }, h('button', { type: 'button', className: 'sg-pagination__btn', 'aria-current': 'page' }, '1')), '#chrome'],
      ['Stepper', h('ol', { className: 'sg-stepper', style: { display: 'flex', gap: 6, listStyle: 'none', margin: 0, padding: 0, fontSize: 11 } }, h('li', { className: 'sg-stepper__step', 'data-state': 'current' }, h('span', { className: 'sg-stepper__index' }, '1'), ' Étape')), '#chrome'],
      ['Lang', h('div', { className: 'sg-lang', style: { display: 'flex', gap: 4 } }, h('button', { type: 'button', className: 'sg-lang__btn', 'aria-pressed': 'true' }, 'FR')), '#prefs'],
      ['Theme', h('span', { style: { color: '#fff', fontSize: 12 } }, 'ThemeToggle'), '#prefs'],
      ['Consent', h('div', { className: 'sg-consent sg-glass', 'data-frosted': true, style: { padding: 8, fontSize: 11 } }, 'Cookies'), '#prefs'],
      ['Table', h('table', { className: 'sg-table', style: { fontSize: 11, width: '100%' } }, h('tbody', null, h('tr', null, h('td', null, 'Seafoam')))), '#donnees'],
      ['Quote', h('blockquote', { className: 'sg-quote sg-glass', 'data-frosted': true, style: { margin: 0, padding: 8, fontSize: 12 } }, 'Quote'), '#donnees'],
      ['Media', h('figure', { className: 'sg-media sg-glass', 'data-frosted': true, style: { margin: 0, padding: 6 } }, h('div', { className: 'sg-media__frame', style: { aspectRatio: '16/9', background: 'rgba(255,255,255,.2)', borderRadius: 8 } })), '#donnees'],
      ['Hero', h('div', { className: 'sg-hero sg-glass', 'data-frosted': true, style: { padding: 8, fontSize: 12 } }, 'Hero'), '#donnees'],
      ['Share', h('button', { type: 'button', className: 'sg-button sg-glass sg-button--ghost sg-button--sm' }, 'Share'), '#donnees'],
      ['Transcription', h('div', { className: 'sg-transcription sg-glass', 'data-frosted': true, style: { padding: 8, fontSize: 11 } }, 'Transcript'), '#donnees'],
    ];
    return h(D.Section, {
      id: 'packages',
      label: 'Composants',
      title: 'Inventaire 100 %',
      lead: 'Tous les composants livrés (CSS .sg-* / React) ont un aperçu ici, avec lien vers la section détaillée quand elle existe. Hors scope : bloc marque, FranceConnect. Roadmap (Drawer, Skeleton…) : docs/COMPOSANTS.md.',
    },
      h('div', { className: 'sg-demo-catalog' },
        h(D.Panel, { scene: true, tag: 'Inventaire live', cap: inventory.length + ' composants — grille complète @seaglass/css.' },
          h('div', { className: 'sg-scene', style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))', gap: 14 } },
            inventory.map(function (item) { return cell(item[0], item[1], item[2]); }))),
        h(D.Panel, { tag: 'Couverture', cap: 'Storybook : pnpm storybook · docs/COMPOSANTS.md' },
          h('p', { style: { margin: 0, fontSize: 14, color: 'var(--ink-2)' } },
            'Sections du sommaire + cette grille = 100 % des composants shipping. Les items roadmap non démarrés (Avatar, Drawer, Date…) ne sont pas listés ici.'))));
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
          h(S.Cards), h(S.DataDoc), h(S.Feedback), h(S.PrefsDoc), h(S.Packages),
          h(S.Contrast), h(S.Tokens),
          h('footer', { className: 'end' }, h('span', null, 'Sea Glass · ' + ((window.SG_META && window.SG_META.version) || '0.1.0-alpha.0')), h('span', null, 'Matière : frosted, refractive, alive, rim, tint, glow · packages .sg-*'))),
      h(Toast));
  }
  ReactDOM.createRoot(document.getElementById('root')).render(h(App));
})();

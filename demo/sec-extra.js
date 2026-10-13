/* Sea Glass · sections prioritaires (aperçus .sg-* façon catalogue DSFR) */
(function () {
  var SG = window.SG, h = SG.h, D = SG.Doc, S = SG.S;
  var useState = React.useState, useEffect = React.useEffect;

  function scene(children) {
    return h('div', { className: 'sg-scene stack', style: { gap: 14 } }, children);
  }

  S.Alerts = function () {
    return h(D.Section, { id: 'alertes', label: 'Composants', title: 'Alertes et bandeaux', lead: 'Relayer une information importante sans bloquer le parcours. Tons info, succès, attention, danger.' },
      h(D.Panel, { scene: true, tag: 'Aperçu', cap: 'Alert, Banner, Callout — classes .sg-alert / .sg-banner / .sg-callout.' },
        scene([
          h('div', { className: 'sg-alert sg-glass', role: 'alert', 'data-tone': 'info', 'data-frosted': true, 'data-tint': true },
            h('div', null, h('p', { className: 'sg-alert__title' }, 'Information'), 'La collecte des galets est ouverte jusqu’à dimanche.')),
          h('div', { className: 'sg-banner sg-alert sg-glass', role: 'alert', 'data-tone': 'warning', 'data-frosted': true, 'data-tint': true },
            h('div', null, h('p', { className: 'sg-alert__title' }, 'Attention'), 'La transparence réduite est activée sur cet appareil.')),
          h('div', { className: 'sg-alert sg-glass', role: 'alert', 'data-tone': 'success', 'data-frosted': true, 'data-tint': true },
            h('div', null, h('p', { className: 'sg-alert__title' }, 'Succès'), 'Le brouillon a été enregistré.')),
          h('aside', { className: 'sg-callout sg-glass', 'data-frosted': true },
            h('p', { className: 'sg-callout__title' }, 'À retenir'), 'Privilégier la translucidité avant la décoration.'),
        ])),
      h(D.Specs, { head: ['Propriété', 'Valeur', 'Note'], rows: [['Tons', 'info · success · warning · danger', 'data-tone'], ['Rôle', 'role="alert"', 'Annoncé aux lecteurs d’écran.']] }));
  };

  S.AccordionDoc = function () {
    var st = useState(0), open = st[0], setOpen = st[1];
    var items = [
      { t: 'Qu’est-ce que le givre ?', b: 'Backdrop-blur sur une scène : le décor est flouté derrière la matière.' },
      { t: 'Qu’est-ce que le rim ?', b: 'Liseré d’arête orienté vers la lumière.' },
      { t: 'Quand utiliser un accordéon ?', b: 'Pour regrouper du contenu secondaire sans allonger la page.' },
    ];
    return h(D.Section, { id: 'accordeon', label: 'Composants', title: 'Accordéon', lead: 'Masquer ou révéler du contenu textuel. Un panneau ouvert à la fois dans cet aperçu.' },
      h(D.Panel, { scene: true, tag: 'Aperçu' },
        scene([
          h('div', { className: 'sg-accordion sg-glass', 'data-frosted': true },
            items.map(function (item, i) {
              var isOpen = open === i;
              return h('div', { className: 'sg-accordion__item', key: item.t },
                h('button', {
                  type: 'button',
                  className: 'sg-accordion__trigger',
                  'aria-expanded': isOpen,
                  onClick: function () { setOpen(isOpen ? -1 : i); },
                }, item.t, h('span', { 'aria-hidden': true }, isOpen ? '−' : '+')),
                h('div', { className: 'sg-accordion__panel' + (isOpen ? ' sg-accordion__panel--open' : ''), 'data-open': isOpen || undefined },
                  h('div', { className: 'sg-accordion__panel-inner' }, item.b)));
            })),
        ])),
      h(D.Specs, { head: ['Propriété', 'Valeur', 'Note'], rows: [['Trigger', 'aria-expanded', 'Bouton natif'], ['Panel', 'data-open + grille 0fr→1fr', 'Animation CSS']] }));
  };

  S.OverlaysDoc = function () {
    var open = useState(false), isOpen = open[0], setOpen = open[1];
    useEffect(function () {
      if (!isOpen) return;
      function onKey(e) { if (e.key === 'Escape') setOpen(false); }
      document.addEventListener('keydown', onKey);
      return function () { document.removeEventListener('keydown', onKey); };
    }, [isOpen]);
    return h(D.Section, { id: 'overlays', label: 'Composants', title: 'Modale et menu', lead: 'Dialog pour une action bloquante ; Menu pour des actions contextuelles.' },
      h(D.Panel, { scene: true, tag: 'Aperçu', cap: 'Classes .sg-dialog / .sg-menu — focus trap complet côté @seaglass/react.' },
        scene([
          h('div', { style: { display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'flex-start' } },
            h('button', { type: 'button', className: 'sg-button sg-glass sg-button--primary', 'data-frosted': true, onClick: function () { setOpen(true); } }, 'Ouvrir la modale'),
            h('div', { className: 'sg-menu-wrap', style: { position: 'relative' } },
              h('ul', { className: 'sg-menu sg-menu--open sg-glass', role: 'menu', 'data-open': true, 'data-frosted': true, style: { position: 'static', minWidth: 160, margin: 0, listStyle: 'none' } },
                h('li', null, h('button', { type: 'button', className: 'sg-menu__item', role: 'menuitem' }, 'Copier')),
                h('li', null, h('button', { type: 'button', className: 'sg-menu__item', role: 'menuitem' }, 'Partager')),
                h('li', null, h('button', { type: 'button', className: 'sg-menu__item', role: 'menuitem' }, 'Supprimer'))))),
          isOpen && h('div', {
            className: 'sg-overlay sg-overlay--open',
            'data-open': true,
            onClick: function () { setOpen(false); },
          },
            h('div', {
              className: 'sg-dialog sg-glass',
              role: 'dialog',
              'aria-modal': 'true',
              'aria-labelledby': 'dlg-t',
              'data-frosted': true,
              onClick: function (e) { e.stopPropagation(); },
            },
              h('div', { className: 'sg-dialog__header' }, h('h3', { id: 'dlg-t', className: 'sg-dialog__title' }, 'Supprimer le brouillon ?')),
              h('div', { className: 'sg-dialog__body' }, 'Cette action est irréversible.'),
              h('div', { className: 'sg-dialog__footer' },
                h('button', { type: 'button', className: 'sg-button sg-glass sg-button--ghost', onClick: function () { setOpen(false); } }, 'Annuler'),
                h('button', { type: 'button', className: 'sg-button sg-glass sg-button--primary', onClick: function () { setOpen(false); } }, 'Supprimer')))),
        ])),
      h(D.Specs, { head: ['Composant', 'Rôle', 'Note'], rows: [['Dialog', 'dialog + aria-modal', 'Échap et focus trap côté @seaglass/react'], ['Menu', 'menu / menuitem', 'APG menu button']] }));
  };

  S.SelectDoc = function () {
    var opts = ['Seafoam', 'Kelly', 'Aqua', 'Cobalt', 'Amber'];
    var q = useState(''), query = q[0], setQuery = q[1];
    var o = useState(false), open = o[0], setOpen = o[1];
    var filtered = opts.filter(function (x) { return x.toLowerCase().indexOf(query.toLowerCase()) !== -1; });
    useEffect(function () {
      if (!open) return;
      function onKey(e) { if (e.key === 'Escape') setOpen(false); }
      document.addEventListener('keydown', onKey);
      return function () { document.removeEventListener('keydown', onKey); };
    }, [open]);
    return h(D.Section, { id: 'listes', label: 'Composants', title: 'Listes déroulantes', lead: 'Select natif sur verre, Combobox filtrable, champ mot de passe avec affichage, dépôt de fichiers.' },
      h(D.Panel, { scene: true, tag: 'Aperçu' },
        scene([
          h('div', { className: 'sg-field sg-select' },
            h('label', null, 'Galet'),
            h('div', { className: 'sg-glass sg-select__control', 'data-carved': true },
              h('select', { 'aria-label': 'Galet', defaultValue: 'seafoam' },
                h('option', { value: 'seafoam' }, 'Seafoam'),
                h('option', { value: 'kelly' }, 'Kelly'),
                h('option', { value: 'aqua' }, 'Aqua')))),
          h('div', { className: 'sg-combobox' },
            h('label', null, 'Combobox'),
            h('div', { className: 'sg-glass', 'data-carved': true },
              h('input', {
                className: 'sg-combobox__control',
                role: 'combobox',
                'aria-expanded': open,
                'aria-autocomplete': 'list',
                placeholder: 'Filtrer un galet…',
                'aria-label': 'Combobox',
                value: query,
                onChange: function (e) { setQuery(e.target.value); setOpen(true); },
                onFocus: function () { setOpen(true); },
                onBlur: function () { setTimeout(function () { setOpen(false); }, 120); },
              })),
            h('ul', {
              className: 'sg-combobox__list sg-glass' + (open && filtered.length ? ' sg-combobox__list--open' : ''),
              role: 'listbox',
              'data-open': open && filtered.length ? true : undefined,
              'data-frosted': true,
            },
              filtered.map(function (name) {
                return h('li', { key: name },
                  h('button', {
                    type: 'button',
                    className: 'sg-menu__item',
                    role: 'option',
                    onMouseDown: function (e) { e.preventDefault(); setQuery(name); setOpen(false); },
                  }, name));
              }))),
          h('div', { className: 'sg-field sg-password' },
            h('label', null, 'Mot de passe'),
            h('div', { className: 'sg-glass sg-password', 'data-carved': true, style: { position: 'relative' } },
              h('input', { type: 'password', className: 'sg-field__input', defaultValue: '••••••••', 'aria-label': 'Mot de passe' }))),
          h('div', { className: 'sg-upload sg-glass', 'data-frosted': true },
            h('label', null, 'Dépose un fichier ou parcourir'),
            h('button', { type: 'button', className: 'sg-button sg-glass sg-button--ghost sg-button--sm' }, 'Parcourir')),
        ])),
      h(D.Specs, { head: ['Composant', 'Classe', 'Note'], rows: [['Select', '.sg-select', 'Native'], ['Combobox', '.sg-combobox', 'Filtre local + listbox animée'], ['Password', '.sg-password', 'Toggle show/hide côté React'], ['Upload', '.sg-upload', 'Dropzone']] }));
  };

  S.ChromeDoc = function () {
    return h(D.Section, { id: 'chrome', label: 'Composants', title: 'En-tête, pied et navigation', lead: 'Identification du site, navigation principale, latérale, fil d’Ariane, pagination et étapes.' },
      h(D.Panel, { scene: true, tag: 'En-tête', cap: 'Header, breadcrumbs, skip.' },
        scene([
          h('a', { className: 'sg-skip sg-glass', href: '#chrome', style: { position: 'static', transform: 'none' } }, 'Aller au contenu'),
          h('header', { className: 'sg-header sg-glass', 'data-frosted': true },
            h('a', { className: 'sg-header__brand', href: '#chrome' }, 'Sea Glass.'),
            h('ul', { className: 'sg-header__nav' },
              h('li', null, h('a', { href: '#', 'aria-current': 'page' }, 'Docs')),
              h('li', null, h('a', { href: '#' }, 'Tokens')))),
          h('nav', { 'aria-label': 'Fil d’Ariane' },
            h('ol', { className: 'sg-breadcrumbs' },
              h('li', null, h('a', { className: 'sg-link', href: '#' }, 'Docs'), ' / '),
              h('li', null, h('span', { 'aria-current': 'page' }, 'Chrome')))),
        ])),
      h(D.Panel, { scene: true, tag: 'Latéral', cap: 'Sidebar et sommaire.' },
        scene([
          h('div', { className: 'chrome-side-grid' },
            h('nav', { className: 'sg-sidebar sg-glass', 'data-frosted': true },
              h('div', { className: 'sg-sidebar__label' }, 'Guide'),
              h('a', { href: '#', 'aria-current': 'page' }, 'Matière'),
              h('a', { href: '#' }, 'Formes')),
            h('ol', { className: 'sg-toc' },
              h('li', null, h('a', { href: '#', 'aria-current': true }, 'Frost')),
              h('li', null, h('a', { href: '#' }, 'Rim')))),
        ])),
      h(D.Panel, { scene: true, tag: 'Pied', cap: 'Stepper, pagination, footer.' },
        scene([
          h('ol', { className: 'sg-stepper' },
            h('li', { className: 'sg-stepper__step', 'data-state': 'done' }, h('span', { className: 'sg-stepper__index' }, '1'), ' Tokens'),
            h('li', { className: 'sg-stepper__step', 'data-state': 'current' }, h('span', { className: 'sg-stepper__index' }, '2'), ' CSS'),
            h('li', { className: 'sg-stepper__step', 'data-state': 'todo' }, h('span', { className: 'sg-stepper__index' }, '3'), ' React')),
          h('nav', { className: 'sg-pagination', 'aria-label': 'Pagination' },
            h('button', { type: 'button', className: 'sg-pagination__btn', disabled: true }, 'Préc'),
            h('button', { type: 'button', className: 'sg-pagination__btn', 'aria-current': 'page' }, '1'),
            h('button', { type: 'button', className: 'sg-pagination__btn' }, '2'),
            h('button', { type: 'button', className: 'sg-pagination__btn' }, 'Suiv')),
          h('footer', { className: 'sg-footer sg-glass', 'data-frosted': true },
            h('div', null, 'Sea Glass · MIT'),
            h('ul', { className: 'sg-nav' },
              h('li', null, h('a', { href: '#' }, 'GitHub')),
              h('li', null, h('a', { href: '#' }, 'Storybook')))),
        ])),
      h(D.Specs, { head: ['Composant', 'Classe'], rows: [['Header', '.sg-header'], ['Footer', '.sg-footer'], ['Sidebar', '.sg-sidebar'], ['Breadcrumbs', '.sg-breadcrumbs'], ['Pagination', '.sg-pagination'], ['Stepper', '.sg-stepper'], ['Skip', '.sg-skip']] }));
  };

  S.DataDoc = function () {
    return h(D.Section, { id: 'donnees', label: 'Composants', title: 'Données et contenu', lead: 'Tableaux, listes, tuiles, citation, média, hero, partage et transcription.' },
      h(D.Panel, { scene: true, tag: 'Aperçu' },
        scene([
          h('section', { className: 'sg-hero sg-glass', 'data-frosted': true },
            h('div', { className: 'sg-hero__copy' },
              h('h3', { className: 'sg-hero__title' }, 'Zone d’expression'),
              h('p', { className: 'sg-hero__subtitle' }, 'Message fort sur verre.'))),
          h('a', { className: 'sg-tile sg-glass', href: '#donnees', 'data-frosted': true },
            h('h3', { className: 'sg-tile__title' }, 'Tuile'), 'Redirige vers un contenu.'),
          h('blockquote', { className: 'sg-quote sg-glass', 'data-frosted': true },
            'La translucidité avant la décoration.',
            h('footer', null, '— Sea Glass')),
          h('figure', { className: 'sg-media sg-glass', 'data-frosted': true },
            h('div', { className: 'sg-media__frame', 'aria-hidden': true }),
            h('figcaption', { className: 'sg-media__caption' }, 'Contenu média')),
          h('div', { className: 'sg-transcription sg-glass', 'data-frosted': true },
            h('strong', null, 'Transcription'),
            h('p', null, 'Texte alternatif pour un média audio ou vidéo.')),
          h('div', { className: 'sg-table-wrap sg-glass', 'data-frosted': true },
            h('table', { className: 'sg-table' },
              h('thead', null, h('tr', null, h('th', null, 'Galet'), h('th', null, 'Rôle'))),
              h('tbody', null,
                h('tr', null, h('td', null, 'Seafoam'), h('td', null, 'primary')),
                h('tr', null, h('td', null, 'Amber'), h('td', null, 'warning'))))),
          h('ul', { className: 'sg-list sg-glass', 'data-frosted': true },
            h('li', { className: 'sg-list__item' }, h('div', { className: 'sg-list__body' }, h('div', { className: 'sg-list__label' }, 'Liste'), h('div', { className: 'sg-list__meta' }, 'Item sur verre')))),
          h('hr', { className: 'sg-divider' }),
          h('div', { className: 'sg-share' },
            h('button', { type: 'button', className: 'sg-button sg-glass sg-button--ghost sg-button--sm' }, 'Copier le lien'),
            h('a', { className: 'sg-button sg-glass sg-button--ghost sg-button--sm', href: '#' }, 'Partager')),
        ])),
      h(D.Specs, { head: ['Composant', 'Classe'], rows: [['Table', '.sg-table'], ['List', '.sg-list'], ['Tile', '.sg-tile'], ['Quote', '.sg-quote'], ['Media', '.sg-media'], ['Transcription', '.sg-transcription'], ['Hero', '.sg-hero'], ['Share', '.sg-share'], ['Divider', '.sg-divider']] }));
  };

  S.PrefsDoc = function () {
    return h(D.Section, { id: 'prefs', label: 'Composants', title: 'Préférences', lead: 'Thème clair/sombre et choix de langue.' },
      h(D.Panel, { scene: true, tag: 'Aperçu' },
        scene([
          h('div', { className: 'sg-lang', role: 'group', 'aria-label': 'Langue' },
            h('button', { type: 'button', className: 'sg-lang__btn', 'aria-pressed': 'true' }, 'FR'),
            h('button', { type: 'button', className: 'sg-lang__btn', 'aria-pressed': 'false' }, 'EN')),
          h('label', { style: { display: 'inline-flex', alignItems: 'center', gap: 12, color: '#fff' } },
            h('span', { className: 'sg-switch' },
              h('input', { type: 'checkbox', role: 'switch', onChange: function () { SG.toggleTheme(); } }),
              h('span', { className: 'sg-switch__track sg-glass', 'aria-hidden': true }, h('span', { className: 'sg-switch__knob' }))),
            'Paramètres d’affichage'),
        ])),
      h(D.Specs, { head: ['Composant', 'Classe'], rows: [['Lang', '.sg-lang'], ['Theme', 'Switch + data-sg-theme']] }));
  };
})();

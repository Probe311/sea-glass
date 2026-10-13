/* Sea Glass · sections prioritaires (aperçus .sg-* façon catalogue DSFR) */
(function () {
  var SG = window.SG, h = SG.h, D = SG.Doc, S = SG.S, Icon = SG.Icon;
  var useState = React.useState, useEffect = React.useEffect;

  function scene(children) {
    return h('div', { className: 'sg-scene stack', style: { gap: 14 } }, children);
  }

  function chevron(open) {
    return h('span', {
      className: 'sg-chevron' + (open ? ' sg-chevron--open' : ''),
      'aria-hidden': true,
    }, h(Icon, { name: 'chevron', size: 18 }));
  }

  function alertIcon(tone) {
    return h('span', { className: 'sg-alert__icon', 'aria-hidden': true },
      h(Icon, { name: tone === 'danger' ? 'error' : tone, size: 22 }));
  }

  S.Alerts = function () {
    var items = [
      ['info', 'Information', 'La collecte des galets est ouverte jusqu’à dimanche.'],
      ['warning', 'Attention', 'La transparence réduite est activée sur cet appareil.'],
      ['success', 'Succès', 'Le brouillon a été enregistré.'],
      ['error', 'Erreur', 'Impossible d’enregistrer. Réessaie dans un instant.'],
    ];
    return h(D.Section, { id: 'alertes', label: 'Composants', title: 'Alertes et bandeaux', lead: 'Relayer une information importante sans bloquer le parcours. Quatre tons : info, warning, success, error.' },
      h(D.Panel, { scene: true },
        scene(items.map(function (it) {
          return h('div', { key: it[0], className: 'sg-alert sg-glass', role: 'alert', 'data-tone': it[0], 'data-frosted': true, 'data-tint': true },
            alertIcon(it[0]),
            h('div', null, h('p', { className: 'sg-alert__title' }, it[1]), it[2]));
        }))),
      h(D.Specs, { head: ['Propriété', 'Valeur', 'Note'], rows: [['Tons', 'info · warning · success · error', 'danger alias de error'], ['Rôle', 'role="alert"', 'Annoncé aux lecteurs d’écran.'], ['Icône', '.sg-alert__icon', 'Une par ton']] }));
  };

  S.AccordionDoc = function () {
    var st = useState(0), open = st[0], setOpen = st[1];
    var items = [
      { t: 'Qu’est-ce que le givre ?', b: 'Backdrop-blur sur une scène : le décor est flouté derrière la matière.' },
      { t: 'Qu’est-ce que le rim ?', b: 'Liseré d’arête orienté vers la lumière.' },
      { t: 'Quand utiliser un accordéon ?', b: 'Pour regrouper du contenu secondaire sans allonger la page.' },
    ];
    return h(D.Section, { id: 'accordeon', label: 'Composants', title: 'Accordéon', lead: 'Masquer ou révéler du contenu textuel. Un panneau ouvert à la fois dans cet aperçu.' },
      h(D.Panel, { scene: true },
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
                }, item.t, chevron(isOpen)),
                h('div', { className: 'sg-accordion__panel' + (isOpen ? ' sg-accordion__panel--open' : ''), 'data-open': isOpen || undefined },
                  h('div', { className: 'sg-accordion__panel-inner' }, item.b)));
            })),
        ])),
      h(D.Specs, { head: ['Propriété', 'Valeur', 'Note'], rows: [['Trigger', 'aria-expanded', 'Bouton natif'], ['Panel', 'data-open + grille 0fr→1fr', 'Animation CSS']] }));
  };

  S.OverlaysDoc = function () {
    return h(D.Section, { id: 'overlays', label: 'Composants', title: 'Modale', lead: 'Dialog pour une action bloquante. Aperçu figé, lisible sur verre opaque.' },
      h(D.Panel, { scene: true },
        h('div', { className: 'sg-dialog-demo sg-dialog sg-glass', role: 'dialog', 'aria-labelledby': 'dlg-t', 'data-frosted': true, 'data-tint': true },
          h('div', { className: 'sg-dialog__header' }, h('h3', { id: 'dlg-t', className: 'sg-dialog__title' }, 'Supprimer le brouillon ?')),
          h('div', { className: 'sg-dialog__body' }, 'Cette action est irréversible. Le fichier ne pourra pas être récupéré.'),
          h('div', { className: 'sg-dialog__footer' },
            h('button', { type: 'button', className: 'sg-button sg-glass sg-button--ghost' }, 'Annuler'),
            h('button', {
              type: 'button',
              className: 'sg-button sg-glass sg-button--primary sg-dialog-demo__danger',
              'data-frosted': true,
              'data-tint': true,
            }, 'Supprimer')))),
      h(D.Specs, { head: ['Composant', 'Rôle', 'Note'], rows: [['Dialog', 'dialog + aria-modal', 'Focus trap côté @sea-glass/react']] }));
  };

  S.SelectDoc = function () {
    var opts = ['Seafoam', 'Kelly', 'Aqua', 'Cobalt', 'Amber'];
    var q = useState(''), query = q[0], setQuery = q[1];
    var o = useState(false), open = o[0], setOpen = o[1];
    var skipBlur = React.useRef(false);
    var filtered = opts.filter(function (x) { return x.toLowerCase().indexOf(query.toLowerCase()) !== -1; });
    useEffect(function () {
      if (!open) return;
      function onKey(e) { if (e.key === 'Escape') setOpen(false); }
      document.addEventListener('keydown', onKey);
      return function () { document.removeEventListener('keydown', onKey); };
    }, [open]);
    function toggleOpen(e) {
      if (e) e.preventDefault();
      skipBlur.current = true;
      setOpen(!open);
      setTimeout(function () { skipBlur.current = false; }, 0);
    }
    return h(D.Section, { id: 'listes', label: 'Composants', title: 'Listes déroulantes', lead: 'Combobox filtrable custom (chevron animé), champ mot de passe, dépôt de fichiers.' },
      h(D.Panel, { scene: true },
        scene([
          h('div', { className: 'sg-combobox' },
            h('label', null, 'Galet'),
            h('div', {
              className: 'sg-glass sg-combobox__shell',
              'data-carved': true,
              'data-open': open || undefined,
              onMouseDown: function (e) {
                if (e.target.closest && e.target.closest('.sg-combobox__control')) return;
                toggleOpen(e);
              },
            },
              h('input', {
                className: 'sg-combobox__control',
                role: 'combobox',
                'aria-expanded': open,
                'aria-autocomplete': 'list',
                placeholder: 'Filtrer un galet…',
                'aria-label': 'Galet',
                value: query,
                onChange: function (e) { setQuery(e.target.value); setOpen(true); },
                onMouseDown: function (e) {
                  if (open) {
                    e.preventDefault();
                    setOpen(false);
                    e.currentTarget.blur();
                  }
                },
                onFocus: function () { if (!skipBlur.current && !open) setOpen(true); },
                onBlur: function () {
                  setTimeout(function () {
                    if (!skipBlur.current) setOpen(false);
                  }, 120);
                },
              }),
              h('button', {
                type: 'button',
                className: 'sg-combobox__toggle',
                'aria-label': open ? 'Fermer la liste' : 'Ouvrir la liste',
                tabIndex: -1,
                onMouseDown: toggleOpen,
              }, chevron(open))),
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
      h(D.Specs, { head: ['Composant', 'Classe', 'Note'], rows: [['Combobox', '.sg-combobox', 'Custom + chevron'], ['Password', '.sg-password', 'Toggle show/hide côté React'], ['Upload', '.sg-upload', 'Dropzone']] }));
  };

  S.ChromeDoc = function () {
    return h(D.Section, { id: 'chrome', label: 'Composants', title: 'En-tête, pied et navigation', lead: 'Identification du site, navigation principale, latérale, fil d’Ariane, pagination et étapes.' },
      h(D.Panel, { scene: true },
        scene([
          h('a', { className: 'sg-skip sg-glass', href: '#chrome', style: { position: 'static', transform: 'none' } }, 'Aller au contenu'),
          h('header', { className: 'sg-header sg-glass', 'data-frosted': true },
            h('a', { className: 'sg-header__brand', href: '#chrome' }, 'Sea Glass.'),
            h('ul', { className: 'sg-header__nav' },
              h('li', null, h('a', { href: '#chrome', 'aria-current': 'page' }, 'Docs')),
              h('li', null, h('a', { href: '#chrome' }, 'Tokens')))),
          h('nav', { 'aria-label': 'Fil d’Ariane' },
            h('ol', { className: 'sg-breadcrumbs' },
              h('li', null, h('a', { className: 'sg-link', href: '#chrome' }, 'Docs'), ' / '),
              h('li', null, h('span', { 'aria-current': 'page' }, 'Chrome')))),
        ])),
      h(D.Panel, { scene: true },
        scene([
          h('div', { className: 'chrome-side-grid' },
            h('nav', { className: 'sg-sidebar sg-glass', 'data-frosted': true },
              h('div', { className: 'sg-sidebar__label' }, 'Guide'),
              h('a', { href: '#chrome', 'aria-current': 'page' }, 'Matière'),
              h('a', { href: '#chrome' }, 'Formes')),
            h('ol', { className: 'sg-toc' },
              h('li', null, h('a', { href: '#chrome', 'aria-current': true }, 'Frost')),
              h('li', null, h('a', { href: '#chrome' }, 'Rim')))),
        ])),
      h(D.Panel, { scene: true },
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
              h('li', null, h('a', { href: '#chrome' }, 'GitHub')),
              h('li', null, h('a', { href: '#chrome' }, 'Storybook')))),
        ])),
      h(D.Specs, { head: ['Composant', 'Classe'], rows: [['Header', '.sg-header'], ['Footer', '.sg-footer'], ['Sidebar', '.sg-sidebar'], ['Breadcrumbs', '.sg-breadcrumbs'], ['Pagination', '.sg-pagination'], ['Stepper', '.sg-stepper'], ['Skip', '.sg-skip']] }));
  };

  S.DataDoc = function () {
    return h(D.Section, { id: 'donnees', label: 'Composants', title: 'Données et contenu', lead: 'Tableaux, listes, tuiles, citation, média, hero et transcription.' },
      h(D.Panel, { scene: true },
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
            h('div', { className: 'sg-media__frame', 'aria-hidden': true },
              h('span', { className: 'sg-media__icon' }, h(Icon, { name: 'image', size: 40 }))),
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
        ])),
      h(D.Specs, { head: ['Composant', 'Classe'], rows: [['Table', '.sg-table'], ['List', '.sg-list'], ['Tile', '.sg-tile'], ['Quote', '.sg-quote'], ['Media', '.sg-media'], ['Transcription', '.sg-transcription'], ['Hero', '.sg-hero'], ['Divider', '.sg-divider']] }));
  };

  S.PrefsDoc = function () {
    SG.useTheme();
    var lang = useState('FR'), L = lang[0], setL = lang[1];
    var dark = SG.isDark();
    return h(D.Section, { id: 'prefs', label: 'Composants', title: 'Préférences', lead: 'Thème clair/sombre et choix de langue.' },
      h(D.Panel, { scene: true },
        h('div', { className: 'prefs-row' },
          h('div', { className: 'prefs-block' },
            h('span', { className: 'prefs-label' }, 'Langue'),
            h('div', { className: 'sg-lang sg-glass', role: 'group', 'aria-label': 'Langue', 'data-frosted': true },
              h('span', { className: 'sg-lang__pill', style: { transform: L === 'FR' ? 'translateX(0)' : 'translateX(100%)' }, 'aria-hidden': true }),
              h('button', { type: 'button', className: 'sg-lang__btn', 'aria-pressed': L === 'FR', onClick: function () { setL('FR'); } }, 'FR'),
              h('button', { type: 'button', className: 'sg-lang__btn', 'aria-pressed': L === 'EN', onClick: function () { setL('EN'); } }, 'EN'))),
          h('div', { className: 'prefs-block' },
            h('span', { className: 'prefs-label', id: 'theme-label' }, 'Changer le thème'),
            h('button', {
              type: 'button',
              className: 'theme-switch' + (dark ? ' theme-switch--dark' : ''),
              onClick: SG.toggleTheme,
              'aria-labelledby': 'theme-label',
              'aria-pressed': dark,
            },
              h('span', { className: 'theme-switch__track', 'aria-hidden': true },
                h('span', { className: 'theme-switch__thumb' }, h(Icon, { name: dark ? 'moon' : 'sun' }))))))),
      h(D.Specs, { head: ['Composant', 'Classe'], rows: [['Lang', '.sg-lang'], ['Theme', '.theme-switch']] }));
  };
})();

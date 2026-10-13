/* Sea Glass · sections prioritaires (aperçus .sg-* façon catalogue DSFR) */
(function () {
  var SG = window.SG, h = SG.h, D = SG.Doc, S = SG.S;

  function scene(children) {
    return h('div', { className: 'sg-scene stack', style: { gap: 14 } }, children);
  }

  S.Alerts = function () {
    return h(D.Section, { id: 'alertes', label: 'Composants', title: 'Alertes et bandeaux', lead: 'Relayer une information importante sans bloquer le parcours. Tons info, succès, attention, danger.' },
      h(D.Panel, { scene: true, tag: 'Aperçu', cap: 'Alert, Banner, Callout — classes .sg-alert / .sg-banner / .sg-callout.' },
        scene([
          h('div', { className: 'sg-alert sg-glass', role: 'alert', 'data-tone': 'info', 'data-frosted': true, 'data-rim': true },
            h('span', { 'aria-hidden': true }, '●'), h('div', null, h('p', { className: 'sg-alert__title' }, 'Info'), 'Rim light follows the pointer.')),
          h('div', { className: 'sg-banner sg-alert sg-glass', role: 'alert', 'data-tone': 'warning', 'data-frosted': true, 'data-rim': true },
            h('span', { 'aria-hidden': true }, '●'), h('div', null, h('p', { className: 'sg-alert__title' }, 'Bandeau'), 'Reduced transparency active.')),
          h('aside', { className: 'sg-callout sg-callout--highlight sg-glass', 'data-frosted': true, 'data-rim': true },
            h('p', { className: 'sg-callout__title' }, 'Mise en avant'), 'Information secondaire mise en valeur.'),
        ])),
      h(D.Specs, { head: ['Propriété', 'Valeur', 'Note'], rows: [['Tons', 'info · success · warning · danger', 'data-tone'], ['Rôle', 'role="alert"', 'Annoncé aux lecteurs d’écran.']] }));
  };

  S.AccordionDoc = function () {
    return h(D.Section, { id: 'accordeon', label: 'Composants', title: 'Accordéon', lead: 'Masquer ou révéler du contenu textuel. Un panneau ouvert à la fois dans cet aperçu.' },
      h(D.Panel, { scene: true, tag: 'Aperçu' },
        scene([
          h('div', { className: 'sg-accordion sg-glass', 'data-frosted': true, 'data-rim': true },
            h('div', { className: 'sg-accordion__item' },
              h('button', { type: 'button', className: 'sg-accordion__trigger', 'aria-expanded': 'true' }, 'Qu’est-ce que le givre ?', h('span', { 'aria-hidden': true }, '−')),
              h('div', { className: 'sg-accordion__panel' }, 'Backdrop-blur sur une scène : le décor est flouté derrière la matière.')),
            h('div', { className: 'sg-accordion__item' },
              h('button', { type: 'button', className: 'sg-accordion__trigger', 'aria-expanded': 'false' }, 'Qu’est-ce que le rim ?', h('span', { 'aria-hidden': true }, '+')),
              h('div', { className: 'sg-accordion__panel', hidden: true }, 'Liseré d’arête vers la lumière.'))),
        ])),
      h(D.Specs, { head: ['Propriété', 'Valeur', 'Note'], rows: [['Trigger', 'aria-expanded', 'Bouton natif'], ['Panel', 'hidden si fermé', '']] }));
  };

  S.OverlaysDoc = function () {
    var open = React.useState(false), isOpen = open[0], setOpen = open[1];
    return h(D.Section, { id: 'overlays', label: 'Composants', title: 'Modale et menu', lead: 'Dialog pour une action bloquante ; Menu pour des actions contextuelles.' },
      h(D.Panel, { scene: true, tag: 'Aperçu', cap: 'Classes .sg-dialog / .sg-menu — focus trap complet côté @seaglass/react.' },
        scene([
          h('div', { style: { display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'flex-start' } },
            h('button', { type: 'button', className: 'sg-button sg-glass sg-button--primary', 'data-frosted': true, onClick: function () { setOpen(true); } }, 'Ouvrir la modale'),
            h('div', { className: 'sg-menu-wrap', style: { position: 'relative' } },
              h('ul', { className: 'sg-menu sg-glass', role: 'menu', 'data-frosted': true, 'data-rim': true, style: { position: 'static', minWidth: 160, margin: 0, padding: 6, listStyle: 'none' } },
                h('li', null, h('button', { type: 'button', className: 'sg-menu__item', role: 'menuitem' }, 'Copier')),
                h('li', null, h('button', { type: 'button', className: 'sg-menu__item', role: 'menuitem' }, 'Partager')),
                h('li', null, h('button', { type: 'button', className: 'sg-menu__item', role: 'menuitem' }, 'Supprimer'))))),
          isOpen && h('div', { className: 'sg-overlay', style: { position: 'fixed', inset: 0, zIndex: 40, display: 'grid', placeItems: 'center', background: 'rgba(0,0,0,.35)' }, onClick: function () { setOpen(false); } },
            h('div', { className: 'sg-dialog sg-glass', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'dlg-t', 'data-frosted': true, 'data-rim': true, style: { maxWidth: 360, padding: 20 }, onClick: function (e) { e.stopPropagation(); } },
              h('h3', { id: 'dlg-t', className: 'sg-dialog__title' }, 'Supprimer le brouillon ?'),
              h('p', { className: 'sg-dialog__body' }, 'Cette action est irréversible.'),
              h('div', { className: 'sg-dialog__footer', style: { display: 'flex', gap: 8, justifyContent: 'end' } },
                h('button', { type: 'button', className: 'sg-button sg-glass sg-button--ghost', onClick: function () { setOpen(false); } }, 'Annuler'),
                h('button', { type: 'button', className: 'sg-button sg-glass sg-button--primary', onClick: function () { setOpen(false); } }, 'Supprimer')))),
        ])),
      h(D.Specs, { head: ['Composant', 'Rôle', 'Note'], rows: [['Dialog', 'dialog + aria-modal', 'Échap et focus trap côté @seaglass/react'], ['Menu', 'menu / menuitem', 'APG menu button']] }));
  };

  S.SelectDoc = function () {
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
              h('input', { className: 'sg-combobox__control', role: 'combobox', 'aria-expanded': 'false', 'aria-autocomplete': 'list', placeholder: 'Filtrer un galet…', 'aria-label': 'Combobox' })),
            h('ul', { className: 'sg-combobox__list sg-glass', role: 'listbox', 'data-frosted': true, 'data-rim': true, style: { marginTop: 6, listStyle: 'none', padding: 6 } },
              h('li', null, h('button', { type: 'button', className: 'sg-menu__item', role: 'option' }, 'Seafoam')),
              h('li', null, h('button', { type: 'button', className: 'sg-menu__item', role: 'option' }, 'Kelly')))),
          h('div', { className: 'sg-field sg-password' },
            h('label', null, 'Mot de passe'),
            h('div', { className: 'sg-glass sg-password', 'data-carved': true, style: { position: 'relative' } },
              h('input', { type: 'password', className: 'sg-field__input', defaultValue: '••••••••', 'aria-label': 'Mot de passe' }))),
          h('div', { className: 'sg-upload sg-glass', 'data-frosted': true, 'data-rim': true },
            h('label', null, 'Dépose un fichier ou parcourir'),
            h('button', { type: 'button', className: 'sg-button sg-glass sg-button--ghost sg-button--sm' }, 'Parcourir')),
        ])),
      h(D.Specs, { head: ['Composant', 'Classe', 'Note'], rows: [['Select', '.sg-select', 'Native'], ['Combobox', '.sg-combobox', 'Filtre local'], ['Password', '.sg-password', 'Toggle show/hide côté React'], ['Upload', '.sg-upload', 'Dropzone']] }));
  };

  S.ChromeDoc = function () {
    return h(D.Section, { id: 'chrome', label: 'Composants', title: 'En-tête, pied et navigation', lead: 'Identification du site, navigation principale, latérale, fil d’Ariane, pagination et étapes.' },
      h(D.Panel, { scene: true, tag: 'Aperçu' },
        scene([
          h('header', { className: 'sg-header sg-glass', 'data-frosted': true, 'data-rim': true, style: { display: 'flex', gap: 16, alignItems: 'center', padding: '12px 16px', flexWrap: 'wrap' } },
            h('a', { className: 'sg-header__brand', href: '#chrome' }, 'Sea Glass.'),
            h('ul', { className: 'sg-header__nav', style: { display: 'flex', gap: 12, listStyle: 'none', margin: 0, padding: 0 } },
              h('li', null, h('a', { href: '#', 'aria-current': 'page' }, 'Docs')),
              h('li', null, h('a', { href: '#' }, 'Tokens')))),
          h('nav', { 'aria-label': 'Fil d’Ariane' },
            h('ol', { className: 'sg-breadcrumbs', style: { display: 'flex', gap: 6, listStyle: 'none', margin: 0, padding: 0, flexWrap: 'wrap' } },
              h('li', null, h('a', { className: 'sg-link', href: '#' }, 'Docs'), ' / '),
              h('li', null, h('span', { 'aria-current': 'page' }, 'Chrome')))),
          h('div', { style: { display: 'grid', gridTemplateColumns: 'minmax(120px,160px) 1fr', gap: 12 } },
            h('nav', { className: 'sg-sidebar sg-glass', 'data-frosted': true, 'data-rim': true, style: { padding: 12, display: 'grid', gap: 6 } },
              h('div', { className: 'sg-sidebar__label' }, 'Guide'),
              h('a', { href: '#', 'aria-current': 'page' }, 'Matière'),
              h('a', { href: '#' }, 'Formes')),
            h('ol', { className: 'sg-toc', style: { margin: 0 } },
              h('li', null, h('a', { href: '#', 'aria-current': true }, 'Frost')),
              h('li', null, h('a', { href: '#' }, 'Rim')))),
          h('ol', { className: 'sg-stepper', style: { display: 'flex', gap: 12, listStyle: 'none', margin: 0, padding: 0, flexWrap: 'wrap' } },
            h('li', { className: 'sg-stepper__step', 'data-state': 'done' }, h('span', { className: 'sg-stepper__index' }, '1'), ' Tokens'),
            h('li', { className: 'sg-stepper__step', 'data-state': 'current' }, h('span', { className: 'sg-stepper__index' }, '2'), ' CSS'),
            h('li', { className: 'sg-stepper__step', 'data-state': 'todo' }, h('span', { className: 'sg-stepper__index' }, '3'), ' React')),
          h('nav', { className: 'sg-pagination', 'aria-label': 'Pagination', style: { display: 'flex', gap: 6 } },
            h('button', { type: 'button', className: 'sg-pagination__btn', disabled: true }, 'Préc'),
            h('button', { type: 'button', className: 'sg-pagination__btn', 'aria-current': 'page' }, '1'),
            h('button', { type: 'button', className: 'sg-pagination__btn' }, '2'),
            h('button', { type: 'button', className: 'sg-pagination__btn' }, 'Suiv')),
          h('a', { className: 'sg-skip sg-glass', href: '#chrome' }, 'Aller au contenu'),
          h('footer', { className: 'sg-footer sg-glass', 'data-frosted': true, 'data-rim': true, style: { padding: 16 } },
            h('div', null, 'Sea Glass · MIT'),
            h('ul', { className: 'sg-nav', style: { display: 'flex', gap: 12, listStyle: 'none', margin: '8px 0 0', padding: 0 } },
              h('li', null, h('a', { href: '#' }, 'GitHub')),
              h('li', null, h('a', { href: '#' }, 'Storybook')))),
        ])),
      h(D.Specs, { head: ['Composant', 'Classe'], rows: [['Header', '.sg-header'], ['Footer', '.sg-footer'], ['Sidebar', '.sg-sidebar'], ['Breadcrumbs', '.sg-breadcrumbs'], ['Pagination', '.sg-pagination'], ['Stepper', '.sg-stepper'], ['Skip', '.sg-skip']] }));
  };

  S.DataDoc = function () {
    return h(D.Section, { id: 'donnees', label: 'Composants', title: 'Données et contenu', lead: 'Tableaux, listes, tuiles, citation, média, hero, partage et transcription.' },
      h(D.Panel, { scene: true, tag: 'Aperçu' },
        scene([
          h('section', { className: 'sg-hero sg-glass', 'data-frosted': true, 'data-rim': true, style: { padding: 20 } },
            h('div', { className: 'sg-hero__copy' },
              h('h3', { className: 'sg-hero__title', style: { margin: 0 } }, 'Zone d’expression'),
              h('p', { className: 'sg-hero__subtitle' }, 'Message fort sur verre.'))),
          h('a', { className: 'sg-tile sg-glass', href: '#donnees', 'data-frosted': true, 'data-rim': true, style: { display: 'block', padding: 16, textDecoration: 'none' } },
            h('h3', { className: 'sg-tile__title' }, 'Tuile'), 'Redirige vers un contenu.'),
          h('blockquote', { className: 'sg-quote sg-glass', 'data-frosted': true, 'data-rim': true, style: { margin: 0, padding: 16 } },
            'La translucidité avant la décoration.',
            h('footer', { className: 'sg-quote__cite' }, '— Sea Glass')),
          h('figure', { className: 'sg-media sg-glass', 'data-frosted': true, 'data-rim': true, style: { margin: 0, padding: 12 } },
            h('div', { className: 'sg-media__frame', style: { aspectRatio: '16/9', borderRadius: 12, background: 'linear-gradient(135deg, rgba(255,255,255,.25), rgba(0,0,0,.15))' } }),
            h('figcaption', { className: 'sg-media__caption' }, 'Contenu média')),
          h('div', { className: 'sg-transcription sg-glass', 'data-frosted': true, 'data-rim': true, style: { padding: 12, fontSize: 14 } },
            h('strong', null, 'Transcription'),
            h('p', { style: { margin: '8px 0 0' } }, 'Texte alternatif pour un média audio ou vidéo.')),
          h('div', { className: 'sg-table-wrap sg-glass', 'data-frosted': true, 'data-rim': true },
            h('table', { className: 'sg-table' },
              h('thead', null, h('tr', null, h('th', null, 'Galet'), h('th', null, 'Rôle'))),
              h('tbody', null,
                h('tr', null, h('td', null, 'Seafoam'), h('td', null, 'primary')),
                h('tr', null, h('td', null, 'Amber'), h('td', null, 'warning'))))),
          h('ul', { className: 'sg-list sg-glass', 'data-frosted': true, 'data-rim': true, style: { listStyle: 'none', margin: 0, padding: 8 } },
            h('li', { className: 'sg-list__item' }, h('div', { className: 'sg-list__body' }, h('div', { className: 'sg-list__label' }, 'Liste'), h('div', { className: 'sg-list__meta' }, 'Item sur verre')))),
          h('hr', { className: 'sg-divider' }),
          h('div', { className: 'sg-share', style: { display: 'flex', gap: 8 } },
            h('button', { type: 'button', className: 'sg-button sg-glass sg-button--ghost sg-button--sm' }, 'Copier le lien'),
            h('a', { className: 'sg-button sg-glass sg-button--ghost sg-button--sm', href: '#' }, 'Partager')),
        ])),
      h(D.Specs, { head: ['Composant', 'Classe'], rows: [['Table', '.sg-table'], ['List', '.sg-list'], ['Tile', '.sg-tile'], ['Quote', '.sg-quote'], ['Media', '.sg-media'], ['Transcription', '.sg-transcription'], ['Hero', '.sg-hero'], ['Share', '.sg-share'], ['Divider', '.sg-divider']] }));
  };

  S.PrefsDoc = function () {
    return h(D.Section, { id: 'prefs', label: 'Composants', title: 'Préférences et consentement', lead: 'Thème clair/sombre, langues et bandeau cookies.' },
      h(D.Panel, { scene: true, tag: 'Aperçu' },
        scene([
          h('div', { className: 'sg-lang', role: 'group', 'aria-label': 'Langue', style: { display: 'flex', gap: 6 } },
            h('button', { type: 'button', className: 'sg-lang__btn', 'aria-pressed': 'true' }, 'FR'),
            h('button', { type: 'button', className: 'sg-lang__btn', 'aria-pressed': 'false' }, 'EN')),
          h('label', { style: { display: 'inline-flex', alignItems: 'center', gap: 12, color: '#fff' } },
            h('span', { className: 'sg-switch' },
              h('input', { type: 'checkbox', role: 'switch', onChange: function () { SG.toggleTheme(); } }),
              h('span', { className: 'sg-switch__track sg-glass', 'aria-hidden': true }, h('span', { className: 'sg-switch__knob' }))),
            'Paramètres d’affichage'),
          h('div', { className: 'sg-consent sg-glass', role: 'dialog', 'aria-label': 'Consentement', 'data-frosted': true, 'data-rim': true, style: { padding: 16, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' } },
            h('div', null, h('strong', null, 'Cookies'), h('div', null, 'Mesure d’audience anonymisée.')),
            h('div', { style: { display: 'flex', gap: 8 } },
              h('button', { type: 'button', className: 'sg-button sg-glass sg-button--ghost sg-button--sm' }, 'Refuser'),
              h('button', { type: 'button', className: 'sg-button sg-glass sg-button--primary sg-button--sm' }, 'Accepter'))),
        ])),
      h(D.Specs, { head: ['Composant', 'Classe'], rows: [['Lang', '.sg-lang'], ['Theme', 'Switch + data-sg-theme'], ['Consent', '.sg-consent']] }));
  };
})();

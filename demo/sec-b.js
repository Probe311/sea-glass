/* Sea Glass v3 · contenu (2/3) : composants d'action et de sélection */
(function () {
  var SG = window.SG, h = SG.h, Glass = SG.Glass, Icon = SG.Icon, UI = SG.UI, D = SG.Doc, S = SG.S;
  var useState = React.useState;
  var STATES = [['rest', 'Repos'], ['hover', 'Survol'], ['press', 'Appui'], ['focus', 'Focus'], ['dis', 'Désactivé']];
  function st(col) { return col === 'hover' ? { state: 'hover' } : col === 'press' ? { state: 'active' } : col === 'focus' ? { state: 'focus' } : col === 'dis' ? { disabled: true } : {}; }
  function nt(col) { return col === 'rest' ? {} : { tabIndex: -1 }; }

  /* ---------- Boutons ---------- */
  S.Buttons = function () {
    var B = UI.Button;
    function cell(row, col) {
      var s = Object.assign({}, st(col), nt(col));
      if (row === 'primary') return h(B, Object.assign({ variant: 'primary' }, s), h(SG.Icon, { name: 'plus' }), 'Collecter');
      if (row === 'neutral') return h(B, s, 'Mare');
      if (row === 'rect') return h(B, Object.assign({ shape: 'rect' }, s), 'Tide pool');
      return h(B, Object.assign({ variant: 'love', icon: true, 'aria-label': 'Favori', 'aria-pressed': true }, s), h(SG.Icon, { name: 'heart' }));
    }
    var s2 = useState(true), fav = s2[0], setFav = s2[1];
    return h(D.Section, { id: 'boutons', label: 'Composants', title: 'Boutons', lead: 'Trois formes, quatre variantes, trois tailles. L’appui enfonce le galet et déclenche un disque de contact entouré d’ondes concentriques, comme sur la référence.' },
      h(D.Sub, { title: 'Formes et variantes' },
        h(D.Panel, { tag: 'Aperçu', cap: 'Pilule, rectangle arrondi, cercle. Le cœur bascule entre posé et actif.' },
          h(D.Stage, null,
            h(B, { variant: 'primary' }, h(Icon, { name: 'plus' }), 'Collecter'),
            h(B, null, 'Mare'),
            h(B, { shape: 'rect' }, 'Tide pool'),
            h(B, { shape: 'rect', variant: 'primary' }, 'Enregistrer'),
            h(B, { variant: 'ghost' }, 'Annuler'),
            h(B, { variant: 'love', icon: true, 'aria-label': 'Favori', 'aria-pressed': fav, onClick: function () { setFav(!fav); } }, h(Icon, { name: 'heart' }))))),
      h(D.Sub, { title: 'Tailles' },
        h(D.Panel, { tag: 'Aperçu', cap: '40, 48 et 56 px de hauteur. La cible tactile ne descend jamais sous 40 px.' },
          h(D.Stage, null, h(B, { variant: 'primary', size: 'sm' }, 'Petit'), h(B, { variant: 'primary' }, 'Moyen'), h(B, { variant: 'primary', size: 'xl' }, 'Grand'),
            h(B, { variant: 'love', icon: true, size: 'sm', 'aria-label': 'Favori', 'aria-pressed': true }, h(Icon, { name: 'heart' })), h(B, { variant: 'love', icon: true, size: 'xl', 'aria-label': 'Favori', 'aria-pressed': true }, h(Icon, { name: 'heart' }))))),
      h(D.Sub, { title: 'États', text: 'Chaque état est rendu avec les vrais styles du composant.' },
        h(D.Panel, { tag: 'Matrice', cap: 'Variantes × états · cible tactile ≥ 40 px.' }, h(D.Matrix, { corner: 'Variante', cols: STATES, rows: [['primary', 'Principal'], ['neutral', 'Neutre'], ['rect', 'Rectangle'], ['love', 'Cœur']], render: cell }))),
      h(D.Sub, { title: 'Spécifications' },
        h(D.Specs, { head: ['Propriété', 'Valeur', 'Note'], rows: [
          ['Hauteur', '40 · 48 · 56 px', 'Petit, moyen, grand.'], ['Padding horizontal', '18 · 24 · 32 px', 'Nul pour la forme cercle.'],
          ['Rayon', '999 px · 14 px · 50 %', 'Pilule, rectangle, cercle.'], ['Police', 'Poppins 600, 14 · 16 · 18 px', 'Libellé court, verbe à l’infinitif.'],
          ['Survol', 'scale(1.05), +3 % de luminosité', 'Le reflet suit le pointeur.'], ['Appui', 'scale(0.97), ombre interne creusée', 'Disque de contact et deux ondes.'],
          ['Désactivé', 'Opacité 0.45, désaturé', 'Le curseur devient interdit.']] })),
      h(D.Usage, { dos: ['Un seul bouton principal par vue.', 'Un libellé court qui annonce l’action.', 'Réserver la forme cercle aux icônes seules, avec un aria-label.'], donts: ['Mettre deux boutons teintés côte à côte.', 'Utiliser le cœur pour autre chose qu’un favori.', 'Réduire la hauteur sous 40 px.'] }));
  };

  /* ---------- Puces ---------- */
  S.Chips = function () {
    var C = UI.Chip;
    function cell(row, col) {
      var shape = row === 'pill' ? 'pill' : 'rect', s = col === 'hover' ? { state: 'hover' } : col === 'focus' ? { state: 'focus' } : col === 'dis' ? { disabled: true } : {};
      return h(C, Object.assign({ shape: shape, defaultPressed: col === 'sel', tabIndex: -1 }, s), row === 'pill' ? 'Givré' : 'Tide pool');
    }
    return h(D.Section, { id: 'puces', label: 'Composants', title: 'Puces', lead: 'La pilule sert aux filtres cumulables : une coche apparaît quand elle est active. Le rectangle arrondi sert aux options.' },
      h(D.Panel, { tag: 'Aperçu', cap: 'Clique pour activer ou désactiver.' }, h(D.Stage, null, h(C, { defaultPressed: true }, 'Givré'), h(C, null, 'Mare'), h(C, { shape: 'rect' }, 'Tide pool'), h(C, { shape: 'rect', defaultPressed: true }, 'Récif'))),
      h(D.Panel, { tag: 'États', cap: 'Pilule et rectangle · coche à l’activation.' }, h(D.Matrix, { corner: 'Forme', cols: [['rest', 'Repos'], ['hover', 'Survol'], ['sel', 'Sélectionnée'], ['focus', 'Focus'], ['dis', 'Désactivée']], rows: [['pill', 'Pilule'], ['rect', 'Rectangle']], render: cell })),
      h(D.Specs, { head: ['Propriété', 'Valeur', 'Note'], rows: [['Hauteur', '36 px', 'Texte Roboto 500, 14 px.'], ['Rayon', '999 px ou 12 px', 'Pilule ou rectangle.'], ['Sélection', 'Teinte seafoam + coche 16 px', 'Le padding gauche se réduit de 6 px.']] }));
  };

  /* ---------- Interrupteur ---------- */
  S.Toggle = function () {
    var T = UI.Toggle;
    function cell(row, col) {
      var s = col === 'hover' ? { state: 'hover' } : col === 'press' ? { state: 'active' } : col === 'focus' ? { state: 'focus' } : col === 'dis' ? { disabled: true } : {};
      return h(T, Object.assign({ checked: row === 'on', 'aria-label': 'Interrupteur' }, s));
    }
    return h(D.Section, { id: 'interrupteur', label: 'Composants', title: 'Interrupteur', lead: 'Un rail de verre et une grosse poignée ronde, creusée comme un galet. Éteint, le rail est blanc et la poignée grise. Allumé, le rail passe en seafoam et la poignée en vert d’eau profond. À l’appui, la poignée s’étire.' },
      h(D.Panel, { tag: 'Aperçu', cap: 'Interactif : clique ou utilise la barre d’espace.' },
        h(D.Stage, { style: { gap: 32 } }, [['Marée', false], ['Houle', true]].map(function (t) { return h('label', { key: t[0], className: 'lab', style: { display: 'inline-flex', alignItems: 'center', gap: 12 } }, h(T, { defaultChecked: t[1], 'aria-label': t[0] }), t[0]); }))),
      h(D.Panel, { tag: 'États', cap: 'Éteint / allumé · poignée étirée à l’appui.' }, h(D.Matrix, { corner: 'Valeur', cols: STATES, rows: [['off', 'Éteint'], ['on', 'Allumé']], render: cell })),
      h(D.Specs, { head: ['Propriété', 'Valeur', 'Note'], rows: [['Rail', '68 × 40 px, pilule', 'Verre teinté seafoam quand allumé.'], ['Poignée', '28 px, marge 6 px', 'Dégradé radial et ombre interne : elle paraît creusée.'], ['Course', '28 px', 'Ressort en 400 ms.'], ['Appui', 'Largeur 36 px', 'La poignée s’étire avant de partir.']] }));
  };

  /* ---------- Cases et radios ---------- */
  S.Checks = function () {
    var K = UI.Checkbox, R = UI.Radio;
    function cell(row, col) {
      var s = col === 'hover' ? { state: 'hover' } : col === 'focus' ? { state: 'focus' } : col === 'dis' ? { disabled: true } : {};
      if (row === 'cb0') return h(K, s);
      if (row === 'cb1') return h(K, Object.assign({ defaultChecked: true }, s));
      if (row === 'cb2') return h(K, Object.assign({ indeterminate: true }, s));
      return h(R, Object.assign({ name: 'm' + row + col, checked: row === 'rb1', onChange: function () {} }, s));
    }
    return h(D.Section, { id: 'cases', label: 'Composants', title: 'Cases et radios', lead: 'Même galet de verre que l’interrupteur. Coché, la case devient un galet de teal profond avec une coche blanche très contrastée ; le radio reçoit un point blanc. Non coché, l’élément est creusé et cerclé.' },
      h(D.Panel, { tag: 'Aperçu', cap: 'Interactif. Les radios se déplacent aux flèches du clavier.' },
        h('div', { className: 'g2' },
          h('div', { className: 'stack' }, h('span', { className: 'label' }, 'Cases'), h(K, { defaultChecked: true }, 'Coquillages'), h(K, null, 'Algues'), h(K, { disabled: true }, 'Épaves')),
          h('div', { className: 'stack' }, h('span', { className: 'label' }, 'Radios'), h(UI.RadioGroup, { label: 'Zone', options: ['Rivage', 'Crique', 'Récif'] })))),
      h(D.Panel, { tag: 'États', cap: 'Case, indéterminée, radio · coche blanche sur teal.' }, h(D.Matrix, { corner: 'Valeur', cols: [['rest', 'Repos'], ['hover', 'Survol'], ['focus', 'Focus'], ['dis', 'Désactivé']], rows: [['cb0', 'Case vide'], ['cb1', 'Case cochée'], ['cb2', 'Indéterminée'], ['rb0', 'Radio vide'], ['rb1', 'Radio choisi']], render: cell })),
      h(D.Specs, { head: ['Propriété', 'Valeur', 'Note'], rows: [['Taille', '24 px', 'Zone cliquable étendue au libellé.'], ['Rayon', '8 px · 50 %', 'Case et radio.'], ['Fond coché', 'Dégradé #308069 → #256B5A', 'Teal profond : la coche blanche ressort à 4,7:1 minimum.'], ['Coche', 'Blanche, trait 3 px, tracé en 260 ms', 'Ombre fine pour détacher le trait du fond.'], ['Point du radio', 'Blanc, 10 px, ressort', 'Même fond teal profond que la case.'], ['Non coché', 'Creux, contour 1,5 px', 'Lumière inversée, contour encre à 62 %.'], ['Survol', 'scale(1.05) + halo', 'Pas de déplacement vertical.']] }));
  };

  /* ---------- Curseur et progression ---------- */
  S.Slider = function () {
    function cell(row, col) {
      var s = col === 'hover' ? { state: 'hover' } : col === 'press' ? { state: 'press' } : col === 'focus' ? { state: 'focus' } : col === 'dis' ? { disabled: true } : {};
      return h('div', { style: { width: '100%', minWidth: 0 } }, h(UI.Slider, Object.assign({ value: 45, unit: ' m', 'aria-label': 'Profondeur' }, s)));
    }
    var tones = [['seafoam', 'Seafoam · défaut', 72, undefined], ['aqua', 'Aqua · information', 48, undefined], ['amber', 'Amber · attention', 86, undefined], ['ruby', 'Ruby · critique', 94, undefined]];
    return h(D.Section, { id: 'curseur', label: 'Composants', title: 'Curseur et progression', lead: 'Le rail est un givre translucide. Le remplissage seafoam et la poignée forment une seule matière : une capsule mint continue, qui grossit à l’appui sans jamais devenir un carré. Option pipette : un bulbe à gauche de la capsule.' },
      h(D.Sub, { title: 'Variantes' },
        h(D.Panel, { tag: 'Aperçu', cap: 'Glisse, clique sur le rail, ou utilise les flèches, Début, Fin, Page haut et Page bas.' },
          h('div', { className: 'g2' },
            h(UI.Slider, { label: 'Profondeur', value: 40, unit: ' m' }),
            h(UI.Slider, { label: 'Pipette', value: 55, unit: ' m', thumb: 'pipette' }),
            h(UI.Slider, { label: 'Plage de marée', range: true, value: [20, 70], unit: ' %' }),
            h(UI.Slider, { label: 'Houle', value: 30, min: 0, max: 100, step: 10, marks: true, unit: ' cm' }),
            h(UI.Slider, { label: 'Désactivé', value: 25, unit: ' m', disabled: true })))),
      h(D.Sub, { title: 'États', text: 'Défaut = capsule mint continue. Appui = même matière, bout un peu plus large. Le focus n’apparaît qu’au clavier.' },
        h(D.Panel, { tag: 'Matrice', cap: 'Curseur · capsule mint continue.' }, h(D.Matrix, { tall: true, corner: 'Composant', cols: [['rest', 'Défaut'], ['hover', 'Survol'], ['press', 'Appui'], ['focus', 'Focus'], ['dis', 'Désactivé']], rows: [['s', 'Curseur']], render: cell }))),
      h(D.Sub, { title: 'Progression', text: 'Les barres gardent un rail creusé (sémantique différente du curseur interactif) et le même verre de remplissage. Quatre teintes, trois tailles, tampon, indéterminé et anneau.' },
        h(D.Panel, { tag: 'Barres', cap: 'Le remplissage rebondit légèrement à l’arrivée. Le mode indéterminé n’anime que transform.' },
          h('div', { className: 'g2' },
            h(UI.Progress, { label: 'Collection', value: 60, showValue: true }),
            h(UI.Progress, { label: 'Téléchargement', value: 38, buffer: 70, showValue: true }),
            h(UI.Progress, { label: 'Synchronisation', indeterminate: true, showValue: true }),
            h('div', { className: 'stack', style: { gap: 12 } }, [['sm', 'Petite · 10 px'], ['md', 'Moyenne · 18 px'], ['lg', 'Grande · 26 px']].map(function (z) {
              return h('div', { key: z[0], className: 'stack', style: { gap: 4 } }, h('span', { className: 'label' }, z[1]), h(UI.Progress, { label: z[1], value: 64, size: z[0] === 'md' ? undefined : z[0] }));
            })))),
        h(D.Panel, { tag: 'Teintes et anneau', cap: 'Progression teintée et anneau circulaire.' },
          h('div', { className: 'g2' },
            h('div', { className: 'stack', style: { gap: 14 } }, tones.map(function (t) { return h(UI.Progress, { key: t[0], label: t[1], value: t[2], tone: t[0] === 'seafoam' ? undefined : t[0], showValue: true }); })),
            h('div', { className: 'stage center', style: { gap: 28 } }, [18, 64, 100].map(function (v) { return h('div', { key: v, className: 'stack', style: { justifyItems: 'center', gap: 8 } }, h(UI.Ring, { value: v, size: 84, label: 'Complétion ' + v + ' %' }), h('span', { className: 'label' }, v === 100 ? 'Terminé' : v + ' %')); }))))),
      h(D.Specs, { head: ['Propriété', 'Valeur', 'Note'], rows: [
        ['Rail (curseur)', '20 px, givre + liseré blanc', 'Translucide ; pas de modèle creusé.'],
        ['Course', 'Bornée par 10 px de chaque côté', 'Alignée sur le centre de la capsule.'],
        ['Repos', 'Capsule 14 × 36 px, mint', 'Congés + blob soudent fill et poignée.'],
        ['Pipette', 'thumb="pipette"', 'Bulbe mint à gauche de la capsule.'],
        ['Appui', 'Bout mint ~28 px (pilule)', 'Même matière ; halo soft ; bulle de valeur.'],
        ['Plage', 'Deux capsules', 'Sans gonflement (lisibilité des deux poignées).'],
        ['Paliers', 'Jusqu’à 20 crans', 'Les crans atteints passent en vert.'],
        ['Clavier', '← → ↑ ↓, Début, Fin, PgUp, PgDn', 'role="slider", aria-valuenow, aria-valuetext.'],
        ['Barre de progression', '10 · 18 · 26 px, rail creusé', 'Remplissage à 2 px du bord ; distinct du curseur.'],
        ['Anneau', '72 px par défaut', 'SVG, trait de 3,6 unités, valeur au centre.']] }),
      h(D.Usage, { dos: ['Afficher la valeur courante dans l’en-tête et dans la bulle.', 'Utiliser les paliers quand les valeurs sont peu nombreuses.', 'Réserver le mode indéterminé aux durées inconnues.'], donts: ['Employer un curseur pour une valeur à saisir précisément : prévois un champ.', 'Mélanger plusieurs teintes de progression sur la même vue.', 'Animer la largeur d’une barre indéterminée : seul transform est animé.'] }));
  };

  /* ---------- Onglets ---------- */
  S.Tabs = function () {
    var items = [{ id: 'shore', label: 'Rivage', panel: 'À marée basse, la zone de rivage découvre les galets et les premières mares.' }, { id: 'cove', label: 'Crique', panel: 'La crique abrite l’eau calme : c’est là que le verre de mer s’accumule.' }, { id: 'reef', label: 'Récif', panel: 'Le récif reste immergé. Les observations y sont plus rares.' }];
    return h(D.Section, { id: 'onglets', label: 'Composants', title: 'Onglets', lead: 'Reconstruits autour du clavier : un seul onglet dans l’ordre de tabulation, flèches pour naviguer, Début et Fin pour les extrémités. Le galet de sélection glisse avec un ressort et se recale quand la taille ou la police change.' },
      h(D.Sub, { title: 'Onglets à galet' },
        h(D.Panel, { tag: 'Aperçu', cap: 'role="tablist" · activation automatique au focus.' }, h(UI.Tabs, { items: items, label: 'Zones' }))),
      h('div', { className: 'g2' },
        h(D.Sub, { title: 'Onglets à trait' }, h(D.Panel, { tag: 'Aperçu', cap: 'Indicateur bas · flèches clavier.' }, h(UI.Tabs, { items: items, variant: 'line', label: 'Zones, variante à trait' }))),
        h(D.Sub, { title: 'Contrôle segmenté' }, h(D.Panel, { tag: 'Aperçu', cap: 'Choix exclusif sans panneau : role="radiogroup".' }, h(D.Stage, { col: true }, h(UI.Segmented, { label: 'Zone', options: ['Rivage', 'Crique', 'Récif'] }), h(UI.Segmented, { label: 'Vue', options: ['Jour', 'Semaine', 'Mois', 'Année'] }))))),
      h(D.Specs, { head: ['Touche', 'Action', 'Note'], rows: [['Tab', 'Entre dans la liste, puis en sort', 'Un seul onglet est focusable à la fois.'], ['← →', 'Onglet précédent ou suivant', 'Boucle aux extrémités.'], ['Début · Fin', 'Premier ou dernier onglet', ''], ['Entrée · Espace', 'Active l’onglet', 'Déjà actif si l’activation est automatique.']] }));
  };
})();

# Audit Sea Glass — état au 12/10/2026

Périmètre : `src/` (dézippé de `seaglass.zip`) — `glass.css` (168 l.), `ui.css` (249 l.), `layout.css` (206 l.), `core.js` (132), `ui.js` (230), `ui2.js` (99), `sec-a.js` (206), `sec-b.js` (145), `sec-c.js` (149), `index.html` (49). Les références sont `fichier:ligne`.

Légende priorité : **P0** bloquant pour une v1 publiable · **P1** important · **P2** confort / polish.

---

## 0. Synthèse

Le projet est un **site de documentation React 18 (UMD via CDN, `React.createElement` sans JSX)** qui embarque un mini design system. Ce n'est pas du « vanilla JS » : tout composant dépend de `window.React` (`core.js:3`, `index.html:41-42`). Le matériau `.lg` (glass.css) est solide et original (modèle de lumière unique, 6 propriétés en `data-*`), mais :

1. **Pas de séparation lib / doc** : composants, CSS de doc et contenu sont mélangés et exposés via un global `window.SG` (`core.js:5`).
2. **Tokens incomplets et incohérents** : espacements, durées, typo, z-index, ombres non tokenisés ; la doc affiche des valeurs qui n'existent pas ou diffèrent du CSS.
3. **Thème sombre dupliqué 2 à 3 fois** et bugs de sélecteurs en mode « système sombre ».
4. **Accessibilité partielle** : bonnes bases (ARIA tabs/slider, focus-visible, reduced-motion), mais aucun `prefers-reduced-transparency`, `prefers-contrast`, `forced-colors` ; contraste sur verre non garanti au-dessus d'images ; plusieurs widgets incomplets (checkbox indéterminée, tooltip, drawer).
5. **Perf** : `Glass` active `frosted`+`refractive`+`alive`+`rim`+`glow` **par défaut** ; filtre SVG de réfraction + détection par UA sniffing.
6. **Collision de nommage** `.pg.lg` (progress grande taille) vs `.lg` (matériau).
7. **Dette CSS** : `layout.css` redéfinit en seconde moitié presque tout ce qu'il déclare en première moitié.

---

## 1. Architecture — P0

| Constat | Réf. |
|---|---|
| Chargement par globals et ordre de `<script>` (core → ui → ui2 → sec-*), IIFE partageant `window.SG`. Pas de modules ES, pas de build, pas de tree-shaking. | `core.js:2-6`, `ui.js:3`, `index.html:43-48` |
| Dépendance React 18 via cdnjs alors que la doc annonce « sans dépendance » / « vanilla ». | `index.html:41-42`, `sec-a.js:65`, `sec-c.js:119` |
| `index.html` malformé : un `<head>` injecté avec un `<style>` d'outil d'aperçu (`font:14px -apple-system`, `background:#fff`), puis `<title>` et `<link>` **dans le `<body>`**, `charset=utf8`, pas de `lang`. | `index.html:1-9` |
| Composants de librairie et helpers de doc dans le même fichier (`SG.Doc` dans `ui2.js`). | `ui2.js:49-98` |
| CSS de doc (`layout.css`) définit aussi des resets globaux (`*`, `body`, `h1..p`, `:focus-visible`) qui fuiraient chez un consommateur. | `layout.css:2-11` |
| Composants « démo » non réutilisables : `Search` et `NavBar` ont textes, icônes et items codés en dur, aucune prop. | `ui2.js:17-40` |
| Polices : `Google Sans` chargée depuis Google Fonts (licence non open, disponibilité non garantie) + Outfit + Roboto + Roboto Mono = 2 requêtes bloquantes. | `index.html:5-6`, `glass.css:14-16` |
| Image de décor externe Unsplash en dur dans un token. | `layout.css:197` |
| Versionnage incohérent : en-têtes « v3 », « v4 », UI « v5.0 ». | `glass.css:1`, `ui.css:1`, `sec-a.js:58,63`, `sec-c.js:145` |

## 2. Tokens

### 2.1 Couleurs — P1
- Bonne base : sol/encre (`--ground`, `--ink-1..3`, `--line`, `--focus`), 12 « galets » + 12 encres (`glass.css:51-56`).
- **Pas de couche sémantique** (primary, success, warning, danger, info, surface, on-surface…) : les composants pointent directement des couleurs brutes (`--ruby`, `--teal`, `seafoam` en dur dans JS : `ui.js:34,43,53`, `ui2.js:12,38,47`).
- **Encres sombres incomplètes** : seules 6/12 encres sont redéfinies en sombre (`glass.css:73`) — citron, cornflower, lavender, rootbeer, clear, mist gardent une encre foncée sur fond sombre.
- Couleurs RGB dupliquées en JS (`core.js:8-15`) et en CSS (`glass.css:51-53`) → désynchronisation possible.
- Nombreuses couleurs hex en dur hors tokens : `#308069/#256B5A` (`ui.css:238`, `layout.css:189`), `#A4402F` (`ui.css:192`), `#10302A/#EAF6F2` (`layout.css:90-92`), knob `#D3D9D8/#AFB8B6` (`ui.css:44`), fills `#B6E5D6/#8CCDB7` (`ui.css:74`), teintes progress (`ui.css:144-146`), `#B23A28` (`layout.css:190`), `.res.ok/.ko` (`ui.css:229-230`).
- Mélange de formats : `rgba()`, `rgb(r g b / a)`, triplets `"r, g, b"` (`--drop`, `--shade`, `--fg`) et `"r g b"` (`--tint`, `--glow`) → deux conventions incompatibles (`glass.css:26-27` vs `94-96`, `ui.css:74`).

### 2.2 Espacements — P0
- Documentés `--s1..--s8` (4→72 px) mais **jamais définis** dans le CSS (`sec-a.js:183,189`). Tous les paddings/gaps sont en px littéraux.

### 2.3 Rayons — P1
- `--r-sm/md/lg/xl/pill` définis (`glass.css:58`) mais **presque jamais utilisés** : les composants réécrivent `--lg-r: 999px / 14px / 12px / 16px / 28px / 10px / 22px` (`ui.css:5-6,31-32,163,183,207,211,213-214,219`). La doc parle de `xs` alors que le token s'appelle `--r-sm` (`sec-a.js:182`).

### 2.4 Flous / matière — P1
- `--lg-blur` réglé par composant : 0, 4, 6, 8, 10, 12, 16 px (`glass.css:93`, `ui.css:5,31,59,163,183,193,199,211-213,220`) sans échelle nommée. JSON de doc dit `blur: 14` (`sec-c.js:111`) ≠ 12 dans le CSS.
- Variable `--gl` posée partout (`ui.css:5,7,31,59,163,...`, `sec-a.js:83,96`) mais **lue nulle part** (variable morte). Idem `.lg-gloss` (`ui.css:16`) et prop `gloss` (`core.js:94`).

### 2.5 Ombres / élévation — P1
- Pas d'échelle d'élévation : `--sh-in/--sh-out` recalculées par variante, dizaines de `box-shadow` littéraux (`ui.css:19,44-49,83,93,105,112,141`). Pas de tokens `--elevation-0..5`.

### 2.6 Typographie — P1
- Seulement 3 familles. Échelle documentée (32/24/20/16/14/12, `sec-a.js:166-172`) **non tokenisée** ; tailles en dur partout (13, 15, 17, 19, 21, 22 px…). La doc dit « Outfit pour les titres » mais `--font-display` met `Google Sans` en premier (`glass.css:14`).

### 2.7 Motion — P1
- `--ease` et `--spring` définis (`glass.css:59-60`). Durées documentées 120/200/380 ms (`sec-a.js:195`, `sec-c.js:112`) mais **aucun token** ; durées réelles disparates : 140, 160, 180, 200, 220, 240, 260, 320, 380, 400, 420, 760 ms, 1.7 s.

### 2.8 Doc ≠ code — P0
- Export CSS de la doc (`sec-c.js:84-103`) : `--ground: #F4F3EE` (réel `#F6FAF7`, `glass.css:19`), sombre `#0B1513` (réel `#0F1513`), `--lg-r: 28px` présenté comme global alors qu'il est local à `.lg`. L'export « CSS » est un résumé incomplet, pas la source.

## 3. Composants existants (liste exhaustive)

| Composant | API (props) | Fichiers | Remarques |
|---|---|---|---|
| **Glass** (matériau) | `as, frosted, refractive, alive, rim, tint, tintA, glow, glowColor, innerRef, className, style` (+ classes `carved`, `over`) | `core.js:85-107`, `glass.css:91-168` | Toutes les props booléennes **vraies par défaut** (`core.js:87,100-105`). `innerRef` au lieu de `forwardRef`. |
| **Pebble** (blob décoratif) | `name, color, seed` | `core.js:110-131`, `layout.css:140-146` | Animation infinie par composant. |
| **Icon** | `name, size` | `core.js:51`, sprite `index.html:16-37` | 13 icônes Material, sprite inline obligatoire dans la page hôte. |
| **Button** | `variant: neutral/primary/ghost/love`, `shape: pill/rect/circle`, `size: sm/—/xl`, `icon, disabled, state, aria-label, aria-pressed, onClick, tabIndex` | `ui.js:9-37`, `ui.css:5-28` | Ripple en DOM manuel ; `type` forcé à `button` (pas de submit) ; pas de `loading`, pas de rendu en lien (`href`). Variante `love` très spécifique. |
| **Chip** | `shape, defaultPressed, disabled, state` | `ui.js:40-45`, `ui.css:30-37` | Non contrôlable (pas de `pressed`/`onChange`). |
| **Toggle (switch)** | `checked, defaultChecked, onChange(bool), disabled, state, aria-label` | `ui.js:48-55`, `ui.css:39-54` | OK (input natif `role=switch`). Pas de `label` intégré. |
| **Checkbox** | `defaultChecked, indeterminate, disabled, state, children` | `ui.js:58-66`, `ui.css:56-71,238-239` | Non contrôlable ; `indeterminate` purement visuel (pas de `input.indeterminate`). |
| **Radio / RadioGroup** | `name, checked, onChange, disabled` / `label, options, value` | `ui.js:69-80` | RadioGroup sans `onChange`, layout via classe de doc `stage`. |
| **Slider** | `label, aria-label, value, min, max, step, range, marks, unit, disabled, state, onChange` | `ui.js:83-149`, `ui.css:73-132` | Bon pattern ARIA ; `value` = valeur initiale uniquement (non contrôlé) ; pas de `name`/input caché pour formulaires ; pas de vertical/RTL. |
| **Progress** | `value, buffer, indeterminate, size: sm/—/lg, tone: aqua/amber/ruby, label, showValue` | `ui.js:152-160`, `ui.css:134-151` | `size="lg"` ⇒ classe `.pg.lg` qui **active le matériau `.lg`** (collision, `ui.css:137`). |
| **Ring** (progress circulaire) | `value, size, label` | `ui.js:161-169`, `ui.css:153-160` | Pas d'indéterminé. |
| **Tabs** | `items[{id,label,icon,panel,disabled}], value, variant: pill/line/doc, label, keep, className` | `ui.js:172-225`, `ui.css:162-177`, `layout.css:165-172` | Non contrôlé (pas d'`onChange`), activation auto uniquement. `disabled` non sauté au clavier. |
| **Segmented** | `options, value, label, onChange` | `ui.js:226-229` | Options = strings seulement. |
| **Field (text input)** | `label, placeholder, value(default), help, invalid, disabled, state` | `ui2.js:7-15`, `ui.css:179-191` | `type` figé à `text`, non contrôlé, pas de `required`, préfixe/suffixe, textarea. |
| **Search** | aucune | `ui2.js:17-23`, `ui.css:193-198` | Démo codée en dur. |
| **NavBar** (bottom nav) | aucune | `ui2.js:25-40`, `ui.css:199-204` | Démo codée en dur ; boutons avec `aria-current="page"` au lieu de liens. |
| **Card** | `tint, style, children` | `ui2.js:42`, `ui.css:207-210` | Styles des enfants `h4/p/.kv` imposés. |
| **Badge** | `tint, dot, children` | `ui2.js:43-45`, `ui.css:211-212` | — |
| **Tip** (tooltip) | `children` | `ui2.js:46`, `ui.css:213` | Statique : pas de déclencheur, positionnement, `aria-describedby`, délai, Échap. |
| **Snack** (snackbar) | `children, action` | `ui2.js:47`, `ui.css:214` | Pas de région live, pas d'auto-dismiss. |
| **Toast** (global) | `SG.toast(msg)` via `CustomEvent` | `core.js:38`, `sec-c.js:126-133`, `ui.css:215-216` | Un seul message à la fois, 1,6 s fixe. |
| Shell doc : AppBar, Side (drawer), Hero, Section/Sub/Panel/Stage/Specs/Usage/Matrix/Code | — | `sec-a.js:33-69`, `ui2.js:49-98`, `layout.css` | Spécifique au site de doc. |
| Utilitaires : `SG.useTheme/isDark/toggleTheme/cssVar/copy/toast` | — | `core.js:20-49` | Thème non persisté (pas de stockage), pas de `data-theme="system"`. |

Comptage : la doc annonce « 13 composants » (`sec-a.js:65,68`) ; on en compte ~20 publics, dont 2 démos non paramétrables.

## 4. API et nommage — P1

- Classes courtes et génériques à fort risque de collision : `.lg`, `.btn`, `.sl`, `.pg`, `.cb`, `.tgl`, `.ring`, `.card`, `.badge`, `.tip`, `.row`, `.stack`, `.label`, `.field`, `.help`, `.res`, `.ind`, `.box`, `.dot`, `.on`, `.dis`, `.off`. Aucun préfixe (`sg-`) hormis `sg-refract`.
- États hétérogènes : `.on`, `.dis`, `.is-hover`, `.is-active`, `.is-press`, `.drag`, `.act`, `aria-pressed`, `aria-checked`, `[disabled]` — `state="active"` pour Button/Toggle mais `state="press"` pour Slider (`sec-b.js:6,62,94`).
- Tailles : `sm`/`xl` pour Button, `sm`/`lg` pour Progress, pas de `md` explicite.
- Langue mélangée : props anglaises, classes abrégées françaises/anglaises (`nb`, `kv`, `gl`, `ct`, `mo`), textes par défaut en français codés en dur (« En cours », « Plage », « Copié » : `ui.js:141,159`, `core.js:46`) → pas d'i18n.
- Composants non contrôlés pour la plupart (Chip, Checkbox, RadioGroup, Tabs, Field, Slider) : incompatibles avec des formulaires React classiques.
- Props `state` de démo (forcer hover/focus) exposées dans l'API publique : utile pour la doc, à isoler.

## 5. Cohérence / dette / duplications — P1

- **Thème sombre écrit 2 fois à l'identique** (`glass.css:63-76` et `77-88`), puis encore pour `.sl/.pg/.ring` (`ui.css:75-76`), `--tonal` (`layout.css:19-20`), `.scene .lg` (`layout.css:91-92`), `.scene` (`layout.css:200-201`). → utiliser `light-dark()` ou un seul bloc partagé.
- **Bugs en mode système sombre** : les sélecteurs `:root:not([data-theme="dark"])` considèrent le thème « système sombre » comme clair → `.help.err` (`ui.css:192`), `.m3tabs` (`layout.css:169,172`) prennent les couleurs claires sur fond sombre.
- Règle inutile : `.navbar .nb[aria-current]` redéclarée identique en sombre (`ui.css:203`).
- `layout.css` en deux passes contradictoires : `.doc-hero` (`61-63` vs `149-152`), `.sec` (`73` vs `155`), `.sec-head` (`74` vs `156`), `.panel` (`85` vs `175`), `.panel-cap` (`87` vs `176`), `.scene` (`89` vs `177`, `198`), `.specs` (`105-110` vs `181-184`), `.use` (`116-120` vs `187-192`), `.meta` (`64,66` vs `153-154`), `pre.code`, `footer.end`.
- `ui.css` : surcharges en fin de fichier qui contredisent le haut (`.tabs-list .tab:focus-visible` `169` vs `235`; `.cb.on .box` `238`; échelle `--hs/--as` `248-249`).
- Logique de « pilule glissante » dupliquée : `useSlide` (`ui.js:172-189`) vs mesure inline de `NavBar` (`ui2.js:27-36`). `cls()` dupliqué (`ui.js:6`, `ui2.js:5`).
- `!important` multiples (`ui.css:21-22,90,121,194,183`) et styles inline massifs dans le contenu (`sec-a.js:83-111,174-189`).
- Contraste calculé côté doc avec un algorithme sRGB maison (`sec-c.js:47-51`) — à sortir en script de test.

## 6. Accessibilité

### 6.1 Contraste sur verre — P0
- Le tableau de contraste (`sec-c.js:53-81`) mélange teinte et **sol uni** uniquement. Au-dessus d'une photo (`.scene`, verre à `--ga-scene: 0.26`, `glass.css:31`) le contraste n'est **pas garanti** ; la doc le reconnaît (« vérifie au cas par cas »). Il faut un plancher d'opacité/scrim ou un mode « texte sur verre » robuste.
- `--ink-3 #566568` sur `--ground` ≈ OK, mais sur `.panel-cap` / `--surf` et sur verre à 0.74 non vérifié.
- Thème sombre : verre à `--ga: 0.08` (`glass.css:69`) ⇒ quasi transparent ; contraste dépend entièrement du décor.
- `.btn.love.off { color: var(--ruby) }` (#E07662 sur verre clair ≈ 3:1) — limite pour icône, insuffisant pour du texte.
- États désactivés à `opacity: .45` + grayscale : acceptable (exempté WCAG) mais illisible sur verre.

### 6.2 Focus — P1
- Bon : `:focus-visible` global 2 px / offset 3 (`layout.css:11`), anneaux dédiés toggle/checkbox/slider.
- `Button` n'a pas de style `:focus-visible` propre (seulement `.is-focus` de démo, `ui.css:20`) : il dépend du reset **de la doc** (`layout.css:11`) ⇒ perdu hors doc. Et `overflow: hidden` sur `.btn` n'empêche pas l'outline mais l'outline est sous `transform: scale()`.
- Focus blanc `#fff` en dur pour Search/NavBar (`ui.css:198,204`) : invisible si le composant est posé sur fond clair.
- `.sl-thumb:focus-visible { outline: none !important }` puis report sur `.stem` (`ui.css:90,117`) : OK mais fragile.

### 6.3 ARIA / sémantique — P1
- Checkbox indéterminée : pas de `input.indeterminate = true` ni `aria-checked="mixed"` (`ui.js:58-66`).
- Tooltip `role="tooltip"` sans élément déclencheur ni `aria-describedby` (`ui2.js:46`).
- Snack sans `role="status"` (`ui2.js:47`).
- Drawer mobile : pas de piège de focus, pas d'`aria-modal`/`inert` sur le contenu, focus non restitué ; `visibility:hidden` OK (`sec-a.js:47-59`, `layout.css:53-56`).
- NavBar : `button` + `aria-current="page"` → doivent être des `<a>` (`ui2.js:39`).
- Tabs : onglets `disabled` atteints par les flèches puis focus perdu (`ui.js:194-204`) ; panneaux `keep` sans `tabIndex` (`ui.js:222`).
- Slider : nom accessible absent si ni `label` ni `aria-label` ; pas d'`aria-orientation`.
- Ring : `role=progressbar` + texte `%` visible dupliqué pour le lecteur d'écran (mettre le span en `aria-hidden`).
- `index.html` sans `lang="fr"` ; `<title>` dans `<body>`.
- Cibles : chips 36 px (`ui.css:31`), checkbox 24 px (label étend la cible, OK) ; WCAG 2.2 cible ≥ 24 px respecté, 44 px recommandé non.

### 6.4 Préférences utilisateur — P0
- `prefers-reduced-motion` : présent mais partiel (`glass.css:168`, `ui.css:149`, `layout.css:146`, `ui.js:16`). **Non couvert** : transitions ressort de toggle/slider/tabs/navbar/toast, `scroll-behavior: smooth` (`layout.css:3`), reflet au pointeur (`core.js:73-81`).
- `prefers-reduced-transparency` : **absent** (aucune occurrence). Critique pour un système glassmorphism.
- `prefers-contrast: more` et `forced-colors: active` : **absents**. En mode contraste forcé Windows, les galets (fonds en dégradés, outline via box-shadow) perdent bordures et états.

## 7. Thèmes clair / sombre — P1
- Mécanisme correct (`prefers-color-scheme` + `data-theme` forcé, `core.js:23-35`), mais : duplication (§5), encres incomplètes (§2.1), bugs `:not([data-theme=dark])` (§5), pas de persistance du choix, pas d'API pour thèmes de marque (couleur primaire configurable), `seafoam` codé en dur comme couleur d'action dans le JS.

## 8. Performance (backdrop-filter) — P0/P1
- **P0** `Glass` active `frosted` et `refractive` par défaut (`core.js:100-101`). La règle CSS limite le flou à `.scene`/`.over` (`glass.css:118-126`) — bonne idée — mais sur une page « tout en scène » chaque bouton/chip/badge crée une couche `backdrop-filter` (+ `saturate`, `brightness`).
- Réfraction : `backdrop-filter: url(#sg-refract)` avec `feTurbulence + feDisplacementMap` (`index.html:18-22`, `glass.css:123-126`) : très coûteux, Chromium only ; détection par **UA sniffing** `/Chrome\//` (`index.html:12`) — Edge/Opera/Brave OK, mais faux positifs possibles ; préférer `@supports`.
- `isolation: isolate` + 2 pseudo-éléments + `mix-blend-mode: soft-light` par élément `.lg` (`glass.css:107,129-154`).
- Transitions de `background` et de propriétés `@property` (`--mx/--my/--ang`) à chaque `pointermove` ⇒ repaint ; bien rAF-throttlé (`core.js:73-80`) ✔.
- Animations infinies de `border-radius` sur 12+ blobs (`layout.css:143-145`) : repaint continu.
- `body::before` bruit SVG plein écran `position: fixed` (`layout.css:5-6`).
- 2 feuilles Google Fonts bloquantes, React prod depuis CDN tiers.

## 9. Compatibilité navigateurs — P1
- `backdrop-filter` : préfixe `-webkit-` présent ✔ (Safari). `url()` dans backdrop-filter : Chromium uniquement.
- `@property` (Chrome 85+, Safari 16.4+, Firefox 128+) ; `color-mix()` (2023+) ; `mask-composite: exclude` (+ `-webkit-mask-composite: xor`) ✔ ; `text-wrap: balance` ; `useSyncExternalStore`/`useId` ⇒ React 18 minimum.
- Pas de fallback quand `backdrop-filter` n'est pas supporté (`@supports not`) : le verre sur `.scene` à 0.26 d'opacité devient alors illisible.
- Pas de cible navigateurs déclarée (browserslist).

## 10. Points forts à conserver
- Modèle de lumière unique et documenté (`glass.css:1-7`), cohérent entre objet posé et creusé (`--carved`).
- Matériau piloté par attributs `data-*` composables : excellente base pour une API framework-agnostique.
- Flou restreint aux zones avec décor (`glass.css:116-121`) — bonne intuition perf.
- Patterns clavier tabs/slider conformes ARIA APG ; `role="switch"` natif.
- Contraste calculé en direct par thème ; matrices d'états rendues avec les vrais composants.

---

## 11. Constats priorisés (récapitulatif)

| # | Prio | Constat | Réf. |
|---|---|---|---|
| 1 | P0 | Séparer librairie (CSS + composants) du site de doc ; modules ES, build, package | `core.js:5`, `index.html` |
| 2 | P0 | Source unique de tokens (JSON/DTCG) → CSS vars ; ajouter espacement, durées, typo, élévation, z-index ; aligner doc | `sec-a.js:183`, `sec-c.js:84-115` |
| 3 | P0 | `prefers-reduced-transparency`, `prefers-contrast`, `forced-colors`, fallback `@supports not (backdrop-filter)` | — |
| 4 | P0 | Garantir le contraste texte sur verre au-dessus d'images (opacité plancher / scrim / tokens « on-glass ») | `glass.css:31,69` |
| 5 | P0 | Défauts `Glass` coûteux (refractive/frosted on) ; remplacer UA sniffing par `@supports` | `core.js:100-101`, `index.html:12` |
| 6 | P0 | Préfixer les classes (`sg-`) et corriger la collision `.pg.lg` | `ui.css:137` |
| 7 | P1 | Dédupliquer thème sombre (`light-dark()`), corriger `:not([data-theme=dark])`, compléter les 6 encres sombres manquantes | `glass.css:63-88`, `ui.css:192`, `layout.css:169,172` |
| 8 | P1 | Rendre tous les composants contrôlables + `name`/forms ; unifier états/tailles | `ui.js`, `ui2.js` |
| 9 | P1 | Corriger ARIA : checkbox mixed, tooltip, snack live, drawer modal, navbar liens, tabs disabled | §6.3 |
| 10 | P1 | Nettoyer `layout.css` (double passe), variables mortes `--gl`, `.lg-gloss`, `!important` | §5 |
| 11 | P1 | Retirer Google Sans (licence) ; self-host Outfit/Roboto ou fontes système | `index.html:5` |
| 12 | P2 | i18n des textes par défaut ; persistance du thème ; RTL | `ui.js:141,159`, `core.js:28` |

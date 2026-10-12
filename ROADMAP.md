# Roadmap Sea Glass → design system open source

Objectif : un design system glassmorphism complet, cohérent et publiable (niveau MUI / Tailwind), **framework-agnostique en premier**, avec adaptateurs React (et plus tard Vue/Svelte) et un plugin Tailwind.

Légende : **P0** indispensable v1 · **P1** important · **P2** confort. Effort : **XS** < 2 h · **S** ½ j · **M** 1–2 j · **L** 3–5 j · **XL** > 1 sem.
Références → voir [`docs/AUDIT.md`](docs/AUDIT.md). Prototype d’origine → [`legacy/`](legacy/).

Architecture cible proposée :
```
seaglass/
├─ packages/
│  ├─ tokens/        @seaglass/tokens   (DTCG JSON → CSS vars, JS, JSON, Tailwind preset)
│  ├─ css/           @seaglass/css      (matériau .sg-glass + composants CSS-only, couches @layer)
│  ├─ elements/      @seaglass/elements (web components légers, ex. Lit ou vanilla Custom Elements)
│  ├─ react/         @seaglass/react    (wrappers typés, contrôlés/non contrôlés)
│  └─ tailwind/      @seaglass/tailwind (preset + plugin : utilitaires glass-*)
├─ apps/docs/        site de doc (Astro/Vite) + Storybook
└─ .github/          CI, templates
```

---

## Phase 0 — Mise en place du repo (semaine 1)

- [x] **P0 · XS** `git init`, branche `main`, `.gitignore`, `.editorconfig`, `.nvmrc` (Node LTS)
- [x] **P0 · XS** Importer le code actuel tel quel dans `legacy/` (référence visuelle) — premier commit
- [x] **P0 · S** Monorepo pnpm workspaces (+ Turborepo ou Nx facultatif)
- [x] **P0 · S** Outillage : TypeScript, ESLint, Prettier, Stylelint (règle de préfixe `sg-`), lint-staged + husky
- [x] **P0 · XS** Conventional Commits + commitlint
- [x] **P0 · XS** Choisir la licence (**MIT** recommandé, comme MUI/Tailwind) → `LICENSE`
- [ ] **P1 · XS** Vérifier les droits sur le nom « Sea Glass » / « Glassea » (concept public très viral, cf. post X) et sur les assets (photo Unsplash, polices) — Unsplash et Google Sans exclus des packages ; le nom reste à confirmer.

## Phase 1 — Fondations & tokens (semaines 1–2)

- [x] **P0 · M** Source unique des tokens au format **W3C Design Tokens (DTCG)**, build via **Style Dictionary v4** → CSS vars, ESM/TS, JSON, preset Tailwind
- [x] **P0 · S** Trois niveaux : *primitifs* (12 galets + encres, neutres) → *sémantiques* (`--sg-color-primary`, `-on-primary`, `-surface`, `-on-surface`, `-success`, `-warning`, `-danger`, `-info`, `-outline`, `-focus`) → *composants* (`--sg-button-height-md`…)
- [x] **P0 · S** Ajouter les échelles manquantes : espacement (`--sg-space-1..12`, base 4 px), durées (`--sg-duration-fast/base/slow` 120/200/380), easing (`standard`, `spring`), typo (display/headline/title/body/label × lg/md/sm : size, line-height, weight, tracking), élévation (`--sg-elevation-0..5`), z-index (dropdown, sticky, overlay, modal, toast, tooltip), breakpoints
- [x] **P0 · S** Échelle de matière nommée : `--sg-blur-sm/md/lg/xl` (4/8/12/20), opacité verre `--sg-glass-alpha-ground/scene`, rim, sheen, spec
- [x] **P0 · S** Unifier le format couleur (triplets `r g b` partout, ou `oklch`) ; supprimer la copie RGB en JS (`core.js:8-15`)
- [x] **P0 · S** Utiliser réellement les rayons `--sg-radius-*` partout ; renommer `xs/sm` de manière cohérente
- [x] **P0 · XS** Supprimer variables mortes (`--gl`, `.lg-gloss`, prop `gloss`)
- [x] **P1 · S** Compléter les 6 encres sombres manquantes (citron, cornflower, lavender, rootbeer, clear, mist)
- [x] **P1 · M** Remplacer les ~30 hex en dur par des tokens (knob, fills slider/progress, teal profond #308069/#256B5A, `#A4402F`…)
- [x] **P1 · S** Polices : retirer Google Sans (licence), garder Outfit/Roboto en self-host (`@fontsource`) ou fallback système ; documenter comment brancher sa propre fonte
- [ ] **P2 · S** Générer automatiquement la page « Tokens » de la doc depuis le JSON (fin des écarts doc/code, `sec-c.js:84-115`)

## Phase 2 — Architecture & build (semaines 2–4)

- [x] **P0 · M** **CSS d'abord** : `@seaglass/css` avec `@layer sg.reset, sg.tokens, sg.material, sg.components, sg.utilities` ; aucun reset global imposé (sortir `layout.css:2-11` dans un `reset.css` optionnel)
- [x] **P0 · M** Préfixer toutes les classes : `.lg`→`.sg-glass`, `.btn`→`.sg-button`, `.pg`→`.sg-progress`… ; modificateurs en `data-*` ou `.sg-button--primary` (choisir **une** convention) ; corriger collision `.pg.lg`
- [x] **P0 · S** États uniformes : `[aria-pressed]`, `[aria-checked]`, `[aria-invalid]`, `:disabled`/`[aria-disabled]`, `:focus-visible` ; démo d'états via `data-sg-force-state` réservé à la doc
- [x] **P0 · S** Tailles uniformes `sm | md | lg` pour tous les contrôles
- [x] **P0 · M** Matériau : défauts **sobres** (`frosted` seulement si `.sg-over`/scène, `refractive` opt-in), `@supports (backdrop-filter: url(#x))` au lieu de l'UA sniffing (`index.html:12`), filtre SVG injecté à la demande
- [x] **P0 · S** Moteur « lumière au pointeur » (`core.js:53-82`) en module ESM autonome, opt-in (`initSeaGlassLight()`), désactivé en reduced-motion
- [ ] **P0 · L** Décision **framework-agnostique** : web components (`<sg-button>`, `<sg-slider>`, `<sg-tabs>`…) pour les composants à comportement ; CSS-only pour les statiques (card, badge, chip simple)
- [ ] **P0 · L** `@seaglass/react` : réécriture TSX, `forwardRef`, contrôlé + non contrôlé (`value/defaultValue/onChange`) pour Chip, Checkbox, RadioGroup, Tabs, Field, Slider, Segmented ; `name` + input caché pour les formulaires
- [ ] **P0 · S** Build : Vite library mode / tsup → ESM + CJS + `.d.ts`, CSS minifié, `exports` map, `sideEffects` pour le CSS, tree-shaking
- [x] **P1 · M** `@seaglass/tailwind` : preset (couleurs, rayons, durées depuis les tokens) + plugin utilitaires `glass`, `glass-frosted`, `glass-tint-{color}`, `glass-rim`, `glass-glow`, `glass-carved`, `glass-blur-{sm..xl}` (Tailwind v4 : `@theme` + `@utility` — v4 à brancher plus tard)
- [ ] **P1 · S** Déclarer la cible navigateurs (browserslist : 2 dernières versions + Safari ≥ 16.4) et un tableau de support
- [ ] **P1 · S** Supprimer la duplication `useSlide` / NavBar, `cls()` ; util `useIndicator` partagé
- [ ] **P2 · L** Adaptateurs Vue 3 et Svelte (wrappers des web components)
- [ ] **P2 · S** Thème configurable à l'exécution : `createTheme({ primary: 'aqua', radius: 'soft' })` → variables CSS

## Phase 3 — Composants (semaines 3–10)

### 3a. Remise à niveau des existants
- [ ] **P0 · S** Button : `type` libre (submit), `href` (rendu `<a>`), `loading`, `startIcon/endIcon`, `fullWidth` ; variantes `filled | tonal | outlined | ghost` (+ `love` → exemple de recette, pas une variante cœur)
- [ ] **P0 · S** IconButton séparé (aria-label obligatoire en TS)
- [ ] **P0 · S** Checkbox : contrôlé, vrai `indeterminate` (`input.indeterminate`)
- [ ] **P0 · S** Field → `TextField` : types, `required`, préfixe/suffixe, compteur, `Textarea`
- [ ] **P0 · S** Search, NavBar : paramétrables (items, labels, slots) ; NavBar en liens
- [ ] **P1 · S** Tabs : contrôlé, activation manuelle optionnelle, onglets désactivés sautés, vertical
- [ ] **P1 · S** Slider : vertical, RTL, `name`, formateur de valeur ; Ring indéterminé
- [ ] **P1 · S** Tooltip réel (déclencheur, positionnement Floating UI / CSS anchor positioning, délai, Échap)
- [ ] **P1 · S** Snackbar/Toast : file d'attente, durée, action, `role="status"`/`alert`, API `toast()` agnostique

### 3b. Manquants vs MUI / Tailwind UI
**Saisie**
- [ ] **P0 · M** Select (listbox APG)
- [ ] **P1 · L** Combobox / Autocomplete
- [ ] **P1 · S** Switch avec label intégré, Radio card / Checkbox card
- [ ] **P1 · M** Number input / stepper, OTP / PIN input
- [ ] **P2 · L** Date picker, time picker
- [ ] **P2 · M** File upload / dropzone, Rating, Color picker (galets)
- [ ] **P1 · S** Form field (label, help, error, required) générique + Fieldset/Legend

**Overlays**
- [x] **P0 · M** Dialog / Modal (focus trap, `inert`, Échap, retour du focus) — base du drawer (`inert` encore à brancher)
- [ ] **P0 · M** Drawer / Sheet (bas, gauche, droite) — remplace le tiroir de doc (`sec-a.js:47-59`)
- [x] **P1 · M** Popover, Menu / Dropdown menu (APG menu button) — Menu de base ; Popover plus tard
- [ ] **P2 · S** Context menu, Command palette (⌘K)

**Navigation**
- [ ] **P1 · S** App bar / Top bar, Navigation rail, Bottom navigation (NavBar), Sidebar
- [ ] **P1 · S** Breadcrumbs, Pagination, Link
- [ ] **P2 · S** Stepper

**Affichage de données**
- [x] **P1 · M** List / ListItem, Table (tri, sélection) sur verre — List/ListItem ; Table plus tard
- [x] **P1 · S** Avatar / AvatarGroup, Divider, Kbd, Tag (supprimable) — Divider ; Avatar/Kbd/Tag plus tard
- [ ] **P1 · S** Accordion / Disclosure
- [ ] **P2 · M** Carousel, Timeline, Tree view

**Retours**
- [ ] **P1 · S** Alert / Banner (info/success/warning/danger)
- [ ] **P1 · S** Skeleton, Spinner (indéterminé circulaire)
- [ ] **P2 · S** Empty state

**Layout / utilitaires**
- [ ] **P1 · S** Surface / Paper (= `Glass` public documenté), Stack, Grid, Container, Scene (décor de fond fourni : dégradés « mer » sans image externe)
- [ ] **P2 · S** VisuallyHidden, Portal, FocusTrap exposés

## Phase 4 — Accessibilité (en continu, gate avant v1)

- [x] **P0 · S** `@media (prefers-reduced-transparency: reduce)` : verre → surface opaque (`--sg-glass-alpha: .96`, pas de `backdrop-filter`, pas de reflet)
- [x] **P0 · S** `@media (prefers-contrast: more)` : bordure 1 px `--sg-outline` visible, opacité verre ↑, encres renforcées
- [x] **P0 · S** `@media (forced-colors: active)` : bordures `CanvasText`, états via `Highlight`, coches visibles, `forced-color-adjust` ciblé
- [x] **P0 · S** `@supports not (backdrop-filter: blur(1px))` : fallback opaque
- [x] **P0 · S** `prefers-reduced-motion` complet : ressorts → durées courtes sans overshoot, `scroll-behavior`, reflet au pointeur, blobs
- [ ] **P0 · M** Contraste sur verre : tokens `on-glass`, opacité plancher sur `.scene` quand du texte est posé, ou scrim local ; outil de vérification dans la doc (échantillonnage de l'arrière-plan)
- [ ] **P0 · S** Focus visible propre à chaque composant (ne plus dépendre du reset de doc) ; anneau double (clair + foncé) pour verre sur photo à la place du `#fff` en dur
- [ ] **P1 · M** Corriger ARIA listés dans `AUDIT.md` §6.3 (checkbox mixed, tooltip, snack, drawer, navbar, tabs disabled, ring `aria-hidden`)
- [ ] **P1 · S** `lang`, structure HTML valide de la doc (`index.html:1-9`)
- [ ] **P1 · M** Tests automatiques axe-core (Storybook a11y addon + Playwright `@axe-core/playwright`)
- [ ] **P1 · M** Tests manuels lecteurs d'écran (VoiceOver macOS/iOS, NVDA, TalkBack) — checklist par composant
- [ ] **P2 · S** Cibles tactiles 44 px en option `density="comfortable"`
- [ ] **P2 · S** Page « Accessibilité » publique (conformité WCAG 2.2 AA visée, limites connues)

## Phase 5 — Theming (semaines 4–6)

- [ ] **P0 · S** Un seul bloc par thème grâce à `light-dark()` + `color-scheme` (fallback via `@supports`), suppression des 5 duplications
- [ ] **P0 · XS** Corriger les sélecteurs `:root:not([data-theme="dark"])` (cassés en sombre système)
- [ ] **P1 · S** `data-sg-theme="light|dark|system"` + persistance optionnelle (helper JS)
- [ ] **P1 · S** Thèmes imbriqués (scoper `data-sg-theme` sur un sous-arbre)
- [ ] **P1 · M** Couleur primaire configurable (n'importe quel galet), génération automatique on-color / glow / tint
- [ ] **P2 · M** Thèmes alternatifs (ex. « Abysses », « Sable ») et générateur de thème dans la doc
- [ ] **P2 · S** Densité (compact / default / comfortable)

## Phase 6 — Documentation (semaines 4–10)

- [ ] **P0 · L** Site de doc (Astro + MDX, ou VitePress) qui **consomme les packages** — migrer le contenu actuel (Principes, Fondations, Composants, Qualité)
- [x] **P0 · M** Storybook 8 : une story par composant × variantes × états, contrôles, addon a11y, thèmes clair/sombre, décor « scène » — socle `apps/storybook` (Glass/List/Dialog/Menu) ; étendre au reste
- [ ] **P0 · S** Pages : Installation (CDN, npm, Tailwind), Démarrage rapide, Theming, Tokens (auto-générée), Accessibilité, Support navigateurs, Performance (budget de couches `backdrop-filter`)
- [ ] **P1 · M** Docs d'API générées (react-docgen-typescript / Custom Elements Manifest)
- [ ] **P1 · S** Playground (StackBlitz / CodeSandbox templates)
- [ ] **P1 · S** Exemples / templates : app météo marine, dashboard, page d'accueil, mobile
- [ ] **P2 · M** Kit Figma (variables synchronisées avec les tokens via Tokens Studio)
- [ ] **P2 · S** Documentation en anglais (principale pour l'open source) + français

## Phase 7 — Tests (semaines 5–10)

- [ ] **P0 · M** Tests unitaires/comportement : Vitest + Testing Library (clavier tabs/slider/radio, contrôlé/non contrôlé)
- [ ] **P0 · M** Tests visuels de non-régression : Playwright screenshots (ou Chromatic / Lost Pixel) sur Storybook, en clair/sombre, avec et sans `backdrop-filter`, reduced-transparency, forced-colors
- [ ] **P1 · S** Matrice navigateurs Playwright : Chromium, Firefox, WebKit
- [ ] **P1 · S** Tests de contraste automatisés sur les paires de tokens (remplace `sec-c.js:47-81`)
- [ ] **P1 · S** Budget perf : Lighthouse CI sur la doc, test du nombre de couches `backdrop-filter` par page, taille des bundles (size-limit)
- [ ] **P2 · S** Tests de types (tsd / expect-type)

## Phase 8 — Repo open source & publication (semaines 2–12)

- [x] **P0 · S** `README.md` : pitch, captures/GIF, install, exemple minimal CSS/React/Tailwind, liens doc, badges (npm, CI, licence)
- [x] **P0 · XS** `LICENSE` (MIT)
- [x] **P0 · S** `CONTRIBUTING.md` : setup, scripts, conventions (préfixe, tokens, a11y checklist), process PR, DCO ou CLA
- [x] **P0 · XS** `CODE_OF_CONDUCT.md` (Contributor Covenant 2.1)
- [x] **P0 · XS** `SECURITY.md` (signalement privé)
- [x] **P0 · S** `CHANGELOG.md` géré par **Changesets** ; **SemVer** strict, `0.x` pendant la bêta, 1.0 après gate a11y + tests visuels
- [x] **P0 · M** CI GitHub Actions : lint + typecheck + tests unitaires + build sur PR ; tests visuels Playwright ; déploiement preview de la doc (Vercel / Netlify / GitHub Pages) — lint/typecheck/test/build en place ; visuels et preview docs plus tard
- [x] **P0 · S** Workflow release : Changesets action → PR de version → publication npm avec **provenance** (`npm publish --provenance`, OIDC trusted publishing) — version PR active ; `publish` commenté jusqu'à `NPM_TOKEN` + scope réservé (`pnpm release:dry`)
- [ ] **P0 · S** Réserver le scope npm `@seaglass` (ou alternatif si pris) et le nom de l'org GitHub
- [x] **P1 · S** `.github/ISSUE_TEMPLATE/` : bug (avec navigateur/OS/thème/reduced-*), feature, nouveau composant (RFC), question → Discussions ; `config.yml`
- [x] **P1 · XS** `.github/PULL_REQUEST_TEMPLATE.md` : checklist (tests, story, a11y, changeset, captures)
- [x] **P1 · XS** `CODEOWNERS`, labels, protection de branche `main`, Dependabot / Renovate — CODEOWNERS + Dependabot dans le repo ; labels et protection de branche à activer dans les réglages GitHub
- [ ] **P1 · S** CDN : builds `unpkg`/`jsdelivr` (CSS + web components en un fichier) pour l'usage sans bundler
- [x] **P2 · S** `GOVERNANCE.md`, `ROADMAP.md` public, GitHub Projects, Discussions — fichiers présents ; Discussions / Projects à activer
- [ ] **P2 · XS** `FUNDING.yml` (GitHub Sponsors / Open Collective)
- [ ] **P2 · S** Plan de lancement (post X avec vidéo de démo, Product Hunt, show HN) — en citant l'inspiration (@SLKVinyl, @ryanvogel)

---

## Jalons

| Version | Contenu | Estimation |
|---|---|---|
| **0.1.0** | Repo, tokens DTCG, `@seaglass/css` préfixé, matériau + 8 composants existants en CSS, CI | ~3 sem. |
| **0.2.0** | `@seaglass/react` contrôlé, web components des contrôles interactifs, Storybook | +3 sem. |
| **0.3.0** | Préférences a11y complètes, theming, tests visuels, preset Tailwind | +2–3 sem. |
| **0.5.0** | Composants manquants P0/P1 (Select, Dialog, Drawer, Menu, Popover, Alert, Table, Accordion…) | +4–6 sem. |
| **1.0.0** | Gate : WCAG 2.2 AA audité, couverture visuelle, doc complète, API gelée | +2 sem. |

## Phase 9 — Fidélité à la source (vidéo « Google Glassea »)
- [ ] P0 · M — Tokens matière : `translucency`, `frost` (flou), `refraction`, `rim` (reflet haut/gauche), `glow` (ombre diffuse), `sparkle` (grain), `tint` — chacun réglable via `data-*`
- [x] P0 · S — Palette officielle des 12 teintes : Seafoam, Kelly, Citron, Aqua, Cornflower, Cobalt, Lavender, Ruby, Amber, Root beer, Clear, Mist (clair + sombre, contrastes validés)
- [x] P0 · S — Formes : tokens pill, cercle, squircle (super-ellipse) ; aucun angle vif
- [ ] P1 · M — Motion : tokens de ressorts (press scale-down, slide de l'indicateur segmenté, remplissage toggle/slider), tous neutralisés par `prefers-reduced-motion`
- [ ] P1 · L — Ripple « goutte d'eau » qui déforme le bord du composant (SVG/CSS), alternative au ripple Material
- [ ] P2 · M — Aberration chromatique en bord de réfraction (Chromium, avec repli propre)
- [ ] P1 · M — Composants vus dans la vidéo à couvrir : bouton pill + icône, icon button rond, toggle, slider à pouce vertical, contrôle segmenté, tuile Quick Settings, carte média squircle, lecteur média (scrubber + contrôles)
- [ ] P2 · L — Page démo « Quick Settings » sur fond animé, comme vitrine du README
- [ ] P2 · S — Blobs organiques animés (logo / hero), désactivables

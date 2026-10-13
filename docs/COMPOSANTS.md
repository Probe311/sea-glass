# Catalogue des composants — avancement

État au **2026-10-13** · Sea Glass `0.1.0-alpha` · React 19 · démo **inventaire 100 %** des composants shipping.

Légende :

| Symbole | Signification                                |
| ------- | -------------------------------------------- |
| ✅      | Présent et utilisable en alpha               |
| 🟡      | Présent, à peaufiner (API, a11y, variants)   |
| ❌      | Absent / pas encore commencé                 |
| ➖      | Hors scope volontaire (identité / auth État) |
| —       | Non applicable                               |

Colonnes :

- **CSS** : classes `.sg-*` dans `@seaglass/css`
- **React** : export typé dans `@seaglass/react`
- **Démo** : section ou aperçu sur [GitHub Pages](https://probe311.github.io/sea-glass/)
- **Storybook** : story dédiée ou overview (`pnpm storybook`)

---

## Surface & matière

| Composant       | CSS            | React | Démo       | Storybook        | Avancement                        |
| --------------- | -------------- | ----- | ---------- | ---------------- | --------------------------------- |
| Glass (surface) | ✅             | ✅    | ✅ Matière | ✅ Surface/Glass | ✅ Base du système                |
| Scene / décor   | ✅ `.sg-scene` | —     | ✅         | 🟡 décor preview | 🟡 Pas de composant React `Scene` |

---

## Actions

| Composant  | CSS         | React | Démo       | Storybook         | Avancement                                                   |
| ---------- | ----------- | ----- | ---------- | ----------------- | ------------------------------------------------------------ |
| Button     | ✅          | ✅    | ✅ Boutons | 🟡 Forms overview | 🟡 Manque `href`, `loading`, variantes filled/tonal/outlined |
| IconButton | ✅ (circle) | ✅    | ✅         | 🟡                | ✅ Aria-label obligatoire                                    |
| Chip       | ✅          | ✅    | ✅ Puces   | 🟡                | ✅                                                           |
| Link       | ✅          | ✅    | ✅         | —                 | ✅                                                           |
| SkipLink   | ✅          | ✅    | ✅         | —                 | ✅                                                           |

---

## Primitifs & affichage

| Composant            | CSS | React | Démo       | Storybook | Avancement                     |
| -------------------- | --- | ----- | ---------- | --------- | ------------------------------ |
| Badge                | ✅  | ✅    | ✅ Cartes  | 🟡 Data   | ✅                             |
| Tag                  | ✅  | ✅    | ✅         | 🟡 Data   | ✅ Supprimable                 |
| Card                 | ✅  | ✅    | ✅ Cartes  | 🟡 Data   | ✅                             |
| Tile                 | ✅  | ✅    | ✅ Données | 🟡 Data   | ✅                             |
| Divider              | ✅  | ✅    | ✅         | ✅ List   | ✅                             |
| List / ListItem      | ✅  | ✅    | ✅         | ✅ List   | 🟡 Sélection multi à peaufiner |
| Avatar / AvatarGroup | ❌  | ❌    | ❌         | ❌        | ❌ Roadmap P1                  |
| Kbd                  | ❌  | ❌    | ❌         | ❌        | ❌ Roadmap P1                  |

---

## Formulaires

| Composant          | CSS | React | Démo            | Storybook | Avancement                                                                |
| ------------------ | --- | ----- | --------------- | --------- | ------------------------------------------------------------------------- |
| TextField          | ✅  | ✅    | ✅ Champs       | 🟡 Forms  | 🟡 Préfixe / suffixe / compteur à peaufiner                               |
| PasswordField      | ✅  | ✅    | ✅ Listes       | 🟡 Forms  | ✅                                                                        |
| Search             | ✅  | ✅    | ✅ Champs       | 🟡 Forms  | ✅                                                                        |
| Select             | ✅  | ✅    | ✅ Listes       | 🟡 Forms  | 🟡 Listbox APG à peaufiner                                                |
| Combobox           | ✅  | ✅    | ✅              | —         | 🟡 Filtre local ; multi-select riche à peaufiner                          |
| Checkbox           | ✅  | ✅    | ✅ Cases        | 🟡 Forms  | ✅ Indeterminate                                                          |
| Radio              | ✅  | ✅    | ✅ Cases        | 🟡 Forms  | ✅                                                                        |
| RadioGroup         | —   | ❌    | ✅ (proto)      | —         | 🟡 Via inputs `name` ; pas d’export dédié                                 |
| Switch             | ✅  | ✅    | ✅ Interrupteur | 🟡 Forms  | ✅                                                                        |
| Segmented          | ✅  | ✅    | ✅              | 🟡 Forms  | ✅                                                                        |
| Slider             | ✅  | ✅    | ✅ Curseur      | —         | 🟡 Capsule→perle OK ; range / pipette / vertical à peaufiner côté package |
| Form / Fieldset    | ✅  | ✅    | ✅              | —         | ✅                                                                        |
| FileUpload         | ✅  | ✅    | ✅ Listes       | 🟡 Data   | ✅ Dropzone de base                                                       |
| Number / OTP       | ❌  | ❌    | ❌              | ❌        | ❌ Roadmap P1                                                             |
| Date / Time picker | ❌  | ❌    | ❌              | ❌        | ❌ Roadmap P2                                                             |
| Rating             | ❌  | ❌    | ❌              | ❌        | ❌ Roadmap P2                                                             |
| Color picker       | ❌  | ❌    | ❌              | ❌        | ❌ Roadmap P2                                                             |

---

## Feedback

| Composant         | CSS           | React | Démo               | Storybook   | Avancement                                               |
| ----------------- | ------------- | ----- | ------------------ | ----------- | -------------------------------------------------------- |
| Alert             | ✅            | ✅    | ✅ Alertes         | 🟡 Feedback | ✅ Tons info/success/warning/danger                      |
| Banner            | ✅            | ✅    | ✅ Alertes         | 🟡 Feedback | ✅                                                       |
| Callout           | ✅            | ✅    | ✅ Alertes         | 🟡 Feedback | ✅ Mise en avant / exergue                               |
| Accordion         | ✅            | ✅    | ✅ Accordéon       | 🟡 Feedback | ✅                                                       |
| Tabs              | ✅            | ✅    | ✅ Onglets         | 🟡 Feedback | ✅                                                       |
| Tooltip           | ✅            | ✅    | ✅                 | —           | 🟡 Hover/focus ; Floating UI / délai / Échap à peaufiner |
| Snackbar          | ✅            | ✅    | ✅ Retours         | —           | 🟡 File d’attente / API `toast()` à peaufiner            |
| Toast             | ✅            | ✅    | ✅ Retours         | —           | 🟡 Idem                                                  |
| Progress          | ✅            | ✅    | ✅ Curseur         | 🟡 Feedback | ✅ Barre ; teintes / tailles                             |
| Ring (circulaire) | ✅ `.sg-ring` | ❌    | ✅ Curseur (proto) | —           | 🟡 CSS + démo ; pas d’export React                       |
| Skeleton          | ❌            | ❌    | ❌                 | ❌          | ❌ Roadmap P1                                            |
| Spinner           | ❌            | ❌    | ❌                 | ❌          | ❌ Roadmap P1                                            |
| Empty state       | ❌            | ❌    | ❌                 | ❌          | ❌ Roadmap P2                                            |

---

## Overlays

| Composant       | CSS | React | Démo        | Storybook         | Avancement                                   |
| --------------- | --- | ----- | ----------- | ----------------- | -------------------------------------------- |
| Dialog          | ✅  | ✅    | ✅ Overlays | ✅ Overlay/Dialog | 🟡 Focus trap OK ; `inert` drawer à brancher |
| Menu / MenuItem | ✅  | ✅    | ✅ Overlays | ✅ Overlay/Menu   | 🟡 Menu de base ; Popover APG plus tard      |
| Drawer / Sheet  | ❌  | ❌    | ❌          | ❌                | ❌ Roadmap P0                                |
| Popover         | ❌  | ❌    | ❌          | ❌                | ❌ (Menu seulement)                          |
| Context menu    | ❌  | ❌    | ❌          | ❌                | ❌ Roadmap P2                                |
| Command palette | ❌  | ❌    | ❌          | ❌                | ❌ Roadmap P2                                |

---

## Navigation & chrome

| Composant      | CSS | React | Démo                   | Storybook     | Avancement                        |
| -------------- | --- | ----- | ---------------------- | ------------- | --------------------------------- |
| Header         | ✅  | ✅    | ✅ Chrome              | 🟡 Navigation | 🟡 Variante « connectée » absente |
| Footer         | ✅  | ✅    | ✅ Chrome              | 🟡 Navigation | ✅                                |
| Sidebar        | ✅  | ✅    | ✅ Chrome              | 🟡 Navigation | ✅                                |
| Nav            | ✅  | ✅    | ✅ Navigation / Chrome | —             | 🟡 Rail / bottom nav à peaufiner  |
| Toc (sommaire) | ✅  | ✅    | ✅ Chrome              | 🟡 Navigation | ✅                                |
| Breadcrumbs    | ✅  | ✅    | ✅ Chrome              | 🟡 Navigation | ✅                                |
| Pagination     | ✅  | ✅    | ✅ Chrome              | 🟡 Navigation | ✅                                |
| Stepper        | ✅  | ✅    | ✅ Chrome              | 🟡 Navigation | ✅                                |
| LangSwitcher   | ✅  | ✅    | ✅ Prefs               | —             | ✅                                |
| ThemeToggle    | —   | ✅    | ✅ Prefs               | —             | ✅ Via Switch + `data-sg-theme`   |
| ConsentBanner  | ✅  | ✅    | ✅ Prefs               | —             | ✅                                |

---

## Données & contenu éditorial

| Composant     | CSS                    | React | Démo       | Storybook | Avancement                              |
| ------------- | ---------------------- | ----- | ---------- | --------- | --------------------------------------- |
| Table         | ✅                     | ✅    | ✅ Données | 🟡 Data   | 🟡 Tri OK ; sélection multi à peaufiner |
| Quote         | ✅                     | ✅    | ✅ Données | 🟡 Data   | ✅                                      |
| Media         | ✅                     | ✅    | ✅         | —         | ✅                                      |
| Hero          | ✅                     | ✅    | ✅ Données | 🟡 Data   | ✅ Zone d’expression visuelle           |
| Share         | ✅                     | ✅    | ✅ Données | —         | ✅                                      |
| Transcription | ✅ `.sg-transcription` | ❌    | ✅         | ❌        | 🟡 CSS + démo ; pas d’adaptateur React  |
| Carousel      | ❌                     | ❌    | ❌         | ❌        | ❌ Roadmap P2                           |
| Timeline      | ❌                     | ❌    | ❌         | ❌        | ❌ Roadmap P2                           |
| Tree view     | ❌                     | ❌    | ❌         | ❌        | ❌ Roadmap P2                           |

---

## Layout / utilitaires React

| Composant                  | CSS | React | Démo | Storybook | Avancement                                    |
| -------------------------- | --- | ----- | ---- | --------- | --------------------------------------------- |
| Stack / Grid / Container   | ❌  | ❌    | —    | —         | ❌ Roadmap P1                                 |
| VisuallyHidden             | ❌  | ❌    | —    | —         | ❌ Roadmap P2                                 |
| Portal / FocusTrap exposés | —   | ❌    | —    | —         | 🟡 Utilisés en interne (Dialog) ; pas publics |
| `cx`                       | —   | ✅    | —    | —         | ✅ Utilitaire                                 |

---

## Hors scope (DSFR État — non prévus)

| Composant                                 | Statut                                          |
| ----------------------------------------- | ----------------------------------------------- |
| Bloc marque                               | ➖                                              |
| FranceConnect / ProConnect                | ➖                                              |
| Téléchargement de fichier (obsolète DSFR) | ➖ Remplacé par Card / Link / Tile / FileUpload |

---

## Synthèse

| Couche                                       | ✅ / 🟡 | ❌  | ➖  |
| -------------------------------------------- | ------- | --- | --- |
| Adaptateurs React exportés                   | ~50     | —   | —   |
| Manquants roadmap (Drawer, Skeleton, Date… ) | —       | ~15 | —   |
| Hors scope État                              | —       | —   | 3   |

**Priorités suivantes (ordre suggéré)**

1. Drawer / Sheet (P0)
2. Skeleton + Spinner
3. Slider package = parité démo (range, pipette, marks)
4. Stories Storybook unitaires (1 story / composant)
5. Transcription React ; Avatar / Kbd

Voir aussi [`ROADMAP.md`](../ROADMAP.md) et [`packages/react/README.md`](../packages/react/README.md).

# Sea Glass

<p align="center">
  <img src="assets/logo.svg" alt="Sea Glass." width="320" />
</p>

<p align="center">
  <a href="https://github.com/Probe311/sea-glass/actions/workflows/ci.yml"><img src="https://github.com/Probe311/sea-glass/actions/workflows/ci.yml/badge.svg" alt="CI" /></a>
  <a href="https://www.npmjs.com/package/@sea-glass/css"><img src="https://img.shields.io/npm/v/@sea-glass/css.svg?color=4FA877" alt="npm @sea-glass/css" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-2F55C4.svg" alt="License: MIT" /></a>
  <a href="#status"><img src="https://img.shields.io/badge/status-alpha-F7C96B.svg" alt="Status: alpha" /></a>
  <a href="https://probe311.github.io/sea-glass/"><img src="https://img.shields.io/badge/demo-GitHub%20Pages-4FA877.svg" alt="Demo" /></a>
</p>

> **Alpha.** APIs will move · L’API va bouger. Not for production · Pas pour la production.

**Author / auteur :** [Julien Vaissier](https://www.julienvaissier.fr/) ([@Probe311](https://github.com/Probe311)) · **MIT**

<!-- GitHub Markdown has no interactive tabs; this horizontal switcher + anchors is the supported pattern. -->
<p align="center">
  <a href="#-english"><strong>🇬🇧 English</strong></a>
  &nbsp;·&nbsp;
  <a href="#-français"><strong>🇫🇷 Français</strong></a>
</p>

---

## 🇬🇧 English

**Sea Glass** is an open, participatory design system whose material is frosted sea glass: **translucency**, **frost (blur)**, **refraction**, **rim light**, **halo / glow**, **grain**, and **tint**. Twelve pebbles, three shapes (pill / circle / squircle), spring interaction.

### Install

Packages are on **npm** under the [`@sea-glass`](https://www.npmjs.com/org/sea-glass) / [`@sea-glass/*`](https://www.npmjs.com/search?q=%40sea-glass) scope (latest **0.2.1**). New packages may show `0.0.0-stage` briefly while npm finishes review.

```bash
pnpm add @sea-glass/css @sea-glass/tokens
# optional
pnpm add @sea-glass/react        # peer: react@^19
pnpm add @sea-glass/tailwind     # peer: tailwindcss@^3.4 || ^4
pnpm add @sea-glass/elements     # skeleton
```

| Package               | npm                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------ |
| `@sea-glass/tokens`   | [npmjs.com/package/@sea-glass/tokens](https://www.npmjs.com/package/@sea-glass/tokens)     |
| `@sea-glass/css`      | [npmjs.com/package/@sea-glass/css](https://www.npmjs.com/package/@sea-glass/css)           |
| `@sea-glass/react`    | [npmjs.com/package/@sea-glass/react](https://www.npmjs.com/package/@sea-glass/react)       |
| `@sea-glass/tailwind` | [npmjs.com/package/@sea-glass/tailwind](https://www.npmjs.com/package/@sea-glass/tailwind) |
| `@sea-glass/elements` | [npmjs.com/package/@sea-glass/elements](https://www.npmjs.com/package/@sea-glass/elements) |

Git fallback (monorepo): `pnpm add github:Probe311/sea-glass`

### Minimal CSS

```html
<link rel="stylesheet" href="./node_modules/@sea-glass/css/dist/seaglass.css" />
<div class="sg-scene">
  <button class="sg-glass sg-button" data-frosted data-rim type="button">Seafoam</button>
</div>
```

```js
import { initSeaGlassLight } from '@sea-glass/css/light';
initSeaGlassLight(); // pointer rim; no-ops under prefers-reduced-motion
```

React 19 (`@sea-glass/react`): `Glass` + Button, Field, Select, Alert, Table, Header, Footer… - full list in [`packages/react/README.md`](packages/react/README.md). Storybook 10: `pnpm storybook`. Tailwind v3:

```js
import { preset, plugin } from '@sea-glass/tailwind';
export default { presets: [preset], plugins: [plugin] };
```

### Brand & type

| Asset                                            | Use                             |
| ------------------------------------------------ | ------------------------------- |
| [`assets/logo.svg`](assets/logo.svg)             | Wordmark on light backgrounds   |
| [`assets/logo-light.svg`](assets/logo-light.svg) | Wordmark on dark backgrounds    |
| [`demo/favicon.svg`](demo/favicon.svg)           | Favicon - Cobalt disc `#6B8CE3` |

Wordmarks are outlined Poppins Bold + Cobalt period. Regenerate with `pnpm build:logo`.

**Display / Hn:** [Poppins](https://fonts.google.com/specimen/Poppins) (OFL) - geometric rounded sans, single-story `a`. Load `@fontsource/poppins/700.css` or the Google Fonts CSS used by the demo. Fallback: Outfit. **Body:** Roboto. **No Google Sans.**

### Material

**Glassmorphism** on `.sg-glass`: light white wash (scene alpha ≈ 0.08–0.12, ground ≈ 0.42), frost `blur(16px) saturate(1.75)`, tint like Alert/Toast (`tint-a` = **0.28**), grain (`noise.svg` overlay ≈ **28 %**), inset edge, neutral table drop. Use `isolation: auto` - isolating kills backdrop-filter. Frost is always on in `.sg-scene`; opt-in elsewhere via `data-frosted` / `.sg-glass--over`. Composable `data-*`: `rim`, `tint`, `refractive`, `frosted`, `alive`, `glow`. Refraction is opt-in. `data-glow` is a rare tinted halo. Put saturated décor behind frosted surfaces.

Demo Fabrication stack: **Verre** → bordure → teinte (**0.28**) → réfraction → givre (**0.28**) → lueur → encre.

Pebbles: Seafoam, Kelly, Citron, Aqua, Cornflower, Cobalt, Lavender, Ruby, Amber, Root beer, Clear, Mist.

### Status

<a id="status"></a>

| Package               | npm `0.2.1`                                          |
| --------------------- | ---------------------------------------------------- |
| `@sea-glass/tokens`   | DTCG → CSS / JS / JSON                               |
| `@sea-glass/css`      | Material + prefixed components                       |
| `@sea-glass/elements` | Skeleton                                             |
| `@sea-glass/react`    | ~50 adapters (forms, feedback, nav, data) - React 19 |
| `@sea-glass/tailwind` | Preset + `glass-*` plugin                            |

Demo: [GitHub Pages](https://probe311.github.io/sea-glass/) - UI version via `pnpm sync:version`. Component status: [`docs/COMPOSANTS.md`](docs/COMPOSANTS.md). Roadmap: [`ROADMAP.md`](ROADMAP.md).

### Contributing

Please read [`CONTRIBUTING.md`](CONTRIBUTING.md) and the [`Code of Conduct`](CODE_OF_CONDUCT.md). DCO: `Signed-off-by` on commits (`git commit -s`).

<p align="right"><a href="#-français">🇫🇷 Français →</a></p>

---

## 🇫🇷 Français

**Sea Glass** est un design system open source participatif dont la matière est le verre de mer dépoli : **translucidité**, **flou**, **réfraction**, **reflet de bord**, **halo**, **grain** et **teinte**. Douze galets, trois formes (pilule / cercle / squircle), mouvement à ressorts.

### Installer

Packages sur **npm** sous le scope [`@sea-glass`](https://www.npmjs.com/search?q=%40sea-glass) (dernière version **0.2.1**). npm peut afficher brièvement `0.0.0-stage` le temps de la revue des nouveaux packages.

```bash
pnpm add @sea-glass/css @sea-glass/tokens
# optionnel
pnpm add @sea-glass/react        # peer: react@^19
pnpm add @sea-glass/tailwind     # peer: tailwindcss@^3.4 || ^4
pnpm add @sea-glass/elements     # squelette
```

| Package               | npm                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------ |
| `@sea-glass/tokens`   | [npmjs.com/package/@sea-glass/tokens](https://www.npmjs.com/package/@sea-glass/tokens)     |
| `@sea-glass/css`      | [npmjs.com/package/@sea-glass/css](https://www.npmjs.com/package/@sea-glass/css)           |
| `@sea-glass/react`    | [npmjs.com/package/@sea-glass/react](https://www.npmjs.com/package/@sea-glass/react)       |
| `@sea-glass/tailwind` | [npmjs.com/package/@sea-glass/tailwind](https://www.npmjs.com/package/@sea-glass/tailwind) |
| `@sea-glass/elements` | [npmjs.com/package/@sea-glass/elements](https://www.npmjs.com/package/@sea-glass/elements) |

Fallback git : `pnpm add github:Probe311/sea-glass`

### CSS minimal

```html
<link rel="stylesheet" href="./node_modules/@sea-glass/css/dist/seaglass.css" />
<div class="sg-scene">
  <button class="sg-glass sg-button" data-frosted data-rim type="button">Seafoam</button>
</div>
```

React 19 (`@sea-glass/react`) : catalogue formulaires / feedback / nav / data - voir [`packages/react/README.md`](packages/react/README.md). Storybook 10 : `pnpm storybook`. Tailwind : preset + plugin `glass-*`.

### Marque et typo

| Fichier                                          | Usage                             |
| ------------------------------------------------ | --------------------------------- |
| [`assets/logo.svg`](assets/logo.svg)             | Fonds clairs                      |
| [`assets/logo-light.svg`](assets/logo-light.svg) | Fonds sombres                     |
| [`demo/favicon.svg`](demo/favicon.svg)           | Favicon - disque Cobalt `#6B8CE3` |

Wordmark Poppins Bold + point Cobalt. Régénération : `pnpm build:logo`.

**Titres (Hn) :** Poppins Bold (OFL). **Corps :** Roboto. **Pas de Google Sans.**

### Matière

**Glassmorphisme** sur `.sg-glass` : wash blanc léger (alpha scène ≈ 0.08–0.12, sol ≈ 0.42), frost `blur(16px) saturate(1.75)`, teinte type Alert/Toast (`tint-a` = **0.28**), grain (`noise.svg` overlay ≈ **28 %**), filet inset, ombre table neutre. `isolation: auto`. Dépoli toujours actif sur `.sg-scene`. Attributs : `rim`, `tint`, `refractive`, `frosted`, `alive`, `glow`. Réfraction opt-in. Prévoir un décor saturé derrière toute surface frosted.

Stack Fabrication (démo) : **Verre** → bordure → teinte (**0.28**) → réfraction → givre (**0.28**) → lueur → encre.

Démo : [GitHub Pages](https://probe311.github.io/sea-glass/). Catalogue : [`docs/COMPOSANTS.md`](docs/COMPOSANTS.md). Roadmap : [`ROADMAP.md`](ROADMAP.md).

### Statut

Alpha **npm 0.2.1**. SemVer strict ; 1.0 après le gate accessibilité + tests visuels.

<p align="right"><a href="#-english">← 🇬🇧 English</a></p>

---

## Monorepo

```
packages/tokens     @sea-glass/tokens
packages/css        @sea-glass/css
packages/elements   @sea-glass/elements
packages/react      @sea-glass/react
packages/tailwind   @sea-glass/tailwind
apps/storybook      Storybook 10
assets/             wordmarks + Poppins OFL source
demo/               prototype (GitHub Pages)
```

```bash
pnpm install
pnpm check        # lint, typecheck, build, test
pnpm preflight    # typecheck + build + test (pre-push)
pnpm storybook    # http://localhost:6006
pnpm build:logo   # assets/ + demo/ wordmarks
```

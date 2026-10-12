# Sea Glass

[![CI](https://github.com/Probe311/sea-glass/actions/workflows/ci.yml/badge.svg)](https://github.com/Probe311/sea-glass/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-2F55C4.svg)](LICENSE)
[![Status: alpha](https://img.shields.io/badge/status-alpha-F7C96B.svg)](#status--statut)

**Sea Glass** is an open, participatory design system whose material is frosted sea glass: **translucency**, **frost (blur)**, **refraction**, **rim light**, **halo / glow**, **grain**, and **tint**. Twelve pebbles, three shapes (pill / circle / squircle), spring motion.

**Sea Glass** est un design system open source participatif dont la matière est le verre de mer dépoli : **translucidité**, **flou**, **réfraction**, **reflet de bord**, **halo**, **grain** et **teinte**. Douze galets, trois formes (pilule / cercle / squircle), mouvement à ressorts.

> **Alpha.** APIs will move. Do not use in production yet. / **Alpha.** L’API va bouger. Pas pour la production.

**Author / auteur :** [Julien Vaissier](https://www.julienvaissier.fr/) ([@Probe311](https://github.com/Probe311)). Licence **MIT**.

---

## English

### Install

```bash
pnpm add @seaglass/css @seaglass/tokens
```

Packages are not on npm yet (scope `@seaglass` to reserve). Until the first publish, install from git:

```bash
pnpm add github:Probe311/sea-glass
```

### Minimal CSS

```html
<link rel="stylesheet" href="./node_modules/@seaglass/css/dist/seaglass.css" />
<div class="sg-scene">
  <button class="sg-glass sg-button" data-frosted data-rim type="button">Seafoam</button>
</div>
```

```js
import { initSeaGlassLight } from '@seaglass/css/light';
initSeaGlassLight(); // pointer rim; no-ops under prefers-reduced-motion
```

React ships `Glass`, `List`, `Dialog`, `Menu` (`@seaglass/react`). Storybook: `pnpm storybook`. Tailwind v3:

```js
import { preset, plugin } from '@seaglass/tailwind';
export default { presets: [preset], plugins: [plugin] };
```

### Material

Six composable `data-*` flags on `.sg-glass`: `frosted`, `refractive`, `alive`, `rim`, `tint`, `glow`. Frost applies only on `.sg-scene` / `.sg-glass--over`. Refraction is opt-in.

Pebbles: Seafoam, Kelly, Citron, Aqua, Cornflower, Cobalt, Lavender, Ruby, Amber, Root beer, Clear, Mist.

Fonts: system stack (`Outfit` / `Roboto` if you load them). **No Google Sans** (licence). No remote stock photos in the library — scenes use CSS gradients.

### Status

| Package              | 0.1 alpha                      |
| -------------------- | ------------------------------ |
| `@seaglass/tokens`   | DTCG → CSS / JS / JSON         |
| `@seaglass/css`      | Material + prefixed components |
| `@seaglass/elements` | Skeleton                       |
| `@seaglass/react`    | Glass, List, Dialog, Menu      |
| `@seaglass/tailwind` | Preset + `glass-*` plugin      |

Roadmap: [`ROADMAP.md`](ROADMAP.md). Prototype (visual reference only): [`legacy/`](legacy/).

### Contributing

Please read [`CONTRIBUTING.md`](CONTRIBUTING.md) and the [`Code of Conduct`](CODE_OF_CONDUCT.md). DCO: `Signed-off-by` on commits (`git commit -s`).

---

## Français

### Installer

```bash
pnpm add @seaglass/css @seaglass/tokens
```

Les packages ne sont pas encore sur npm (réserver le scope `@seaglass`). En attendant :

```bash
pnpm add github:Probe311/sea-glass
```

### CSS minimal

```html
<link rel="stylesheet" href="./node_modules/@seaglass/css/dist/seaglass.css" />
<div class="sg-scene">
  <button class="sg-glass sg-button" data-frosted data-rim type="button">Seafoam</button>
</div>
```

React : `Glass`, `List`, `Dialog`, `Menu`. Storybook : `pnpm storybook`. Tailwind : preset + plugin `glass-*`.

### Matière

Six attributs composables sur `.sg-glass` : `frosted`, `refractive`, `alive`, `rim`, `tint`, `glow`. Le flou ne s’applique que sur une scène. La réfraction est opt-in.

Galets : Seafoam, Kelly, Citron, Aqua, Cornflower, Cobalt, Lavender, Ruby, Amber, Root beer, Clear, Mist.

Polices : pile système (chargez Outfit / Roboto vous-même). **Pas de Google Sans.** Pas de photo Unsplash dans la librairie.

### Statut

Alpha `0.x`. SemVer strict ; 1.0 après le gate accessibilité + tests visuels. Voir [`ROADMAP.md`](ROADMAP.md).

---

## Monorepo

```
packages/tokens     @seaglass/tokens
packages/css        @seaglass/css
packages/elements   @seaglass/elements
packages/react      @seaglass/react
packages/tailwind   @seaglass/tailwind
apps/storybook      Storybook 8 (Glass / List / Dialog / Menu)
legacy/             original documentation site (reference)
demo/               same prototype, deployed to GitHub Pages
```

```bash
pnpm install
pnpm check       # lint, typecheck, build, test
pnpm storybook   # http://localhost:6006
```

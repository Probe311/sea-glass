# Sea Glass

[![CI](https://github.com/Probe311/sea-glass/actions/workflows/ci.yml/badge.svg)](https://github.com/Probe311/sea-glass/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-2F55C4.svg)](LICENSE)
[![Status: alpha](https://img.shields.io/badge/status-alpha-F7C96B.svg)](#status--statut)

**Sea Glass** is an open, participatory design system whose material is frosted sea glass: **translucency**, **frost (blur)**, **refraction**, **rim light**, **halo / glow**, **grain**, and **tint**. Twelve pebbles, three shapes (pill / circle / squircle), spring motion.

**Sea Glass** est un design system open source participatif dont la matière est le verre de mer dépoli : **translucidité**, **flou**, **réfraction**, **reflet de bord**, **halo**, **grain** et **teinte**. Douze galets, trois formes (pilule / cercle / squircle), mouvement à ressorts.

> **Alpha.** APIs will move. Do not use in production yet. / **Alpha.** L’API va bouger. Pas pour la production.

Inspired by the viral **Google Glassea** concept circulated by [@ryanvogel](https://x.com/ryanvogel) (and related posts). Sea Glass is an independent, open-source reading of that material — not a Google product, not affiliated with Google.

Inspiration : le concept **Google Glassea** popularisé par [@ryanvogel](https://x.com/ryanvogel). Sea Glass en est une lecture indépendante et libre — ce n’est pas un produit Google.

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

React / web components / Tailwind adapters are **skeletons** in this release. Use the CSS classes. Tailwind v3:

```js
import seaglass from '@seaglass/tailwind/preset';
export default { presets: [seaglass] };
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
| `@seaglass/react`    | Skeleton                       |
| `@seaglass/tailwind` | Preset skeleton                |

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

Les adaptateurs React / web components / Tailwind sont des **squelettes**. Les classes CSS fonctionnent dès maintenant.

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
legacy/             original documentation site (reference)
demo/               same prototype, deployed to GitHub Pages
```

```bash
pnpm install
pnpm check    # lint, typecheck, build, test
```

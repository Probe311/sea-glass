# Sea Glass

<p align="center">
  <img src="assets/logo.svg" alt="Sea Glass." width="320" />
</p>

<p align="center">
  <a href="https://github.com/Probe311/sea-glass/actions/workflows/ci.yml"><img src="https://github.com/Probe311/sea-glass/actions/workflows/ci.yml/badge.svg" alt="CI" /></a>
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

```bash
pnpm add @seaglass/css @seaglass/tokens
```

Packages are not on npm yet (reserve the `@seaglass` scope). Until the first publish:

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

React 19 (`@seaglass/react`): `Glass` + Button, Field, Select, Alert, Table, Header, Footer… — full list in [`packages/react/README.md`](packages/react/README.md). Storybook 10: `pnpm storybook`. Tailwind v3:

```js
import { preset, plugin } from '@seaglass/tailwind';
export default { presets: [preset], plugins: [plugin] };
```

### Brand & type

| Asset                                            | Use                           |
| ------------------------------------------------ | ----------------------------- |
| [`assets/logo.svg`](assets/logo.svg)             | Wordmark on light backgrounds |
| [`assets/logo-light.svg`](assets/logo-light.svg) | Wordmark on dark backgrounds  |

Both are outlined Poppins Bold + Cobalt period (`#6B8CE3`). Regenerate with `pnpm build:logo`.

**Display / Hn:** [Poppins](https://fonts.google.com/specimen/Poppins) (OFL) — geometric rounded sans, single-story `a`. Load `@fontsource/poppins/700.css` or the Google Fonts CSS used by the demo. Fallback: Outfit. **Body:** Roboto. **No Google Sans.**

### Material

Six composable `data-*` flags on `.sg-glass`: `frosted`, `refractive`, `alive`, `rim`, `tint`, `glow`. Frost applies only on `.sg-scene` / `.sg-glass--over`. Refraction is opt-in.

Pebbles: Seafoam, Kelly, Citron, Aqua, Cornflower, Cobalt, Lavender, Ruby, Amber, Root beer, Clear, Mist.

### Status

<a id="status"></a>

| Package              | 0.1.0-alpha                                          |
| -------------------- | ---------------------------------------------------- |
| `@seaglass/tokens`   | DTCG → CSS / JS / JSON                               |
| `@seaglass/css`      | Material + prefixed components                       |
| `@seaglass/elements` | Skeleton                                             |
| `@seaglass/react`    | ~50 adapters (forms, feedback, nav, data) — React 19 |
| `@seaglass/tailwind` | Preset + `glass-*` plugin                            |

Demo: [GitHub Pages](https://probe311.github.io/sea-glass/) — UI version via `pnpm sync:version`. Component status: [`docs/COMPOSANTS.md`](docs/COMPOSANTS.md). Roadmap: [`ROADMAP.md`](ROADMAP.md).

### Contributing

Please read [`CONTRIBUTING.md`](CONTRIBUTING.md) and the [`Code of Conduct`](CODE_OF_CONDUCT.md). DCO: `Signed-off-by` on commits (`git commit -s`).

<p align="right"><a href="#-français">🇫🇷 Français →</a></p>

---

## 🇫🇷 Français

**Sea Glass** est un design system open source participatif dont la matière est le verre de mer dépoli : **translucidité**, **flou**, **réfraction**, **reflet de bord**, **halo**, **grain** et **teinte**. Douze galets, trois formes (pilule / cercle / squircle), mouvement à ressorts.

### Installer

```bash
pnpm add @seaglass/css @seaglass/tokens
```

Les packages ne sont pas encore sur npm (réserver `@seaglass`). En attendant :

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

React 19 (`@seaglass/react`) : catalogue formulaires / feedback / nav / data — voir [`packages/react/README.md`](packages/react/README.md). Storybook 10 : `pnpm storybook`. Tailwind : preset + plugin `glass-*`. Version UI = `package.json` (`pnpm sync:version`).

### Marque et typo

| Fichier                                          | Usage         |
| ------------------------------------------------ | ------------- |
| [`assets/logo.svg`](assets/logo.svg)             | Fonds clairs  |
| [`assets/logo-light.svg`](assets/logo-light.svg) | Fonds sombres |

Wordmark Poppins Bold + point Cobalt. Régénération : `pnpm build:logo`.

**Titres (Hn) :** Poppins Bold (OFL). **Corps :** Roboto. **Pas de Google Sans.**

### Matière

Six attributs sur `.sg-glass` : `frosted`, `refractive`, `alive`, `rim`, `tint`, `glow`. Le flou ne s’applique que sur une scène. La réfraction est opt-in.

Démo : [GitHub Pages](https://probe311.github.io/sea-glass/). Catalogue d’avancement : [`docs/COMPOSANTS.md`](docs/COMPOSANTS.md). Roadmap : [`ROADMAP.md`](ROADMAP.md).

### Statut

Alpha `0.x`. SemVer strict ; 1.0 après le gate accessibilité + tests visuels.

<p align="right"><a href="#-english">← 🇬🇧 English</a></p>

---

## Monorepo

```
packages/tokens     @seaglass/tokens
packages/css        @seaglass/css
packages/elements   @seaglass/elements
packages/react      @seaglass/react
packages/tailwind   @seaglass/tailwind
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

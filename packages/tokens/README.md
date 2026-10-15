# `@sea-glass/tokens`

[![npm](https://img.shields.io/npm/v/@sea-glass/tokens.svg)](https://www.npmjs.com/package/@sea-glass/tokens)

Single source of Sea Glass design tokens in the [W3C Design Tokens (DTCG)](https://www.designtokens.org/) format. Built with [Style Dictionary v4](https://styledictionary.com/). npm **0.2.1**.

```bash
pnpm add @sea-glass/tokens
```

```css
@import '@sea-glass/tokens/css';
```

```js
import { tokens, pebbles } from '@sea-glass/tokens';
```

Three layers: **primitives** (12 pebbles + inks, neutrals) → **semantic** (`primary`, `surface`, `danger`…) → **component** (`--sg-button-height-md`).

Glass (light): alpha ground ≈ **0.42**, scene ≈ **0.08–0.12**, sparkle / givre ≈ **0.14** (overlay). Tint default in CSS ≈ **0.28** (Alert / Toast reference). Dark: sparkle ≈ **0.10**. Dark values live in `$extensions.seaglass.dark` and are emitted for `[data-sg-theme]` / `[data-theme]` plus `prefers-color-scheme` (excluded when either attribute is `light`).

# `@sea-glass/tokens`

Single source of Sea Glass design tokens in the [W3C Design Tokens (DTCG)](https://www.designtokens.org/) format. Built with [Style Dictionary v4](https://styledictionary.com/).

```bash
pnpm add @sea-glass/tokens
```

```css
@import '@sea-glass/tokens/css';
```

```js
import { tokens, pebbles } from '@sea-glass/tokens';
```

Three layers: **primitives** (12 pebbles + inks, neutrals) → **semantic** (`primary`, `surface`, `danger`…) → **component** (`--sg-button-height-md`). Dark values live in `$extensions.seaglass.dark` and are emitted once for `[data-sg-theme="dark"]` plus `prefers-color-scheme`.

# Sea Glass

**Sea-glass UI material for the web** — frosted, refractive surfaces, one light model, twelve pebbles, and documented React controls.

[![CI](https://github.com/Probe311/sea-glass/actions/workflows/ci.yml/badge.svg)](https://github.com/Probe311/sea-glass/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-teal.svg)](LICENSE)

> Inspired by the “Google Glassea” / sea-glass-as-Material-4 conversation ([video](https://x.com/ryanvogel/status/2108935225334014402)). Independent open-source project — not affiliated with Google.

## Try the demo

Open [`demo/index.html`](demo/index.html) via any static server, or visit **GitHub Pages** after the first Actions deploy.

```bash
npx serve demo
```

## Install (packages)

```bash
npm install @sea-glass/css @sea-glass/react
```

```tsx
import '@sea-glass/css';
import { Glass } from '@sea-glass/react';

export function Card() {
  return (
    <Glass tint="seafoam" className="scene" style={{ padding: 24 }}>
      Mer calme
    </Glass>
  );
}
```

## Material model

Every surface is a **Glass** with six independent properties:

| Property | Role |
|----------|------|
| `frosted` | Backdrop blur + saturate |
| `refractive` | SVG displacement (Chromium) |
| `alive` | Specular follows pointer; hover/press scale |
| `rim` | Edge highlight (angle tracks pointer) |
| `tint` | Matte pebble color |
| `glow` | Soft under-glow matching tint |

Light always comes from the **top-left**. Carved (inset) controls invert the model.

## Repo structure

```
demo/              Living documentation
packages/css/      Tokens + material + component styles
packages/react/    React components
ROADMAP.md         Path to MUI / Tailwind-class completeness
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) and [ROADMAP.md](ROADMAP.md). Discussions and issues welcome.

## License

[MIT](LICENSE) © Probe311

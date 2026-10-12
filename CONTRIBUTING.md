# Contributing to Sea Glass

Thanks for helping grow a sea-glass UI material system for the web.

## Quick start

```bash
npm install
npm run demo   # open demo/index.html via a static server
npm run build  # build packages
```

## Project layout

| Path | Role |
|------|------|
| `demo/` | Living documentation (React UMD + CSS) |
| `packages/css` | Design tokens + glass material styles |
| `packages/react` | React components (`Glass`, controls) |
| `ROADMAP.md` | Path to Material-class completeness |

## How to contribute

1. Open an issue (bug / feature / docs) before large changes.
2. Fork, branch from `main` (`feat/…`, `fix/…`, `docs/…`).
3. Keep diffs small. Prefer extending `Glass` and tokens over one-off styles.
4. Respect reduced motion, keyboard focus, and contrast (see demo → Qualité).
5. Open a PR with a short *why* and screenshots when UI changes.

## Design rules (non-negotiable)

- One light source: top-left.
- Carved surfaces invert light.
- Glow color always matches tint.
- Frost / refraction only over a real scene (photo, gradient, video) — not flat fills.
- Touch targets ≥ 40px (48px default).

## Inspiration

The visual direction is inspired by the “Google Glassea” / sea-glass-as-MD4 conversation on X ([concept](https://x.com/ryanvogel/status/2108935225334014402)). Sea Glass is an independent open-source implementation, not affiliated with Google.

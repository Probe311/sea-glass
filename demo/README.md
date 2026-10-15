# Demo (prototype)

Live: [probe311.github.io/sea-glass](https://probe311.github.io/sea-glass/).

Version UI = `package.json` + React installé (`pnpm sync:version` → `version.js`). Chargement React via esm.sh (pas d’UMD en React 19). Pages déploie ce dossier.

| Asset            | Rôle                                      |
| ---------------- | ----------------------------------------- |
| `logo.svg` / `logo-light.svg` | Wordmarks (`pnpm build:logo`) |
| `favicon.svg`    | Favicon - disque Cobalt `#6B8CE3`         |

Display type: **Poppins**. Prototype visuel + sections du sommaire (CSS `.sg-*` / React).

Matière UI (contrat unique, référence Alert / Toast) :

| Token | Clair |
| ----- | ----- |
| Teinte (`tint-a`) | **0.28** |
| Givre (`sparkle`) | **0.08** overlay (6–10 %) |
| Ombre (`--sh-cast`) | neutre marquée |
| Lueur (`--sh-glow`) | halo teinte soft |
| Frost | blur **16px** / saturate **1.75** |
| Alpha scène / sol | **~0.08–0.12** / **~0.42** |

Détail : [docs/COMPOSANTS.md](../docs/COMPOSANTS.md). Footer page : `Sea Glass · version` uniquement.

```bash
pnpm demo:prepare   # build packages → sync CSS + logos + version dans demo/
```

CI Pages exécute `demo:prepare` avant déploiement. Catalogue React typé : [`packages/react`](../packages/react/README.md) · Storybook : `pnpm storybook`.

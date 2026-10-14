# Demo (prototype)

Live: [probe311.github.io/sea-glass](https://probe311.github.io/sea-glass/).

Version UI = `package.json` + React installé (`pnpm sync:version` → `version.js`). Chargement React via esm.sh (pas d’UMD en React 19). Pages déploie ce dossier.

| Asset            | Rôle                                      |
| ---------------- | ----------------------------------------- |
| `logo.svg` / `logo-light.svg` | Wordmarks (`pnpm build:logo`) |
| `favicon.svg`    | Favicon — disque Cobalt `#6B8CE3`         |

Display type: **Poppins**. Prototype visuel + sections du sommaire (CSS `.sg-*` / React). Footer page : `Sea Glass · version` uniquement.

```bash
pnpm demo:prepare   # build packages → sync CSS + logos + version dans demo/
```

CI Pages exécute `demo:prepare` avant déploiement. Catalogue React typé : [`packages/react`](../packages/react/README.md) · Storybook : `pnpm storybook`.

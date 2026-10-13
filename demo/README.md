# Demo (prototype)

Live: [probe311.github.io/sea-glass](https://probe311.github.io/sea-glass/).

Version UI = `package.json` + React installé (`pnpm sync:version` → `version.js`). Chargement React via esm.sh (pas d’UMD en React 19). Pages déploie ce dossier.

Brand: `logo.svg` / `logo-light.svg` (`pnpm build:logo`). Display type: **Poppins**.

Prototype visuel (matière + anciennes sections) **plus** une section **Catalogue packages** branchée sur `seaglass.css` (`@seaglass/css`).

```bash
pnpm demo:prepare   # build packages → sync CSS + logos + version dans demo/
```

CI Pages exécute `demo:prepare` avant déploiement. Catalogue React typé : [`packages/react`](../packages/react/README.md) · Storybook : `pnpm storybook`.

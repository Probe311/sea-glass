# `@sea-glass/css`

[![npm](https://img.shields.io/npm/v/@sea-glass/css.svg)](https://www.npmjs.com/package/@sea-glass/css)

Le matériau Sea Glass (`.sg-glass`) et les composants préfixés `.sg-*`. Consomme `@sea-glass/tokens`.

```bash
pnpm add @sea-glass/css @sea-glass/tokens
```

```html
<link rel="stylesheet" href="https://unpkg.com/@sea-glass/css@0.2.1/dist/seaglass.css" />
<div class="sg-scene">
  <button class="sg-glass sg-button" data-frosted data-rim type="button">Seafoam</button>
</div>
<script type="module">
  import { initSeaGlassLight } from '@sea-glass/css/light';
  initSeaGlassLight();
</script>
```

Couches : `sg.tokens`, `sg.material`, `sg.components`, `sg.utilities`, `sg.a11y`.

Reset optionnel : `@sea-glass/css/reset.css` - **non** inclus par défaut.

**Glassmorphisme** (contrat UI unique) :

| Token                | Clair                                                    | Sombre       |
| -------------------- | -------------------------------------------------------- | ------------ |
| `--sg-glass-tint-a`  | **0.28** (Alert / Toast / callout)                       | selon teinte |
| `--sg-glass-sparkle` | **0.22** overlay · carved **0.16**                       | **0.16**     |
| `--sg-shadow-cast`   | ombre plate vers le bas                                  | idem         |
| `--sg-shadow-glow`   | lueur teinte subtile                                     | un peu plus  |
| Frost                | compact **md 12** · panneau **lg 24** · `saturate(2.05)` | idem         |
| Alpha scène / sol    | ≈ **0.08–0.12** / **0.42**                               | ≈ **0.10**   |

Frost **toujours** sur `.sg-scene`. Grain : `dist/noise.svg`. `isolation: auto`. Réfraction opt-in (`html.sg-refract` + `data-refractive`). `data-tint` → encre `*-ink` ; `data-glow` = `--sg-elevation-4` sur la lueur. Imbriqué : `.sg-glass .sg-glass` sans 2e drop.

## Composants CSS (classes)

`sg-button`, `sg-chip`, `sg-switch`, `sg-check`, `sg-slider`, `sg-progress`, `sg-ring`, `sg-tabs`, `sg-field`, `sg-card`, `sg-badge`, `sg-tag`, `sg-tooltip`, `sg-snack`, `sg-toast`, `sg-list`, `sg-divider`, `sg-dialog`, `sg-menu`, `sg-alert`, `sg-banner`, `sg-callout`, `sg-accordion`, `sg-search`, `sg-select`, `sg-combobox`, `sg-segmented`, `sg-link`, `sg-skip`, `sg-breadcrumbs`, `sg-pagination`, `sg-header`, `sg-footer`, `sg-sidebar`, `sg-nav`, `sg-toc`, `sg-stepper`, `sg-table`, `sg-tile`, `sg-quote`, `sg-media`, `sg-hero`, `sg-upload`, `sg-share`, `sg-consent`, `sg-form`, `sg-password`, `sg-lang`, `sg-transcription`.

Wrappers React typés : [`@sea-glass/react`](../react/README.md).

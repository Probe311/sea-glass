# `@sea-glass/css`

[![npm](https://img.shields.io/npm/v/@sea-glass/css.svg)](https://www.npmjs.com/package/@sea-glass/css)

Le matériau Sea Glass (`.sg-glass`) et les composants préfixés `.sg-*`. Consomme `@sea-glass/tokens`.

```bash
pnpm add @sea-glass/css @sea-glass/tokens
```

```html
<link rel="stylesheet" href="https://unpkg.com/@sea-glass/css@0.1.1/dist/seaglass.css" />
<div class="sg-scene">
  <button class="sg-glass sg-button" data-frosted data-rim type="button">Seafoam</button>
</div>
<script type="module">
  import { initSeaGlassLight } from '@sea-glass/css/light';
  initSeaGlassLight();
</script>
```

Couches : `sg.tokens`, `sg.material`, `sg.components`, `sg.utilities`, `sg.a11y`.

Reset optionnel : `@sea-glass/css/reset.css` — **non** inclus par défaut.

Le flou frosted ne s’applique que sur `.sg-scene` / `.sg-glass--over`. La réfraction est opt-in (`html.sg-refract` + `data-refractive`), détectée dans `initSeaGlassLight` (pas de sniff UA).

Formule gelée : dégradé diagonal, grain (`dist/noise.svg`), ombre table neutre. `data-tint` applique l’encre du galet (`*-ink`) ; `data-glow` reste optionnel (pas le drop standard).

## Composants CSS (classes)

`sg-button`, `sg-chip`, `sg-switch`, `sg-check`, `sg-slider`, `sg-progress`, `sg-ring`, `sg-tabs`, `sg-field`, `sg-card`, `sg-badge`, `sg-tag`, `sg-tooltip`, `sg-snack`, `sg-toast`, `sg-list`, `sg-divider`, `sg-dialog`, `sg-menu`, `sg-alert`, `sg-banner`, `sg-callout`, `sg-accordion`, `sg-search`, `sg-select`, `sg-combobox`, `sg-segmented`, `sg-link`, `sg-skip`, `sg-breadcrumbs`, `sg-pagination`, `sg-header`, `sg-footer`, `sg-sidebar`, `sg-nav`, `sg-toc`, `sg-stepper`, `sg-table`, `sg-tile`, `sg-quote`, `sg-media`, `sg-hero`, `sg-upload`, `sg-share`, `sg-consent`, `sg-form`, `sg-password`, `sg-lang`, `sg-transcription`.

Wrappers React typés : [`@sea-glass/react`](../react/README.md).

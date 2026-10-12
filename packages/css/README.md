# `@seaglass/css`

The Sea Glass material (`.sg-glass`) and prefixed components. Consumes `@seaglass/tokens`.

```html
<link rel="stylesheet" href="https://unpkg.com/@seaglass/css/seaglass.css" />
<div class="sg-scene">
  <button class="sg-glass sg-button" data-frosted data-rim type="button">Seafoam</button>
</div>
<script type="module">
  import { initSeaGlassLight } from '@seaglass/css/light';
  initSeaGlassLight();
</script>
```

Layers: `sg.tokens`, `sg.material`, `sg.components`, `sg.utilities`, `sg.a11y`.

An optional reset lives at `@seaglass/css/reset.css` — it is **not** applied by default.

Frosted blur only runs on `.sg-scene` / `.sg-glass--over`. Refraction is opt-in (`html.sg-refract` + `data-refractive`), feature-detected in `initSeaGlassLight` (no UA sniffing).

# `@sea-glass/react`

[![npm](https://img.shields.io/npm/v/@sea-glass/react.svg)](https://www.npmjs.com/package/@sea-glass/react)

Adaptateurs React 19 pour Sea Glass. Importer `@sea-glass/css` une fois dans l’app.

```bash
pnpm add @sea-glass/react @sea-glass/css
```

```tsx
import '@sea-glass/css';
import { Glass, Button, TextField, Alert, Header, Table } from '@sea-glass/react';
```

Peer : `react` / `react-dom` `^19`. npm **0.2.1**.

## Catalogue

| Groupe            | Exports                                                                                                                                  |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Surface           | `Glass`                                                                                                                                  |
| Overlays          | `Dialog`, `Menu`, `MenuItem`, `Tooltip`, `Snackbar`, `Toast`                                                                             |
| Actions           | `Button`, `IconButton`, `Chip`, `Link`, `SkipLink`                                                                                       |
| Primitifs         | `Badge`, `Tag`, `Card`, `Tile`, `Divider`, `List`, `ListItem`                                                                            |
| Formulaires       | `TextField`, `PasswordField`, `Search`, `Select`, `Combobox`, `Checkbox`, `Radio`, `Switch`, `Segmented`, `Slider`, `Form`, `FileUpload` |
| Feedback          | `Alert`, `Banner`, `Callout`, `Accordion`, `Progress`, `Tabs`                                                                            |
| Navigation        | `Header`, `Footer`, `Sidebar`, `Nav`, `Toc`, `Breadcrumbs`, `Pagination`, `Stepper`                                                      |
| Données / contenu | `Table`, `Quote`, `Media`, `Hero`, `Share`                                                                                               |
| Chrome            | `LangSwitcher`, `ThemeToggle`, `ConsentBanner`                                                                                           |

`Glass` / `Button` / `Chip` : `tint` (galet) fixe `data-tint` et l’encre `*-ink` (`currentColor`). Surfaces glass = **glassmorphisme** ; `Button` non-ghost pose `data-frosted` + `data-rim`. Teinte = **0.28** ; givre ≈ **0.22** overlay (carved **0.16**). Drop = ombre cast + lueur teinte ; `glow` renforce la lueur.

Hors scope volontaire (identité / auth État) : bloc marque, FranceConnect / ProConnect.

Stories : `pnpm storybook` depuis la racine du monorepo.

# `@seaglass/react`

Adaptateurs React 19 pour Sea Glass. Importer `@seaglass/css` une fois dans l’app.

```tsx
import '@seaglass/css';
import { Glass, Button, TextField, Alert, Header, Table } from '@seaglass/react';
```

Peer : `react` / `react-dom` `^19`.

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

Hors scope volontaire (identité / auth État) : bloc marque, FranceConnect / ProConnect.

Stories : `pnpm storybook` depuis la racine du monorepo.

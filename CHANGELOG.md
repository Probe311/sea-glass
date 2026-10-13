# Changelog

This project uses [Changesets](https://github.com/changesets/changesets). Each package has its own changelog after the first version PR. Until then:

## Unreleased

### `@sea-glass/react` / `@sea-glass/css`

- Large React catalog: Button, forms (Field, Select, Combobox, Switch…), Alert/Banner/Callout, Accordion, Table, Header/Footer/Sidebar, Breadcrumbs, Pagination, Stepper, Hero, Tile, Consent, ThemeToggle, LangSwitcher, etc.
- Matching `.sg-*` CSS for the new surfaces.
- Storybook: Forms / Feedback / Navigation / Data overview stories (plus Glass, List, Dialog, Menu).

### Docs / demo / tooling

- Package READMEs + root README aligned on the React/CSS catalog.
- Demo version string aligned to **0.1.0-alpha · React 19** (was “5.0 · React 18”).
- Demo loads React 19 via esm.sh (no UMD).
- Wordmarks + Poppins for Hn; Storybook 10; toolchain bumped to latest stable peers.

### `@sea-glass/*` — 0.1.0-alpha.0

- Monorepo (pnpm workspaces).
- W3C DTCG tokens (Style Dictionary v5): 12 pebbles, space / duration / type / elevation / z-index / blur.
- Prefixed CSS material (`.sg-glass`) + component layers.
- `@sea-glass/react` (React 19) adapters for the catalog above.
- `@sea-glass/tailwind`: preset + `glass-*` plugin.
- Interactive prototype in `demo/` (GitHub Pages).

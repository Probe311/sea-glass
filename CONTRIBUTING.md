# Contributing to Sea Glass

Thanks for helping. Please follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Setup

- Node 22 (see `.nvmrc`)
- [pnpm](https://pnpm.io) 10 (`corepack enable`)

```bash
pnpm install
pnpm ci
```

The original prototype lives in `legacy/` and is not linted. New work belongs in `packages/`.

## Scripts

| Command          | What                                       |
| ---------------- | ------------------------------------------ |
| `pnpm build`     | Style Dictionary + CSS bundle + `tsc`      |
| `pnpm lint`      | ESLint, Stylelint (`sg-` prefix), Prettier |
| `pnpm test`      | Vitest                                     |
| `pnpm changeset` | Record a semver bump                       |

## Conventions

1. **Tokens first.** Colours, space, time, type, elevation, blur live in `packages/tokens/src` (W3C DTCG). Do not add a magic number in CSS if a token exists — and if it should exist, add it there.
2. **Prefix.** Public classes are `.sg-*` with BEM modifiers (`.sg-button--primary`). Stylelint enforces this.
3. **No non-open assets.** No Google Sans, no hotlinked stock photos.
4. **Accessibility.** Keyboard, `:focus-visible`, `prefers-reduced-motion`, `prefers-reduced-transparency`, `prefers-contrast`, `forced-colors`. Contrast on glass is a release gate — see `docs/AUDIT.md`.
5. **Commits.** [Conventional Commits](https://www.conventionalcommits.org/). Husky runs commitlint + lint-staged.
6. **Changesets.** User-facing changes get `pnpm changeset`.

## Pull requests

Use the PR template. One concern per PR. Link the issue.

## Developer Certificate of Origin (DCO)

This project uses the [DCO](https://developercertificate.org/) instead of a CLA. Sign off every commit:

```bash
git commit -s -m "feat(css): add sg-alert"
```

Your `Signed-off-by` certifies the patch is yours to submit under the MIT licence.

## Good first issues

Issues labelled `good first issue` are scoped for a first contribution (once labels are enabled on the GitHub repo).

# Roadmap — toward Material / Tailwind completeness

Sea Glass already ships a **material model**, **foundations**, and **13 documented components** in `demo/`. This roadmap closes the gap with a production design system.

## Phase 0 — Foundation (done in repo bootstrap)

- [x] Public OSS repo + MIT + community files
- [x] Living demo (`demo/`)
- [x] `@sea-glass/css` + `@sea-glass/react` packages
- [x] GitHub Actions (CI + Pages)
- [x] Roadmap & contribution guide

## Phase 1 — Productize

- [ ] Semver releases on npm (`@sea-glass/css`, `@sea-glass/react`)
- [ ] Storybook (or Vite docs) generated from packages, not only UMD demo
- [ ] Harmonize version labels (demo “v5” → package `0.x` then `1.0`)
- [ ] EN docs pass
- [ ] Font licensing note (Outfit / Roboto; avoid Google Sans in production)

## Phase 2 — Missing primitives

- [ ] List / ListItem / Divider
- [ ] IconButton, Avatar
- [ ] Menu, Popover, Dialog, Drawer
- [ ] Select, Textarea, Autocomplete
- [ ] Alert, Skeleton
- [ ] Accordion, Breadcrumbs, Stepper
- [ ] Table (basic)

## Phase 3 — System depth

- [ ] Spacing scale tokens (`--s1`…), breakpoints, density
- [ ] Theme provider API + CSS variable contract
- [ ] Form patterns (label / help / error) documented + tested
- [ ] axe CI on Storybook stories
- [ ] Figma / Tokens Studio export

## Phase 4 — DX (Tailwind-like)

- [ ] Optional Tailwind preset / plugin
- [ ] `npx sea-glass init` (copy tokens + base CSS)
- [ ] Example apps: Vite, Next, Astro

## Success criteria

Comparable to Material UI / Tailwind *as a system*: clear tokens, wide component coverage, accessible by default, installable in one command, documented with live examples — while keeping the **sea-glass material** as the unique identity.

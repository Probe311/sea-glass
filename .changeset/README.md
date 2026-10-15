# Changesets

This repo uses [Changesets](https://github.com/changesets/changesets) for semver and changelogs.

1. After a user-facing change, run `pnpm changeset`.
2. Open a PR with the generated markdown file.
3. Merging to `main` opens (or updates) a **Version packages** PR.
4. Merging that PR tags the release. npm publish is **not** enabled yet - see `SECURITY.md` / repo settings for `NPM_TOKEN`.

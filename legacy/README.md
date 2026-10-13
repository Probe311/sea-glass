# Legacy prototype / Prototype d’origine

Snapshot of the original Sea Glass documentation site (`React.createElement`). Kept as a **visual reference** only. Footer version strings are kept in sync with `package.json` / installed React via `pnpm sync:version`. Not part of the published packages.

Copie du site de documentation d’origine. **Référence visuelle** uniquement — hors packages publiés.

Known issues are listed in [`docs/AUDIT.md`](../docs/AUDIT.md). Do not copy its Google Fonts, Unsplash photo, or unprefixed classes into new code.

Pour ouvrir : servir le dossier en HTTP (les modules ne sont pas requis).

```bash
python3 -m http.server 4173 --directory legacy
```

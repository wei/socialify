---
name: upgrade-simple-icons
description: Upgrade simple-icons to the latest version and preserve any removed icons by sourcing them from the previous version into common/icons/customIcons.ts and updating icon mappings. Use whenever bumping or upgrading simple-icons in this repo.
---

# Upgrade simple-icons

## Workflow

1. Record the current simple-icons version from `package.json` and `pnpm-lock.yaml`.
2. Install the latest package: `pnpm add simple-icons@latest`.
3. Reconcile icon imports:
   - Review `common/icons/languageMapping.ts` for imports from `simple-icons`.
   - Run `pnpm lint` or `pnpm verify` to surface missing icon exports.
4. If any previously used icon is missing after the upgrade:
   - Download the previous simple-icons version (recorded in step 1) to a temporary location or install it briefly.
   - Extract the icon data (`title`, `slug`, `hex`, `path`). In simple-icons, this is available from the `si*` export or `icons/<slug>.json` in the package.
   - Add a `custom<IconName>` entry to `common/icons/customIcons.ts` with the extracted data.
   - Update `common/icons/languageMapping.ts` to import and reference the custom icon.
   - Run `pnpm lint:fix` to fix import ordering issues if any.
   - Remove any temporary dependency or scratch folder after the data is captured.
5. Update relevant documentation if icon mappings or customization behavior changes.
6. Run `pnpm verify` before committing, and add a changeset for the upgrade.

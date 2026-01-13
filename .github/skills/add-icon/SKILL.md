---
name: add-icon
description: Add or update supported language, framework, library, tool, or platform icons in Socialify. Use when a request involves adding a new icon/logo, mapping a display name to a Simple Icons entry or a custom icon, and updating the language options list used in the UI.
---

# Add Icon Support

## Overview

Add a new language, framework, library, tool, or platform icon to Socialify’s supported list by mapping a display name to a Simple Icons entry (preferred) or a custom icon. This skill focuses on minimal, consistent changes so the entry appears in generated images and selection lists.

## Workflow

### 1. Identify the display name and icon source

Pick the display name you want to surface in Socialify (language, framework, library, tool, or platform). Confirm whether the icon exists in Simple Icons. If it is a language, also check the GitHub Linguist repo for the exact name at `https://raw.githubusercontent.com/github-linguist/linguist/refs/heads/main/lib/linguist/languages.yml`:
- If the icon exists, use the `si<IconName>` export in the mapping.
- If the icon does not exist, add a custom icon to `common/icons/customIcons.ts` and export it.

Custom icons must follow the `SimpleIcon` TypeScript type (same shape as Simple Icons):
- `title`: Display name used in the SVG title tag.
- `slug`: Lowercase, URL-safe identifier (no spaces).
- `hex`: Brand color hex without `#` (uppercase preferred).
- `source`: Source URL for the icon (empty string if unavailable).
- `guidelines`: Brand guidelines URL (empty string if unavailable).
- `path`: SVG path data string (single path, viewBox `0 0 24 24`).
- `svg`: Getter that returns a Simple Icons-compatible `<svg>` string, using `title` and `path`.

### 2. Add the mapping entry

Update `common/icons/languageMapping.ts`:
- Import the Simple Icon or custom icon.
- Add the entry in `LANGUAGE_ICON_MAPPING` under “GitHub Linguist languages” (for languages) or “Custom Frameworks, Libraries, Tools and Platforms” (for non-languages), keeping alphabetical order by display name.

### 3. Check UI coverage

Confirm the UI can surface the new entry:
- `common/configHelper.ts` uses `LANGUAGE_ICON_MAPPING` to build language options, so additions there should show in dropdowns automatically.

### 4. Update docs and changeset

Follow repo conventions:
- Add a changeset via `pnpm changeset add --empty`, then fill in a one-line description.
- Update `AGENTS.md` or other relevant docs if the supported list is referenced.

## Implementation checklist

- Choose the display name (language, framework, library, tool, or platform; verify Linguist name for languages).
- Add a Simple Icon import or a custom icon in `common/icons/customIcons.ts`.
- Add the mapping in `common/icons/languageMapping.ts` in alphabetical order.
- Confirm the UI picks it up via `common/configHelper.ts`.
- Update docs that mention supported entries and add a changeset.

## Example (Typst)

Reference commit `121e569b9899851f1df90cfcdaca6e7fa6e2739d`:
- Added `siTypst` import and `Typst: siTypst` mapping in `common/icons/languageMapping.ts`.
- Added a changeset noting the new supported language.

## Notes

- Keep entries alphabetized to match existing conventions.
- Prefer Simple Icons when available; custom icons only when necessary.

# socialify

## 2.23.0

### Minor Changes

- ddd28fc: Upgrade Tailwind CSS and DaisyUI dependencies with component updates

## 2.22.3

### Patch Changes

- 4829516: Upgrade satori from 0.15.2 to 0.18.3

  - Simplified renderSVG.tsx by removing manual yoga-wasm-web initialization (satori now bundles WASM internally)
  - Removed yoga-wasm-web dependency
  - Updated postinstall script to no longer copy yoga.wasm

## 2.22.2

### Patch Changes

- a1fd05c: Upgrade dependencies: pnpm 10.27.0, @biomejs/biome 2.3.10, @testing-library/react 16.3.1

## 2.22.1

### Patch Changes

- 8231870: Upgrade simple-icons and add custom fallbacks for removed icons

## 2.22.0

### Minor Changes

- 9c4c65c: Upgrade dependencies to Next.js 16 and Node 24, including React, TypeScript, and related ecosystem updates

## 2.21.15

### Patch Changes

- a956dbe: Fix invalid runtime export with Client Components by converting pages to Server Components
- a956dbe: Improve API error handling, SVG rendering init, and documentation updates.

## 2.21.14

### Patch Changes

- 207fe6a: feat: add GreasyFork icon as a language

## 2.21.13

### Patch Changes

- 1f73ca5: feat: add Vite logo support to language icon mapping
- 4e872df: feat: add MCP (Model Context Protocol) logo to language options

## 2.21.12

### Patch Changes

- 7a2f1b5: fix font cdn url

## 2.21.11

### Patch Changes

- e411607: Upgrade pnpm and docker deployment

## 2.21.10

### Patch Changes

- 47b9d50: 📝 Improve release notes

## 2.21.9

### Patch Changes

- 609ced2: 📝 Improve release notes

## 2.21.8

### Patch Changes

- 0cd17c2: 📝 Improve release notes

## 2.21.7

### Patch Changes

- 8d91de9: 📝 Improve release notes

## 2.21.6

### Patch Changes

- f8b2d30: 📝 Improve release notes

## 2.21.5

### Patch Changes

- 5808b34: 📝 Improve release notes

## 2.21.4

### Patch Changes

- f439179: 📝 Improve release notes

## 2.21.3

### Patch Changes

- 7e589a8: Upgrade satori. Improve playwright tests.

## 2.21.2

### Patch Changes

- d9c8139: Revert cache headers update as it was already functional

## 2.21.1

### Patch Changes

- 56f6bb1: Update cache headers for better cache hits

## 2.21.0

### Minor Changes

- c264039: Add icons for new languages, tools, frameworks, and platforms
- 219500c: Add language selection

## 2.20.2

### Patch Changes

- 42f1342: Fix svg logo input state management

## 2.20.1

### Patch Changes

- 16c29db: ⬆️ Upgrade dependencies

## 2.20.0

### Minor Changes

- bce2132: add repo input to config

## 2.19.1

### Patch Changes

- 1af3d23: Add Docker build caching in GitHub Actions to speed up multi-stage builds.

## 2.19.0

### Minor Changes

- 296065e: Added JetBrains Mono font option.

## 2.18.4

### Patch Changes

- 2e45d6e: Added Playwright test for full variant of CN, JP, and KR (Korean).

  Added accessbility attributes for generic input/textbox components. Updated snapshots.

## 2.18.3

### Patch Changes

- 5ac566c: Fix unexpected page caching

## 2.18.2

### Patch Changes

- 791e6e7: Corrected jest update snapshot(s) flag back to -u.

## 2.18.1

### Patch Changes

- 0bce0d1: Remove custom-rewrites.js which was used to handle large logo rewrites for Vercel

## 2.18.0

### Minor Changes

- c7d053d: 🔍️ Rename url parameter descriptionEditable to custom_description

## 2.17.0

### Minor Changes

- d73c1be: Full migration from page router to app router.

  Upgraded to Next.js 15/React19 via official codemod and applied type fixes.

  Huge props to [@Keming-He](https://github.com/KemingHe)

## 2.16.0

### Minor Changes

- e7f708e: Added error handling for long svg data uri input

  Thanks to [slusy](https://github.com/slusy)

## 2.15.1

### Patch Changes

- ca0cebb: Set up dev container

## 2.15.0

### Minor Changes

- c739cec: Support transparent background

## 2.14.6

### Patch Changes

- c32156a: remove unused npm packages

  Thanks to [@Sunny-64](https://github.com/Sunny-64)

## 2.14.5

### Patch Changes

- 0b61791: Migrated from yarn to pnpm package manager
  Updated scripts, hooks, and README.md

  Thanks to [@Keming-He](https://github.com/KemingHe)

  Update Dockerfile

## 2.14.4

### Patch Changes

- 3d13fc9: Display release versions in http response, html head, and footer

## 2.14.3

### Patch Changes

- 99a37ce: Limited GITHUB_TOKEN process.env check to CI only, as 'next start` in Playwright auto-loads .env for local devs.

  Thanks to [@Keming-He](https://github.com/KemingHe)

## 2.14.2

### Patch Changes

- bda22bd: Migrated from relative import to import aliasing for better code maintain-ability.

  Also organized imports into [3rd-party], [types], and [local].

  Thanks to [@Keming-He](https://github.com/KemingHe)

## 2.14.1

### Patch Changes

- 038d7d0: Migrated from hard-coded solution to using @next/third-parties/google GoogleTagManager component.

  Thanks to [@Keming-He](https://github.com/KemingHe)

## 2.14.0

### Minor Changes

- e804b07: Bump DaisyUI to v4

  Thanks to [@Keming-He](https://github.com/KemingHe)

## 2.13.0

### Minor Changes

- 81543b8: Added playwright e2e testing to capture user stories and main UI.

  Updated contributor setup instructions and contributor list in README.md.

  Thanks to [@Keming-He](https://github.com/KemingHe)

## 2.12.2

### Patch Changes

- 82f1b49: moved strictly build-time deps to dev-deps list in package.json

## 2.12.1

### Patch Changes

- ce207c2: Improve config error logging

## 2.12.0

### Minor Changes

- f60a1fe: Upgrade dependencies

## 2.11.1

### Patch Changes

- 76ef894: Improve docker build process
  Reduce docker image size

## 2.11.0

### Minor Changes

- 610575c: upgrade node 22

## 2.10.0

### Minor Changes

- 36d53cd: Add docker deployment

## 2.9.0

### Minor Changes

- 5b7ec64: Upgrade dependencies

## 2.8.7

### Patch Changes

- 194b120: Throw an Error for Non-OK GraphQL Status Codes

## 2.8.6

### Patch Changes

- dfaea81: Remove vercel specific code, add Netlify specific code

## 2.8.5

### Patch Changes

- 488cb95: Update Vercel to Netlify

## 2.8.4

### Patch Changes

- 064a55b: Bumped BiomeJS to new 1.8 release, updated soon-deprecating scripts.

## 2.8.3

### Patch Changes

- fecd506: Remove unnecessary dangerouslySetInnerHtml

## 2.8.2

### Patch Changes

- 563def4: Securely migrated from eslint to biomejs.

## 2.8.1

### Patch Changes

- 66f8c4f: ⬆️ Upgrade to next 14

## 2.8.0

### Minor Changes

- 0e8a230: Change `word-break` style of description

## 2.7.0

### Minor Changes

- 7dd83ad: Upgrade dependencies

## 2.6.2

### Patch Changes

- cdd9fa9: Upgrade satori with CJK character support

## 2.6.1

### Patch Changes

- 9047d49: Revert "⬆️ Upgrade satori" due to Chinese character #227

## 2.6.0

### Minor Changes

- f547598: Upgrade satori

## 2.5.2

### Patch Changes

- 762ab0c: Fix emojis

## 2.5.1

### Patch Changes

- 0270927: Fix png endpoint

## 2.5.0

### Minor Changes

- 6db06b3: Support new line in description

## 2.4.2

### Patch Changes

- a626fef: Add powered by vercel

## 2.4.1

### Patch Changes

- 9d6b91d: Add Java Icon
- 52bb81d: Limit logo to svg to reduce bandwidth usage

## 2.4.0

### Minor Changes

- 985ac7d: Upgrade project dependencies

## 2.3.0

### Minor Changes

- 0f967ca: Add 'Auto' theme that adapts to user system settings

## 2.2.1

### Patch Changes

- 8a496eb: Fix description text alignment

## 2.2.0

### Minor Changes

- b572823: Upgrade dependencies

## 2.1.0

### Minor Changes

- 01b073d: Fix CJK text missing
- 474fd39: Generate png using resvg wasm, Remove @vercel/og

## 2.0.0

### Major Changes

- f1a3f6b: Satori and @vercel/og for image generation
  Use vercel edge functions
  Upgrade to Tailwind CSS and daisyUI

## 1.1.0

### Minor Changes

- 76fcfd7: Add changeset

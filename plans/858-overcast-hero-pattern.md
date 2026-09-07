# Plan: #858 — Add Overcast Hero Pattern

## Summary

Issue #858 asks for a new "Overcast" background option from the Hero Patterns library. Verified against installed `hero-patterns@2.1.0`: it exports an `overcast(fill, opacity)` function whose returned SVG data-URI matches the width/height regex already used in `common/helpers.ts`, so no new parsing logic is needed. The change is three small edits: add `overcast = 'Overcast'` to the `Pattern` enum in `common/types/configType.ts`, import `overcast` from `hero-patterns` in `common/helpers.ts`, and add `[Pattern.overcast]: overcast` to `PATTERN_FUNCTIONS_MAPPING`. The configuration dropdown (`src/components/configuration/config.tsx`) renders `Object.keys(Pattern)` dynamically, so the new option appears in the UI automatically — matching triage's note that the enum is shared and fan-out is broad but shallow.

## Approach

1. Verify `overcast` exists in the installed library (done — confirmed export and compatible 80×80 SVG output).
2. Extend the `Pattern` enum.
3. Wire `overcast` into the pattern-function mapping so `getHeroPattern` resolves it for light/dark/auto themes.
4. Reuse the existing shared light/dark args (`['#eaeaea', 0.2]` / `['#eaeaea', 0.6]`) — the SVG output is a cloud-in-square tile and reads fine at both opacities.
5. Extend tests where practical (a card render test with `Pattern.overcast`) and run `pnpm build`, `pnpm test`, and Biome checks.

## Files to touch

| File | Change |
|---|---|
| `common/types/configType.ts` | Add `overcast = 'Overcast'` to `Pattern` enum |
| `common/helpers.ts` | Import `overcast` from `hero-patterns`; add `[Pattern.overcast]: overcast` to `PATTERN_FUNCTIONS_MAPPING` |
| `src/components/preview/cardThemeWrapper.test.tsx` *(optional)* | Add a case using `Pattern.overcast` alongside existing `Pattern.brickWall` cases |

**No changes needed** in `src/components/configuration/config.tsx` (dropdown is generated from `Object.keys(Pattern)`), `src/components/preview/card.tsx`, or `src/typings/hero-patterns.d.ts` (module is untyped via ambient declaration).

## Current state (for reference)

<details>
<summary><code>common/types/configType.ts</code> — Pattern enum</summary>

```ts
enum Pattern {
  signal = 'Signal',
  charlieBrown = 'Charlie Brown',
  formalInvitation = 'Formal Invitation',
  plus = 'Plus',
  circuitBoard = 'Circuit Board',
  overlappingHexagons = 'Overlapping Hexagons',
  brickWall = 'Brick Wall',
  floatingCogs = 'Floating Cogs',
  diagonalStripes = 'Diagonal Stripes',
  solid = 'Solid',
  transparent = 'Transparent',
}
```

Proposed edit: insert `overcast = 'Overcast',` before `solid` (see decision 1 on ordering).
</details>

<details>
<summary><code>common/helpers.ts</code> — imports & mapping</summary>

```ts
import {
  brickWall,
  charlieBrown,
  circuitBoard,
  diagonalStripes,
  floatingCogs,
  formalInvitation,
  overlappingHexagons,
  plus,
  signal,
} from 'hero-patterns'
...
const PATTERN_FUNCTIONS_MAPPING: { [key: string]: any } = {
  [Pattern.signal]: signal,
  ...
  [Pattern.diagonalStripes]: diagonalStripes,
  [Pattern.solid]: null,
  [Pattern.transparent]: null,
}
```

Proposed edit: add `overcast` to the alphabetical import list and `[Pattern.overcast]: overcast` above the `[Pattern.solid]: null` entry. The existing width/height extraction (`/width%3D%22(\d+)%22/`) works — verified `overcast('#eaeaea', 0.2)` embeds `width="80" height="80"`.
</details>

<details>
<summary><code>src/components/configuration/config.tsx</code> — dropdown (no change required)</summary>

```tsx
<SelectWrapper
  title="Background Pattern"
  keyName="pattern"
  map={Object.keys(Pattern).map((key) => ({
    key,
    label: (Pattern as any)[key],
  }))}
  value={config.pattern}
  handleChange={handleConfigChange}
/>
```

Because the option list is derived from the enum keys, the "Overcast" option shows up with zero UI code changes.
</details>

## Decisions

### 1. Enum/display ordering for the new option
- [x] Insert at the end of the visual pattern groups, just before `solid`/`transparent` separators (keeps the two non-pattern options last; consistent with how `diagonalStripes` was appended)
- [ ] Insert in alphabetical order within the list (changes ordering of existing options in the dropdown — larger visual diff for users)

### 2. Display label and query value
- [x] `overcast = 'Overcast'` — camelCase key matching existing entries and the `hero-patterns` export name
- [ ] Use different casing/copy for the label (e.g., 'Overcast Clouds')

### 3. Theme parameters
- [x] Reuse shared `darkThemeArgs = ['#eaeaea', 0.2]` / `lightThemeArgs = ['#eaeaea', 0.6]` — consistent with all other patterns
- [ ] Give Overcast custom args (e.g., higher opacity in light mode) — risks inconsistency and needs a mapping-shape change

### 4. Tests
- [x] Add a `Pattern.overcast` render case to `cardThemeWrapper.test.tsx` (mirrors existing `brickWall` cases); typecheck + build + existing suite act as regression net
- [ ] No new test — the enum and mapping are exercised indirectly; least effort
- [ ] Add a dedicated unit test for `getHeroPattern` covering all enum members (nice-to-have; beyond the scope of #858)

### 5. e2e snapshots (Playwright)
- [x] Run e2e suite after the change; update snapshots only if the configuration UI snapshot captures the dropdown's option list
- [ ] Skip e2e; rely on unit tests and build

## Verification

- `pnpm build` — typecheck + Next build must pass
- `pnpm test` (jest) — existing config/card tests green, plus the new Overcast case if decision 4 recommended option is taken
- `pnpm biome check` on touched files
- Manual: open `/`, select "Overcast" in Background Pattern, flip Light/Dark/Auto themes, and confirm the `/api` PNG/SVG render shows the cloud tile.

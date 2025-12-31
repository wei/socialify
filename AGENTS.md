# AGENTS.md

This file provides context for AI agents working with the Socialify codebase.

## ⚠️ CRITICAL: Read CONTRIBUTING.md First

**BEFORE making ANY code changes**, you MUST read [CONTRIBUTING.md](./CONTRIBUTING.md) to understand:
- Documentation requirements (all changes must update relevant docs)
- Required commit message format (gitmoji-style)
- Changeset requirements (every PR needs one)
- Testing requirements (`pnpm verify` before committing)
- Code style (Biome linter/formatter)

**Failure to follow CONTRIBUTING.md will result in rejected PRs.**

## Project Overview

**Socialify** is an open-source service that generates beautiful social preview images for GitHub repositories. It allows users to create customized images with options for logos, descriptions, badges, fonts, and background patterns.

- **Live Site**: https://socialify.git.ci
- **Tech Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS, daisyUI
- **Image Generation**: Satori (SVG) + resvg-wasm (PNG/JPEG/WebP)
- **Package Manager**: pnpm
- **Node Version**: 22 (see `.nvmrc`)

## Project Structure

```
socialify/
├── app/                    # Next.js App Router pages and API routes
│   ├── [_owner]/           # Dynamic routes for /:owner/:repo
│   ├── api/                # API endpoints for image generation
│   └── layout.tsx          # Root layout with providers
├── src/
│   ├── components/         # React UI components
│   ├── contexts/           # React context providers
│   ├── hooks/              # Custom React hooks
│   └── typings/            # TypeScript type definitions
├── common/                 # Shared utilities and business logic
│   ├── github/             # GitHub API integration
│   ├── icons/              # Language/tech icons for images
│   ├── types/              # Shared TypeScript types
│   ├── renderCard.ts       # Card rendering logic
│   ├── renderSVG.tsx       # SVG generation with Satori
│   └── renderPNG.tsx       # PNG conversion with resvg-wasm
├── public/                 # Static assets (wasm files copied here)
├── .devcontainer/          # VS Code Dev Container configuration
├── .github/workflows/      # CI/CD workflows (build, test, release, docker)
└── .changeset/             # Changeset files for versioning
```

## Development Workflow

**Before making changes:**
1. ✅ Read [CONTRIBUTING.md](./CONTRIBUTING.md) (if not already done)
2. ✅ Understand the requirements and conventions
3. ✅ Make your changes following code style guidelines

**Before committing:**
1. ✅ Run `pnpm verify` (runs lint, tests, and build)
2. ✅ Create a changeset: `pnpm changeset`
3. ✅ Use gitmoji-style commit messages (e.g., `✨ Add feature`, `🐛 Fix bug`, `📝 Update docs`)
4. ✅ Commit both your changes AND the changeset file

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for full details.

## Key Commands

```bash
pnpm install              # Install dependencies
pnpm dev                  # Start development server (Turbopack)
pnpm build                # Production build
pnpm lint                 # Run Biome linter
pnpm lint:fix             # Auto-fix lint issues
pnpm test:unit            # Run Jest unit tests
pnpm test:e2e             # Run Playwright e2e tests
pnpm changeset            # Create a changeset for PR
pnpm verify               # Run all checks (lint, tests, build)
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

- `GITHUB_TOKEN` - GitHub PAT with public repo read access (required)
- `PROJECT_URL` - Base URL (default: http://localhost:3000)
- `GTM_ID` - Google Tag Manager ID (optional)

## Development Guidelines

### Code Style
- **Linter/Formatter**: Biome (not ESLint/Prettier)
- **Import Aliases**: Use `@/` for imports (e.g., `@/components/...`)
- **Styling**: Tailwind CSS with daisyUI components

### Testing
- **Unit Tests**: Jest with React Testing Library
- **E2E Tests**: Playwright (Chromium)
- Update snapshots: `pnpm test:unit:update-snapshots` / `pnpm test:e2e:update-snapshots`

### Pull Requests
- Every PR requires a changeset file (run `pnpm changeset`)
- CI runs lint, unit tests, and build checks
- E2E tests run on PR merges

### Documentation
- **IMPORTANT**: All work must include updates to relevant documentation (README, AGENTS.md, code comments, etc.) to ensure docs stay current.

## API Routes

- `GET /:owner/:repo/image` - Returns generated social image (SVG/PNG/JPEG/WebP)
- `GET /api/stats.svg` - Returns usage statistics badge

### Image URL Parameters

Common query parameters for image customization:
- `theme` - Light/Dark/Auto
- `font` - Font family selection
- `pattern` - Background pattern
- `logo` - Custom logo URL (SVG data URI)
- `description` - Toggle description visibility
- `language` - Toggle language badge
- `stargazers`, `forks`, `issues`, `pulls` - Toggle badges
- `owner` - Toggle owner visibility

## Related Documentation

- [README.md](./README.md) - User documentation and usage guide
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines and development setup
- [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) - Community code of conduct
- [CHANGELOG.md](./CHANGELOG.md) - Version history and release notes

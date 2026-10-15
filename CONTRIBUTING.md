# Contributing to Socialify

Thank you for your interest in contributing to Socialify! We welcome contributions from the community.

Please read and agree to our [Code of Conduct](./CODE_OF_CONDUCT.md) before contributing.

## Development Setup

### Prerequisites

- Node.js 26 (see `.node-version`)
- pnpm package manager

### Getting Started

```bash
# Clone the repository (or your fork)
git clone https://github.com/wei/socialify.git && cd socialify

# Set environment variables
cp .env.example .env
# Edit .env and add your GITHUB_TOKEN

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open http://localhost:3000 to view the app.

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GITHUB_TOKEN` | Yes | GitHub PAT with public repo read access. [Create one here](https://github.com/settings/personal-access-tokens/new) |
| `PROJECT_URL` | No | Base URL (default: http://localhost:3000) |
| `GTM_ID` | No | Google Tag Manager ID |

### Dev Container

[![Open in Dev Container](https://img.shields.io/static/v1?label=Dev%20Containers&message=Click%20to%20Launch&color=blue)](https://open.vscode.dev/wei/socialify)

If you have VS Code and Docker installed, you can [open in Dev Container](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/wei/socialify) for a pre-configured development environment.

## Code Style

Socialify uses [Vite+](https://viteplus.dev/) (`vp check`: Oxfmt formatting, Oxlint linting, and type checks), configured in `vite.config.ts`.

```bash
# Check formatting, lint, and types
pnpm lint

# Auto-fix formatting and lint errors
pnpm lint:fix
```

## Testing

### Unit Tests (Vitest via `vp test`)

```bash
pnpm test:unit                    # Run tests
pnpm test:unit:watch              # Run in watch mode
pnpm test:unit:update-snapshots   # Update snapshots
```

### End-to-End Tests (Playwright)

```bash
# First-time setup
pnpm playwright:install

# Run tests
pnpm test:e2e

# Update snapshots
pnpm test:e2e:update-snapshots

# View test report
pnpm test:e2e:show-report
```

## Submitting Changes

### Before Submitting

1. Run linting: `pnpm lint`
2. Run unit tests: `pnpm test:unit`
3. Build the project: `pnpm build`

Or run all checks at once: `pnpm verify`

### Commit Messages and Pull Request Titles

Use gitmoji-style commit messages. Prefix the summary with an emoji and a short, present-tense description. The same format must be followed for Pull Request titles.

Examples:

- `✨ Add themed background options`
- `🐛 Fix cache header for SVG responses`
- `📝 Update contributing guide`

### Changesets

Every PR requires **one** changeset file describing the change:

1. Run `pnpm changeset`
2. Select the semantic version type (major, minor, patch)
3. Enter a concise, single-line description of your change (no bullet points)
4. Commit the generated `.changeset/*.md` file with your PR

**Format is critical** - The changeset MUST contain:
- YAML frontmatter with package name and version type: `"socialify": major|minor|patch`
- A concise, single-line description below the frontmatter (no markdown headers, lists, or formatting)

Example changeset content:
```markdown
---
"socialify": minor
---

Added new background pattern option and updated color scheme
```

**Common mistake**: Do NOT include markdown headers (`##`) or bullet points in the description.

**Note**: AI agents should use `pnpm changeset add --empty` to create the changeset yaml file before populating the file with content.

### Pull Request Guidelines

- Keep changes focused and minimal
- Include tests for new features
- Update all relevant documentation
- Let maintainers know if snapshot updates are required

## Project Structure

See [AGENTS.md](./AGENTS.md) for detailed project structure and architecture information.

## Questions?

Open an issue or discussion if you have questions about contributing.

Thank you for helping make Socialify better! :heart:

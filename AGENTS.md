# GitHub Copilot Coding Agent Instructions

This document provides guidance for GitHub Copilot coding agents working on the Socialify project.

## Project Overview

**Socialify** is a social media preview image generator for GitHub repositories. It creates beautiful, customizable project images that can be used in README files, as social preview images, or anywhere else on the web. The service generates images with live data including repository statistics, badges, and custom styling options.

- **Live Service**: https://socialify.git.ci
- **Tech Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS, DaisyUI
- **Image Generation**: Satori (HTML/CSS to SVG), RESVG (SVG to PNG/JPEG/WebP)

## Development Environment Setup

### Prerequisites
- Node.js 22 (specified in `engines` and `.nvmrc`)
- pnpm 10.12.1 (specified in `packageManager`)
- GitHub Personal Access Token (for API access)

### Getting Started
1. Clone the repository
2. Copy `.env.example` to `.env` and add your GitHub token
3. Run `pnpm install` to install dependencies
4. Run `pnpm dev` to start the development server
5. Access the app at http://localhost:3000

### Environment Variables
- `GITHUB_TOKEN`: Required for GitHub API access (read-only public repositories)
- `PROJECT_URL`: API URL (localhost for dev, public URL for production)
- `GTM_ID`: Optional Google Tag Manager ID for analytics

## Project Structure

```
/app                 # Next.js 15 App Router pages and API routes
  /[_owner]/[_repo]  # Dynamic repository page route
  /api               # API endpoints for image generation
/src
  /components        # React components
  /contexts          # React contexts
  /hooks             # Custom React hooks
  /typings           # TypeScript type definitions
/common              # Shared utilities and types
/public              # Static assets (including WASM files)
```

## Code Style and Formatting

### Linter and Formatter
- **Tool**: Biome (biomejs.dev) - replaces ESLint and Prettier
- **Configuration**: `biome.json`
- **Commands**:
  - Check/lint: `pnpm lint`
  - Fix issues: `pnpm lint:fix`
  - Fix with unsafe changes: `pnpm lint:fix-unsafe`

### Code Style Rules
- **Indentation**: 2 spaces
- **Line length**: 80 characters max
- **Quotes**: Single quotes for JavaScript, double quotes for JSX
- **Semicolons**: As needed (ASI-aware)
- **Arrow functions**: Always use parentheses for parameters
- **Trailing commas**: ES5 style
- **Import organization**: Enabled via Biome assist

### Important Conventions
- Use `const` for immutable variables (enforced)
- No `var` declarations (use `let` or `const`)
- Avoid double equals (`==`), use triple equals (`===`)
- No unused variables (warning level)
- React hooks must be used at top level
- Use exhaustive dependencies in React hooks

## Testing

### Unit Testing (Jest)
- **Framework**: Jest with TypeScript support (ts-jest)
- **Testing Library**: @testing-library/react for component tests
- **Commands**:
  - Run tests: `pnpm test:unit`
  - Watch mode: `pnpm test:unit:watch`
  - Update snapshots: `pnpm test:unit:update-snapshots`
- **Location**: Tests are colocated with components (e.g., `badge.test.tsx`)

### End-to-End Testing (Playwright)
- **Framework**: Playwright
- **Browser**: Chromium (default)
- **Commands**:
  - Install browser: `pnpm playwright:install`
  - Run tests: `pnpm test:e2e`
  - Update snapshots: `pnpm test:e2e:update-snapshots`
  - View report: `pnpm test:e2e:show-report`
- **Location**: `.playwright/` directory

### Testing Best Practices
- Write tests for new components and features
- Maintain existing test coverage
- Update snapshots only when intentional changes are made
- Run tests locally before committing: `pnpm verify` (runs lint + test + build)

## Building and Deployment

### Build Commands
- **Development**: `pnpm dev` (with Turbopack)
- **Production build**: `pnpm build`
- **Start production**: `pnpm start`
- **Debug**: `pnpm debug` (with Node.js inspector)

### Build Artifacts
- Next.js generates static and server-side rendered pages
- WASM files are copied to `/public` during postinstall
- Build output is in `.next/` directory (gitignored)

## Making Changes

### Version Control and Commits
- **Git hooks**: Husky is configured for pre-commit checks
- **Changesets**: Required for version management
  1. Run `pnpm changeset` after making changes
  2. Select appropriate semantic version (major/minor/patch)
  3. Write concise description of changes
  4. Commit the generated changeset file (`.changeset/*.md`) with your changes

### Pull Request Guidelines
- One changeset file per PR
- Run `pnpm verify` before creating PR
- Follow the Contributor Covenant Code of Conduct
- Reference relevant issues in PR description

### Common Patterns
- **Next.js App Router**: Use server components by default, client components when needed
- **API Routes**: Located in `/app/api`, use Next.js Edge Runtime when possible
- **Image Generation**: Server-side only (uses `server-only` package)
- **State Management**: React Context for global state
- **Styling**: Tailwind CSS with DaisyUI components
- **Icons**: React Icons library

## Key Technologies

### Next.js 15 App Router
- Server Components by default
- Client Components marked with `'use client'`
- Route handlers for API endpoints
- Metadata API for SEO

### Image Generation Pipeline
1. **Satori**: Converts React/HTML/CSS to SVG
2. **RESVG WASM**: Converts SVG to raster formats (PNG, JPEG, WebP)
3. **Yoga WASM**: Layout engine used by Satori

### GitHub Integration
- Fetches repository data via GitHub API
- Requires authentication token for rate limits
- Caches responses when appropriate

## Debugging and Troubleshooting

### Common Issues
- **Missing WASM files**: Run `pnpm install` (postinstall script copies them)
- **Biome schema mismatch**: Run `biome migrate` if schema version differs
- **Node version**: Ensure Node.js 22 is installed (check `.nvmrc`)
- **GitHub API rate limits**: Verify `GITHUB_TOKEN` is set in `.env`

### Development Tools
- **Biome VS Code extension**: For real-time linting and formatting
- **Dev Containers**: Available for consistent development environment
- **TypeScript**: Strict mode enabled for type safety

## Important Files to Preserve
- **Build artifacts**: `.next/`, `node_modules/`, `.playwright/` (gitignored)
- **Generated files**: `next-env.d.ts` (Next.js types)
- **WASM files**: Copied to `/public` during install, required for image generation
- **Changesets**: Files in `.changeset/` directory track version changes
- **Special source files**: `common/font.ts` and `common/twemoji.ts` (excluded from Biome linting/formatting)

## Best Practices for AI Agents

1. **Minimal Changes**: Make the smallest possible changes to achieve the goal
2. **Test Early**: Run linter and tests immediately after making changes
3. **Follow Existing Patterns**: Match the style and structure of existing code
4. **Preserve Tests**: Never delete or modify working tests unless absolutely necessary
5. **Use Ecosystem Tools**: Prefer built-in tools (Biome, pnpm) over manual changes
6. **Document Changes**: Create appropriate changeset files for version control
7. **Respect Configuration**: Don't modify config files unless specifically required
8. **Verify Builds**: Always ensure `pnpm build` succeeds before finalizing changes

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Biome Documentation](https://biomejs.dev/)
- [Satori Documentation](https://github.com/vercel/satori)
- [Playwright Documentation](https://playwright.dev/)
- [Contributing Guide](./CONTRIBUTING.md)
- [Code of Conduct](./CODE_OF_CONDUCT.md)

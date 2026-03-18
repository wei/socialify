#!/usr/bin/env bash
set -euo pipefail

# Run Playwright e2e tests in a Linux Docker container on non-Linux hosts
# to ensure screenshot snapshots match CI (Ubuntu Linux).
# On Linux (including CI), runs Playwright directly.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

# Determine OS
OS="$(uname -s)"

if [ "$OS" = "Linux" ] || [ "${CI:-}" = "true" ]; then
  # On Linux or CI, run Playwright directly
  exec npx playwright test "$@"
fi

# Non-Linux (macOS, Windows/WSL, etc.) — run in Docker
PLAYWRIGHT_VERSION="$(node -p 'require("@playwright/test/package.json").version')"
NODE_VERSION="$(cat "$PROJECT_DIR/.nvmrc")"
DOCKER_IMAGE="socialify-e2e:pw-${PLAYWRIGHT_VERSION}-node-${NODE_VERSION}"

# Build the image if it doesn't exist (cached after first run)
if ! docker image inspect "$DOCKER_IMAGE" >/dev/null 2>&1; then
  echo "Building e2e Docker image (first time only)..."
  docker build \
    --build-arg NODE_VERSION="$NODE_VERSION" \
    --build-arg PLAYWRIGHT_VERSION="$PLAYWRIGHT_VERSION" \
    -t "$DOCKER_IMAGE" \
    -f "$SCRIPT_DIR/Dockerfile.e2e" \
    "$SCRIPT_DIR"
fi

echo "Running e2e tests in Docker (${DOCKER_IMAGE})..."

# Load .env file variables to pass into the container
ENV_ARGS=()
if [ -f "$PROJECT_DIR/.env" ]; then
  while IFS='=' read -r key value; do
    # Skip comments and empty lines
    [[ -z "$key" || "$key" =~ ^# ]] && continue
    ENV_ARGS+=("-e" "$key")
  done < "$PROJECT_DIR/.env"
fi

# Also forward GITHUB_TOKEN from the host environment if set
if [ -n "${GITHUB_TOKEN:-}" ]; then
  ENV_ARGS+=("-e" "GITHUB_TOKEN")
fi

# Use -t only when running in a terminal
TTY_FLAG=""
if [ -t 0 ]; then
  TTY_FLAG="-t"
fi

# Anonymous volumes for node_modules and .next prevent the container's
# Linux-specific installed dependencies from overwriting the host's copies.
# They shadow the corresponding dirs in the mounted project volume so the
# container gets its own isolated versions while still reading source files
# and writing snapshot updates directly to the host.
exec docker run --rm -i $TTY_FLAG \
  -w /work \
  -v "$PROJECT_DIR:/work" \
  -v /work/node_modules \
  -v /work/.next \
  "${ENV_ARGS[@]}" \
  "$DOCKER_IMAGE" \
  bash -c "corepack prepare && CI=true pnpm install --frozen-lockfile --store-dir /tmp/pnpm-store && npx playwright test $*"

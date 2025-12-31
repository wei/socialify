# Stage 1: Base image with Node.js and pnpm setup
FROM node:24-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_ENV=production
ENV CI=true

RUN corepack enable

WORKDIR /app

# Stage 2: Install ONLY production dependencies
FROM base AS prod-deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install -r --prod --frozen-lockfile

# Stage 3: Install development dependencies and Build the Next.js application
FROM prod-deps AS builder

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Run install again to add devDependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install -r --frozen-lockfile

COPY . .
RUN pnpm postinstall && pnpm build

# Stage 4: Production image using distroless
FROM gcr.io/distroless/nodejs24-debian12 AS runner

ENV PROJECT_URL=http://localhost:3000
# ENV GITHUB_TOKEN=
# ENV GTM_ID=

ENV PORT=3000
ENV NODE_ENV=production
ENV CI=true
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

COPY package.json ./
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./

EXPOSE 3000

CMD ["./node_modules/next/dist/bin/next", "start"]

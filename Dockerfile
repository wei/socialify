# Stage 1: Install dependencies
FROM node:22-alpine AS deps

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_ENV=production
ENV CI=true

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && \
  pnpm fetch --prod && \
  pnpm install -r --offline --prod


# Stage 2: Build the application
FROM deps AS builder

ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm fetch --dev && \
  pnpm install -r --offline --dev --prod
COPY . .
RUN pnpm build


# Stage 3: Prepare the production image
FROM gcr.io/distroless/nodejs22-debian12 AS runner

ENV GITHUB_TOKEN=
ENV PROJECT_URL=http://localhost:3000
ENV GTM_ID=

ENV PORT=3000
ENV NODE_ENV=production
ENV CI=true
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

COPY package.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./

EXPOSE 3000

CMD ["./node_modules/next/dist/bin/next", "start"]

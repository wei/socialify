FROM node:22-alpine AS base

# Stage 1: Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json yarn.lock ./
# postinstall script requires a public directory
RUN mkdir -p /app/public && \
  yarn install --frozen-lockfile

# Stage 2: Build the application
FROM base AS builder

ENV NODE_ENV=production
ENV CI=true
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY --from=deps /app/public ./public

RUN yarn build

# Stage 3: Prepare the production image
FROM base AS runner

ENV GITHUB_TOKEN=
ENV PROJECT_URL=http://localhost:3000
ENV GTM_ID=

ENV PORT=3000
ENV NODE_ENV=production
ENV CI=true
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

# Copy only the necessary files and install production dependencies
COPY package.json yarn.lock ./
RUN mkdir -p /app/public && \
  yarn install --production --frozen-lockfile && \
  yarn cache clean

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js /app/custom-rewrites.js ./

EXPOSE 3000

CMD ["yarn", "start"]
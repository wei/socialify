# Source: https://github.com/vercel/next.js/blob/2161d8c012dcd98eb8690814bd275d56c45bf00a/examples/with-docker/Dockerfile

FROM node:18-alpine AS base

ENV GITHUB_TOKEN=
ENV PROJECT_URL=http://localhost:3000
ENV GTM_ID=
ENV PORT=3000
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

COPY package.json yarn.lock* ./
COPY public ./public/
RUN yarn --frozen-lockfile

COPY . .

RUN yarn build

CMD ["yarn", "start"]

EXPOSE 3000

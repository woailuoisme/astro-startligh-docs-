FROM oven/bun:1-alpine AS base

ENV NPM_CONFIG_REGISTRY="https://mirrors.tencent.com/npm/" \
	BUN_CONFIG_REGISTRY="https://mirrors.tencent.com/npm/"

WORKDIR /app

FROM base AS deps

COPY package.json bun.lock ./
RUN --mount=type=cache,target=/root/.bun/install/cache bun install --frozen-lockfile

FROM base AS build

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

FROM nginx:alpine AS runtime

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

FROM oven/bun:1-alpine AS base

ARG NPM_REGISTRY=https://mirrors.tencent.com/npm/
ENV NPM_CONFIG_REGISTRY=${NPM_REGISTRY} \
	BUN_CONFIG_REGISTRY=${NPM_REGISTRY}

WORKDIR /app

FROM base AS deps

COPY package.json bun.lock ./
RUN --mount=type=cache,target=/root/.bun/install/cache bun install --frozen-lockfile

FROM base AS build

COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN bun run build

FROM nginx:alpine AS runtime

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

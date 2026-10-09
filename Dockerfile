# ── Stage 1: D2 独立构建下载阶段（并行流水线分支） ──────────────────
FROM alpine:3 AS d2-builder

RUN apk add --no-cache curl tar ca-certificates make gcompat && \
	curl -fsSL https://d2lang.com/install.sh | sh -s -- && \
	/usr/local/bin/d2 version


# ── Stage 2: 基础环境与工作空间配置 ───────────────────────────────
FROM oven/bun:1-alpine AS base

WORKDIR /app

# ── Stage 3: 依赖安装阶段（隔离依赖锁，挂载 BuildKit 包缓存） ──────
FROM base AS deps

COPY package.json bun.lock* ./
RUN --mount=type=cache,target=/root/.bun/install/cache \
	bun install --frozen-lockfile

# ── Stage 4: 静态站点编译阶段 ─────────────────────────────────────
FROM base AS build

# 提前安装 gcompat 与注入编译依赖，避免文档源码变更引起底层工具层失效
RUN apk add --no-cache gcompat
COPY --from=d2-builder /usr/local/bin/d2 /usr/local/bin/d2
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
RUN bun run build

# ── Stage 5: 生产极简运行时阶段（纯静态托管，体积仅约 25MB） ──────
FROM nginx:alpine AS runtime

COPY --from=build /app/dist /usr/share/nginx/html

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
	CMD wget -q --spider http://127.0.0.1/ || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]




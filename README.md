
# VendingAPI 文档中心

VendingAPI Docs 是一个基于 Astro + Starlight 构建的静态产品 API 协议（SSE、WebSocket 和 MQTT 5）文档网站。

## 技术栈

- **框架**: [Astro](https://astro.build/) & [Starlight](https://starlight.astro.build/)
- **包管理器与运行时**: [Bun](https://bun.sh/)
- **运行环境**: Node.js
- **工具链**: [mise](https://mise.jdx.dev/)（工具集管理）& [just](https://github.com/casey/just)（任务运行器）
- **样式**: Tailwind CSS 4
- **格式化与校验**: oxlint, oxfmt & rumdl

## 快速开始

### 1. 准备工作

确保本地已安装 `mise`，然后初始化工具链与依赖：

```bash
mise install
bun install --frozen-lockfile
```

### 2. 本地开发

启动本地开发服务器，访问 `http://localhost:4321`：

```bash
bun run dev
```

### 3. 提交前验证

在提交或部署前，务必运行本地完整校验（包含 Lint、类型检查、格式化检查以及构建验证）：

```bash
bun run verify
```

### 4. 生产构建

将静态网站构建输出至 `dist/` 目录：

```bash
bun run build
```

## 常用命令

| 命令                    | 描述                                                  |
| ----------------------- | ----------------------------------------------------- |
| `bun run dev`           | 启动本地开发服务器                                    |
| `bun run build`         | 构建静态生产版本                                      |
| `bun run preview`       | 本地预览构建好的静态网页                              |
| `bun run cf:build`      | 构建静态生产文件                                      |
| `bun run cf:deploy`     | 部署至 Cloudflare Pages 对应项目                      |
| `bun run fmt`           | 自动格式化代码与文档（oxfmt, rumdl）                  |
| `bun run verify`        | 运行完整本地校验套件                                  |

## 项目结构

```text
.
├── src/
│   ├── content/docs/   # 文档内容文件（支持 Markdown/MDX，在此处添加 SSE/WS/MQTT 文档）
│   ├── components/     # Astro 与 Svelte UI 组件
│   └── styles/         # 全局 CSS 样式
├── Dockerfile          # 生产级 Nginx 静态多阶段 Docker 构建配置
├── docker-compose.yml  # 本地容器运行与健康检查配置（映射端口 3110:80）
├── .cnb.yml            # cnb.cool 云原生构建与镜像推送流水线配置
├── .cnb/               # cnb.cool 部署、网页触发及安全扫描配置
└── wrangler.jsonc      # Cloudflare Pages 部署配置
```

## 部署

### Cloudflare Pages

```bash
bun run cf:build
bun run cf:deploy
```

### Docker (本地运行)

```bash
docker compose up --build
# 启动后访问 http://localhost:3110
```

### CNB (云原生构建与发布)

本项目配置了对 [cnb.cool](https://cnb.cool) 的持续集成与镜像推送支持：

- **Pull Request**：自动触发门禁质量检查（格式化、Lint、Markdown 语法、TypeScript 类型、构建验证）。
- **Push to main** / **Web Trigger**：自动构建 `linux/amd64` 镜像并推送到 `docker.cnb.cool/${CNB_REPO_SLUG}:latest`，并保留 registry 缓存加速后续构建。
- **Tag Push (`v*`)**：自动打标 `${CNB_BRANCH}` 与 `latest` 并推送发布镜像。

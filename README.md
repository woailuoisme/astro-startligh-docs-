
# VendingAPI 文档中心

VendingAPI Docs 是一个基于 Astro + Starlight 构建的静态产品 API 协议（SSE、WebSocket 和 MQTT 5）文档网站。

## 技术栈

- **框架**: [Astro](https://astro.build/) & [Starlight](https://starlight.astro.build/)
- **包管理器**: [pnpm](https://pnpm.io/)
- **运行环境**: Node.js
- **工具链**: [mise](https://mise.jdx.dev/)（工具集管理）& [just](https://github.com/casey/just)（任务运行器）
- **样式**: Tailwind CSS 4
- **格式化与校验**: Biome, Prettier & markdownlint

## 快速开始

### 1. 准备工作

确保本地已安装 `mise`，然后初始化工具链与依赖：

```bash
mise install
just setup
```

### 2. 本地开发

启动本地开发服务器，访问 `http://localhost:4321`：

```bash
just dev
```

### 3. 提交前验证

在提交或部署前，务必运行本地完整校验（包含 Lint、类型检查、格式化检查以及构建验证）：

```bash
just verify
```

### 4. 生产构建

将静态网站构建输出至 `dist/` 目录：

```bash
just build
```

## 常用命令

| 命令             | 描述                                                  |
| ---------------- | ----------------------------------------------------- |
| `pnpm dev`       | 启动本地开发服务器                                    |
| `pnpm build`     | 构建静态生产版本                                      |
| `pnpm preview`   | 本地预览构建好的静态网页                              |
| `pnpm cf:build`  | 构建静态生产文件                                      |
| `pnpm cf:deploy` | 部署至 Cloudflare Pages 对应项目                      |
| `pnpm fmt`       | 自动格式化代码与文档（Biome, rumdl）                  |
| `pnpm verify`    | 运行完整本地校验套件                                  |

## 项目结构

```text
.
├── src/
│   ├── content/docs/   # 文档内容文件（支持 Markdown/MDX，在此处添加 SSE/WS/MQTT 文档）
│   ├── components/     # Astro 与 Svelte UI 组件
│   └── styles/         # 全局 CSS 样式
├── Dockerfile          # 基于 Nginx 的静态运行时 Docker 配置
├── docker-compose.yml  # 本地容器运行与冒烟测试配置
└── wrangler.jsonc      # Cloudflare Pages 部署配置
```

## 部署

### Cloudflare Pages

```bash
pnpm cf:build
pnpm cf:deploy
```

### Docker

```bash
docker compose up --build
```

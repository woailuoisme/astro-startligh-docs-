# 仓库开发与协作指南

本项目为基于 Astro + Starlight 构建的静态产品 API 协议文档站点。

## 目录结构

- `src/content/docs/`：文档路由与内容源文件（Markdown/MDX）。
- `src/content.config.ts`：内容集合定义与模式约束。
- `src/assets/`：文档内引用的本地静态资源与媒体文件。
- `public/`：根级静态资源（如 `favicon.svg`）。
- `src/styles/global.css`：全局样式。
- `astro.config.mjs` & `tsconfig.json`：Astro 与 TypeScript 编译配置。
- `.mise.toml`：本地开发工具链版本固定配置。

## 核心命令

所有任务统一通过 `pnpm` 脚本管理：

- `mise install`：安装固定版本的运行时与 CLI 工具。
- `pnpm install --frozen-lockfile`：严格依据锁定文件安装依赖。
- `pnpm dev`：启动本地开发服务器（`http://localhost:4321`）。
- `pnpm build`：构建静态站点至 `dist/`。
- `pnpm preview`：本地预览构建产物。
- `pnpm cf:build`：构建静态生产文件。
- `pnpm cf:deploy`：部署 `dist/` 至 Cloudflare Pages（项目名 `vending-docs`）。
- `pnpm check`：执行 `astro check` 框架级语法与模板校验。
- `pnpm lint`：执行 Biome 校验与格式化修复。
- `pnpm md`：执行 rumdl Markdown/MDX 语法校验。
- `pnpm fmt` / `pnpm fmt:check`：自动格式化 / 格式合规检查（Biome + rumdl）。
- `pnpm type`：执行 `tsc --noEmit` 进行 TypeScript 类型检查。
- `pnpm unused`：执行 Knip 检查未使用的代码与依赖。
- `pnpm verify`：运行完整本地校验套件（提交前必跑：lint + md + type + check + build）。

## 代码规范与约定

- **缩进**：使用 Tab 缩进。
- **引号**：JS、TS 及配置文件中统一使用双引号。
- **文档拆分**：文档保持小而专注，按协议/主题归类组织（如 `sse/index.mdx`、`websocket/index.mdx`）。
- **自动化格式**：提交必须由 Biome 及 rumdl 校验通过，避免人工对抗格式规则。

## Agent 协作指引

- **变更范围约束**：修改聚焦于文档站内容；除非显式要求，避免引入额外工具链或复杂运行时依赖。
- **文档查阅准则**：框架与库行为验证优先使用 MCP：`context7` > `exa` > `tavily` > `fetch`。以官方权威文档与源码为准，引用保持简短精准。
- **保持同步**：项目命令、结构或流程发生变更时，需同步维护更新 `AGENTS.md`。

@RTK.md

### 本地追踪与领域文档

- **任务管理**：本地 Markdown 任务存放在 `.scratch/`（参考 `docs/agents/issue-tracker.md`）。
- **分类标签**：`needs-triage`、`needs-info`、`ready-for-agent`、`ready-for-human`、`wontfix`。
- **领域模型**：单上下文架构，根目录维护 `CONTEXT.md`，架构决策记录于 `docs/adr/`。

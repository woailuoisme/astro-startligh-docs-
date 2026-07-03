# VendingAPI Docs

VendingAPI Docs is a static Astro + Starlight documentation site for product API protocols. It documents SSE, WebSocket, and MQTT 5 integration flows with consistent lifecycle, reliability, authentication, events, and troubleshooting pages.

## Key Features

- Protocol-focused documentation tree for SSE, WebSocket, and MQTT 5.
- Static Astro output suitable for Cloudflare Pages, Docker/Nginx, or any static host.
- Bun-first local workflow with mise-managed tools and just task shortcuts.
- Biome for JS/TS/CSS/JSON formatting and linting, plus Prettier for Markdown, MDX, and Astro content.
- Mermaid, Starlight image zoom, GitHub-style alerts, scroll-to-top, heading badges, and internal link validation.
- Docker image published as `jiaoio/astro-startligh-docs:alpine`.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Content Architecture](#content-architecture)
- [Configuration](#configuration)
- [Available Commands](#available-commands)
- [Formatting and Linting](#formatting-and-linting)
- [Validation](#validation)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## Tech Stack

| Area | Tooling |
| --- | --- |
| Runtime/package manager | Bun `1.3.14` |
| Toolchain manager | mise |
| Task runner | just |
| Framework | Astro `7` |
| Docs framework | Starlight |
| UI islands | React |
| Styling | Tailwind CSS `4` through Vite |
| Icons | `astro-icon`, `lucide-react`, Tabler icons |
| Diagrams | `astro-mermaid`, Mermaid |
| Formatting/linting | Biome, Prettier, markdownlint, `prettier-plugin-astro` |
| Type checking | TypeScript, `astro check` |
| Unused code checks | Knip |
| Container runtime | Nginx Alpine |
| Cloud deployment | Cloudflare Pages via Wrangler |
| Docker registry | Docker Hub |

## Prerequisites

Install mise first. The project-local `.mise.toml` pins the required tools:

```toml
[tools]
node = "24"
bun = "1.3.14"
just = "1.51.0"
wrangler = "latest"
markdownlint-cli2 = "latest"
```

You also need Docker if you want to build or run the container image locally.

For Cloudflare deployment, authenticate Wrangler once:

```bash
wrangler login
wrangler whoami
```

For Docker Hub publishing through GitHub Actions, configure this repository secret:

| Secret | Purpose |
| --- | --- |
| `DOCKERHUB_TOKEN` | Docker Hub token used by `.github/workflows/docker-publish.yml` |

## Getting Started

### 1. Install Tools and Dependencies

```bash
mise install
just setup
```

`just setup` runs:

```bash
mise install
bun install --frozen-lockfile
```

The only committed package lockfile is `bun.lock`.

### 2. Start Local Development

```bash
just dev
```

Open:

```text
http://localhost:4321
```

### 3. Build the Static Site

```bash
just build
```

Astro writes the production output to:

```text
dist/
```

### 4. Preview the Astro Build

```bash
just preview
```

### 5. Run the Full Local Verification Suite

```bash
just verify
just knip
```

## Project Structure

```text
.
├── .github/workflows/
│   └── docker-publish.yml       # Manual Docker Hub build/push workflow
├── public/
│   └── favicon.svg              # Static public assets copied as-is
├── src/
│   ├── assets/                  # Imported images and local media
│   ├── components/              # Astro and React UI components
│   ├── content/
│   │   └── docs/                # Starlight Markdown/MDX route content
│   ├── lib/                     # Shared frontend utilities
│   ├── styles/
│   │   └── global.css           # Global Tailwind/CSS entry
│   └── content.config.ts        # Astro content collection schema
├── specs/001-api-protocol-docs/ # Product protocol docs planning artifacts
├── astro.config.mjs             # Astro, Starlight, Vite, and integration config
├── biome.jsonc                  # Biome formatter/linter config
├── .env.example                 # Optional public analytics env example
├── .markdownlint-cli2.jsonc     # Markdown/MDX lint rules
├── bun.lock                     # Bun dependency lockfile
├── Dockerfile                   # Bun build stage + Nginx static runtime
├── docker-compose.yml           # Local container smoke/runtime config
├── justfile                     # Project task shortcuts
├── tsconfig.json                # TypeScript config
└── wrangler.jsonc               # Cloudflare Pages project config
```

## Content Architecture

Starlight loads pages from `src/content/docs/`. Each Markdown or MDX file becomes a route.

Current protocol sections:

```text
src/content/docs/
├── index.mdx
├── mqtt5/
│   ├── connection.mdx
│   ├── index.mdx
│   ├── maintenance.mdx
│   ├── reliability.mdx
│   ├── telemetry.mdx
│   └── topics.mdx
├── sse/
│   ├── endpoint.mdx
│   ├── errors.mdx
│   ├── events.mdx
│   ├── index.mdx
│   └── reconnect.mdx
└── websocket/
    ├── auth.mdx
    ├── channels.mdx
    ├── connection.mdx
    ├── events.mdx
    ├── index.mdx
    └── reliability.mdx
```

The sidebar is configured manually in `astro.config.mjs` and autogenerates the protocol groups:

- SSE
- WebSocket
- MQTT 5

When adding protocol docs, keep files small and focused. Prefer topic-based pages such as `connection.mdx`, `events.mdx`, `reliability.mdx`, and `errors.mdx` over one large page.

## Configuration

### Astro and Starlight

`astro.config.mjs` defines:

- `site`, used by sitemap generation.
- Starlight title: `VendingAPI`.
- Custom Starlight components:
  - `src/components/TopNav.astro`
  - `src/components/Sidebar.astro`
- Protocol sidebar groups.
- Mermaid setup before Starlight.
- Image zoom, GitHub alerts, scroll-to-top, heading badges, telescope search, and link validation.
- Optional Cloudflare Web Analytics beacon injection.
- React integration.
- Tailwind CSS through Vite.

Before production deployment, replace the placeholder site URL:

```js
site: "https://your-docs.com";
```

### Cloudflare Web Analytics

Cloudflare Web Analytics is optional and controlled by a build-time public environment variable:

```bash
PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN=your-token
```

When the token is present, `astro.config.mjs` adds Cloudflare's beacon script to Starlight's `<head>` config. When the token is missing, no analytics script is emitted.

For local use:

```bash
cp .env.example .env
```

Then fill in:

```dotenv
PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN=your-token
```

This is a public browser analytics token, not a secret. Do not put private Cloudflare API tokens in this variable.

### Cloudflare Pages

`wrangler.jsonc` configures direct upload deployment:

```jsonc
{
  "name": "vending-docs",
  "pages_build_output_dir": "./dist",
  "compatibility_date": "2026-06-03"
}
```

This project is a static site. It does not use Cloudflare Pages Functions, KV, D1, R2, Durable Objects, or Workers runtime bindings. Because there are no Pages Functions, `wrangler pages deployment tail` is not useful for application logs in the current architecture.

### Docker

The Docker image uses:

- `oven/bun:1-alpine` for dependency install and build.
- Tencent npm registry mirror during image build.
- BuildKit cache for Bun install cache.
- `nginx:alpine` as the static runtime.

The runtime serves `dist/` from:

```text
/usr/share/nginx/html
```

## Available Commands

All commands should be run from the repository root.

| Command | Description |
| --- | --- |
| `mise install` | Install the local toolchain from `.mise.toml`. |
| `just setup` | Install tools and Bun dependencies. |
| `just --list` | List available just recipes. |
| `just dev` | Start the Astro dev server at `localhost:4321`. |
| `just build` | Build the static production site into `dist/`. |
| `just preview` | Preview the Astro production build locally. |
| `just preview-cloudflare` | Build and preview `dist/` through Cloudflare Pages local dev. |
| `just deploy-cf` | Build and deploy `dist/` to Cloudflare Pages project `vending-docs`. |
| `just lint` | Run Biome check with write fixes. |
| `just mdlint` | Run Markdown and MDX lint checks. |
| `just fmt` | Run Biome write fixes, Prettier content formatting, and markdownlint fixes. |
| `just type` | Run `tsc --noEmit`. |
| `just check` | Run `astro check`. |
| `just knip` | Run unused code/dependency checks. |
| `just verify` | Run `lint`, `type`, `check`, and `build`. |

Package scripts are still available through Bun:

```bash
bun run dev
bun run build
bun run preview
bun run check
bun run lint
bun run format:content
bun run type
bun run knip
```

Run Astro CLI subcommands through:

```bash
bun run astro -- --help
bun run astro -- add react
```

## Formatting and Linting

### Biome

Biome handles JavaScript, TypeScript, CSS, JSON, and JSONC:

```bash
just lint
```

Relevant behavior:

- Tabs for formatter indentation.
- Double quotes for JavaScript/TypeScript/config files.
- Tailwind CSS directives enabled for CSS parsing.
- Import organization enabled.
- React, project, and type lint domains enabled.

### Prettier

Prettier is scoped to content formats that Biome does not own well in this project:

```bash
bun run format:content
```

It formats:

- `src/content/docs/**/*.md`
- `src/content/docs/**/*.mdx`
- `src/components/**/*.astro`

The Prettier config uses:

- `prettier-plugin-astro`
- double quotes
- `tabWidth: 2`
- `proseWrap: "preserve"`

### markdownlint

markdownlint is managed by mise as `markdownlint-cli2` and checks Markdown/MDX content:

```bash
just mdlint
```

Automatic fixes are included in:

```bash
just fmt
```

The config lives in `.markdownlint-cli2.jsonc`. The current rules keep the useful structural checks while disabling:

- `MD013` line length, because docs prose and tables should not be wrapped mechanically.
- `MD033` inline HTML, because MDX/Starlight content may include component markup.
- `MD041` first-line heading, because MDX pages can start with frontmatter.

## Validation

Use the standard suite before opening a pull request or deploying:

```bash
just verify
just knip
```

For docs rendering or layout changes, also run:

```bash
just dev
```

Then inspect the changed pages in the browser.

Known build warnings can appear from upstream integrations:

- Node `module.register()` deprecation warning.
- Astro markdown plugin deprecation warning.
- Vite empty chunk warning.
- Vite chunk-size warning for large generated Mermaid/Starlight assets.

These warnings do not currently block `astro check` or `astro build`.

## Deployment

### Cloudflare Pages

Cloudflare Pages is the recommended static hosting target for this repo.

Authenticate once:

```bash
wrangler login
wrangler whoami
```

Deploy:

```bash
just deploy-cf
```

That command builds the site, then runs:

```bash
wrangler pages deploy ./dist --project-name vending-docs
```

Preview with Cloudflare Pages locally:

```bash
just preview-cloudflare
```

### Docker

Build the image:

```bash
docker build -t jiaoio/astro-startligh-docs:alpine .
```

Run with Docker Compose:

```bash
docker compose up --build
```

Open:

```text
http://localhost:4321
```

The Compose healthcheck requests:

```text
http://127.0.0.1/
```

Run a direct container smoke test:

```bash
docker run --rm -p 4321:80 jiaoio/astro-startligh-docs:alpine
```

### Docker Hub Workflow

`.github/workflows/docker-publish.yml` is manual-only:

```yaml
on:
  workflow_dispatch:
```

It builds and pushes:

```text
jiaoio/astro-startligh-docs:<tag>
```

The default tag is:

```text
alpine
```

Required repository secret:

```text
DOCKERHUB_TOKEN
```

## Troubleshooting

### `bun install --frozen-lockfile` Fails

The dependency graph changed without updating `bun.lock`.

Run:

```bash
bun install
```

Review the lockfile diff, then retry:

```bash
bun install --frozen-lockfile
```

### `wrangler` Is Missing

Install mise tools:

```bash
mise install
```

Confirm Wrangler is available:

```bash
wrangler --version
```

### Cloudflare Deploy Requires Login

Check authentication:

```bash
wrangler whoami
```

If not authenticated:

```bash
wrangler login
```

In CI, use `CLOUDFLARE_API_TOKEN` instead of interactive login.

### `site` URL Is Still Placeholder

If sitemap or canonical URLs are wrong, update `astro.config.mjs`:

```js
site: "https://your-real-domain.example";
```

### Markdown or MDX Formatting Looks Unexpected

Run the content formatter:

```bash
bun run format:content
```

Prettier preserves prose wrapping by design. If you want hard wrapping, change `proseWrap` in `.prettierrc.json`.

### Docker Build Is Slow

The Dockerfile already caches Bun package downloads with BuildKit:

```dockerfile
RUN --mount=type=cache,target=/root/.bun/install/cache bun install --frozen-lockfile
```

Most remaining time is Astro/Vite static generation. Repeated builds should reuse dependency layers unless `package.json` or `bun.lock` changes.

### Container Starts but Healthcheck Fails Immediately

Nginx can take a moment to start. Retry after a short delay:

```bash
sleep 1
curl -fsS -I http://127.0.0.1:4321/
```

## Contributing

1. Add or update docs under `src/content/docs/`.
1. Keep protocol pages focused and consistent with the existing section structure.
1. Update `astro.config.mjs` only when navigation, integrations, or site metadata need to change.
1. Run:

```bash
just fmt
just verify
just knip
```

1. For visible docs or layout changes, include preview notes or screenshots in the pull request.

Recent commit subjects in this repo are short and direct. Keep commit messages concise and imperative.

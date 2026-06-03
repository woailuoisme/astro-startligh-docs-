# Repository Guidelines

## Project Structure & Module Organization

This is an Astro + Starlight documentation site.

- `src/content/docs/` contains the docs content (`.md` and `.mdx`) exposed as routes.
- `src/content.config.ts` defines content collections and schema.
- `src/assets/` holds imported images and local media used in docs.
- `public/` is for static files such as `favicon.svg`.
- `src/styles/global.css` contains global styling.
- `astro.config.mjs` and `tsconfig.json` hold project-wide build and TypeScript settings.
- `.env.example` documents optional public build-time variables such as Cloudflare Web Analytics.

## Build, Test, and Development Commands

- `mise install` installs the pinned local toolchain from `.mise.toml`.
- `just setup` installs the pinned toolchain and project dependencies.
- `just --list` lists the available task shortcuts.
- `just dev` starts the local site at `http://localhost:4321`.
- `just verify` runs the standard local verification suite.
- `bun install --frozen-lockfile` installs dependencies from `bun.lock`.
- `bun run dev` starts the local site at `http://localhost:4321`.
- `bun run build` creates the production output in `dist/`.
- `bun run preview` serves the built site locally.
- `just preview-cloudflare` previews the built site with Cloudflare Pages.
- `just deploy-cf` deploys `dist/` to Cloudflare Pages project `vending-docs`.
- `bun run check` runs `astro check` for framework-level validation.
- `bun run lint` runs Biome formatting and linting.
- `just mdlint` runs Markdown and MDX lint checks.
- `just fmt` runs Biome, Prettier, and markdownlint auto-fixes.
- `bun run type` runs `tsc --noEmit` for type checking.

## Coding Style & Naming Conventions

- Use tabs for indentation.
- Use double quotes in JavaScript, TypeScript, and config files.
- Prefer small, focused Markdown/MDX files under `src/content/docs/`.
- Name docs files by protocol or topic, for example `sse/index.mdx` or `websocket/index.mdx`.
- Use Biome for formatting and import organization; do not hand-format against the configured rules.

## Testing Guidelines

There is no dedicated test suite in this repository. Use the validation commands above before opening a PR:

- `just verify`

Or run the equivalent underlying commands:

- `bun run lint`
- `just mdlint`
- `bun run type`
- `bun run check`
- `bun run build`

If you change docs rendering or layout, also verify the result in `bun run dev`.

## Commit & Pull Request Guidelines

Recent commits use short, direct messages such as `fix`. Keep subjects concise and imperative.

For pull requests, include:

- A short summary of the change
- The commands you ran to validate it
- Screenshots or preview notes for visible docs/UI changes
- Links to any related issue or task

## Agent-Specific Instructions

- Keep changes scoped to the docs site; avoid introducing extra tooling unless it is needed.
- Prefer editing content under `src/content/docs/` and shared styles only when required.
- Update `AGENTS.md` when project commands, structure, or workflow change.
- When verifying documentation or framework behavior, prefer MCP doc sources in this order: `context7` first, then `exa`, `tavily`, and `fetch`.
- Use official docs, upstream READMEs, and source files as the source of truth whenever possible.
- When you quote or reference docs, keep the excerpt short and include links; prefer line-level references when the source exposes them.

<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read `specs/001-api-protocol-docs/plan.md`
<!-- SPECKIT END -->

@RTK.md

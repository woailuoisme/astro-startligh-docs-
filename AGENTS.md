# Repository Guidelines

## Project Structure & Module Organization

This is an Astro + Starlight documentation site.

- `src/content/docs/` contains the docs content (`.md` and `.mdx`) exposed as routes.
- `src/content.config.ts` defines content collections and schema.
- `src/assets/` holds imported images and local media used in docs.
- `public/` is for static files such as `favicon.svg`.
- `src/styles/global.css` contains global styling.
- `astro.config.mjs` and `tsconfig.json` hold project-wide build and TypeScript settings.

## Build, Test, and Development Commands

- `pnpm install` installs dependencies.
- `pnpm dev` starts the local site at `http://localhost:4321`.
- `pnpm build` creates the production output in `dist/`.
- `pnpm preview` serves the built site locally.
- `pnpm check` runs `astro check` for framework-level validation.
- `pnpm lint` runs Biome formatting and linting.
- `pnpm type` runs `tsc --noEmit` for type checking.

## Coding Style & Naming Conventions

- Use tabs for indentation.
- Use double quotes in JavaScript, TypeScript, and config files.
- Prefer small, focused Markdown/MDX files under `src/content/docs/`.
- Name docs files by topic, for example `guides/example.md` or `reference/example.md`.
- Use Biome for formatting and import organization; do not hand-format against the configured rules.

## Testing Guidelines

There is no dedicated test suite in this repository. Use the validation commands above before opening a PR:

- `pnpm lint`
- `pnpm type`
- `pnpm build`

If you change docs rendering or layout, also verify the result in `pnpm dev`.

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

<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
<!-- SPECKIT END -->

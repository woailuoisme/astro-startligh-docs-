# List available recipes.
default:
	@just --list

# Install project tools and dependencies.
setup:
	mise install
	bun install --frozen-lockfile

# Start the local development server.
dev:
	bun run dev

# Build the production site.
build:
	bun run build

# Preview the production build locally.
preview:
	bun run preview

# Preview the Cloudflare Pages build locally.
preview-cloudflare: build
	wrangler pages dev ./dist

# Deploy the static site to Cloudflare Pages.
deploy-cf: build
	wrangler pages deploy ./dist --project-name vending-docs

# Run Astro framework checks.
check:
	bun run check

# Run Biome formatting and linting.
lint:
	bun run lint

# Run Markdown lint checks.
mdlint:
	markdownlint-cli2 --fix

# Format all supported project files.
fmt:
	bun run lint
	bun run format:content
	markdownlint-cli2 --fix

# Run TypeScript type checking.
type:
	bun run type

# Run Knip unused code/dependency checks.
knip:
	bun run knip

# Run the standard local verification suite.
verify: lint type check build

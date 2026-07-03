# List available recipes.
default:
	@just --list

# Install project tools and dependencies.
setup:
	mise install
	bun install --frozen-lockfile

# Start the local development server.
dev:
	astro dev

# Build the production site.
build:
	astro build

# Preview the production build locally.
preview:
	astro preview

# Run Astro CLI subcommands.
astro *args:
	astro {{args}}

# Preview the Cloudflare Pages build locally.
cf: build
	wrangler pages dev ./dist

# Deploy the static site to Cloudflare Pages.
deploy: build
	wrangler pages deploy ./dist --project-name vending-docs

# Run Astro framework checks.
check:
	astro check

# Run Biome formatting and linting.
lint:
	biome check --write .

# Run Markdown lint checks.
md:
	rumdl check .

# Format all supported project files.
fmt:
	biome check --write .
	prettier --write "src/content/docs/**/*.{md,mdx}" "src/components/**/*.astro"
	rumdl fmt .

# Check content formatting.
fmt-check:
	prettier --check "src/content/docs/**/*.{md,mdx}" "src/components/**/*.astro"

# Run TypeScript type checking.
type:
	tsc --noEmit

# Run Knip unused code/dependency checks.
unused:
	knip

# Run the standard local verification suite.
verify: lint md type check build

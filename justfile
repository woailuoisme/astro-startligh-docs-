# List available recipes.
default:
	@just --list

# Install project tools and dependencies.
setup:
	mise install
	pnpm install

# Start the local development server.
dev:
	pnpm dev

# Build the production site.
build:
	pnpm build

# Preview the production build locally.
preview:
	pnpm preview

# Run Astro framework checks.
check:
	pnpm check

# Run Biome formatting and linting.
lint:
	pnpm lint

# Run TypeScript type checking.
type:
	pnpm type

# Run Knip unused code/dependency checks.
knip:
	pnpm knip

# Run the standard local verification suite.
verify: lint type check build

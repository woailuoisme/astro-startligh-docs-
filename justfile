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

# Run Astro framework checks.
check:
	bun run check

# Run Biome formatting and linting.
lint:
	bun run lint

# Format all supported project files.
fmt:
	bun run lint
	bun run format:content

# Run TypeScript type checking.
type:
	bun run type

# Run Knip unused code/dependency checks.
knip:
	bun run knip

# Run the standard local verification suite.
verify: lint type check build

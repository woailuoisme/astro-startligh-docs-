export default {
	useTabs: true,
	singleQuote: false,
	trailingComma: "none",
	sortImports: true,
	sortTailwindcss: true,

	sortPackageJson: true,
	ignorePatterns: [
		"**/node_modules/**",
		"dist/**",
		".astro/**",
		".agents/**",
		".code-review-graph/**",
		".github/**",
		".idea/**",
		".specify/**",
		".vscode/**",
		"src/components/**/*.astro",
		"src/content/docs/**",
		"**/*.{md,mdx}",
		"bun.lock*"
	]
};

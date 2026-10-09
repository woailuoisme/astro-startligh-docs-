export default {
	plugins: ["typescript", "unicorn", "import"],
	categories: {
		correctness: "error",
		perf: "warn"
	},
	ignorePatterns: [
		"dist/**",
		".astro/**",
		".agents/**",
		".code-review-graph/**",
		".github/**",
		".idea/**",
		".specify/**",
		".vscode/**",
		"src/content/docs/**"
	]
};

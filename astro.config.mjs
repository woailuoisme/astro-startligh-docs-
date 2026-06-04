import react from "@astrojs/react";
import starlight from "@astrojs/starlight";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import compress from "astro-compress";
import icon from "astro-icon";
import mermaid from "astro-mermaid";
import starlightGithubAlerts from "starlight-github-alerts";
import starlightHeadingBadges from "starlight-heading-badges";
import starlightImageZoom from "starlight-image-zoom";
import starlightLinksValidator from "starlight-links-validator";
import starlightScrollToTop from "starlight-scroll-to-top";

const cloudflareWebAnalyticsToken =
	process.env.PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN;

export default defineConfig({
	integrations: [
		// ⚠️ mermaid 必须在 starlight 之前
		mermaid({
			autoTheme: true, // 跟随暗/亮模式自动切换
		}),
		icon({
			include: {
				lucide: ["*"], // Lucide 图标库
			},
		}),
		starlight({
			title: "VendingAPI",
			head: cloudflareWebAnalyticsToken
				? [
						{
							tag: "script",
							attrs: {
								defer: true,
								src: "https://static.cloudflareinsights.com/beacon.min.js",
								"data-cf-beacon": JSON.stringify({
									token: cloudflareWebAnalyticsToken,
								}),
							},
						},
					]
				: [],

			social: [
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/your-org/your-repo",
				},
			],
			// Expressive Code 代码块配置（Starlight 内置，无需单独安装）
			expressiveCode: {
				themes: ["starlight-dark", "starlight-light"],
				useStarlightDarkModeSwitch: true,
				useStarlightUiThemeColors: true,
				plugins: [
					pluginLineNumbers(), // 显示行号
					pluginCollapsibleSections(), // 代码块可折叠区段
				],
				styleOverrides: {
					borderRadius: "6px",
					codePaddingInline: "1rem",
				},
			},
			plugins: [
				starlightImageZoom(), // 图片点击放大
				starlightGithubAlerts(), // GitHub 风格告警块
				starlightScrollToTop(), // 回到顶部按钮
				starlightHeadingBadges(), // 标题内嵌 badge
				starlightLinksValidator(),
			],
			components: {
				Search: "./src/components/TopNav.astro",
				Sidebar: "./src/components/Sidebar.astro",
			},
			customCss: ["./src/styles/global.css"],
			sidebar: [
				{
					label: "SSE",
					collapsed: false,
					items: [{ autogenerate: { directory: "sse" } }],
				},
				{
					label: "WebSocket",
					collapsed: false,
					items: [{ autogenerate: { directory: "websocket" } }],
				},
				{
					label: "MQTT 5",
					collapsed: false,
					items: [{ autogenerate: { directory: "mqtt5" } }],
				},
			],
		}),
		react(),
		compress(), // 构建产物压缩，放最后
	],

	vite: {
		plugins: [tailwindcss()],
		build: {
			chunkSizeWarningLimit: 1000,
			rollupOptions: {
				onwarn(warning, warn) {
					if (warning.code === "EMPTY_BUNDLE") return;
					warn(warning);
				},
			},
		},
	},
});

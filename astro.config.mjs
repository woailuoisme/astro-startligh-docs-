import node from "@astrojs/node";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
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
import starlightOpenAPI, { openAPISidebarGroups } from "starlight-openapi";
import starlightScrollToTop from "starlight-scroll-to-top";
import starlightTelescope from "starlight-telescope";

export default defineConfig({
	site: "https://your-docs.com", // ← 改成你的域名，sitemap 必需
	output: "server",
	adapter: node({
		mode: "standalone",
	}),
	integrations: [
		// ⚠️ mermaid 必须在 starlight 之前
		mermaid({
			autoTheme: true, // 跟随暗/亮模式自动切换
		}),
		icon({
			include: {
				tabler: ["*"], // Tabler 图标库
			},
		}),
		starlight({
			title: "RealtimeAPI",
			pagefind: false,
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
				starlightTelescope(),
				starlightImageZoom(), // 图片点击放大
				starlightGithubAlerts(), // GitHub 风格告警块
				starlightScrollToTop(), // 回到顶部按钮
				starlightHeadingBadges(), // 标题内嵌 badge
				// REST API — OpenAPI 规范自动生成文档页
				starlightOpenAPI([
					{
						base: "rest",
						schema: "./src/spec/openapi.yaml",
						label: "REST API",
						collapsed: false,
					},
				]),
				starlightLinksValidator({
					exclude: ["/rest", "/rest/**"],
				}), // OpenAPI 生成路由由插件产出，跳过其链接校验
			],
			components: {
				Search: "./src/components/TopNav.astro",
				Sidebar: "./src/components/Sidebar.astro",
			},
			sidebar: [
				{
					label: "REST API",
					collapsed: false,
					items: [...openAPISidebarGroups],
				},
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
		sitemap(),
		react(),
		compress(), // 构建产物压缩，放最后
	],

	vite: {
		plugins: [tailwindcss()],
	},
});

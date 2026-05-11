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
import starlightCodeblockFullscreen from "starlight-codeblock-fullscreen";
import starlightGithubAlerts from "starlight-github-alerts";
import starlightHeadingBadges from "starlight-heading-badges";
import starlightImageZoom from "starlight-image-zoom";
import starlightLinksValidator from "starlight-links-validator";
import starlightLlmsTxt from "starlight-llms-txt";
import starlightOpenAPI, { openAPISidebarGroups } from "starlight-openapi";
import starlightScrollToTop from "starlight-scroll-to-top";
import starlightSidebarTopics from "starlight-sidebar-topics";
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
			title: "RealtimeAPI Docs",

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
					pluginCollapsibleSections(), // 代码块可折叠区段
					pluginLineNumbers(), // 显示行号
				],
				styleOverrides: {
					borderRadius: "6px",
					codePaddingInline: "1rem",
				},
			},

			plugins: [
				// REST API — OpenAPI 规范自动生成文档页
				starlightOpenAPI([
					{
						base: "rest",
						schema: "./src/spec/openapi.yaml",
						label: "REST API",
						collapsed: false,
					},
				]),

				// 四协议独立侧边栏分区
				starlightSidebarTopics([
					{
						label: "WebSocket",
						link: "/websocket/",
						icon: "seti:html",
						items: [{ autogenerate: { directory: "websocket" } }],
					},
					{
						label: "MQTT 5",
						link: "/mqtt5/",
						icon: "seti:json",
						items: [{ autogenerate: { directory: "mqtt5" } }],
					},
					{
						label: "SSE",
						link: "/sse/",
						icon: "seti:pipeline",
						items: [{ autogenerate: { directory: "sse" } }],
					},
					{
						label: "REST API",
						link: "/rest/",
						icon: "seti:db",
						items: [...openAPISidebarGroups], // 接 OpenAPI 插件生成的侧边栏
					},
				]),

				starlightTelescope(), // 模糊搜索快速跳转
				starlightLinksValidator(), // 构建时死链检测
				starlightLlmsTxt(), // 生成 /llms.txt AI 索引
				starlightImageZoom(), // 图片点击放大
				starlightCodeblockFullscreen(), // 代码块全屏按钮
				starlightGithubAlerts(), // GitHub 风格告警块
				starlightScrollToTop(), // 回到顶部按钮
				starlightHeadingBadges(), // 标题内嵌 badge
			],

			// 自定义组件（header 下拉导航）
			components: {
				Header: "./src/components/Header.astro",
			},

			customCss: ["./src/styles/custom.css"],
		}),

		sitemap(),
		react(),
		compress(), // 构建产物压缩，放最后
	],

	vite: {
		plugins: [tailwindcss()],
	},
});

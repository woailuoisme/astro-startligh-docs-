import starlight from "@astrojs/starlight";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import tailwindcss from "@tailwindcss/vite";
import astroD2 from "astro-d2";
import mermaid from "astro-mermaid";
import { defineConfig } from "astro/config";
import { pluginColorChips } from "expressive-code-color-chips";
import { pluginFullscreen } from "expressive-code-fullscreen";
import starlightGithubAlerts from "starlight-github-alerts";
import starlightImageZoom from "starlight-image-zoom";
import starlightLinksValidator from "starlight-links-validator";
import starlightScrollToTop from "starlight-scroll-to-top";

const cloudflareWebAnalyticsToken = process.env.PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN;

export default defineConfig({
	integrations: [
		astroD2(),
		// mermaid 必须在 starlight 之前
		mermaid({
			autoTheme: true,
			theme: "neutral",
			darkTheme: "dark",
			mermaidConfig: {
				flowchart: { curve: "linear" }
			}
		}),
		starlight({
			title: "VendingAPI",
			defaultLocale: "zh-CN",
			head: cloudflareWebAnalyticsToken
				? [
						{
							tag: "script",
							attrs: {
								defer: true,
								src: "https://static.cloudflareinsights.com/beacon.min.js",
								"data-cf-beacon": JSON.stringify({
									token: cloudflareWebAnalyticsToken
								})
							}
						}
					]
				: [],
			// Expressive Code 代码块配置（Starlight 内置，无需单独安装）
			expressiveCode: {
				themes: ["starlight-dark", "starlight-light"],
				useStarlightDarkModeSwitch: true,
				useStarlightUiThemeColors: true,
				plugins: [
					pluginLineNumbers(), // 显示行号
					pluginCollapsibleSections(), // 代码块可折叠区段
					pluginColorChips(), // CSS 颜色代码预览色卡
					pluginFullscreen() // 代码块全屏按钮
				],
				styleOverrides: {
					borderRadius: "8px",
					codeFontSize: "0.875rem"
				}
			},
			plugins: [
				starlightImageZoom(), // 图片点击放大
				starlightGithubAlerts(), // GitHub 风格告警块
				starlightScrollToTop(), // 回到顶部按钮
				starlightLinksValidator() // 构建时自动验证 Markdown 内部链接与锚点有效性
			],
			components: {
				Search: "./src/components/TopNav.astro",
				Sidebar: "./src/components/Sidebar.astro"
			},
			customCss: ["./src/styles/global.css"],
			sidebar: [
				{
					label: "SSE",
					collapsed: false,
					items: [{ autogenerate: { directory: "sse" } }]
				},
				{
					label: "WebSocket",
					collapsed: false,
					items: [{ autogenerate: { directory: "websocket" } }]
				},
				{
					label: "MQTT 5",
					collapsed: false,
					items: [{ autogenerate: { directory: "mqtt5" } }]
				}
			]
		})
	],

	vite: {
		plugins: [tailwindcss()],
		build: {
			chunkSizeWarningLimit: 1000,
			rollupOptions: {
				onwarn(warning, warn) {
					if (warning.code === "EMPTY_BUNDLE") return;
					warn(warning);
				}
			}
		}
	}
});

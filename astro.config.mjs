// @ts-check
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
    markdown: {
        shikiConfig: {
            theme: 'dracula',
        },
    },
    integrations: [starlight({
        title: "My Docs",
        social: [
            {
                icon: "github",
                label: "GitHub",
                href: "https://github.com/withastro/starlight",
            },
        ],
        sidebar: [
            {
                label: "Guides",
                items: [
                    // Each item here is one entry in the navigation menu.
                    { label: "Example Guide", slug: "guides/example" },
                ],
            },
            {
                label: "Reference",
                items: [{ autogenerate: { directory: "reference" } }],
            },
        ],
        }), mdx(), sitemap(), react(), partytown()],

    vite: {
        plugins: [tailwindcss()],
    },
});
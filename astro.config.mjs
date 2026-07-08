// @ts-check
import { defineConfig } from 'astro/config';
import remarkToc from 'remark-toc';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()]
    },
    markdown: {
        remarkPlugins: [[
            remarkToc,
            {
                heading: 'toc', maxDepth: 3
            }
        ]],
    },
});

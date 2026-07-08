// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkBreaks from 'remark-breaks';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

const postsLayout = '../../layouts/PostsLayout.astro';

function stringifyDateValue(value) {
    if (value instanceof Date) {
        return value.toISOString().slice(0, 10);
    }

    return value;
}

function autoPostsLayout() {
    return function (_, file) {
        const path = String(file.path ?? '');
        if (!path.includes('/src/pages/posts/') && !path.includes('\\src\\pages\\posts\\')) {
            return;
        }

        file.data.astro ??= {};
        file.data.astro.frontmatter ??= {};
        file.data.astro.frontmatter.layout ??= postsLayout;

        for (const [key, value] of Object.entries(file.data.astro.frontmatter)) {
            if (key === 'layout') {
                continue;
            }

            file.data.astro.frontmatter[key] = stringifyDateValue(value);
        }
    };
}

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()]
    },
    markdown: {
        processor: unified({
            remarkPlugins: [remarkBreaks, autoPostsLayout],
        }),
    },
    integrations: [icon()]
});

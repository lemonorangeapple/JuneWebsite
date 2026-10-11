// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkBreaks from 'remark-breaks';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

const postsLayout = '../../layouts/PostsLayout.astro';

/** @param {unknown} value */
function stringifyDateValue(value) {
    if (value instanceof Date) {
        return value.toISOString().slice(0, 10);
    }

    return value;
}

/** @param {unknown} node */
function containsMath(node) {
    if (!node || typeof node !== 'object') {
        return false;
    }

    if ('type' in node && (node.type === 'code' || node.type === 'inlineCode')) {
        return false;
    }

    if ('type' in node && node.type === 'text' && 'value' in node && typeof node.value === 'string') {
        return /\$\$[\s\S]*?\$\$/.test(node.value) || /(?<!\\)\$[^$\n]+(?<!\\)\$/.test(node.value);
    }

    return 'children' in node && Array.isArray(node.children) && node.children.some(containsMath);
}

/** @type {import('@astrojs/markdown-remark').RemarkPlugin} */
function autoPostsLayout() {
    return function (tree, file) {
        const path = String(file.path ?? '');
        if (!path.includes('/src/pages/posts/') && !path.includes('\\src\\pages\\posts\\')) {
            return;
        }

        file.data.astro ??= {};
        file.data.astro.frontmatter ??= {};
        file.data.astro.frontmatter.layout ??= postsLayout;
        file.data.astro.frontmatter.math ??= containsMath(tree);

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
    site: 'https://www.imjcj.eu.org',
    vite: {
        plugins: [tailwindcss()]
    },
    markdown: {
        shikiConfig: {
            // Both themes are emitted as CSS variables; prose.css picks one from the active colour scheme.
            themes: {
                light: 'github-light-high-contrast',
                dark: 'github-dark-high-contrast',
            },
            defaultColor: false,
        },
        processor: unified({
            remarkPlugins: [remarkBreaks, autoPostsLayout],
        }),
    },
    integrations: [icon(), sitemap({
        filter: (page) => !page.includes('/search.json'),
    })]
});

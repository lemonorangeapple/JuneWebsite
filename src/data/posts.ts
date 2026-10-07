type PostModule = {
    frontmatter: {
        title?: unknown;
        date?: unknown;
        description?: unknown;
        topic?: unknown;
        tags?: unknown;
    };
    url?: string;
    rawContent?: () => string;
};

export type Post = {
    title: string;
    date: string;
    description: string;
    topic: string;
    tags: string[];
    url: string;
    content: string;
};

const modules = import.meta.glob<PostModule>("../pages/posts/*.md", { eager: true });

const toPlainText = (markdown: string) =>
    markdown
        .replace(/<\/?[a-zA-Z][^>\n]*>/g, " ")
        .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
        .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
        .replace(/^\s*(```|~~~).*$/gm, " ")
        .replace(/^\s{0,3}(#{1,6}|>|[-*+]|\d+\.)\s+/gm, "")
        .replace(/[*_`~|]/g, "")
        .replace(/\s+/g, " ")
        .trim();

function requireString(value: unknown, field: string, path: string): string {
    if (typeof value !== "string" || !value.trim()) {
        throw new Error(`${path} 的 ${field} 必须是非空字符串`);
    }

    return value.trim();
}

function normalizePost(path: string, module: PostModule): Post {
    const title = requireString(module.frontmatter.title, "title", path);
    const date = requireString(module.frontmatter.date, "date", path);
    const description = requireString(module.frontmatter.description, "description", path);
    const topic = module.frontmatter.topic === undefined
        ? ""
        : requireString(module.frontmatter.topic, "topic", path);

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(`${date}T00:00:00Z`))) {
        throw new Error(`${path} 的 date 必须使用 YYYY-MM-DD 格式`);
    }

    if (!Array.isArray(module.frontmatter.tags) || module.frontmatter.tags.some((tag) => typeof tag !== "string")) {
        throw new Error(`${path} 的 tags 必须是字符串数组`);
    }

    return {
        title,
        date,
        description,
        topic,
        tags: module.frontmatter.tags,
        url: module.url ?? path.replace("../pages", "").replace(/\.md$/, "/"),
        content: toPlainText(module.rawContent?.() ?? ""),
    };
}

export const posts: Post[] = Object.entries(modules)
    .map(([path, module]) => normalizePost(path, module))
    .sort((a, b) => b.date.localeCompare(a.date));

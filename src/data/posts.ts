type PostModule = {
    frontmatter: {
        title?: string;
        date?: string;
        description?: string;
        topic?: string;
        tags?: string[];
    };
    url?: string;
};

const modules = import.meta.glob<PostModule>("../pages/posts/*.md", { eager: true });

export const posts = Object.entries(modules)
    .map(([path, module]) => ({
        title: module.frontmatter.title ?? path.split("/").pop() ?? path,
        date: module.frontmatter.date ?? "",
        description: module.frontmatter.description ?? "",
        topic: module.frontmatter.topic ?? "",
        tags: module.frontmatter.tags ?? [],
        url: module.url ?? path.replace("../pages", "").replace(/\.md$/, "/"),
    }))
    .sort((a, b) => b.date.localeCompare(a.date));

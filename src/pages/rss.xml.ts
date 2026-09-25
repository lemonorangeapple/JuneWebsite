import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { posts } from "../data/posts";

export function GET(context: APIContext) {
    const site = context.site ?? new URL("https://www.imjcj.eu.org");

    return rss({
        title: "June_qwq",
        description: "June_qwq 的个人博客",
        site,
        items: posts.map((post) => ({
            title: post.title,
            pubDate: post.date ? new Date(post.date) : undefined,
            description: post.description,
            link: post.url,
        })),
        customData: "<language>zh-CN</language>",
    });
}

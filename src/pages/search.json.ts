import { posts } from "../data/posts";

export const GET = () => {
    const slim = posts.map(({ title, url, description, topic, tags, content }) => ({
        title,
        url,
        description,
        topic,
        tags,
        content,
    }));

    return new Response(JSON.stringify(slim), {
        headers: { "Content-Type": "application/json; charset=utf-8" },
    });
};

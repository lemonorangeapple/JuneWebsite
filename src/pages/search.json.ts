import { posts } from "../data/posts";

export const GET = () => {
    const slim = posts.map(({ title, url, description, topic, tags }) => ({
        title,
        url,
        description,
        topic,
        tags,
    }));

    return new Response(JSON.stringify(slim), {
        headers: { "Content-Type": "application/json; charset=utf-8" },
    });
};

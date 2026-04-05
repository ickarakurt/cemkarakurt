import { getCollection } from "astro:content";
import getReadingTime from "../utils/getReadingTime";
import { slugifyStr } from "../utils/slugify";

export async function GET() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  const notes = await getCollection("note", ({ data }) => !data.draft);

  const entries = [...posts, ...notes].map(entry => ({
    id: entry.id,
    collection: entry.collection,
    title: entry.data.title,
    description: entry.data.description,
    readingTime: getReadingTime(entry.body || ""),
    pubDate: entry.data.pubDatetime.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  }));

  // Add tags to the index
  const allTags = [...posts, ...notes].flatMap(entry => entry.data.tags || []);
  const uniqueTags = [...new Set(allTags)];
  const tagEntries = uniqueTags.map(tag => {
    const slug = slugifyStr(tag);
    const count = allTags.filter(t => t === tag).length;
    return {
      id: slug,
      slug: slug,
      collection: "tags",
      title: `#${tag}`,
      description: `Explore all ${count} entries tagged with "${tag}"`,
      readingTime: `${count} entries`,
      pubDate: "Topic Archive",
    };
  });

  return new Response(JSON.stringify([...entries, ...tagEntries]), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

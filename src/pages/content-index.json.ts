import { getCollection } from "astro:content";
import getReadingTime from "../utils/getReadingTime";

export async function GET() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  const notes = await getCollection("note", ({ data }) => !data.draft);

  const index = [...posts, ...notes].map(entry => ({
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

  return new Response(JSON.stringify(index), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

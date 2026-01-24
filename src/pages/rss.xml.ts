import rss from "@astrojs/rss";
import { SITE } from "@config";
import getSortedContent from "@utils/getSortedContent";
import { getCollection } from "astro:content";

export async function GET() {
  const posts = await getCollection("blog");
  const sortedPosts = getSortedContent(posts);

  const notes = await getCollection("note");
  const sortedNotes = getSortedContent(notes);

  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: [
      ...sortedPosts.map(({ data, id }) => ({
        link: `blog/${id}/`,
        title: data.title,
        description: data.description,
        pubDate: new Date(data.modDatetime ?? data.pubDatetime),
      })),
      ...sortedNotes.map(({ data, id }) => ({
        link: `notes/${id}/`,
        title: data.title,
        description: data.description,
        pubDate: new Date(data.modDatetime ?? data.pubDatetime),
      })),
    ],
  });
}

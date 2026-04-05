import type { CollectionEntry } from "astro:content";
import contentFilter from "./contentFilter";
import { slugifyStr } from "./slugify";

interface Tag {
  tag: string;
  tagName: string;
  count: number;
}

const getUniqueTags = (posts: CollectionEntry<"blog" | "note">[]) => {
  const allTags = posts.filter(contentFilter).flatMap(post => post.data.tags);
  const tagCounts = allTags.reduce((acc, tag) => {
    const slug = slugifyStr(tag);
    acc[slug] = (acc[slug] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const tags: Tag[] = Object.keys(tagCounts)
    .map(slug => ({
      tag: slug,
      tagName: allTags.find(t => slugifyStr(t) === slug) || slug,
      count: tagCounts[slug],
    }))
    .sort((tagA, tagB) => tagB.count - tagA.count || tagA.tag.localeCompare(tagB.tag));

  return tags;
};

export default getUniqueTags;

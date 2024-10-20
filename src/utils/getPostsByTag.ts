import type { CollectionEntry } from "astro:content";
import getSortedContent from "./getSortedContent";
import { slugifyAll } from "./slugify";

const getPostsByTag = (posts: CollectionEntry<"blog">[], tag: string) =>
  getSortedContent(
    posts.filter(post => slugifyAll(post.data.tags).includes(tag))
  );

export default getPostsByTag;

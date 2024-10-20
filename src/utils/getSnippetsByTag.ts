import type { CollectionEntry } from "astro:content";
import getSortedContent from "./getSortedContent";
import { slugifyAll } from "./slugify";

const getSnippetsByTag = (
  snippets: CollectionEntry<"snippet">[],
  tag: string
) =>
  getSortedContent(
    snippets.filter(snippet => slugifyAll(snippet.data.tags).includes(tag))
  );

export default getSnippetsByTag;
